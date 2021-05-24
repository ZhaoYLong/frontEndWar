### ES6之前的异步编程机制

- JS是单线程事务循环模型，同步操作与异步操作更是代码所要依赖的核心机制。
- 早期的JS只支持回调函数来表明异步操作。
  - 通常会产生回调地狱

- 异步返回值
  - 假设setTimeout操作会返回一个有用的值，要把值传给需要它的地方，一个策略就是给异步操作提供一个回调，这个回调中包含要使用异步返回值的代码（作为回调的参数）

    ```js
        function double(value, callback) {
            setTimeout(() => callback(value * 2), 1000);
        }

        double(3, (x) => console.log(`I was given: ${x}`));
        // I was given: 6 (大约1000毫秒之后)
    ```

- 失败处理
  - 异步操作的失败处理在回调模型中也要考虑，因此就有了成功回调和失败回调：

  ```js
    function double(value, success, failure) {
        setTimeout(() => {
            try {
                if (typeof value !== 'number') {
                    throw '必须是number'
                }
                success( 2 * value)
            } catch(e) {
                failure(e)
            }
        }, 1000)
    }

    const successCallback = (x) => console.log(`Succes: ${x}`);
    const failureCallback = (x) => console.log(`Failure: ${e}`);

    double(3, successCallback, failCallback);
    double('b', successCallback, failCallback);
  ```

  - 这种模式已经不可取了，因为必须在初始化异步操作时定义回调。异步函数的返回值只能在短时间内存在，只有预备好将这个短时间内存在的值作为参数的回调才能接受到它。

- 嵌套异步回调
  - 如果异步返回值又依赖另一个异步返回值，那么回调的情况还会进一步变复杂。

  ```js
    function double(value, success, failure) {
        setTimeout(() => {
            try {
                if (typeof value !== 'number') {
                    throw 'must provide number as first argument';
                }
                success(2 * value);
            } catch(e) {
                failure(e)
            }
        }, 1000)
    }

    const successCallback = (x) => {
        double(x, (y) => console.log(`success: ${y}`));
    };
    const failureCallback = (e) => console.log(`failure: ${e}`);

    double(3, successCallback, failureCallback);

    // success: 12, （大约12秒之后）
  ```

  - 随着代码越来越复杂，回调策略是不具有扩展性的。“回调地狱”这个称谓可不是写说的。

### Promise

- promise是对尚不存在结果的一个替身。Promise提出的很早。

- Promise/A+规范
  - 早期的promise机制在jQuery和Dojo中是以Deferred API的形式出现的。
  - ES6增加了对Promise/A+规范的完善支持，即Promise类型。

- Promise基础
  - 新增的引用类型Promise，可以通过new操作符来实例化
  - 创建新Promise时要传入执行器executor函数作为参数。
  - 1.Promise状态机
    - pending，待定
    - fulfilled，兑现，解决，resolved
    - rejected，拒绝
    - 状态一旦改变，就不能再改变。
    - Promise的状态是私有的，不能直接通过JS检测到。其状态也不能被外部的JS代码修改。
  - Promise故意将异步行为封装起来，从而隔离外部的同步代码。
  - 2.Promise主要的两大用途：
    - 首先是抽象地表示一个异步操作
    - 在一些情况下，Promise封装的异步操作会实际生成某个值，而程序期待Promise状态改变时可以访问这个值。
    - 每个Promise只要状态切换为resolved or fulfilled，就会有一个私有的内部值（value）。
    - 当状态是rejected时，就会有一个内部理由reason。
  - 3.通过执行函数控制Promise状态
    - 执行函数的2项职责：
      - 初始化Promise的异步行为
      - 控制状态的最终转换

  ```js
    let p1 = new Promise((resolve, reject) => resolve());
    let p2 = new Promise((resolve, reject) => reject());
  ```

  - 这里，执行函数是同步执行的。因为执行器函数是Promise的初始化程序。

- 4.Promise.resolve()
  - Promise并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态。
  - 通过调用Promise.resolve()可以实例化一个resolved状态的Promise。

  ```js
    let p1 = new Promise((resolve, reject) => resolve());
    let p2 = Promise.resolve(3);
    // 只能接受一个参数，多余的参数将会被忽略。
  ```

  - 对于这个静态方法来说，如果传入的参数本身就是一个Promise实例，那它的行为就类似于一个空包装。可以说Promise.resolve()是一个幂等方法。
  - 这个幂等会保留传入Promise实例的状态

  ```js
    let p = Promise.resolve(7);
    p === Promise.resolve(p) // true
    p === Promise.resolve(Promise.resolve(p)) // true
  ```

  - 这个静态方法能够包装任何非期约值，包括错误对象，并将其转换为解决的期约。因此，也可能导致不符合预期的行为。

