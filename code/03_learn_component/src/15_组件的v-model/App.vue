<template>
  <div>
    <h2>{{msg}}</h2>
    <!-- 在组件上使用v-model -->
    <my-input v-model="msg"></my-input>
    <!-- 相当于 -->
    <!-- <my-input :modelValue="msg" @update:model-value="msg=$event"></my-input> -->
  </div>
</template>

<script>
  import MyInput from './MyInput.vue'
  export default {
    components:{
      MyInput
    },
    data(){
      return {
        msg:"hello"
      }
    }
  }
</script>

<style scoped>

</style>