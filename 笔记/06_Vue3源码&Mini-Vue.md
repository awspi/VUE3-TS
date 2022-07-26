# 11_Vue3源码&mini-vue

# Vue3源码

## 真实DOM渲染

![image-20220628155852157](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281558187.png)

## 虚拟DOM的优势

首先是可以**对真实的元素节点进行抽象**，抽象成VNode(虚拟节点)，这样**方便后续对其进行各种操作:**

- 因为对于直接操作DOM来说是有很多的限制的，比如diff、clone等等，但是使用JavaScript编程语言来操作这些，就变得非常的简单;
- 我们可以使用JavaScript来表达非常多的逻辑，而对于DOM本身来说是非常不方便的;

其次是**方便实现跨平台**，包括你可以将VNode节点渲染成任意你想要的节点渲染在canvas、WebGL、SSR、Native(iOS、Android)上;

- 并且Vue允许你开发属于自己的渲染器(renderer)，在其他的平台上渲染;

## 虚拟DOM的渲染过程

![image-20220628160046108](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281600126.png)

![image-20220628160116554](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281601575.png)

## 三大核心系统

Vue的源码包含三大核心:

- **Compiler模块:编译模板系统;**
- **Runtime模块:也可以称之为Renderer模块，真正渲染的模块**
- **Reactivity模块:响应式系统;**

![image-20220628160149910](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281601935.png)

![image-20220628160209378](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281602401.png)

# Mini-Vue

**渲染系统模块;**

- runtime->anode->real dom

**可响应式系统模块;**

- reactive (vue2,vue3)

**应用程序入口模块;**

- createApp(rootComponent).mount('#app')

\****没有compiler编译模块***



## 渲染系统实现

功能一:h函数，用于返回一个VNode对象;

功能二:mount函数，用于将VNode挂载到DOM上;

功能三:patch函数，用于对两个VNode进行对比，决定如何处理新的VNode;

### h函数

直接返回一个VNode对象即可

renderer.js

```js
const h =(tag,props,children)=>{
  //vnode->js对象 {}
  return {
    tag,
    props,
    children
  }
}
```

![image-20220628162913953](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281629984.png)



### mount函数-挂载VNode

mount函数的实现:

- 第一步:根据tag，创建HTML元素，并且存储到vnode的el中;
- 第二步:处理props属性
  - 如果以on开头，那么监听事件; p普通属性直接通过 setAttribute 添加即可;
- 第三步:处理子节点
  - 如果是字符串节点，那么直接设置textContent;
  - 如果是数组节点，那么遍历调用 mount 函数;



```js

const mount = (vnode, container) => {
  //1.创建出真实元素 在vnode上保留el
  const el = vnode.el = document.createElement(vnode.tag)

  // 2.处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]

      //对事件监听的判断
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  //3.处理children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach(item => mount(item, el))//对mount递归调用
    }
  }
  //4.将el挂载到container中
  container.appendChild(el)

}
```

![image-20220628164605651](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281646686.png)



### patch函数-对比两个VNode

patch函数的实现，分为两种情况

#### 不同类型节点

- 找到n1的el父节点，删除原来的n1节点的el;
- 挂载n2节点到n1的el父节点上;

![image-20220628171248967](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281712009.png)



#### 相同类型节点

- **处理props的情况**
  - 先将新节点的props全部挂载到el上;
  - 判断旧节点的props是否不需要在新节点上，如果不需要，那么删除对应的属性

![image-20220629024016931](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206290240016.png)

- **处理children的情况**

  - **如果新节点是一个字符串类型**，~~那么直接调用 el.textContent = newChildren~~
    - 旧节点是一个字符串类型
      - 判断newChildern和old Children是否相等,不相等 调用el.textContent=newChildren
    - 旧节点不是一个字符串类型
      - 直接调用 el.textContent = newChildren

  

  ![image-20220628182250204](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281822234.png)

  - **如果新节点不是一个字符串类型:**
    - **旧节点是一个字符串类型**
      - 将el的textContent设置为空字符串;
      - 旧节点是一个字符串类型，那么直接遍历新节点，挂载到el上;
    - **旧节点也是一个数组类型**(没有考虑vue中的key)
      - 取出数组的最小长度;
      - 遍历所有的节点，新节点和旧节点进行**递归**patch操作;
      - 如果新节点的length更长，那么剩余的新节点进行挂载操作
      - 如果旧节点的length更长，那么剩余的旧节点进行卸载操作;

![image-20220628182219695](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206281822738.png)





