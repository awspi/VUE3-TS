<template>
  <div>
    <button @click="isShow=!isShow">toggle</button>
    <transition name="fade">
    <h2 v-if="isShow">{{msg}}</h2>
    </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        msg:"hello",
        isShow:true
      }
    }
  }
</script>

<style scoped>
.fade-enter-from,.fade-leave-to{
opacity: 0;
}
.fade-enter-to,.fade-leave-from{
opacity: 1;
}
.fade-enter-active,.fade-leave-active{
  transition: opacity 2s ease;;
}

</style>