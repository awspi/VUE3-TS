# VueRouter路由使用



# route路由

## URL的hash

URL的**hash也就是锚点(#)**, **本质上是改变window.location的href属性**

可以通过直接赋值location.hash来改变href, 但是页面不发生刷新;

![image-20220629035259605](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206290352636.png)

- hash的优势就是兼容性更好，在老版IE中都可以运行，但是**缺陷是有一个#**，显得不像一个真实的路径。

## HTML5的History

history接口是HTML5新增的, 它有六种模式改变URL而不刷新页面

- replaceState:替换原来的路径;
- pushState:使用新的路径;
- popState:路径的回退;
- go:向前或向后改变路径
- forward:向前改变路径
- back:向后改变路径;

**pushState**

相当于是一个压栈的过程,用户每次只能看见栈顶的page,如果想要后退,就需要popState

**replaceState**

每次是替换当前页面,不能后退

```js
 //页面设置函数
    const changeContent=()=>{
      switch (location.pathname) {
          case '/home':
          contentEl.innerHTML='<h2>HOME</h2>'
            break;
          case '/about':
          contentEl.innerHTML='<h2>ABOUT</h2>'
            break;
        
          default:
          contentEl.innerHTML='<h2>DEFAULT</h2>'
            break;
        }
      }
    //1.获取view
    const contentEl=document.querySelector('.content')
    //2.监听所有a元素
    const aEls=document.getElementsByTagName('a')
    for(let aEl of aEls){
      aEl.addEventListener('click',event=>{
        event.preventDefault()

        const href=aEl.getAttribute('href')
        history.pushState({},'',href)
        // history.replaceState({},'',)
        changeContent()

      })
      //3.监听popstate和go
      window.addEventListener('popstate',changeContent)
      // window.addEventListener('go',changeContent)
    }
```



# vue-router

Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得非常容易

vue-router是基于路由和组件的

- 路由用于设定访问路径, 将路径和组件映射起来
- 在vue-router的单页面应用中, 页面的路径的改变就是组件的切换.

**安装Vue Router**

```bash
 npm install vue-router
```

## 路由的使用步骤

- 第一步:创建路由组件的组件;
- 第二步:配置路由映射: 组件和路径映射关系的routes数组
- 第三步:通过createRouter创建路由对象，并且**传入routes和history模式** (选择其一使用)
- 第四步:使用路由: 通过`<router-link>`和`<router-view>`

![image-20220629155529542](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291555569.png)

## 路由的基本使用

![image-20220629160008325](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291600358.png)

![image-20220629160247085](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291602123.png)

## 路由的默认路径

默认情况下, 进入网站的首页, 我们希望`<router-view>`渲染首页的内容;

![image-20220629160553217](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291605250.png)

**在routes中配置一个映射:**

- **path**配置的是根路径: /
- **redirect**是重定向, 也就是我们将根路径重定向到/home的路径

![image-20220629160744829](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291607854.png)



## router-link的属性

**to属性:**

- 是一个字符串，或者是一个对象

**replace属性:**

- 设置 replace 属性的话，当点击时，会调用 **router.replace()**，而不是 router.push();(默认)
  - 相当于history.replace,不能返回

**active-class属性:**

- **设置激活a元素后应用的class**，默认是router-link-active

![image-20220629161422509](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291614539.png)

![image-20220629161802381](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291618416.png)

**exact-active-class属性:**

- 链接精准激活时，应用于渲染的 `<a>` 的 class，默认是router-link-exact-active;
- 路由嵌套时候用

# 路由懒加载

Vue Router默认就支持动态来导入组件: 

这是因为component可以传入一个组件，**也可以接收一个函数**，该函数需要放回一个Promise

而import函数就是返回一个Promise;

![image-20220629162506641](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291625672.png)

## 对分包进行命名

分包是没有一个很明确的名称的，其实webpack从3.x开始支持对分包进行命名(chunk name):

webpack魔法注释

![image-20220629162814349](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291628381.png)



# 动态路由匹配

很多时候我们需要将给定匹配模式的路由映射到同一个组件:

- 例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但是用户的ID是不同的
- 在Vue Router中，我们可以在路径中**使用一个动态字段**来实现，我们称之为 **路径参数;**

```js
  {
    path: '/user/:username',
    component: () => import('../pages/User.vue'),
  },
```



## 获取动态路由的值

在User中如何获取到对应的值呢?

- 在template中，直接通过 $route.params获取值;
  - 在created中，通过 this.$route.params获取值;
  - 在setup中，我们要使用 vue-router库给我们提供的一个hook useRoute;
    - 该Hook会返回一个Route对象，对象中保存着当前路由相关的值;

![image-20220629165436719](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291654749.png)



## 匹配多个参数

![image-20220629165624529](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291656559.png)



## NotFound

没有匹配到的路由，我们通常会匹配到固定的某个页面

比如NotFound的错误页面中，这个时候我们可编写一个动态路由用于匹配所有的页面;

通过 **`$route.params.pathMatch`**获取到传入的参数:

![image-20220629170437395](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291704428.png)

**匹配规则加***

在`/:pathMatch(.*)`后面又加了一个 `*`;

**区别在于解析的时候，是否解析 /:**

![image-20220629170532265](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291705302.png)

# 路由的嵌套

目前我们匹配的Home、About、User等都属于底层路由，我们在它们之间可以来回进行切换

- 但是我们Home页面本身，也可能会在多个组件之间来回切换:
- 比如Home中包括Product、Message，它们可以**在Home内部来回切换;**

这个时候我们就需要使用**嵌套路由**，**在Home中也使用 router-view 来占位之后需要渲染的组件**

## 路由的嵌套配置

![image-20220629172810317](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291728354.png)

## exact-active-class属性

router-link的**exact-active-class属性:**

- 链接精准激活时，应用于渲染的 `<a>` 的 class，默认是**router-link-exact-active**;
- **路由嵌套时候用**

例如父路由/home切换到子路由/home/message

- 渲染 `<a>`的class='active-class'一直都是在'/home'上,不会切换到'/home/message'
- **router-link-exact-active**会显示在'/home/message'上

![image-20220629173626994](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291736041.png)



# 编程式导航

**通过代码来完成页面的跳转**)

