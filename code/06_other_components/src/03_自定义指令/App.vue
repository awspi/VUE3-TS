<template>
  <div>
   <h2 v-time-format> {{timestamp}}</h2>
   <h2 v-time-format="'YYYY/MM/DD'"> {{timestamp}}</h2>
  </div>
</template>

<script>
  export default {
  setup(){
    const timestamp=Date.parse(new Date())
    return{
      timestamp
    }
  } 
  }
</script>

<style scoped>

</style>