<template>
  <div>
     <!-- 绑定在元素上 -->
    <h2 ref="title">哈哈哈</h2>
    <nav-bar ref="navBar"></nav-bar>

    <button @click="btnClick1">获取ref</button>
    <button @click="btnClick2">调用ref</button>
  </div>
</template>

<script>
import NavBar from './Navbar.vue'
  export default {
    components:{
      NavBar
    },
    data(){
      return {
        title:'123'
      }
    },
    methods:{
      btnClick1(){
        console.log(this.$refs);
        console.log(this.$refs.title);
        console.log(this.$refs.navBar);
      },
      btnClick2(){
        console.log(this.$refs.navBar.msg);
        this.$refs.navBar.sayHi()
      }
    }
  }
</script>

<style scoped>

</style>