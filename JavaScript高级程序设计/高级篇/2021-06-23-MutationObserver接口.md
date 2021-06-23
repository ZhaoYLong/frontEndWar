## MutationObserver接口

> 添加到DOM规范中的MutationObserver接口，可以再DOM被修改时异步执行回调。
> 使用MutationObserver可以观察整个文档、DOM树的一部分，或某个元素。还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。

> 【注意】新引进MutationObserver接口是为了取代废弃的MutationEvent.

### 基本用法
- MutationObserver的实例要通过调用MutationObserver构造函数并传入一个回调函数来创建

```js
  let observer = new MutationObserver(() => console.log('DOM was mutated'));
```

1. observer()方法
   1. 新创建的MutationObserver实例不会关联DOM的任何部分。要把observer与DOM关联起来，需要使用observer与DOM关联起来。
   2. observer(node, mutationObserverInit)
      1. node：要观察其变化的DOM节点
      2. mutationObserverInit：MutationObserverInit对象，用于控制观察哪些方面的变化是一个键/值对形式配置选项的字典。
   
   ```js
    let observe = new MutationObserver(() => console.log('<body> 属性改变了'));

    observer.observe(docuemnt.body, {attributes: true})

    // 执行以上代码后，<body>元素上任何属性发生变化都会被这个MutationObserver实例发现，然后回异步执行注册的回调函数
    // <body>元素后代的修改或其他非属性修改都不会触发回调进入任务队列。
   ```

2. 回调与MutationRecord
   1. 每个回调都会收到一个MutationRecord实例的数组。
      1. 这个实例包含的信息包括发生了什么变化
      2. DOM的那个部分受到影响

  ```js
    let observer = new MutationObserver((mutationRecords) => console.log(mutationRecords));

    observer.observe(document.body, { attributes: true});

    document.body.setAttribute('foo', 'bar');
    // 输出：[MutationRecord]

    // 涉及命名空间的类似变化
    document.body.setAttributeNS('baz', 'foo', 'bar');
    // 输出：[MutationRecord]

    // 连续修改会生成多个MutationRecord实例，下次回调执行时就会收集包含这些实例的数组：
    document.body.className = 'foo'; 
    document.body.className = 'bar'; 
    document.body.className = 'baz'; 
    // [MutationRecord, MutationRecord, MutationRecord]
  ```

  - MutationRecord实例的属性：
    - target
    - type
    - oldValue
    - attributeName
    - attributeNamespace
    - addedNodes
    - removedNodes
    - previousSibling
    - nextSibling

  - 传给回调函数的第二个参数是观察变化的MutationObserver的实例

  ```js
    let observer = new MutationObserver((mutationRecords, mutationObserver) => console.log(mutationRecords, mutationObserver));

    observer.observe(document.body, { attributes: true});

    document.body.className ="foo";
    //输出：[MutationRecord], MutationObserver
  ```

3. disconnect()
   1. 要提前终止执行回调，可以调用disconnect()方法。
   2. 调用该方法后，不仅会停止此后变化事件的回调，也会抛弃已经加入任务队列要异步执行的回调

  ```js
    let observer = new MutationObserver(() => console.log('<body> attributes changed')); 
    observer.observe(document.body, { attributes: true }); 

    document.body.className = "foo";

    observer.disconnect();

    document.body.className = 'bar';
  ```

   3. 要想让已经加入任务队列的回调执行，可以使用setTimeout()让已经入列的回调执行完毕再调用disconnect();
   
  ```js
    let observer = new MutationObserver(() => console.log('<body> attributes changed')); 
    observer.observe(document.body, { attributes: true }); 

    document.body.className = "foo";

    setTimeout(() => {
      observer.disconnect();
      document.body.className = 'bar';
    }, 0)

    // <body> attributes changed
  ```

   4. 复用MutationObserver
      1. 多次调用observe()方法，可以复用一个MutationObserver对象观察多个不同的目标节点。
      2. 此时，MutationRecord的target属性可以标识发生变化事件的目标节点。
   5. 重用Mutationobserver
      1. 调用disconnect()并不会结束MutationObserver的生命，还可以重新使用这个观察者，再将她关联到新的目标节点。

