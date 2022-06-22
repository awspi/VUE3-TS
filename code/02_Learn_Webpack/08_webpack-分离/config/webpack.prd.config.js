const {merge} =require('webpack-merge')
const commonConfig=require('./webpack.comm.config')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = merge(commonConfig ,{
  mode:"development",
  plugins:[
    new CleanWebpackPlugin(),
  ]
  
})