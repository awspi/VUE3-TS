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



## 绑定属性 v-bind

模版语法的一系列指令，主要是将值插入到**模板内容**中。

但是，除了内容需要动态来决定外，某些**属性**我们也希望**动态绑定**。

- 比如动态绑定a元素的href属性;
- 比如动态绑定img元素的src属性;

**可以使用 `v-bind` 指令来动态绑定属性，`v-bind` 用于绑定一个或多个属性值，或者向另一个组件传递 props值** 

### v-bind 基本使用

**缩写**:即省略 v-bind，直接写 **`:`**

**用法**:动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。

```html
<template id="my-app">
  <!-- 1.v-bind的基本使用 -->
  <img v-bind:src="imgUrl" alt="">
  <a v-bind:href="link">百度一下</a>

  <!-- 2.v-bind提供一个语法糖 : -->
  <img :src="imgUrl" alt="">
</template>
```

### v-bind:class 

**简写`:class`**

**`v-bind:class`**绑定class

 在开发中，有时候我们的元素class也是动态的，比如:

- 当数据为某个状态时，字体显示红色。
- 当数据另一个状态时，字体显示黑色。

**绑定class有两种方式:** 

- 对象语法
- 数组语法

#### 对象语法

我们可以传给 **`:class`** (v-bind:class语法糖) 一个对象，以动态地切换 class。

![image-20220612222001423](/Users/wsp/Library/Application Support/typora-user-images/image-20220612222001423.png)

```html
    <style>
      .active {
        color: red;
      }
      .title {
        font-style:italic;
      }
    </style>
  <div id="app"></div>

    <template id="my-app">
      <!-- 对象语法: {className}  --> 
      <div :class="className">哈哈哈哈</div>
      <!-- 对象语法: {'active': boolean}  --> 
      <!-- key为class名 value可以用boolen值来控制是否绑定该class -->
      <!-- class名可以不加引号 [不会]去取到data中重名的key的value -->
      <div :class="{active: true}">呵呵呵呵</div>
      <button @click="toggle">切换</button>

      <!-- 也可以有多个键值对 -->
      <div :class="{active: isActive, title: true}"> 
        {{'isActive: '+isActive}}</div>

      <!-- 默认的class和动态的class结合 -->
      <div class="abc cba" :class="{active: isActive, title: true}">
      {{'isActive: '+isActive}}
      </div>

      <!-- 将对象放到一个单独的属性中 -->
      <div class="abc cba" :class="classObj">
        {{classObj}}
      </div>

      <!-- 将返回的对象放到一个methods(computed)方法中 -->
      <div class="abc cba" :class="getClassObj()">呵呵呵呵</div>      
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            className: "why",
            isActive: true,
            title: "abc",
            classObj: { 
              active: true, 
              title: true 
            },
          };
        },
        methods: {
          toggle() {
            this.isActive = !this.isActive;
          },
          getClassObj() { // 返回一个对象
            return { 
              active: true, 
              title: true 
            }
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
```



#### 数组语法

我们可以把一个数组传给 **`:class`**，以应用一个 class 列表;

