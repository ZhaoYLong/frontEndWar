> 在new Vue触发Vue()构造函数，在构造函数里了initMixin()函数，这个函数将_init()挂载到Vue类属性中，然后执行这个_init()函数
> 再将Vue实例赋值给vm；接下来执行初始化函数

- 第一个执行的函数就是initLifecycle

- 源码在 src/core/instance/lifecycle.js

- 特别注意的属性就是
  - $parent
  - $root