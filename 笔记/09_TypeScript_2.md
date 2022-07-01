# 类型缩小

什么是类型缩小呢?Type Narrowing;

- 我们可以通过类似于 typeof padding === "number" 的判断语句，来改变TypeScript的执行路径
- 在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为 缩小;
- 而我们编写的 typeof padding === "number 可以称之为 **类型保护(type guards);**

常见的类型保护有如下几种: 

- typeof
- 平等缩小(比如===、!==)
- instanceof
- in

## typeof

在 TypeScript 中，检查返回的值typeof是一种类型保护:因为 TypeScript 对如何typeof操作不同的值进行编码。

```ts
// 1.typeof的类型缩小
type IDType = number | string
function printID(id: IDType) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}
```

## 平等缩小

可以使用Switch或者相等的一些运算符来表达相等性(比如===, !==, ==, and != ):

```ts
// 2.平等的类型缩小(=== == !== !=/switch)
type Direction = "left" | "right" | "top" | "bottom"
function printDirection(direction: Direction) {
  // 1.if判断
  if (direction === 'left') {
    console.log(direction)
  } else if (direction === 'right'){}

  // 2.switch判断
  switch (direction) {
    case 'left':
      console.log(direction)
      break;
    // case ...
  }
}
```

## instanceof

检查一个值是否是另一个值的“实例”:

```ts
// 3.instanceof
function printTime(time: string | Date) {
  if (time instanceof Date) {
    console.log(time.toUTCString())
  } else {
    console.log(time)
  }
}
```

```ts
class Student {
  studying() {}
}

class Teacher {
  teaching() {}
}

function work(p: Student | Teacher) {
  if (p instanceof Student) {
    p.studying()
  } else {
    p.teaching()
  }
}

const stu = new Student()
work(stu)
```

## in

```ts
// 4. in
type Fish = {
  swimming: () => void
}

type Dog = {
  running: () => void
}

function walk(animal: Fish | Dog) {
  if ('swimming' in animal) {
    animal.swimming()
  } else {
    animal.running()
  }
}

const fish: Fish = {
  swimming() {
    console.log("swimming")
  }
}

walk(fish)

```

# 函数详解

在JavaScript开发中，函数是重要的组成部分，并且函数可以作为一等公民(可以作为参数，也可以作为返回值进 行传递)。

## 函数类型

可以编写函数类型的表达式(Function Type Expressions)，来表示函数类型;

```ts
// 1.函数作为参数时, 在参数中如何编写类型
function foo() {}

type FooFnType = () => void
function bar(fn: FooFnType) {
  fn()
}

bar(foo)
```

```ts
// 2.定义常量时, 编写函数的类型
type AddFnType = (num1: number, num2: number) => number
const add: AddFnType = (a1: number, a2: number) => {
  return a1 + a2
}
```

在上面的语法中 (num1: number, num2: number) => void，代表的就是一个函数类型

- 接收两个参数的函数:num1和num2，并且都是number类型;
- 并且这个函数是没有返回值的，所以是void;

**在某些语言中，可能参数名称num1和num2是可以省略，但是TypeScript是不可以的:**

![image-20220701212407463](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207012124510.png)

```ts
function calc(n1: number, n2: number, fn: (num1: number, num2: number) => number) {
  return fn(n1, n2)
}

const result1 = calc(20, 30, function(a1, a2) {
  return a1 + a2
})
console.log(result1)

const result2 = calc(20, 30, function(a1, a2) {
  return a1 * a2
})
console.log(result2)

```



## 参数的可选类型

我们可以指定某个参数是可选的:

```ts
// 可选类型是必须写在必选类型的后面的
// x -> undefined | number
function foo(x?: number) {
  console.log(x);
}
```

这个参数y依然是有类型的，它是什么类型呢? number | undefined

另外**可选类型需要在必传参数的后面:**

```ts
// 可选类型是必须写在必选类型的后面的
// y -> undefined | number
function foo(x: number, y?: number) {
  console.log(x,y);
}
```

