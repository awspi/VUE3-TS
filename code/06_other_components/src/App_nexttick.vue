<template>
  <div>
    <h2 class="title" ref="titleRef">{{msg}}</h2>
    <button @click="counter++">+</button>
    <button @click="addMessageContent">Change</button>
    <h2>{{counter}}</h2>
  </div>
</template>

<script>
import {ref,onUpdated,nextTick} from 'vue'
  export default {
    setup(){
      const counter =ref(0)
      const msg=ref('')
      const titleRef = ref(null)

      const addMessageContent=()=>{
        msg.value+='哈哈哈'

        nextTick(()=>{
           console.log(titleRef.value.offsetHeight)
        })

        // 错误的做法
        // console.log(titleRef.value.offsetHeight)
      }
      // onUpdated(()=>{
      //   //其他数据更新，也会执行该操作
      //   console.log(titleRef.value.offsetHeight)
      // })
      return{
        counter,
        msg,
        titleRef,
        addMessageContent
      }
    }
  }
</script>

<style scoped>
  .title {
    width: 120px;
  }
</style>