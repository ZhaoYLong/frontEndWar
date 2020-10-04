> [参考博客-博客园](https://www.cnblogs.com/bala/p/11650296.html)

> [参考博客-简书]( https://www.jianshu.com/p/8bc48f8fde75)

### 1.XMLHttpRequest

- 浏览器通过XMLHtppRequest对象进行http通信
- 传统Ajax指的是XMLHttpRequest(XHR)，最早出现的向后端发送请求的技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后顺序，就会出现回调地狱。
  
> 推荐一篇有关 XMLHttpRequest 的文章：[XMLHttpRequest ——必知必会](https://www.jianshu.com/p/918c63045bc3)

- 常用语法：
  - 一个简单的http请求

  ```js
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/url', true);
    xhr.send();
  ```

- 一个完整的http请求：

```js
let xhr = new XMLHttpRequest();
// 请求成功回调函数
xhr.onload = e => {
    console.log('request sucess');
};
// 请求结束
xhr.onloadend = e => {
    console.log('eqquest loadend');
};
// 请求出错
xhr.onerror = e => {
    console.log('request error');
};
// 请求超时
xhr.ontimeout = e => {
    console.log('request timeout');
};
// 请求回调函数。XMLHttpRequest标准又分为Level1和Level2，这是Level1的回调处理方式
// xhr.onreadystateChange = () => {
//     if (xhr.readState !== 4) {
//         return 
//     }
//     const status = xhr.status;
//     if (status >= 200 && status < 300 || status === 304) {
//         console.log('request sucess')
//     } else {
//         console.log('request error')
//     }
// }

xhr.timeout = 0; // 设置超时时间，0表示永不超时
// 初始化请求
xhr.open('GET/POST/DELETE/...', 'url', true || false) {
// 设置期望的返回数据类型 json, text, document
xhr.reponseType = '';
// 设置请求头
xhr.setRequestHeader('', '')
// 发送请求
xhr.send(null || new FormData || 'a=1&b=2' || 'json字符串');
}
```

### 2.JQuery Ajax
- ajax是一种与服务器交换数据的技术，可以在不重新载入整个页面的情况下更新网页的一部分。

- 基本语法：

```js
    $.ajax({
        type: 'POST', // GET或POST
        url: url, // 发送请求的url
        data: data, // 要发送到服务器的数据
        dataType: dataType, // 预期的服务端响应的数据类型
        success: function(){},
        error: function(){}
    })
```

- 缺点：
  - 1.针对MVC的编程，不符合前端MVVM的浪潮
  - 2.基于原生XHR开发，而XHR本身的架构不清晰
  - 3.JQuery整个项目太大，单纯使用Ajax却要引入整个Jquery，非常不合理
  - 4.不符合关注分离的原则
  - 5.配置和调用方法非常混乱，而且基于事件的异步模型不优化（配置和调用方法非常的混乱：想做封装处理的时候，配置不好处理，需要做判断，如果方法不公用 就每次调用都得ajax一次，代码冗余。 ）

- MVVM源自经典的MVC模式

![mvvm](../img/mvvm.png)

### 3. Axios

- axios是一个基于Promise的http请求库，可以用在浏览器和node.js中，本质上也是对原生XHR的封装，只不过是Promise的实现版本，符合ES6规则

- 基本语法：
  
```js
    const axios = require('axios');

    axios.get('url', {params}).then(function (response){
        console.log(response)
    }).catch(function (error) {
        console.log(error)
    })

    async function getUser() {
        try{
            const response = await axios.get('/user')
        }catch(error) {
            console.log(error)
        }
    }
```

- axios特征：
  - 1.从浏览器中创建XMLHttpRequest
  - 2.支持Promise API
  - 3.客户端支持防止CSRF
  - 4.提供了一些并发请求的接口（重要）
  - 5.从node.js创建http请求
  - 6.拦截请求和响应
  - 7.转换请求和响应
  - 8.取消请求
  - 9.自动转换JSON数据

- CSRF：跨域请求伪造：就是让你的每一个请求都带有一个从cookies中拿到的key，根据浏览器的同源策略，假冒的网站是拿不到你的cookies中的key的。这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

### fetch
  
- 一个简单的fetch请求

```js
    fetch('http://example.com/movies.json').then(function(response){
        return response.json()
    }).then(function(myJson){
        console.log(myJson)
    })

    // 一个带参的fetch请求
    postData('http://example.com/answer', {answer:42}).then(function(data) {
        console.log(data)
    }).catch(error => console.log(error))

    function postData(url, data) {
        return fetch(url, {
            body: JSON.stringify(data),// must match 'Content-Type' header
            cache: 'no-cache',
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            referrer: 'no-referrer',
        }).then(response => response.jsaon())
    }
```

- fetch()号称Ajax的替代品，是在ES6出现的，使用了Promise对象。Fetch是基于Promise设计的。Fetch的代码构造比ajax简单多了。
-  fetch 不是 ajax的进一步封装，而是原生 JS ， 没有使用 XMLHttpRequest 对象

- fetch的优点：
  - 1.符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象中
  - 2.更好更方便的写法

- fetch优势：
  - 1.语法简洁，更加语义化
  - 2.基于标准Promise实现，支持async、await
  - 3.同构方便
  - 4.更加底层，提供的API丰富
  - 5.脱离XHR，是ES规范中新的实现方式

- fetch的一些问题：
   - 1、fetch 只对网络请求报错，对400,500都当作成功的请求，服务器返回400， 500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时， fetch 才会被 reject。需要封装去处理。

　　- 2、fetch 默认不会带 cookie，需要添加配置项： fetch(url, {credentials: 'include'})

　　- 3、fetch 不支持 abort （xhr 有个 xhr.abort 方法可以直接阻断请求），不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求，请求过程继续在后台运行，造成了流量的浪费。

　　- 4、fetch 没有办法原生监测请求的进度，而 XHR 可以。

　　- 5、fetch 兼容性并不太好，IE 不支持


> 所以还是去用axios吧