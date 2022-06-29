<template>
  <div>
    <h2>HOME</h2>
    <router-link to="/home/message">消息</router-link>
    <router-link to="/home/shops">商品</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.router-link-exact-active{
  color: blue;
}
</style>