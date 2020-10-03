> [参考博客地址](https://juejin.im/post/6844903961745440775)、

### 1.怎么重定向页面？

#### 1.1

```js
    const router = new VueRouter({
        routes: [
            {path:'/a', redirect: '/b'}
        ]
    })
```

#### 1.2 

```js
    const router = new VueRouter({
        routes: [
            {path: '/a', redirect: {name: 'foo'}}
        ]
    })
```

#### 1.3 

```js
    const router = new VueRouter({
        routes: [
            {
                path: '/a',
                redirect: to => {
                    const {hash, params, query} = to
                    if (query.to === 'foo') {
                        return {path: '/foo', query: null}
                    } else {
                        return '/b'
                    }
                }
            }
        ]
    })
```

### 2.怎么配置404页面？

```js
const router = new VueRouter({
    routes: [
        {
            path: '*', redirect: {path: '/'}
        }
    ]
})
```

### 3.切换路由时，需要保存草稿的功能，怎么实现？

```html
    <kepp-alive :include="include">
        <router-view></router-view>
    </keep-alive>
```

- 其中include可以是个数组，数组内容为路由的name选项的值

### 4.路由有几种模式？说说它们的区别？
- hash
  - 兼容所有浏览器，包括不支持HTML5 History API的浏览器，例如http://www.abc.com/#/index, hash值为#/index，hash的改变会触发hashchange事件，通过监听hashchange事件来完成操作实现前端路由。hash值变化不会让浏览器先服务器发送请求
  ```js
    // 监听hash变化，点击浏览器的前进后退会触发
    window.addEventListener('hashchange', function(event) {
        let newURL = event.newURL; // hash 改变后的新 url
        let oldURL = event.oldURL;// hash 改变前的旧 url
    }, false)
  ```

- history
  - 兼容能支持HTML5 History Api的浏览器，依赖HTML History API来实现前端路由。
  - 没有#，路由地址跟正常的url一样，但是初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源，就会返回404，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html页面，需要在nginx中配置
- abstract
  - 支持所有的JS运行环境，如node.js服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式

### 5.讲一下完整的导航守卫流程？
- 1.导航被触发
- 2.在失活的组件里调用离开守卫beforeRouteLeave(to, from, next)
- 3.调用全局的beforeEach((to, from, next) => {})守卫
- 4.在重用的组件里调用beforeRouteUpdate(to, from, next)守卫
- 5.在路由配置里调用beforeEnter(to, from, next)路由独享的守卫
- 6.解析异步路由组件
- 7.在被激活的组件里调用beforeRouteEnter(to, from, next)
- 8.在所有组件内守卫和异步路由组件被解析之后调用全局的beforeResolve((to, from, next) => {})解析守卫
- 9.导航被确认
- 10.调用全局的afterEach((to, from) => {})钩子
- 11.触发DOM更新
- 12.用创建好的实例调用beforeRouteEnter守卫中传给next的回调函数
  ```js
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过vm访问组件实例
        })
    }
  ```
  
### 6.路由守卫和Vue实例生命周期钩子函数的执行顺序
- 路由导航守卫都是在Vue实例生命周期钩子函数之前执行的

### 7.讲一下导航守卫的三个参数的含义？
- to：即将要进入的目标，路由对象
- from：当前导航正要离开的路由对象
- next：函数，必须调用，不然路由跳转不过去
  - next(): 进入下一个路由
  - next(false):中断当前的导航
  - next('/') or next({path:'/'})：跳转到其他路由，当前导航被中断，进行新的一个导航

### 7.在afterEach钩子中可以使用next()吗？
- 不可以，不接受next的参数

### 8.全局导航守卫有哪些？怎么使用？
- router.beforeEach：全局前置守卫
- router.beforeResolve：全局解析守卫
- router.afterEach：全局后置钩子

```js
    import VueRouter from 'vue-router';
    const router = new VueRouter({
        mode: 'history',
        base: '/',
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPodition) {
                return savedPosition;
            } else {
                return {x:0, y:0}
            }
        }
    })
    router.beforeEach((to, from, next) => {
        //...
        next();
    })
    router.beforeResolve((to, from, necxt) => {
        //...S
        next();
    })
    router.afterEach((to, from) => {
        //...
    })
```

### 9.什么是路由独享的守卫，怎么使用？
- 是beforeEnter守卫

```js
    const router = new VueRouter({
        routes: [
            {
                path:'/foo',
                component: Foo,
                beforeEnter: (to, from, next) => {
                    //...
                }
            }
        ]
    })
```

### 10.在组件内使用的导航守卫有哪些？怎么使用？
- beforeRouteLeave(to, from, next)：在失活的组件里调用离开守卫
- beforeRouteUpdate(to, from, next)：在重用的组件里调用，比如包含<router-view />的组件
- beforeRouteEnter(to, from, next)：在进入对应路由的组件创建前调用

### 11.在beforeRouteEnter导航守卫中，可以用this吗？
- 不可以，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建
- 可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数

```js
    beforeRouteEnter(to, from, next) {
        next(vm => {
            console.log(vm)
        })
    }
```

### 11.说说对router-link的了解
- <router-link>是Vue-Router的内置组件，在具有路由功能的应用中作为声明式的导航使用
- <router-link>有8个props，其作用就是：
  - to：必填，表示目标路由的链接。当被点击后，内部会立即把to值传给router.push(),所以这个值可以是一个字符串或者描述目标位置的对象

  ```js
    <router-link to="home">Home</router-link>
    <router-link :to="'home'">Home</router-link>
    <router-link :to="{ path: 'home' }">Home</router-link>
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    <router-link :to="{ path: 'user', query: { userId: 123 }}">User</router-link>
    // 注意path存在时params不起作用，只能用query
  ```
  - replace：默认值为false，若设置的话，当点击时，会调用router.replace()而不是router.push()，于是导航后不会留下 history 记录。
  - append：设置 append 属性后，则在当前 (相对) 路径前添加基路径。
  - tag：让<router-link>渲染成tag设置的标签，如tag:'li,渲染结果为<li>foo</li>。
  - active-class：默认值为router-link-active,设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
  - exact-active-class：默认值为router-link-exact-active,设置链接被精确匹配的时候应该激活的 class。默认值可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的。
  - exact：是否精确匹配，默认为false。<!-- 这个链接只会在地址为 / 的时候被激活 -->
  ```<router-link to="/" exact></router-link>```
  - event：声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组，默认是click

### 12.怎么在组件中监听路由参数的变化？
- 有2种方法可以监听路由参数的变化，但是只能用在包含<router-view>的组件内

```js
watch: {
    '$route'(to, from) {
        //这里监听
    },
}

// 或者第二种方法
beforeRouteUpdate (to, from, next) {
    //这里监听
},
```

### 13.切换路由后，新页面要滚动到顶部或者保持原先的滚动位置怎么做？

```js
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition // 保持原先位置
        } else {
            return {x:0, y: 0}; // 滚动到顶部
        }
    }
})
```

### 14.在什么场景下会用到嵌套路由？
- 做个管理系统，顶部栏和左侧菜单栏是全局通用的，那就应该放在父路由，而右下的页面内容部分放在子路由

- 比如在app.vue文件中

```html
    <template>
        <div>
            <router-view/>
        </div>
    </template>
```

- 在layout.vue文件中

```html
    <template>
        <div>
            <div>
                <!--头部导航-->
            </div>
            <div>
                <!--侧边导航-->
            </div>
            <div>
                <!--主内容-->
                <router-view/>
            </div>
        </div>
    </template>
```

- 在routes.js文件中

```js
    function load(component) {
        return resolve => require([`view/${component}`],, resolve);
    }

    const routes=[
    {
        path: '/',
        redirect: '/home',
        name: 'layout',
        component: load('layout'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: load('home'),
                meta: {
                    title: '首页'
                },
            },
        ]
    }
]

//然后layout页面就渲染在app.vue文件中的<router-view/>上。home页面就渲染在layout.vue文件夹中的<router-view/>上
```

### 15.什么是命名视图，举个例子说明一下？
- 在项目中，我们想同级展示多个视图，而不是嵌套展示。例如项目首页，有头部导航，侧边栏导航、主内容区域。头部导航、侧边栏导航我们不想用组件方式引入，想用视图方式展示。那么这个首页上，就有三个视图，头部导航视图，侧边栏导航视图、主内容区域视图同级展示。

- 在layout.vue文件中
  
```html

<template>
  <div>
    <div>
        //...头部导航
        <router-view name='header'></router-view>
    <div>
        //...侧边栏导航
        <router-view name='sider'></router-view>
    </div>
    <div>
        //...主内容
        <router-view/>
    </div>
  </div>
</template>

```

- 如果 router-view 没有设置name，那么默认为default。一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (记得加上s)

- 在routes.js文件中

```js
function load(component) {
    return resolve => require([`views/${component}`], resolve);
}
const routes=[
    {
        path: '/',
        redirect: '/home',
        name: 'layout',
        component: load('layout'),
        children: [
            {
                path: '/home',
                name: 'home',
                components: {
                    default: load('main'),
                    header: load('header'),
                    sider: load('sider')
                },
                meta: {
                    title: '首页'
                },
            },
        ]
    }
]
```

### 16.Vue路由怎么跳转打开新窗口？
```js
    const obj = {
        path: xxx, // 路由地址
        query: {
            mid:data.id // 可以带参数
        }
    }
    const {href} = this.$router.resolve(obj);
    window.open(href, '_black')
```

### 17.route和router的区别？
- route：路由信息对象，包括path、hash、params、query、fullPath、matched、name等路由信息参数
- router：路由实例对象，包括了路由的跳转方法，钩子函数

### 18.若ue-router使用history模式，部署时要注意什么？
- 注意404的问题，
- 因为在history模式下，只是动态的通过js操作window.history来改变浏览器地址栏里的路径，并没有发起http请求，当直接在浏览器里输入这个地址的时候，就一定要对服务器发起http请求，但是这个目标在服务器上又不存在，所以会返回404
- 所以要在Ngnix中将所有请求都转发到index.html上就可以了

### 19.路由之间是怎么跳转的？有哪些方法？
- 声明式，通过使用内置组件<router-link :to="/home">来跳转
- 编程式：
  - router.push({path: '/home'})
  - router.replace({path: '/home'})

### 20.路由实现懒加载

```js
    function load(component) {
        // return resolve => require([`views/${component}], resolve)
        return () => import(`view/${component}`);
    }

    const routes = [
        {
            path: '/home',
            name:'home',
            component:load('home')
            meta:{
                title: '首页'
            }
        }
    ]
