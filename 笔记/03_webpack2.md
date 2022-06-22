**Webpack的另一个核心是Plugin**

# Plugin

Loader是用于特定的模块类型进行转换;

Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等;

![image-20220621202631007](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222129982.png)

## CleanWebpackPlugin

手动删除dist文件夹可以使用**CleanWebpackPlugin**;来帮助我们完成

**安装**

```bash
 npm install clean-webpack-plugin -D
```

在配置文件中导入

```js
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
module.exports={
  plugins:[
    new CleanWebpackPlugin()
  ]
}
```



## HtmlWebpackPlugin

进行项目部署时，dist文件夹中必然也是需要有对应的入口文件index.html;所以我们也需要对index.html进行打包处理;

对HTML进行打包处理HtmlWebpackPlugin

**安装**

```bash
 npm install html-webpack-plugin -D
```

### 配置

```js
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
  plugins:[
    new HtmlWebpackPlugin({
      title:'webpack案例'
    })
  ]
```

在自动在dist文件夹中，生成了一个index.html的文件:该文件中也自动添加了我们打包的bundle.js文件;

这个文件默认情况下是根据**ejs**的一个模板来生成的;

**在配置HtmlWebpackPlugin时，我们可以添加如下配置:**

- **template:**指定我们要使用的模块所在的路径;
- **title:**在进行htmlWebpackPlugin.options.title读取时，就会读到该信息;

```js
    new HtmlWebpackPlugin({
      title:'webpack案例',
      template:'./public/index.html'
    }),
```



### 自定义HTML模板

- **如果我们想在自己的模块中加入一些比较特别的内容:
  **比如添加一个noscript标签，在用户的JavaScript被关闭时，给予响应的提示; 
- 比如在开发vue或者react项目时，我们需要一个可以挂载后续组件的根标签 `<div id="app"></div>`;

需要一个属于自己的index.html模块:

![image-20220621205015823](/Users/wsp/Library/Application Support/typora-user-images/image-20220621205015823.png)

上面的代码中，会有一些类似这样的语法`<% 变量 %>`，这个是**EJS**模块填充数据的方式。

使用**DefinePlugin**进行填充

## DefinePlugin

DefinePlugin允许在编译时创建配置的全局常量，是一个webpack内置的插件(不需要单独安装):

```js
const{DefinePlugin}=require('webpack')

   new DefinePlugin({
    BASE_URL:"'./'"
   })
```



## CopyWebpackPlugin

在vue的打包过程中，如果我们将一些文件放到public的目录下，那么这个目录会被复制到dist文件夹中。 

这个复制的功能，我们可以使用**CopyWebpackPlugin**来完成;

**安装**

```bash
npm install :f -D
```

接下来配置CopyWebpackPlugin即可:

复制的规则在patterns中设置;

- **from**:设置从哪一个源中开始复制;
- **to**:复制到的位置，可以省略，会默认复制到打包的目录下;
- **globOptions**:设置一些额外的选项，其中可以编写需要忽略的文件:
  - .DS_Store:mac目录下回自动生成的一个文件;
  - index.html:也不需要复制，因为我们已经通过HtmlWebpackPlugin完成了index.html的生成;

```js
   new CopyWebpakPlugin({
    patterns:[
      {
        from:'public',
        to:'./',
        globOptions:{
          ignore:[
            "**/.DS_Store",
            "**/index.html"
          ]
        }
      }
    ]
   })
```



## Mode配置

Mode配置选项，可以告知webpack使用响应模式的内置优化: 

默认值是production(什么都不设置的情况下); 

可选值有:'none' | '**development**' | '**production**';

![image-20220621210829636](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222129458.png)



```js
module.exports = {  
	mode:"development",
  devtool:"source-map",
	}
```

![image-20220621211446360](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222129211.png)



# babel

Babel是一个工具链，主要用于旧浏览器或者环境中将ECMAScript 2015+代码转换为向后兼容版本的js:语法转换、源代码转换等;

babel本身可以作为**一个独立的工具**(和postcss一样)，不和webpack等构建工具配置来单独使用。

**安装**

- @babel/core :babel的核心代码，必须安装;
- @babel/cli :可以让我们在命令行使用babel;

```
 npm install @babel/cli @babel/core -D
```

使用babel来处理我们的源代码:

- src:是源文件的目录;
- --out-dir:指定要输出的文件夹dist;

