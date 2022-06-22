# Webpack

![image-20220621021031583](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222201849.png)

**webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序;**

webpack的官方文档是https://webpack.js.org/ 

webpack的中文官方文档是https://webpack.docschina.org/

## 安装

webpack的安装目前分为两个:webpack、webpack-cli

```bash
npm install webpack webpack-cli –g # 全局安装 
npm install webpack webpack-cli –D # 局部安装
```

**webpack、webpack-cli的关系**

- 执行webpack命令，会执行node_modules下的.bin目录下的webpack;
- webpack在执行时是依赖webpack-cli的，如果没有安装就会报错;
- 而webpack-cli中代码执行时，才是真正利用webpack进行编译和打包的过程;
- 所以在安装webpack时，我们需要同时安装webpack-cli(第三方的脚手架事实上是没有使用webpack-cli的，而是类似于自己的vue-service-cli的东西)

![image-20220621012108585](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222201085.png)

## 默认打包

我们可以通过**webpack**进行打包，之后运行打包之后的代码

在目录下直接执行 **`webpack`** 命令

**生成一个dist文件夹，里面存放一个main.js的文件，就是我们打包之后的文件:**

**入口**

事实上，当我们运行webpack时，webpack会查找当前目录下的 src/index.js作为入口;

所以，如果当前项目中没有存在src/index.js文件，那么会报错;

## 创建局部的webpack

前面我们直接执行webpack命令使用的是全局的webpack，如果希望使用局部的可以按照下面的步骤来操作。

- 第一步:创建package.json文件，用于管理项目的信息、库依赖等 **npm init**

- 第二步:安装局部的webpack **npm install webpack webpack-cli -D**

- 第三步:使用局部的webpack **npm webpack**

- 第四步:在package.json中创建scripts脚本，执行脚本打包即可

  - ```json
      "scripts": {
        "build":"webpack"
      }
    ```

    **npm run build**

## Webpack配置文件

在通常情况下，webpack需要打包的项目是非常复杂的，并且我们需要一系列的配置来满足要求，默认配置必然 是不可以的。

可以在根目录下创建一个**webpack.config.js**文件，来作为webpack的配置文件:

```
const path =require('path')

module.exports={
  entry:"./src/main.js",//入口文件
  output:{
    filename:"bundle.js",//打包后的文件名
    path:path.resolve(__dirname,'./build')//打包的目录
  }
}
```

### 指定配置文件

通过 --config 来指定对应的配置文件 wk.config.js

```bash
webpack --config wk.config.js
```

在package.json中增加一个新的脚本,之后我们执行 npm run build来打包即可。

```json
  "scripts": {
    "build":"webpack --config wk.config.js"
  }
```



## Webpack的依赖图

 webpack到底是如何对我们的项目进行打包的呢?

事实上webpack在处理应用程序时，它会根据命令或者配置文件找到入口文件;

从入口开始，会生成一个**依赖关系图**，这个依赖关系图会包含应用程序中所需的所有模块(比如.js文件、css文件、图片、字体等);

然后遍历图结构，打包一个个模块**(根据文件的不同使用不同的loader来解析);**

# loader

**loader**是什么呢?

- loader 可以用于对模块的源代码进行转换

![image-20220621021031583](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222202214.png)

## css-loader

- 可以将css文件也看成是一个模块，我们是通过import来加载这个模块的;
- 在加载这个模块时，webpack其实并不知道如何对其进行加载，我们必须制定对应的loader来完成这个功能;
- 对于加载css文件来说，我们需要一个可以读取css文件的loader **最常用的是css-loader;**

**css-loader的安装:**

PS:安装5.2.5版本,如果安装最新的6.xx会和file-loader冲突,生成2个图片

```bash
npm install css-loader@5.2.5 -D
```

### css-loader的使用方案

- 内联方式;
- CLI方式(webpack5中不再使用);
- **配置方式;**

**内联方式:内联方式使用较少，因为不方便管理;**

- 在引入的样式前加上使用的loader，并且使用!分割;

  ```js
  import "css-loader!../css/style.css"
  ```

**CLI方式**

- 在webpack5的文档中已经没有了**--module-bind**; 
- 实际应用中也比较少使用，因为不方便管理;

#### loader配置方式(常用)

