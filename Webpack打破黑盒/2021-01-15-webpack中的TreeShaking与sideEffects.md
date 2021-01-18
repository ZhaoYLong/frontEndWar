- webpack两个高级特性：
  - Tree Shaking
  - sideEffects

- Tree Shaking
  - 用于剔除代码中没有用到的部分，这部分没有用到的代码更专业的说法叫做为引用代码（dead-code）
  - Tree-shaking最早是Rollup中推出的一个特性，webpack从2.0开始支持这一特性
  - 去除冗余代码是生产环境优化中一个很重要得工作

- 试想一下，如果我们在项目中引入Lodash这种工具库，大部分情况下，我们会使用其中的某几个工具函数，其他没有用到的部分就是冗余代码，通过Tree-shaking就可以极大地减少最终打包之后bundle.js的体量。

- Tree-shaking并不是指webpack中的某一个配置选项，而是一组功能搭配使用过后实现的效果，这组功能在生产模式下都会自动启动，所以使用生产模式打包就会有Tree-shaking的效果。

### 开启Tree Shaking

- 1.设置webpack模式none；
- 2.在配置对象中添加optimization属性，这个属性用来集中配置webpack内置优化功能，它的值也是一个对象。

```js
  module.exports = {
    // ... 其他配置项
    optimization: {
      // 模块只导出被使用的成员
      usedExports: true,
      // 压缩输出结果，会删除未引用的代码
      minimize: true
    }
  }
```

- 这就是Tree-shaking的实现过程，整个过程用到了webpack的两个优化功能：
  - usedExports：打包结果中只导出外部用到的成员
  - minimize：压缩打包结果，删除未引用的代码

### 合并模块

- concatenableModules
  - 作用：尽可能将所有模块合并到一起输出到一个函数中，这样既可以提升运行效率也可以减少代码体积。
  - 这个特性又被称为Scope Hoisting，也就是作用域提升，它是webpack3.0中添加的一个特性。如果在配合minimize，效果更好

### 结合babel-loader的问题

- 早期的webpack发展迅速，那变化也就比较多，所以当我们去找资料时，得到的结果不一定适用于当前我们所使用的版本。而 Tree-shaking 的资料更是如此，很多资料中都表示“为 JS 模块配置 babel-loader，会导致 Tree-shaking 失效”。
- 针对这个问题，作者统一说明一下：
  - 首先明确，Tree-shaking实现的前提是ES Modules，也就是说：最终交给webpack打包的代码，必须是使用ES Modules的方式来组织的模块化
  - 【Tree-shaking 实现的前提是 ES Modules】这句话应该再加上分析解释：“esm规定了在只能在模块顶层 静态化的导入，所以可以在编译阶段就知道到底依赖了哪些模块，而cjs则是动态的导入，只能在运行时得出是否依赖。故不可能支持cjs”就更容易理解其中的why。才能更好的让用户把知识点关联起来，不容易忘记。

- 为啥这么说？
  - 我们都知道webpack在打包所有模块之前，先是将模块根据配置交给不同的Loader处理，最后再将Loader处理的结果打包到一起。
  -  很多时候，我们为了更好的兼容性，会选择使用 babel-loader 去转换我们源代码中的一些 ECMAScript 的新特性。而 Babel 在转换 JS 代码时，很有可能处理掉我们代码中的 ES Modules 部分，把它们转换成 CommonJS 的方式，Babel 具体会不会处理 ES Modules 代码，取决于我们有没有为它配置使用转换 ES Modules 的插件。
  -  很多时候，我们为 Babel 配置的都是一个 preset（预设插件集合），而不是某些具体的插件。例如，目前市面上使用最多的 @babel/preset-env，这个预设里面就有转换 ES Modules 的插件。所以当我们使用这个预设时，代码中的 ES Modules 部分就会被转换成 CommonJS 方式。那 Webpack 再去打包时，拿到的就是以 CommonJS 方式组织的代码了，所以 Tree-shaking 不能生效。

- 我们尝试使用babel-loader，发现Tree-shaking并没有失效：
  - 那到底是怎么回事呢？为什么很多资料都说 babel-loader 会导致 Tree-shaking 失效，但当我们实际尝试后又发现并没有失效？
  - 其实，这是因为在最新版本（8.x）的 babel-loader 中，已经自动帮我们关闭了对 ES Modules 转换的插件，你可以参考对应版本 babel-loader 的源码，

- 我们也可以在babel-loader的配置中强制开启ES Modules转换插件，发现Tree-shaking没有生效

### sideEffects

- webpack4中新增了一个sideEffects特性，它允许我们通过配置标识我们的代码是否有副作用，从而提供更大的压缩空间
  
> TIPS: 模式副作用指的就是模块执行的时候除了导出成员，是否还做其他的事情

- 这个特性一般只有去开发你npmmo模块时，才会用到。

- sideEffects特性和Tree-shaking没有什么关系。

- 所有说，Tree-shaking只能移除没有用到的代码成员，而想要完整移除没有用到的模块，那就需要开启sideEffects特性

- 而 sideEffects 可能需要你花点时间去理解一下，重点就是想明白哪些副作用代码是可以随着模块的移除而移除，哪些又是不可以移除的。

- 总结来说：对全局有影响的副作用代码不能移除，而只是对模块有影响的副作用代码就可以移除