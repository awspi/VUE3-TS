<template>
  <div>
    <h2>{{info.name}}</h2>
  <button @click="changeData">修改数据</button>
  </div>
</template>

<script>
  import {reactive,watch,ref} from 'vue'
  export default {
    setup(){
      const info=reactive({name:'pithy',age:22})
      //1.watch传入getter函数
      // watch(()=>info.name,(newVal,oldVal)=>{
      //   console.log("oldVal:"+oldVal+" newVal:"+newVal);
      // })
      //2.1.1watch传入reactive对象,获取到的oldValue和newValue都是reactive对象
      // watch(info,(newVal,oldVal)=>{
      //   console.log("oldVal:"+oldVal+" newVal:"+newVal);
      //   //oldVal:[object Object] newVal:[object Object]
      // })
      //2.1.2如果希望newValue和oldValue是一个普通对象
      watch(()=>{
        return {...info}//gettter函数 reactive对象会被解构成普通键值对
        //
      },(newVal,oldVal)=>{
         console.log("oldVal:"+oldVal+" newVal:"+newVal);
      })
      //2.2watch传入的是ref,获取的oldValue和newValue都是value值本身
      // const name= ref('pithy')
      // watch(name,(newVal,oldVal)=>{
      //   console.log("oldVal:"+oldVal+" newVal:"+newVal);
      //   //oldVal:[object Object] newVal:[object Object]
      // })

      const changeData=()=>{
        info.name='awspi'
        // name.value='awspi'
      }

      return {
        changeData,
        info
      }
    }
  }
</script>

<style scoped>

</style>