<template>
  <div>
    <h2>{{title}}</h2>
    <h2>{{counter}}</h2>
    <button @click="increment">+</button>
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default {
    setup(){
      let counter=ref(100)
      let title=ref('hello')
      const increment=()=>{
        counter.value++
        console.log(counter);
      }
      return {
        increment,
        counter,
        title
      }
    },

  }
</script>

<style scoped>

</style>