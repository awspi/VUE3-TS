const h = (tag, props, children) => {
  //vnode->js对象 {}
  return {
    tag,
    props,
    children
  }
}

const mount = (vnode, container) => {
  //1.创建出真实元素 在vnode上保留el
  const el = vnode.el = document.createElement(vnode.tag) //把el也挂载到vnode上

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
    //2.2 删除旧的props
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