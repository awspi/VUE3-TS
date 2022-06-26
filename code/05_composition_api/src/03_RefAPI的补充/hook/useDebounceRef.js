import{customRef} from 'vue'
export default function(value){
  let timer=null
  return customRef((track,trigger)=>{
    return {
      get(){
        track();//收集依赖
        return value
      },
      set(newVal){
        clearTimeout(timer)//如果下一次的set时上次的timer还没结束,
                            //就直接取消上一次,这次再setTimeout
        timer= setTimeout(()=>{
          value=newVal
          trigger()//触发更新
        },1000)

      }
    }
  })
}