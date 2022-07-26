#  04_Compositon-API

> **Options API的弊端**
>
> 在Vue2中，我们**编写组件的方式是Options API**:
>
> Options API的一大特点就是在对应的属性中编写对应的功能模块;
>
> 比如data定义数据、methods中定义方法、computed中定义计算属性、watch中监听属性改变，也包括生命 周期钩子;
>
> **但是这种代码有一个很大的弊端:**
>
> - 当我们实现某一个功能时，这个功能对应的代码逻辑会被拆分到各个属性中;
> - 当我们组件变得更大、更复杂时，那么同一个功能的逻辑就会被拆分的很分散; 
>
> 

目的:将同一个逻辑关注点相关的代码收集在一起

# setup 函数

**其实就是组件的另外一个选项:**

- 可以用它来替代之前所编写的大部分其他选项(methods、computed、watch、data、生命周期等等;)

## 基本使用

### setup函数的参数

- 第一个参数:props
- 第二个参数:context

props是父组件传递过来的属性会被放到props对象中，我们在setup中如果需要使用，那么就可以直接通过props参数获取:

- 对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义;
- 并且在template中依然是可以正常去使用props中的属性，比如message;
- 如果我们在setup函数中想要使用props，那么不可以通过 this 去获取
- 因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可;

context参数，我们也称之为是一个**SetupContext**，它里面**包含三个属性**:

- attrs:所有的非prop的attribute;
- slots:父组件传递过来的插槽(这个在以渲染函数返回时会有作用); 
- pemit:当我们组件内部需要发出事件时会用到emit(因为我们不能访问this，所以不可以通过 this.$emit发出事件);



### setup函数的返回值

setup既然是一个函数，那么它也可以有**返回值**，**它的返回值用来做什么呢?** 

- setup的返回值可以**在模板template中被使用;**
- 也就是说我们可以**通过setup的返回值来替代data选项;**

可以**返回一个执行函数**来**代替在methods中定义的方法**:

![image-20220624202651006](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242026040.png)

- 将 counter 在 increment 或者 decrement进行操作时，**是否可以实现界面的响应式呢?**   答案是不可以;
- 这是因为对于一个定义的变量来说，默认情况下，Vue并不会跟踪它的变化，来引起界面的响应式操作;

### setup不可以使用this

this并没有指向当前组件实例,并且在setup被调用之前，data、computed、methods等都没有被解析,所以无法在setup中获取this;



# Reactive API

 如果想为在setup中定义的数据提供响应式的特性，那么我们可以**使用reactive的函数**:

- 当我们使用reactive函数处理我们的数据之后，数据**再次被使用时**就会**进行依赖收集**
- 当**数据发生改变**时，**所有收集到的依赖**都是**进行对应的响应式操作**(比如更新界面);
- 事实上，我们编写的data选项，也是在内部交给了reactive函数将其编程响应式对象的;

![image-20220624204008483](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242040510.png)

# Ref API

**reactive** API对**传入的类型是有限制的**，它要求我们必须传入的是**一个对象或者数组类型**:

**ref API**会返回一个可变的响应式对象，该对象作为一个 **响应式的引用** 维护着它内部的值，这就是ref名称的来源(reference);

- 它内部的值是在ref的 value 属性中被维护的;
- 默认是深层的响应式,浅层的可以用shallowRef

**注意事项:** 

- **在模板中引入ref的值**时，Vue会**自动帮助我们进行解包**操作，所以我们并**不需要在模板中*通过 ref.value 的方式来使用;***
- 但是**在setup 函数内部，它依然是一个 ref引用**， 所以对其进行操作时，我们依然需要使用 **ref.value**的方式;

![image-20220624205121877](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242051918.png)

## Ref自动解包

*22.6.24都可以了 还没看文档*

~~**模板中的解包是浅层的解包**~~

- ~~**只能一层~~**

**测试发现可以解包出来**

![image-20220624210044991](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242100015.png)

如果我们**将ref放到一个reactive的属性**当中，那么**在模板中使用时，它会自动解包**:

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242102274.png" alt="image-20220624210207242" style="zoom:50%;" />