```html
  <template id="my-app">
    <!-- 数组语法 className要加引号,否则会取到data中重名的key的value -->
    <div :class="['abc', title]">哈哈哈哈</div>
    <!-- 数组语法支持三元运算符 -->
    <div :class="['abc', title, isActive ? 'active': '']">哈哈哈哈</div>
    <!-- 数组语法允许绑定对象语法{} -->
    <div :class="['abc', title, {active: isActive}]">哈哈哈哈</div>
  </template>
    <script src="../js/vue.js"></script>


  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World",
          title: "cba",
          isActive: true
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



### v-bind:style

使用 **`v-bind:style`** 来绑定一些 CSS 内联样式

**简写** **`:style`**

CSS property 名可以用**驼峰式 (camelCase)** 或**短横线分隔 (kebab-case)加引号** 来命名;

#### 对象语法

```html
 <div id="app"></div>

  <template id="my-app">
    <!-- :style="{cssPropertyName: cssPropertyValue}" -->
    <div :style="{color: finalColor, 'font-size': '30px'}">哈哈哈哈</div>
    <div :style="{color: finalColor, fontSize: '30px'}">哈哈哈哈</div>
    <div :style="{color: finalColor, fontSize: finalFontSize + 'px'}">哈哈哈哈</div>

    <!-- 绑定一个data中的属性值, 并且是一个对象 -->
    <div :style="finalStyleObj">呵呵呵呵</div>
    <!-- 调用一个返回对象的方法 -->
    <div :style="getFinalStyleObj()">呵呵呵呵</div>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World",
          finalColor: 'red',
          finalFontSize: 50,
          finalStyleObj: {
            'font-size': '50px',
            fontWeight: 700,
            backgroundColor: 'red'
          }
        }
      },
      methods: {
        getFinalStyleObj() {
          return {
            'font-size': '50px',
            fontWeight: 700,
            backgroundColor: 'red'
          }
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

#### 数组语法

:style 的数组语法可以**将多个样式对象应用到同一个元素上**;

```html
  
  <div id="app"></div>

  <template id="my-app">
    <!-- 将多个样式对象应用到同一个元素上 -->
    <div :style="[style1Obj, style2Obj]">哈哈哈</div>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World",
          style1Obj: {
            color: 'red',
            fontSize: '30px'
          },
          style2Obj: {
            textDecoration: "underline"
          }
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



### :[属性名]="值" 动态绑定属性

在某些情况下，我们**属性的名称可能也不是固定**的:

我们无论绑定src、href、class、style，属性名称都是固定的; 

**如果属性名称不是固定的，我们可以使用 动态绑定属性** 

**`:[属性名]=“值”` 的格式来定义;**

```html
     <style>
    .val{
      color: red;
    }
  </style>
   <style>
    .val{
      color: red;
    }
  </style>
 <div id="app"></div>

  <template id="my-app">
    <div :[name]="value">哈哈哈</div>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          name: "class",
          value: "val"
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```

 **也可以用来绑定class src href等**

![image-20220612230129711](/Users/wsp/Library/Application Support/typora-user-images/image-20220612230129711.png)





### **绑定一个对象**

 如果我们希望**将一个对象的所有属性，绑定到元素上的所有属性**，可以直接使用 **v-bind 绑定一个 对象;**

![image-20220612231325820](/Users/wsp/Library/Application Support/typora-user-images/image-20220612231325820.png)

```html
  <div id="app"></div>

  <template id="my-app">
    <div v-bind="info">哈哈哈哈</div>
    <div :="info">哈哈哈哈</div>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          info: {
            name: "why",
            age: 18,
            height: 1.88
          }
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

## 绑定事件 v-on

在前端开发中，我们需要经常和用户进行交互，这个时候，就必须监听用户发生的事件，比如点击、拖拽、键盘事件等，

在 Vue 中监听事件使用 **`v-on`** 指令

### v-on基本使用

```html
  <template id="my-app">
    <!-- 完整写法: v-on:监听的事件="methods中方法" -->
    <button v-on:click="btn1Click">按钮1</button>
    <div class="area" v-on:mousemove="mouseMove">div</div>
    <!-- 语法糖 -->
    <button @click="btn1Click">按钮1</button>
    <!-- 绑定一个表达式: inline statement -->
    <button @click="counter++">{{counter}}</button>
    <!-- 绑定一个对象 -->
    <div class="area" v-on="{click: btn1Click, mousemove: mouseMove}"></div>
    <div class="area" @="{click: btn1Click, mousemove: mouseMove}"></div>
  </template>
```

### v-on参数传递

当**通过methods中定义方法**，以供**@click**调用时，需要注意参数问题:

1. **如果该方法不需要额外参数，那么方法后的`()`可以不添加。**
   - 如果**方法本身中有一个参数**，那么会默认将原生事件**`event参数`**传递进去
2. 如果需要**同时传入某个参数，同时需要event时**，可以通过**`$event`**传入事件。

```html
  <template id="my-app">
    <!-- 默认传入event对象, 可以在方法中获取 -->
    <button @click="btn1Click">按钮1</button>
    <!-- $event可以获取到事件发生时的事件对象 -->
    <button @click="btn2Click($event, 'coderwhy', 18)">按钮2</button>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World"
        }
      },
      methods: {
        btn1Click(event) {
          console.log(event);
        },
        btn2Click(event, name, age) {
          console.log(name, age, event);
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```



### v-on的修饰符

v-on支持**修饰符**，修饰符相当于对事件进行了一些特殊的处理:

**`.stop`** - 调用 event.stopPropagation() 停止冒泡

**`.prevent`** - 调用 event.preventDefault()。阻止默认行为

**`.capture`** - 添加事件侦听器时使用 capture 模式。

**`.self`** - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

**`.{keyAlias}`** - (@click.enter="")仅当事件是从特定键触发时才触发回调。

**`.once`** - 只触发一次回调。

**`.left`** - 只当点击鼠标左键时触发。**`.right`** - 只当点击鼠标右键时触发。**`.middle`** - 只当点击鼠标中键时触发。

**`.passive`** - { passive: true } 模式添加侦听器



## 条件渲染

在某些情况下，我们需要根据当前的条件决定某些元素或组件是否渲染，这个时候我们就需要进行条件判断了。

### v-if、v-else、v-else-if

v-if、v-else、v-else-if用于根据条件来渲染某一块的内容**,这些内容只有在条件为true时，才会被渲染出来;**

v-if的渲染原理:

- v-if是惰性的;
- 当条件为false时，其判断的内容**完全不会被渲染**或者会**被销毁掉;**
- 当条件为true时，才会真正渲染条件块中的内容;

```html
  <template id="my-app">
    <h2 v-if="isShow">哈哈哈哈</h2>
    <button @click="toggle">切换</button>
  </template>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          message: "Hello World",
          isShow: true
        }
      },
      methods: {
        toggle() {
          this.isShow = !this.isShow;
        }
      }
    }

    Vue.createApp(App).mount('#app');

  </script>
```

```html
  <template id="my-app">
    <input type="text" v-model="score">
    <h2 v-if="score > 90">优秀</h2>
    <h2 v-else-if="score > 60">良好</h2>
    <h2 v-else>不及格</h2>
  </template>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          score: 95
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```

#### 结合template元素

 template元素可以当做不可见的包裹元素，并且在v-if上使用，但是最终template不会被渲染出来:

```html
  <template id="my-app">
    <template v-if="isShowHa">
      <h2>哈哈哈哈</h2>
      <h2>哈哈哈哈</h2>
      <h2>哈哈哈哈</h2>
    </template>

    <template v-else>
      <h2>呵呵呵呵</h2>
      <h2>呵呵呵呵</h2>
      <h2>呵呵呵呵</h2>
    </template>
  </template>
```



### v-show

v-show和v-if的用法看起来是一致的，也是根据一个条件决定是否显示元素或者组件:

```html
  <template id="my-app">
    <h2 v-show="isShow">哈哈哈哈</h2>
  </template>
```

#### **v-show和v-if的区别**

用法上的区别:

- v-show是**不支持template;**
- v-show**不可以和v-else一起使用;**

本质的区别:

- **v-show**元素无论是true false，它的**DOM实际都是有渲染**的，只是**通过CSS的display属性**来进行切换;
- **v-if**当条件为false时，其对应的元素压根**不会被渲染到DOM中;**

如果我们的元素需要**在显示和隐藏之间频繁的切换，那么使用v-show;** **如果不会频繁的发生切换，那么使用v-if;**



## 列表渲染v-for

真实开发中，我们往往会从服务器拿到一组数据，并且需要对其进行渲染。可以使用**v-for**来完成;

### v-for基本使用

v-for的基本格式是 **"item in 数组**": 数组通常是**来自data或者prop**，也可以是其他方式;

*item of 数组 也可以*

如果需要索引，可以使用格式: "(item, index) in 数组";

```html
    <ul>
      <!-- 遍历数组 -->
      <li v-for="(movie, index) in movies">{{index+1}}.{{movie}}</li>
    </ul>
```



### v-for支持的类型

**v-for支持遍历对象**

- 一个参数: **`value in object;`**
- 二个参数:**`(value, key) in object;`**
- 三个参数: **`(value, key, index) in object`**

```html
      <!-- 遍历对象 -->
      <li v-for="(value, key, index) in info">{{key}}-{{value}}-{{index}}</li>
```

**支持数字的遍历: 每一个item都是一个数字;**

```html
    <ul>
      <li v-for="(num, index) in 10">{{num}}-{{index}}</li>
    </ul>
```



#### 结合template元素

使用 template 元素不是使用div来循环渲染一段包含多个元素的内容

```html
    <ul>
      <template v-for="(value, key) in info">
        <li>{{key}}</li>
        <li>{{value}}</li>
        <li class="divider">------</li>
      </template>
    </ul>
```



### 数组更新检测

Vue 将**被侦听的数组的变更方法进行了包裹**，所以它们也将会触发视图更新。

- **`push() pop() shift()  unshift()`**
- **`splice()  sort()  reverse()`**

 **替换数组的方法**

某些方法不会替换原来的数组，而是会生成新的数组，比如 **filter()、 concat() 和 slice()。**需要把新的数组赋值到原数组才能触发视图更新。

### v-for中的key

 在使用v-for进行列表渲染时，我们通常会给元素或者组件绑定一个**key属性**。 一般**不使用index**

```html
      <li v-for="item in letters" :key="item">{{item}}</li>
```

这个key属性有什么作用呢**官方的解释:**

- key属性主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes;
- 如果**不使用key**，Vue会使用一种**最大限度减少动态元素**并且**尽可能的尝试就地修改/复用相同类型元素**的算法; 
- 而**使用key时**，它会基于key的变化**重新排列元素顺序**，并且**会移除/销毁key不存在的元素;**

#### VNode

Virtual Node,无论是组件还是元素，它们最终在Vue中表示出来的都是一个个VNode,本质是一个**JavaScript的对象;**

![image-20220613231658048](/Users/wsp/Library/Application Support/typora-user-images/image-20220613231658048.png)



#### 虚拟DOM

如果我们不只是一个简单的div，而是有一大堆的元素，那么它们应该会形成一个VNode Tree:

![image-20220613231832244](/Users/wsp/Library/Application Support/typora-user-images/image-20220613231832244.png)



#### 插入F的案例

点击按钮时会在中间插入一个f

```html
  <template id="my-app">
    <ul>
      <li v-for="item in letters" :key="item">{{item}}</li>
    </ul>
    <button @click="insertF">插入F元素</button>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          letters: ['a', 'b', 'c', 'd']
        }
      },
      methods: {
        insertF() {
          this.letters.splice(2, 0, 'f')
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

我们可以确定的是，这次更新对于ul和button是不需要进行更新，需要更新的是我们li的列表:

-  在Vue中，对于相同父元素的子元素节点并不会重新渲染整个列表;
-  因为对于列表中 a、b、c、d它们都是没有变化的;
- 在操作真实DOM的时候，我们只需要在中间插入一个f的li即可;

-  那么Vue中对于列表的更新究竟是如何操作的呢?

- Vue事实上会对于有key和没有key会调用两个不同的方法; 

  - 有key，使用 **patchKeyedChildren**方法;

  - 没有key，使用 **patchUnkeyedChildren**方法;



#### Diff算法

##### patchKeyedChildren

![image-20220613234408415](/Users/wsp/Library/Application Support/typora-user-images/image-20220613234408415.png)

*patch 打补丁 如果有n1则 进行更新操作 如果n1为null 进行mount挂载操作* 

> - mount 挂载 div->真实dom
> - unmount 卸载真实dom

此时diff算法效率并不高:

c和d来说它们事实上并不需要有任何的改动;

但是因为我们的c被f所使用了，所有后续所有的内容都要一次进行改动，并且最后进行新增;

![image-20220613234215826](/Users/wsp/Library/Application Support/typora-user-images/image-20220613234215826.png)



##### patchUnkeyedChildren

![image-20220613234701502](/Users/wsp/Library/Application Support/typora-user-images/image-20220613234701502.png)

**第一步的操作是从头开始进行遍历、比较:**

- a和b是一致的会继续进行比较;
- c和f因为key不一致，所以就会break跳出循环;

![image-20220613235353385](/Users/wsp/Library/Application Support/typora-user-images/image-20220613235353385.png)

**第二步的操作是从尾部开始进行遍历、比较:**

![image-20220613235411452](/Users/wsp/Library/Application Support/typora-user-images/image-20220613235411452.png)

 **第三步是如果旧节点遍历完毕，但是依然有新的节点，那么就新增节点:**

![image-20220613235855319](/Users/wsp/Library/Application Support/typora-user-images/image-20220613235855319.png)

 **第四步是如果新的节点遍历完毕，但是依然有旧的节点，那么就移除旧节点:**

![image-20220614000032788](/Users/wsp/Library/Application Support/typora-user-images/image-20220614000032788.png)

**第五步是最特色的情况，中间还有很多未知的或者乱序的节点:**

![image-20220614000217761](/Users/wsp/Library/Application Support/typora-user-images/image-20220614000217761.png)

所以我们可以发现，Vue在进行diff算法的时候，会尽量利用我们的**key**来进行优化操作: 

- 在没有key的时候我们的效率是非常低效的;
- 在进行插入或者重置顺序的时候，保持相同的key可以让diff算法更加的高效;



## 计算属性 computed

```markdown
模板中可以直接通过**插值语法**显示一些**data中的数据**。
但是在某些情况，我们可能需要对**数据进行一些转化后**再显示，或者需要**将多个数据结合起来**进行显示;
比如我们需要对多个data数据进行运算、三元运算符来决定结果、数据进行某种转化后显示;
	在模板中使用表达式，可以非常方便的实现，但是设计它们的初衷是用于简单的运算;
		在模板中放入太多的逻辑会让模板过重和难以维护;
		并且如果多个地方都使用到，那么会有大量重复的代码;
我们有没有什么方法可以将逻辑抽离出去呢?
	其中一种方式就是将逻辑抽取到一个method中，放到methods的options中 但是，这种做法有一个直观的弊端，就是所有的data使用过程都会变成了一个方法的调用
	另外一种方式就是使用**计算属性computed;**
```

对于任何包含响应式数据的复杂逻辑，你都应该使用**计算属性**;

- 计算属性将被混入到组件实例中。
- 所有 getter 和 setter 的 this 上下文自动地绑定为组件实例;

计算属性的用法:

**选项:`computed`**

**类型**:**`{ [key: string]: Function | { get: Function, set: Function } }`** **函数或者是包含get set方法的对象**

*不能和data里的属性重名*

### 计算属性的缓存

计算属性和methods的实现看起来是差别是不大的，但是计算属性**有缓存的。**

**计算属性会基于它们的依赖关系进行缓存;**

- 在数据不发生变化时，计算属性是不需要重新计算的;
- 是如果依赖的数据发生变化，在使用时，计算属性依然会重新进行计算;

![image-20220614010532046](/Users/wsp/Library/Application Support/typora-user-images/image-20220614010532046.png)

### setter和getter

计算属性在大多数情况下，只需要一个**`getter`方法**即可，将计算属性直接**写成一个函数**。

**设置计算属性的值**以给计算属性设置一个**`setter`**的方法;

```js
    const App = {
      template: '#my-app',
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant"
        }
      },
      computed: {
        fullName: {	// fullName的getter和setter方法
          get: function() {//监听到firstName lastName被修改后调用
            return this.firstName + " " + this.lastName;
          },
          set: function(newValue) {//监听到computed的fullName被修改后 调用
            console.log(newValue);
            const names = newValue.split(" ");
            this.firstName = names[0];//修改data的firstName
            this.lastName = names[1];
          }
        }
      },
      methods: {
        changeFullName() {
          this.fullName = "Coder Why"; //修改computed的fullName 
        }
      }
    }
