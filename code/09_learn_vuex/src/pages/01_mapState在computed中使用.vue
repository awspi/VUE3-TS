<template>
  <div>
    <h2>HOME</h2>
    <h2>{{counter}}</h2>
    <h2>{{sCounter}}</h2>
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
  </div>
</template>
<script>
import { mapState } from "vuex";
  export default {
    computed:{
      fullName(){
        return 'WenSuP'
      },
      //其他的属性,从state获取 数组形式
       ...mapState(['counter','name','age']),

       ...mapState({//设置别名:
        sCounter:state=>state.counter
       })
    }
  }
</script>

<style scoped>

</style>