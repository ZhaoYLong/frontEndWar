> 你连源码都不看，你想看什么？看个鬼啊！

### 学习flutter源码前的准备
- 不一知半解了事，会用就行不可啊，有了解背后运行原理的冲动
- 有信心！```how hard can it be？```
- 掌握Dart语言，了解dart语言的特性并习惯之
- 阅读介绍框架的文章资料，以官方文档为准
- 在```《0722flutter思考》```中已经提到了```Rendering层```是Flutter UI的核心

![Rendering核心](https://user-gold-cdn.xitu.io/2019/3/5/16949bfa3d932c82?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 利用经验
  - ```我就是个垃圾```
  - 作为前端开发，对GUI编程有一个更高层次的理解是重要的；
  - 只要是面向用户的界面开发，无论是web，移动端还是各种桌面应用都要考虑：
    - 和用户交互
    - 事件驱动模型
    - 界面布局、绘制、光栅化
    - 和后台数据交互
    - 界面动态渲染
    - 网络协议等

### 学习中的骚操作
- 找准切入点（2个）：
  - 最上层的，框架提供的各种API，Flutter中的就是```StateWidget, StatelessWidget, StatefulWidget, setState(), runApp()```等等
  - 最底层的和Flutter 引擎交互的```window```
  - 这2者都是框架的边界，入手时可以自上而下也可以自下而上。

- 专注于主流程
  - 就是渲染流水线（Rendering层的Rendering Pipeline）
  - 其他枝节可以省略

- 去粗取精
  - Flutter框架源代码中除了主要功能相关的代码之外，还存在着很多和调试，异常处理等逻辑。特别是有大量的assert断言语句。这些逻辑也是需要暂时剔除的以避免干扰我们的学习进程。
  - 在看源码的时候通过这样的操作可以排除干扰，快速掌握关键逻辑
  - [详解](https://juejin.im/post/5d9ffb90e51d4577ea077ef3)

- 举一反三
  - 万物皆有套路
  - Flutter框架源代码中有一些普遍使用的套路，要了解套路
  - 渲染流水线的构建build、布局layout、绘制阶段paint，都是相似的逻辑

- 借助工具
  - Flutter框架也提供了很多的工具给开发者，大家在学习源码的的时候可以充分利用这些工具来帮助自己。比如Flutter inspector。可以让你能清晰的看到element tree, renderObject tree。有助于理解它们之间的关系。
  - 学会使用Flutter提供的一些Flag，打断点，跟踪流程。

- 做笔记
- 有耐心

### 学习后的补充
- 初步掌握主流程之后，再回头看分支流程，丰富对Flutter UI的认识
- 反复看，每一遍都有新收获
- 每一遍都思考
- 写成文章