- 1、Set
- 2、WeakSet
- 3、Map
- 4、WeakMap

### 1、Set
- es6提供了新的数据结构Set。类似于数组，但成员的值都是唯一的
- Set本身是一个构造函数，用来生成Set数据结构

```js
const s = new Set();
[2,3,5, 4, 5, 2, 2].forEach(x => s.add(x));

for(let i of s) {
    console.log(i);
}  // 2, 3, 5, 4
```

- Set函数可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化

```js
const set = new Set([1,2,3,4,4]);
[...set] // [1,2,3,4]
```

- 上述代码展示了一种数组去重的方法： ```[...new Set(array)]```
- 也可以用来除去字符串里面重复的字符：```[...new Set('abbbc')].join('') // abc ```

- 向Set加入值时，不会发生类型转换，所以5和"5"是两个不一样的值
- Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

```js
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```

- 两个对象总是不相等的

```js
let set = new Set();
set.add({});
set.size() // 1
set.add({}) 
set.size() // 2

// 由于两个空对象不相等，所以它们被视为两个值
```

#### Set实例的属性和方法
- 构造函数，默认就是Set()
- size(), 返回Set实例的成员总数
- add(value), 添加某个值，返回Set结构本身
- delete(value), 删除某个值，返回一个布尔值，表示删除是否成功
- has(value), 返回一个布尔值，表示是否拥有该值
- clear(), 清除所有成员，没有返回值

```js
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

- Array.from()可以将Set结构转为数组

```js
const items = new Set([1,2,3,4,5]);
const array = Array.from(items);
```


### 2、WeakSet
- 含义
  - WeakSet结构和Set类似，也是不重复的值的集合，但是它和Set的区别在于：
    - WeakSet的成员只能是对象，而不能是其他类型的值
- 语法
  - WeakSet是一个构造函数，可以使用new命令，创建WeakSet数据结构

  ```js
    const ws = new WeakSet();
  ```