import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

// import Home from "@/pages/Home.vue";
// import About from "@/pages/About.vue";

//配置映射关系

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name:'home',
    component: () => import(/* webpackChunkName:'home-chunk'*/'../pages/Home.vue'),
    children:[
      {
        path:'message',
        component:()=>import('../pages/HomeMessage.vue')
      },
      {
        path:'shops',
        component:()=>import('../pages/HomeShop.vue')
      },
    ]

  },
  {
    path: '/about',
    component: () => import('../pages/About.vue'),
    meta:{
      name:'pithy',
      age:22
    }
  },
  {
    path: '/user/:username',
    component: () => import('../pages/User.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../pages/NotFound.vue'),
  },
]

//创建一个路由对象router
const router = createRouter({
  // routes:routes
  routes,
  history: createWebHistory()//history模式
})

export default router