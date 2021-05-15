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
- 