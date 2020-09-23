/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype

// 创建一个对象作为拦截器
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method] // 暂存原生方法
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args  // 若是push或unshift方法，传入的参数是新增元素
        break
      case 'splice':
        inserted = args.slice(2) // 若是splice方法，那么传入参数列表中下标为2的就是新增元素
        break
    }
    if (inserted) ob.observeArray(inserted) // 然后调用observe方法将新增的元素转化为响应式
    // notify change
    ob.dep.notify()
    return result
  })
})

/**
 * 1.首先创建了继承自Array原型空对象arrayMethods
 * 2.在arrayMethods上使用Oject.defineProperty（就是def()方法）将这7个方法遍历进行封装。
 * 3.最后我们使用push方法，使用的就是arrayMethods.push而不是原生的push方法
 * 
 * 而arrayMethods.push就是封装的新函数mutator，也就后说，实标上执行的是函数mutator，而mutator函数内部执行了original函数，这个original函数就是Array.prototype上对应的原生方法。 那么，接下来我们就可以在mutator函数中做一些其他的事，比如说发送变化通知
 */