<template>
  <div>
    <h2>{{data}}</h2>
    <button @click="data='123'">changeData</button>
  </div>
</template>

<script>
import useLocalstorage from './hooks/useLocalStorage'
export default {
  setup() {

    const data = useLocalstorage('info',{name:'aswpi'})
    return {
      data
    }
  }

}
</script>

<style scoped>

</style>