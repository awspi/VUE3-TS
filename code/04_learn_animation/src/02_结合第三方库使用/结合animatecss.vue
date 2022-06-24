<template>
  <div class="title">
    <button @click="isShow=!isShow">toggle</button>
    <transition name="ani" appear>
     <h2 v-if="isShow" >App</h2>
    </transition>
    <transition enter-active-class="animate__animated animate__backInDown"
                leave-active-class="animate__animated animate__backInDown"
                appear
                >
     <h2 v-if="isShow" >App</h2>
      </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isShow:true
      }
    },
    methods:{
      enter(){
        console.log('enter');
      }
    }
  }
</script>

<style scoped>
.animate__backInDown{
  animation-direction: reverse;
}
.title{
  display: inline-block;
}
.ani-enter-active{
    animation: bounceInUp .5s ease;
  }
.ani-leave-active{
    animation: bounceInUp .5s ease reverse;
  }
</style>