```



#### Vue如何对setter和getter处理

![image-20220614012303272](/Users/wsp/Library/Application Support/typora-user-images/image-20220614012303272.png)

### 案例的实现

1. 案例一:我们有两个变量:firstName和lastName，希望它们拼接之后在界面上显示;
2. 案例二:我们有一个分数:score当score大于60的时候，在界面上显示及格;  当score小于60的时候，在界面上显示不及格;
3. 案例三:我们有一个变量message，记录一段文字:比如Hello World 对这段文字进行反转;

#### 模板语法

```html
 <template id="my-app">
    <h2>{{firstName + " " + lastName}}</h2>
    <h2>{{score >= 60 ? '及格': '不及格'}}</h2>
    <h2>{{message.split(" ").reverse().join(" ")}}</h2>
  </template>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          firstName: "w",
          lastName: "pithy",
          score: 80,
          message: "Hello World"
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```

#### method实现

```html
  <template id="my-app">
    <h2>{{getFullName()}}</h2>
    <h2>{{getResult()}}</h2>
    <h2>{{getReverseMessage()}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant",
          score: 80,
          message: "Hello World"
        }
      },
      methods: {
        getFullName() {
          return this.firstName + " " + this.lastName;
        },
        getResult() {
          return this.score >= 60 ? "及格": "不及格";
        },
        getReverseMessage() {
          return this.message.split(" ").reverse().join(" ");
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```

#### computed实现

计算属性看起来像是一个函数，但是我们**在使用的时候不需要加()**

并且计算属性是有缓存的;

```html
  <template id="my-app">
    <h2>{{fullname}}</h2>
    <h2>{{result}}</h2>
    <h2>{{reverse}}</h2>
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          firstName: "Kobe",
          lastName: "Bryant",
          score: 80,
          message: "Hello World"
        }
      },
      computed: {
        fullname(){//es6 相当于fullname:function fullname(){}
          return this.firstName+this.lastName
        },
        result:function(){
          return this.score>60?'pass':'G'
        },
        reverse(){
          return this.message.split(' ').reverse().join(' ')
        }
      }
    }
    Vue.createApp(App).mount('#app');
  </script>
