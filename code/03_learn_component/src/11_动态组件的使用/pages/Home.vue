<template>
  <div @click="pageClick">
    <h2>Home</h2>
    <h2>{{name}}</h2>
  </div>
</template>

<script>
  export default {
    activated(){
      console.log('enter Home');
    },
    deactivated(){
      console.log('leave Home');
    },
    name:'Home',
    props:{
      name:{
        type:String
      }
    },
    emits:['pageClicked'],
    methods:{
      pageClick(){
        this.$emit("pageClicked",'msg123')
      }
    },

  }
</script>

<style scoped>

</style>