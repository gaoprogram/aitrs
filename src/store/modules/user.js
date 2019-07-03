/* eslint-disable prefer-promise-reject-errors */
import { loginByUsername, getUserInfo } from '@/api/login'
import { getMenu } from '@/api/permission'
import { getToken, setToken, removeToken } from '@/utils/auth'
import * as types from '../mutation-types'

const user = {
  state: {
    userType: '',
    status: '',
    userCode: '',
    companyCode: '',
    token: getToken(),
    name: '',
    avatar: '',
    userAccessRouters: [], // 用户有权限访问的路由集合
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    [types.SET_USER_TYPE] (state, userType) {
      state.userType = userType
    },
    [types.SET_USER_CODE] (state, code) {
      state.userCode = code
    },
    [types.SET_COMPANY_CODE] (state, code) {
      state.companyCode = code
    },
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_SETTING] (state, setting) {
      state.setting = setting
    },
    [types.SET_STATUS] (state, status) {
      state.status = status
    },
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_AVATAR] (state, avatar) {
      state.avatar = avatar
    },

    [types.SET_USER_ACCESSROUTERS] (state, userAccessRouters) {
      state.userAccessRouters = userAccessRouters
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      console.log(userInfo)
      debugger
      return new Promise((resolve, reject) => {
        // 调用登陆接口 进行登陆
        debugger
        loginByUsername(username, userInfo.password, userInfo.businessCode).then(response => {
          debugger
          const data = response.data.Data
          // 登陆后 将 tokenId 值存入 cookie中 ，本地环境 存入的 tokenKey 和 线上环境的 tokenkey 不一样，打包线上环境时要注意，在 @/utils/auth.js文件夹中
          setToken(response.data.Data.TokenId)
          // 同时将 tokenId 存入一份到 vuex 中
          commit(types.SET_TOKEN, data.TokenId)

          resolve(response.data.State)
          
        }).catch(error => {
          debugger
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      // debugger
      return new Promise((resolve, reject) => {
        // 从cookie 中获取 tokenId， 本地环境 存入的 tokenKey 和 线上环境的 tokenkey 不一样，打包线上环境时要注意，在 @/utils/auth.js文件夹中
        let t = getToken()
        if (typeof t === 'object') {
          t = t['Admin-Token']
        }
        getMenu().then(res => {
          // debugger
          // 登陆后获取了用户可访问的路由，存入 res_userAccessRouters 中
          commit(types.SET_USER_ACCESSROUTERS, res.data.Data)
        })
        getUserInfo(t).then(response => {
          debugger
          if (!response.data) {
            reject('error')
          }
          const data = response.data.Data
          commit(types.SET_USER_TYPE, data.UserType)
          commit(types.SET_NAME, data.UserName)
          commit(types.SET_USER_CODE, data.EmployeeId)
          commit(types.SET_COMPANY_CODE, data.CompanyCode)
          commit(types.SET_AVATAR, data.UserName)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.SET_TOKEN, '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