```bash
npx babel src --out-dir dist
```

## 插件的使用

 比如我们需要转换箭头函数，那么我们就可以使用**箭头函数转换相关的插件**:

```bash
npm install @babel/plugin-transform-arrow-functions -D
```

```bash
npx babel src --out-dir dist --plugins=@babel/plugin-transform-arrow-functions
```

## Babel的预设preset

如果要转换的内容过多，一个个设置是比较麻烦的，我们可以使用预设(preset):

 **安装@babel/preset-env预设**

```bash
npm install @babel/preset-env -D
```

**执行如下命令:**

```bash
npx babel src --out-dir dist --presets=@babel/preset-env
```



## Babel的原理

可以将babel看成就是一个编译器。

> https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/test.js

Babel编译器的作用就是将我们的源代码，转换成浏览器可以直接识别的另外一段源代码;

Babel的执行阶段

![image-20220622011729871](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222129441.png)

![image-20220622011718094](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222129177.png)

## babel-loader

 在实际开发中，我们通常会在构建工具中通过配置babel来对其进行使用的，比如在webpack中。

**安装相关的依赖:**

```bash
npm install babel-loader @babel/core
```

**设置规则**

```js
      {
        test:/\.js$/,
        use:[
          'babel-loader'
        ]
      }
```

### 指定使用的插件

```js
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            plugins:[
              '@babel/plugin-transform-arrow-functions'
            ]
          }
        }
      }
```

### babel-preset

安装preset-env:

```
npm install @babel/preset-env
```

```js
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env'
            ]
          }
        }Babel的配置文件
      }
```

### Babel的配置文件

可以将babel的配置信息放到一个独立的文件中，babel给我们提供了两种配置文件的编写

- babel.config.js(或者.json，.cjs，.mjs)文件;可以直接作用于Monorepos项目的子包，更加推荐;
- .babelrc.json(或者.babelrc，.js，.cjs，.mjs)文件;早期使用较多的配置方式，但是对于配置Monorepos项目是比较麻烦的;

```js
module.exports={
  presets:['@babel/preset-env']
}
```

# 对vue的处理

**安装和导入**

```bash
npm i vue@next
```

```js
import{createApp} from 'vue'
const app=createApp({
  template:"<h2>vue</h2>",
  data(){
    return {
      title:"hello world"
    }
  }
});
app.mount('#app')
```

## **Vue打包后不同版本解析**

**vue(.runtime).global(.prod).js:**

- 通过浏览器中的 `<script src="...">` 直接使用;
- 我们之前通过CDN引入和下载的Vue版本就是这个版本;
- 会暴露一个全局的Vue来使用;

**vue(.runtime).esm-browser(.prod).js:**

- 用于通过原生 ES 模块导入使用 (在浏览器中通过 `<script type="module">` 来使用)。

**vue(.runtime).esm-bundler.js:**

- **用于 webpack，rollup 和 parcel 等构建工具;**
- 构建工具中默认是vue.runtime.esm-bundler.js; 
- **如果我们需要解析模板template，那么需要手动指定vue.esm-bundler.js;**

**vue.cjs(.prod).js:**

- 服务器端渲染使用;
- 通过require()在Node.js中使用;



**运行时+编译器 vs 仅运行时**

在Vue的开发过程中我们有**三种方式**来编写DOM元素:

- 方式一:template模板的方式(之前经常使用的方式);
- 方式二:render函数的方式，使用h函数来编写渲染的内容;
- 方式三:通过.vue文件中的template来编写模板;

方式二中的h函数可以直接返回一个**虚拟节点**，也就是**Vnode节点**; 

**方式一和方式三**的**template都需要有特定的代码来对其进行解析:**

- 方式三.vue文件中的template可以通过在vue-loader对其进行编译和处理; 
- 方式一种的template我们必须要通过源码中一部分代码来进行编译;

Vue在让我们选择版本的时候分为 **运行时+编译器** vs **仅运行时**

**运行时+编译器**包含了对template模板的编译代码，更加完整，但是也更大一些;

**仅运行时**没有包含对template版本的编译代码，相对更小一些;



## VSCode对SFC文件的支持

插件一:**Vetur**，从Vue2开发就一直在使用的VSCode支持Vue的插件;

插件二:**Volar**，官方推荐的插件(后续会基于Volar开发官方的VSCode插件);



## vue-loader

**安装**

