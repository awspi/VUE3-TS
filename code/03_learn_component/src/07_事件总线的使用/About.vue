<template>
  <div>
    <h2>About</h2>
    <button @click="btnClick">btnClick</button>
  </div>
</template>

<script>
  import emitter from './utils/evenbus'
  export default {
    methods:{
      btnClick(){
        console.log('btnClicked');
        emitter.emit('pithy',{name:'wsp',age:20})
      }
    }
  }
</script>

<style scoped>

</style>