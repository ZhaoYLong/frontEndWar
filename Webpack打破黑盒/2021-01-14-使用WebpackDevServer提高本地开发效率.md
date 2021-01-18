- 因为“编写源代码——>webpack打包——>运行应用——>浏览器查看"这种开发方式过于原始且低效。

- 对理想的开发环境设想：
  - 1.必须能够使用HTTP服务运行而不是文件形式预览。这样更接近生产环境状态。如果项目使用AJAX之类的API，以文件形式访问会产生很多问题。
  - 2.在我们修改完代码之后，webpack能够自动完成构建，然后浏览器及时显示最新运行结果。热加载。
  - 3.还能提供Source Map支持。方便快速定位到错误位置。

- 对于上述的需求，webpack已经提供了相对应得功能，其中部分功能需要用到周边得工具。

### 如何增强使用webpack得开发体验？

- webpack自动编译
  - 可以使用Webpack CLI提供得另一种watch工作模式来解决；
  - watch模式下，项目中得源文件会被监视，一旦发生任何改动，webpack都会重新运行打包任务；
  - 启动 webpack时，添加一个 --watch 得CLI参数

- 使用serve提供服务
  - 安装npm install serve --global
  - npx serve dist
  - serve虽然可以提供服务，但是不能自动刷新浏览器

- BrowserSync工具，可以实现文件变化，浏览器自动刷新的功能
  - 安装npm install browser-sync --global
  - 运行browser-sync dist --watch
  - 或者运行npx browser-sync dist --watch

- webpack watch模式 + browser-sync的弊端：
  - 操作繁琐，需要同时使用2个工具，需要了解的内容就会更多
  - 效率低下，因为整个过程中，webpack会将文件写入磁盘，BrowserSync在进行读取过程中涉及大量磁盘读写操作，必然导致效率低下。

- webpack-dev-server
  - webpack官方推出的一款开发工具
  - 提供了一个开发服务器
  - 将自动编译和自动刷新浏览器等对开发友好的功能全部集成在一起
  - 安装npm install webpack-dev-server --save-dev
  - 运行npx webpack-dev-server

- webpack-dev-server
  - 1.开始
  - 2.启动HTTP服务
  - 3.webpack构建
  - 4.监视文件变化
  - 5.webpack构建

- webpack构建 ——> 内存 ——> HTTP server

- 静态资源访问
  - webpack-dev-server默认会将构建结果和输出文件全部作为开发服务器的资源文件
  - 只要通过webpack打包能够输出的文件都可以直接被访问到
  - 如果还有一些没有参与打包的静态文件也需要作为开发服务器的资源被访问，就需要额外通过配置告诉webpack-dev-server了

- 实际使用webpack时，一般都会把copy-webpack-plugin这种插件留在上线前的那一次打包中使用，开发过程中一般不会用他

- 要注意webpack-dev-server的版本和webpack-cli的版本和webpack的版本

- Proxy
  - 在实际生产环境中能够直接访问的API，回到开发环境后，再次访问API，会产生跨域请求问题
  - cors
  - 解决开发阶段跨域的最好办法：
    - 将后端接口代理到本地服务 proxy配置