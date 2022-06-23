<template>
  <div>
    APP
    <home></home>

    <suspense>
      <template #default>
        <async-cate></async-cate>
      </template>
      <template #fallback>
        <loading></loading>
      </template>
    </suspense>
    
    <!-- <async-cate-b></async-cate-b> -->
  </div>
</template>

<script>
import Home from './Home.vue'
import Loading from './Loading.vue'
// import AsyncCate from './AsyncCate.vue'
import {defineAsyncComponent} from 'vue'
//工厂函数 返回promise
const AsyncCate =defineAsyncComponent(()=>import('./AsyncCate.vue'))
//对象类型
const AsyncCateB =defineAsyncComponent({
  loader:()=>import('./AsyncCate.vue'),
  loadingComponent:Loading,
  errorComponent:Loading,
  delay:2000, //在显示loadingCpn之前要等待多久

  // err:错误信息
  // retry 函数 调用retry重新加载
  // attempts 记录尝试测试
  onerror:function(err,retry,attempts){
    log(err,retry,attempts)
  }
})

  export default {
    components:{
      Home,
      AsyncCate,
      AsyncCateB,
      Loading
    }
  }
</script>

<style scoped>

</style>