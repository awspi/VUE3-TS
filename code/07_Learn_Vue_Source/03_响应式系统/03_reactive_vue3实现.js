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
    dep=new Dep()
  }
  return dep
}

//vue3 Proxy
function reactive(raw){

  return new Proxy(raw,{
    get(target,key,receiver){
      const dep=getDep(target,key)
      dep.depend()
      return Reflect.get(target,key,receiver)
    },
    set(target,key,newValue){
      Reflect.set(target,key,newValue)
      const dep=getDep(target,key)
      dep.notify()
    }
  })
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