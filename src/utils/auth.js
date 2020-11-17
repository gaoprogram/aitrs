import Cookies from 'js-cookie'
import store from '../store'

// 因开发环境和生产环境所用 需要用
let TokenKey = ''
if( process.env) {
  if( process.env.NODE_ENV ==='development') {
    // 开发环境
    TokenKey = 'Admin-Token'
  }else if( process.env.NODE_ENV === 'production') {
    // 生产环境 
    TokenKey = 'AT_User' 
  }
}else {
  console.log("---------process.env未配置-auth.js中process.env获取失败---------")
}

export function getToken () {
  if( process.env ){
    if( process.env.NODE_ENV ==='development'){
      // 开发环境
      return Cookies.get(TokenKey)
    }else if( process.env.NODE_ENV === 'production'){
      // 生产环境 
      let t = Cookies.get(TokenKey)
      if ( typeof t === 'object') {
        t = t['AT_User']
      }
      let arr = t.split('&')
      let hasToken = arr.find((item) => {
        return item.toString().indexOf('TokenId') !== -1
      })
      let token = hasToken.toString().split('=')[1]
      return token      
    }
    console.log(`----auth.js中提取-${TokenKey}-- `, token)    
  }else {
    console.log("---------process.env未配置-auth.js中getToken获取失败---------")
  }
}

export function setToken (token) {
  console.log(`----auth.js中设置-${TokenKey}-- `, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getCreatorName () {
  return store.getters.name
}

export function getCreator () {
  return store.getters.userCode
}


// 设置localStorage
export function setLocalStorage (key, data) {
  localStorage.setItem(key, data)
}

// 获取localStorage
export function getLocalStorage (key) {
  return localStorage.getItem(key)
}