## ref其他的API

**unref**

- 如果我们想要**获取一个ref引用中的value**，那么也可以**通过unref方法**: 
- 如果参数是一个 ref，则返回内部值，否则返回参数本身;
- 这是 **`val = isRef(val) ? val.value : val`** 的语法糖函数;

**isRef**

- 判断值是否是一个ref对象。

**shallowRef** 

- 创建一个浅层的ref对象;

![image-20220626181132042](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206261811149.png)

**triggerRef**

- **手动触发和 shallowRef 相关联的副作用:**

![image-20220626181358554](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206261813614.png)



## customRef

创建一个**自定义的ref**，并**对其依赖项跟踪和更新触发**进行**显示控制**:

- 它需要一个工厂函数，该函数接受 track 和 trigger 函数作为参数
- 并且应该返回一个带有 get 和 set 的对象;

**案例:双向绑定的属性进行debounce(节流)的操作;**

```
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
```



# readonly

reactive或者ref可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方(组件)的这个响应式对象希望在另外一个地方(组件)被使用，但是不能被修改，可以使用**readonly**的方法;

![image-20220624211840924](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242118967.png)



**readonly方法会传入三个类型的参数:** 

- 类型一:普通对象;
- 类型二:reactive返回的对象;
- 类型三:ref的对象;

![image-20220624211203392](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242112419.png)

![image-20220624211344404](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242113439.png)

## readonly的使用

在readonly的使用过程中，有如下规则:

- readonly返回的对象都是不允许修改的;
- 但是经过readonly处理的**原来的对象**是允许被修改的;
  - 比如 const info = readonly(obj)，info对象是不允许被修改的; 
  - **当obj被修改时，readonly返回的info对象也会被修改;**
- 但是我们不能去修改readonly返回的对象info;
- **其实本质上就是readonly返回的对象的setter方法被劫持了而已**

<img src="https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206242107275.png" alt="readonly内部原理" style="zoom:67%;" />

- readonly会返回原生对象的只读代理(也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不 能对其进行修改);

# Reactive判断的API

- **isProxy**
  - 检查对象是否是由 reactive 或 readonly创建的 proxy。
- **isReactive**
  - 检查对象是否是由 reactive创建的响应式代理:
  - 如果该代理是 readonly 建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true;
- **isReadonly**
  - 检查对象是否是由 readonly 创建的只读代理。
- **toRaw**
  - 返回 reactive 或 readonly 代理的原始对象(不建议保留对原始对象的持久引用。请谨慎使用)。
- **shallowReactive**
  - 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。
- **shallowReadonly**
  - 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换(深层还是可读、可写的)。

## toRefs

**必须是响应式对象(reactive)**

如果我们使用**ES6的解构语法**，对**reactive返回的对象进行解构获取值**，那么之后无论是**修改结构后的变量**，还是**修改reactive**返回的state对象，**数据都不再是响应式**的:

![image-20220626174730468](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206261747711.png)

**toRefs**的函数，可以**将reactive返回的对象中的属性都转成ref;** 

![image-20220626175144833](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206261751062.png)

## toRef

**必须是响应式对象(reactive)**

只希望转换一个**reactive对象中的属性为ref**, 那么可以**使用toRef的方法**:

```js
      //toRefs:将reactive对象中的所有属性都转成ref 建立连接
      // let {age,name}=toRefs(info)
      //toRef:对其中一个属性进行转换ref
      const info=reactive({
        name:'pithy',
        age:22
      })
      //toRefs:将reactive对象中的所有属性都转成ref 建立连接
      // let {age,name}=toRefs(info)
      //toRef:对其中一个属性进行转换ref
      let age=toRef(info,"age")//不加{}
```

# computed计算属性

当我们的某些属性是依赖其他状态时，我们可以使用计算属性来处理

> - 在前面的Options API中，我们是使用computed选项来完成的;
> - 在Composition API中，我们可以在 setup 函数中使用 computed 方法来编写一个计算属性;

方式一:**接收一个getter函数，并为 getter 函数返回的值**，返回一个**不变的** ref 对象

