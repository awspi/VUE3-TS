<template>
  <div class="app">
    <button @click="isShow=!isShow">toggle</button>
    <transition name="ani" 
                type="transition"
                :duratio="{
                  enter:1000,
                  leave:1200
                }"
                mode="out-in">
    <h2 v-if="isShow">{{msg}}</h2>
    <h2 v-else>world</h2>
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
.ani-enter-from,.ani-leave-to{
  opacity: 0;
}
.ani-enter-active,.ani-leave-active{
  transition: opacity 1s ease;
  /* 时间最好一致 */
}

.ani-enter-active{
  animation: bounce 1s ease;
}
.ani-leave-active{
  animation: bounce 1s ease reverse;
}

@keyframes bounce{
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.2);
  }
  100%{
    transform: scale(1);
  }
  
}
.app{
  width: 200px;
  margin: 0 auto;
}
h2{
  display: inline-block;
}

</style>