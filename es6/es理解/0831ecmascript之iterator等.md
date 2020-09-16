- Iterator
- for...of循环

### Iterator
- Iterator(遍历器)的概念
  - JavaScript表示集合的数据结构主要是数组（Array）、对象（Object）、Map、Set。
  - Iterator是一种机制，一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署了Iterator接口，就可以完成遍历操作（即依次处理数据结构的所有成员）

- Iterator的作用：
  - 1、为各种数据结构，提供一个统一的、简便的访问接口；
  - 2、使得数据结构的成员能够按某种次序排列；
  - 3、是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费

- 原生具备Iterator接口的数据结构如下：
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的argument对象
  - NodeList对象

### for...of