## 默认参数

```
// 必传参数 - 有默认值的参数 - 可选参数
function foo(x: number, y: number = 20) {
  console.log(x, y)
}

foo(30)
```

这个时候y的类型其实是 undefined 和 number 类型的联合。

## 剩余参数

剩余参数语法允许我们将一个不定数量的参数放到一个数组中。

```ts
function sum(initalNum: number, ...nums: number[]) {
  let total = initalNum
  for (const num of nums) {
    total += num
  }
  return total
}
console.log(sum(20, 30))
console.log(sum(20, 30, 40))
console.log(sum(20, 30, 40, 50))

```



## this类型

### 可推导的this类型

```ts
// this是可以被推导出来 info对象(TypeScript推导出来)
const info = {
  name: "why",
  eating() {
    console.log(this.name + " eating")
  }
}
info.eating()
```

### 不确定的this类型

```ts
function eating( message: string) {
  console.log(this.name + " eating", message);
}
const info = {
  name: "why",
  eating: eating,
};
info.eating("哈哈哈");
```

**指定this的类型**

```ts
type thisType={name:String}
function eating(this:thisType,message: string) {
  console.log(this.name + " eating", message);
}
const info = {
  name: "why",
  eating: eating,
};

info.eating("哈哈哈");
```



### 指定this的类型

```ts
type ThisType = { name: string };

function eating(this: ThisType, message: string) {
  console.log(this.name + " eating", message);
}

const info = {
  name: "why",
  eating: eating,
};

// 隐式绑定
info.eating("哈哈哈");

// 显示绑定
eating.call({name: "kobe"}, "呵呵呵")
eating.apply({name: "james"}, ["嘿嘿嘿"])

```

## 函数的重载

可以去编写不同的重载签名(overload signatures)来表示函数可以以不同的方式进行调用;

一般是编写两个或者以上的重载签名，再去编写一个通用的函数以及实现;

- 把函数声明和函数实现分开

**但是注意，实现函数，是不能直接被调用的:,必须通过函数声明来调用!**

通过联合类型:

```ts
/**
 * 通过联合类型有两个缺点:
 *  1.进行很多的逻辑判断(类型缩小)
 *  2.返回值的类型依然是不能确定
 */
function add(a1: number | string, a2: number | string) {
  if (typeof a1 === "number" && typeof a2 === "number") {
    return a1 + a2
  } else if (typeof a1 === "string" && typeof a2 === "string") {
    return a1 + a2
  }

  // return a1 + a2;
}

add(10, 20)
```

函数的重载:

```ts
// 函数的重载: 函数的名称相同, 但是参数不同的几个函数, 就是函数的重载
function add(num1: number, num2: number): number; // 没函数体
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any {
  if (typeof num1 === 'string' && typeof num2 === 'string') {
    return num1.length + num2.length
  }
  return num1 + num2
}

const result = add(20, 30)
const result2 = add("abc", "cba")
console.log(result)
console.log(result2)

```

## 联合类型和重载

现在有一个需求:定义一个函数，可以传入字符串或者数组，获取它们的长度。

这里有两种实现方案:

- 方案一:使用联合类型来实现
- 方案二:实现函数重载来实现;

开发中，**尽量选择使用联合类型来实现;**

```ts
// 实现方式一: 联合类型
function getLength(args: string | any[]) {
  return args.length
}
console.log(getLength("abc"))
console.log(getLength([123, 321, 123]))
```

```ts
// 实现方式二: 函数的重载
function getLength(args: string): number;
function getLength(args: any[]): number;

function getLength(args: any): number {
  return args.length
}

console.log(getLength("abc"))
console.log(getLength([123, 321, 123]))
```

# 类

TypeScript作为JavaScript的超集，也是支持使用class关键字的，并且还可以对类的属性和方法等进行静态类型检测。

- 比如React开发中，目前更多使用的函数组件以及结合Hook的开发模式
- 比如在Vue3开发中，目前也更加推崇使用 Composition API;