```



### 综合案例-购物车

style.css

```css
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}

th, td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}

.counter {
  margin: 0 5px;
}

```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  
  <div id="app"></div>

  <template id="my-app">
    <template v-if="books.length > 0">
      <table>
        <thead>
          <th>序号</th>
          <th>书籍名称</th>
          <th>出版日期</th>
          <th>价格</th>
          <th>购买数量</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books">
            <td>{{index + 1}}</td>
            <td>{{book.name}}</td>
            <td>{{book.date}}</td>
            <td>{{formatPrice(book.price)}}</td>
            <td>
              <button :disabled="book.count <= 1" @click="decrement(index)">-</button>
              <span class="counter">{{book.count}}</span>
              <button @click="increment(index)">+</button>
            </td>
            <td>
              <button @click="removeBook(index)">移除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>总价格: {{formatPrice(totalPrice)}}</h2>
    </template>
    <template v-else>
      <h2>购物车为空~</h2>
    </template>
  </template>

  <script src="../js/vue.js"></script>
  <script src="./index.js"></script>

</body>
</html>
```

index,js

```js
Vue.createApp({
  template: "#my-app",
  data() {
    return {
      books: [
        {
          id: 1,
          name: '《算法导论》',
          date: '2006-9',
          price: 85.00,
          count: 1
        },
        {
          id: 2,
          name: '《UNIX编程艺术》',
          date: '2006-2',
          price: 59.00,
          count: 1
        },
        {
          id: 3,
          name: '《编程珠玑》',
          date: '2008-10',
          price: 39.00,
          count: 1
        },
        {
          id: 4,
          name: '《代码大全》',
          date: '2006-3',
          price: 128.00,
          count: 1
        },
      ]
    }
  },
  computed: {
    // vue2: filter/map/reduce
    totalPrice() {
      let finalPrice = 0;
      for (let book of this.books) {
        finalPrice += book.count * book.price;
      }
      return finalPrice;
    },
    // Vue3不支持过滤器了, 推荐两种做法: 使用计算属性/使用全局的方法
    filterBooks() {
      return this.books.map(item => {
        const newItem = Object.assign({}, item);
        newItem.price = "¥" + item.price;
        return newItem;
      })
    }
  },
  methods: {
    increment(index) {
      // 通过索引值获取到对象
      this.books[index].count++
    },
    decrement(index) {
      this.books[index].count--
    },
    removeBook(index) {
      this.books.splice(index, 1);
    },
    formatPrice(price) {
      return "¥" + price;
    }
  }
}).mount("#app");
```



