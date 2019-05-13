import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '../store'

let appId, appKey
// let loadingNum = 0 // 备用，做loading计数器
// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url 开发环境引用的是@/config/dev.env.js中的 base_API；生成环境引用的是@/config/prod.env.js中的 base_API
  timeout: 30000                // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.module === 'workFlow') {
    // config.baseURL = 'http://192.168.1.100:802/'
    config.baseURL = 'http://192.168.1.106:802/' // 工作流模块开发环境的地址,线上环境需要 注释此行
  }
  if (config.method === 'post' && !config.noQS) {
    const data = config.data || {}
    if (config.module === 'workFlow') {
      config.data = qs.stringify(Object.assign(data, {
        'TokenId': getToken(),
        'CompanyCode': store.getters.companyCode,
        'UserId': store.getters.userCode
      }))
      config.withCredentials = false
    } else {
      config.data = qs.stringify(Object.assign(data, {
        'TokenId': getToken(),
        'CompanyCode': store.getters.companyCode,
        'UserId': store.getters.userCode,
        appId,
        appKey
      }))
    }
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
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // --loadingNum
    // console.log(loadingNum)
    return response
  },
  error => {
    Message({
      message: '请求错误，请刷新重试！',
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  }
)

export default service