- 5.Promise.reject()
  - 与Promise.resolve()类似。会实例化出一个rejected的Promise实例并抛出一个异步错误。这个错误不能通过try/catch捕获，而只能通过拒绝处理程序捕获。

  ```js
    let p1 = new Promise((resolve, reject) => reject());
    let p2 = Promise.reject()
  ```

  - Promise.reject()并没有照搬Promise.resolve()的幂等逻辑。如果给它传一个期约对象，则这个期约会成为它返回的拒绝期约的理由。

- 同步/异步执行的二元性
  - Promise的设计很大程度上会导致一种完全不同于JS的计算模式。
  
  ```js
    try {
        throw new Error('foo');
    } catch(e) {
        console.log(e) // Error: foo
    }

    try {
        Promise.reject(new Error('bar'));
    } catch(e) {
        console.log(e)
    }
    // Uncaught (in promise) Error: bar
  ```

  - Promise真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。
  - 代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用异步结构——就是Promise的方法。

- Promise实例的方法是连接外部同步代码与内部异步代码之间的桥梁
  - 这些方法可以访问异步操作返回的数据，处理Promise成功和失败的结果，连续对Promise求值，或者添加只有Promise进入终止状态才会执行的代码。

  1. 实现Thenable接口
    - Promise类型实现了Thenable接口。
  2. Promise.prototype.then()
    - 接收两个参数：onResolved处理程序和onRejected处理程序。
    - 这两个参数都是可选的，如果提供的话，则会在期约分别进入“兑现”和“拒绝”状态时执行.
  3. Promise.prototype.catch()
    - 用于给期约添加拒绝处理程序。
    - 这个方法只接收一个参数：onRejected处理程序。
    - 事实上，这个方法就是一个语法糖，调用它就相当于调用Promise.prototype. then(null, onRejected)。
  4. Promise.prototype.finally()
    - 用于给Promise实例添加onFinally处理程序。
    - 这个处理程序在Promise转换为解决或决绝状态时都会执行。
    - 该方法可以避免onResolved和onRejected处理程序中出现冗余代码。
    - 但onFinally处理程序没有办法知道期约的状态是解决还是拒绝，所以这个方法主要用于添加清理代码。
    - Promise.prototype.finllay()方法返回一个新的Promise实例。
    - 因为onFinally被设计为一个状态无关的方法，所以在大多数情况下它将表现为父期约的传递。对于已解决状态和被拒绝状态都是如此。
  5. 非重入Promise方法
    - 当期约进入落定状态时，与该状态相关的处理程序仅仅会被排期，而非立即执行。跟在添加这个处理程序的代码之后的同步代码一定会在处理程序之前先执行。
    - 即使期约一开始就是与附加处理程序关联的状态，执行顺序也是这样的。
    - 这个特性由JavaScript运行时保证，被称为“非重入”（non-reentrancy）特性。
  6. 近邻处理程序的执行顺序
    - 如果给期约添加了多个处理程序，当期约状态变化时，相关处理程序会按照添加它们的顺序依次执行。
    - 无论是then()、catch()还是finally()添加的处理程序都是如此。
  7. 传递解决值和拒绝理由
    - 到了落定状态后，期约会提供其解决值（如果兑现）或其拒绝理由（如果拒绝）给相关状态的处理程序。拿到返回值后，就可以进一步对这个值进行操作。
  8. 拒绝Promise与拒绝错误处理
    - 拒绝期约类似于throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。
    - 在期约的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会成为拒绝的理由。
    - 异步错误有意思的副作用。正常情况下，在通过throw()关键字抛出错误时，JavaScript运行时的错误处理机制会停止执行抛出错误之后的任何指令。
    - 在期约中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时继续执行同步指令。

