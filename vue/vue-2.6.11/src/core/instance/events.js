/* @flow */

import {
  tip,
  toArray,
  hyphenate,
  formatComponentName,
  invokeWithErrorHandling
} from '../util/index'
import { updateListeners } from '../vdom/helpers/index'

export function initEvents (vm: Component) {
  vm._events = Object.create(null)  // 在vm上新增_events属性并将其赋值为空对象，用来存储事件; 事件中心
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners // 将父组件注册的事件赋给listeners
  if (listeners) {
    // listeners不为空，调用下面的函数
    updateComponentListeners(vm, listeners)
  }
}

let target: any

function add (event, fn) {
  target.$on(event, fn)
}

function remove (event, fn) {
  target.$off(event, fn)
}

function createOnceHandler (event, fn) {
  const _target = target
  return function onceHandler () {
    const res = fn.apply(null, arguments)
    if (res !== null) {
      _target.$off(event, onceHandler)
    }
  }
}

export function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, createOnceHandler, vm)
  target = undefined
}

export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
      // 传入得事件名是一个数组，表示需要一次订阅多个事件，就遍历该数组，把每一个事件都递归调用$on方法将其作为单个事件订阅
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      // 如果不是数组，那就当做单个事件名来处理，以该事件名作为key，先尝试在当前实例的_events属性中获取其对应的事件列表，
      //如果获取不到就给其赋空数组为默认值，并将第二个参数回调函数添加进去
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  Vue.prototype.$once = function (event: string, fn: Function): Component {
    // 被监听的事件是event；对应的回调是fn
    const vm: Component = this
    function on () { // 定义一个子函数on
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn  // 用子函数on替换了原本的订阅事件所对应的回调fn
    vm.$on(event, on) // 在这个函数内部，先通过$on方法订阅事件，同时使用的回调函数不是原本的fn而是子函数on；在子函数里通过$off方法移除订阅的事件；接着执行原本的回调fn
    return vm
  }

  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    if (!arguments.length) {  // 没有传入任何参数，则移除所有的事件监听器
      vm._events = Object.create(null) // 将_events设置为null
      return vm
    }
    // array of events
    if (Array.isArray(event)) { // 只传入事件，，当事件名是数组，则遍历递归调用$off方法
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]  // 获取到需要移除的事件名在事件中心中对应的回调函数cbs
    if (!cbs) { // 若cbs不存在，则直接退出
      return vm
    }
    if (!fn) { // 若没有传入回调函数，则销毁当前事件中心的该事件名的事件
      vm._events[event] = null
      return vm
    }
    // specific handler
    // 剩下就就是第三种情况，提供了eventName和cbs, 移除这个回调的监听器
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') {
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    let cbs = vm._events[event]  // 根据当前传入的事件名，从事件中心_events数组中取出该事件名对应的回调函数cbs
    if (cbs) {
      // 由于cbs是一个数组，所以遍历该数组，拿到每一个回调函数，执行回调函数并将附加参数args传给该回调
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
}