方式二:**接收一个具有 get 和 set 的对象**，返回一个可变的(**可读写**)ref 对象;

**computed返回值是个ref**

```js
    setup(){
      const firstName=ref('ab')
      const lastName=ref('cd')
      //1.传入函数 //只可读
      // const fullName=computed(()=>firstName.value+" "+lastName.value)
      //2.传入对象 可读写
      const fullName=computed({
        get:()=>{
          return firstName.value+" "+lastName.value
        },
        set:(newVal)=>{
          const names=newVal.split(" ")
          firstName.value=names[0]
          lastName.value=names[1]
        }
      })
```

# 侦听数据的变化

在Options API中，我们可以通过watch选项来侦听data或者props的数据变化，当数据变化时执行某一些操作。

在Composition API中，我们可以使用**watchEffect**和**watch**来完成响应式数据的侦听

- watchEffect用于**自动收集**响应式数据的依赖;
- watch需要**手动指定**侦听的数据源;

## watchEffect

当侦听到某些响应式数据变化时，我们希望执行某些操作，这个时候可以使用 watchEffect。

- 首先，watchEffect传入的函数会被立即执行一次，并且在执行的过程中会收集依赖
- 其次，只有收集的依赖发生变化时，watchEffect传入的函数才会再次执行;

```js
      watchEffect(()=>{//watchEffect传入的函数会被立即执行一次
        console.log("name:"+name.value);
      })
```



### 停止侦听

如果在发生某些情况下，我们希望停止侦听，这个时候我们可以获取watchEffect的返回值函数，调用该函数即可

```js
      //调用返回函数即可停止监听
      const stopWatch=watchEffect(()=>{//watchEffect传入的函数会被立即执行一次
        console.log("age:"+age.value);
        if(age.value==25){
          stopWatch()
        }
      })
```

![](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262006944.png)



### 清除副作用

> **什么是清除副作用?**
>
> 比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器，或者侦听器侦听函数被再次执行了。
>
> 那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用;

在我们给watchEffect传入的函数被回调时，其实可以获取到一个参数:**onInvalidate**

当**副作用即将重新执行**或者**侦听器被停止时**会执行该函数传入的回调函数;

我们可以在传入的回调函数中，执行一些清除工作;

```
      const stopWatch=watchEffect((onInvalidate)=>{
        console.log("age:"+age.value);
        onInvalidate(()=>{
          console.log('---------');
        })
      })
```

![image-20220626201704128](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262017169.png)

![image-20220626201820365](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262018407.png)



### 执行时机

> ### setup中使用ref
>
> 定义一个ref对象，绑定到元素或者组件的ref属性上即可;
>
> ![image-20220626202639699](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262026728.png)
>
> 

默认情况下，组件的更新会在副作用函数执行之前:

如果我们希望在副作用函数中获取到元素，是否可行呢?

![image-20220626202818915](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262028950.png)

结果打印了两次:

这是因为**setup函数在执行时就会立即执行传入的副作用函数**，这个时候DOM并没有挂载，所以打印为null;

而当DOM挂载时，会给title的ref对象赋值新的值，副作用函数会再次执行，打印出来对应的元素;

![image-20220626202945096](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262029124.png)

#### 调整执行时机flush

watchEffect接收第二个参数是个对象,其中flush 选项可以设置副作用函数的执行时机:

flush 选项

- **pre** 默认值是，它会在元素 **挂载** 或者 **更新** **之前执行;**
- **post** 在元素 **挂载** 或者 **更新** **之后执行;**
- **sync** 强制始终同步触发。然而，这是低效的，应该很少需要。

## Watch

watch的API完全等同于组件watch选项的Property:

- watch**需要侦听特定的数据源，并在回调函数中执行副作用;**
- 默认情况下它是**惰性**的，**只有当被侦听的源发生变化时才会执行回调;**

与watchEffect的比较，watch允许我们:

- 懒执行副作用(第一次不会直接执行);
- 更具体的说明**当哪些状态发生变化时**，触发侦听器的执行; 
- 访问侦听状态变化前后的值;

### **侦听单个数据源**

