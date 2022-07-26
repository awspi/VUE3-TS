# 08_TS

全局安装:

```
npm install typescript -g
```



**TypeScript的运行环境**

方式一:通过webpack，配置本地的TypeScript编译环境和开启一个本地服务，可以直接运行在浏览器上

- https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw

```
 npm init
npm i webpack webpack-cli -D
npm i ts-loader -D
npm i typescript -D     
tsc --init
npm i webpack-dev-server -D
npm i html-webpack-plugin -D
```

方式二:通过ts-node库，为TypeScript的运行提供执行环境;

安装ts-node

```
npm install ts-node -g
```

另外ts-node需要依赖 tslib 和 @types/node 两个包:

```
 npm install tslib @types/node -g
```

现在，我们可以直接通过 ts-node 来运行TypeScript的代码:

```
 ts-node math.ts
```



# 变量的声明

在TypeScript中定义变量需要指定 **标识符** 的类型。

声明了类型后TypeScript就会进行**类型检测，**声明的类型可以称之为**类型注解**;

```
 var/let/const 标识符: 数据类型 = 赋值;
```

如我们声明一个message，完整的写法如下:

```ts
const message:string = 'hello'
```

注意:这里的**string**是小写的，和**String**是有区别的

string是TypeScript中定义的字符串类型，String是ECMAScript中定义的一个**类**

## 类型推断

默认情况下进行赋值时, 会将赋值的值的类型, 作为前面标识符的类型

这个过程称之为类型推导/推断

![image-20220701035608583](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207010356617.png)

# JavaScript类型 

## number类型

TypeScript和JavaScript一样，不区分整数类型(int)和浮点型 (double)，统一为number类型。

支持二进制、八进制、十六进制的表示:

```ts
let num: number = 123
num = 222

// num = "123"

let num1: number = 100 
let num2: number = 0b100
let num3: number = 0o100
let num4: number = 0x100

console.log(num1, num2, num3, num4)//100 4 64 256
```

## boolean类型

boolean类型只有两个取值:true和false

```ts
let flag: boolean = true
flag = 20 > 30
```



## string类型

string类型是字符串类型，可以使用单引号或者双引号表示:

同时也支持ES6的模板字符串来拼接变量和字符串:

```ts
let message1: string = 'hello world'
let message2: string = "Hello World"


// 习惯: 默认情况下, 如果可以推导出对应的标识符的类型时, 一般情况下是不加
const name = "why"
const age = 18
const height = 1.88

let message3 = `name:${name} age:${age} height:${height}`
console.log(message3)

export {}

```

## Array类型

数组类型的定义也非常简单，有两种方式:

```ts
// 确定一个事实: names是一个数组类型, 但是数组中存放的是什么类型的元素呢?
// 不好的习惯: 一个数组中在TypeScript开发中, 最好存放的数据类型是固定的(string)
// 类型注解: type annotation
const names1: Array<string> = [] // 不推荐(react jsx中是有冲突   <div></div>)
const names2: string[] = [] // 推荐
```

如果添加其他类型到数组中，那么会报错:



## Object类型

```ts
const info = {//推断
  name: "why",
  age: 18
}

console.log(info.name)

```

object对象类型可以用于描述一个对象

```ts
const info:object = {//推断
  name: "why",
  age: 18
}
```

但是能获取数据，也不能设置数据:

![image-20220701154102691](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207011541724.png)



## null和undefined类型

在 JavaScript 中，undefined 和 null 是两个基本数据类型。

在TypeScript中，它们各自的类型也是undefined和null，也就意味着**它们既是实际的值，也是自己的类型**

```ts
let n1: null = null
let n2: undefined = undefined
```



## Symbol类型

可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值:

```ts
const title1 = Symbol("title")
const title2 = Symbol('title')

const info = {
  [title1]: "程序员",
  [title2]: "老师"
}

export {}

```

# TypeScript类型

## any类型

