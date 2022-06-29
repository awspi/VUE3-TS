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
    path: '/login',
    component: () => import('../pages/Login.vue'),
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

//动态添加路由
const categoryRoute={
  path:'/catetgory',
  component:()=>import('../pages/Category.vue')
}
//添加顶级路由对象
router.addRoute(categoryRoute)


const homeMomentRoute={
  path:'moment',//子路由不加‘/’
  component:()=>import('../pages/HomeMoment.vue')
}
//添加二级路由对象
//addRoute(name,route)
router.addRoute('home',homeMomentRoute)

//导航守卫
//to:Route对象 即将跳转的Route对象
//from:Route对象,从哪一个路由
router.beforeEach((to,from)=>{
  // return false
  if(to.path!==('/login')&&!window.localStorage.getItem('token')){
    return '/login'
  }
  
  // return {path:'/about',params:'awspi'}
})

export default router