watch侦听函数的数据源有两种类型:

- **一个getter函数**:但是该getter函数必须引用可响应式的对象(比如reactive或者ref);
- 直接写入一个可响应式的对象，reactive或者ref(比较常用的是ref);

**侦听响应式对象**

如果我们希望侦听一个数组或者对象，那么可以**使用一个getter函数，**并且**对可响应对象/数组进行解构:**

```js
      const info=reactive({name:'pithy',age:22})      
			watch(()=>{
        return {...info}//gettter函数 reactive对象会被解构成普通键值对
        //{name: 'pithy', age: 22}
      },(newVal,oldVal)=>{
         console.log("oldVal:"+oldVal+" newVal:"+newVal);
      })
```



**watch的使用**

```js
      const info=reactive({name:'pithy',age:22})
      //1.watch传入getter函数
      watch(()=>info.name,(newVal,oldVal)=>{
        console.log("oldVal:"+oldVal+" newVal:"+newVal);
      })
```

```js
      //2.1.1watch传入reactive对象,获取到的oldValue和newValue都是reactive对象
      watch(info,(newVal,oldVal)=>{
        console.log("oldVal:"+oldVal+" newVal:"+newVal);
        //oldVal:[object Object] newVal:[object Object]
      })
```

```js
      //2.1.2如果希望newValue和oldValue是一个普通对象
      watch(()=>{
        return {...info}//gettter函数 reactive对象会被解构成普通键值对
        //{name: 'pithy', age: 22}
      },(newVal,oldVal)=>{
         console.log("oldVal:"+oldVal+" newVal:"+newVal);
      })
```

```js
      //2.2watch传入的是ref,获取的oldValue和newValue都是value值本身
      const name= ref('pithy')
      watch(name,(newVal,oldVal)=>{
        console.log("oldVal:"+oldVal+" newVal:"+newVal);
        //oldVal:[object Object] newVal:[object Object]
      })
```

### 侦听多个数据源

侦听器还可以使用**数组**同时侦听多个源:

```js
      const info=reactive({name:'pithy',age:22})
      const title=ref('hello')
      //对info解构一下
      watch([()=>({...info}),title],([newInfo,newTitle],[oldInfo,oldTitle])=>{
        //console.log("oldVal:",[newInfo,newTitle]," newVal:",[oldInfo,oldTitle]);
        //oldVal: (2) [Proxy, 'hello']  newVal: (2) [Proxy, 'hello']
      })
```

![image-20220626231611895](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262316944.png)



**深度监听**

如果我们希望侦听一个深层的侦听，那么需要设置 **deep** 为true:

也可以传入 **immediate** 立即执行;

![image-20220626233452622](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206262334670.png)

```js
      const info=reactive({
        name:'pithy',
        age:22,
        friend:{
          one:'zxy2021.4.15-2022.6.25'
        }
        },)
      //
      watch(()=>({...info}),(newInfo,oldInfo)=>{
        console.log("oldVal:",newInfo?.friend," newVal:",oldInfo?.friend)
      },{//深度监听 oldValue会指向新的
        deep:true,
        immediate:true
      })

```



# 生命周期钩子

setup可以用来替代 data 、 methods 、 computed 、watch 等等这些选项，也可以替代生命周期钩子。

那么setup中如何使用生命周期**函数**呢? 

可以使用直接导入的 **`onX 函数`**注册生命周期钩子;

- **允许注册多次生命周期钩子,都会执行**
- **beforeCreate和created不需要注册,直接写在setup函数里**

![image-20220627004625298](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206270046344.png)

```
import {onMounted,onUpdated,ref} from 'vue'
  export default {
    setup(){
      let counter=ref(0)
      const increment=()=>{
        counter.value++
      }
      onMounted(()=>{
        console.log('onMounted');
      })
      onUpdated(()=>{
        console.log('onUpdated');
      })
     }
    }
```

![image-20220627011706128](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206270117190.png)

# Provide和Inject

事实上我们之前还学习过Provide和Inject，Composition API也可以替代之前的 Provide 和 Inject 的选项。 **默认没有响应式**

