<template>
  <div>
    <h2>{{state.title}}</h2>
    <h2>{{state.counter}}</h2>
    <button @click="increment">+</button>
  </div>
</template>

<script>
  import {reactive} from 'vue'
  export default {
    setup(){
      const state=reactive({
        title:"hello",
        counter:1
      })
      const increment=()=>{
        state.counter++
        console.log(state.counter);
      }
      return {
        increment,
        state
      }
    },

  }
</script>

<style scoped>

</style>