/**
 * TS是面向对象的JS
 * TS支持面向对象的所有特性，比如类、接口
 * 类描述了所创建的对象共同的属性和方法
 */

import { log } from "three";

/**
 * 定义类的关键字为clss，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：
 *  - 字段——是类里面声明的变量。字段表示对象的有关数据
 *  - 构造函数——类实例化时调用，可以为类的对象分配内存
 *  - 方法——对象要执行的操作
 */
class Car {
  // 字段
  engine:string;
  // 构造函数
  constructor(engine:string) {
    this.engine = engine
  }

  // 方法
  disp():void {
    console.log("发动机为：", this.engine);
  }
}

/**
 * 使用new关键字来实例化类的对象
 */
var obj = new Car('Engine 1')

// 访问obj对象的字段和方法
obj.engine
obj.disp()

/**
 * 类的继承
 *  - TS支持继承类，
 *  - 关键字 extends
 *  - 字类不能继承父类的私有成员（方法和属性）和构造函数，其他的可以继承
 *  - TS一次只能继承一个类，不支持多继承。但是支持多重继承（A继承B；B继承C；）
 */
class Shape {
  Area:number;
  constructor(a:number) {
    this.Area = a
  }
}

class Circle extends Shape{
  disp():void {
    console.log("圆的面积：", this.Area);
  }
}

var objShape = new Circle(223)
objShape.disp()

/**
 * 继承类的方法重写
 *  - 类继承后，子类可以对父类的方法重新定义，该过程称之为方法的重新
 *  - 其中super关键字是对父类的直接引用，该关键字可以引用父类的属性和方法
 */
class PrinterClass {
  doPrint():void {
    console.log("父类的doPrint()");
  }
}

class StringPrinter extends PrinterClass {
  doPrint():void {
    super.doPrint() // 调用父类的函数
    console.log("子类的doPrint()");
    
  }
}

/**
 * static:用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用
 */
class statics {
  static num:number;
  
  static disp():void {
    console.log("num值为：" + statics.num);
  }
}
statics.num = 12 // 初始化静态变量
statics.disp() // 调用静态方法

/**
 * 访问控制修饰符
 *  TS中可以使用控制符来保护对类、变量、方法和构造方法的访问
 *  - public：公用，可以在任何地方被访问
 *  - protected：受保护，可以被其自身以及字类和父类访问
 *  - private：私有，只能被其定义所在的类访问
 */
class Encapsulate {
  str1:string;
  private str2:string = "world";
  constructor(str:string) {
    this.str1 = str
  }

}
var objEn = new Encapsulate("hello")
console.log(objEn.str1); // str2私有

/**
 * 类和接口
 *  - 类可以实现接口，使用关键字implements，并将interest字段作为类的属性使用
 */
interface ILoan {
  interest: number
}
class AgriLoan implements ILoan {
  interest:number;
  rebate:number
  constructor(interest:number,rebate:number) { 
    this.interest = interest 
    this.rebate = rebate 
 } 
}
var objAg = new AgriLoan(10, 1)
console.log("利润为 : "+objAg.interest+"，抽成为 : "+objAg.rebate )