- Promise连锁与Promise合成
  1. Promise连锁：把期约逐个地串联起来是一种非常有用的编程模式
     - 之所以可以这样做，是因为每个期约实例的方法（then()、catch()和finally()）都会返回一个新的期约对象，而这个新期约又有自己的实例方法。
     - 这样连缀方法调用就可以构成所谓的“期约连锁”。

  2. Promise图
    - 因为一个期约可以有任意多个处理程序，所以期约连锁可以构建有向非循环图的结构。
    - 这样，每个期约都是图中的一个节点，而使用实例方法添加的处理程序则是有向顶点。
    - 因为图中的每个节点都会等待前一个节点落定，所以图的方向就是期约的解决或拒绝顺序

  3. Promise.all()和Promise.race()
    - Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接收一个可迭代对象，返回一个新期约.
      - 如果至少有一个包含的期约待定，则合成的期约也会待定。
      - 如果有一个包含的期约拒绝，则合成的期约也会拒绝。
      - 如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。合成的期约会静默处理所有包含期约的拒绝操作。
    - Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个方法接收一个可迭代对象，返回一个新期约.
      - 如果有一个期约拒绝，只要它是第一个落定的，就会成为拒绝合成期约的理由。之后再拒绝的期约不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。与Promise.all()类似，合成的期约会静默处理所有包含期约的拒绝操作。
  4. 串行Promise合成
    - 这种模式可以提炼出一个通用函数，可以把任意多个函数作为处理程序合成一个连续传值的期约连锁。

- Promise扩展
  - Promise取消
  - Promise进度追踪

### 异步函数（async/await）

- 是ES6期约模式在ECMAScript函数中的应用。async/await是ES8规范新增的.
- 让以同步方式写的代码能够异步执行。
- ES8的async/await旨在解决利用异步结构组织代码的问题。

- async关键字用于声明异步函数。
  - 这个关键字可以用在函数声明、函数表达式、箭头函数和方法上

  ```js
    async function foo() {}
    let bar = async function() {}
    let baz = async () => {}
    class Qux {
        async qux() {}
    }
  ```

  - 使用async关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。
  - 异步函数如果使用了return 关键字返回值（如果没有return则返回undefined），这个值会被Promise.resolve()包装成为一个Promise对象。异步函数始终返回Promise对象。

  ```js
    async function foo() {
        console.log(1)
        return 3
    }
    foo().then(console.log)
    console.log(2)

    // 1
    // 2
    // 3
  ```

  - 异步函数的返回值期待（但实际上并不要求）一个实现thenable接口的对象，常规值也可以。
  - 如果返回的是实现thenable接口的对象，则这个对象可以由提供给then()的处理程序解包。
  - 如果不是，则返回值就被当作已经解决的Promise实例。

  ```js
    // 返回一个原始值
    async function foo() {
        return 'foo'
    }

    foo().then(console.log) // foo

    // 返回一个没有实现thenable接口的对象
    async function bar() {
        return ['bar'];
    }
    bar().then(console.log) // ['bar']

    // 返回一个实现了thenable接口的Promise对象
    async function baz () {
        const thenable = {
            then(callback) {callback('baz')}
        }
        return thenable
    }
    baz().then(console.log) // baz

    // 返回一个Promise
    async function qux () {
        return Promise.resolve('qux')
    }
    qux.then(console.log) // qux
  ```

  - 与在Promise处理程序中一样，在异步函数中抛出错误会返回拒绝的Promise对象：

  ```js
    async function foo() {
        console.log(1)
        throw 3
    }
    foo().catch(console.log)
    console.log(2)

    // 1
    // 2
    // 3
  ```

  - 拒绝期约的错误不会被异步函数捕获

  ```js
    async function foo() {
        console.log(1);
        Promise.reject(3);
    }
    foo.catch(console.log)
    console.log(2)

    // 1
    // 2
    // Uncaught (in promise): 3
  ```

- await
  - 因为异步函数主要针对不会马上完成的任务，所有需要一种暂停和恢复执行的能力。
  - 使用await关键字可以暂停异步函数代码的执行，等待Promise解决。

  ```js
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    p.then((x) => console.log(x)) // 3

    // 使用async/await
    async function foo() {
        let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
        console.log(await p);
    }
    foo() // 3
  ```
  
  - await关键字会暂停执行异步函数后面的代码，让出JS运行时的执行线程。
  - 这个行为与生成器函数中的yield关键字是一样的。await关键字同样尝试解包对象的值，然后将这个值传给表达式，在异步恢复异步函数的执行。
  - await关键字的用法与JS的一元操作一样。它可以单独使用，也可以在表达式中使用。

  ```js
    // 异步打印foo
    async function foo() {
      console.log(await Promise.resolve('foo'))
    }

    foo() // foo

    // 异步打印bar
    async function bar() {
      return await Promise.resolve('bar')
    }
    bar().then(console.log) // bar

    // 1000毫秒后异步打印baz
    async function baz() {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      console.log('baz') // baz
    }
  ```

  - await关键字期待（但实际上并不要求）一个实现thenable接口的对象，但常规的值也可以。如果是实现thenable接口的对象，则这个对象可以由await来“解包”。如果不是，则这个值就被当作已经解决的期约。

