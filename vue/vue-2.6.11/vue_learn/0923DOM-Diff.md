> VNode最大的用途就是在数据变化前后生成真实DOM对应的虚拟DOM节点，然后就可以对比新旧两份VNode，找出差异所在，然后更新有差异的DOM节点，最终达到以最少操作真实DOM更新视图的目的。

- 找出差异的过程就是DOM-Diff过程，DOM-Diff算法是整个虚拟DOM的核心所在。

### patch

- Vue中，把DOM-Diff过程叫做patch过程（补丁）
- patch
  - 指对旧的VNode修补，打补丁得到新的VNode
  - 思想：<p style="color: yellow;">所谓旧的VNode(即oldVNode)就是数据变化之前视图所对应的虚拟DOM节点，而新的VNode是数据变化之后将要渲染的新的视图所对应的虚拟DOM节点，所以我们要以生成的新的VNode为基准，对比旧的oldVNode，如果新的VNode上有的节点而旧的oldVNode上没有，那么就在旧的oldVNode上加上去；如果新的VNode上没有的节点而旧的oldVNode上有，那么就在旧的oldVNode上去掉；如果某些节点在新的VNode和旧的oldVNode上都有，那么就以新的VNode为准，更新旧的oldVNode，从而让新旧VNode相同。</p>
  - <p style="color: red;">以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样，这就是patch过程</p>

  - patch干的三件事：
    - 创建节点：新的VNode中有而旧的oldVNode中没有，就在旧的oldVNode中创建。
    - 删除节点：新的VNode中没有而旧的oldVNode中有，就从旧的oldVNode中删除。
    - 更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode。


### 创建节点

- VNode类可以描述6种类型的节点，只有元素节点、文本节点、注释节点这三种能够被创建，并插入到DOM中。
- 所以Vue在创建节点的时候会判断在新的VNode中有而旧的oldVNode中没有的这个节点是属于哪种类型的节点，从而调用不同的方法创建并插入到DOM中。

- 判断是否为元素节点只需判断该VNode节点是否有tag标签即可。如果有tag属性即认为是元素节点，则调用createElement方法创建元素节点，通常元素节点还会有子节点，那就递归遍历创建所有子节点，将所有子节点创建好之后insert插入到当前元素节点里面，最后把当前元素节点插入到DOM中。
- 判断是否为注释节点，只需判断VNode的isComment属性是否为true即可，若为true则为注释节点，则调用createComment方法创建注释节点，再插入到DOM中。
- 如果既不是元素节点，也不是注释节点，那就认为是文本节点，则调用createTextNode方法创建文本节点，再插入到DOM中。

- 创建节点的流程图：

![图](https://vue-js.com/learn-vue/assets/img/2.02d5c7b1.png)


### 删除节点

- 新的VNode中没有，而旧的oldVNode中有，旧需要把这些节点从旧的oldVNode中删除，调用removeNode(el)


### 更新节点

- 更新节点需要对3种情况进行判断、处理：
  - 1、VNode和oldVNode均为静态节点：直接跳过无需处理
  - 2、VNode是文本节点
    - 若VNode是文本节点即表示这个节点内只包含纯文本，若oldVNode与VNode两个文本不同，只需要把oldVNode里的文本改成VNode的文本；若oldVNode不是文本节点，直接调用setTextNode方法把它改成文本节点，并且文本内容跟VNode相同
  - VNode是元素节点
    - 包含子节点
    - 不包含子节点

- 流程图：

![图](https://vue-js.com/learn-vue/assets/img/3.7b0442aa.png)