在我们的**webpack.config.js**文件中写明配置信息:

**module.rules**中允许我们配置多个loader(因为我们也会继续使用其他的loader，来完成其他文件的加载); 

这种方式可以更好的表示loader的配置，也方便后期的维护，同时也让你对各个Loader有一个全局的概览;

**<u>module.rules</u>的配置如下:**

- rules属性对应的值是一个数组:**[Rule]**
  - 数组中存放的是一个个的Rule，Rule是一个对象，对象中可以设置多个属性:
- **test属性**:用于对 resource(资源)进行匹配的，通常会设置成**正则表达式;** 
- **use属性**:对应的值时一个数组:**[UseEntry]**
- UseEntry是一个对象，可以通过对象的属性来设置一些其他属性
  - **loader:必须有一个 loader属性，对应的值是一个字符串;**
  - **options**:可选的属性，值是一个字符串或者对象，值会被传入到loader中;
  - **query**:目前已经使用options来替代;
- **传递字符串(如:use: [ 'style-loader' ])是 loader 属性的简写方式(如:use: [ { loader: 'style-loader'} ]);** 
- **loader属性:** Rule.use: [ { loader } ] 的简写。

```js
const path =require('path')

module.exports={
  entry:"./src/main.js",
  output:{
    filename:"bundle.js",
    path:path.resolve(__dirname,'./build')
  },
  rules:[
    {
      test:/\.css$/,//正则表达式 .需要转译

      // loader:'css-loader'//loader写法 语法糖

      use:[
      //  {loader: 'css-loader'}
      'css-loader',
      ]

    }
  ]
}
```



## style-loader

css-loader只是负责将.css文件进行解析，并不会将解析之后的css插入到页面中;

如果我们希望再完成插入style的操作，需要另外一个loader，就是style-loader;

安装style-loader:

```bash
npm i style-loader -D
```

**配置方式**

**因为loader的执行顺序是从右向左(或者说从下到上，或者说从后到前的)**，所以我们需要将style- loader写到css-loader的前面;

```js
const path =require('path')

module.exports={
  entry:"./src/main.js",
  output:{
    filename:"bundle.js",
    path:path.resolve(__dirname,'./build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,//正则表达式 .需要转译
        // loader:'css-loader'//loader写法 语法糖
        use:[
          'style-loader',//注意书写顺序,被依赖的写在后面
          'css-loader',
        ]
      }
    ]
  }
}
```

## 处理less文件

less、sass等编写的css需要通过工具转换成普通的css

我们可以使用**less工具(less Compiler)**来完成它的编译转换:

```bash
npm install less -D
```

执行如下命令:

(npx 到node_module文件夹下找到指定命令执行)

```bash
npx lessc ./test.less demo.css
```

### less-loader处理

在项目中我们会编写大量的css，它们如何可以自动转换呢?

使用less-loader，自动使用less工具转换less到css;

```bash
 npm install less-loader -D
```

配置webpack.config.js

```json
const path =require('path')

module.exports={
  entry:"./src/main.js",
  output:{
    filename:"bundle.js",
    path:path.resolve(__dirname,'./build')
  },
  module:{
    rules:[
      {//css
        test:/\.css$/,//正则表达式 .需要转译
        // loader:'css-loader'//loader写法 语法糖
        use:[
          'style-loader',//注意书写顺序,被依赖的写在后面
          'css-loader',
        ]
      },
      {//less
        test:/\.less$/,//正则表达式 .需要转译
        // loader:'css-loader'//loader写法 语法糖
        use:[
          'style-loader',//注意书写顺序,被依赖的写在后面
          'css-loader',
          'less-loader'
        ]
      },
      
    ]
  }
}
```



## PostCSS

PostCSS是一个通过JavaScript来转换样式的工具;

- 这个工具可以帮助我们进行一些CSS的转换和适配，比如自动添加浏览器前缀、css样式的重置; 
- 但是实现这些功能，我们需要借助于PostCSS对应的插件;

使用步骤:

第一步:查找PostCSS在构建工具中的扩展，比如webpack中的postcss-loader; 

第二步:选择可以添加你需要的PostCSS相关的插件;

### 命令行使用postcss

需要单独安装一个工具postcss-cli;

**安装:postcss、postcss-cli**

```bash
npm i postcss postcss-cli -D
```