## 侦听器 watch

开发中我们在data返回的对象中定义了数据，这个数据通过插值语法等方式绑定到template中;

当数据变化时，template会自动进行更新来显示最新的数据;

但是在某些情况下，我们希望**在代码逻辑中监听某个数据的变化，这个时候就需要用侦听器watch来完成了;**

用法:

选项:**`watch`**

类型: **`{ [key: string]: string | Function | Object | Array}`**  function(newVal,oldVal){}

> 如果 监听的是对象, 被重新指向新对象时,无法获取oldVal

**案例**

```html
  <template id="my-app">
    您的问题: <input type="text" v-model="question">
  </template>

  <script src="../js/vue.js"></script>
  <script>
    const App = {
      template: '#my-app',
      data() {
        return {
          // 侦听question的变化时, 去进行一些逻辑的处理(JavaScript, 网络请求)
          question: "Hello World",
          anwser: ""
        }
      },
      watch: {
        // question是侦听的data中的属性的名称
        // newValue变化后的新值
        // oldValue变化前的旧值
        question: function(newValue, oldValue) {
          console.log("新值: ", newValue, "旧值", oldValue);
          this.queryAnswer();//监听到变化调用函数
        }
      },
      methods: {
        queryAnswer() {
          console.log(`你的问题${this.question}的答案是哈哈哈哈哈`);
          this.anwser = "";
        }
      }
    }

    Vue.createApp(App).mount('#app');
  </script>
```

