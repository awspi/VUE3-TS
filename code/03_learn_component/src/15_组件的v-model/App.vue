<template>
  <div>
    <div class="wraper">
    <h2>{{msg}}</h2>
    <h2>{{title}}</h2>
    </div>
    <!-- 在组件上使用v-model -->
    <!-- <my-input v-model="msg"></my-input> -->
    <!-- 绑定多个属性 -->
    <my-input2 v-model="msg" v-model:title="title"></my-input2>
    <!-- 相当于 -->
    <!-- <my-input :modelValue="msg" @update:model-value="msg=$event"></my-input> -->
  </div>
</template>

<script>
  import MyInput from './MyInput.vue'
  import MyInput2 from './MyInput2.vue'
  export default {
    components:{
      MyInput,
      MyInput2
    },
    data(){
      return {
        msg:"hello",
        title:"World"
      }
    }
  }
</script>

<style scoped>
  .wraper{
    display:flex;
  }
</style>