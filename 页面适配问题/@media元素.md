- `@media` CSS`@规则`可用于基于一个或多个媒体查询的结果来应用样式表的一部分。
  - 使用它，用户可以指定一个媒体查询和一个CSS块，当且仅当该媒体查询与正在使用其内容的设备匹配时，该CSS块才应用于该文档。

- 在js中，可以使用CSSMediaRule CSS对象模型接口访问使用@media创建的规则。

- `@media`规则可置于用户代码的顶层或位于其他任何`@条件规则组内`

```css
  /* 位于code的顶部 */
  @media screen and (min-width: 900px) {
    artivle {
      padding: 1rem 3rem;
    }
  }

  /* Nested within another conditional at-rule */
  @supports (display: flex) {
    @media screen and (min-width: 900px) {
      artivle {
        display: flex;
      }
    }
  }
```

- 媒体特性Media features描述了user agent、输出设备、或是浏览环境的具体特征。

- 媒体特性表达式是完全可选的，它负责测试这些特性或特征是否存在、值为多少。每条媒体特性表达都必须用括号包裹。

- any-hover
- any-pointer
- aspect-ratio
- color
- color-gamut
- color-index
- device-aspect-ratio
- device-height
- device-width
- display-mode
- forced-colors
- grid
- height
- hover
- inverted-colors
- light-level
- monochrome
- orientation
- overflow-block
- overflow-inline
- pointer
- prefers-color-scheme
- prefers-reduced-transparency
- resolution
- scan
- scription
- update
- width

```css
  @media print {
    body {
      font-size: 10pt;
    }
  }

  @media screen {
    body { font-size: 10px;}
  }

  @media only screen 
    and (min-width: 320px)
    and (max-width: 480px)
    and (resolution: 150dpi) {
      body {
        line-height: 1.4;
      }
    }
```

- 媒体查询第4集引入了一种新的范围语法，在测试接收范围的任何特性时，允许更简洁的媒体查询。

```js
  @media (height > 600px) {
    body {
      line-height: 1.4;
    }
  }

  @media (400px <= width <= 700px) {
    body {
      line-hieght: 1.4;
    }
  }
```

- 为了最好地调整网站文本大小，当您需要`<length>` 进行媒体查询时，请使用em。


### @规则

- 一个以@开头的CSS语句，后跟一个标识符，并包括直到下一个分号的所有内容，';'，或下一个CSS块，以先到者为准。

- 一些@规则，由它们的标示符指定，每个规则都有不同的语法：
  - @charset，定义样式表使用的字符集
  - @import，告诉CSS引擎引入一个外部样式表
  - @namespace，告诉CSS引擎必须考虑XML命名空间
  - 嵌套@规则，是嵌套语句的子集，不仅可以作为样式表里的一个语句，也可以用在条件规则组里：
    - @media，如果满足媒介查询的条件规则组里的规则生效
    - @page，描述打印文档时，布局的变换
    - @font-face，描述将下载的外部的字体
    - @keyframes，描述CSS动画的中间步骤
    - @document，如果文档样式表满足给定条件规则组里的规则生效。

- 条件规则组
  - 就像属性值那样，每条@规则都有不同的语法，不过一些@规则可以归为一类：条件规则组。
  - 这些语句使用相同的语法，它们都嵌套语句，或者是规则或者是@规则。
  - 它们都表达：它们所指的条件（类型不同）总等效于true或者false。如果为true那么它们里面的语句生效。

- 条件规则组由CSS Conditionals Level 3定义：
  - @media
  - @supports
  - @document