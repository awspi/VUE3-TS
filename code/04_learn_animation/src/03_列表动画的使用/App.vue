<template>
  <div>
    <input type="text" v-model="keyword">
    <transition-group tag="ul" name="list" 
          @beforeEnter="beforeEnter"
          @enter="enter"
          @leave="leave">
      <li v-for="(book,index) in showBooks" :key="book" :data-index="index" :css="false" >
      {{book}}</li>
    </transition-group>
  </div>
</template>

<script>
import gsap from 'gsap'
  export default {
    data(){
      return{
        books:['vue设计与实现',' Javascript高级程序设计','深入浅出Node.js','你不知道的JS','计算机网络'],
        keyword:''
      }
    },
    computed:{
      showBooks(){
        return this.books.filter(item=>item.indexOf(this.keyword)!==-1)
      }
    },
    methods:{
      beforeEnter(el){
        el.style.opacity=0;
        el.style.height=0;
      },
      enter(el,done){
        gsap.to(el,{
          opacity:1,
          height:"1.5em",
          delay:el.dataset.index*0.1,
          onComplete:done
        })
      },
      leave(el,done){
        gsap.to(el,{
          opacity:0,
          height:0,
          onComplete:done
        })
      },
      
    }
  }
</script>

<style scoped>

</style>