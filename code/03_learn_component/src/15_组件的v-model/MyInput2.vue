<template>
  <div>
    <!-- <input type="text" @input="input"> -->
    <input type="text" v-model="value">
    <input type="text" v-model="title_computed">
  </div>
</template>

<script>
  export default {
    props:['modelValue','title'],
    emits:['update:modelValue','update:title'],
    computed:{
      value:{
        get(){
          return this.modelValue
        },
        set(value){
        this.$emit('update:modelValue',value)
        }
      },
      title_computed:{
        get(){
          return this.title
        },
        set(value){
          this.$emit('update:title',value)
        }
      }
    },
    methods:{
      input(event){
        this.$emit('update:modelValue',event.target.value)
      }
    }
    
  }
</script>

<style scoped>

</style>