在某些情况下，我们确实无法确定一个变量的类型，并且可能它会发生一些变化，这个时候我们可以使用any类型(类似于Dart语言中的dynamic类型)。

- 可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法
- 给一个any类型的变量赋值任何的值，比如数字、字符串的值;



```ts
// 当进行一些类型断言 as any
// 在不想给某些JavaScript添加具体的数据类型时(原生的JavaScript代码是一样)
let message: any = "Hello World"

message = 123
message = true
message = {

}

// message()
// message.split(" ")

console.log(message)
const arr: any[] = []


```

如果对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时，缺失了类型注解，这个时候可以使用any:

- 包括在Vue源码中，也会使用到any来进行某些类型的适配

## unknown类型

unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。

```ts
function foo() {
  return "abc"
}

function bar() {
  return 123
}

// unknown类型只能赋值给any和unknown类型
// any类型可以赋值给任意类型

let flag = true
let result: unknown // 最好不要使用any
if (flag) {
  result = foo()
} else {
  result = bar()
}

let message: string = result// Type 'unknown' is not assignable to type 'string'
let num: number = result// Type 'unknown' is not assignable to type 'number'

console.log(result)

export {}

```

## void类型

void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型:

- 我们可以**将null和undefined赋值给void类型**，也就是**函数可以返回null或者undefined**

函数没有写任何类型，那么它默认返回值的类型就是void的，我们也可以显示的来指定返回值是void:

```ts
function sum(num1: number, num2: number): void {//void一般不写
  console.log(num1 + num2)
}

sum(20, 30)
// sum("abc", "cba")

```

## never类型

never 表示永远不会发生值的类型，比如一个函数:

如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗?

- 不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型;

```ts
function foo(): never {
  // 死循环
  while(true) {

  }
}

function bar(): never {
  throw new Error()
}
```

```ts
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log("string处理方式处理message")
      break
    case 'number':
      console.log("number处理方式处理message")
      break
    // case 'boolean':
    //   console.log("boolean处理方式处理message")
    //   break
    default:
      const check: never = message//Type 'boolean' is not assignable to type 'never'.
  }
}
```

## tuple类型

tuple是元组类型

tuple和数组的区别:

- 首先，数组中通常建议存放**相同类型的元素**，不同类型的元素是不推荐放在数组中。(可以放在对象或者元组中)
- 其次，**元组中每个元素都有自己特性的类型**，根据索引值获取到的值可以确定对应的类型;

```js
// tuple元组: 多种元素的组合
// "why" 18 1.88

// 1.数组的弊端
const info: any[] = ["why", 18, 1.88]
const infoObj = {
  name: "why",
  age: 18,
  height: 1.88
}

const name = info[0]
console.log(name.length)


// 2.元组的特点
const info: [string, number, number] = ["why", 18, 1.88]
const name = info[0]
console.log(name.length)
// const age = info[1]
// console.log(age.length)//Property 'length' does not exist on type 'number'.

```

**应用场景**

```ts
// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

function useState(state: any) {
  let currentState = state
  const changeState = (newState: any) => {
    currentState = newState
  }

  const tuple: [any, (newState: any) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)

const [title, setTitle] = useState("abc")

```

**优化**(泛型)

```ts
// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

function useState<T>(state: T) {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  const info: [string, number] = ["abc", 18]
  const tuple: [T, (newState: T) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)
const [title, setTitle] = useState("abc")
const [flag, setFlag] = useState(true)


// type MyFunction = () => void
// const foo: MyFunction = () => {}


```

## enum枚举类型

枚举类型是为数不多的TypeScript特性有的特性之一:

枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型

枚举允许开发者**定义一组命名常量**，常量可以是数字、字符串类型;

```ts
enum Direction {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}
```

```ts
function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.LEFT:
      console.log("改变角色的方向向左")
      break;
    case Direction.RIGHT:
      console.log("改变角色的方向向右")
      break;
    case Direction.TOP:
      console.log("改变角色的方向向上")
      break;
    case Direction.BOTTOM:
      console.log("改变角色的方向向下")
      break;
    default:
      const foo: never = direction;
      break;
  }
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)
```

