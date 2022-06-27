
import {ref,watch} from'vue'
export default function(key,value){
  const data=ref(value)
  
  if(value){//2个参数-》设置
    window.localStorage.setItem(key,JSON.stringify(value))
  }else{//一个参数-》取值
    data.value= JSON.parse(window.localStorage.getItem(key))
    
  }
  //响应式
  watch(data,(newVal)=>{
    window.localStorage.setItem(key,JSON.stringify(newVal))
  })

  return data
}