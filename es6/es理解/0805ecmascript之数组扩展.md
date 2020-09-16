- 1、扩展运算符
- 2、Array.from()
- 3、Array.of()
- 4、数组实例的copyWithin()
- 5、数组实例的find()和findIndex()
- 6、数组实例的fill()
- 7、数组实例的entries(), keys(), values()
- 8、数组实例的includes()
- 9、数组实例的flat(), flatMap()
- 10、数组的空位
- 11、Array.prototype.sort()的排序稳定性


### 1、扩展运算符
- sprend(扩展运算符)是三个点(...)
- 好比是rest参数的逆运算，将一个数组转为用逗号分隔的参数序列

```js
console.log(...[1,2,3])

console.log(1, ...[5,6,7], 1000)
```

#### 扩展运算符的应用

- 1、复制数组
  - 数组时复合的数据类型，若直接复制，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
  ```js
    const a1 = [1,2];
    const a2 = a1;
    a2[0] = 6;
    a1 // [6,2]

    // ES5只能通过变通方法来复制数组
    const a1 = [1,2];
    const a2 = a1.concat();
    a2[0] = 6;
    a1 // [1,2]
    // 上面代码，a1会返回原数组的克隆，在修改a2就不会对a1产生影响

    // 扩展运算符提供了复制数组的简便写法
    const a1 = [1,2];
    // 写法一
    const a2 = [...a1];
    // 写法2
    const [...a2] = a1;
    // 上述两种写法a2都是a1的克隆
  ```

- 2、合并数组

```js
    const arr1 = ['a', 'b'];
    const arr2 = ['c'];
    const arr3 = ['d', 'e'];

    // ES5 的合并数组
    arr1.concat(arr2, arr3);
    // [ 'a', 'b', 'c', 'd', 'e' ]

    // ES6 的合并数组
    [...arr1, ...arr2, ...arr3]
    // [ 'a', 'b', 'c', 'd', 'e' ]
```
  - 上述2种方法都是浅拷贝。

```js
    const a1 = [{foo: 1}];
    const a2 = [{bar: 2}];

    const a3 = a1.concat(a2);
    const a4 = [...a1, ...a2];

    a3[0] = a1[0] // true
    a4[0] = a1[0] // true
    // a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。
    // 如果修改了引用指向的值，会同步反映到新数组
```

- 与解构赋值结合

```js
const [first, ...rest] = [1,2,3,4,5,6];
first // 1
rest // [2,3,4,5,6]

const [first, ...rest] = []
first // undefined
rest // []

const [first, ...rest] = ["foo"];
first // "foo"
rest // []
```

  - 若将拓展运算符用于数组赋值，只能放在参数的最后一位

- 4、字符串
  - 扩展运算符可以将字符串转为真正的数组
  ```js
    [...'hello'] // ["h", "e", "l", "l", "o"]
  ```
  - 上面的写法，好处就是能够正确识别四个字节的Unicode字符
  ```js
    'x\uD83D\uDE80y'.length // 4
    [...'x\uD83D\uDE80y'].length // 3
  ```
  - 凡是涉及到操作四个字节的Unicode字符的函数都有这个问题，因此，最好都用扩展运算符改写

  ```js
    let str = 'x\uD83D\uDE80y';

    str.split('').reverse().join('')
    // 'y\uDE80\uD83Dx'

    [...str].reverse().join('')
    // 'y\uD83D\uDE80x'
  ```
  - 上面代码，若不用扩展运算符，字符串的reverse操作就不正确

- 5、实现Iterator接口的对象
  - 任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组
  ```js
    let nodeList = document.querySelectorAll('div');
    let array = [...nodeList]
    //querySelectorAll()返回的是一个NodeList对象。它不是数组而是一个类似数组的对象。扩展运算符可以将其转为真正的数组，原因在于NodeList对象实现了Iterator
  ```
  - 对于没有部署Iterator接口的类似数组的对象，扩展运算符将无法将其转为真正的数组
  ```js
    let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
    };

    // TypeError: Cannot spread non-iterable object.
    let arr = [...arrayLike];

    // 可以使用Array.from()将array转为真正的数组
    Array.from(arrayLike) // ['a', 'b', 'c']
  ```

- 6、Map、Set结构，Generator函数
  - 扩展运算符内部调用的是数据结构的Iterator接口，因此具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构

  ```js
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);

    let arr = [...map.keys()]; // [1,2,3]
  ```

  - Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符

  ```js
    const go = function*() {
        yield 1;
        yield 2;
        yield 3;
    };

    [...go()] // [1,2,3]
  ```

  - 变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组
  - 若对没有Iterator接口的对象，使用扩展运算符，将会报错


### 2、Array.from()
- 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterator）的对象（包括ES6新增的数据结构Set和Map）

```js
    // NodeList对象
    let ps = document.querySelectorAll('p');
    Array.from(ps).filter(p => {
        return p.textContent.length > 100;
    });

    // arguments对象
    function foo() {
        var args = Array.from(arguments);
    }
```

- 只要部署了Iterator接口的数据结构，Array.from都将其转为数组

```js
Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
```

