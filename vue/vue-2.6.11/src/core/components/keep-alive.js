/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]

    /**
     * 在该函数内对this.cache对象进行遍历，取出每一项的name值，用其与新的缓存规则进行匹配，
     * 如果匹配不上，则表示在新的缓存规则下该组件已经不需要被缓存，
     * 则调用pruneCacheEntry函数将这个已经不需要缓存的组件实例先销毁掉，然后再将其从this.cache对象中剔除
     */
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]

  // 判断当前没有处于被渲染状态的组件，将其销毁
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

// <keep-alive>组件
export default {
  name: 'keep-alive',
  abstract: true,  // 抽象组件

  props: { // 组件的三个参数
    include: patternTypes, 
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    this.cache = Object.create(null) // 创建一个存放缓存的变量
    this.keys = []
  },

  // 当<keep-alive>组件被销毁时，此时会调用destroyed钩子函数，遍历this.cache对象，然后将那些没有被缓存的并且当前没有处于被渲染状态的组件都销毁并从this.cache对象中剔除
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys) // 调用pruneCacheEntry()销毁cache
    }
  },

  // 在mounted钩子函数里观察include和exclude的变化
  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  // 实现缓存功能的钩子函数
  render () {
    const slot = this.$slots.default  // 获取默认插槽中第一个组件节点
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions // 获取该组件节点的componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions) /* 获取该组件节点的名称，优先获取组件的name字段，如果name不存在则获取组件的tag */
      const { include, exclude } = this
      if (  /* 如果name不在inlcude中或者存在于exlude中则表示不缓存，直接返回vnode */
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null  // 获取组件的key
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key

      // 如果命中缓存，则直接从缓存中哪VNode的组件实例
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest

        /* 调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个 */
        remove(keys, key)
        keys.push(key)
      } else {  // 如果没有命中，则将其设置进缓存
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          // 如果max存在且缓存长度大于最大限制，则缓存中删除第一个
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true // 最后设置keepAlive标记位
    }
    return vnode || (slot && slot[0]) 
  }
}