```
npm install vue-loader@next -D
```

**在webpack的模板规则中进行配置:**

```
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }
```

### @vue/compiler-sfc

添加@vue/compiler-sfc来对template进行解析:

```bash
 npm install @vue/compiler-sfc -D
```

**需要配置对应的Vue插件:**

```js
const {VueLoaderPlugin} =require('vue-loader/dist/index')
  plugins: [
    new VueLoaderPlugin()
  ]
```



# devServer

**目前我们开发的代码，为了运行需要有两个操作:**

- npm run build，编译相关的代码;
- 通过live server或者直接通过浏览器，打开index.html代码，查看效果;

这个过程经常操作会影响我们的开发效率，我们希望可以做到，当**文件发生变化**时，可以**自动的完成 编译 和 展示**;

 **为了完成自动编译，webpack提供了几种可选的方式:** 

- webpack watch mode
- webpack-dev-server(常用);
  

## Webpack watch

在该模式下，webpack依赖图中的所有文件，只要有一个发生了更新，那么代码将被重新编译

我们**不需要手动去运行 npm run build**指令了;

**开启watch**

- 在package.json的 scripts 中在启动webpack的命令中添加 --watch的标识;

  ```json
    "scripts": {
      "build": "webpack --watch"
    },
  ```

- 在导出的配置中，添加 watch: true;

- webpack.config.js

  ```js
  module.exports = {
    watch:true,
    }
  ```

## webpack-dev-server

在不使用live-server的情况下，可以具备live reloading(实时重新加载)的功能;\

webpack-dev-server 在编译之后**不会写入到任何输出文件**，而是将 bundle 文件保留在内存中:

- webpack-dev-server使用了一个第三方库叫**memfs**  (memory-fs webpack自己写的)

**安装**

```bash
npm install webpack-dev-server -D
```

**基本使用**

package.json

```json
  "scripts": {
    "build": "webpack",
    "serve":"webpack serve"
  },
```

### 配置文件

webpack.config.js

```js
module.exports = {
  devServer:{}
  }
```

#### static ~~contentBase~~

告知 dev server，从什么位置查找文件:

![image-20220622174810768](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206221749271.png)

```js
module.exports = {
  devServer:{
    // contentBase:"./build", contentBase已经过期
    static:{//如果不设置，非webpack的内容将从public目录提供
      // directory: path.join(__dirname, 'test')
      directory: path.join(__dirname, 'public')
    },

  },
}
```

![devServer的contentBase的理解](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206221755809.png)

## 模块热替换(HMR)

Hot Module Replacement，翻译为模块热替换,指在 应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个页面;

- 不重新加载整个页面，这样可以**保留某些应用程序的状态不丢失;**
- **只更新需要变化的内容**，节省开发的时间;
- 修改了css、js源代码，会立即在浏览器更新**，相当于直接在浏览器的devtools中直接修改样式;**

**修改webpack的配置:**

```js
module.exports = {
  target:'web',
    devServer:{
    hot:true,
  },
}

```

**指定哪些模块发生更新**

src/main.js

```js
if(module.hot){
  module.hot.accept('./js/element.js',()=>{
    console.log('element updated');
  })
}
```

![image-20220622180807032](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206221808086.png)

### 框架的HMR

开发Vue、React项目，我们修改了组件，希望进行热更新，这个时候应该如何去操作呢?

- vue开发中，我们使用vue-loader，此loader支持vue组件的HMR，提供开箱即用的体验;
- 比如react开发中，有React Hot Loader，实时调整react组件(目前React官方已经弃用了，改成使用react- refresh);

### HMR的原理

那么HMR的原理是什么呢?如何可以做到只更新一个模块中的内容呢?

**webpack-dev-server会创建两个服务:**

- **提供静态资源的服务**(express)和**Socket服务**(net.Socket); 
- **express server负责直接提供静态资源的服务**(打包后的资源直接被浏览器请求和解析);

**HMR Socket Server，是一个socket的长连接:**

- 长连接的好处是**建立连接后双方可以通信(服务器可以直接发送文件到客户端);** 
- 当服务器**监听到对应的模块发生变化**时，会生成两个文件 **.json(manifest文件)(描述文件)和.js文件(update chunk)**
- **通过长连接，可以直接将这两个文件主动发送给客户端(浏览器);**
- 浏览器拿到两个新的文件后，**通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新;**

