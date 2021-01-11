/**
 * TypeScript 接口
 *  - 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都是抽象的。需要由具体的类去实现
 */
interface IPerson {
  fN:string,
  lN:string,
  sayHi: () => string
}

var customer:IPerson = {
  fN: 'Tom',
  lN: 'Hanks',
  sayHi: ():string => {return "hi"}
}

var employee: IPerson = {
  fN: "Jin",
  lN: 'Blaks',
  sayHi: ():string => {return "hello"}
}

/**
 * 联合类型和接口
 */
interface RunOptions {
  program: string,
  commandline:string[] | string | (() => string)
}

// commandline is string
var options:RunOptions = {
  program: 'test1',
  commandline: 'test1command'
}

// commandline is string array
var optionsArray: RunOptions = {
  program: 'test2',
  commandline: ['hello', 'Jim', 'hank']
}

// commandline is function
var optionsFun: RunOptions = {
  program: 'test3',
  commandline: () => {return 'function'}
}

/**
 * 接口和数组
 *  - 接口中，我们可以将数组的索引值和元素设置为不同类型，索引可以是数字或字符串
 */
interface namelist {
  [index: number]:string
}

// var list2: namelist = ["john", 1, "bran"] // 报错。元素1不是string类型

interface ages {
  [index: string]: number
}
var agelist:ages;
agelist["john"] = 15
// agelist[2] = 'nine

/**
 * 接口继承
 *  - 接口继承就是说接口可以通过其他接口来扩展自己
 *  - TypeScript允许接口继承多个接口
 */

/**
 * 单例继承实例
 */
interface Person {
  age: number
}

interface Musician extends Person {
  instrument:string
}

var drummer = <Musician>{};
drummer.age = 27
drummer.instrument = "Drums"

/**
 * 多继承
 */
interface IParent1 {
  v1: number
}

interface IParent2 {
  v2: number
}

interface Child extends IParent1, IParent2 { }
var Iobj:Child = {v1: 12, v2: 23}
console.log(Iobj);