## Provide函数

可以通过 provide 方法来定义每个 Property

**provide可以传入两个参数:**

- name:提供的属性名称
- value:提供的属性值;

```js
    setup(){
      let name='pithy'
      provide('name',name)
      let counter=0
      provide('counter',counter)
    }
```



## Inject函数

在 后代组件 中可以通过 inject 来注入需要的属性和对应的值

**inject可以传入两个参数:**

- 需要 inject 的 property 的 name
- 默认值;

```js
    setup(){
      let name=inject('name','默认值')
      let counter=inject('counter')
      return {
        name,counter
      }
    }
```



## 数据的响应式

为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 和 reactive。

```js
      let name=ref('pithy')//ref包裹 实现响应式
      provide('name',name)
      let counter=ref(0)
      provide('counter',counter)
```

**数据单向性,不让子组件修改,provide时用readonly包裹**

![image-20220627014032157](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206270140205.png)

### **修改响应式Property**

如果我们需要修改可响应的数据，那么最好是在数据提供的位置来修改:

将修改方法进行共享，在后代组件中进行调用;

```js
//父
      const changeCounter=()=>{
        counter.value++
      }
      provide('changeCounter',changeCounter)
//子
      const changeCounter=inject('changeCounter')
```



# compositonAPI案例

## useCounter

![image-20220627021227306](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206270212364.png)



## useTitle

改变页面标题的hook

![image-20220627022626483](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206270226542.png)

## useScrollPosition

获取页面滚动数据的hook

![image-20220627024052372](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206270240440.png)

## useLocalStorage

使用 localStorage 存储和获取数据的Hook:

![image-20220627140427661](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271404721.png)



# setup顶层编写方式

https://v3.cn.vuejs.org/api/sfc-spec.html#%E9%A2%84%E5%A4%84%E7%90%86

![image-20220627145517947](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271455016.png)



# h函数

![render函数的作用](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271648641.png)

接受三个参数:

![image-20220627152835559](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271528632.png)

 **注意事项:**

- 如果没有**props**，那么通常可以**将children作为第二个参数传入**;
- 如果**会产生歧义，可以将null作为第二个参数传**入，将**children作为第三个参数传入**;



## h函数的基本使用

 **h函数可以在两个地方使用:**

- render函数选项中;
- setup函数选项中(setup本身需要是一个函数类型，函数再返回h函数创建的VNode);

## render函数实现计数器

![image-20220627160610851](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271606912.png)

## setup函数实现计数器

![image-20220627162040116](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271620181.png)

## 函数组件和插槽的使用

![image-20220627163523851](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271635917.png)

# jsx

vue脚手架默认支持了,不需要安装插件了

jsx使用的不是mustache语法

jsx的babel配置

 jsx我们通常会通过Babel来进行转换(React编写的jsx就是通过babel转换的);

对于Vue来说，我们只需要在Babel中配置对应的插件即可;

安装**Babel支持Vue的jsx插件**:

```
npm install @vue/babel-plugin-jsx -D
```

在**babel.config.js配置文件**中配置插件:

![image-20220627171308091](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271713182.png)



## jsx计数器案例

![image-20220627171355641](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271713716.png)



## jsx组件的使用

![image-20220627172103807](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206271721893.png)

# 自定义指令

在Vue的模板语法中我们学习过各种各样的指令:v-show、v-for、v-model等等，除了使用这些指令之外，**Vue 也允许我们来自定义自己的指令。**

- 注意:在Vue中，**代码的复用和抽象主要还是通过组件;**
- 通常在某些情况下，你需要**对DOM元素进行底层操作**，这个时候就会用到**自定义指令;**

**自定义指令分为两种:**

- **自定义局部指令**: 组件中通过 directives 选项，只能在当前组件中使用
- **自定义全局指令**: app的 directive 方法，可以在任意组件中被使用;

## 指令的生命周期

- **created**:在绑定元素的 attribute 或事件监听器被应用之前调用;
  - ~~**多个组件的话,bindings.value会被最后一个传值了的的组件取代**~~
