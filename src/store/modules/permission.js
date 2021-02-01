import * as types from '../mutation-types'
import { asyncRouterMap, constantRouterMap, asyncRouter } from '@/router/index'
import Layout from '@/components/layout/Layout'

function loadView(view) {
  console.log("-----", view)
  // console.log(()=> import('@/components/'+view))
  // console.log(()=> import(`@/components/${view}`))
  let newView = view
  return (resolve) => require(['@/' + view + '.vue'], resolve)
  // 此处用reqiure比较好，import引入变量会有各种莫名的错误
  // if(process.env.NODE_ENV){
  //   if(process.env.NODE_ENV === 'development'){
      // return (view) => require('@/'+view+'.vue').default
  //   }else if(process.env.NODE_ENV === 'production'){
      // return ()=> import('@/'+view + '.vue')
  //   }
  // }
}

function filterAsyncRouter (routesArr) {
  let res = routesArr.filter((item, key) => {
    let path = item.routePath || item.path
    path && (item.path = path)
    let name = item.routeName || item.name
    name && (item.name = name)
    let meta = item.routeMeta
    meta && (item.meta = JSON.parse(meta))
    item.routeRedirect && (item.redirect = item.routeRedirect) 

    if(item.routeComponent){
        if (item.routeComponent == Layout) { // Layout组件特殊处理
          item.component = Layout
        } else {
          let component = item.routeComponent
          item.component = loadView(component)
        }
      }  
    if (item.children && item.children.length) {
      item.children = filterAsyncRouter(item.children)
    } 
    return true  
  })     
  return res
}



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

        // let accessedRouters = constantRouterMap.concat(asyncRouterMap)
        // // let accessedRouters = constantRouterMap.concat([])
        let res = filterAsyncRouter(asyncRouter)
        console.log("----999-----", res)
        let accessedRouters = constantRouterMap.concat(res)

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
