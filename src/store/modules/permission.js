import * as types from '../mutation-types'
import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission (roles, route) {
//   if (route.meta && route.meta.role) {
//     return roles.some(role => route.meta.role.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter (asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表 gaol
 * @param asyncRouterMap
 *
 */
// function filterAsyncRouter (asyncRouterMap, userAccessRouters) {
//   var arrMap = []
//   if (userAccessRouters && userAccessRouters.length) {
//     for (var i = 0; i < userAccessRouters.length; i++) {
//       for (var j = 0; j < asyncRouterMap.length; j++) {
//         if (userAccessRouters[i].name == asyncRouterMap[j].name) {
//           if (userAccessRouters[i].children && userAccessRouters[i].children.length && asyncRouterMap && asyncRouterMap.length) {
//             // 递归调用
//             filterAsyncRouter(asyncRouterMap[j].children, userAccessRouters[i].children)
//           }
//           arrMap.push(asyncRouterMap[j])
//           break
//         }
//       }
//     }
//   }
//   return arrMap
// }

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    [types.SET_ROUTERS] (state, routers) {
      state.routers = routers
    },
    [types.SET_ADD_ROUTERS] (state, routers) {
      state.addRouters = routers
    }
  },
  actions: {
    GenerateRoutes ({ commit, state, rootState }) {
      return new Promise((resolve, reject) => {
        // const { roles } = data
        // console.log('datta', data)
        // debugger
        // 获取的用户可访问路由与 配置的 asyncRouterMap 路由做递归匹配 得到用户真实的可访问的路由地址
        // let accessedRouters = filterAsyncRouter(asyncRouterMap, rootState.user.userAccessRouters)

        let accessedRouters = constantRouterMap.concat(asyncRouterMap)

        // debugger
        // let accessedRouters = constantRouterMap.concat(asyncRouterMap)

        // if (data) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // debugger
        commit(types.SET_ROUTERS, accessedRouters)
        commit(types.SET_ADD_ROUTERS, accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