### 枚举类型的值

枚举类型默认是有值的，比如上面的枚举，默认值是这样的

![image-20220702014514489](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020145545.png)

- 当然，我们也可以给枚举其他值:
- 这个时候会从100进行递增;
- 我们也可以给他们赋值其他的类型:

# 函数

## 参数类型

函数是JavaScript非常重要的组成部分，TypeScript允许我们指定函数的参数和返回值的类型。

参数的类型注解

- 声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型:

```ts

// 给参数加上类型注解: num1: number, num2: number
// 给返回值加上类型注释: (): number
// 在开发中,通常情况下可以不写返回值的类型(自动推导)
function sum(num1: number, num2: number) {
  return num1 + num2
}
```

## 返回值类型

可以添加返回值的类型注解，这个注解出现在函数列表的后面:

```tsx
function sum(num1: number, num2: number):number {
  return num1 + num2
}
```

和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为**TypeScript会根据 return 返回值推断函数的 返回类型:**

- 某些第三方库处于方便理解，会明确指定返回类型，但是这个看个人喜好;

## 匿名函数的参数

匿名函数与函数声明会有一些不同:

当一个函数出现在TypeScript**可以确定该函数会被如何调用**的地方时,**该函数的参数会自动指定类型;**

```ts
// 通常情况下, 在定义一个函数时, 都会给参数加上类型注解的
function foo(message: string) {
}

const names = ["abc", "cba", "nba"]
// item根据上下文的环境推导出来的, 这个时候可以不添加的类型注解
// 上下文中的函数: 可以不添加类型注解
names.forEach(function(item) {
  console.log(item.split(""))
})
```

我们并没有指定item的类型，但是item是一个string类型: 

- 这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型; 
- 这个过程称之为**上下文类型(contextual typing)**，因为函数执行的上下文可以帮助确定参数和返回值的类型;

## 对象类型

限定一个函数接受的参数是一个对象

- 在对象我们可以添加属性，并且告知TypeScript该属性需要是什么类型
- 属性之间可以使用 **`,`** 或者 **`;`** 来分割，最后一个分隔符是可选的;
- 每个属性的类型部分也是可选的，如果不指定，那么就是any类型;

```ts
// Point: x/y -> 对象类型
// {x: number, y: number}
function printPoint(point: {x: number, y: number}) {
  console.log(point.x);
  console.log(point.y)
}

printPoint({x: 123, y: 321})
```

## ?:可选类型

对象类型也可以指定哪些属性是可选的，可以在属性的后面添加一个**`?:`**

```ts
// Point: x/y/z -> 对象类型
// {x: number, y: number, z?: number}
function printPoint(point: {x: number, y: number, z?: number}) {
  console.log(point.x)
  console.log(point.y)
  console.log(point.z)
}

printPoint({x: 123, y: 321})
printPoint({x: 123, y: 321, z: 111})
```

### 可选类型补充

可选类型可以看做是 **类型** 和 **undefined** 的联合类型:

```js
// 让一个参数本身是可选的
// 一个参数一个可选类型的时候, 它其实类似于是这个参数是 类型|undefined 的联合类型
// function foo(message: string|undefined) {
//   console.log(message)
// }

function foo(message?: string) {
  console.log(message)
}

foo()

```





# |联合类型

TypeScript的类型系统允许我们使用多种运算符，从现有类型中构建新类型。

第一种组合类型的方法:联合类型(Union Type)

