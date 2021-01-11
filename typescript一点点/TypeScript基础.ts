// TypeScript: A Static Type Checker(静态类型检查器)
// TypeScript checks a program for errors before exeution, and does so based on the kinds of values, it's a static type checker.

// A Typed Superset of JavaScript

/**
 * Syntax
 * 语法
 */

// TypeScript是JavaScript的超集：因此，JS语法是合法的TS。
// Syntax refers to the way we write text ro form a program.

/**
 * Type
 * 类型
 */

// console.log(4 / []);
// If you move some code from a JavaScript file to a TypeScript file, you might see type errors depending on how the code is written. These may be legitimate problems with the code, or TypeScript being overly conservative. Throughout this guide we’ll demonstrate how to add various TypeScript syntax to eliminate such errors.

// 语言特性
// TypeScript是一种给JavaScript添加特性的语言扩展。增加的功能包括：
// 类型批注和编译时类型检查
// 类型推断
// 类型擦除
// 接口
// 枚举
// Mixin
// 泛型编程
// 名字空间
// 元组
// Await
// 以下功能是从ECMA2015反向移植而来：
// 类型
// 模块
// lambda函数的箭头语法
// 可选参数以及默认参数

/**
 * TypeScript通过类型注解提供编译时的静态类型检查
 * TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译
 * JS < TS
 * ES5 < ES6 < TS
 */


/**
 * 基础语法
 *  - 模块
 *  - 函数
 *  - 变量
 *  - 语句和表达式
 *  - 注释
 */

const hello: string = "赵仔"
console.log(hello);

// tsc命令可以同时编译多个ts文件

/**
 * tsc常用编译参数：
 *  --help
 *  --module (载入扩展模块)
 *  --target (设置ECMA版本)
 *  --declaration (额外生成一个.d.ts扩展名的文件)
 *  --removeComments (删除文件的注释)
 *  --out (编译多个文件并合并到一个输出的文件)
 *  --sourcemap (生成一个sourcemap(.map)文件)
 *  --module noImplicitAny (在表达式和声明上有隐含的 any 类型时报错)
 *  --watch (在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译)
 */

/**
 * TypeScript 会忽略程序中出现的空格、制表符和换行符
 * TS区分大小写
 * TS分号是可选的，建议使用
 */

/**
 * TS注释
 *  单行 //
 *  多行
 */

/**
  * TS与面向对象
  *   面向对象是一种对现实世界理解和抽象的方法
  *   TS是一种面向对象的编程语言
  *   面向对象主要有两个概念：对象和类
  *     - 对象：对象是类的一个实例，有状态和行为（函数）
  *     - 类： 类是一个模板，它描述一类对象的行为和状态
  *     - 方法：方法是类的操作的实现步骤
  */

class Site {
  name(): void {
    console.log("菜狗：赵仔");
  }
}

var obj = new Site();
obj.name();

/**
 * TS 基础类型
 *  数据类型    关键字    描述
 *  任意类型    any       声明为any的变量可以赋予任意类型的值
 *  数字类型    number    双精度64位浮点值。它可以用来表示整数和分数
 *  字符串类型  string    一个字符系列，单引号、双引号、反引号
 *  布尔类型    boolean   表示逻辑值：true， false
 *  数组类型    无        声明变量为数组
 *    let arr: number[] = [1,2] // 在元素类型后面加上[]
 *    let arr2: Array<number> = [1,2] // 或者使用数组泛型
 *  元组        无        元组类型用来表示已知元素数量和类型的数组，各元素的类型不 必                      相同，对应位置的类型需要相同。
 *    let x: [string, number];
 *    x = ['赵仔', 24]
 *  枚举        enum      枚举类型用于定义数值集合
 *    enum Color {Red, Green, Blue};
 *    let c: Color = Color.Blue;
 *    console.log(c) // 2
 *  void        void      用于标识方法返回值的类型，表示该方法没有返回值
 *  null        null      表示对象值缺失
 *  undefined   undefined 用于初始化变量为一个未定义的值
 *  never       never     never是其他类型（包括null和undefined）的子类型，代表从不会出现的值
 */

// 注意： TS和JS没有整数类型

/**
 * Any类型
 */
let x: any = 1;
x = 'I am 格鲁特';
x = false;

let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100

/**
 * Null and Undefined
 *  null：在javascript中null表示“社么都没有”。null是一个只有一个值的特殊类型。表示一个空对象引用。用typeof检测null返回object
 * 
 *  undefined：在js中，undefined是一个没有设置值的变量。Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型
 */
let x1: number;
x1 = 1;
x1 = undefined; // 运行错误
x1 = null; // 运行错误

// 如果是一个类型可能出现null或undefined，可以以用|
let x2: number | null | undefined;
x2 = 1;
x2 = null;
x2 = undefined;

/**
 * never类型
 *  表示从不会出现的值。声明为never类型的变量只能被never类型所赋值。函数中它通常表现为抛出异常或无法执行到终止点
 */
let x3: never;
let y3: never;
// 运行错误，数字类型不能转为 never 类型
// x3 = 123;

// 运行正确，never 类型可以赋值给 never类型
x3 = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y3 = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}

/**
 * TS变量声明
 *  4种方式来声明变量：
 *    var [name]: [type] = [value];
 *    var [name]: [type];
 *    var [name] = [value];
 *    var [name]
 */

/**
 * 类型断言 （Type Assertion）
 *  - 用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型
 *    <type>value
 *    value as type
 */
var str = '1';
var str2: number = <number> <any> str // str、str2是string类型

/**
 * 类型推断
 *  - 当类型没有给出时，TS编译器利用类型推断来推断类型
 */

/**
 * 变量作用域
 *  - 指定了变量定义的位置和作用范围
 *  - 全局作用域
 *  - 类作用域
 *  - 局部作用域
 */

/**
 * TS 函数
 */
function greet4(): string {
  return "赵仔"
}
function caller() {
  var msg = greet4()
  console.log(msg);
}
caller()

/**
 * 带参函数
 */
function add(x: number, y: number): number {
  return x + y
}
console.log(add(1,2));


/**
 * 可选参数和默认参数
 */
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return 'hhh'
  } else {
    return 'ooo'
  }
}

/**
 * 默认参数
 */
function cal(price: number, rate: number = 0.50) {
  var discount = price * rate
  console.log(discount);
}

/**
 * 剩余参数
 *  - 将一个不确定数量的参数作为一个数组传入
 */
function build(fN: string, ...restN: string[]) {
  return fN + restN.join("")
}
let employeeName = build("Joseph", "Samuel", "Lucas", "MacKinzie");

/**
 * 匿名函数
 *  - 匿名函数是一个没有函数名的函数。
      匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。
      我们可以将匿名函数赋值给一个变量，这种表达式就成为函数表达式
 */

/**
 * 构造函数
 */
var myFunction = new Function("a", "b", "return a * b");
var myx = myFunction(4, 3)
console.log(myx);

/**
 * lamdba函数
 */

/**
 * 函数重载
 */