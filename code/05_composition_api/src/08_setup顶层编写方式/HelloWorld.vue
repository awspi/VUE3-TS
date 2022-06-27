<template>
  <div>
    <h2>hello</h2>
    <h2>{{msg}}</h2>
    <button @click="btnClick">emit</button>
  </div>
</template>

<script setup>
import {defineProps,defineEmits} from 'vue'
  const props=defineProps({
    msg:{
      type:String,
      default:"hahah"
    }
  })
  const emit=defineEmits(['increment'])
  const btnClick=()=>{
  emit('increment',10086)
  }
</script>

<style scoped>

</style>