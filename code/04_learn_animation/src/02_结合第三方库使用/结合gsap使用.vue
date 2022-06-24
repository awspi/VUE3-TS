<template>
  <div class="title">
    <button @click="isShow=!isShow">toggle</button>

    <transition @enter="enter"
                @leave="leave"
                appear
                >
     <h2 v-if="isShow" >App</h2>
    </transition>
  </div>
</template>

<script>
  import gsap from 'gsap'
  export default {
    data(){
      return {
        isShow:true
      }
    },
    methods:{
      enter(el,done){
        console.log('enter');
        gsap.from(el,{
          scale:0,
          x:200,
          onComplete:done
        })
      },
      leave(el,done){
        console.log('leave');
        gsap.to(el,{
          scale:0,
          x:200,
          onComplete:done
        })
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