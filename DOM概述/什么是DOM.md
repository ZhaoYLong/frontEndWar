- 文档对象模型DOM是HTML和XML文档的编程接口。
- 对文档的结构化的表述，定义了一种方式可以使得从程序中对该结构进行访问，从而改变文档的结构，样式和内容。
- 文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。
- DOM会将web页面和脚本或程序语言连接起来。

- DOM现在是真正跨平台、语言无关的表示和操作网页的方式。

- IE8及更低版本中DOM是通过COM对象（Component Object Model）实现的。COM的垃圾回收方式采用的是引用记数。而js引擎采用的是标记清理方式。
- 目前的DOM都是使用JS对象实现的。

- 一个web页面就是一个文档。这个文档可以在浏览器窗口或作为HTML源码显示出来。
  - DOM提供了对一份文档的另一种表现，存储和操作的方式。
  - DOM是web页面的完全的面向对象表述，使用js等脚本语言可以对DOM进行修改。

- `document.getElementsByTagName('p')`，该方法将返回所有`<p>`元素的列表

- 所有操作和创建web页面的属性，方法和事件都会被组织成对象的形式。

- DOM并不是一个编程语言，但如果没有DOM，JS语言也不会由任何网页。

- start，JS和DOM是交织在一起的，但最终变成了2个独立的实体。
  - API（web或XML页面） = DOM + JS

- 目前，每个web浏览器都会使用一些文档对象模型，从而使页面可以被脚本语言访问。

- 使用document或windo元素的API来操作文档本身或文档的子类。

```html
  <html>
    <head>
      <script>
        // run this function when the document is loaded
        window.onload = function() {
          let heading = document.createElement('h1');
          let heading_text = document.createTextNode('Big head');
          heading.appendChild(heading_text);
          document.body.appendChild(heading);
        }
      </script>
    </head>
    <body>
      <!--  -->
    </body>
  </html>
```

- 重要数据类型
  - element(s)指代节点
  - nodeList(s)或element(s)指代节点数组
  - attribute(s)指代属性节点

| 数据类型 | 描述 |
| ---- | ---- |
| document | document对象 |
| element | 指由DOM API中成员返回的类型为element的一个元素或节点，element对象实现了DOM Element接口以及更基本的Node接口。 |
| nodeList | 是一个元素的数组，如从document.getElementByTagName()方法返回的就是这种类型。nodeList中的条目由通过下标有两种方式进行访问： list.item(1)和`list[1]` |
| attribute | 当attribute通过成员函数（例如，通过createAttribue()）返回时，它是一个为属性暴露出专门接口的对象引用。DOM中的属性也是节点，就像元素一样。 很少使用 |
| namedNodeMap | namedNodeMap 和数组类似，但是条目是由name和index访问的。namedNodeMap 有一个 item() 方法，你也可以从  namedNodeMap 添加或移除条目。 |

- DOM接口
  - 许多对象都实现了多个接口。

- window对象表示浏览器中的内容
- document对象是文档本身的根节点
- Element继承了通用的Node接口

### DOM接口

| 接口名称 | 接口名称 |
| ---- | ----|
| Attr | HTMLCollection |
| CharacterData | MutationObserver |
| ChildNode | MutationRecord |
| Comment | Node |
| CustomEvent | NodeFilter |
| Document | NodeIterator |
| DocumentFragment | NodeList |
| DocumentType | ParentNode |
| DOMError | ProcessingInstruction |
| DOMException | Promise |
| EOMString | PromiseResolver |
| DOMTimeStamp | Range |
| DOMSettableTokenList | Text |
| DOMStringList | TreeWalker |
| DOMTokenList | URL |
| Element | Window |
| Event | Worker |
| EventTarget | XMLDocument |

### HTML接口
- HTMLDocument接口描述了包含HTML的文档。注意：HTML规范页继承了Document接口。
- 一个HTMLDocument对象还可以访问浏览器的各种功能：例如使用Window接口来绘制的标签或窗口，与之关联的样式Style（通常是CSS），浏览器相对于上下文的历史记录History，以及文档内的选取Selection等。

- HTML元素接口
- 其他接口

### SVG接口
- SVG元素接口
- SVG数据类型接口
  - Static type
  - Animated type
- SVG路径段接口
- SMIL相关接口
- 其他SVG接口


