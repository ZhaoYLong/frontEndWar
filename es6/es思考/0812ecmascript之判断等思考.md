## javascript判断相等的方法

#### 1、相等运算符==
- 自动转换数据类型
- NaN自身也不等于自身
- 转换数据类型：左向右转？右向左转？

```2 == '2' // true```

#### 2、严格相等运算符
- NaN自身不等于自身
- +0 等于 -0

#### 3、Object.is()


#### 4、一些问题: 请解释一下问题
- [] == [] // false
- [] === [] // false
- [] == ![] // true
- [] === ![] // false
- ![] // false


- {} == {} // false
- {} === {} // false
  - [参考答案列表](https://stackoverflow.com/questions/11704971/why-are-two-identical-objects-not-equal-to-each-other)
  - The reason for this is that internally JavaScript actually has two different approaches for testing equality. Primitives like strings and numbers are compared by their value, while objects like arrays, dates, and plain objects are compared by their reference. That comparison by reference basically checks to see if the objects given refer to the same location in memory.so
- {} == !{} // false
- {} === !{} // false
- !{} // true

- 更好的回答参见javascript权威指南

- [javascript隐式转换](https://juejin.im/post/6844903934876745735)


#### 5、JS Object API解析
- [博客参考](https://segmentfault.com/a/1190000010753942)