- 联合类型是由两个或者多个其他类型组成的类型;
- 表示可以是这些类型中的任何一个值
- 联合类型中的每一个类型被称之为联合成员(union's members);

![495305F3A85484EC24F341177CD3B448](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207011648850.jpg)

传入给一个联合类型的值是非常简单的:**只要保证是联合类型中的某一个类型的值即可**

但是我们拿到这个值之后，我们应该如何使用它呢?因为它可能是任何一种类型。

- 比如我们拿到的值可能是string或者number，我们就不能对其调用string上的一些方法;

那么我们怎么处理这样的问题呢?

- 我们需要使用缩小(narrow)联合
  - TypeScript可以根据我们缩小的代码结构，推断出更加具体的类型;

```ts
// number|string 联合类型
function printID(id: number|string|boolean) {
  // 使用联合类型的值时, 需要特别的小心
  // narrow: 缩小
  if (typeof id === 'string') {
    // TypeScript帮助确定id一定是string类型
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

printID(123)
printID("abc")
printID(true)

```

# type类型别名

当我们想要多次在其他地方使用对象类型和联合类型，就要重复写多次。可以使用别名:

**type**用于定义类型别名(type alias)

```ts
// type用于定义类型别名(type alias)
type IDType = string | number | boolean

type PointType = {
  x: number
  y: number
  z?: number
}

function printId(id: IDType) {
}

function printPoint(point: PointType) {
}

```

# as类型断言

有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言(Type Assertions)

比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它具体的类型:

TypeScript只允许类型断言转换为 更具体 或者 不太具体 的类型版本，**此规则可防止不可能的强制转换:**

```ts
// <img id="why"/>

// 1.类型断言 as
const el = document.getElementById("why") as HTMLImageElement
el.src = "url地址"
```

```ts
// 2.另外案例: Person是Student的父类
class Person {
}

class Student extends Person {
  studying() {}
}

function sayHello(p: Person) {
  (p as Student).studying()
}

const stu = new Student()
sayHello(stu)

```

```ts
// 3.了解: as any/unknown 任意类型互相转换
const message = "Hello World"
const num: number = (message as unknown) as number
```

# !非空类型断言

当我们编写下面的代码时，在执行ts的编译阶段会报错:

```ts
function printMessageLength(message?: string) {
  console.log(message.length)
}
printMessageLength("aaaa")
```

- 这是因为传入的message有可能是为undefined的，这个时候是不能执行方法的;

如果确定传入的参数是有值的，这个时候我们可以使用非空类型断言

非空断言使用的是 **`!`** ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测;

```ts
console.log(message!.length)
```

# ?.可选链

可选链使用可选链操作符 **`?.`**

它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行

![image-20220701175759826](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207011757863.png)

# ??和!!的作用

**`!!`**操作符:

- 将一个其他类型转换成boolean类型
- 类似于Boolean(变量)的方式;

```ts
const message = "Hello World"
const flag = !!message //相当于两次取反
console.log(flag)//true
```

**`??`**操作符:(ES11)

- 空值合并操作符(**`??`**)是一个逻辑操作符，**当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数**， 否则返回左侧操作数;

# 字面量类型

除了前面的类型之外，也可以使用字面量类型(literal types):

```
// "Hello World"也是可以作为类型的, 叫做字面量类型
const message: "Hello World" = "Hello World"

// let num: 123 = 123
// num = 321 X
```

 默认情况下这么做是没有太大的意义的，但是我们可以将多个类型联合在一起; **类似枚举**

```js
// 字面量类型的意义, 就是必须结合联合类型
type Alignment = 'left' | 'right' | 'center'

let align: Alignment = 'left'
align = 'right'
align = 'center'

// align = 'hehehehe' X
```



## 字面量推理

```ts
type Method = 'GET' | 'POST'
function request(url: string, method: Method) {}
const options = {
  url: "https://www.coderwhy.org/abc",
  method: "POST"
} 

request(options.url, options.method)
```

![image-20220701181602995](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207011816051.png)

进行字面量推理的时候，options其实是**`{url: string, method: string}`**

解决方法1

```ts
request(options.url, options.method as Method)
```

2

```ts
const options = {
  url: "https://www.coderwhy.org/abc",
  method: "POST"
} as const

request(options.url, options.method)
```

3

```ts
type Request = {
  url: string,
  method: Method
}
const options:Request = {
  url: "https://www.coderwhy.org/abc",
  method: "POST"
}
```

