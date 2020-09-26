- Flow ：Javascript静态类型检查工具

- 为什么用静态类型检查工具Flow？
  - 在于工程上成本和收益的考量
  - 1、使用Flow可以一个一个文件地迁移，成本低
  - 2、Babel和Eslint都有对应的Flow插件以支持语法
  - 3、更贴近ES规范
  - 4、在需要的地方保留 ES 的灵活性，并且对于生成的代码尺寸有更好的控制力 (rollup / 自定义 babel 插件）

- Flow的类型检查方式
  - 类型推断：通过变量的执行上下文来推断出变量类型，然后根据这些推断来检查类型
  - 类型注释：事先注释好我们期望的类型，Flow会基于这些注释来检查

  - 1.数组  var arr: Array<number> = [1,2,3]  // T表示数组中每一项的数据类型
  - 2.类和对象  
    ```js
        /*@flow*/

        class Bar {
        x: string;           // x 是字符串
        y: string | number;  // y 可以是字符串或者数字
        z: boolean;

        constructor(x: string, y: string | number) {
            this.x = x
            this.y = y
            this.z = false
        }
        }

        var bar: Bar = new Bar('hello', 4)

        var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
        a: 'hello',
        b: 11,
        c: ['hello', 'world'],
        d: new Bar('hello', 3)
        }
    ```

  - Null/undefined
    - Flow会检查所有的javascript基础类型--Boolean, String, Number, null, undefined(在Flow中用void代替)
    - 任意类型T可以为null, undefined,写法： var foo :?string = null

- Rollup: 一个前端模块化的打包工具
  - 1.它可以从一个入口文件开始，将所有使用的模块根据命令或者根据 Rollup 配置文件打包成一个目标文件
  - 2.并且 Rollup 会自动过滤掉那些没有被使用过的函数或变量，从而使代码最小化

- webpack和rollup的区别？
  - webpack的2个特性：
    - 1.代码拆分
    - 2.各式各样的加载器
  - rollup的2个特性：
    - 1.其中 Rollup 有两个特别重要的特性，第一个就是它利用 ES2015 巧妙的模块设计，尽可能高效的构建出能够直接被其他 Javascript 库使用的类库
    - 2.tree-shaking
  - 工作中我们到底改用哪个工具？
    - 1.对于应用，使用webpack
    - 2.对于类库使用rollup
    - 3.或者我们有很多静态资源需要处理，再或者我们构建的项目需要引入很多 CommonJS 模块的依赖，那么 webpack 是个很不错的选择
    - 4.如果您的代码库是基于 ES2015 模块的，而且希望我们写的代码能够被其他人直接使用，我们需要的打包工具可能是 Rollup