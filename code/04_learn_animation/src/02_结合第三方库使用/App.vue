<template>
  <div >
    <input type="number" step="100" v-model="counter">
    <h2>{{Showcounter}}</h2>
  </div>
</template>

<script>
import gsap from 'gsap'
  export default {
    computed:{
      Showcounter(){
        return this.showNum.toFixed(0)
      }
    },
    data(){
      return {
        counter:0,
        showNum:0
      }
    },
    watch:{
      counter(newValue){
        gsap.to(this,{
          duration:1,
          showNum:newValue
        })
      }
    }
  }
</script>

<style scoped>

</style>