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

console.log(info)
console.log(p)


function printInfo(person: IPerson) {
  console.log(person)
}

// 代码会报错
// printInfo({
//   name: "why",
//   age: 18,
//   height: 1.88,
//   address: "广州市"
// })

// const info = {
//   name: "why",
//   age: 18,
//   height: 1.88,
//   address: "广州市"
// }

// printInfo(info)

