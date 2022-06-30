const userModule={
  state(){
    return {
      userCounter:100
    }
  },
  getters:{

  },
  mutations:{
    increment(state) {
      state.userCounter++
    }
  },
  actions:{

  }
}
export default userModule