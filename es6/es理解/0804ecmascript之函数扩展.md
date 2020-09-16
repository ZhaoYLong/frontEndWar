### 1、函数参数的默认值

#### 基本用法
- ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法

```js
function log(x,y) {
    y = y || 'world';
    console.log(x, y);
}
log('hello') // hello world
log('hello', 'china') // hello china
log('hello', '') // hello world

```

- 写法的缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用。就像上面代码的最后一行，参数y等于空字符，结果被改为默认值。

- 为了避免这个问题，通常需要先判断一下参数y是否被赋值

```js
if (typeof y === 'undefined') {
    y = 'World'
}
```

- ES6允许为函数设置默认值，即直接写在参数定义的后面
  
```js
function log(x, y='world') {
    console.log(x,y)
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

function Point(x=0, y=0) {
    this.x = x;
    this.y = y;
}

const p = new Point();
p // {x: 0, y:0}
```

- 参数变量是默认声明的，所以不能使用let或const再次声明。

- 使用参数默认值时，函数不能有同名参数

```js
// no error
function foo(x,x,y){}

// error
function foo(x,x,y=1) {}
```

- 参数默认值不是传值的，而是每次都重新计算默认值表达式的值。参数默认值是惰性传值的。

#### 与解构赋值默认值结合使用
  
```js
function foo({x, y=5}) {
    console.log(x,y)
}

foo({x:1}) // 1,5
foo({}) // undefined 5
foo({x:1,y:2}) // 1 2
foo() // error x underfined

// 将foo()改造成如下式，避免foo()报错
function foo({x, y = 5} = {}) {
    console.log(x, y);
}
foo() // undefined 5
```

- <span style="color: red;">下面2种写法有何差别</span>
  
```js
    // 1
    function m1({x=0,y=0} = {}) {
        return [x,y]
    }

    // 2
    function m2({x, y} = {x:0, y:0}) {
        return [x,y]
    }
```

- 上述2种写法都对函数的参数设定了默认值，区别在于：
  - 写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；
  - 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值

#### 参数默认值的位置
- 通常情况下，定义了默认值的参数，应该是函数的尾参数，因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

```js
// 1
function f(x=1,y) {
    return [x,y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(,1) // error
f(undefined, 1) // [1,1]
```

- 有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。
- 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

#### 函数的length属性
- 指定默认值后，函数的length属性，将返回没有指定默认值的参数个数，也就是说指定默认值后，length属性将失真

```js
(function (a){}).length // 1
(function (a=8){}).length // 0
(function (a,b,c=5) {}).length // 2
```

- 某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入length属性。

```js
(function(...args){}).length // 0
```

- 若设置了默认值的参数不是尾参数，那么length属性也不再计入后面的·1参数

```js
(function (a=0,b,c) {}).length // 0
(function (a, b=1, c){}).length // 1
```

#### 作用域
- 参数设置默认值，函数进行声明初始化时，参数形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。
- 这种语法行为，在不设置参数默认值时，是不会出现的。


### 2、rest参数
- ES6引入了rest参数（形式为...变量名），用于获取函数的多余参数，这样就不需要argument对象了。
- rest参数搭配的变量是一个数组

```js
function add(...values) {
    let sum = 0;
    for (var val of values) {
        sum+=val;
    }
    return  sum;
}

add(2，5，3) // 10
```

- 下例：rest参数代替argument变量

```js
// arguments 变量的写法
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}

// rest 参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

- arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用

- 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

- 函数的length属性，不包括rest参数

```js
(function (a){}).length // 1
(function (...a){}).length // 0
(function (a, ...b){}).length // 1
```

### 3、严格模式
- ES5 开始，函数内部可以设定为严格模式
  
```js
    function doSome(a,b) {
        'use strict'
        return 'hhh'
    }
