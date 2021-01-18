- webpack-dev-serve可以提高开发效率，
- 将介绍前端项目在webpack中这么调试

- Source Map
  - 映射转换后的代码与源码之间的关系。一段转换后的代码，通过转换过程中生成的Source Map文件就可以逆向解析得到对应的源码。
  - 目前很多第三方库在发布的文件中都会同时提供一个 .map 后缀的 Source Map 文件；
  - 这是一个JSON格式的文件，主要存在以下几个属性：
    - version 是指定所使用的 Source Map 标准版本；
    - sources 中记录的是转换前的源文件名称，因为有可能出现多个文件打包转换为一个文件的情况，所以这里是一个数组；
    - names 是源代码中使用的一些成员名称，我们都知道一般压缩代码时会将我们开发阶段编写的有意义的变量名替换为一些简短的字符，这个属性中记录的就是原始的名称；
    - mappings 属性，这个属性最为关键，它是一个叫作 base64-VLQ 编码的字符串，里面记录的信息就是转换后代码中的字符与转换前代码中的字符之间的映射关系;

- 一般我们会在转换后的代码中通过添加一行注释的方式来去引入 Source Map 文件。

- webpack中配置Source Map
  - devtool: 'source-map' // 控制台展示的是源代码，知道错误的具体位置

- Eval模式
  - eval指的是js里的一个函数，可以运行字符串里的js代码
  - 通过sourceURL声明这段代码所属的文件路径
  - eval('console.log('foo') //# sourceURL=./foo/bar.js')
  - 构建速度最快
  - 知道错误的文件，但不知道错误的具体位置，且控制台展示的是打包过后的代码

- 通过横向比较：
  - 名字中带有module的模式，解析出来的源码时没有经过Loader加工的
  - 名字中不带module的模式，解析出来的源码是经过Loader加工后的结果
  - 如果我们想要还原一模一样的源码，需要选择cheap-module-eval-source-map模式

- 不同模式的对比：
  - inline-source-map模式
    - 跟普通的source-map效果相同，只不过这种模式下Source Map不是以物理文件存在而是以data URLs的方式存在。
  - hidden-source-map模式
    - 在开发工具中看不到Source Map的效果，但确实生成了Source Map文件。
  - nosources-source-map模式
    - 在这个模式下，我们能到错误出现的位置，但点进去看不到源代码，保护源码在生产环境不暴露

- 选择cheap-module-eval-source-map的原因：
  - 1.使用框架时，以React和Vue.js为例，无论JSX还是vue单文件组件，Loader转换之后差别都很大，需要调试Loader转换之前的源码
  - 2.错误定位到行就可以解决问题
  - 3.虽然这种模式下，打包会比较慢，但是大多数时间内我使用的webpack-dev-server都是在监视模式下重新打包，它打包的速度非常快。

- source Map 会暴露源码到生产环境，
  - 所有生产环境下，不要生成source map文件