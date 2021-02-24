- CSS transfrom属性允许用户旋转、缩放、倾斜或平移给定元素。这是通过修改CSS视觉模型的坐标空间实现的

```css
  .app {
    transform: matrix( 1, 2, 3, 4, 5, 6 );
    transform: translate(120px, 50%);
    transform: scale(2, 0.5);
    transform: rotate(0.5turn);
    transform: skew(30deg, 20deg);
    transform: scale(0.5) translate(-0%, -50%); 
    /* transform(0%, 0%): 表示中心未知，负值在上，正值在下 */
  }
```

- 只能转换由盒模型定位的元素。根据经验，如果元素具有display: block;，则由盒模型定位元素。

- transform属性可以指定为关键字值none或一个或多个`<transform-function>`的值。
  - `transform: translateX(10px) rotate(10deg) translateY(5px);`

- `<transform-function>`：要应用的一个多多个CSS变换函数。变换函数按从左到右顺序相乘，者意味着复合变换按从右到左的顺序有效地应用。

```html
  <div>Transformed element</div>

  <style>
    div {
      border: solid red;
      transform: translate(30px, 20px) rotate(20deg);
      width: 140px;
      height: 60px;
    }
  </style>
```

```cs
  /* Keyword values */
  transform: none;

  /* Function values */
  transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
  transform: translate(12px, 50%);
  transform: translateX(2em);
  transform: translateY(3in);
  transform: scale(2, 0.5);
  transform: scaleX(2);
  transform: scaleY(0.5);
  transform: rotate(0.5turn);
  transform: skew(30deg, 20deg);
  transform: skewX(30deg);
  transform: skewY(1.07rad);
  transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
  transform: translate3d(12px, 50%, 3em);
  transform: translateZ(2px);
  transform: scale3d(2.5, 1.2, 0.3);
  transform: scaleZ(0.3);
  transform: rotate3d(1, 2.0, 3.0, 10deg);
  transform: rotateX(10deg);
  transform: rotateY(10deg);
  transform: rotateZ(10deg);
  transform: perspective(17px);

  /* Multiple function values */
  transform: translateX(10px) rotate(10deg) translateY(5px);

  /* Global values */
  transform: inherit;
  transform: initial;
  transform: unset;
```