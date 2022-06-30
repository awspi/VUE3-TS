import { computed } from "vue";
import { useStore } from "vuex";
export function useMapper(mapper,mapFn) {
  const store = useStore()
  //获取对象的functions
  const storeStateFns = mapFn(mapper)
  //{name:function,age:function}⬇️
  //{name:ref,age:ref}
  const storeState = {}
  Object.keys(storeStateFns).forEach(fnKey => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })
  return storeState
}