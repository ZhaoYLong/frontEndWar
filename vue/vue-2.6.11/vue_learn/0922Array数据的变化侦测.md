- 为什么Array型数据不能和Object型数据使用相同的侦测方式？
  - Object数据可以使用JS提供的对象原型上的方法Object.defineProperty(),但是Array无法使用

- Array型数据设计了新的变化侦测机制，但是思路还是不变的：在获取数据时收集依赖，数据变化时通知依赖更新

- Array数据的依赖收集方式和Object数据的依赖收集方式是一样的，在getter中收集
  - Array虽然无法使用Object.defineProperty()但是数组始终被包裹在Object（data）对象中，使用arr，必然触发arr的getter。
  - Array数据还在getter中收集依赖


- <p style="color: red;">如何使Array数据可观测？</p>
  - Array数据没有setter
  - JS中提供了很多操作数组的方法，Vue通过重写一些方法来使得Array数据可观测

  ```js
    let arr = [1,2,3]
    arr.push(4)
    Array.prototype.newPush = function(val){
    console.log('arr被修改了')
    this.push(val)
    }
    arr.newPush(4)
  ```

  - Vue中创建了一个数组方法拦截器，它拦截在数组实例与Array.prototype之间，在拦截器内重写了操作数组的一些方法，当数组实例使用操作数组方法时，其实使用的是拦截器中重写的方法，而不是Array.prototype上的原生方法，如下图：

  ![图](https://vue-js.com/learn-vue/assets/img/2.b446ab83.png)

  - Array原型中可以改变数组自身内容的方法有：push, pop, shift, unshift, splice, sort, reverse, Vue将之重写


- 深度探测
  - Array数据的变化侦测仅仅说的是数组自身变化的侦测，比如给数组新增一个元素或者删除数组中一个元素
  - 在Vue中，Object、Array数据所实现的数据变化侦测都是深度侦测。

- 数组新增元素
  - 拿到新增的元素，调用observe()函数将其转化就可以了
  - 先数组新增元素的方法只有三个，push, unshift, splice，只需要对这三个方法进行处理就行


- 不足
  - 前文中我们说过，对于数组变化侦测是通过拦截器实现的，也就是说只要是通过数组原型上的方法对数组进行操作就都可以侦测到，但是别忘了，我们在日常开发中，还可以通过数组的下标来操作数据，如下：

```js
    let arr = [1,2,3]
    arr[0] = 5;       // 通过数组下标修改数组中的数据
    arr.length = 0    // 通过修改数组长度清空数组
```

  - 而使用上述例子中的操作方式来修改数组是无法侦测到的。 同样，Vue也注意到了这个问题， 为了解决这一问题，Vue增加了两个全局API:Vue.set和Vue.delete

- 总结
  - 首先我们分析了对于Array型数据也在getter中进行依赖收集；其次我们发现，当数组数据被访问时我们轻而易举可以知道，但是被修改时我们却很难知道，为了解决这一问题，我们创建了数组方法拦截器，从而成功的将数组数据变的可观测。接着我们对数组的依赖收集及数据变化如何通知依赖进行了深入分析；最后我们发现Vue不但对数组自身进行了变化侦测，还对数组中的每一个元素以及新增的元素都进行了变化侦测，我们也分析了其实现原理。

- 以上就是对Array型数据的变化侦测分析
