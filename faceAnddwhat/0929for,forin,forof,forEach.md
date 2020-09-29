- do-while
  - 是一种后测试循环语句，即循环体代码执行后才会退出条件进行求值，
  - 循环体内的代码至少执行一次

- while 
  - 是一种先测试循环语句，先检测退出条件，再执行循环体的代码

- for
  - 是先测语句，只不过增加了进入循环之前的初始代码，以及循环执行之后要执行的表达式
  - 无法通过while循环实现的逻辑，同样也无法使用for循环实现

- for-in
  - 是一种严格的迭代语句，用于枚举对象中的非符号键属性
  - ```for (property in expression) statement ```
  - ECMAScript中对象是无序的，因此for-in语句并不能保证返回对象属性的顺序，所有可枚举的属性都会返回一次
  - for-in循环要迭代的变量是null或undefined，则不执行循环体

- for-of
  - 是一种严格的迭代语句，用于遍历可迭代对象的元素
  - ``` for (property of expression) statement ```
  - for-of循环会按照可迭代对象的next()方法产生的顺序迭代元素
  - 若尝试迭代的变量不支持迭代，则for-of语句会抛出错误
  - ES2018新增了for-await-of循环，以支持生成期约Promise的异步可迭代对象


### for循环

- for循环中的2个关键词（进入流程控制）：break continue
  - breack: 强制结束整个循环，后面的代码不再执行，循环结束
  - continue: 结束本轮循环，continue后面的代码不再执行，继续执行下一轮循环

### for in循环

- for in用来循环遍历当前对象可枚举的属性：
  - 可枚举：可遍历
  - 1.对象的私有属性（自己写的）可枚举
  - 2.浏览器内置的属性一般都是不可枚举的（__proto__）
  - 3.自己在类的原型上设置的属性也是可枚举的，for in 也会遍历出来

  ```js
    if (obj.hasOwnProperty(key)){ // 一般使用for in 遍历对象时，我们加一个私有属性的验证，只有是私有的属性，才继续操作
        console.log(key)
    }
  ```

- for in遍历循环有自己的顺序，先遍历数字属性名，再遍历字符串名

```js
    let obj = {name: 'Tom', age: 23, id: 16}
    for (keys in obj) {
        console.log(keys) // name age id
        console.log(obj[keys]) // Tom 23 6
        console.log(typeof keys) // string
    }
```

> for循环和for in循环的区别：
> for循环通常用来循环数组，循环出索引i都是number数据类型
> for in循环通常用来循环一个对象的可枚举属性, 当for in循环数组时，循环出索引i是string类型，不能直接使用，同时会降低代码执行效率


### forEach

- forEach循环：数组内置遍历方法，专门用来循环数组的
- 两个参数：
  - 第一个参数：函数->function(){} function(数组中的每个值, 索引值, 整个数组){}
  - 第一个参数：改变this指向,写啥是啥（如果写个null,undefined还是为window）
  - forEach循环没有返回值
  - forEach会一直循环完所有元素，没有跳出条件，即没有break和continue

> 如果想要在forEach循环中跳出循环，可以使用try catch语句 try...catch 可以测试代码中的错误。try 部分包含需要运行的代码，而 catch 部分包含错误发生时运行的代码

```js
    let arr = [true, 'haha', 10, {}, [1,2,3]]
    arr.forEach(function(item, i, all) {
        // console.log(item);//数组中的每项
        // console.log(i); //索引
        // console.log(all); // 整个数组
        console.log(this); //第二个参数如果没有，则this是window

    }, arr)


    try {
    var array = ["first", "second", "third", "fourth"];
    array.forEach(function (item, index) {
    if (item == "third") {
        var a = aaaa; // first second 后就报错，就跳出循环了
        throw new Error("ending");//报错，就跳出循环
    } else {
    console.log(item);
    };
    });
    } catch (e) {
        if (e.message == "ending") {
            console.log("结束了");
        } else {
            console.log(e.message);
        };
    };

```

### map循环

- 数组内置遍历方法，它的返回值为新的数组

```js
    var arr = [1,2,3,4,5];
    var arr2 = arr.map(function(item, index, all){
        return item * 2
    })
    console.log(arr2)
```

### for of循环

- for of循环：Es6 中新增的语句 for…of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串）

```js
    //循环数组
    let arr = [true, 'haha', 10, {}, [1,2,3]];
    for(let item of arr) {
        if (typeof item === 'number'){
            console.log(item); // 10
            continue;
        }
        console.log(item)
    }


    // 循环字符串
    let str = 'hello'
    for (let item of str) {
        console.log(item)
    }

    // 循环类数组
    function fn() {
        for (let item of arguments) {
            console.log(item)
        }
    }
    fn('一三', '一二', '一四')

    // for of 不能直接遍历对象，可以使用Object.keys()
    // Object.keys()可以将对象里的所有的属性名取出来放到一个数组中
    let obj = {name: 'Tom', age: 25, id: 6}
    for (let item of Object.keys(obj)){
        console.log(item + ':' + obj[item]) // name:Tom age:33 id:6
    }
```


### filter：数组过滤

- 数组的过滤，过滤条件成立的这个值
- 函数返回值为过滤后的新数组
- 参数：function(item, i, all) {return }

```js
    let arr = [3, 10, 18, 37, 48, 26]
    let arr2 = arr.filter(function(item,i){
        return item >= 10 && item < 30
    })
    console.log(arr2)
```


### some：检测数组中的元素是否满足指定条件

- 查看数组中某项数据是否满足某个条件，只要有一个满足条件，就返回true；如果所有项条件都不成立，则返回false，返回的是一个布尔值
- some() 不会对空数组进行检测。
- some() 不会改变原始数组

```js
    let arr = [1, 2, 3, 4, 5];
    //查看数组中是否有6，明显没有，就返回false
    let res = arr.some(function (item) {
        return item === 6
    });
    console.log(res); // flase(数组中没有6)

    let res1 = arr.indexOf(6);
    console.log(res1); //-1(数组中没有6)

```


### every：检测数组中是否每一项都满足指定条件

```js
    let arr = ['62',[],NaN,{},(function(){})(),/^$/,2333];
    let arr1 = [1,2,3,4,5,6];
    let res = arr.every(function(item,i){
        return item;
    });
    let res1 = arr1.every(function(item,i){
        return item;
    });
    console.log(res); //false (不是所有项都为true)
    console.log(res1); //true (所有项都为true)

```