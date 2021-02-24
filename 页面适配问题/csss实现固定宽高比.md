- 1.若元素的尺寸已知，直接计算宽高比，就可以了。
- 2.元素尺寸未知，最简单的方法就是用JavaScript实现，如果用CSS的话分为下列几种：
  - 是可替换元素`<img>`或`<video>`？
  - 是普通元素？

### 一、可替换元素实现固定宽高比
- 如`<img>`和`<video>`和其他元素不同，它们本身有像素宽度和高度的概念。我们指定其宽度或者高度值，另一边自动计算就可以了。

```html
  <div class="img-wrapper">
    <img src="https://p3.ssl.qhimg.com/t01f7d210920c0c73bd.jpg" alt="">
  </div>
  <style>
    .img-wrapper {
      width: 50vw;
      margin: 100px auto;
      padding: 10px;
      border: 5px solid lightsalmon;
      font-size: 0;
    }

    img {
      width: 100%;
      height: auto;
    }
  </style>
```

- 给`img`元素设定了`height: auto;`，这是为了避免开发者或者内容管理系统在HTML源码中给图片添加了`height`属性，通过设置来覆盖掉原有的height。

- 对于`<video>`元素，类似。

### 二、普通元素实现固定宽高比

####  2.1`padding-bottom/padding-top`实现普通元素固定宽高比
- 垂直方向上的内边距使用百分比做单位时，是基于包含快=块的宽度来计算的。
- 通过借助`padding-bottom`就可以实现一个宽高比例固定的元素。

```html
  <div class="wrapper">
    <div class="intrinsic-aspect-ratio-container"></div>
  </div>

  <style>
    .wrapper {
      width: 40vw;
    }
    .intrinsic-aspect-ratio-container {
      width: 100%;
      height: 0;
      padding: 0;
      padding-bottom: 75%;
      margin: 50px;
      background-color: lightsalmon;
    }
  </style>
```

- 此外，尺寸比例，也可用通过`calc()`来计算，这样比较灵活。可以快速的写出任意比例，如`padding-bottom: calc(33 /17 * 100%)`

- 这种方式只能高度随着宽度动，并不能实现宽度随着高度动。
- 目前还没宽度随着高度变化的。

#### 2.2`aspect-ratio`属性指定元素宽高比
- 通过padding-top/bottom来hack的方式也很不直观，并且需要元素的嵌套。

- W3C的css工作组为了避免这一问题，已经致力于实现这样一个属性`aspect-ratio`。目前chrome 88 已经实现了这一个属性。

```css
  /* 高度随动 */
  .box1 {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }

  /* 宽度随动 */
  .box2 {
    height: 100%;
    width: auto;
    aspect-ratio: 16/9;
  }
```