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