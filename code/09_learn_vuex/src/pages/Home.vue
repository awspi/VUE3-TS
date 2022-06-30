<template>
  <div>
    <h2>counter:{{ $store.state.rootCounter }}</h2>
    <h2>counter:{{ $store.state.home.homeCounter }}</h2>
    <h2>counter:{{ $store.state.user.userCounter }}</h2>
    <button @click="homeIncrement">+1</button>
    <button @click="homeIncrementAction">home+1</button>
    <h2>{{$store.getters.doubleCounter}}</h2>
  </div>
</template>

<script>
export default {
  methods:{
    homeIncrement(){
      this.$store.commit('increment')
    },
    homeIncrementAction(){
      this.$store.dispatch('homeIncrementAction')
    }
  }
}
</script>

<style scoped>
</style>