**完整代码**

```js

const patch=(n1,n2)=>{ //(old,new)
  if(n1.tag!==n2.tag){//不同类型的节点
    const n1ElParent=n1.el.parentElement
    n1ElParent.removeChild(n1.el);
    mount(n2,n1ElParent)
  }else{//相同类型的节点
    //1.取出element对象,并且在n2中保存
    const el =n2.el=n1.el //n2本来是没有el属性的

    //2.处理props
    const oldProps=n1.props||{} //n1.props如果为空就给个空的对象
    const newProps=n2.props||{} //n2.props如果为空就给个空的对象
    //2.1获取所有的newProps 添加到el
    for(const key in newProps){ //如果value相同就不用赋值
      const oldValue=oldProps[key]
      const newValue=newProps[key]
      if(newValue!==oldValue){
        //对事件监听的判断
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue)
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    for(const key in oldProps){ //判断旧节点的props是否不需要在新节点上
      if(!(key in newProps)){
        el.removeAttribute(key);
      }
      //对事件监听的判断
      if (key.startsWith('on')) {
        const oldValue=oldProps[key]
        el.removeEventListener(key.slice(2).toLowerCase(), oldValue)
      }
    }
    //3.处理children
    const oldChildren =n1.children||[]
    const newChildren =n2.children||[]
      //如果新节点是一个字符串类型
    if(typeof newChildren==='string'){
      if(typeof oldChildren==='string'){//旧节点是一个字符串类型
        if(newChildren!==oldChildren){
          el.textContent=newChildren
        }
      }else{//旧节点是不是字符串类型
        el.innerHTML=newChildren
      }
    }else{//新节点不是一个字符串类型:(数组)
      if(typeof oldChildren==='string'){//旧节点是一个字符串类型
        el.innerHTML=''
        newChildren.forEach(item=>mount(item,el))//遍历新节点，挂载到el上
      }else{//旧节点也是一个数组类型
        //old[v1,v2,v3]
        //new[v1,v3,v4,v5]
        
        //1.公共长度的元素进行递归patch
        const commonLengh=Math.min(oldChildren.length,newChildren.length)
        for(let i =0;i<commonLengh;i++){
          patch(oldChildren[i],newChildren[i])
        }
        //2.newChildren>oldChildren
        if(newChildren.length>oldChildren.length){//新节点的length更长
          newChildren.slice(commonLengh).forEach(item=>mount(item,el))//剩余的新节点进行挂载操作
        }else{//newChildren<oldChildren
          oldChildren.slice(commonLengh).forEach(item=>{
             //unmount()
             el.removeChild(item.el)

          })
        }
      }
    }
  }
}
```



## 依赖收集系统

```
// 响应式依赖的收集 Depend
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }
  addDepend(fn) {
    this.reactiveFns.add(fn)
  }
  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
  depend() {
    activeReaciveFn && this.addDepend(activeReaciveFn)
  }
}

//封装响应式函数
let activeReaciveFn = null
function watchFn(fn) {
  activeReaciveFn = fn
  fn()
  activeReaciveFn = null
}

const targetMap = new WeakMap()
//封装一个获取Depend的函数
function getDepend(target, key) {
  //根据target对象获取map
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
  }
  targetMap.set(target, map)
  //根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)//加入depend
  }
  return depend
}


```

## 创建响应式对象

> Vue3选择Proxy呢?
>
> Object.definedProperty 是劫持对象的属性时，如果新增元素:
>
> - 那么Vue2需要再次 调用definedProperty，而 Proxy 劫持的是整个对象，不需要做特殊处理;
>
> 修改对象的不同:
>
> - 使用 defineProperty 时，我们修改原来的 obj 对象就可以触发拦截
> - 而使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截;
>
> Proxy 能观察的类型比 defineProperty 更丰富
>
> - has:in操作符的捕获器; 
> - deleteProperty:delete 操作符的捕捉器
> - 等等其他操作;
>
> Proxy 作为新标准将受到浏览器厂商重点持续的性能优化
>
> **缺点:Proxy 不兼容IE，也没有 polyfill, defineProperty 能支持到IE9**

目前的响应式是针对于obj一个对象的，我们可以创建出来一个函数，针对所有的对象都可以变成响应式对象:

创建响应式对象函数

