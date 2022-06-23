<template>
  <div>
    App
    <button @click="isShow=!isShow">toggle</button>
    <template v-if="isShow">
    <home></home>
    </template>
  </div>
</template>

<script>
  import Home from './Home.vue'
  export default {
    components:{
      Home
    },
    data(){
      return{
        isShow:true
      }
    }
    
  }
</script>

<style scoped>

</style>