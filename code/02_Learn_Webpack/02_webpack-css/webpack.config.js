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
          'postcss-loader'
        ]
      },
      {
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