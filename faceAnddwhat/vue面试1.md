### 1. new Vue时发生了什么？

- 1. new Vue命令执行，其实就是执行Vue的构造函数Vue。首先调用src/core/instance/index.js里的this._init(options)
- 2.this._init()在initMixin函数里面定义也就是src/core/instance/init.js
- 3.在这个函数里面首先将Vue实例赋给vm，然后接着判断实例是不是Vue，再将options挂载到vm.$options上
- 4.紧接着开始做一些初始化的动作
- 5.比如，initLifecycle(), initEvents(),initRenders(),
- 6.再调用生命周期钩子beforeCreate
- 7.initInjections, 初始化Injections
- 8. 初始化状态，initState
- 9.初始化initProvide()
- 10.再调用钩子函数created，表示初始化阶段结束

- 11.下一步就是判断```vm.$options.el```是否存在，存在则调用```vm.$mount()```执行下一阶段

- 合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 props、data、methods、computed、watcher 


### 2. Vue实例挂载的实现

- 通过```$mount```实例方法来去挂载vm，```$mount```方法在dist文件夹里面定义，主要和平台、构建方式相关。
- 1.在执行this.$mount方法将调用里面的mountComponent方法，这个方法在src/core/instance/lifecycle.js里定义
- 2.mountComponent()先实例化一个渲染函数watcher，
- 3.在它的回调函数中会调用 updateComponent 方法，在此方法中调用 vm._render 方法先生成虚拟 Node
  - vm._render最终通过执行createElement方法并返回VNode
- 4.再调用vm._update，更新DOM
  - 调用update的时机：首次渲染和数据更新的时候
  - _update的核心就是调用```vm.__patch__```, 这个方法在不同的平台定义不一样
  - createPatchFunction内部定义了一系列的辅助方法，最终返回一个patch方法，将这个方法赋值给vm._update

- Watcher 在这里起到两个作用，一个是初始化的时候会执行回调函数，另一个是当 vm 实例中的监测的数据发生变化的时候执行回调函数

!new vue[](../img/new-vue.png)

### 3. 组件化

- 所谓组件化就是把页面拆分成多个组件，每个组件依赖的CSS、JS、模板、图片放在一起开发维护。组件是资源独立的，组件之间可以复用、可以嵌套

- 分析了 createComponent 的实现，了解到它在渲染一个组件的时候的 3 个关键逻辑：构造子类构造函数，安装组件钩子函数和实例化 vnode。createComponent 后返回的是组件 vnode，它也一样走到 vm._update 方法，进而执行了 patch 函数


### 4.生命周期

![lifecycle](../img/lifecycle.png)

- 1. beforeCreate 和 created 函数都是在实例化 Vue 的阶段，在 _init 方法中执行的

  - beforeCreate钩子函数调用在initState之前，所以在这个钩子函数里不能获取到props、data中定义的值，不能调用methods里面定义的函数

  - created钩子函数定义在initState之后，和后端的数据交互放在created钩子函数里面就行

- 2. beforeMount 和 mounted
- beforeMount 钩子函数发生在 mount，也就是 DOM 挂载之前，它的调用时机是在 mountComponent 函数中

  - 在执行vm._render()函数渲染VNode之前，执行了beforeMount钩子函数
  - 执行完vm._update()把VNode patch到真实DOM后，执行mounted钩子函数
  - 每个子组件都是在这个钩子函数中执行 mounted 钩子函数，并且我们之前分析过，insertedVnodeQueue 的添加顺序是先子后父，所以对于同步渲染的子组件而言，mounted 钩子函数的执行顺序也是先子后父


- 3. beforeUpdate 和update
  - 这两个钩子函数的执行时机都是在数据更新的时候

  - beforeUpdate的执行时机是在渲染Watcher的before函数中，
  - 只有组件已经处于mounted之后，才可以调用beforeUpdated钩子函数
  - updated的执行时机是在flushSchedulerQueue函数调用的时候
  - 只有满足当前 watcher 为 vm._watcher 以及组件已经 mounted 这两个条件，才会执行 updated 钩子函数


- 4.beforeDestroy 和 destroyed
  - beforeDestroy 和 destroyed 钩子函数的执行时机在组件销毁的阶段
  - 组件的销毁过程，最终会调用$destroy方法

  - beforeDestroy钩子函数的执行时机是在```$destroy```函数最开始的地方，接着执行一系列的销毁动作，包括从parent的```$children```中删除自身，删除watcher，当前渲染的Vnode执行销毁子函数。执行完毕调用destroy钩子函数
  - 在```$destroy```的执行过程中，它会执行vm.__patch__(vm.vnode, null)触发它子组件的销毁子函数。这样一层层的递归调用。
  - 所以destroy钩子函数的执行顺序是先子后父和mounted过程一样


- 5. activated 和 deactivated
  - activated 和 deactivated 钩子函数是专门为 keep-alive 组件定制的钩子


### 5.组件注册

- 1.全局注册
  - Vue.component(tagName, options)


- 2.局部注册
  ```js
    import HelloWorld from './components/HelloWorld'

    export default {
    components: {
        HelloWorld
    }
    }
  ```


### 6. 异步组件

- 为了减少首屏代码体积，往往会把一些非首屏的组件设计成异步组件，按需加载
- Vue原生支持异步组件

- 普通异步组件
- Promise异步组件
- 高级异步组件

- ，它实现了 loading、resolve、reject、timeout 4 种状态。异步组件实现的本质是 2 次渲染，除了 0 delay 的高级异步组件第一次直接渲染成 loading 组件外，其它都是第一次渲染生成一个注释节点，当异步获取组件成功后，再通过 forceRender 强制重新渲染，这样就能正确渲染出我们异步加载的组件

### 7.响应式原理

![yuanli1tu](,,/../../img/reactive.png)

### 8.Vue-Router
- 支持三种路由方式
  - hash
  - histroy
  - abstract

- 提供2种组件：
  - <router-link>
  - <router-view>

- Vue 提供了 Vue.use 的全局 API 来注册这些插件


### 9. vuex核心思想

![vuex](../img/vuex1.png)