> 我们编写一个需要添加前缀的css:
>
> ```css
> .title{
>   user-select: none;
> }
> ```
>
> https://autoprefixer.github.io/
>
> 我们可以在上面的网站中查询一些添加css属性的样式;

### autoprefixer插件

因为我们需要添加前缀，所以要安装**autoprefixer**:

```bash
npm install autoprefixer -D
```

直接使用postcss工具，并且制定使用autoprefixer

```bash
npx postcss --use autoprefixer -o demo.css testpostcss.css
```

转化之后的css样式如下:

```css
.title{
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

```

### postcss-loader

真实开发中我们必然不会直接使用命令行工具来对css进行处理，而是可以借助于构建工具:

在webpack中使用postcss就是使用**postcss-loader**来处理的

**安装postcss-loader:**

```bash
npm install postcss-loader -D
```

**修改加载css的loader**

- 因为postcss需要有对应的插件才会起效果，所以我们需要配置它的**plugin**;

```json
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  require('autoprefixer')
                ]
              }
            }
          }
```



### 单独的postcss配置文件

可以**将这些配置信息放到一个单独的文件中进行管理**:

在根目录下创建postcss.config.js

```js
module.exports={
  plugins:[
    require('autoprefixer')
  ]
}
```

```json
        use:[
          'style-loader',//注意书写顺序,被依赖的写在后面
          'css-loader',
          'postcss-loader'//已经设置了单独的postcss配置文件
        ]
```



### postcss-preset-env插件

在配置postcss-loader时，我们配置插件并不需要使用autoprefixer。

我们可以使用另外一个插件:**postcss-preset-env**

**postcss-preset-env也是一个postcss的插件;**

- 可以帮助我们将一些现代的CSS特性，转成大多数浏览器认识的CSS，并且会根据目标浏览器或者运行时环境添加所需的polyfill;
- 也包括会自动帮助我们添加autoprefixer(所以相当于已经内置了autoprefixer);

**安装postcss-preset-env:**

```bash
npm install postcss-preset-env -D
```

之后，我们直接修改掉之前plugins的autoprefixer即可

```js
module.exports={
  plugins:[
    require('postcss-preset-env')
  ]
}
```



## file-loader

 要处理jpg、png等格式的图片，我们也需要有对应的loader:**file-loader**

file-loader的作用就是帮助我们处理**import/require()**方式引入的一个文件资源，并且会将它放到我们输出的文件夹中;

```bash
npm install file-loader -D
```

配置处理图片的Rule

```json
          {
            loader:'file-loader',
            options:{
              publicPath: "./build",//记得设置,不然图片找不到 打包后的目录 默认是dist
            }
          }
```

**打包后的图片需要像模块一样被使用**

```js
//设置img元素src
import zzhnImg from '../img/zznh.png'
const imgEl=document.createElement('img')
imgEl.src=zzhnImg
document.body.appendChild(imgEl);
```



### 文件的命名规则

有时候我们处理后的文件名称按照一定的规则进行显示:

比如保留原来的文件名、扩展名，同时为了防止重复，包含一个hash值等;

这个时候我们可以使用**PlaceHolders**来完成，webpack给我们提供了大量的PlaceHolders来显示不同的内容: 

https://webpack.js.org/loaders/file-loader/#placeholders

我们可以在文档中查阅自己需要的placeholder;

**最常用的placeholder:**

- **[ext]:** 处理文件的扩展名;extension
- **[name]:**处理文件的名称;
- **[hash]:**文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值(32个十六进制);
- **[contentHash]:**在file-loader中和[hash]结果是一致的(在webpack的一些其他地方不一样，后面会讲到)
- **[hash:<length>]:**截图hash的长度，默认32个字符太长了
- **[path]:**文件相对于webpack配置文件的路径;



### 设置文件的名称

那么我们可以按照如下的格式编写:(vue的写法)

```json
 name:"img/[name].[hash:8].[ext]"
```



### 设置文件的存放路径

通过 ` name:"img/[name].[hash:8].[ext]"` 已经设置了文件夹img，这个也是vue、react脚手架中常见的设置方式(常用)

也可以通过**outputPath**来设置输出的文件夹;

```json
outputPath:img
```



## url-loader

