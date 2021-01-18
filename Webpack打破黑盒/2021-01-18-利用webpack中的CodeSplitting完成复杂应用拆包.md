- webpack的一些用法和特性都是为了在开发阶段能够拥有更好的开发体验，随着开发体验的提升，我们的打包结果会越来越臃肿

- webapck 4 推出了 mode的用法， 为我们在不同模式下预设了一些相应配置。

### 不同环境下的配置

- 创建不同配置的方式主要有两种：
  - 在配置文件中添加相应的判断条件，根据环境不同导出不同配置；
  - 为不同环境单独添加一个配置文件，一个环境对应一个配置文件。

- 第一种方式：
  - webpack配置文件支持导出一个函数，然后在函数中返回所需要的配置对象，这个函数可以接收2个参数，第一个是env，是我们通过CLI传递的环境名参数；第二个是argv，是运行CLI过程中的所有参数

  ```js
    // webpack.config.js
    module.exports = (env, argv) => {
      return {
        // ... webpack配置
      }
    }
  ```

  - 我们借助这个特性，为开发环境和生产环境创建不同的配置。我们先将不同模式下的公共的配置定义为一个config对象，然后通过判断，再为config对象添加不同环境下的特殊配置

  ```js
    // webpack.config.js
    module.exports = (env, argv) => {
      const config = {
        // ... 不同模式下公共配置
      }
      if (env === 'development') {
        // 开发模式下的特殊配置
        config.mode = 'development'
        config.devtool = 'cheap-eval-module-source-map'
      } else if (env === 'production') {
        config.mode = 'production'
        config.devtool = 'nosources-source-map'
      }

      return config
    }
  ```

- 第二种配置方式：
  - 通过判断环境名参数返回不同配置对象的方式只适用于中小型项目，因为一旦项目变得复杂，我们的配置也会一起变得复杂起来。所以对于大型的项目来说，还是建议使用不同环境对应不同配置文件的方式来实现。
  - 一般在这种方式下，项目最少会有三个webpack的配置文件：
  
  ```shell
    webpack.common.js # 公共配置，抽象两者相同的配置
    webpack.dev.js # 开发模式配置
    webpack.prod.js # 生产模式配置
  ```

  - 在不同环境的具体配置中，我们先导入公共配置对象，然后这里可以使用Object.assign方法把公共配置对象复杂到具体配置对象中：

  ```js
    // webpack.common.js
    module.exports = {
      // ...公共配置
    }

    // webpack.prod.js
    const common = require('./webpack.common')
    module.exports = Object.assign(common, {
      // ... 生产环境配置
    })

    // webpack.dev.js
    const common = require('./webpack.common')
    module.exports = Object.assign(common, {
      // ... 开发环境配置
    })
  ```

  - 如果你熟悉 Object.assign 方法，就应该知道，这个方法会完全覆盖掉前一个对象中的同名属性。这个特点对于普通值类型属性的覆盖都没有什么问题。但是像配置中的 plugins 这种数组，我们只是希望在原有公共配置的插件基础上添加一些插件，那 Object.assign 就做不到了。

  - 可以使用Lodash提供的merge函数来实现，这里我们使用社区提供的webpack-merge，用来满足我们这里合并webpack配置的需求
  - `npm install webapck-merge --save-dev`
  
  ```js
    // ./webpack.common.js
    module.exports = {
      // ... 公共配置
    }
    // ./webpack.prod.js
    const merge = require('webpack-merge')
    const common = require('./webpack.common')
    module.exports = merge(common, {
      // 生产模式配置
    })
    // ./webpack.dev.jss
    const merge = require('webpack-merge')
    const common = require('./webpack.common')
    module.exports = merge(common, {
      // 开发模式配置
    })
  ```

  - 使用webpack-merge之后，这里的配置对象就和普通的webpack配置一样了。
  - 因为没有默认的配置文件了，所以通过设置--config参数来指定我们所使用的配置文件路径
  - `$ webpack --config webpack.product.js` 
  

### 生产模式下的插件优化

- define plugin
  - 是用来为我们代码中注入全局成员的。在production模式下，默认通过这个插件往代码中注入了一个process.env.NODE_ENV。很多第三方模块都是通过这个成员去判断运行环境，从而决定是否执行例如打印日志之类的操作。
  - 这里我们来单独使用一下这个插件。我们回到配置文件中，DefinePlugin 是一个内置的插件，所以我们先导入 webpack 模块，然后再到 plugins 中添加这个插件。这个插件的构造函数接收一个对象参数，对象中的成员都可以被注入到代码中。代码如下：

  ```js
    // webpack.config.js
    const webapck = require('webpack')
    module.exports = {
      // ... 其他配置
      plugins: [
        new webpack.DefinePlugin({
          API_BASE_URL: '"https://api/example.com"'
        })
      ]
    }
  ```

- Mini CSS Extract Plugin
  - 对于CSS文件的打包，一般我们会使用style-loader进行处理，这种处理方式最终的打包结果就是CSS代码嵌入到JS代码中。
  - mini-css-extract-plugin 是一个可以将 CSS 代码从打包结果中提取出来的插件，它的使用非常简单，同样也需要先通过 npm 安装一下这个插件。
  
  ```js
    // ./webpack.config.js

    const MiniCssExtractPlugin = require('mini-css-extract-plugin')

    module.exports = {

      mode: 'none',

      entry: {

        main: './src/index.js'

      },

      output: {

        filename: '[name].bundle.js'

      },

      module: {

        rules: [

          {

            test: /\.css$/,

            use: [

              // 'style-loader', // 将样式通过 style 标签注入

              MiniCssExtractPlugin.loader,

              'css-loader'

            ]

          }

        ]

      },

      plugins: [

        new MiniCssExtractPlugin()

      ]

    }

  ```

  - 个人经验是如果 CSS 超过 200KB 才需要考虑是否提取出来，作为单独的文件。

- Optimize CSS Assets webpack Plgin
  - 用来压缩样式文件