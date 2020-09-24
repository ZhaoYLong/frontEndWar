- 状态和UI之间的公式：
    UI = render(state)

- state发生改变，页面ui也会发生改变；这就是简单的数据驱动视图

- 转换的函数（数学概念）就是render()，在vue框架中，Vue就扮演这render()这个函数

- Vue怎么得知数据变换然后通知UI变换？
  - 变化侦测
  - Angular通过脏值检查流程来实现变化侦测
  - React通过对比虚拟DOM来实现bianhua侦测
  - Vue通过Object.defineProperty()来实现的数据双向绑定

> 查清楚Object.defineProperty()和proxy()的具体用法和作用，vue3替换掉前者的原因？

```js
let car = {}
let val = 3000
Object.defineProperty(car, 'price', {
  enumerable: true,
  configurable: true,
  get(){
    console.log('price属性被读取了')
    return val
  },
  set(newVal){
    console.log('price属性被修改了')
    val = newVal
  }
})
```

- 完成第一步：让object数据变的可观测，使用Object.defineProperty(), 变成getter/setter形式
- 现在做第二步：依赖收集：视图中谁用到这个数据，就更新谁

- 视图中的组件用到这个数据，则这个组件就依赖于这个数据，给每个数据建立一个依赖数组，当数据发生变换时，通知依赖数组，将组件更新

- 谁使用了数据，就会触发getter属性，我们可以在getter中收集这个依赖
- 当数据发生变换时，会触发setter属性，那么我们就可以在setter中通知依赖更新

> 在getter中收集依赖，在setter中通知依赖更新

- 建立依赖管理器Dep类来管理依赖，毕竟依赖数组功能有所欠缺且过于耦合

- 谁用到了这个数据，谁就是依赖，这个“谁”就是Vue中定义的一个Watcher类的一个实例。
- 谁用到数据，谁就是依赖，我们就为谁创建一个Watcher实例。
- 之后数据发生变化，不直接通知依赖更新，而是通知依赖对应的Watcher实例，由Watcher实例通知真正的视图

- 对Object数据的侦测，依赖收集，依赖更新的过程图示：

![图](https://vue-js.com/learn-vue/assets/img/3.0b99330d.jpg)


- 不足
  - 虽然可以通过Object.defineProperty()实现对objec数据的可观测，但是这个方法只能观测到object数据的取值和设置值，当我们先object数据中添加一堆新的key/value或删除一对已有的key/value时，它是无法观测到的，导致当我们对object数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新
  - 为了解决这个问题，Vue新增了全局API Vue.set和Vue.delete

- 总结
  - 1.Data通过observer转换成了getter/setter的形式来追踪变化。
  - 2.当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。
  - 3.当数据发生了变化时，会触发setter，从而向Dep中的依赖（即Watcher）发送通知。
  - 4.Watcher接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。