### MutationObserverInit与观察范围
- MutationObserverInit对象用于控制对目标节点的观察范围。粗略地讲，观察者可以观察的事件包括属性变化、文本变化和子节点变化。

- MutationObserverInit对象的属性
  - subtree：布尔值，表示除了目标节点，是否观察目标节点的子树（后代）
  - attributes：Boolean，表示是否观察目标节点的属性变化
  - attributeFilter：字符串数组，表示要观察哪些属性的变化
  - attributeOldValue：布尔值，表示MutationRecord是否记录变化之前的属性值
  - characterData：布尔值，表示修改字符数据是否触发变化事件
  - characterDataOldValue：Boolean，表示MutationRecord是否记录变化之前的字符数据
  - childList：Boolean，表示修改目标的子节点是否触发变化事件

1. 观察属性
  - MutationObserver可以观察节点属性的添加、移除和修改。要为属性变化注册回调，需要在MutationObserverInit对象中将attributes属性设置为true。

2. 观察字符数据
  - MutationObserver可以观察文本节点（如Text、Comment或ProcessingInstruction节点）中字符的添加、删除和修改。
  - 要为字符数据注册回调，需要在MutationObserverInit对象中将characterData属性设置为true。

3. 观察子节点
  - 需要在MutationObserverInit对象中将childList属性设置为true。

4. 观察子树
  - 需要在MutationOberverInit对象中的subtree设置为true

### 异步回调与记录队列
- MutationObserver接口是出于性能考虑而设计的，其核心是异步回调与记录队列模型。

- 为了在大量变化事件发生时不影响性能，每次变化的信息（由观察者实例决定）会保存在MutationRecord实例中，然后添加到记录队列。

1. 记录队列

2. takeRecords()方法
   1. 用于清空记录队列，取出并返回其中的所有MutationRecord实例。
   2. 这在希望断开与观察目标的联系，但又希望处理由于调用disconnect()而被抛弃的记录队列中的MutationRecord实例时比较有用


### 性能、内存与垃圾回收

- DOM  Level  2规范中描述的MutationEvent定义了一组会在各种DOM变化时触发的事件。
- 由于浏览器事件的实现机制，这个接口出现了严重的性能问题。
- DOM Level 3规定废弃了这些事件。MutationObserver接口就是为替代这些事件而设计的更实用、性能更好的方案。

- 将变化回调委托给微任务来执行可以保证事件同步触发，同时避免随之而来的混乱。为Mutation- Observer而实现的记录队列，可以保证即使变化事件被爆发式地触发，也不会显著地拖慢浏览器。

- 但MutationObserver任然是有代价的

1. MutationObserver的引用
   1. MutationObserver实例与目标节点之间的引用关系是非对称的。
   2. MutationObserver拥有对观察的目标节点的弱引用
   3. 目标节点却拥有对MutationObserver的强引用。如果目标节点从DOM中被移除，随后被垃圾回收，则关联的MutationObserver也会被垃圾回收。

2. MutationRecord的引用
   1. 记录队列中的每个MutationRecord实例至少包含对已有DOM节点的一个引用。如果变化是childList类型，则会包含多个节点的引用。记录队列和回调处理的默认行为是耗尽这个队列，处理每个MutationRecord，然后让它们超出作用域并被垃圾回收。
   2. 有时候可能需要保存某个观察者的完整变化记录。保存这些MutationRecord实例，也就会保存它们引用的节点，因而会妨碍这些节点被回收。如果需要尽快地释放内存，建议从每个MutationRecord中抽取出最有用的信息，然后保存到一个新对象中，最后抛弃MutationRecord。
