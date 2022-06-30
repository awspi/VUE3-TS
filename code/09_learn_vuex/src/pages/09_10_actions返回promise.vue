<template>
  <div>
    <h2>counter:{{ $store.state.counter }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  // methods: {
  //   ...mapActions(['incrementAction', 'decrementAction']),
  //   ...mapActions({
  //     increment: 'incrementAction',
  //     decrement: 'decrementAction'
  //   })
  // },
  // setup() {
  //   const actions = mapActions({
  //     increment: 'incrementAction',
  //     decrement: 'decrementAction'
  //   })
  //   return {
  //     ...actions
  //   }
  // },
  methods:{
    decrement(){
      this.$store.dispatch('decrementAction').then((res)=>{
        console.log(res,'decrement 成功');
      })
    }
  }
}
</script>

<style scoped>
</style>