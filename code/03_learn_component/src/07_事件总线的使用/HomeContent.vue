<template>
  <div>
    <h2>HomeContent</h2>
  </div>
</template>

<script>
  import emitter from './utils/evenbus'
  export default {
    created(){
      emitter.on('pithy',(info)=>{
        console.log('pithy',info);
      })
      emitter.on('awspi',(info)=>{
        console.log('awspi',info);
      })
      emitter.on('*',(type,info)=>{//监听所有事件 
        console.log('* listener',type,info);
      })
    }
  }
</script>

<style scoped>

</style>