**Webpack的另一个核心是Plugin**

# Plugin

Loader是用于特定的模块类型进行转换;

Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等;

![image-20220621202631007](/Users/wsp/Library/Application Support/typora-user-images/image-20220621202631007.png)

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

![image-20220621210829636](/Users/wsp/Library/Application Support/typora-user-images/image-20220621210829636.png)



```js
module.exports = {  
	mode:"development",
  devtool:"source-map",
	}
```

![image-20220621211446360](/Users/wsp/Library/Application Support/typora-user-images/image-20220621211446360.png)



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

![image-20220622011729871](/Users/wsp/Library/Application Support/typora-user-images/image-20220622011729871.png)

![image-20220622011718094](/Users/wsp/Library/Application Support/typora-user-images/image-20220622011718094.png)

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

# Vue源码的打包

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

