import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '../store'

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
  baseURL: process.env.BASE_API, // api的base_url 开发环境引用的是@/config/dev.env.js中的 base_API；生成环境引用的是@/config/prod.env.js中的 base_API
  timeout: 30000                // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  debugger
  const data = config.data || {}
  if (config.module === 'workFlow') {
    // config.baseURL = 'http://192.168.1.100:802/'
    // config.baseURL = 'http://192.168.1.103:802/' // 工作流模块开发环境的地址,线上环境需要 注释此行
  }


  if (config.method === 'post' && !config.noQS && config.data.Method !== 'logon') {
    if (config.module === 'workFlow') {
      // 流转模块
      // debugger
      if(config.globalConfigs && config.globalConfigs.globalLoading && config.globalConfigs.domClass ){
        // 全局控制 加载的 loading
        // 调用 globalLoading.js 中的 startLoading 方法
        showFullScreenLoading(config.globalConfigs.domClass)
      }

      config.data = qs.stringify(Object.assign(data, {
        'TokenId': getToken(),
        'CompanyCode': store.getters.companyCode,
        'UserId': store.getters.userCode
      }))
      config.withCredentials = false
    } else {
      // 非流转模块
      config.data = qs.stringify(Object.assign(data, {
        'TokenId': getToken(),
        'CompanyCode': store.getters.companyCode,
        'UserId': store.getters.userCode,
        'UserNo': store.getters.userCode,
        appId,
        appKey
      }))

      // 为了 开发 系统管控 
      if( config.url != '/API/Account' && config.module == 'SystemManage'){
        debugger
        config.baseURL = 'http://192.168.1.253/'
      }
    }
  } else if (config.data.Method === 'logon') {
    // 本地的登录接口logon  此时只需要传 商户码、用户名、密码 
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
    return Promise.reject(error)
  }
)

export default service
