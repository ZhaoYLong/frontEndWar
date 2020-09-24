/* @flow */
// 模板编译阶段的优化阶段

import { makeMap, isBuiltInTag, cached, no } from 'shared/util'

let isStaticKey
let isPlatformReservedTag

const genStaticKeysCached = cached(genStaticKeys)

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  markStatic(root) // 标记静态标签
  // second pass: mark static roots.
  markStaticRoots(root, false) // 标记静态根标签
}

function genStaticKeys (keys: string): Function {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

/**
 * 
 * @param {*} node 
 * 标记静态节点；从根开始，先标记根节点是否为静态节点，然后看跟节点若是元素节点，向下递归它的子节点，直到标记完所有节点
 */
function markStatic (node: ASTNode) {
  node.static = isStatic(node) // 调用isStatic()判断一个节点是否为静态节点
  // 当前节点是元素节点
  if (node.type === 1) {
    // 不要将组件插槽的内容设为静态
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes; 组件无法更改插槽节点
    // 2. static slot content fails for hot-reloading; 静态插槽内容无法热加载
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    // 若该节点是元素节点，还要递归去判断它的子节点
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      markStatic(child)
      // 若有一个子节点不是静态的，则该节点就标记为非静态节点
      if (!child.static) {
        node.static = false
      }
    }
    /**
     * 循环node.children后还不算把所有子节点都遍历完，因为如果当前节点的子节点中有标签带有v-if、v-else-if、v-else等指令时，
     * 这些子节点在每次渲染时都只渲染一个，所以其余没有被渲染的肯定不在node.children中，
     * 而是存在于node.ifConditions，所以我们还要把node.ifConditions循环一遍
     */
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          // node.ifCondition中有一个子节点不是静态节点，当前节点就是非静态节点
          node.static = false
        }
      }
    }
  }
}

// 寻找静态根节点
function markStaticRoots (node: ASTNode, isInFor: boolean) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}

function isStatic (node: ASTNode): boolean {
  if (node.type === 2) { // expression；包含变量的动态文本节点
    return false
  }
  if (node.type === 3) { // text；不包含变量的纯文本节点
    return true
  }

  /**
   * node.type = 1; 元素节点；
   * 这种情况需要继续判断
   */
  /**
   * - 元素节点是静态节点，需要满足以下几点要求：
        - 节点使用v-pre指令；他是静态节点
        - 节点没有使用v-pre指令，它成为静态节点必须满足：
        - 不能使用动态绑定语法，标签上不能有v-、@、:开头的属性
        - 不能使用v-if、v-else、v-for
        - 不能是内置组件，即签名不能是slot和component
        - 标签名必须是平台保留标签，即不能是组件
        - 当前节点的父节点不能是带有v-for的template标签
        - 节点的所有属性的 key 都必须是静态节点才有的 key，注：静态节点的key是有限的，它只能是type,tag,attrsList,attrsMap,plain,parent,children,attrs之一
   */
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node: ASTElement): boolean {
  while (node.parent) {
    node = node.parent
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}
