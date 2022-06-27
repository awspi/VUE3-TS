export default{
  name:'pluginObject',
  install(app,options){
    app.config.globalProperties.name=options
  }
}