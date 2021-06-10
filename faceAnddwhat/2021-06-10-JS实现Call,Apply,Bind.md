```js
/**
 * 假定处于非严格模式下
 */

// 独一无二且私有的propertyName
const boundFun = Symbol('boundFun')
const boundArgs = Symbol('boundArgs')

// 实现不依赖call的myApply
function myApplay(fun, obj, args) {
  if (isBoundFunction(fun)) return fun(...args)
  obj = Object(obj ?? (function () {return this })())
  const temp = Symbol('temp')
  obj[temp] = fun
  const res = obj[temp](...args)
  delete obj[temp]
  return res
}

// myCall 直接使用myApply即可
function myCall(fun, obj, ...args) {
  return myApplay(fun, obj, args)
}

// myBind 返回一个可调用对象：不是正经函数，但可以正常调用
function myBind(fun, obj, ...args) {
  if (isBoundFunction(fun)) return fun
  function boundObject(...args2) {
    return myApplay(fun, obj, [...args, ...args2])
  }
  // bind 的产生是一个可调用的对象
  delete boundObject.prototype
  boundObject.__proto__ = Function.prototype

  boundObject[boundFun] = fun
  boundObject[boundArgs] = args

  return boundObject
}

// 判断一个函数是否是被bound过
function isBoundFunction(fun) {
  return !!fun[boundFun]
}

// 取出bound对象中的函数
function getBoundFun(fun) {
  return fun[boundFun]
}

// 取出bound对象中的部分入参
function getBoundArgs(fun) {
  return fun[boundArgs]
}

// 考虑bound对象的new实现
function myNew(Fun, ...args) {
  if (isBoundFunction(Fun)) {
    args = getBoundArgs(Fun).concat(args)
    Fun = getBoundFun(Fun)
  }
  const newProto = Fun.prototype instanceof Object ? Fun.prototype : Object.prototype
  const newThis = Object.create(newProto)
  const res = myApplay(Fun, newThis, args)
  return res instanceof Object ? res : newThis
}
```
