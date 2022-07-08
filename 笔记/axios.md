# axios

> httpbin.org 可以模拟请求

功能特点:

- 在浏览器中发送 XMLHttpRequests 请求
- 在 node.js 中发送 http请求 p支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 等等

## axios请求方式

支持多种请求方式:

- axios(config)
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config]
- axios.head(url[, config]
- axios.post(url[, data[, config]]) 
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

```ts
//2.get请求 传入参数
//模拟get请求
axios
  .get('/get', {
    params: {
      name: 'pithy',
      age: 22
    }
  })
  .then((res) => {
    console.log(res.data)
  })

//3.post请求
axios
  .post('/post', {
    data: {
      name: 'awspi',
      age: 22
    }
  })
  .then((res) => {
    console.log(res.data)
  })
```

**有时候, 我们可能需求同时发送两个请求**

- 使用**axios.all**, 可以放入多个请求的数组. (内部相当于就是promise,all)
- axios.all([]) **返回的结果是一个数组，**使用 axios.spread 可将数组 [res1,res2] 展开为 res1, res2

```ts
//axios.all
axios
  .all([
    axios.get('/get', { params: { name: '1', age: 22 } }),
    axios.get('/get', { params: { name: '2', age: 22 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })
```



## 常见的配置选项

```ts
//全局配置
axios.defaults.XXX=''

//单独配置
axios
  .get('/get', {
    params: {
      name: 'pithy',
      age: 22
    },
    baseURL: '',
    headers: {}
  })
```



- 请求地址
  - `url: '/user',`
- 请求类型
  - `method: 'get',`
- 根路径
  - `baseURL: 'http://www.mt.com/api',`
- 请求前的数据处理
  - `transformRequest:[function(data){}],`
- 请求后的数据处理
  - `ransformResponse: [function(data){}],`
- 自定义的请求头
  - `headers:{'x-Requested-With':'XMLHttpRequest'},`
- **URL查询对象**
  - `params:{ id: 12 },`
- 查询对象序列化函数
  - `paramsSerializer: function(params){ }`
- **request body**
  - `data: { key: 'aa'},`
- 超时设置s
  - `timeout: 1000,`
- 跨域是否带Token
  - `withCredentials: false,`
- 自定义请求处理
  - `adapter: function(resolve, reject, config){},`
- 身份验证信息
  - `auth: { uname: '', pwd: '12'},`
- 响应的数据格式 json / blob /document /arraybuffer / text / stream 
  - `responseType: 'json',`



## axios的实例和拦截器

**为什么要创建axios的实例呢**?

- 当我们**从axios模块中导入对象时, 使用的实例是默认的实例.**
- 当给该实例设置一些默认配置时, 这些配置就被固定下来了.
- 但是后续开发中, 某些配置可能会不太一样.
- 比如某些请求需要使用特定的baseURL或者timeout或者content-Type等
- **这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息.**

**axios的也可以设置拦截器**:拦截每次请求和响应

- **axios.interceptors.request.use(请求成功拦截, 请求失败拦截)**
- **axios.interceptors.response.use(响应成功拦截, 响应失败拦截)**

```ts
//axios拦截器interceptors
axios.interceptors.request.use(
  (config) => {
    //do  something
    return config
  },
  (err) => {
    console.log('error')
    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    //do someting
    return res
  },
  (err) => {
    console.log('error')
    return err
  }
)

```



# axios+ts请求库封装

