- 属性的简洁表示法
- 属性表达式
- 方法的name属性
- 属性的可枚举性和遍历
- super关键字
- 对象的扩展运算符
- 链判断运算符
- Null判断运算符

### 1、属性的简洁表示法
- ES6允许大括号里面，直接写入变量和函数，作为对象的属性和方法。

```js
    const foo = 'bar';
    const baz = {foo};
    baz // {foo: 'bar'}

    // 等同于
    const baz = {foo: foo};
```

### 2、属性名表达式
- js定义对象的属性，有两种方法：
  - 方法一：直接用标识符作为属性名
  - 方法二：用表达式作为属性名

  ```js
    // 方法一
    obj.foo = true;
    // 方法二
    obj['a' + 'bc'] = 123;
  ```

- ES6允许字面量定义对象时用方法二（表达式作为对象的属性名），即把表达式放在方括号里面：
  
  ```js
    let poropKey = 'foo';
    let obj = {
      [poroKey]: true,
      ['a' + 'b'] : 123
    }
  ```

- 属性名表达式与简洁表达式不能同时使用，否则会报错

```js
  // 报错
  const foo = 'bar';
  const bar = 'abc';
  // const baz = {[foo]};

  // 正确
  const foo = 'bar';
  const baz = {[foo] : 'abc'};
```

- 注意，属性表达式若是一个对象，默认情况下会自动将对象转为字符串[object object];

```js
  const keyA = {a:1};
  const keyB = {b:2};

  const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
  };
  myObject // // Object {[object Object]: "valueB"}
```

- 上面代码中，[keyA]和[keyB]得到的都是[object Object]，所以[keyB]会把[keyA]覆盖掉，而myObject最后只有一个[object Object]属性。

### 3、方法的name属性

- 函数的name属性，返回函数名；对象方法也是函数，因此也有name属性
- 若对象的方法使用了取值函数getter(),存值函数setter，则name属性不是在该方法上面，而是该方法的属性的描述对象get和set属性上面，返回值是方法明前加上get和set

```js
  const obj = {
    get foo() {},
    set foo(x) {}
  }; 

  obj.foo.name // error

  const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo')；
  descriptor.get.name // get foo
  descriptor.set.name // set foo
```

- bind方法创造的函数，name属性返回bound + 函数名；
- Function构造的函数，name属性返回anonymous （匿名）

### 4、属性的可枚举性和遍历
  
#### 可枚举性
- 对象的属性都有一个描述对象（Descriptor），用来控制该属性的行为。
- Object.getOwnPropertyDescriptor()可以获取该属性的描述对象
  - 描述对象的enumentable属性，可称为“可枚举性”，若该属性为false，就表示某操作会忽略当前属性
  - 目前，有四个操作会忽略enumrable为false的属性
    - for...in循环：只遍历对象自身和继承的可枚举的属性
    - Object.keys()：返回对象自身的所有可枚举的属性的键名
    - JSON.stringify()：只串行化对像自身的可枚举的属性
    - Object.assgin()：忽略enumrable为false的属性，只拷贝对象自身的可枚举的属性

- 总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替

#### 属性的遍历
- es6一共有5种方法可以遍历对象的属性
  - for...in
  - Object.keys(obj)
  - Object.getOwnPropertyNames(obj)
  - Object.getOwnPropertySymbol(obj)
  - Reflect.ownKeys(0bj)

- 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

  - 首先遍历所有数值键，按照数值升序排列。
  - 其次遍历所有字符串键，按照加入时间升序排列。
  - 最后遍历所有 Symbol 键，按照加入时间升序排列。


### 4、super关键字
- this关键字总是指向函数所在的当前对象，ES6又新增了另一类似关键字super，指向当前对象的原型对象

```js
  const proto = {
    foo: 'hello'
  };

  const obj = {
    foo: 'world',
    find () {
      return super.foo;
    }
  };
 
  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"
```

- 注意，super关键字表示原型对象时，只能在对象的方法之中，用在其他地方都会报错

```js
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```
]

- JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）

### 6、对象的扩展运算符
- ES2018将扩展运算符（...）引入到对象

#### 解构赋值
- 对象的解构赋值用于从一个对象取值，相当于将目标对象的所有可遍历的enumrable、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值都会拷贝到对象上面

```js
let {x,y,...z} = {x:1, y: 2, a:3, b:4};
x // 1
y // 2
z //{a:3, b: 4}
```

#### 扩展运算符
- 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中

```js
  let z = {a: 3, b: 4};
  let n = {...z} 
  n  // {a:3, b:4}
```

- 扩展运算符可以用来合并两个对象

```js
  let ab = {...a, ...b};
  // 等价于
  let ab = Object.assign({}, a, b)
```

### 7、链式判断运算符
- 编程实务中，若读取对象内部的某个属性，往往需要判断一下该对象是否存在。

```js
// 错误写法
const firstName = message.body.user.firstName;

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
```

- 链式判断运算符有三种用法：
  - obj?.prop // 对象属性
  - obj?.[expr] // 同上
  - func?.(...args) // 函数或对象方法的调用

- ?.运算符常见形式

```js
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
//等价于
a == null ? undefined : a[x]

a?.b()
//等同于
a == null ? undefined : a.b()

a?.()
//等价于
a == null ? undefined : a()
```

- 如果a?.b()里面的a.b不是函数，不可调用，那么a?.b()是会报错的。a?.()也是如此，如果a不是null或undefined，但也不是函数，那么a?.()会报错。

- 使用这个运算符，有几点注意：
  - 1、短路机制
    - ?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行
  - 2、delete运算符
    - delete a?.b 等同于 a == null ? undefined : delete a.b // 若a为undefined或null，会直接返回undefined,而不进行delete运算
  - 3、括号的影响
    - 若属性链有圆括号，链式判断运算符对圆括号外部没有影响，只对圆括号内部有影响
    - 一般来说，使用?.运算符的场合，不应该使用圆括号
  - 4、报错场合
    ```js
    // 构造函数
    new a?.()
    new a?.b()

    // 链判断运算符的右侧有模板字符串
    a?.`{b}`
    a?.b`{c}`

    // 链判断运算符的左侧是 super
    super?.()
    super?.foo

    // 链运算符用于赋值运算符左侧
    a?.b = c
    ```

  - 5、右侧不得为十进制数
    - 为了兼容以前的代码，允许foo?.3:0被解析为foo ? .3 : 0, 因此规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个完整的运算符，而会按照三元运算符进行处理，也就是说，那个小数点会归属于后面的十进制数字，形成一个小数


### 8、Null判断运算符
- 读取对象属性的时候，如果某个属性的值是null或undefined，有时候需要为它们指定默认值。常见做法是通过||运算符指定默认值。

```js
const headerText = response.settings.headerText || 'Hello, world!';
const animationDuration = response.settings.animationDuration || 300;
const showSplashScreen = response.settings.showSplashScreen || true;
```

- 上面的三行代码都通过||运算符指定默认值，但是这样写是错的。开发者的原意是，只要属性的值为null或undefined，默认值就会生效，但是属性的值如果为空字符串或false或0，默认值也会生效。

- 为了避免这种情况，ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值

```js
const a = res.asettings ?.a ?? 300
```

- ??有一个运算优先级问题，它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，必须用括号表明优先级，否则会报错