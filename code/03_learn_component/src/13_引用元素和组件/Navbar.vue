<template>
  <div>
    <h2>nav</h2>
    <button @click="btnClick">getTitle</button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        msg:"NavBar's msg"
      }
    },
    methods:{
      sayHi(){
        console.log('navbar syas hi');
      },
      btnClick(){
        console.log(
        this.$parent.title);
      }
    }
  }
</script>

<style scoped>

</style>