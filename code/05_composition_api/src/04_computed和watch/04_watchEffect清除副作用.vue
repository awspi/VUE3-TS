<template>
  <div>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    <button @click="changeAge">changeAge</button>
    <button @click="changeName">changeName</button>
  </div>
</template>

<script>
import {ref,watchEffect} from 'vue'
  export default {
    setup(){
      const name=ref('pithy')
      const age=ref(22)

      const changeName=()=>{
        name.value='awspi'
      }
      const changeAge=()=>{
        age.value++
      }
      //调用返回函数即可停止监听
      const stopWatch=watchEffect((onInvalidate)=>{
        console.log("age:"+age.value);
        onInvalidate(()=>{
          console.log('---------');
        })
      })
      return {
        name,
        age,
        changeName,
        changeAge
      }
    }
  }
</script>

<style scoped>

</style>