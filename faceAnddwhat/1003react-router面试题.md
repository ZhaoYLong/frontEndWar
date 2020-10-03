### 0.react-router解决什么问题？
- 使用路由可以自如流畅得向应用中添加，切换组件，并保持页面与URL间得同步。
- 使用React-Router我们不需要手动寻找需要渲染得组件，无需编写复杂得逻辑，只需要完成相应得路由配置。

> [阮一峰的教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)

### 1.基本用法
- npm install -S react-router

- 使用，路由器Router就是React的一个组件

```js
import {Router} from 'react-router';
render<Router/>, document.getElementById('app');
```

- Router组件本身只是一个容器，真正的路由要通过Router组件定义

```js
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'));
```

### 2.嵌套路由
- Router组件还可以嵌套

```js
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>
```

### 3.path属性
- Router组件的path属性指定路由的匹配规则。这个属性可以省略

### 4.通配符
- path属性可以使用通配符
  
```js
<Route path="/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/hello(/:name)">
// 匹配 /hello
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path="/files/*.*">
// 匹配 /files/hello.jpg
// 匹配 /files/hello.html

<Route path="/files/*">
// 匹配 /files/ 
// 匹配 /files/a
// 匹配 /files/a/b

<Route path="/**/*.jpg">
// 匹配 /files/hello.jpg
// 匹配 /files/path/to/file.jpg
```

### 5.IndexRoute组件
- IndexRoute就是解决这个问题，显式指定Home是根路由的子组件，即指定默认情况下加载的子组件。你可以把IndexRoute想象成某个路径的index.html

### 6.Redirect组件
- 该组件用于路由的跳转

```js
<Route path="inbox" component={Inbox}>
  {/* 从 /inbox/messages/:id 跳转到 /messages/:id */}
  ＜Redirect from="messages/:id" to="/messages/:id" />
</Route>
```
- 现在访问/inbox/messages/5，会自动跳转到/messages/5。

### 7.IndexRedirect组件
- IndexRedirect组件用于访问根路由的时候，将用户重定向到某个子组件。

### 8.Link组件
- 基本上就是a元素的react版本，生成一个链接，允许用户点击后跳转到另一个路由

### 9.IndexLink
- 如果链接到根路由/，不要使用Link组件，而要使用IndexLink组件

### 10.history属性
- 用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供React Router匹配
- history属性可以设置三种值：
  - browserHistory
    - 浏览器的路由就不再通过Hash完成了，而显示正常的路径example.com/some/path，背后调用的是浏览器的History API
  - hashHistory
    - 路由将通过URL的hash部分（#）切换，URL的形式类似example.com/#/some/path
  - createMemoryHistory
    - 主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动

### 11.表单处理
- 第一种方法：
  - browserHistory.push()

- 第二种方法：
  - 使用context对象
  - this.context.router.push(path)

### 12.路由的钩子
- 每个路由都有Enter和Leave钩子，用户进入或离开该路由时触发

- 使用onEnter钩子替代<Redirect>组件
- onEnter钩子还可以用来做认证