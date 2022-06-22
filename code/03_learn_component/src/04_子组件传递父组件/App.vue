<template>
  <div>
    <h2>{{couter}}</h2>
    <counter-operation @add="addOne" @sub="subOne" @addN="addN"></counter-operation>
  </div>
</template>

<script>
  import CounterOperation from './CounterOperation.vue'
  
  export default {
    components:{
      CounterOperation
    },
    data(){
      return {
        couter:0,
      }
    },
    methods:{
      addOne(){
        this.couter++
      },
      subOne(){
        this.couter--
      },
      addN(num){
        this.couter+=num
      }
    }
  }
</script>

<style scoped>

</style>