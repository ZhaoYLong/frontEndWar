- ```<keep-alive>``` 是 Vue 实现的一个内置组件，也就是说 Vue 源码不仅实现了一套组件化的机制，也实现了一些内置组件，

> ```<keep-alive>```是Vue中内置的一个抽象组件，它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

### 用法

- ```<keep-alive>```组件可接受三个属性：
  - include：字符串或正则表达式。只有名称匹配的组件会被缓存
  - exclude：同上。任何名称匹配的组件都不会被缓存
  - max：数字。最多缓存多少组件实例

- include和exclude属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组

```html
    <!-- 逗号分隔字符串 -->
    <keep-alive include="a,b">
        <component :is="view"></component>
    </keep-alive>

    <!-- 正则表达式 (使用 `v-bind`) -->
    <keep-alive :include="/a|b/">
        <component :is="view"></component>
    </keep-alive>

    <!-- 数组 (使用 `v-bind`) -->
    <keep-alive :include="['a', 'b']">
        <component :is="view"></component>
    </keep-alive>

    <keep-alive :max="10">
        <component :is="view"></component>
    </keep-alive>
```

### 实现原理

- ```<keep-alive>```组件定义在src/core/components/keep-alive.js



### 为什么要删除第一个缓存组件并且为什么命中缓存了还要调整组件key的顺序？
- 这里应用的一个缓存淘汰策略LRU：
  > LRU : 最近最少使用算法，根据历史访问记录来进行淘汰数据，启思想就是"如果数据最近被使用了，那么将来被访问的几率也更高"

  - 算法的图示：
  ![LRU](https://vue-js.com/learn-vue/assets/img/3.bfadecb3.png)

    - 1.将新数据从尾部插入到this.keys；
    - 2.每当缓存命中（即缓存数据被访问），则将数据移到this.keys的尾部；
    - 3.当this.keys满的时候，将头部数据丢弃

  - LRU核心思想：
    - 是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件key重新插入到this.keys的尾部，这样一来，this.keys中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即this.keys中第一个缓存的组件。这也就之前加粗强调的已缓存组件中最久没有被访问的实例会被销毁掉的原因所在


### 生命周期钩子

- 组件一旦被 ```<keep-alive>``` 缓存，那么再次渲染的时候就不会执行 created、mounted 等钩子函数，但是我们很多业务场景都是希望在我们被缓存的组件再次被渲染的时候做一些事情，好在Vue 提供了 activated和deactivated 两个钩子函数，它的执行时机是 ```<keep-alive>``` 包裹的组件激活时调用和停用时调用，