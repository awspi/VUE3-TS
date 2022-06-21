const path =require('path')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const{DefinePlugin}=require('webpack')
const CopyWebpakPlugin=require('copy-webpack-plugin')
module.exports={
  entry:"./src/main.js",
  output:{
    filename:"js/bundle.js",
    path:path.resolve(__dirname,'./build'),
    // publicPath: "./build"
    // assetModuleFilename:'img/'
  },
  module:{
    
    rules:[
      {
        test:/\.less|css$/,//正则表达式 .需要转译
        // loader:'css-loader'//loader写法 语法糖
        use:[
          'style-loader',//注意书写顺序,被依赖的写在后面
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.(png|jpe?g|gif|svg)$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              // publicPath: "./build",//打包后的目录 默认是dist
              name:"img/[name].[hash:8].[ext]",//如果不转为base64,则名称为name
              limit:100*1024//单位是byte 100kb=100*1024
            }
          }
        ]

        // type:"asset",
        // generator:{
        //   filename:"img/[name].[hash:8].[ext]",
        // },
        // parser:{
        //   dataUrlCondition:{
        //     maxSize:100*1024
        //   }
        // }
      },
      {
        test:/\.(eot|ttf|woff2?)$/,
        type:'asset/resource',
        generator:{
          filename:"font/[name]_[hash:6].[ext]"
        }
      }
      
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'webpack案例',
      template:'./public/index.html'
    }),
   new DefinePlugin({
    BASE_URL:"'./'"
   }),
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
  ]

}