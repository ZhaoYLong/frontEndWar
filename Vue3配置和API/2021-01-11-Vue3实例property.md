## 实例property

### $data
---
- type: Object
- 组件实例观察的数据对象。组件实例代理了对其data对象property的访问。

### $props
---
- type: Object

### $el
---
- type: any
- 仅可读
- 组件实例使用的根DOM元素

### $options
---
- type: Object
- 仅可读
- 用于当前组件实例的初始化选项。需要在选项中包含自定义property时会有用处：

```js
  const app = Vue.createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
```

### $parent
---
- type: Vue instance
- 仅可读
- 父实例，如果当前实例有的话

### $root
---
- type: Vue instance
- 仅可读
- 当前组件树的根组件实例。如果当前实例没有父实例，此实例将会是其自己

### $slots
---
- type: { [name: string]: (...args: any[]) => Array<VNode> | undefined}
- 仅可读
- 用于访问被插槽分发的内容。每个具名插槽有相应的property（例如：v-slot:foo中的内容将会在this.$slots.foo中找到）。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。
- 在使用渲染函数书写一个组件时，访问this.$slots最有帮助

```html
  <blog-post>
    <template v-slot:header>
      <h1>About me </h1>
    </template>
    <template v-slot:default>
      <p>default VVVVVVVVVVVVVVVVVVVVV $slots</p>
    </template>
    <template v-solt: footer>
      <p> Copyright 2020 Evan You
    </template>
  </blog-post>

  <script>
    const app = Vue.createApp({})

    app.component('blog-post', {
      render() {
        return Vue.h('div', [
          Vue.h('header', this.$slots.header()),
          Vue.h('main', this.$slots.default()),
          Vue.h('footer', this.$slots.footer())
        ])
      }
    })
  </script>
```

### $refs
---
- type: Object
- 仅可读
- 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

### $attrs
---
- type: Object
- 仅可读
- 包含了父作用域中不作为组件 props 或自定义事件。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高阶的组件时非常有用。