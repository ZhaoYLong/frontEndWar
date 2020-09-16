### 字符的Unicode表示法
- 允许采用```\uxxxx```形式表示一个字符，其中xxxx表示字符的Unicode码点；只要将码点放入大括号，就能正确解读该字符
- JavaScript共有6种方法可以表示一个字符
  
  ```js
    '\z' === 'z'  // true
    '\172' === 'z' // true
    '\x7A' === 'z' // true
    '\u007A' === 'z' // true
    '\u{7A}' === 'z' // true
  ```

### 字符串的遍历接口
- es6为字符串添加了遍历接口，使得字符串可以被for...of循环遍历

```js
for (let codePoint of 'foo') {
    console.log(codePoint)
}
```

- 遍历器最大的优点就是识别大于0xFFFF的码点，传统的for循环无法识别这样的码点

```js
let text = String.fromCodePoint(0x20BB7);

for (let i =0; i<text.length; i++) {
    console.log(text[i]);
}
// ""
// ""

for (let i of text) {
    console.log(i);
}
// "吉"
```

- 上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。

### 模板字符串
- 传统Javascript语言，输出模板通常这样写（jQuery）

```js
$('#result').append(
    'There are <b>' + basket.count + '</b>' +
    'item in your basket, '
)
```

- es6引入了模板字符串

```js
$('#result').append(`
    There are <b>${basket.count}</b> item in your basket,
`)
```

- 模板字符串好可以调用函数
  
```js
function fn() {
    return "hello world";
}
`foo ${fn()}bar`
```

### 实例：模板编译

```js
let template = `
    <ul>
        <% for(let i=0; i<data.supplies.length;i++) { %>
            <li><%= data.supplies[i] %></li>
        <% } %>
    </ul>
`;
```

- 使用<%= ... %>输出JavaScript
- 使用<% ... %>放置JavaScript代码

- 一种思路就是将其转换为JavaScript表达式字符串

```js
    echo('<ul>');
    for(let i=0; i<data.supplies.length; i++) {
        echo('<li>');
        echo(data.supplies[i]);
        echo('</li>');
    };
    echo('</ul>');
```

### 标签模板
- 模板字符串的功能，不仅仅是上面这些，还可以紧跟着一个函数名后面，该函数将被调用来处理这个模板字符串。称为标签模板功能Tagged template

```js
let a = 5
let b = 10

tag`Hello ${a + b} world ${a * b}`;
//等同于
tag(['hello', 'world' , ''], 15, 50);
```



### 指数运算符

```js
2 ** 2 // 4
2 ** 3 // 8

2 ** 3 ** 2 // 512 等价于 2 ** （3 ** 2）

let a = 1.5
a **= 2 // a = a * a

let b = 4
b **= 3 //b = b*b*b
```

### BigInt数据类型

- js所有数字都保存成64位浮点数，带来2大限制：
  - 数值精度只能到53个二进制位（相当于16位十进制位），大于这个范围的整数。JS无法精确表示，所以js不适合进行科学和金融方面的精确计算
  - 大于或等于2的1024次方的数值，js无法表示，会返回Infinity

```js
Math.pow(2,53) === Math.pow(2, 53) + 1 // true

Math.pow(2, 1024) // Infinity

```

- ES2020引入了一种新的数据类型BigInt(大整数),是ECMAScript的第八种数据类型
  - Boolean
  - Number
  - undefined
  - Null
  - String
  - Object
  - BigInt

- BigInt 只能用来表示整数，没有位数的限制，任何位数的整数都可以精确表示

```js
    const a = 2172141653n;
    const b = 15346349309n;

    // BigInt 可以保持精度
    a * b // 33334444555566667777n

    // 普通整数无法保持精度
    Number(a) * Number(b) // 33334444555566670000
```

- 与Number区分，BigInt类型的数据必须添加后缀n
- BigInt 同样可以使用各种进制表示，都要加n
- BigInt 与普通整数是2种值，并不相等
  
```js
    42n === 42 // false
    typeof 123n // bigint
    
```

- BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突

### BigInt 对象
- js原生提供BigInt对象，可以用作构造函数生成BigInt类型的数值，转换规则基本与Number()一致

```js
BigInt(123)  // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
```

- BigInt()构造函数必须有参数，而且参数必须可以正常转为数值

```js
    new BigInt() // TypeError
    BigInt(undefined) //TypeError
    BigInt(null) // TypeError
    BigInt('123n') // SyntaxError
    BigInt('abc') // SyntaxError
```

- BigInt 不能与普通数值进行混合运算

- asm.js 里面，|0跟在一个数值的后面会返回一个32位整数。根据不能与 Number 类型混合运算的规则，BigInt 如果与|0进行运算会报错

- 比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度

```js
    0n < 1 // true
    0n < true // true
    0n == 0 // true
    0n == false // true
    0n === 0 // false
```

- BigInt与字符串混合运算时，会先转为字符串，再进行运算

- BigInt对象继承了Object对象的两个实例方法
  - BigInt.prototype.toString()
  - BigInt.prototype.valueOf()
- 继承了Number对象的一个实例方法
  - BigInt.prototype.toLocaleString()
- 提供三个静态方法
  - BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。    
  - BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。     
  - BigInt.parseInt(string[, radix])：近似于Number.parseInt()，将一个字符串转换成指定进制的 BigInt。    