<template>
  <div>
    <home></home>
    <home-content></home-content>
    <about></about>
  </div>
</template>

<script>
  import Home from "./Home.vue";
  import HomeContent from "./HomeContent.vue";
  import About from "./About.vue";
  export default {
    components:{
      Home,
      HomeContent,
      About
    },

  }
</script>

<style scoped>

</style>