> 生命周期初始化阶段调用的第五个函数————initState

> props, data, methods, computed, watch

- 源码在 src/core/instance/state.js

- 在initState函数内部初始化props, methods,  data, computed, watch是有顺序的，所以我们可以在data中使用props，在watch里观测data和props

