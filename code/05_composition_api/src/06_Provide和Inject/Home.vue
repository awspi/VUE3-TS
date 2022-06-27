<template>
  <div>
    <h2>{{name}}</h2>
    <h2>{{counter}}</h2>
    <button @click="counter++">Home counter++</button>
    <button @click="changeCounter()">changeCounter</button>
  </div>
</template>

<script>
import {inject} from 'vue'
  export default {
    setup(){
      let name=inject('name','默认值')
      let counter=inject('counter')
      const changeCounter=inject('changeCounter')

      return {
        name,counter,
        changeCounter
      }
    }
  }
</script>

<style scoped>

</style>