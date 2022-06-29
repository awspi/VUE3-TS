<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
  export default {
      setup(){
        const router = useRouter()
        const login=()=>{
        window.localStorage.setItem('token','awspi')
        router.push({
          path: '/home'
        })
        }
        return{
          login
        }
      }
  }
</script>

<style scoped>

</style>