
import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '../store'
import { nodeObjStore } from '../store/getters'
// import MD5 from 'js-md5'
import cyrptoFn from '@/utils/cyrpto'

function encryptKey (obj) {
  let newEncrytObj = {}
  for(let key in obj){
    // let newKey = MD5(key)
    let newKey = cyrptoFn.encrypt(key)
    console.log("加密-----", newKey)
    let deNewKey = cyrptoFn.decrypt(newKey)
    console.log("解密------", deNewKey)
    newEncrytObj[newKey] = obj[key]
  }
  return newEncrytObj
}

// ---------全局控制 loading----------start-------
// loading框设置局部刷新，且所有请求完成后关闭loading框
// 声明一个对象用于存储请求个数
let atrisGlobalLoading = null
let needLoadingRequestCount = 0
function startLoading(domClass){
    // debugger
    // Vue.prototype.$message({
    //   type: 'warning',
    //   message: 'fetch中的msg'
    // })
    atrisGlobalLoading = Vue.prototype.$loading({
        lock: true,
        text: '努力加载中...',
        background: 'rgba(0,0,0,0.01)',
        target: document.querySelector(`${domClass}`)// 设置加载动画区域,domClass 值为"#id" 或者 ".class" 格式
    })
    // debugger
}
function endLoading(){
    atrisGlobalLoading.close()
}
function showFullScreenLoading(domClass) {
    // debugger
    if (needLoadingRequestCount === 0 && domClass) {
        startLoading(domClass)
    }
    needLoadingRequestCount++
}
function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
        needLoadingRequestCount--
    if (needLoadingRequestCount === 0 && atrisGlobalLoading) {
        // debugger
        endLoading()
    }
}  
// ---------全局控制 loading----------end-------


let appId, appKey
// let loadingNum = 0 // 备用，做loading计数器
// 创建axios实例

const service = axios.create({
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'  // 默认 
  // },
  baseURL: process.env.BASE_API, // api的base_url 开发环境引用的是@/config/dev.env.js中的 base_API；生成环境引用的是@/config/prod.env.js中的 base_API
  timeout: 15000               // 请求超时时间 15s
})