## 类的定义

使用class关键字来定义一个类;

我们可以声明一些类的属性:在类的内部声明类的属性以及对应的类型

- 如果类型没有声明，那么它们默认是any的;

我们也可以给属性设置初始化值;

**在默认的strictPropertyInitialization模式下面我们的属性是必须初始化的**，如果没有初始化，那么编译时就会报错;

- 如果我们在strictPropertyInitialization模式下确实**不希望给属性初化，可以使用 name!: string语法;**

类可以有自己的构造函数constructor，当我们通过new关键字创建一个 实例时，构造函数会被调用;

- 构造函数不需要返回任何值，默认返回当前创建出来的实例; 

类中可以有自己的函数，定义的函数称之为方法;

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + " eating")
  }
}

const p = new Person("why", 18)
console.log(p.name)
console.log(p.age)
p.eating()

```

## 类的继承

使用**`extends`**关键字来实现继承，子类中使用**`super`**来访问父类。

```ts
class Person {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log("eating 100行")
  }
}

class Student extends Person {
  sno: number

  constructor(name: string, age: number, sno: number) {
    // super调用父类的构造器
    super(name, age)
    this.sno = sno
  }

  eating() {
    console.log("student eating")
    super.eating()
  }

  studying() {
    console.log("studying")
  }
}

const stu = new Student("why", 18, 111)
console.log(stu.name)
console.log(stu.age)
console.log(stu.sno)

stu.eating()
```

### 多态

```ts
class Animal {
  action() {
    console.log("animal action")
  }
}

class Dog extends Animal {
  action() {
    console.log("dog running!!!")
  }
}

class Fish extends Animal {
  action() {
    console.log("fish swimming")
  }
}

class Person extends Animal {

}

// animal: dog/fish
// 多态的目的是为了写出更加具备通用性的代码
function makeActions(animals: Animal[]) {
  animals.forEach(animal => {
    animal.action()
  })
}

makeActions([new Dog(), new Fish(), new Person()])

export{}
```



## 类的成员修饰符

在TypeScript中，类的属性和方法支持三种修饰符: public、private、protected 

- **public** 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的;
- **private** 修饰的是**仅在同一类中可见**、私有的属性或方法;
- **protected** 修饰的是**仅在类自身及<u>子类</u>中可见**、受保护的属性或方法;

```ts
//private
class Person {
  private name: string = ""

  // 封装了两个方法, 通过方法来访问name
  getName() {
    return this.name
  }

  setName(newName:string) {
    this.name = newName
  }
}

const p = new Person()
console.log(p.getName())
p.setName("pithy")
console.log(p.getName())
export {}
```

```ts
// protected: 在类内部和子类中可以访问

class Person {
  protected name: string = "123"
}

class Student extends Person {
  getName() {
    return this.name
  }
}

const stu = new Student()
console.log(stu.getName())
```

## getters/setters

私有属性(**private**)我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程， 

- 这个时候我们可以使用存取器。 set/get 成员变量名

```ts
class Person {
  private _name: string
  constructor(name: string) {
    this._name = name
  }

  // 访问器setter/getter 不算函数
  set name(newName){
    this._name=newName
  }
  get name(){
    return this._name
  }
  
  //获取和设置私有成员一般不设置成员方法
  // getName() {
  //   return this.name
  // }
}

const p = new Person("why")
p.name = "awspi"//访问属性的方式
console.log(p.name)
```



## 只读属性readonly

如果有一个属性我们不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用readonly:

- 只读属性是**可以在构造器中赋值, 赋值之后就不可以修改**
- **属性本身不能进行修改**, 但是如果它是对象类型, **对象中的属性是可以修改**

```ts
class Person {
  // 1.只读属性是可以在构造器中赋值, 赋值之后就不可以修改
  // 2.属性本身不能进行修改, 但是如果它是对象类型, 对象中的属性是可以修改
  readonly name: string
  age?: number
  readonly friend?: Person
  constructor(name: string, friend?: Person) {
    this.name = name
    this.friend = friend
  }
}

