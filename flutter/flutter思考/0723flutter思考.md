## 每日思考

#### 我要思考什么呢？是页面？是结构？是学习的动力？
- CPU渲染图片和GPU渲染图片的区别？（SKia图形引擎）（Flutter渲染优化思路之一）

- Rendering层的工作流程和原理，计算UI树的方法？

- 在Flutter种直接调用底层```dart:ui```可以做哪些工作？

- 学习Flutter的方式：
  - 官网
  - 源码及注释；源码注释应作为学习Flutter的第一文档，Flutter SDK的源码是开源的，并且注释非常详细，也有很多示例，实际上，Flutter官方的SDK文档就是通过注释生成的
  - Github、stackoverflow
  - Gallery源码；Gallery的源码在Flutter源码“examples”目录下

- Hot Reload热重载失效问题？
  - 在给 Terminal 之类的终端模拟器设置代理之后，会导致“Hot Reload”重载失效，此时调用 Save (cmd-s / ctrl-s)将不会进行热重载，热重载按钮 (带有闪电⚡️图标的按钮)也不会显示，将代理移除即可解决。
  - 修改main()、全局静态方法，热重载不会生效。
  - 热重载只会重构整个widget树。当修改不在构建widget树的过程中，hot reload不会起作用
  - ```思考：热重载是全局重载还是局部只重载修改的部分，怎么计算？```

- Dart VS Javascript
  - javaScript弱类型


## 每日知识

#### Skia图形库
- [介绍](https://skia.org/index_zh)
- 开源的二维图形库
- 提供各种常用的API，并可在多种软硬件上运行
- Flutter使用之当作图形引擎

- google一个底层的图形、动画、SVG、文本等多方面的图形库，是Android种图形系统的引擎

- 具体细节先不做了解