<template>
  <div>
    <button @click="add">+1</button>
    <h2>{{msg}}</h2>
    <Home></Home>
    <home-content></home-content>
  </div>
</template>

<script>
  import Home from "./Home.vue";
  import HomeContent from "./HomeContent.vue";
  import { computed } from "vue";
  export default {
    components:{
      Home,
      HomeContent
    },
    // provide:{
    //   title:'title123',
    //   content:'cont123'
    // }
    provide(){
      return {
        title:"1123",
        content:'12314',
        length:computed(()=>this.msg.length)//ref对象
        //让length变成响应式的
      }
    },
    data(){
      return {
        msg:[1,2,3,4]
      }
    },
    methods:{
      add(){
        this.msg.push(1)
      }
    }
  }
</script>

<style scoped>

</style>