```

### 21.怎么动态加载路由？
- 使用Router的实例方法addRoutes来实现动态加载路由，一般用来实现菜单权限。
- 使用时要注意，静态路由文件中不能有404路由，而要通过addRoutes一起动态添加进去。

```js
    const routes = [
        {
            path: 'overview',
            name:'overview',
            component: () => import('@/views/account/overview/index'),
            meta: {
                title: '账户概览',
                pid: 869,
                nid: 877
            },
        },
        { // 404情况
        path: '*',
        redirect: {
            path: '/'
        }
    }
    ]
    vm.$router.options.routes.push(...routes);
    vm.$router.addRouters(routes);
```

### 22. 在vue组件中怎么获取到当前的路由信息？
- 通过this.$route来获取

### 23.说说active-class是哪个组件的属性？
- <router-link/>组件的属性，设置链接激活时使用的CSS类名。默认值可以通过路由的构造选项linkActiveClass来全部配置

### 24.如何获取路由传过来的参数？
- 有三种传参方式，获取方式也不同

- 1.meta：路由元信息，写在routes配置文件中
  - 获取方式：this.$route.meta.title

- 2.query
  ```js
    this.$router.push({
        path: '/home',
        query: {
            userId: 23
        }
    })
  ```
  - 浏览器地址：http://localhost:80081/#/home?userId=23
  - 获取方式：this.$route.query.userId

- 3.params
  - 首先要在地址上做配置
  ```js
    {
        path: 'home/:userId',
        name: 'home',
        meta: {
            title: '首页'
        }
    }
  ```
  - 访问传参
    - ```js
        const userId = '123',
        this.$router.push({name:'home', params:{userId}})
      ```
    - 注意用params传参，只能用命名的路由（用name访问），如果用path，params不起作用。 this.$router.push({ path: '/home', params: { userId }})不生效。
    - 浏览器地址：http://localhost:8036/home/123
    - 获取方式：this.$route.params.userId

### 25.路由组件和路由为什么解耦，怎么解耦？
- 因为在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，所有要解耦。

- 耦合如以下代码所示。Home组件只有在http://localhost:8036/home/123URL上才能使用
```js
const Home = {
    template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
    routes: [
        { path: '/home/:id', component: Home }
    ]
})

```

- 使用 props 来解耦
  - props为true，route.params将会被设置为组件属性。
  - props为对象，则按原样设置为组件属性。
  - props为函数，http://localhost:8036/home?id=123,会把123传给组件Home的props的id。

```js
const Home = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
    routes: [
        { path: '/home/:id', component: Home, props: true},
        // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
        {
            path: '/home/:id',
            components: { default: Home, sidebar: Sidebar },
            props: { default: true, sidebar: false }
        }
        { path: '/home', component: Home, props: {id:123} },
        { path: '/home', component: Home, props: (route) => ({ id: route.query.id }) },
    ]
})
```