**url-loader和file-loader**的工作方式是相似的，但是可以**将较小的文件，转成base64的URI。**

 安装url-loader:

```bash
npm install url-loader -D
```

配置处理图片的Rule

```
      {
        test:/\.(png|jpe?g|gif|svg)$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              publicPath: "./build",//打包后的目录 默认是dist
              name:"img/[name].[hash:8].[ext]"
            }
          }

        ]
      }
```

显示结果是一样的，并且图片可以正常显示,但是在dist文件夹中，我们会**看不到图片文件:**

**默认情况下url-loader会将所有的图片文件转成base64编码**

开发中往往**是小的图片需要转换，大的图片直接使用图片即可**

- 因为小的图片转换base64之后可以和页面一起被请求，减少不必要的请求过程;
- 而大的图片也进行转换，反而会影响页面的请求速度;

### limit

options属性limit，可以用于设置转换的限制;

```json
            options:{
              publicPath: "./build",//打包后的目录 默认是dist
              name:"img/[name].[hash:8].[ext]",//如果不转为base64,则名称为name
              limit:100*1024//单位是byte 100kb=100*1024
            }
          }
```



# asset module type资源模块类型

- 在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader;
- 在webpack5开始，我们可以直接使用**资源模块类型(asset module type)**，来替代上面的这些loader;

**资源模块类型(asset module type)**，通过添加 4 种新的模块类型，**来替换所有这些 loader:** 

- **asset/resource**发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现; 
- **asset/inline**导出一个资源的 data URI。之前通过使用 url-loader 实现;
- **asset/source** 导出资源的源代码。之前通过使用 raw-loader 实现;
- **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体 积限制实现;

 比如加载图片，我们可以使用下面的方式:

```json
      {
        test:/\.(png|jpe?g|gif|svg)$/i,
        type:"asset",
        generator:{
          filename:"img/[name].[hash:8].[ext]",

        },
        parser:{
          dataUrlCondition:{
            maxSize:100*1024
          }
        }
      }
```

**自定义文件的输出路径和文件名**

- **方式一:**修改output，添加assetModuleFilename属性;

- ```js
    output:{
      filename:"bundle.js",
      path:path.resolve(__dirname,'./build'),
      assetModuleFilename:"img/[name].[hash:8].[ext]"
    },
  ```

  

- **方式二:**在Rule中，添加一个generator属性，并且设置filename;(常用)

```json
   {
        test:/\.(png|jpe?g|gif|svg)$/i,
        type:"asset",
        generator:{
          filename:"img/[name].[hash:8].[ext]",
        },
        parser:{
          dataUrlCondition:{
            maxSize:100*1024
          }
        }
      }
```



## 字体的打包

处理eot、ttf、woff等文件:

可以选择使用file-loader来处理，也可以选择直接使用webpack5的资源模块类型来处理;

**file-loader**

```json
      {
        test:/\.(eot|ttf|woff2?)$/,
        use:{
          loader: 'file-loader',
          options:{
            publicPath: "./build",//打包后的目录
            // outputPath:'font',
            name:"font/[name]_[hash:6].[ext]"
          }
        }
      }
```

**资源模块类型**

```json
      {
        test:/\.(eot|ttf|woff2?)$/,
        type:'asset/resource',
        generator:{
          filename:"font/[name]_[hash:6].[ext]"
        }
      }
```



**Webpack的另一个核心是Plugin**

# Plugin

Loader是用于特定的模块类型进行转换;

Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等;

![image-20220621202631007](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341947.png)

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

![image-20220621205015823](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341953.png)

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

![image-20220621210829636](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341001.png)



```js
module.exports = {  
	mode:"development",
  devtool:"source-map",
	}
```

![image-20220621211446360](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341386.png)



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

![image-20220622011729871](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341453.png)

![image-20220622011718094](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341718.png)

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

![image-20220622174810768](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341791.png)

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

![devServer的contentBase的理解](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341907.png)

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

![image-20220622180807032](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341028.png)

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

![image-20220622181617141](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341265.png)



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

![image-20220622202716708](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341341.png)

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

![image-20220622205805772](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341491.png)

## ****项目的目录结构****

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341755.png" alt="image-20220622210602152" style="zoom:67%;" />

## 运行原理

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206222341905.png" alt="image-20220622211027797" style="zoom:150%;" />

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