![image-20220622181617141](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206221816200.png)



## 其他配置

### hotOnly、host配置

```js
  module.exports = {
  devServer:{
    host:'0.0.0.0',
    port:8000
  }
 }
```

**host设置主机地址:**

- 默认值是localhost; 
- 如果希望其他地方(手机)也可以访问，可以设置为 **0.0.0.0;**

**localhost 和 0.0.0.0 的区别:**

- localhost:本质上是一个域名，通常情况下会被解析成127.0.0.1;

- 127.0.0.1:回环地址(Loop Back Address)，表达的意思其实是我们**主机自己发出去的包，直接被自己接收;**

  - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ;

  - 而**回环地址，是在网络层直接就被获取到了，是不会经过数据链路层和物理层的**

  - 比如我们监听 127.0.0.1时，在同一个网段下的主机中，通过ip地址是不能访问的;

- 0.0.0.0:监听IPV4上所有的地址，再根据端口找到不同的应用程序;
  - 比如我们监听 0.0.0.0时，在同一个网段下的主机中，通过ip地址是可以访问的;

### port、open、compress

**port**设置监听的端口，默认情况下是8080

**open**是否打开浏览器:

- 默认值是false，设置为true会打开浏览器; 
- 也可以设置为类似于 Google Chrome等值;

**compress**:是否为静态文件开启gzip compression: 

- 默认值是false，可以设置为true;

```js
  module.exports = {
  devServer:{
    host:'0.0.0.0',
    port:8000,
    open:true,
    compress:true
  }
 }
```



### Proxy 代理

**proxy是我们开发中非常常用的一个配置选项，它的目的设置代理来解决跨域访问的问题:**

比如我们的一个api请求是 http://localhost:8888，但是本地启动服务器的域名是 http://localhost:8000，这个时候发送网络请求就会出现跨域的问题;

那么我们可以将请求**先发送到一个代理服务器，代理服务器和API服务器没有跨域的问题，就可以解决我们的跨域问题**了;

**可以进行如下的设置:**

- **target**:表示的是代理到的目标地址，比如 /api-hy/moment会被代理到 http://localhost:8888/api-hy/moment;
- **pathRewrite**:默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite;
- **secure**:默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false; 
- **changeOrigin**:它表示是否更新代理后请求的headers中host地址;

```js
    proxy:{
      "/api":{
        target:"http://localhost:8888",
        pathRewrite:{
          "^/api":''
        }
      }
    }
```

**changeOrigin的解析**

修改代理请求中的headers中的host属性:

- 真实的请求，其实是需要通过 http://localhost:8888来请求的;
- 但是因为使用了代码，默认情况下它的值时 http://localhost:8000;
- 如果我们需要修改，那么可以将changeOrigin设置为true即可;

### historyApiFallback

historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在路由跳转之后，进行页面刷新时，返回404的错误。

**boolean值:默认是false**

- 如果设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容

**object类型的值，可以配置rewrites属性(了解):**

- 可以配置from来匹配路径，决定要跳转到哪一个页面;

**事实上devServer中实现historyApiFallback功能是通过connect-history-api-fallback库的**

- 可以查看connect-history-api-fallback 文档

### resolve模块解析

 resolve用于设置模块如何被解析:

 在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库

resolve可以帮助webpack从每个 require/import 语句中，找到需要引入到合适的模块代码;

webpack 使用 enhanced-resolve 来解析文件路径;

```
module.exports = {
resolve:{}
}
```

 **绝对路径**

- 由于已经获得文件的绝对路径，因此不需要再做进一步解析。

**相对路径**

- 在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录
- 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径;

**模块路径**

- 在 resolve.modules中指定的所有目录检索模块;
- 默认值是 ['node_modules']，所以默认会从node_modules中查找文件;
- 我们可以通过设置别名的方式来替换初识模块路径，具体后面讲解alias的配置;

#### 确定文件还是文件夹

- 如果是一个文件:
  - 如果文件具有扩展名，则直接打包文件;
  - 否则，将使用 resolve.extensions选项作为文件扩展名解析;
- 如果是一个文件夹:
  - 会在文件夹中根据 resolve.mainFiles配置选项中指定的文件顺序查找;
  - resolve.mainFiles的默认值是 ['index'];
  - 再根据 resolve.extensions来解析扩展名;

#### extensions和alias配置

 extensions是解析到文件时自动添加扩展名:

