import { createStore } from "vuex";
import { ADD_N } from "./mutation-types";
const store = createStore({
  state() {
    return {
      counter: 101,
      name: 'awspi',
      age: 22,
      books: [
        {
          name: 'vue设计与实现',
          count: 3,
          price: 119.80
        },
        {
          name: 'js高级程序设计',
          count: 1,
          price: 100.00
        },
        {
          name: '你不知道的js',
          count: 3,
          price: 60.00
        },
      ],
      discount:0.8

    }
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    incrementN(state,payload) {
      state.counter+=payload
    },
    [ADD_N](state,payload) {
      state.counter+=payload.n
    },
  },
  getters: {
    totalPrice(state,getters) {
      let totalPrice = 0
      for (const book of state.books) {
        totalPrice += book.count * book.price
      }
      return totalPrice*getters.currentDiscount.toFixed(1)
    },
    currentDiscount(state){
      return state.discount*0.9
    },
    priceGreaterN(state,getters){
      return function(n){
        let totalPrice = 0
        for (const book of state.books) {
          if(book.count<n) continue
          totalPrice += book.count * book.price
        }
        return totalPrice*getters.currentDiscount.toFixed(1)
      }
    }
  },
  actions:{
    incrementAction(context){
     setTimeout(() => {
      context.commit('increment')
     }, 1000);
    },
    decrementAction(context){
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          context.commit('decrement')
          resolve('成功')
         }, 1000);
      })
    },
  }

})
export default store