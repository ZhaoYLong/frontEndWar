- 初始化阶段做的工作分为2部分：
  - 第一部分：new Vue()，就是创建一个Vue实例
  - 为创建好的Vue实例初始化一些事件、属性、响应式数据等

### new Vue()做了什么？

- new 关键字在JS中表示从一个类中实例化出一个对象；所以Vue实际上就是一个类。
- new Vue()实际上是执行了Vue类的构造函数

- 源码： src/core/instance/index.js


- Vue内置组件：
  - ```<keep-alive>```
  - ```<transition>```
  - ```<transition-group>```