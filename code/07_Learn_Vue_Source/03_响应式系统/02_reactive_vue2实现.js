class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  notify() {
    this.subscribers.forEach(effect => effect())
  }
  depend(){
    if(activeEffect){
      this.subscribers.add(activeEffect)
    }
  }
}
let activeEffect=null
function watchEffect(effect){
  activeEffect=effect
  effect()
  activeEffect=null
}
const targetMap=new WeakMap()
function getDep(target,key){
  let depsMap=targetMap.get(target)
  if(!depsMap){
    depsMap=new Map()
  }
  let dep=depsMap.get(key)
  if(!dep){
    dep=new dep()
  }
  return dep
}

//vue2 Object.definePropety
function reactive(raw){
  Object.keys(raw).forEach(key=>{
    const dep=new Dep()
    let value=raw[key]

    Object.defineProperty(raw,key,{
      get(){
        dep.depend()
        return value
      },
      set(newVal){
        if(newVal!=value){
          value=newVal
          dep.notify()
        }

      }
    })
  })
  return raw
}

////////TEST

const info = reactive({ counter: 100,name:'awspi'})
const foo = reactive({ name:'pithy',age: 100 })

console.log(info);
watchEffect(function () {
  console.log(info.counter*2,info.name)
})

watchEffect(function () {
  console.log(foo.age**2,foo.name)
})
info.counter++