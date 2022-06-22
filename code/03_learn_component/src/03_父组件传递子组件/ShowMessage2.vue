<template>
  <div>
    <h2 v-bind="$attrs">{{title}}</h2>
    <h2>{{content}}</h2>
  </div>
</template>

<script>
  export default {
    inheritAttrs:false,
    props:{
      title:String,
      content:{
        type:String,//类型
        required:false,//必须
        default:'默认值'//默认值
      }
    }
  }
</script>

<style scoped>

</style>