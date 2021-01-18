- Rollup是一款ES Modules打包器。它可以将散落的细小模块打包成为整体代码，从而使得这些划分的模块可以更好地运行在浏览器环境或者Node.js环境
  
- 从作用上看，rollup和webapck非常类似，但也有些许不同：
  - rollup更小巧；因为webpack在配合一些插件的使用下，几乎可以完成开发过程中绝大多数前端工程化的工作，而rollup就是一个ES Modules打包器。
  - webpack中支持HMR，而rollup没有办法完全支持

- rollup的目的不是和webpack竞争而是希望提供一个高效的ES Modules打包器，充分利用ES Modules的各项特性，构建出结构扁平，性能出众的类库

- 安装rollup
  - `npm i rollup --save-dev`
- 使用rollup
  - `npx rollup ./src/index.js`
  - `npx rollup ./src/index.js --file ./dist/bundle.js`

- rollup打包结果非常简洁，相比于 Webpack 大量的引导代码和一堆的模块函数，这里的输出结果没有任何多余代码，就是把打包过程中的各个模块按照依赖顺序，先后拼接到了一起。

- Tree-shaking的概念最早就是rollup提出的

### 配置文件

- `rollup.config.js`

```js
  export default {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'es' //输出格式
    }
  }
```

```shell
  npx rollup --config # 使用默认配置文件
  npx rollup --config rollup.prod.js # 使用指定配置文件
```

- webpack中划分了Loader、Plugin、Minimizer三种扩展方式
- rollup只有Plugin一种

### 如何在rollup项目中使用插件
- 安装
- 在配置文件中添加
- 使用

- 因为rollup只能加载本地按文件路径方式的加载，对于node_modules里第三方的模块加载需要借助`@rollup/plugin-node-resolve`插件来解决


### 总结

- rollup优势：
  - 输出结果更加扁平，执行效率更高
  - 自动移除未引用代码，tree shaking
  - 打包结果依然完全可读

- rollup缺点：
  - 加载非ESM的第三方模块比较复杂
  - 因为模块最终被打包到全局中，所以无法实现HMR
  - 浏览器环境中，代码拆分功能必须使用Require.js这样的AMD库

- webapck 大而全
- rollup 小而美

- 选择原则：
  - 应用程序选webpack
  - 类库或者框架开发选择rollup