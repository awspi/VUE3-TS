<template>
  <div>
    <h2>{{info.name}}</h2>
  <button @click="changeData">修改数据</button>
  </div>
</template>

<script>
  import {reactive,watch} from 'vue'
  export default {
    setup(){
      const info=reactive({
        name:'pithy',
        age:22,
        friend:{
          one:'zxy2021.4.15-2022.6.25'
        }
        },)
      //
      watch(()=>({...info}),(newInfo,oldInfo)=>{
        console.log("oldVal:",newInfo?.friend," newVal:",oldInfo?.friend)
      },{//深度监听 oldValue不会找到之前的对象的值,而是直接转到新的
        deep:true,
        immediate:true
      })

      const changeData=()=>{
        info.friend.one='null'
      }

      return {
        changeData,
        info
      }
    }
  }
</script>

<style scoped>

</style>