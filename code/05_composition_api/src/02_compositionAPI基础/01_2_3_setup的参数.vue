<template>
  <div>
    <h2>Home</h2>
    <slot></slot>
    <h2>{{msg}}</h2>
    <h2>{{title}}</h2>
    <h2>{{counter}}</h2>
  </div>
</template>

<script>
  export default {
    props:{
      msg:{
        type:String
      }
    },
    setup(props,{emit}){
      console.log(props.msg)
      console.log(emit)

      return {
        title:"hello",
        counter:123
      }
    },
    // setup(props,context){
    //   console.log(props.msg)
    //   console.log(context.attrs)
    //   console.log(context.slots)
    // },
  }
</script>

<style scoped>

</style>