// request拦截器
service.interceptors.request.use(config => {
  console.log(store.getters)
  // config.baseURL = 'http://192.168.0.101'   
  // debugger
  let data = {}
  if(config.method === 'post'){
    data = config.data
  }else if(config.method === 'get' || config.method === 'delete'){
    data = config.params
  }

  if (config.module === 'workFlow') {
    // config.baseURL = 'http://192.168.1.100:802/'
    // config.baseURL = 'http://192.168.1.103:802/' // 工作流模块开发环境的地址,线上环境需要 注释此行
  }

  // if (config.data.Method  === 'logon') {
  //   config.baseURL = 'http://192.168.0.101'   
  // }   
  
  if( config.module === 'newStyle' ){
    // config.baseURL = 'http://192.168.0.101'
    config.baseURL = 'https://www.caihuiyun.cn/ddd'
  }
  
  if (!config.noQS && data.Method !== 'logon') {
    if (config.module === 'workFlow') {
      // 流转模块
      // debugger
      if(config.globalConfigs && config.globalConfigs.globalLoading && config.globalConfigs.domClass ){
        // 全局控制 加载的 loading
        // 调用 globalLoading.js 中的 startLoading 方法
        showFullScreenLoading(config.globalConfigs.domClass)
      }

      let newData = Object.assign(data, {
        'TokenId': getToken(),
        'CompanyCode': store.getters.companyCode,
        'UserId': store.getters.userCode,
        'UserNo': store.getters.userCode,
        appId,
        appKey
      })

      // 将 data 里面的参数进行md5 加密
      // let copyData = JSON.parse(JSON.stringify(encryptKey(newData))) 

      // config.data = qs.stringify(copyData)

      config.data = qs.stringify(data)

      config.withCredentials = false
    } else {
      // 非流转模块
      if( config.module !='newStyle' ){
        // 统一添加公用的参数
        // let newData = Object.assign(data, {
        //   'TokenId': getToken(),
        //   'CompanyCode': store.getters.companyCode,
        //   'UserId': store.getters.userCode,
        //   'UserNo': store.getters.userCode,
        //   appId,
        //   appKey
        // })

        let newData = Object.assign(data, {
          'TokenId': getToken(),
          'TenantId': store.getters.companyCode,  // 企业号
          // 'PersonId': store.getters.userCode,  // 员工id
          // 'PersonNo': store.getters.empNo,   // 员工号
          'UserId': store.getters.userCode
        })        
      }

      // 测试 newStyle
      if ( config.module === 'newStyle' ) {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'    
        if (process.env.NODE_ENV === "development"){
          // debugger
          // 开发环境
          console.log(process.env)
          config.baseURL = 'https://www.caihuiyun.cn/ddd'
          // config.baseURL = 'http://192.168.0.101'
          // console.log(config.baseURL)
        } else if (process.env.NODE_ENV === 'production'){
          // 生产环境
          config.baseURL = 'https://www.caihuiyun.cn/ddd'
          // config.baseURL = 'http://192.168.0.101'
        }   
        
        Object.assign(data, {
          'TokenId': getToken(),
          'TenantId': store.getters.companyCode,  // 企业号
          // 'PersonId': store.getters.userCode,  // 员工id
          // 'PersonNo': store.getters.empNo,   // 员工号
          'UserId': store.getters.userCode
        })

        // config.params = qs.stringify(data)
        config.parmas = data  // get 请求 此处需要是 config.params
      } else {
        // 将 data 里面的参数进行md5 加密
        // let copyData = JSON.parse(JSON.stringify(encryptKey(newData))) 

        // config.data = qs.stringify(copyData)
        config.data = qs.stringify(data)

        // 为了 开发 系统管控 
        if( config.url != '/SystemManage/Account'){
          // 非登录接口
          if(config.module == 'SystemManage'){
            // 系统管控
            // debugger
            if (process.env.NODE_ENV === "development"){
              // 开发环境
              console.log(process.env)
              // config.baseURL = 'http://192.168.1.253'
              // config.baseURL = 'http://192.168.1.253'
              // console.log(config.baseURL)
            }else if(process.env.NODE_ENV === 'production'){
              // 生产环境
              
            }
          }
        }        
      }       
    }
  } else if (config.data.Method === 'logon') {
    // config.baseURL = 'http://192.168.0.101'   
    config.baseURL = 'https://www.caihuiyun.cn/'   
    // debugger
    // 本地的登录接口logon  此时只需要传 商户码、用户名、密码 
    // 将 data 里面的参数进行md5 加密
    // data = JSON.parse(JSON.stringify(encryptKey(data))) 
    config.data = qs.stringify(data)
  }    

  // if (!config.noLoading) {
  //   ++loadingNum
  //   console.log(loadingNum)
  // }
  return config
}, error => {
  // 请求错误
  Message({
    message: '请求错误，请刷新重试！',
    type: 'error',
    duration: 2000
  }) // for debug
  console.log(error)
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {  
    // debugger 
    // --loadingNum
    // console.log(loadingNum)
    hideFullScreenLoading() // 响应成功关闭loading
    return response
  },
  error => {
    Message({
      message: '请求错误，请刷新重试！',
      type: 'error',
      duration: 2000
    })
    hideFullScreenLoading() // 响应成功关闭loading
    console.log(error)
    // 生产环境中请求超时后 自动跳转至 https://www.caihuiyun.cn/ 页面进行重新登录
    if (process.env.NODE_ENV === 'production') {
      window.location.href = 'https://www.caihuiyun.cn/'
    }
    return Promise.reject(error)
  }
)

export default service
