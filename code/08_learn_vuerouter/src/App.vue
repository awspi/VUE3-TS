<template>
  <div id="app">
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/user/pithy">User</router-link>
    <button @click="JumpToAbout">关于</button>
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  // methods:{
  //   JumpToAbout(){
  //    this.$router.push('/about') 
  //   }
  // },
  setup(){
    const router=useRouter()
    const JumpToAbout=()=>{
    router.push({
      path:'/about',
      query:{
        name:'pithy',
        age:22
      }
    })
    }
    return{
      JumpToAbout
    }
  }
}
</script>

<style scoped>
.router-link-active {
  color: red;
}
</style>