```js
//创建响应式对象函数 Proxy +rRflect
function reactive(obj){
  return new Proxy(obj,{//get就收集依赖
    //根据target,key 获取对应的depend
    get:function(target,key,receiver){
    const depend=getDepend(target,key)
    //给depend对象中添加响应式函数
    depend.depend()
    return Reflect.get(target,key,receiver)
  },
  set:function(target,key,newValue,receiver){//set就notify()
    Reflect.set(target,key,newValue,receiver)
    const depend=getDepend(target,key)
    depend.notify()
  }
})
}

```



### VUE3响应式

此时,完成的就是vue3的reactive函数的功能

完整代码:

```js
// 响应式依赖的收集 Depend
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }
  addDepend(fn) {
    this.reactiveFns.add(fn)
  }
  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
  depend() {
    activeReaciveFn && this.addDepend(activeReaciveFn)
  }
}

//封装响应式函数
let activeReaciveFn = null
function watchFn(fn) {
  activeReaciveFn = fn
  fn()
  activeReaciveFn = null
}

const targetMap = new WeakMap()
//封装一个获取Depend的函数
function getDepend(target, key) {
  //根据target对象获取map
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
  }
  targetMap.set(target, map)
  //根据key获取depend对象
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)//加入depend
  }
  return depend
}


//创建响应式对象Proxy +rRflect
function reactive(obj) {
  return new Proxy(obj, {//get就收集依赖
    //根据target,key 获取对应的depend
    get: function (target, key, receiver) {
      const depend = getDepend(target, key)
      //给depend对象中添加响应式函数
      depend.depend()
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {//set就notify()
      Reflect.set(target, key, newValue, receiver)
      const depend = getDepend(target, key)
      depend.notify()
    }
  })
}





// ########TEST#########a

obj = {
  name: 'pithy',//depend对象
  age: 18
}
const objProxy = reactive(obj)

watchFn(function () {
  console.log(objProxy.name, '----');
  console.log(objProxy.name, '++++');
  console.log(objProxy.name, '++++');
})
watchFn(function () {
  console.log(objProxy.age, '####');
})

console.log('-——————————————————————————————————');

```



### VUE2响应式

VUE2监听对象的变化通过 是通过Object.defineProperty的方式

完整代码:

```js
// 响应式依赖的收集 Depend
class Depend{
  constructor(){
    this.reactiveFns=new Set()
  }
  addDepend(fn){
    this.reactiveFns.add(fn)
  }
  notify(){
    this.reactiveFns.forEach(fn=>{
      fn()
    })
  }
  depend(){
    if (activeReaciveFn){
      this.addDepend(activeReaciveFn)
    }
  }
}

//封装响应式函数
let activeReaciveFn=null
function watchFn(fn){
  activeReaciveFn=fn
  fn()
  activeReaciveFn=null
}

const targetMap=new WeakMap()

//封装获取Depend的函数
function getDepend(target,key){
  //根据target对象获取map
  let map = targetMap.get(target)
  if(!map){
    map=new Map()
  }
  targetMap.set(target,map)
  //根据key获取depend对象
  let depend=map.get(key)
  if(!depend){
    depend=new Depend()
    map.set(key, depend)//加入depend
  }
  return depend
}

 
//创建响应式对象 defineProperty
function reactive(obj){
  Object.keys(obj).forEach(key=>{
    let value=obj[key]
    Object.defineProperty(obj,key,{
      get:function(){
        const depend=getDepend(obj,key)
        depend.depend()
        return value
      },
      set:function(newValue){
        value=newValue
        const depend=getDepend(obj,key)
        depend.notify()
      },
    })
  })
  return obj
}



// ########TEST#########

obj={
  name:'pithy',//depend对象
  age:18
}
const objProxy=reactive(obj)

watchFn(function(){
  console.log(objProxy.name,'----');
  console.log(objProxy.name,'++++');
  console.log(objProxy.name,'++++');
})
watchFn(function(){
  console.log(objProxy.age,'####');
})

console.log('-——————————————————————————————————');
objProxy.name='123'
```

## 框架外层API设计

- createApp用于创建一个app对象;
- 该app对象有一个mount方法，可以将根组件挂载到某一个dom元素上;

```js
function createApp(rootComponent) {
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;
      let oldVNode = null;

      watchEffect(function() {
        if (!isMounted) {
          oldVNode = rootComponent.render();
          mount(oldVNode, container);
          isMounted = true;
        } else {
          const newVNode = rootComponent.render();
          patch(oldVNode, newVNode);
          oldVNode = newVNode;
        }
      })
    }
  }
}
```



# 源码阅读 vue+ts视频20到21中间 先跳过了,最后再看!

## createApp

![image-20220629031304649](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206290313705.png)

## 挂载根组件