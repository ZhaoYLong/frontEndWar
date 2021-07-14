## JSONP基础

### 基本思想

> JSONP的基本思想是在网页中添加一个`<script>`元素，向服务器请求数据，服务器收到请求后，将数据放在一个指定名字的回调函数中传回。

- 同源策略是不允许向非同源发送请求的，那么怎么通过JSONP解决跨域呢？

### 为啥JSONP能够实现跨域
- 从同源策略的角度考虑，确实嵌入的< script >发起的请求（非同源）违背了同源策略，但其实这是由于浏览器为了便利性让出了部分安全性，允许js文件、css文件、图片等资源来自于非同源服务器，这也就解释了为什么script请求的资源分明跨域了但是仍有内容返回的原因，也正是由于浏览器出让了部分安全性（允许页面中可以嵌入第三方资源），采用了JSONP的诞生。

## 手撕JSONP
- 实现JSONP的步骤
  - 1.全局挂载一个接受数据得函数；
  - 2.创建一个script标签，并在其标签的onload和onerror事件上挂载对应处理函数；
  - 3.将script标签挂载到页面中，向服务端发送请求；
  - 4.服务端收到传递来的参数，然后将回调函数和数据以调用的形式输出；
  - 5.当script元素接收到影响中的脚本代码后，就自动执行他们；

```js
  function createScript(url, charset) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    charset && script.setAttribute('charset', charset);
    script.setAttribute('src', url);
    script.async = true;
    return script;
  }

  function jsonp(url, onsuccess, onerror, charset) {
    const hash = Math.random().toString().slice(2);
    window['jsonp' + hash] = function (data) {
      if (onsuccess && typeof (onsuccess) === 'function') {
        onsuccess(data);
      }
    }

    const script = createScript(url + '?callback=jsonp' + hash, charset);

    // 监听加载成功的事件，获取数据，这个位置用了两个事件onload和onreadystatechange是为了兼容IE，因为IE9之前不支持onload事件，只支持onreadystatechange事件
    script.onload = script.onreadystatechange = function () {
      //若不存在readyState事件则证明不是IE浏览器，可以直接执行，若是的话，必须等到状态变为loaded或complete才可以执行
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        script.onload = script.onreadystatechange = null;
        // 移除该script的DOM对象
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }

        // 删除函数或变量
        window['jsonp' + hash] = null;
      }
    };

    script.onerror = function () {
      if (onerror && typeof (onerror) === 'function') {
        onerror();
      }
    }

    // 添加标签，发送请求
    document.getElementsByTagName('head')[0].appendChild(script);
  }
```
