- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.keys(), Object.values(), Object.entries()
- __proto__属性, Object.setPrototypeOf(), Object.getPrototypeOf()
- Object.fromEntries()

### 1、Object.is()
- ES5比较两个值是否相等，只有两个运算符：
  - 相等运算符（==）：缺点自动转换数据类型
  - 严格相等运算符（===）：缺点NaN不等于自身; +0 等于 -0
- ES6提出"Same-value-equality"(同值相等)算法，用来解决这个问题。
- Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
- 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
- ES5可以通过下面的代码，部署Object.is

```js
Object.definProperty(Object, 'is', {
    value: function(x,y) {
        if (x === y) {
            // 针对+0 不等于 -0
            return x !==0 || 1 / x === 1 / y
        }
        // 针对NaN的情况
        return x !== x && y !== y;
    },
    configurable: true,
    enumrable: false,
    writable: true
});
```


### 2、Object.assign()

#### 基本用法
- 用于数组合并，将源对象的所有可枚举属性，复制到目标对象

```js
const target = {a:1};
const source1 = {b:2};
const source2 = {c:3};

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

- Object.assign()方法的第一个参数是目标对象，后面的参数都是源对象。

- 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

#### 注意点
- 1、浅拷贝
  - Object.assign()实行的是浅拷贝，而不是深拷贝。也就是说若源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用

  ```js
    const obj1 = {a: {b: 1}};
    const obj2 = Object.assign({}, obj1);

    obj1.a.b = 2;
    obj2.a.b // 2
  ```

- 2、同名属性的替换
  - 对于嵌套的对象，一旦遇到同名属性，Object.assign()的处理方法是替换，而不是添加

  ```js
    const target = { a: { b: 'c', d: 'e' } }
    const source = { a: { b: 'hello' } }
    Object.assign(target, source)
    // { a: { b: 'hello' } }
  ```

  - 上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。
  - 一些函数库提供Object.assign()的定制版本（比如 Lodash 的_.defaultsDeep()方法），可以得到深拷贝的合并。

- 3、数组的处理
  - Object.assign()可以用来处理数组，但是会把数组视为对象
  ```js
  Object.assign([1,2,3], [4,5]) // [4,5,3]
  // 上面代码中，Object.assign()把数组视为属性名为0、1、2的对象，因此源数组的0号属性4覆盖了目标数组0号属性1

- 4、取值函数的处理
  - Object.assign()只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
  ```js
    const source = {
    get foo() { return 1 }
    };
    const target = {};

    Object.assign(target, source)
    // { foo: 1 }
  ```
- 上面代码中，source对象的foo属性是一个取值函数，Object.assign()不会复制这个取值函数，只会拿到值以后，将这个值复制过去

#### 常用用途
- 1、为对象添加属性

```js
    class Point {
        constructor(x,y) {
            Object.assign(this, {x, y})
        }
    }
    // 通过Object.assign()将x属性和y属性添加到Point类的对象实例
```

- 2、为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

- 3、克隆对象

- 4、合并多个对象