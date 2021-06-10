### call()
- call()方法使用一个指定的this值和单独给出的一个或多个参数调用一个函数。其返回值是使用调用者提供的this值和参数调用该函数的返回值，若该方法没有返回值，则返回undefined

` function.call(thisArg, arg1, arg2, ...)`

#### 实现
- 实现一个call函数，将通过以下几个步骤：
	1. 获取第一个参数（注意第一个参数为null或undefined时，this指向window），构建对象
	2. 将对应函数传入该对象中
	3. 获取参数并执行相应函数
	4. 删除该对象中函数，消除副作用
	5. 返回结果

```js
Function.prototype.myCall = function (context, ...args) {
    // 获取第一个参数（注意第一个参数为null或undefined时，this指向window），构建对象
    context = context ? Object(context) : window;
    // 将对应函数传入该对象中
    context.fn = this;
    // 获取参数并执行相应函数
    let result = context.fn(...args);
    // 消除副作用
    delete context.fn;
    // 返回结果
    return result;
}
// ……
console.log(method.myCall(obj, 3, 4)); // 10
```

### apply()

` func.apply(thisArg, [argsArray])`

#### 实现

```js
Function.prototype.myApply = function (context, arr) {
    context = context ? Object(context) : window;
    context.fn = this;

    let result = arr ? context.fn(...arr) : context.fun();

    delete context.fn;

    return result;
}
// ……
console.log(method.myApply(obj, [3, 4])); // 10
```

### bind()

`function.bind(thisArg[, arg1[, arg2[, ...]]])`

- 例子

```js
function method(val1, val2) {
    return this.a + this.b + val1 + val2;
}

const obj = {
    a: 1,
    b: 2
};

const bindMethod = method.bind(obj, 3, 4);
console.log(bindMethod()); // 10
```

#### 实现

- 实现注意：
	1. 能够改变this指向；
	2. 返回一个函数；
	3. 能够接受多个参数；
	4. 支持柯里化形式传参fun(arg1)(arg2);
	5. 获取到调用bind()返回值后，若使用new调用（当构造函数），bind()传入的上下文context失效

```js
Function.prototype.myBind = function (context, ...args) {
    if (typeof(this) !== 'function') {
        throw new TypeError('The bound object needs to be a function');
    }

    const self = this;
    // 定义一个中装函数
    const fNOP = function() {};
    const fBound = function(...fBoundArgs) {
        // 利用apply改变this指向
        // 接受多个参数+支持柯里化形式传参
        // 当返回值通过new调用时，this指向当前实例 （因为this是当前实例，实例的隐士原型上有fNOP的实例（fnop）；fnop instanceof fNOP为true）
        return self.apply(this instanceof fNOP ? this : context, [...args, ...fBoundArgs]);
    }

    // 将调用函数的原型赋值到中转函数的原型上
    if (this.prototype) {
        fNOP.prototype = this.prototype;
    }
    // 通过原型的方式继承调用函数的原型
    fBound.prototype = new fNOP();

    return fBound;
}
```


### 一种更高级的方式实现三个方法

- [语法上更高级的实现方式](https://github.com/ZhaoYLong/frontEndWar/blob/master/faceAnddwhat/2021-06-10-JS%E5%AE%9E%E7%8E%B0Call%2CApply%2CBind.md)
