<template>
  <div>
    <template v-for="tab in tabs">
      <button @click="btnClicked(tab)" :class="{active:currentTab==tab}">
      {{tab}}
      </button>
    </template>
    <!-- 动态绑定 -->
    <keep-alive :include="['Home','About']">
    <component :is="currentTab"
               :name="name"
               @pageClicked="pageClick"></component>
    </keep-alive>
  </div>
</template>

<script>
  import About from './pages/About.vue';
  import Home from './pages/Home.vue';
  import Cate from './pages/Cate.vue';
  export default {
    components:{
      About,
      Home,
      Cate
    },  
    data(){
      return {
        tabs:['home','about','cate'],
        currentTab:'home',
        name:'pithy'
      }
    },
    methods:{
      btnClicked(tab){
        this.currentTab=tab;
      },
      pageClick(msg){
        console.log(msg);
      }
    }
  }
</script>

<style scoped>
.active{
  color: red;
}
</style>