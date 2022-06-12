# 01_Learn_Vue3

# Vue 简介



## Vue 安装

### CDN引入

> ### **什么是CDN呢?**
>
> CDN称之为内容分发网络(**C**ontent **D**elivery **N**etwork或**C**ontent **D**istribution **N**etwork，缩写:**CDN**)
>
> 它是指通过**相互连接的网络系统**，**利用最靠近每个用户的服务器;**
>
> 更快、更可靠地将音乐、图片、视频、应用程序及其他文件**发送给用户;** 
>
> 来提供**高性能、可扩展性及低成本**的网络内容传递给用户;
>
> **常用的CDN服务器可以大致分为两种:**
>
> 自己的CDN服务器:需要购买自己的CDN服务器
>
> 开源的CDN服务器:国际上使用比较多的是unpkg、 JSDelivr、cdnjs;

**Vue的CDN引入:**

`<script src="https://unpkg.com/vue@next"></script>`



### 下载和引入

下载Vue的源码,通过script标签引入

- 开发环境：https://vuejs.org/js/vue.js
- 生产环境：https://vuejs.org/js/vue.min.js

```html
<script src="../js/vue.js"></script>
```

## Vue 初体验

使用createApp传入了**一个对象**中声明需要的内容，模板template、数据data、方法methods; 

这样的编写代码的过程，我们称之为是**声明式编程;*

接下来我们详细解析一下之前传入的属性分别代表什么含义

### template属性

表示的是Vue需要帮助我们渲染的**模板信息:**

目前我们看到它里面有很多的HTML标签，这些标签会**替换**掉我们挂载到的元素(比如id为app的div)的**innerHTML**;

模板中有一些奇怪的语法，比如 {{}}，比如 @click，这些都是模板特有的语法，我们会在后面讲到;**Mustache**

**写法:**

1. 使用**script标签**，并且**标记它的类型为 x-template**;**设置id**;
2. 使用任意标签(通常使用**template标签**，因为不会被浏览器渲染)，**设置id**;
   - **template**元素是一种用于保存客户端内容的机制，该**内容在加载页面时不会被呈现**，但随后可以在运行时使用JavaScript实例化;

然后**`vue.createApp({template:'#id'})`**在createApp的对象中，我们需要传入的template以 # 开头:

- 如果字符串是以 # 开始，那么它将被用作 querySelector，并且使用匹配元素的 innerHTML 作为**模板字符串**;

```html
<script type="x-template" id="why">
    <div>
      <h2>{{message}}</h2>
      <h2>{{counter}}</h2>
      <button @click='increment'>+1</button>
      <button @click='decrement'>-1</button>
  </div>
</script>
<script>
    document.querySelector("#why")
    Vue.createApp({
      template:'#why' //   相当于document.querySelector("#why")
      //...
    })
</script>
```

```html
  <template id="why">
    <div>
      <h2>{{message}}</h2>
      <h2>{{counter}}</h2>
      <button @click='increment'>+1</button>
      <button @click='decrement'>-1</button>
      <button @click="btnClick">按钮</button>
    </div>
  </template>
  <script>
    document.querySelector("#why")
    Vue.createApp({
      template:'#why' //   相当于document.querySelector("#why")
      //...
    })
</script>
```

### data属性

**data属性**是**传入一个函数**，并且该**函数需要返回一个对象**:

- 在Vue2.x的时候，也可以传入一个对象(虽然官方推荐是一个函数);
- 在Vue3.x的时候，**必须传入一个函数**，否则就会直接在浏览器中报错;

data中返回的对象会**被Vue的响应式系统劫持**，之后对**该对象的修改或者访问**都会在劫持中被处理

### methods属性

**methods属性**是一个**对象**，通常我们会**在对象中定义很多的方法:** (不能使用箭头函数)

这些方法可以**被绑定到 template 模板**中;

在该方法中，我们可以使用**this**关键字来**直接访问到data中返回的对象的属性;**

> Vue的源码当中就是对methods中的所有函数进行了遍历，并且通过bind绑定了this:
>
> ![image-20220612202805318](/Users/wsp/Library/Application Support/typora-user-images/image-20220612202805318.png)
>
> 

### 其他属性

props、computed、watch、emits、setup...

生命周期函数



### 案例-hello world

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="app">
  </div>
	<!-- CDN引入 -->
  <script src="https://unpkg.com/vue@next"></script>
  <script>
    const obj = {
      template: '<h2>Hello World</h2>'
    }

    const app = Vue.createApp(obj);
    app.mount("#app")//mount挂载
  </script>

</body>
</html>
```



### 案例-计数器

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="app">哈哈哈哈啊</div>

  <script src="../js/vue.js"></script>
  <script>
    Vue.createApp({//模版字符串
      template: `
        <div>
          <h2>{{message}}</h2>
          <h2>{{counter}}</h2>
          <button @click='increment'>+1</button>
          <button @click='decrement'>-1</button>
        </div>
      `,
      data: function() {
        return {
          message: "Hello World",
          counter: 100
        }
      },
      // 定义各种各样的方法
      methods: {
        increment() {
          console.log("点击了+1");
          this.counter++;
        },
        decrement() {
          console.log("点击了-1");
          this.counter--;
        }
      }
    }).mount('#app');
  </script>
</body>
</html>
```



## Vue 中的 MVVM

