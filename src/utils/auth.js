import Cookies from 'js-cookie'
import store from '../store'

// 本地token开启-------------------
const TokenKey = 'Admin-Token'

// 线上 / 测试打包开启----------------
// const TokenKey = 'AT_User'

export function getToken () {
  // 线上 / 测试打包开启--------------------
  // let t = Cookies.get(TokenKey)
  // if (typeof t === 'object') {
  //   t = t['AT_User']
  // }
  // let arr = t.split('&')
  // let hasToken = arr.find((item) => {
  //   return item.toString().indexOf('TokenId') !== -1
  // })
  // let token = hasToken.toString().split('=')[1]
  // return token

  // 本地token开启---------
  return Cookies.get(TokenKey)
}

export function setToken (token) {
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
