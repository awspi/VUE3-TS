<template>
  <div>
    <h2>{{info.name}}</h2>
  <button @click="changeData">修改数据</button>
  </div>
</template>

<script>
  import {reactive,watch,ref} from 'vue'
  export default {
    setup(){
      const info=reactive({name:'pithy',age:22})
      const title=ref('hello')
      //
      watch([()=>({...info}),title],([newInfo,newTitle],[oldInfo,oldTitle])=>{
        console.log("oldVal:",[newInfo,newTitle]," newVal:",[oldInfo,oldTitle])
      })

      const changeData=()=>{
        info.name='awspi'
        // name.value='awspi'
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