const p = new Person("why", new Person("kobe"))
console.log(p.name)
console.log(p.friend)

// 不可以直接修改friend
// p.friend = new Person("james")
if (p.friend) {
  p.friend.age = 30
} 

// p.name = "123"
```



## 静态成员

在TypeScript中通过关键字**`static`**来定义**类级别的成员和方法**

```ts
class Student {
  static time: string = "20:00"

  static attendClass() {
    console.log("去学习~")
  }
}
console.log(Student.time)
Student.attendClass()
```



## 抽象类abstract

在定义很多通用的调用接口时, 我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式。

但是，父类本身可能并不需要对某些方法进行具体的实现，所以父类中定义的方法,，我们可以定义为抽象方法。

- 抽象方法，必须存在于抽象类中;
- 抽象类是使用abstract声明的类;

抽象类有如下的特点:

- **抽象类不能被实例化**(也就是不能通过new创建) 
- **抽象方法必须被子类实现**，否则该类必须是一个抽象类;

![image-20220702002540423](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020025474.png)

## 类的类型

类本身也是可以作为一种数据类型的:

```ts
class Person {
  name: string = "123"
  eating() {

  }
}

const p = new Person()

const p1: Person = {
  //必须和类的成员一致
  name: "why",
  eating() {

  }
}

function printPerson(p: Person) {
  console.log(p.name)
}

printPerson(new Person())
printPerson({name: "kobe", eating: function() {}})
```

# 接口interface

## **接口的声明**

在前面我们通过type可以用来声明一个对象类型:

对象的另外一种声明方式就是通过接口来声明:

- 可以定义可选类型
- 可以定义只读属性

```ts
// 通过类型(type)别名来声明对象类型
// type InfoType = {name: string, age: number}

// 另外一种方式声明对象类型: 接口interface ,接口会在前面加I,表示是接口(习惯)
interface IInfoType {
  readonly name: string
  age: number
  friend?: {
    name: string
  }
}

const info: IInfoType = {
  name: "why",
  age: 18,
  friend: {
    name: "kobe"
  }
}

console.log(info.friend?.name)
console.log(info.name)
// info.name = "123"
info.age = 20
```



## 索引类型

![image-20220702004531809](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020045859.png)



## 函数类型

定义函数类型:

```ts
// type CalcFn = (n1: number, n2: number) => number
// 可调用的接口
interface CalcFn {
  (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: CalcFn) {
  return calcFn(num1, num2)
}

const add: CalcFn = (num1, num2) => {
  return num1 + num2
}

calc(20, 30, add)
```

除非特别的情况，推荐使用类型别名来定义函数:

```ts
type CalcFn = (n1: number, n2: number) => number
```



## 接口继承

接口和类一样是可以进行继承的，也是使用extends关键字:

- 接口是支持多继承的(类不支持多继承)

```ts
interface ISwim {
  swimming: () => void
}

interface IFly {
  flying: () => void
}


interface IAction extends ISwim, IFly {

}

const action: IAction = {
  swimming() {

  },
  flying() {
    
  }
}

```

## 交叉类型

联合类型表示多个类型中一个即可

还有另外一种**类型合并**，就是**交叉类型(**Intersection Types)

交叉类似表示**需要满足多个类型的条件;**

交叉类型使用 **&** 符号;

![image-20220702010917950](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020109010.png)

- 同时满足是一个number又是一个string的值是没有的，所以WType其实是一个never类型;



## 接口的实现

接口定义后，也是可以被类实现的:

如果被一个类实现，那么在之后**需要传入接口的地方，都可以将这个类传入;** 

```ts
interface ISwim {
  swimming: () => void
}

interface IEat {
  eating: () => void
}

// 类实现接口
class Animal {
}

// 继承: 只能实现单继承
// 实现: 实现接口, 类可以实现多个接口
class Fish extends Animal implements ISwim, IEat {
  swimming() {
    console.log("Fish Swmming")
  }