- await的限制
  - await关键字必须在异步函数中使用。不能再顶级上下文如`<script>`标签或模块中使用。
  - 不过定义并立即调用异步函数是没有问题的。

  ```js
    async function foo() {
      console.log(await Promise.resolve(3))
    }
    foo(); // 3

    (async function() {
      console.log(await Promise.resolve(3))
    })()
    // 3
  ```

  - 异步函数的特质不会扩展到嵌套函数，因此await关键字也只能直接出现再异步函数的定义中。在同步函数中使用await会抛出SyntaxError.
    - await不能出现在箭头函数中
    - 不能出现在同步函数声明中
    - 不能出现在同步函数表达式中
    - IIFE使用同步函数或箭头函数

- 停止和恢复执行
  - async/await中真正起作用的是await。
  - async关键字其实只是一个异步函数的标识。

  - JS运行时在碰到await时，会记录在哪里暂停。等到await右边的值可用了，JS运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。
  - 因此，即使await后面跟着一个立即可用的值，函数的其余部分也会被异步求值。

  ```js
    async function foo() {
      console.log(2)
      await null;
      console.log(4);
    }
    console.log(1);
    foo();
    console.log(3);

    // 1
    // 2
    // 3
    // 4
  ```

  - 如果await后面是一个Promise对象，则问题会复杂一些。
    - 此时为了执行异步函数，实际上会有两个任务被添加到消息队列并被异步求值。
    -  TC39对await后面是期约的情况如何处理做过一次修改。修改后，本例中的Promise.resolve(8)只会生成一个异步任务。

- 异步函数策略
  1. 实现sleep()
  
  ```js
    async function sleep(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay))
    }

    async function () {
      const t0 = Data.now()
      await sleep(1500) // 暂停1500ms
      console.log(Date.now() - t0)
    }
    foo()
    // 1502
  ```

  2. 利用平行执行
  - 如果使用await时不留心，则可能错过平行加速的机会。

  3. 串行执行Promise
  - 在11.2节，我们讨论过如何串行执行期约并把值传给后续的期约。使用async/await，期约连锁会变得很简单。

  ```js
    function addTwo(x) {return x + 2}
    function addThree(x) {return x + 3}
    function addFive(x) {return x + 5}

    async fucntion addTen(x) {
      for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x)
      }
      return x;
    }

    addTen(9).then(console.log) // 19
  ```

  - 这里，await直接传递了每个函数的返回值，结果通过迭代产生。
  - 当然，这个例子并没有使用期约，如果要使用期约，则可以把所有函数都改成异步函数。这样它们就都返回期约了。

  ```js
    async function addTwo(x) {return x + 2}
    async function addThree(x) {return x + 3}
    async function addFive(x) {return x + 5}

    async fucntion addTen(x) {
      for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x)
      }
      return x;
    }

    addTen(9).then(console.log) // 19
  ```

  1. 栈追踪与内存管理
    - 期约与异步函数的功能有相当程度的重叠，但它们在内存中表示则差别很大。

  ```js
    function fooPromiseExecutor(resolve, reject) {
      setTimeout(reject, 100, 'bar');
    }

    function foo() {
      new Promise(fooPromiseExecutor);
    }

    foo()

    // Uncaught (in promise) bar
    // setTimeout
    // setTimeout (async)
    // fooPromiseExecutor
    // foo

    // 换成异步函数
    function fooPromiseExecutor(resolve, reject) {
      setTimeout(reject, 100, 'bar');
    }

    async function foo() {
      await new Promise(fooPromiseExecutor);
    }

    // Uncaught (in promise) bar
    // foo
    // async fucntion (async)
    // foo
  ```

### 小结
- 期约的主要功能是为异步代码提供了清晰的抽象。
- 可以用期约表示异步执行的代码块，也可以用期约表示异步计算的值。
- 在需要串行异步代码时，期约的价值最为突出。作为可塑性极强的一种结构，期约可以被序列化、连锁使用、复合、扩展和重组。
- 异步函数是将期约应用于JavaScript函数的结果。

- 异步函数可以暂停执行，而不阻塞主线程。
- 无论是编写基于期约的代码，还是组织串行或平行执行的异步代码，使用异步函数都非常得心应手。
- 异步函数可以说是现代JavaScript工具箱中最重要的工具之一