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
    targetMap.set(target, depsMap);
  }
  let dep=depsMap.get(key)
  if(!dep){
    dep=new Dep()
    depsMap.set(key, dep);
  }
  return dep
}


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

