## Proxy
- ES6提供原生的Proxy构造函数，用来生成Proxy实例
- ```var proxy = new Proxy(target, handler);```
- Proxy对象的所有用法，都是上面这种形式，不同的只是handler参数的写法
  - new Proxy()表示一个proxy实例，target参数表示要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为

```js
var proxy = new Proxy({}, {
    get: function(target, propKey) {
        return 35;
    }
});

proxy.time  // 35
proxy.name // 35
```

- 要使Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象（上例是空对象）进行操作
  
```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

- 上例是一个空对象，没有任何拦截效果，访问proxy就等同于访问target

- Proxy支持的拦截操作一览，一共13种
  - get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']
  - set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  - has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值
  - deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
  - ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  - defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  - preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
  - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
  - isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
  - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  - apply(target, object, args)：拦截Proxy实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
  - construct(target, args)：拦截Proxy实例作为构造函数调用的操作，比如new proxy(...args)


## Reflect
- reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的API。Reflect对象的设计目的有这样几个
  - 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法
  - 修改某些Object方法的返回结果，让其变得合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。



## Promise

### 概述
- Promise是异步编程的一种解决方案，比传统的解决方案————回调函数和事件————更合理和更强大。ES6将其写入语言标准，统一了用法，原生提供了Promise对象
- 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

- Promise对象有以下两个特点：
  - 1、对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilling（已成功）、rejected（已失败）。
  - 只有异步操作的结果可以决定当前是哪种状态，任何其他操作都无法改变这个状态。
  - 2、一旦状态改变，就不会再变。状态从pending变成fulfilling，从pending变成rejected。

- Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

- 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。

### 基本用法
- ES6规定，Promise对象是一个构造函数，用来生成Promise实例

```js
// 一个Promise实例
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/*异步操作成功*/) {
    resolve(value);
  } else {
    reject(error);
  }
})
```

- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。是2个函数，由JavaScript引擎提供，不用自己部署
- resolve()的作用就是将Promise对像的状态从“pending”变为resolved，并将异步操作结果传递出去
- reject()的作用就是将Promise对象的状态从“pending”变为rejected，并将异步操作报出的错误，作为参数传递出去

- 一个简单例子：

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then(value) => {
  console.log(value);
}
```

- 上面代码中，timeout()返回一个Promise实例，表示一段时间之后才会发生的结果。过了指定的时间（ms参数）后，Promise实例状态变为resolved。就会触发then()绑定的回调函数。

- Promise新建后会立即执行

```js
let promise = new Promise(function(resolve, reject){
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved');
});

console.log('Hi');

// Promise
// Hi
//resolved
```

- 异步加载图片的例子

```js
function loadImageASync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at' + url));
    };

    image.src = url;
  })
}

// 使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法
```

- 用Promise对象实现的Ajax操作的例子

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if(this.readyState !==4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadyststechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });

  return promise;
};

getJson("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error){
  console.error('出错', error);
});
```


- 一般来说，调用resolve或reject之后，Promise的使命就完成了，后继操作应该放在then方法里，而不应该直接写在resolve或reject之后。所有最好在他们之前加上一个return语句，这样不会有意外


- Promise.prototype.then()
  - Promise实例具有then方法，也就是说then方法是定义在原型对象Promise.prototype上的，它的作用是为Promise实例添加状态时的回调函数。
  - then方法返回的是一个新的Promise实例，（不是原来的promise实例了）。因此可以采用链式写法，即then方法后面再调用另一个then方法