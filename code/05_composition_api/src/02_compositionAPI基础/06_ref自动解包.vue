<template>
  <div>
    <h2>{{title}}</h2>
    <h2>{{info.counter}}</h2>
    <!-- <h2>{{counter}}</h2> -->
    <button @click="increment">+</button>
  </div>
</template>

<script>
  import {reactive,ref} from 'vue'
  export default {
    setup(){
      let counter=ref(100)
      const info=reactive({
        counter,
      })
      let title=ref('hello')
      const increment=()=>{
        counter.value++
        console.log(counter)
      }
      return {
        increment,
        // counter,
        title,
        info
      }
    },

  }
</script>

<style scoped>

</style>