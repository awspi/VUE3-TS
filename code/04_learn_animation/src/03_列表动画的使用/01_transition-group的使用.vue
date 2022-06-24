<template>
  <div>
    <button @click="add">add</button>
    <button @click="del">del</button>
    <button @click="shuffle">shuffle</button>
    <transition-group tag="p" name="list" >
      <span :key='item' class="item" v-for="(item) in nums">
        {{item}}
      </span>
    </transition-group>

  </div>
</template>

<script>
import _ from 'lodash'
  export default {
    data(){
      return {
        nums:[0,1,2,3,4,5,6,7,8,9],
        numCounter:10
      }
    },
    methods:{
      add(){
        this.nums.splice(this.randomIndex(),0,this.numCounter++)
      },
      del(){
        this.nums.splice(this.randomIndex(),1)
      },
      randomIndex(){
        return Math.floor( Math.random()*this.nums.length)
      },
      shuffle(){
        this.nums=_.shuffle(this.nums)

      }
    }
  }
</script>

<style scoped>
.list-enter-from,.list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}

.list-enter-active,.list-leave-active{
  transition: all .6s ease;
}
.list-leave-active{
  /* 移除的时候脱标 */
  position: absolute;
}
.list-move{
  transition: transform .6s ease;
}

.item{
  margin-right: 10px;
  display: inline-block;
}
</style>