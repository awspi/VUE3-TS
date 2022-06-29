<template>
  <div>
    <h2>HOME</h2>
    <h2>{{sCounter}}</h2>
  </div>
</template>
<script>
import { mapState,useStore} from "vuex";
import { computed } from "vue";
  export default {
    setup(){
      const store=useStore()
      const sCounter=computed(()=>store.state.counter)
      
      const storeStateFns=mapState(['counter','name','age'])
      //{name:function,age:function}⬇️
      //{name:ref,age:ref}
      const storeState={}
      Object.keys(storeStateFns).forEach(fnKey=>{
        const fn=storeStateFns[fnKey].bind({$store:store})
        storeState[fnKey]=computed(fn)
      })
      return{
        sCounter,

      }
    }

  }
</script>

<style scoped>

</style>