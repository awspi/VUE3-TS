<template>
  <div>
    <input v-model="msg">
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
  import{ref} from 'vue'
  import debounce from './hook/useDebounceRef'
  export default {
    setup(){
      const msg=debounce('hello')

      return{
        msg
      }
    }
  }
</script>

<style scoped>

</style>