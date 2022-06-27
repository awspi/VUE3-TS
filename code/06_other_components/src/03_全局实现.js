import { createApp } from 'vue'
// import App from './App.vue'
// import App from './02_jsx的使用/App.vue'
import App from './03_自定义指令/App.vue'
const app=createApp(App)
app.directive('focus',{
  mounted(el,bindings,vnode,preVnode){
    el.focus()
  }
})

app.mount('#app')
