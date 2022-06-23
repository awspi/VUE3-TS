<template>
  <div>
    <h2>Cate</h2>
    <button @click="btnClick">{{counter}}</button>
  </div>
</template>

<script>
  export default {
    name:'Cate',
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