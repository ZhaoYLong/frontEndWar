## 每日思考

- flutter 诞生之初目的在于移动端的快速开发和移动端的跨平台开发，说白了就是android和ios，目的在于一套代码两个平台使用

- 思考一下大问题：
  - flutter 构建的移动端APP和andriod 或ios开发出来的APP有何异同？（姑且这么问）
    - 答：
      - 1、由于没有做过android和ios的app开发，没有亲身体验过2者之间所作出app的差距，倒是可以阐述一些已经存在的差异：
        - 原生开发的优势：1、可以访问平台全部功能（GPS、摄像头等）；2、速度快、性能高、可以实现复杂动画及绘制，整体用户体验好。
        - 原生开发之缺点：1、平台固定、开发成本高；不同平台必须维护不同代码，成本高；2、内容固定、动态化弱，大多数情况下，有新功能只能更新时发版；

      - 注： 跨平台技术正是为了解决原生开发的缺点而出现的（动态化开发，及时更新）（节省成本）
      - 2、flutter 做出的app和android或ios做出的app在用户体验上来说，应该是没有多大区别的，主要差距应该还是在其背后的实现原理。flutter提供了专门的AndroidUI库和IOSUI库，在感官上的差距几乎是没有的。
      - 3、其他回答可见```Flutter部分```。
  
  - flutter 构建的APP和vue、react等构建的h5页面嵌入到APP中有何异同？
    - ```在下面的部分已经回答了！```
  

- 思考另一问题：
  - 现在flutter 生态支持将flutter项目编译成web、chrome项目甚至是一些桌面应用。怎么理解
  - flutter项目编译成web项目、桌面项目的原理
  - flutter项目基于dart语言开发，flutter框架源码

