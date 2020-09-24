import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // 构造函数的核心代码
  // 调用原型上的_init(otions)方法并把用户所写的options传入
}

// _init(options)在initMixin()中定义

initMixin(Vue)
// initMixin()内部给Vue类的原型上绑定了_init()方法，new Vue就相当于执行_init方法
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
