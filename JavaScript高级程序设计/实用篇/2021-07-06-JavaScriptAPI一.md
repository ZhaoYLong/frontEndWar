- Atomics与SharedArrayBuffer
- 跨上下文消息
- Emcoding API
- File API与Blob API
- 拖放
- Notifications API
- Page Visibility API
- Streams API
- 计时API
- Web组件
- Web Cryptography API

> Web API的数量之多令人难以置信！

## Atomics与ShareArrayBuffer

- 多个上下文访问ShareArrayBuffer时，如果同时对缓冲区执行操作，就可能出现资源争用问题。
- Atomics API(ES2017中定义)通过强制同一时刻只能对缓冲区执行一个操作，可以让多个上下文安全的读取写一个ShareArrayBuffer.

- Atomics API非常像一个简化版的指令集架构（ISA）.
- 原子操作也让并发访问内存变得不可能，如果应用不当就可能导致程序执行变慢。
- 为此，Atomics API的设计初衷是在最少但很稳定的原子行为基础之上，构建复杂的多线程JavaScript程序。

### ShareArrayBuffer
- ShareArrayBuffer与ArrayBuffer具有同样的API。
  - 二者主要区别：ArrayBuffer必须在不同执行上下文间切换，ShareArrayBuffer则可以被任意多个执行上下文同时使用。

- 多个执行上下文间共享内存意味着并发线程操作成为可能。

```js
  // 传统JavaScript操作对于并发内存访问导致的资源争用没有提供保护
  const workerScript = `
  self.onmessage = ({data}) => {
    const view = new Uint32Array(data);

    // 执行 1 000 000次加操作
    for (let i =0; i < 1E6; ++i) {
      // 线程不安全加操作会导致资源争用
      view[0] += 1;
    }
    self.postMessage(null);
  };
`;

  const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
  // 创建容量为4的工作线程池
  const workers = [];
  for (let i = 0; i < 4; ++i) {
    workers.push(new Worker(workerScriptBlobUrl));
  }

  // 在最后一个工作线程完成后打印出最终值
  let responseCount = 0;
  for (const worker of workers) {
    worker.onmessage = () => {
      if (++responseCount == workers.length) {
        console.log(`Final buffer value: ${view[0]}`);
      }
    };
  }

  // 初始化SharedArrayBuffer 
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const view = new Uint32Array(sharedArrayBuffer);
  view[0] = 1;
  // 把SharedArrayBuffer发送到每个工作线程
  for (const worker of workers) {
    worker.postMessage(sharedArrayBuffer);
  }

  //输出：Final buffer value: 3770930
```

- 为解决这个问题，Atomics  API应运而生。Atomics  API可以保证SharedArrayBuffer上的JavaScript操作是线程安全的。

### 原子操作基础
