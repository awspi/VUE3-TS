# 04_Compositon-API

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

reactive API对**传入的类型是有限制的**，它要求我们必须传入的是**一个对象或者数组类型**:

**ref API**会返回一个可变的响应式对象，该对象作为一个 **响应式的引用** 维护着它内部的值，这就是ref名称的来源(reference);

- 它内部的值是在ref的 value 属性中被维护的;

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