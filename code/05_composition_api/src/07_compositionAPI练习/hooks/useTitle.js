import {ref,watch} from 'vue'
export default function(title='默认title'){
  const titleRef=ref(title)
  watch(titleRef,(newVal)=>{
    document.title=newVal
  },{
    immediate:true,
  })
  return titleRef
}