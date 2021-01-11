// Typescript支持javascript的新特性，比如支持基于类的面向对象编程

/**
 * 创建一个Student类
 *  - 一个构造函数
 *  - 一些公共字段
 */

 // 类和接口可以一起共作，用户可以自行决定抽象的级别

 // 注意：在构造函数的参数上使用public等同于创建了同名的成员变量

 class Student {
   fullName: string;
   constructor(public firstName, public middleInitial, public lastName) {
     this.fullName = firstName + " " + middleInitial + " " + lastName;
   }
 }

 interface Person3 {
   firstName: string;
   lastName: string;
 }

 function greeter3(person : Person3) {
   return "Hello, " + person.firstName + " " + person.lastName;
 }

 let user3 = new Student("赵", "M.", "仔");

 document.body.innerHTML = greeter3(user3)

 // Typescript里的类只是Javascript里常用的基于原型面向对象编程的简写
