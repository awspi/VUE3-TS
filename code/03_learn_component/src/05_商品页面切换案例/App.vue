<template>
  <div>
    <tab-control :titles="titles"  @titleClick="titleClick"></tab-control>
    <h2>{{content[currentIndex]}}</h2>
    <h2></h2>
  </div>
</template>
<script>
  import TabControl from './TabControl.vue'
  export default {
    components:{
      TabControl
    },
    data(){
      return{
        titles:['衣服','数码','图书'],
        content:['衣服page','数码page','图书page'],
        currentIndex:0
        }
      },
      methods:{
        titleClick(index){
          this.currentIndex=index
        }
      }
  }
</script>

<style scoped>

</style>