[MVVM框架理解及其原理实现](https://segmentfault.com/a/1190000015895017)

![image-20220612182619560](/Users/wsp/Library/Application Support/typora-user-images/image-20220612182619560.png)

- **View 层**：视图层，在前端开发中，通常就是 DOM 层，主要的作用是给用户展示各种信息
- **Model 层**：数据层，数据可能是我们固定的死数据，更多的是来自我们服务器，从网络上请求下来的数据
- **VueModel 层**：视图模型层，视图模型层是 View 和 Model 沟通的桥梁，
  - 一方面实现了 **Data Binding**（数据绑定），将 Model 的改变实时的反应到 View 中，
  - 另一方面它实现了 **DOM Listener**（DOM监听），当 DOM 发生一些事件（点击、滚动、touch 等）时，可以监听到，并在需要的情况下改变对应的 Data

### MVC 和 MVVM 的区别

[MVC 和 MVVM 的区别](https://www.jianshu.com/p/b0aab1ffad93)

**MVC**

![image-20220612183206712](/Users/wsp/Library/Application Support/typora-user-images/image-20220612183206712.png)

**MVVM**

![](/Users/wsp/Library/Application Support/typora-user-images/image-20220612183225237.png)



### Vue 的生命周期

![1](/Users/wsp/Downloads/1.png)

![2](/Users/wsp/Downloads/2.png)

# Vue 基础语法

## 模板语法

插值：将值插入到模板的内容中

 **React的开发模式:
**React使用的jsx，所以对应的代码都是编写的类似于js的一种语法; 

之后通过Babel将jsx编译成 React.createElement 函数调用;

**Vue也支持jsx的开发模式**

但是大多数情况下，使用**基于HTML的模板语法;**

- 在模板中，允许开发者**以声明式**的方式将**DOM**和**底层组件实例的数据** **绑定在一起;**
- **在底层的实现中，Vue将模板编译成虚拟DOM渲染函数**

### Mustache

 **“Mustache”语法 (双大括号)** 的文本插值把数据显示到模板(template)中

- **data返回的对象被添加到Vue的响应式系统中;**
- 当data中的**数据发生改变**时，**对应的内容也会发生更新。**
- Mustache中不仅仅可以是**data中的属性**，也可以是一个**JS的表达式。** **不可以写赋值语句**

```html
	<div id="app"></div>

  <template id="my-app">
    <!-- 1.mustache的基本使用 -->
    <h2>{{message}} - {{message}}</h2>

    <!-- 2.是一个表达式 -->
    <h2>{{counter * 10}}</h2>
    <h2>{{ message.split(" ").reverse().join(" ") }}</h2>

    <!-- 3.也可以调用函数 -->
    <!-- 可以使用computed(计算属性) -->
    <h2>{{getReverseMessage()}}</h2>

    <!-- 4.三元运算符 -->
    <h2>{{ isShow ? "哈哈哈": "" }}</h2>
    <button @click="toggle">切换</button>

    <!-- 错误用法 -->
    <!-- var name = "abc" -> 赋值语句 -->
    <!-- <h2>{{var name = "abc"}}</h2>
    <h2>{{ if(isShow) {  return "哈哈哈" } }}</h2> -->
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World",
          counter: 100,
          isShow: true
        }
      },
      methods: {
        getReverseMessage() {
          return this.message.split(" ").reverse().join(" ");
        },
        toggle() {
          this.isShow = !this.isShow;
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```



### v-once

v-once用于**指定元素或者组件只渲染一次:**

- 当数据发生变化时，**元素或者组件**以及其**所有的子元素**将视为**静态内容并且跳过;**
- 该指令可以用于**性能优化;**

```html
  <div id="app"></div>
  <template id="my-app">
    <h2>{{counter}}</h2>
    <div v-once>
      <h2>{{counter}}</h2>
      <h2>{{message}}</h2>
    </div>
    <button @click="increment">+1</button>
  </template>
  
  <script src="../js/vue.js"></script>
  
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          counter: 100,
          message: "abc"
        }
      },
      methods: {
        increment() {
          this.counter++;
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```



### v-text

v-text用于**更新元素的textConten**t **不常用 一般使用Mustache**

```html
  	<div id="app"></div>

  <template id="my-app">
    <h2 v-text="message"></h2>
    <h2>{{message}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```

### v-html

默认情况下，如果我们展示的**内容本身是 html** 的，那么**vue并不会对其进行特殊的解析。**

如果我们希望这个内容**被Vue可以解析出来**，那么可以使用 v-html 来展示;

```html
  <div id="app"></div>

  <template id="my-app">
    <div>{{msg}}</div><!--只是显示文本-->
    <div v-html="msg"></div><!--把html解析出来-->
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          msg: '<span style="color:red; background: blue;">哈哈哈</span>' //内容本身是 html
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

<img src="/Users/wsp/Library/Application Support/typora-user-images/image-20220612211234377.png" alt="image-20220612211234377" style="zoom:67%;" />



###  v-pre

v-pre用于跳过元素和它的子元素的编译过程，**显示原始的Mustache标签:**

- 跳过不需要编译的节点，加快编译的速度;

```html
  <div id="app"></div>

  <template id="my-app">
    <h2 v-pre>{{message}}</h2> <!--显示{{message}}-->
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

### v-cloak

**cloak遮盖物** 这个指令保持**在元素上直到关联组件实例结束编译。**

和 CSS 规则如 **`[v-cloak] { display: none }`** 一起用时，这个指令可以**隐藏未编译的 Mustache 标签直到组件实例准备完毕。**防止没渲染完显示原始界面



## 绑定属性v-bind