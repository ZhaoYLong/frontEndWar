Vue 鼓励我们通过将UI和相关行为封装到组件中来构建UI。我们可以将它们嵌套在另一个内部，以构建一个组成应用程序UI的树。

有时组件模板的一部分逻辑上属于该组件，而从技术角度看，做好将模板的这一部分移动到DOM中Vue app之外的其他位置。

考虑下面的HTML解构：

```html
  <body>
    <div style="position: relative;">
      <h3>Tooltips with Vue 3 teleport</h3>
      <div>
        <modal-button></modal-button>
      </div>
    </div>
  </body>
```

- `modal-button`组件
  
```js
  const app = Vue.createApp({});

  app.component('modal-button', {
    template: `
      <button @click="modalOpen = true">
        Open full screen modal!
      </button>

      <div v-if="modalOpen" class="modal">
        <div>
          I'm a modal!
          <button @click="modalOpen= false">Close<button>
        </div>
      </div>
    `,
    data() {
      return {
        modalOpen: false,
      }
    }
  })
```

当初在最初的HTML结构中使用这个组件时，有一个问题就是模态是在深度嵌套的div中渲染的，而模态的position:absolute以父级相对定位的div作为引用。

Teleport提供了一种干净的方法，允许我们控制在DOM中哪个父节点下呈现HTML，而不必求助于全局状态或将其拆分为2个组件。

现在修改`modal-button`使用`<teleport>`。并告诉Vue "Teleport"这个HTML到该"body标签"

```js
  app.component('modal-button', {
    template:`
      <button @click="modalOpen = true">
        Open full scrren modal! (With teleport)
      <button>

      <teleport to="body">
        <div v-if="modalOpen" class="modal">
          <div>
            I'm a teleported modal!
            my parent is body
            <button @click="modalOpen = false">Clos</button>
          </div>
        </div>
      </teleport>
    `,
    data() {
      return {
        modalOpen: fasle,
      }
    }
  })
```

### 与Vue components一起使用
---

如果`<teleport>`包含Vue组件，则它仍将是`<teleport>`父组件的逻辑子组件

```js
  const app = Vue.createApp ({
    template: `
      <h1>Root instance<h1>
      <parent-component>
    `
  })

  app.component('parent-component', {
    template: `
      <h2>This is a parent component</h2>
      <teleport to="#endofbody">
        <child-component name="John" />
      </teleport>
    `
  })

  app.component('child-component', {
    props: ['name'],
    template: `
      <div>Hello, {{ name }}</div>
    `
  })
```

在这种情况下，即使在不同的地方渲染`child-component`，它仍将是`parent-component`的子级，并从中接收`name`prop。

这也意味着来自父组件的注入按预期工作，并且子组件将嵌套在 Vue Devtools 中的父组件之下，而不是放在实际内容移动到的位置。

### 在同一目标上使用多个teleport
---
这种情况下，多个`<teleport>`组件可以将其内容挂载到同一目标元素。顺序将是一个简单的追加——先到先得

```html
  <teleport to="#modal">
    <div>A<div>
  </teleport>
  <teleport to="#modal">
    <div>B<div>
  </teleport>

  <!-- result -->
  <div id="modals">
    <div>A</div>
    <div>B</div>
```