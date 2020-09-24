本篇文章介绍生命周期初始化阶段所调用的第四个初始化函数——initInjections。该函数是用来初始化inject选项的。

由于inject选项在日常开发中使用频率不高，所以首先我们先根据官方文档回顾了该选项的作用及使用方法。

接着，我们分析了initInjections函数的内部实现原理，分析了是根据inject选项中的数据key是如何自底向上查找上游父级组件所注入的对应的值。

另外，对inject选项的规范化函数normalizeInject也进行了分析，Vue为用户提供了自由多种的写法，其内部是将各种写法最后进行统一规范化处理。

- [源码分析地址](https://vue-js.com/learn-vue/lifecycle/initInjections.html#_2-initinjections%E5%87%BD%E6%95%B0%E5%88%86%E6%9E%90)