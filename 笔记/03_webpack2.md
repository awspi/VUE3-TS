**Webpack的另一个核心是Plugin**

## Plugin

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
devtool:"sourwce-map"
```

![image-20220621211446360](/Users/wsp/Library/Application Support/typora-user-images/image-20220621211446360.png)