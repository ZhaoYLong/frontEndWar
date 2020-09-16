### 1、概述

- ES5的对象属性名都是字符串，容易造成属性名的冲突；ES6为了从根本上防止属性名的冲突，引入了symbol

- ES6引入了一种新的原始数据类型Symbol，表示独一无二的值
  - undefined
  - null
  - boolean
  - String
  - Number
  - Object
  - Symbol

- Symbol值通过Symbol函数生成。这就是说对象的属性名现在有2种，一种是原有的字符串，另一种是新增的Symbol类型。

```js 
    let s = Symbol();
    typeof s // symbol
```

- Symbol函数前不能使用new命令，否则会报错，因为生成Symbol是一个原始的类型的值，不是对象，也就是说由于Symbol值不是对象，所以不能添加属性。
- 它是一种类似于字符串的数据类型

- Symbol函数的参数只是表示对当前Symbol值得描述，因此相同参数得Symbol函数得返回值是不相等的。

```js
let s1 = Symbol()
let s2 = Symbol()
s1 === s2 // false

let s3 = Symbol('foo')
let s4 = Symbol('foo')
s3 === s4 // false
```

- Symbol值不能与其他类型的值进行运算，会报错
- Symbol值可以显示转为字符串
- Symbol值可以转为布尔值，但是不能转为数值


### 2、Symbol.prototype.description
- 创建一个Symbol时，可以添加一个描述

```js
const sym = Symbol('foo')
// 字符串foo就是sym的描述
```

- ES2019提供了一个实例属性description，直接返回Symbol的描述
- sym.description // foo

### 3、作为属性名的Symbol
- 由于每一个Symbol值都不相等，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况有益

```js
let mySymbol = Symbol();

// 第一种写法
let a = {}
a[mySymbol] = "hello";

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

- Symbol值不能作为对象属性名时，不能用点运算符

```js
const mySymbol = Symbol();

const a = {}

a. mySymbol = "hello";
a[mySymbol] // undefined
a['mySymbol'] // "hello"
```


### 4、实例：消除魔术字符串
- 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一具体的字符串或者数值。风格良好的代码应该尽量消除魔术字符串，改由含义清晰的变量代替

```js

```