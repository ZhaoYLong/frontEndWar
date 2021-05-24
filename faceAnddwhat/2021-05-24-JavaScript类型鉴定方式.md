### JavaScript四种数据类型判断方法
- Number
- String
- Boolean
- Null
- Undefined
- Symbol
- Object
- Function
- BigInt

#### typeof
- 使用方式：
  - typeof()
  - typeof 变量名

- 可以判断的类型：
  - number
  - string
  - boolean
  - function
  - undefined
  - symbol

#### instanceof
- instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上，返回布尔值
- 用于指示一个变量是否属于某个对象的实例
- `object instanceof constructor`

```js
const arr = [1, 2];
// 判断Object的prototype有没有在数组的原型链上
console.log(arr instanceof Object); // true
// 数组arr的原型
const proto1 = Object.getPrototypeOf(arr);
console.log(proto1); // []
// 数组arr的原型的原型
const proto2 = Object.getPrototypeOf(proto1);
console.log(proto2); // []
// Object的prototype
console.log(Object.prototype);
// 判断arr的原型是否与Object的prototype相等
console.log(proto1 === Object.prototype); // false
// 判断arr的原型的原型是否与Object的prototype相等
console.log(proto2 === Object.prototype); // true
```

#### constructor
- 这个判断方法涉及到原型、构造函数和实例之间的联。

> 在定义一个函数（构造函数）的时候，JS引擎会为其添加prototype原型，
> 原型上有其对应的constructor属性指向该构造函数，从而原型和构造函数之间互相知道对方。
> 当构造函数实例化的时候，会产生对应的实例，其实例可以访问对应原型上的constructor属性，
> 这样该实例就可以了解到通过谁产生了自己，这样就可以在新对象产生之后了解其数据类型。

```js
const val1 = 1;
val1.constructor; // [Function: Number]

const val2 = 'abcl;
val2.constructor; // [Function: String]

const val3 = true;
val3.constructor; // [Function: Boolean]
```

- 缺点：
  - 1.null和undefined是无效对象，因此是不会有constructor存在的，所以这两种类型需要通过起来类型来判断。
  - 2.函数的constructor是不稳定的，这个主要体现在自定义对象上，当开发者重写prototype后。原有的constructor引用会丢失，constructor会默认为Object

#### toString()
- toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 `[[Class]]` 。这是一个内部属性，其格式为`[object Xxx]` ，
- 其中 Xxx 就是对象的类型。
- 所以利用Object.prototype.toString()方法可以对变量的类型进行比较准确的判断。

```js
function type(target) {
    const ret = typeof(target);
    const template = {
        "[object Array]": "array", 
        "[object Object]":"object",
        "[object Number]":"number - object",
        "[object Boolean]":"boolean - object",
        "[object String]":'string-object'
    }
    if(target === null) {
        return 'null';
    }
    else if(ret == "object"){
        const str = Object.prototype.toString.call(target);
        return template[str];
    }
    else{
        return ret;
    }
}

```
