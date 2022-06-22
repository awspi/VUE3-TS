<template>
  <div>
    <button @click="decrement">-1</button>
    <button @click="increment">+1</button>

    <input type="text" v-model.number='num'>
    <button @click="incrementN">+N</button>
  </div>
</template>

<script>
  export default {
    emits:["add","sub",'addN'],
    methods:{
      incrementN(){
        this.$emit("addN",this.num)
      },
      increment(){
        this.$emit("add")
      },
      decrement(){
        this.$emit("sub")
      },
      data(){
        return {
          num:0
        }
      }
    },
  }
</script>

<style scoped>
button {
  padding:5px 10px;
  margin:  5px;
}
</style>