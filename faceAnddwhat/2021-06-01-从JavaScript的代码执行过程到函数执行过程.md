### JavaScript执行过程

> 以V8为例，阐述一下JavaScript代码的执行过程

![javascript执行过程](https://mmbiz.qpic.cn/mmbiz_png/q4qrl2ddrUt52fL6VbNJ1tkCy77em3ea6svsTZFvhXpLkvCjibzZ7TpDPIoI9Z8iczPKHNicqrr8fwQXia7z2ZdwnA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

> 整个过程主要分为以下几个步骤：

- 1.词法分析，该步骤是将一行行的源码拆解成一个个token（token指的是语法上不可能再分的、最小的单个字符或字符串）；
- 2.语法分析，起作用就是将生成的token数据根据语法规则转换成AST；
- 3.有了AST后，V8就会生成该段代码的执行上下文；
- 4.解释器根据AST生成字节码（字节码是介于AST和机器码之间的一种代码）；
- 5.生成字节码之后进行执行阶段，解释器会逐条解释执行。在执行字节码的过程中，如果发现热点代码（例如一段代码被重复执行多次），后台的编译器就会把这段热点的字节码编译为高效的机器码，然后再次执行这段优化的代码时，只需要执行编译后的机器码即可，提升代码的执行效率。


### 函数执行过程

![函数执行过程](https://mmbiz.qpic.cn/mmbiz/q4qrl2ddrUt52fL6VbNJ1tkCy77em3eaeicMIePRwUd1MEFTqGFsqiaGQWwviaXm2DkPtd8ibg76udyicL9icS4cG0tg/640?wx_fmt=other&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- 1.确定执行环境
  - 当js执行全局代码时，会创建全局执行上下文（整个页面的生存周期内，全局执行上下文只有一份）；
  - 在调用一个函数时会创建该函数的执行上下文（执行环境）。将多个执行上下文管理起来的就是调用栈（调用栈：管理函数关系的一种数据结构）

- 2.创建阶段
  - 函数执行前会完成一些初始化操作，就是创建阶段，该阶段主要进行生成变量对象、简历作用域链、确定this指向，为后续下执行阶段做准备。

