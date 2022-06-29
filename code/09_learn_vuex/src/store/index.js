import { createStore } from "vuex";

const store=createStore({
  state(){
    return{
      counter:101,
      name:'awspi',
      age:22
    }
  },
  mutations:{
    increment(state){
      state.counter++
    },
    decrement(state){
      state.counter--
    }
  }
})
export default store