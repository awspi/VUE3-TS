<template>
  <div>
    <home msg="from app">
      <template #default>
        <h3>123</h3>
      </template>
    </home>
  </div>
</template>

<script>
import Home from './Home.vue'
  export default {
    methods:{
    },
    components:{
      Home
    }
  }
</script>

<style scoped>

</style>