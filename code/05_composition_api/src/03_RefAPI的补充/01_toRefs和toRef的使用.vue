<template>
  <div>
    <h2>{{info.name}}</h2>
    <h2>{{info.age}}</h2>
    <button @click="info.age++">info.age++</button>
    <button @click="age++">age++</button>
    <h2>解构出来的age{{age}}</h2>
  </div>
</template>

<script>
import {reactive,toRefs,toRef} from 'vue'
  export default {
    setup(){
      const info=reactive({
        name:'pithy',
        age:22
      })
      //toRefs:将reactive对象中的所有属性都转成ref 建立连接
      // let {age,name}=toRefs(info)
      //toRef:对其中一个属性进行转换ref
      let age=toRef(info,"age")
      return{
         info,
         age
      }
    }
  }
</script>

<style scoped>

</style>