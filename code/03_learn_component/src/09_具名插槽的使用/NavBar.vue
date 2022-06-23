<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <div class="additon">
      <slot :name="dyName"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      dyName:String
    }
    // data(){
    //   return {
    //     dynamicName:'dyName'
    //   }
    // }
  }
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.nav-bar{
  display: flex;
}
.left, .right, .center{
  height: 40px;
}
.left, .right{
  width: 80px;
  background-color:aquamarine;
}
.center{
  flex:1;  
  background-color: cadetblue;
  text-align: center;
  line-height: 0px;
}
</style>