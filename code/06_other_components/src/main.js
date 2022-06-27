import { createApp } from 'vue'
// import App from './App.vue'
// import App from './02_jsx的使用/App.vue'
import App from './04_teleport内置组件/App.vue'
const app=createApp(App)

// import registerDirectives from "./direactives/index";
// registerDirectives(app)

import pluginObject from "./plugins/plugins_object";
app.use(pluginObject,'pithy')

import pluginsFunciton from "./plugins/plugins_funciton";
app.use(pluginsFunciton)

app.mount('#app')
