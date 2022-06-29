<template>
  <div>
    <h2>USER</h2>
    <h3>{{username}}</h3>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
  export default {
    created(){
      console.log(this.$route.params.username);
    },
    setup(){
      const route=useRoute()
      const username=route.params.username
      return {
        username
      }
    }
  }
</script>

<style scoped>

</style>