- 跳转页面router.push
  -  使用push的特点是压入一个新的页面，那么在用户点击返回时，上一个页面还可以回退，
- 替换当前的位置router.replace
  - 当前页面是一个替换操作

## router.push

![image-20220629174825154](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291748193.png)

### 传入一个对象

![image-20220629175058556](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291750608.png)

### query方式的参数

通过query的方式来传递参数并在界面中通过 $route.query 来获取参数:

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291753323.png" alt="image-20220629175311283" style="zoom:67%;" />



## router.replace

![image-20220629180005612](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291800667.png)



## 页面的前进后退

router的go方法:

router也有back:

通过调用 history.back() 回溯历史。相当于 router.go(-1);

router也有forward:

通过调用 history.forward() 在历史中前进。相当于 router.go(1);

![image-20220629180058754](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291800801.png)





# 路由的插槽和v-slot

## router-link的v-slot

在vue-router3.x的时候，router-link有一个tag属性，可以决定router-link到底渲染成什么元素

- 但是在vue-router4.x开始，该属性被移除了;
- 提供了更加具有灵活性的v-slot的方式来定制渲染的内容;

v-slot如何使用呢?

- 首先，我们需要使用**custom**表示我们**整个元素要自定义** 
- 如果不写，那么自定义的内容会被包裹在一个 a 元素中;
- ![image-20220629191038847](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291910898.png)



**使用v-slot来作用域插槽来获取内部传给我们的值:**

- href:解析后的 URL;
- route:解析后的规范化的route对象;
- navigate:**触发导航的函数;**
- isActive:是否匹配的状态;
- isExactActive:是否是精准匹配的状态;

```html
    <router-link to="/home" v-slot="props" custom>
      <button @click="props.navigate">home</button>
      <p>{{props.href}}</p>
      <p>{{props.route}}</p>
      <p>{{props.navigate}}</p>
      <p>{{props.isActive}}</p>
      <p>{{props.isExactActive}}</p>
    </router-link>
```

![image-20220629191439350](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291914388.png)

## router-view的v-slot

router-view也提供给我们一个插槽，可以用于 `<transition>` 和 `<keep-alive>` 组件来包裹你的路由组件: 

- Component:要渲染的组件;
- route:解析出的标准化路由对象;

![image-20220629193451026](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206291934071.png)



# 常用路由方法

## 动态添加路由

某些情况下我们可能需要动态的来添加路由:

- 比如根据用户不同的权限，注册不同的路由
- 这个时候我们可以使用一个方法 addRoute;

如果我们是为route添加一个children路由，那么可以传入对应的name:

![image-20220629200558875](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206292005919.png)

## 动态删除路由

删除路由有以下三种方式:

- 方式一:添加一个name相同的路由;
- 方式二:通过removeRoute方法，传入路由的名称
- 方式三:通过addRoute方法的返回值回调;

![image-20220629201140636](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206292011667.png)

## 路由的其他方法补充

router.hasRoute():检查路由是否存在。

router.getRoutes():获取一个包含所有路由记录的数组。

# 路由导航守卫

vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。

**全局的前置守卫beforeEach是在导航触发时会被回调的:**

**它有两个参数:**

- **to**:即将进入的路由Route对象;
- **from**:即将离开的路由Route对象;

**它有返回值:**

- **false:取消当前导航;**
- **不返回**或者undefined:进行**默认导航;**
- 返回一个**路由地址:**
  - 可以是一个**string类型的路径;**
  - 可以是一个对象，**对象中包含path、query、params等信息;**

```js
//导航守卫
//to:Route对象 即将跳转的Route对象
//from:Route对象,从哪一个路由
router.beforeEach((to,from)=>{
  console.log(to,from);
  return false//
  if(to.path.indexOf('/home')!==-1){
    return '/about'
  }
  return {path:'/about',params:'awspi'}//
})
```

**可选的第三个参数:next**

- 在Vue2中我们是通过next函数来决定如何进行跳转的;
- 但是**在Vue3中我们是通过返回值来控制的，不再推荐使用next函数**，这是因为开发中很容易调用多次next;



## 登录守卫功能

![image-20220630002826687](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300028738.png)

## 其他导航守卫

*https://router.vuejs.org/zh/guide/advanced/navigation-guards.html*

路由独享的守卫

直接在路由配置上定义 `beforeEnter` 守卫：

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

**组件内的守卫**

在路由组件内直接定义路由导航守卫(传递给路由配置的)

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
 }
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：

```
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以*不支持* 传递回调，因为没有必要了

```
beforeRouteUpdate (to, from) {
  // just use `this`
  this.name = to.params.name
}
```



## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。