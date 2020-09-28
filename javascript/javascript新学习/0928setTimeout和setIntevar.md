- setTimeout的使用：
  
```js
    setTimeout(cb, time)
    // cb 回调函数
    // time 时间 ms
```

- setInterval的使用

```js
    setInterval(cb, time)
    // cb 回调函数
    // time 时间 ms
```

### setTimeout与setInterval的区别和注意点

- 区别：
  - setTimeout含义是定时器，到达一定时间触发一次
  - setInterval含义是计时器，到达一定时间触发一次，并且会持续触发
  - 这两个函数的区别就在于,setInterval在执行完一次代码之后,经过了那个固定的时间间隔,它还会自动重复执行代码,而setTimeout只执行一次那段代码

- 相互之间的转换

```js
    function run () {
        // other code
        setTimeout(function(){
            run()
        }, 10000)
    }
    setInterval(function(){
        run()
    }, 10000)
```

- 上面代码的区别：
  - 第一段代码使用setTimeout来实现，这个实现就有个缺点，就是setTimeout是在代码的执行时间上加上10秒，比如run()执行了100s，而整个过程可能是100s
  - 第二段代码就不一样，setInterval是当run()跑了不到10s，那么就10s走一回


- setTimeout()是运行在全局环境下的

```js
    setTimeout(function() {
        console.log(1);
    }, 0)
    console.log(2)

    // 2
    // 1
```

- 其实这个特性说来话长，输出的是先2后1，因为setTimeout会把第一个函数放进任务队列，然后走一个event loop，所以会先输出的是2，才会输出1