### 思考

- 精度问题？
  - ``` 0.1 + 0.2 === 0.3  false```
  - 怎么解决这种由于精度而导致的正常错误？
  - 回答：
    - 在正常的数学思维中，0.1 + 0.2 === 0.3是正确的，当时在js里，由于二进制的浮点数0.1和0.2并不十分精准，二者相加的结果并非正好等于0.3，结果更接近数字```0.30000000000000004```,所以条件判断结果为false。
    - 解决：
    - 1、 误差总是存在的，最好的办法就是设置一个误差范围值（机器精度），在js里值通常为```Math.pow(2,-52)```，在ES6中提供了一个常量```Number.EPSILON```这个值等于```Math.pow(2,-52)```。无限接近0，而不等于0.只要判断```（0.1 + 0.2) - 0.3 < Number.EPSILON```，就可以判断```0.1 + 0.2 === 0.3 true```。
    ```js
        function numbersequal(a,b) {
            return Math.abs(a-b) < Number.EPSILON;
        }
        let a = 0.1+0.2;
        let b = 0.3
        console.log(numbersequal(a,b)); // true
    ```

    - 2、考虑兼容性问题
    ```js
    Number.EPSILON = (function(){
        //解决兼容性问题
        return Number.EPSILON ? Number.EPSILON : Math.pow(2, -52);
    })()
    function numbersequal(a,b) {
        return Math.abs(a-b) < Number.EPSILON;
    }
    let a = 0.1 + 0.2;
    let b = 0.3;
    console.log(numbersequal(a,b)); // true
    ```

  - 二进制浮点数最大的问题就是精度问题（所有遵循IEEE 754规范的语言都是如此）
  - 在处理带有小数的数字时需要特别注意。很多（也许是绝大多数）程序只需要处理整数，最大不超过百万或者万亿，此时使用JavaScript 的数字类型是绝对安全的。