默认值是 ['.wasm', '.mjs', '.js', '.json']

所以如果我们代码中想要添加加载 .vue 或者 jsx 或者 ts 等文件时，我们必须自己写上扩展名;

另一个非常好用的功能是配置别名alias: 

特别是当我们项目的目录结构比较深的时候，或者一个文件的路径可能需要 ../../../这种路径片段

我们可以给某些常见的路径起一个别名;

```js
  resolve:{
    extensions:['.js','.json','.mjs','.vue','ts','jsx','tsx'],
    alias:{
      '@':path.resolve(__dirname,'./src'),
      "js":path.resolve(__dirname,'./src/js')
    }
```



## 区分开发环境

编写两个不同的配置文件，开发和生成时，分别加载不同的配置文件即可;

![image-20220622202716708](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222027793.png)

安装 webpack-merge

```
npm i webpack-merge -D
```

# VueCLI

CLI:Command-Line Interface命令行界面

在真实开发中，我们通常会使用脚手架来创建一个项目，Vue的项目我们使用的就是Vue的脚手架;

可以通过CLI选择项目的配置和创建出我们的项目;

Vue CLI已经内置了webpack相关的配置，我们不需要从零来配置

**安装Vue CLI**

```bash
 npm install @vue/cli -g
```

通过Vue的命令来**创建项目**

```bash
 vue create 项目的名称
```

## **vue create 项目的过程**

![image-20220622205805772](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222058837.png)

## ****项目的目录结构****

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222106221.png" alt="image-20220622210602152" style="zoom:67%;" />

## 运行原理

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222110868.png" alt="image-20220622211027797" style="zoom:150%;" />

(视频p10讲到源码)

# Vite



**预打包**

vite会预打包,当前服务结束后,再次启动不需要从头打包

**安装**

```bash
 npm install vite -g # 全局安装 
 npm install vite -D # 局部安装
```

通过vite来启动项目:

```bash
npx vite
```

## Vite对css的支持

vite可以直接支持css的处理 p 直接导入css即可;

**vite可以直接支持css预处理器，比如less**

- 直接导入less;

- 安装less编译器;

  ```bash
  npm i less -D
  ```

  

**vite直接支持postcss的转换:**

- 只需要安装postcss，并且配置 postcss.config.js 的配置文件即可;

  ```bash
   npm install postcss postcss-preset-env -D
  ```

postcss-config.js

```js
module.exports={
  plugins:[
    require('postcss-preset-env')
  ]
}
```



## Vite对TypeScript的支持

 vite对TypeScript是原生支持的，它会直接使用ESBuild来完成编译:

直接导入即可;

- 查看浏览器中的请求，会发现请求的依然是ts的代码:
- 这是因为vite中的**服务器Connect**会对我们的请求进行转发;
- 获取ts编译后的代码，给浏览器返回，浏览器可以直接进行解析;

## Vite对vue的支持

vite对vue提供第一优先级支持:

- Vue 3 单文件组件支持:@vitejs/plugin-vue 
- Vue 3 JSX 支持:@vitejs/plugin-vue-jsx 
- Vue 2 支持:underfin/vite-plugin-vue2

**安装支持vue的插件**

```bash
npm install @vitejs/plugin-vue -D
```

**在vite.config.js中配置插件:**

```js
const vue =require('@vitejs/plugin-vue')
module.exports={
  plugins:[
    vue()
  ]
}
```



## Vite打包项目

直接通过vite build来完成对当前项目的打包工具:

```
 npx vite build
```

我们可以通过**preview**的方式，开启一个本地服务来预览打包后的效果:

```bash
npx vite preview
```



## Vite脚手架

Vite实际上是有两个工具的:

- vite:相当于是一个构件工具，类似于webpack、rollup; 
- @vitejs/create-app:类似vue-cli、create-react-app

使用脚手架工具

```
npm init @vitejs/app
```

**相当于 安装+运行:(推荐)**

```
npm install @vitejs/create-app -g
create-app
```



> ## ESBuild解析
>
> ESBuild的特点:
>
> - 超快的构建速度，并且不需要缓存; p 支持ES6和CommonJS的模块化;
> - 支持ES6的Tree Shaking;
> - 支持Go、JavaScript的API; p支持TypeScript、JSX等语法编译;
> - 支持SourceMap;
> - 支持代码压缩;
> - 支持扩展其他插件;

