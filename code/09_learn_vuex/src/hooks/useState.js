import { mapState, useStore } from "vuex";
import { computed } from "vue";

export function useState(mapper) {
  const store = useStore()
  //获取对象的functions
  const storeStateFns = mapState(mapper)
  //{name:function,age:function}⬇️
  //{name:ref,age:ref}
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })
  return storeState
}