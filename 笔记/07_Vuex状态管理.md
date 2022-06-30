# 07_Vuex状态管理

![image-20220630004713760](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300047793.png)

**Vuex的安装**

```
 npm install vuex@next
```

## 单一状态树

Vuex 使用**单一状态树**:

- 用一个对象就包含了全部的应用层级的状态
- 采用的是SSOT，Single Source of Truth，也可以翻译成单一数据源
- 这也意味着，每个应用将仅仅包含一个 store 实例;
- 单状态树和模块化并不冲突，后面我们会讲到module的概念;

单一状态树的优势:

- 如果你的状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难
- 所以Vuex也使用了单一状态树来管理应用层级的全部状态;
- 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便 的管理和维护;

# Vue devtool

https://chrome.pictureknow.com/extension?id=d50143a5f53d406dbe992277bfc90521

# Store

## 创建Store

每一个Vuex应用的核心就是store(仓库):

store本质上是一个容器，它包含着你的应用中大部分的状态(state);

 **Vuex和单纯的全局对象有什么区别呢?** 

- 第一**:Vuex的状态存储是响应式的**
  - 当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会被更新;
- 第二:**不能直接改变store中的状态**
  - 改变store中的状态的唯一途径就显示**提交 (commit) mutation**;
  - 这样使得我们可以方便的跟踪每一个状态的变化，从而让我们能够通过一些工具帮助我们更好的管理应用的状态;

**使用步骤:**

- 创建Store对象;
- 在app中通过插件安装;

![image-20220630013254961](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300132996.png)

## 组件中使用store

 在组件中使用store，我们按照如下的方式

- 在模板中使用;
- 在options api中使用，比如computed
- 在setup中使用;

![image-20220630013350443](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300133468.png)

如果觉得那种方式有点繁琐(表达式过长)，我们可以使用计算属性:

![image-20220630021848678](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300218710.png)

## mapState

如果我们有很多个状态都需要获取话，可以使用**mapState**的辅助函数

- mapState的方式一:**对象类型;**
- mapState的方式二:**数组类型;**
- 也可以**使用展开运算符和来原有的computed混合在一起;**

![image-20220630023232853](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300232880.png)

### 在setup中使用mapState

默认情况下，Vuex并没有提供非常方便的使用mapState的方式，这里我们进行了一个函数的封装:

![image-20220630030734966](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206300307996.png)

## getters

某些属性我们可能需要经过变化后来使用，这个时候可以使用getters:

![image-20220630153601085](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301536138.png)

getters中的函数本身，可以返回一个函数，那么在使用的地方相当于可以调用这个函数:

![image-20220630154322975](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301543014.png)

## mapGetters

可以使用mapGetters的辅助函数。

![image-20220630155222987](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301552020.png)

###  在setup中使用

![image-20220630163154960](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301631004.png)



# Mutation

## 重要原则

一条重要的原则就是要**记住 mutation 必须是同步函数**

- 这是因为devtool工具会记录mutation的日记;
- 每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照
- 但是在mutation中执行异步操作，就无法追踪到数据的变化
- 所以Vuex的重要原则中要求 mutation必须是同步函数;



更改 Vuex 的 store 中的状态的唯一方法是提交 mutation:

![image-20220630171753713](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301717750.png)

**对象风格的提交方式**

![image-20220630172550403](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301725460.png)



## 携带数据

![image-20220630172202654](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301722696.png)

**payload为对象类型**

![image-20220630172745057](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301727096.png)



## 常量类型

1. 定义常量:mutation-type.js
2. 定义mutation
3. 提交mutation

![image-20220630173839483](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301738528.png)



## mapMutations辅助函数

借助于辅助函数，帮助我们把mutation快速映射到对应的方法中:

![image-20220630174917135](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301749189.png)

在**setup**中使用也是一样的:

![image-20220630175319319](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202206301753363.png)

# Action

Action类似于mutation，不同在于:

- Action提交的是mutation，而不是直接变更状态
- Action可以包含任意异步操作;

