<template>
  <div>
    <h2>{{fullName}}</h2>
    <button @click="btnClick">changename</button>
  </div>
</template>

<script>
  import {ref,computed}from 'vue'
  export default {
    setup(){
      const firstName=ref('ab')
      const lastName=ref('cd')
      //1.传入函数 //只可读
      // const fullName=computed(()=>firstName.value+" "+lastName.value)
      //2.传入对象 可读写
      const fullName=computed({
        get:()=>{
          return firstName.value+" "+lastName.value
        },
        set:(newVal)=>{
          const names=newVal.split(" ")
          firstName.value=names[0]
          lastName.value=names[1]
        }
      })
      
      const btnClick=()=>{
        fullName.value='hello world'
      }
      return {
        fullName,
        btnClick
      }
    }
  }
</script>

<style scoped>

</style>