  eating() {
    console.log("Fish Eating")
  }
}


class Person implements ISwim {
  swimming() {
    console.log("Person Swimming")
  }
}

```

面向接口开发

```ts
// 编写一些公共的API: 面向接口编程
function swimAction(swimable: ISwim) {
  swimable.swimming()
}

// 1.所有实现了接口的类对应的对象, 都是可以传入
swimAction(new Fish())
swimAction(new Person())

swimAction({swimming: function() {}})
```

## interface和type区别

interface和type都可以用来定义对象类型，那么在开发中定义对象类型时，到底选择哪一个呢? 

- 如果是**定义非对象类型，通常推荐使用type**，比如Direction、Alignment、一些Function;

如果是定义对象类型，那么他们是有区别的

- interface 可以**重复的对某个接口来定义属性和方法**  **可以重名,重复定义不会覆盖而是合并**
- 而type定义的是别名，别名是不能重复的;

![image-20220702012327436](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020123487.png)



## 字面量赋值

TypeScript**在字面量直接赋值的过程中**，为了进行类型推导会进行**严格的类型限制。**

但是之后如果我们是将一个 **变量标识符** 赋值给其他的变量时，会进行freshness擦除操作。 **会把多余的属性擦除**

```ts
interface IPerson {
  name: string
  age: number
  height: number
}

const info = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

// freshness擦除 会把多余的属性擦除
const p: IPerson = info //把对象的引用赋值过来
```

```ts
function printInfo(person: IPerson) {
  console.log(person)
}
const info = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}

printInfo(info)

```

![image-20220702013731214](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020137270.png)

# 泛型

```ts
// 类型的参数化

// 在定义这个函数时, 我不决定这些参数的类型
// 而是让调用者以参数的形式告知,我这里的函数参数应该是什么类型
function sum<Type>(num: Type): Type {
  return num
}

// 1.调用方式一: 明确的传入类型
sum<number>(20)
sum<{name: string}>({name: "why"})
sum<any[]>(["abc"])

// 2.调用方式二: 类型推到
sum(50)
sum("abc")


```

**泛型实现类型参数化**

- 方式一:通过 <类型> 的方式将类型传递给函数;
- 方式二:通过类型推导，自动推导出我们传入变量的类型:

在这里会推导出它们是 字面量类型的，因为字面量类型对于我们的函数也是适用的

## 泛型的基本补充

可以传入多个类型:

```ts
function foo<T, E, O>(arg1: T, arg2: E, arg3?: O, ...args: T[]) {

}

foo<number, string, boolean>(10, "abc", true)
```

 平时在开发中我们可能会看到一些常用的名称: 

- **T**:Type的缩写，类型
- **K、V:**key和value的缩写，键值对
- **E**:Element的缩写，元素
- **O**:Object的缩写，对象

## 泛型接口

定义接口的时候我们也可以使用泛型:

```ts
interface IPerson<T1 = string, T2 = number> {//设置默认泛型T1 = string, T2 = number
  name: T1
  age: T2
}

//const p: IPerson<string,number> = {
//  name: "why",
//  age: 18
//}
const p: IPerson = {
  name: "why",
  age: 18
}
```



## 泛型类

```ts
class Point<T> {
  x: T
  y: T
  z: T

  constructor(x: T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = y
  }
}

const p1 = new Point("1.33.2", "2.22.3", "4.22.1")
const p2 = new Point<string>("1.33.2", "2.22.3", "4.22.1")
const p3: Point<string> = new Point("1.33.2", "2.22.3", "4.22.1")

const names1: string[] = ["abc", "cba", "nba"]
const names2: Array<string> = ["abc", "cba", "nba"] // 不推荐(react jsx <>)

```



## 泛型约束

有时候我们希望传入的类型有某些共性，但是这些**共性可能不是在同一种类型中:**

比如string和array都是有length的，或者某些对象也是会有length属性的;

那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢?

```ts
interface ILength {
  length: number//有属性length
}

