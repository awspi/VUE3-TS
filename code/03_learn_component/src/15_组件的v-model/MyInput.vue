<template>
  <div>
    <!-- <input type="text" @input="input"> -->
    <input type="text" v-model="value">
  </div>
</template>

<script>
  export default {
    props:{
      modelValue:String
    },
    emits:['update:modelValue'],
    computed:{
      value:{
        get(){
          return this.modelValue
        },
        set(value){
        this.$emit('update:modelValue',value)
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