<template>
  <div>
    <h2>{{info}}</h2>
    <button @click="changeInfo">changeName</button>
  </div>
</template>

<script>
import {ref,shallowRef,triggerRef} from 'vue'
  export default {
    setup(){
      //shallowRef浅层响应式
      const info=shallowRef({name:'pithy'})
      const changeInfo=()=>{
        info.value.name='awspi'//不会触发响应式
        triggerRef(info)//手动触发副作用(刷新页面)
        console.log(info.value)//{name: 'awspi'}
      }
      return{
        info,
        changeInfo
      }
    }
  }
</script>

<style scoped>

</style>