- 思考另另一个问题：
  - flutter打包发布的原理
    - 基于JIT的快速开发周期，Flutter在开发阶段采用，采用JIT模式，这样就避免了每次改动都要进行编译，极大的节省了开发时间；
    - 基于AOT的发布包: Flutter在发布时可以通过AOT生成高效的ARM代码以保证应用性能。而JavaScript则不具有这个能力。
    - 这就是Dart语言的精妙之处吧。


  - flutter run 命令执行时，会做哪些工作？

  - Flutter 性能优化实践
    - [中文博客参考](https://juejin.im/post/5dfc64526fb9a01601169c28)


## 每日知识

#### 大知识补充

- 原生应用程序
  - 指某一平台所特有的应用（移动平台：android或ios；PC端：windows、macOS、linux），使用相应平台支持的开发工具和语言，并直接调用系统提供的SDK API。
  - Android原生应用就是使用Java或Kotlin语言直接调用Android SDK开发的应用程序
  - iOS原生应用指通过Object-C或Swift语言直接调用iOS SDK开发的APP

- 跨平台技术分类
  - H5 + 原生（Cordova、Ionic、 微信小程序）
  - JavaScript开发 + 原生渲染（React Native、 Weex）
  - 自绘UI + 原生（QT for mobile、 Flutter）

  - 思考： uni-app算是哪种跨平台技术？ant design mobile又算什么技术？这种开发的页面怎么封装到android或iOS APP里的？
  - 使用vue等技术开发的h5页面一般打包后，部署在服务器端，由app端在webview中调用。（具体细节并没有研究过）
  - [APP里的webview通识](https://juejin.im/post/5bf35ef26fb9a049bc4c438a)

####  H5+原生混合开发
  - 主要原理： 将APP的一部分需要动态变动的内容通过H5来实现，通过原生的网页加载控件WebView(Android)或WKWebView(iOS)来加载。
  - 优点： 
    - 1、H5部分可以随时变更而不需要重新打包发版，动态化需求能满足
    - 2、一次开发，2个平台运行，减少了成本。h5部分功能越多，开发成本越低。
    - 3、动态内容是H5，web技术栈
  - 缺点： 1、性能不好；对于复杂用户界面或动画，webview不堪重任
  - 这类APP称之为混合应用或Hybrid APP，若h5部分占一个应用的大部分，称之为Web APP
  
  - 技术点：
    - 1、混合开发，H5代码运行在WebView（实质就是一个浏览器内核）中，相当于运行在一个权限受限的沙箱中，无法直接访问大部分系统提供的API。对于h5实现不了的功能都需要原生去做。
    - 2、混合框架一般会在原生代码中实现一些访问系统能力的API，然后暴露给WebView提供给javascript使用。
    - 这样一来，WebView就成为了JavaScript与原生API之间通信的桥梁，主要负责JavaScript与原生之间传递调用消息，而消息的传递必须遵守一个标准的协议，它规定了消息的格式与含义，我们把依赖于WebView的用于在JavaScript与原生之间通信并实现了某种消息传输协议的工具称之为WebView JavaScript Bridge, 简称 JsBridge，它也是混合开发框架的核心。

  - 思考：什么样的界面才算复杂界面（怎么界定）？

#### js + 原生渲染
- React Native （JavaScript开发 + 原生渲染）
  - React Native是React在原生移动应用平台的衍生产物，2者主要区别在于：
    - 虚拟DOM映射的对象是什么？
      - React中的虚拟DOM最终映射为浏览器DOM树，RN中的虚拟DOM会通过JavaScriptCore映射为原生控件树

- javaScriptCore是一个javaScript解释器，它在React Native中主要有2个作用：
  - 1、为JavaScript提供运行环境
  - 2、是js和原生App之间通信的桥梁，作用和JsBridge一样。

- RN中将虚拟DOM映射为原生控件的过程：
  - 1、布局消息传递；将虚拟DOM布局信息传递给原生
  - 2、原生根据布局信息通过对应的原生控件渲染控件树

  - 相对于混合应用，由于React Native是原生控件渲染，所以性能会比混合应用中H5好很多，同时React Native使用了Web开发技术栈，也只需维护一份代码，同样是跨平台框架。

- 优点：
  - 采用web开发技术栈，社区庞大、开发成本低
  - 原生渲染，性能较H5提高很多
  - 动态化较好，支持热更新

- 思考： 性能提高指的是什么？哪些性能提高？

- 缺点：
  - 渲染时需要JavaScript和原生之间通信，在有些场景如拖动可能会因为通信频繁导致卡顿
  - JavaScript为脚本语言，执行时需要JIT(Just In Time)，执行效率和AOT(Ahead Of Time)代码仍有差距。
  - 由于渲染依赖原生控件，不同平台的控件需要单独维护，并且当系统更新时，社区控件可能会滞后；除此之外，其控件系统也会受到原生UI系统限制，例如，在Android中，手势冲突消歧规则是固定的，这在使用不同人写的控件嵌套时，手势冲突问题将会变得非常棘手。



#### Flutter

- 该跨平台技术： 自绘UI + 原生
- 思路：通过在不同平台实现一个统一接口的渲染引擎来绘制UI，而不依赖原生控件，所以可以做到不同平台UI的一致性。
- 注意，自绘引擎解决的是UI的跨平台问题，如果涉及其它系统能力调用，依然要涉及原生开发。

- 优点：
  - 性能高：自绘UI引擎直接调用系统API来绘制UI，所以性能和原生接近
  - 灵活、组件库易于维护、UI外观保真度和一致性高：由于UI渲染不依赖原生控件，也就不需要根据不同平台的控件单独维护一套组件库，所以代码容易维护。由于组件库是同一套代码、同一个渲染引擎，所以在不同平台，组件显示外观可以做到高保真和高一致性；另外，由于不依赖原生控件，也就不会受原生布局系统的限制，这样布局系统会非常灵活。

- Flutter的Release包默认是使用Dart AOT模式编译的，所以不支持动态化，但Dart还有JIT或snapshot运行方式，这些模式都是支持动态化的。

- [移动技术发展梳理](https://book.flutterchina.club/chapter1/mobile_development_intro.html)

- Flutter框架结构
  - 这是一个纯 Dart实现的 SDK，它实现了一套基础库，自底向上
    - 底下2层（Foundation,Animation,Painting,Gestures）在Google的一些视频中被合并为一个dart UI层，对应的是Flutter中的```dart:ui```包，它是Flutter引擎暴露的底层UI库，提供动画、手势及绘制能力
    - Rendering层，这一层是一个抽象的布局层，它依赖于dart UI 层，Rendering层会构建一个UI 树，当UI树有变化时，会计算出有变化的部分，然后更新UI树，最终将UI树绘制到屏幕上。```Rendering层可以说是Flutter UI框架最核心的部分```它除了确定每个UI元素的位置、大小之外还要进行坐标变换、绘制(调用底层dart:ui)
    - Widgets层是Flutter提供的一套基础组件库，在基础组件库之上，Flutter还提供了Material和Cupertino两种视觉风格的组件库。
    - Flutter开发的大多场景就是和Material和Cupertino这2个组件交流。

  - Flutter Engine
    - 一个纯C++实现的SDK，其中包括了```SKia引擎```、```Dart运行时```、```文字排版引擎```等。在代码调用 dart:ui库时，调用最终会走到Engine层，然后实现真正的绘制逻辑。

  ![flutter框架](https://pcdn.flutterchina.club/imgs/1-1.png)

- 思考： Rendering层怎么计算出UI树的变化？

#### SKia引擎及Flutter引擎补充

