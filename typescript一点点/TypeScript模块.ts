/**
 * TS模块的设计理念是可以更换的组织代码
 * 模块是在其自身的作用域里执行，并不是在全局作用域，这意味着定义在模块的变量、函数和类等在模块外部是不可见的，除非明确使用export导出它们。
 * 两个模块之间的关系是通过在文件级别上使用 import 和 export 建立的。
 */

 // 导出
 export interface SomeInterface {
   // codes
 }

// 导入
// import someInterface = require('./SomeInterface')