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



