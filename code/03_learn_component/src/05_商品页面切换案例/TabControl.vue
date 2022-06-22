<template>
  <div class="tab-control">
    <div :class="{active:currentIndex==index}" class="tab-item"  v-for="(title,index) in titles" :key="title" @click="itemClick(index)">
    <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    emits:['titleClick'],
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index
        this.$emit('titleClick',this.currentIndex)
      }
    }
  }
</script>

<style scoped>
.tab-control{
  display: flex;

}
.tab-item{
  flex:1;
  text-align: center;
}
.tab-item.active{
  color: red;
}
.tab-item.active span{
  border-bottom: 3px solid red;
  padding: 5px 10px;
}
</style>