- **beforeMount**:当指令第一次绑定到元素并且在挂载父组件之前调用
- **mounted**:在绑定元素的父组件被挂载后调用
- **beforeUpdate**:在更新包含组件的 VNode 之前调用
- **updated**:在**包含组件的 VNode 及其子组件的 VNode** 更新后调用
- **beforeUnmount**:在卸载绑定元素的父组件之前调用;
- **unmounted**:当指令与元素解除绑定且父组件已卸载时，只调用一次;

## 指令的参数和修饰符

在生命周期中，我们可以**通过 bindings 获取到对应的内容**:

![image-20220628020230891](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206280202967.png)

## 案例1——实现方式

当某个元素挂载完成后可以自定获取焦点

### 默认的实现方式

```js
<template>
  <div>
    <input type="text" ref="input">
  </div>
</template>
<script>
  import {ref,onMounted} from 'vue'

  export default {
    setup(){
      const input=ref(null)
      onMounted(()=>{
        input.value.focus()
      })
      return{
        input
      }
    }
  }
</script>

<style scoped>

</style>
```

### 局部指令

```js
<template>
  <div>
    <input type="text" v-focus>
  </div>
</template>
<script>
  import {ref,onMounted} from 'vue'

  export default {
    directives:{
      focus:{
        mounted(el,bindings,vnode,preVnode){
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>

</style>
```

### 全局指令

![image-20220628014217578](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206280142252.png)

## 案例2——时间格式化

(用dayjs库)

将时间戳转换成具体格式化的时间

在Vue3中我们可以通过 计算属性(computed) 或者自定义一个方法(methods) 来完成,还可以通过一个自定义的指令来完成;

![image-20220628025017627](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206280250682.png)



# Teleport

> 在组件化开发中，我们封装一个组件A，在另外一个组件B中使用:
>
> - 那么组件A中template的元素，会被挂载到组件B中template的某个位置;
> - 最终我们的应用程序会形成一颗DOM树结构;
>
> 但是某些情况下，我们希望组件不是挂载在这个组件树上的，可能是移动到Vue app之外的其他位置: 
>
> - 比如移动到body元素上，或者我们有其他的div#app之外的元素上;
>
> 这个时候我们就可以通过teleport来完成;

**Teleport是一个Vue提供的内置组件，类似于react的Portals**

teleport翻译过来是心灵传输、远距离运输的意思;

它有两个属性:

- **to**:指定将其中的内容移动到的目标元素，可以使用选择器
- **disabled**:是否禁用 teleport 的功能;

**teleport也可以和组件结合一起来使用:** 

如果我们将**多个teleport应用**到**同一个目标上(to的值相同)**，那么这些**目标会进行合并**:

![image-20220628033201626](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206280332688.png)



# Vue插件

> 
>
> 插件可以完成的功能没有限制，比如下面的几种都是可以的:
>
> - 添加全局方法或者 property，通过把它们添加到 config.globalProperties 上实现
> - 添加全局资源:指令/过滤器/过渡等;
> - 通过全局 mixin 来添加一些组件选项;
> - 一个库，提供自己的 API，同时提供上面提到的一个或多个功能;

通常我们向Vue全局添加一些功能时，会采用插件的模式，它有两种编写方式

- 对象类型:一个对象，但是必**须包含一个 install 的函数**，该函数会在安装插件时执行
- 函数类型:一个**function**，这个函数会在安装插件时自动执行;

![image-20220628035221197](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206280352276.png)



![image-20220628034748893](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206280347977.png)





# nexttick

官方解释:将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它

> 比如我们有下面的需求:
>
> 点击一个按钮，我们会修改在h2中显示的message
>
> message被修改后，获取h2的高度;

实现上面的案例我们有三种方式:

- 方式一:在点击按钮后立即获取到h2的高度(错误的做法)
- 方式二:在updated生命周期函数中获取h2的高度(但是其他数据更新，也会执行该操作)
- 方式三:**使用nexttick函数;**

![image-20220701013646978](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207010136049.png)

nextTick**在DOM更新之后**再立即调用传入的函数

![image-20220701013835817](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207010138868.png)

