<template>
  <div>
    <button @click="increment">{{counter}}</button>
  </div>
</template>

<script>
import {onMounted,onUpdated,ref} from 'vue'
  export default {
    setup(){
      let counter=ref(0)
      const increment=()=>{
        counter.value++
      }
      onMounted(()=>{
        console.log('onMounted');
      })
      onUpdated(()=>{
        console.log('onUpdated');
      })
      return {
        counter,
        increment
      }
    }
  }
</script>

<style scoped>

</style>