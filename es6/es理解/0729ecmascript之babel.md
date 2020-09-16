## What is Babel?【<span style="color: red;">粗略了解</span>】

### Babel是一个JavaScript编译器
- babel是一个工具链，主要用于将ECMAScript2015+版本的代码转换为向后兼容的js语法
- babel can to do:
  - 语法转换
  - 通过Polyfill方式在目标环境中添加缺少的特性（通过@bable/polyfill模块）
  - 源码转换（codemods）
  - more

    ```js
    [1,2,3].map((n) => n+1);
    //转码成
    [1,2,3].map(function(n) {
        return n+1;
    });
    ```

#### JSX 与 React
- Babel能够转换JSX语法

  ```js
  // 安装preset
  npm install --save-dev @babel/preset-react

  //将@babel/preset-react添加到react项目的配置文件中
  export default React.createClass({
      getInitialState() {
          return {num: this.getRandomNUmber()};
      },

      getRandomNumber() {
          return Math.ceil(Math.random() * 6);
      },

      render() {
          return <div>
            Your dice roll: {this.state.num}
          </div>;
      }
  });
  ```

#### 类型注释（Flow和TypeScript）
- Babel可以删除类型注释
- Babel不做类型检查

```js
// 安装flow preset
npm install --save-dev @babel/preset-flow

// 安装typescript preset
pm install --save-dev @babel/preset-typescrip
```

#### 插件化
- Babel构建在插件之上。使用现有的或者自己编写的插件可以组成一个转换管道。通过使用或创建一个 preset 即可轻松使用一组插件。
- 一个插件就是一个函数

### Babel支持Source map，你可以轻松调试编译后的代码

#### 符合规范
- Babel尽最大可能遵循ECMAScript标准。不过，Babel 还提供了特定的选项来对标准和性能做权衡。

#### 代码紧凑
- Babel尽最大可能用最少的代码并且不依赖太大量的运行环境。因此 Babel 提供了 "loose" 参数，用以在特定的转换情况下在符合规范、文件大小和速度之间做折中。


## ES6+里的babel

> Babel是一个广泛使用的ES6转码器

```js
// 安装Bable
npm install --save-dev @babel/core
```

### 配置文件```.babelrc```
- Babel的配置文件是```.babelrc```，存放在项目根目录，使用Babel第一步就是配置该文件
- 这个文件用来设置转码规则和插件，基本格式：
  ```js
    {
        "presets": [], //设定转码规则，官方提供以下规则集，根据需要安装
        "plugins": []
    }
  ```

- preset：
  ```js
    // 安装转码规则

    //最新转码规则
    npm install --save-dev @babel/preset-env

    //react 转码规则
    npm install --save-dev @babel/preset-react
  ```

- 将规则加入.babelrc
  ```js
    {
        "preset": [
            "@bable/env",
            "@babel/preset-react"
        ],
        "plugins": []
    }
  ```

- 以下所有 Babel 工具和模块的使用，都必须先写好.babelrc

#### 命令行转码
- 工具```@babel/cli```
- 安装```npm install --save-dev @babel/cli```
- 实例：
  
  ```shell
    # 转码结果写入一个文件
    # --out-file 或 -o 参数指定输出文件
    $ npx babel example.js --out-file compiled.js
    # 或者
    $ npx babel example.js -o compiled.js

    # 整个目录转码
    # --out-dir 或 -d 参数指定输出目录
    $ npx babel src --out-dir lib
    # 或者
    $ npx babel src -d lib

    # -s 参数生成source map文件
    $ npx babel src -d lib -s
  ```

#### bable-node模块
- @babel/node模块的babel-node命令,提供一个支持ES6的REPL环境。支持Node的REPL环境的所有功能，且可以直接运行ES6代码

- @babel/register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用 Babel 进行转码。

#### polyfill
- Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

- 举例来说，ES6 在Array对象上新增了Array.from方法。Babel 就不会转码这个方法。如果想让这个方法运行，可以使用core-js和regenerator-runtime(后者提供generator函数的转码)，为当前环境提供一个垫片