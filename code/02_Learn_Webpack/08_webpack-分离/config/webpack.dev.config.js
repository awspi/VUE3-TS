const {merge} =require('webpack-merge')
const commonConfig=require('./webpack.comm.config')

const CopyWebpakPlugin = require('copy-webpack-plugin')
module.exports =merge(commonConfig, {
  mode:"development",
  devtool:"source-map",
  devServer:{
    hot:true,
    // contentBase:"./build", 已经过期
    static:{
      // directory: path.join(__dirname, 'test')
      directory: path.join(__dirname, 'public')
    },
    // host:'0.0.0.0',
    // port:8000
    proxy:{
      "/api":{
        target:"http://localhost:8888",
        pathRewrite:{
          "^/api":''
        }
      }
    }

  },
  plugins: [
    new CopyWebpakPlugin({
      patterns: [
        {
          from: './public',
          globOptions: {
            ignore: [
              "**/.DS_Store",
              "**/index.html"
            ]
          }
        }
      ]
    }),
  ]
})