function getLength<T extends ILength>(arg: T) {
  return arg.length
}

getLength("abc")
getLength(["abc", "cba"])
getLength({length: 100})

```



# 模块化

## 控制作用域

TypeScript支持两种方式来控制我们的作用域: 

- 模块化:每个文件可以是一个独立的模块，支持ES Module，也支持CommonJS
- 命名空间:通过namespace来声明一个命名空间

### 模块化开发

![image-20220702031727069](https://wsp-typora.oss-cn-hangzhou.aliyuncs.com/images/202207020317116.png)

### 命名空间namespace

命名空间在TypeScript早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名 冲突的问题。

```ts
namespace time{
  export function format(time:string){
    return '2022.7.2'
  }
}
namespace price{
  export function format(time:string){
    return '$9.9'
  }
}
time.format('111')
price.format('222')
```



# 类型的查找

之前我们所有的typescript中的类型，几乎都是我们自己编写的，但是我们也有用到一些其他的类型:

HTMLImageElement类型来自哪里呢?甚至是document为什么可以有getElementById的方法呢?

其实这里就涉及到typescript对类型的管理和查找规则了。

另外的一种typescript文件:**.d.ts文件**

- 我们之前编写的typescript文件都是 .ts 文件，这些文件最终会输出 .js 文件，也是我们通常编写代码的地方;
- 还有另外一种文件 .d.ts 文件，它是用来做类型的声明(declare)。 它**仅仅用来做类型检测，告知typescript我们有哪些类型;**

那么typescript会在哪里查找我们的类型声明呢?

- 内置类型声明;
- 外部定义类型声明;
- 自己定义类型声明;



## 内置类型声明

内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件

包括比如Math、Date等内置类型，也包括DOM API，比如Window、Document等;

- 内置类型声明通常在我们安装typescript的环境中会带有的

## 外部定义类型声明和自定义声明

 外部类型声明通常是我们使用一些库(比如第三方库)时，需要的一些类型声明。

这些库通常有两种类型声明方式:

- 方式一:在自己库中进行类型声明(编写.d.ts文件)，比如axios
- 方式二:通过社区的一个公有库DefinitelyTyped存放类型声明文件

该库的GitHub地址:https://github.com/DefinitelyTyped/DefinitelyTyped/ 

- 该库查找声明安装方式的地址:https://www.typescriptlang.org/dt/search?search= 
- 比如我们安装react的类型声明: npm i @types/react --save-dev

**需要自己来定义声明文件的情况**

- 情况一:我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件;比如lodash
- 情况二:我们给自己的代码中声明一些类型，方便在其他地方直接进行使用;



# declare声明





## 声明模块

可以声明模块，比如lodash模块默认不能使用的情况，可以自己来声明这个模块:

```ts
declare moudle 'lodash'{
export function join(any[]):any
}
```

声明模块的语法: **`declare module '模块名' {}`**。

**在声明模块的内部，我们可以通过 export 导出对应库的类、函数等;**

## 声明变量-函数-类

```ts
// 声明变量/函数/类
declare let whyName: string
declare let whyAge: number
declare let whyHeight: number

declare function whyFoo(): void

declare class Person {
  name: string
  age: number
  constructor(name: string, age: number)
}
```



## 声明文件

某些情况下，我们也可以声明文件:

比如在开发vue的过程中，默认是不识别我们的.vue文件的，那么我们就需要对其进行文件的声明

比如在开发中我们使用了 jpg 这类图片文件，默认typescript也是不支持的，也需要对其进行声明;

```ts

// 声明文件
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg'
declare module '*.gif'
```





## declare命名空间

比如我们在index.html中直接引入了jQuery:

可以进行命名空间的声明:

```ts
// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any
}
```

# tsconfig.json文件

tsconfig.json是用于配置TypeScript编译时的配置选项

https://www.typescriptlang.org/tsconfig