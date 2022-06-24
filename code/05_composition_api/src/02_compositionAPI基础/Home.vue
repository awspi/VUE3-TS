<template>
  <div>
    <button @click="updateState">+</button>
  </div>
</template>

<script>
  import {reactive,readonly} from 'vue'
  export default {
    setup(){
      const info_row=reactive({title:'123'})
      const info = readonly(info_row)
      const updateState=()=>{
        info.title='234'
      }
      return {
        updateState,
      }
    },

  }
</script>

<style scoped>

</style>