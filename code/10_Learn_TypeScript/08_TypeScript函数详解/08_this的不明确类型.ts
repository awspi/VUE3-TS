type thisType={name:String}
function eating(this:thisType,message: string) {
  console.log(this.name + " eating", message);
}

const info = {
  name: "why",
  eating: eating,
};


info.eating("哈哈哈");

export {};

