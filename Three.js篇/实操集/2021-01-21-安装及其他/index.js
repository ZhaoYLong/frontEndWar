// 可以使用npm以及现代构建工具来安装three.js。
// 也可以使用CDN

// 无论选择哪种方式，一定要保持一致。

// 所有安装three.js的方式都依赖于ES Modules

// npm install --save three

import * as Three from 'three';

const scene = new Three.Scene();

// 方法二
import { Scene } from 'three';
const scene = new Scene();

// 从CDN或静态主机安装
// 通过将文件上传到自己的服务器，或是使用一个已存在的CDN，three便可以不借助任何构建系统来进行使用。由于three.js依赖于ES module，因此任何引用它的script标签都必须使用type="module"
<script type="module">
  import * as Three from 'https://unpkg.com/three/build/three.module.js';

  const scene = new Three.Scene();
</script>

/**
 * 并非所有功能都可以通过build/three.module.js模块来加载。three.js中其他较流行的部分——控制器（control）、加载器（loader）以及后期处理效果（post-processing effect）——必须从example/jsm子目录下导入
 */

 // 实例
 /**
  * three.js的核心专注于3D引擎最重要的组件。
  * 其它有用的组件——控制器、loader、post-processing effect是examples/jsm目录的一部分，被称为示例，它们可以直接拿来用。
  * 这些组件和three.js的核心保持同步，而npm上类似的第三方包则由不同的作者维护，不一致。
  * 示例无需被单独地安装，但需要被单独地导入。
  * 若使用npm来安装，可以使用使用如下代码来加载轨道控制器（OrbitControls）:
  */

 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
 const controls = new OrbitControls();

 // 如果three.js安装来自一个CDN，要使用相同的CDN来安装组件
 <script type="module">

  // 通过访问 https://unpkg.com/three 来查找最新版本。
  // 该URL将会重定向到最新的稳定版本。
  import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

  const controls = new OrbitControls();

</script>

// 兼容性
// 可以使用babelify来转换ES6代码

// Node.js
// 在Node.js下使用three.js较为困难，原因：
/**
 * 1.three.js是为web而构建，依赖于浏览器，并不总是存在于Node.js中的DOM API。
 * 2.Node.js 对于 ES module 的支持可以说……很复杂
 */