### watch的其他方式

```js
//字符串方法名
b:'someMethod'
//传入数组,会被一一调用
f:[
	'handler',
	hander2(){
	console.log('handler2')
	},
	{
	handler:function handler3(oldVal,newVal){
			console.log('handler3')
	}
	}
]
//Vue2文档中侦听对象的属性
'info.name':handler4(){
  console.log('handler4')
}
```

**$watch 的API:**

在created的生命周期中，使用 **`this.$watch`** 来侦听; 

- 第一个参数是要侦听的源;
- 第二个参数是侦听的回调函数callback;
- 第三个参数是额外的其他选项，比如deep、immediate;

```js
      created() {
        const unwatch = this.$watch("info", function(newInfo, oldInfo) {//可以用箭头函数上下文为created()函数
          console.log(newInfo, oldInfo);
        }, {
          deep: true,
          immediate: true
        })
        // unwatch()
      }
```



### 配置选项

#### deep

watch里面侦听的属性对应的也可以是一个Object 

默认情况下，**watch只是在侦听Object的<u>引用</u>变化**，对于**内部属性的变化是不会做出响应** 这个时候我们可以使用一个选项**`deep`进行更深层的侦听;**

对象里的对象的属性被修改 也可以监听到

#### immediate

希望一开始的就会**立即执行一次**,使用**`immediate`**选项;

- 这个时候无论后面数据是否有变化，侦听的函数都会有限执行一次;



```js
      watch: {
        // 默认情况下我们的侦听器只会针对监听的数据本身的改变(内部发生的改变是不能侦听)
        // info(newInfo, oldInfo) {
        //   console.log("newValue:", newInfo, "oldValue:", oldInfo);
        // }
        // 深度侦听/立即执行(一定会执行一次)
        info: {
          handler: function(newInfo, oldInfo) {
              console.log("newValue:", newInfo, "oldValue:", oldInfo);
          },
          deep: true, // 深度侦听
         	immediate: true // 立即执行
        }
      }
```



## 表单绑定 v-model