- 扩展运算符（...）也可以将某些数据结构转为数组

```js
    // arguments对象
    function foo() {
    const args = [...arguments];
    }

    // NodeList对象
    [...document.querySelectorAll('div')]

```

- 扩展运算符背后调用的是遍历器接口（Symbol.iterator）,若一个对象没有部署这个接口，就无法转换
- Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。

```js
  Array.from({length: 3});
  // [undefined, undefined, undefined]
```

- 没有部署该方法的浏览器，可以用Array.prototype.slice()替代

```js
  const toArray = (() => 
    Array.from ? Array.from : obj => [].slice.call(obj)
  )();
```

- Array.from还可以接受第二个参数，作用类似于数组的map()，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
  Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);

  Array.from([1,2,3], x => x*x); // [1,4,9]
```

```js
  Array.from([1,,2,,3], n => n || 0)
  // [1,0,0,2,0,0,3]
```
- 若map()用到this关键字，还可以传入Array.from的第三个参数，用来绑定this
  
- Array.from()可以将各种值转为真正的数组，并且还提供map功能。意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法

```js
  Array.from({length: 2}, () => 'jack') // ['jack', 'jack']
```

- 上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

- Array.from()还可以将字符串转为数组，然后返回字符串的长度，因为他能正确处理Unicode字符，避免js将大于\uFFF的Unicode字符算作2个字符的bug


### 3、Array.of()
- 用于将一组值，转换为数组

```js
  Array.of(3, 11, 8) //[3, 11, 8]
  Array.of(3) // [3]
  Array.of(4).length // 1
```
- 该方法的主要目的，是弥补数组构造函数Array()的不足，因为参数个数的不同，会导致Array()的行为有差异

```js
Array() // []
Array(3) // [,,]
Array(3, 8, 11) // [3, 8, 11]
```

- Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度

- Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。行为非常统一

```js
  Array.of() // []
  Array.of(undefined) // [undefined]
  Array.of(1)
  Array.of(1, 2) // [1, 2]
```

- Array.of总是返回参数值组成的数组

- Array.of()可以用以下方法实现

```js
  function ArrayOf() {
    return [].slice.call(arguments);
  }
```

### 4、数组实例的copyWithin()
- 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组

```js
Array.prototype.copyWithin(target, start=0, end=this.length)
// target(必须)：从该位置开始替换数据，若为负值，表示倒数
// start(可选)： 从该位置开始读取数据，默认为0.若为负值，表示从末尾开始计算
// end(可选)：   到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算

[1,2,3,4,5].copyWithin(0,3) // [4,5,3,4,5]
// 上述代码将3号位直到数组结束的成员（4，5），复制到从0号位开始的位置，结果覆盖了原来的1和2

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

### 5、数组实例的find()和findIndex()
- 数组实例的find()，用于找出第一个符合条件的数组成员，它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
- 若没有符合条件的成员，则返回undefined

```js
[1,4,-5,10].find((n) => n < 0) // -5

[1,5,10,15].findIndex(function(value, index, arr) {
    return value > 9;
}) // 2
```

- 数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

- 这2个方法都可以接受第二个参数，用来绑定回调函数的this对象

- 这2个方法都可以发现NaN，弥补了数组的indexOf()的不足

```js
  [NaN].indexOf(NaN) // -1
  [NaN].findIndex(y => Object.is(NaN, y)) // 0
  [1,NaN,3].find((n) => n !==1 && n !== 2) // NaN
```

### 6、数组实例的fill()
- fill()使用给定值，填充一个数组

```js
  ['a', 'b', 'c'].fill(7) // [7,7,7]
  new Array(3).fill(7) // [7,7,7]
```

- fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
- 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
  
```js
  let arr = new Array(3).fill({name: "Mike"});
  arr[0].name = "Ben";
  arr
  // [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]

  let arr = new Array(3).fill([]);
  arr[0].push(5);
  arr
  // [[5], [5], [5]]

```

### 7、数组实例的entries(), keys()和values()
- ES6提供三个新的方法，用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，
  - entries() ： 是对键值对的遍历
  - keys() ： 是对键名的遍历
  - values() ： 是对键值的遍历

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

- 若不使用for...of循环，可以手动调用遍历器对象的next()，进行遍历

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

### 8、数组实例的includes()
- Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。

```js
  [1,2,3].includes(2) // true
  [1,2,3].includes(4) // false
  [1,2,NaN].includes(NaN) // true
```

- 该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。

- 下面代码是用来检测当前环境是否支持该方法，若不支持，部署一个简易的提代版本

```js
const contains = (() => 
  Array.prototype.includes ? (arr, value) => arr.includes(value)
                           : (arr, vlaue) => arr.some(el => el === value)
)();
contains(['foo', 'bar'], 'baz') // false
```

- Map 和 Set 数据结构有一个has方法，需要注意与includes区分。

### 9、数组实例的flat(), flatMap()
- 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
```js
[1, 2, [3, 4]].flat()
```

- flat()的参数为2，表示要“拉平”两层的嵌套数组。

- 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。

### 10、Array.prototype.sort()的排序稳定性

### 11、数组的空位