```

- ES2016规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

```js
//error
function dosome(a, b=a) {
    'use strict'
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```

- 有2种方法来规避这种错误：
  - 第一种： 设定全局性的严格模式
  ```js
    'use strict';
    function dosome(a, b=a){}
  ```
  - 把函数包在一个无参数的立即执行函数里面
  ```js
    const dosome = (function () {
        'use strict'
        return function(value = 42) {
            return value;
        }
    }())
  ```

### 4、name属性
- 返回函数名```foo.name```
- Function构造函数返回的函数实例，name属性的值为anonymous
- bind返回的函数，name属性值回加上bound前缀
  ```js
    function foo(){};
    foo.bind({}).name // "bound foo"
    (function() {}).bind({}).name // "bound"
  ```

### 5、箭头函数
- ES6允许使用箭头函数（=>）定义函数

- 箭头函数有几个注意点：
  - 1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
  - 2.不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
  - 3.不可以使用argument对象，该对象在函数体内不存在。若要用，可以用rest参数代替
  - 4.不可以使用yield命令，因此箭头函数不能用作Generator函数
  - this对象的指向是可变的，但是在箭头函数种，它是固定的

  ```js
    function foo() {
        setTimeOut(() => {
            console.log('id: ', this.id);
        }, 100);
    }

    var id = 21;
    foo.call({id: 42});
  ```

- setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo()函数生成时，而他的真正执行要等到100毫秒后，如果是普通函数，执行时this应该执行全局对象window，这个应该输出21.但是箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出是42.

- this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以就不能用作构造函数

- 箭头函数转成ES5代码

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log('id: ', this.id);
  }, 100);
}

// ES6
function foo() {
  var _this = this;
  setTimeout(function () {
    console.log('id: ', _this.id);
  }, 100);
}
```

- 问题：下面代码之中有几个this？

```js
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id: ', this.id);
      };
    };
  };
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
```

- 上面代码之中，只有一个this，就是foo()的this，所以t1、t2、t3都输出同样的结果。
- 因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

- 除了this，arguments、super、new.target这个三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量

```js
function foo() {
  setTimeout(() => {
    console.log('args: ', arguments);
  }, 100);
}

foo(2,4,6,8) // args: [2,4,6,8]
```

- 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向

```js
(function() {
  return [
    (() => this.x).bind({x: 'inner'})()
  ];
}).call({x: 'outer'});
```

- 上面代码中，箭头函数没有自己的this，所以bind()无效，内部的this指向外部的this


#### 不适合场合
- 由于箭头函数使得this从动态变成静态，下面2个场景不应该使用箭头函数
  - 1、第一个从场合：是定义对象的方法，且该方法内部包括this
  - 2、需要动态this的时候，也不应该使用箭头函数


#### 嵌套的箭头函数

```js
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) +1, 0, value);
  return array;
}})});

insert(2).into([1,3]).after(1); [1,2,3]
```

- 部署管道机制（pipeline）

### 6、尾调用
- Tail Call是函数式编程的一个重要概念，就是指某个函数的最后一步是调用另一个函数

```js
function f(x) {
  return g(x)
}
```

- 尾调用不一定出现在函数尾部，只要是最后一步操作即可

```js
function f(x) {
  if (x > 0) {
    return m(x)
  } 
  return n(x)
}
```

#### 尾调优化
- 尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

- 我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3)
```

- 上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。

- 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

- 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”

- 注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持

#### 尾递归
- 函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

- 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

#### 严格模式
- ES6的尾调优化只在严格模式下开启，正常模式是无效的

- 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- func.arguments：返回调用时函数的参数。
- func.caller：返回调用当前函数的那个函数。
- 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效

```js
function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();
```

#### 尾递归优化的实现

- 尾递归优化只在严格模式下生效，在正常模式下可以自己实现尾递归优化
- 尾递归优化之原理非常简单：尾递归之所以需要优化，原因是调用栈太多，造成溢出，只有减少调用栈就不会溢出，可以采用循环换掉递归

- 实例

```js
function sum(x,y) {
  if (y > 0) {
    return sum(x+1, y-1);
  } else {
    return x;
  }
}
sum(1, 100000); // Uncaught RangeError: Maximum call stack size exceeded
```

- 上述代码，sum()递归100000次，提示超出最大调用栈的最大次数

- 蹦床函数（trampoline）可以将递归执行转为循环执行

```js
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f()
  }
  return f;
}
```

- 上面就是蹦床函数的一个实现，它接受一个函数f作为参数，只要f执行后返回一个函数，就继续执行。这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

- 然后，将原来的递归函数，改写为每一步返回另一个函数

```js
function sum(x,y) {
  if (y > 0) {
    return sum.bind(null, x+1, y-1);
  } else {
    return x;
  }
}
```

- 上面代码中，sum函数的每次执行，都会返回自身的另一个版本。

- 现在，使用蹦床函数执行sum，就不会发生调用栈溢出。```trampoline(sum(1, 100000))```

- 蹦床函数并不是真正的尾递归优化，下面的实现才是

```js
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value
    }
  };
}

var sum = tco(function (x,y) {
  if (y>0) {
    return sum(x+1, y-1)
  }else {
    return x
  }
})

sum(1, 1000000); // 1000001
```

- 上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。

#### 函数参数的尾逗号
- ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。

- 此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

#### 8、Function.prototype.toString()
- ES2019对函数实例的toString()做了修改
- toString()返回函数代码本身，以前会省略注释和空格
- 修改后的toString()方法，明确要求返回一模一样的原始代码。


### 9、catch 命令的参数省略
- JavaScript语言的try...catch结构，以前明确要求catch后面必须跟参数，接受try代码快抛出的错误对象
- ES2019，允许catch语句省略参数