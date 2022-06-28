class Dep {
  constructor() {
    this.subscribers = new Set()
  }
  addEffect(effect) {
    this.subscribers.add(effect)
  }
  notify() {
    this.subscribers.forEach(effect => effect())
  }
}
const dep = new Dep()

const info = { counter: 100 }


function doubleCounter() {
  console.log(info.counter*2)
}
dep.addEffect(doubleCounter)

function powerCounter() {
  console.log(info.counter**2)
}
dep.addEffect(powerCounter)

dep.notify()