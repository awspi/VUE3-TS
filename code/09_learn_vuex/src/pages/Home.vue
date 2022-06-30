<template>
  <div>
    <h2>counter:{{ $store.state.counter }}</h2>
    <button @click="$store.commit('increment')">+</button>
    <button @click="$store.commit('decrement')">-</button>
    <button @click="$store.commit('incrementN', 100)">+N</button>
    <button @click="$store.commit('addN', {n:10})">+N</button>
    <button @click="addTen">+10</button>
  </div>
</template>

<script>
import { ADD_N } from "../store/mutation-types";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations([ADD_N,'increment','decrement','incrementN']),
    addTen(){
      this.addN({n:10})
    }
  },
  setup(){
    const mutations=mapMutations([ADD_N,'increment','decrement','incrementN'])
   return{
    ...mutations,

   } 
  }
}
</script>

<style scoped>
</style>