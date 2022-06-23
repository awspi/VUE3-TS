<template>
  <div>
    <h2>About</h2>
    <button @click="btnClick">{{counter}}</button>
  </div>
</template>

<script>
  export default {
    name:'About',
    data(){
      return {
        counter:0
      }
    },
    methods:{
      btnClick(){
        this.counter++;
      }
    }
  }
</script>

<style scoped>

</style>