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



