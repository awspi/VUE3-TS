
const homeModule={
  state(){
    return {
      homeCounter:1000
    }
  },
  getters:{
    doubleCounter(state){
      return state.homeCounter*2
    }
  },
  mutations:{
    HomeIncrement(state) {
      state.homeCounter++
    }
  },
  actions:{
    homeIncrementAction(context){
      context.commit('increment')
    }
  }
}
export default homeModule