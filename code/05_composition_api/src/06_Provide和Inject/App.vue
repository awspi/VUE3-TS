<template>
  <div>
    <home></home>
    <button @click="name='awspi'">name</button>
    <button @click="counter++">counter</button>
  </div>
</template>

<script>
import Home from './Home.vue'
import {provide,ref,readonly} from 'vue'
  export default {
    components:{
      Home
    },
    setup(){
      let name=ref('pithy')//ref包裹 实现响应式
      provide('name',readonly(name))//数据单向性,不让子组件修改
      let counter=ref(0)
      provide('counter',readonly(counter))
      const changeCounter=()=>{
        counter.value++
      }
      provide('changeCounter',changeCounter)
      return{
        name,
        counter,
        
      }
    }
  }
</script>

<style scoped>

</style>