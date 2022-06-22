<template>
  <div>
    <h2>App</h2>
    <hello-world></hello-world>
  </div>
</template>

<script>
  import HelloWorld from './HelloWorld.vue'
  export default {
    components:{
      HelloWorld
    }
  }
</script>

<style  scoped>
/* scoped防止组件样式相互污染 限制自己 */
  h2{
    color: red;
  }
</style>