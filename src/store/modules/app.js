import Cookies from 'js-cookie'
import * as types from '../mutation-types'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    online: navigator.onLine, // pc端网络状态    
  },
  mutations: {
    [types.SET_TOGGLE_SIDEBAR] (state, sidebarStatus) {
      state.sidebar.opened = sidebarStatus
    },
    [types.SET_VISITED_VIEWS] (state, arr) {
      state.visitedViews = arr
    },
    [types.NETWORKSTATUS] (state, flag) {
      state.online = flag
    }    
  },
  actions: {
    // 切换左侧导航栏
    ToggleSideBar ({ commit, state }) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      commit(types.SET_TOGGLE_SIDEBAR, !state.sidebar.opened)
    },
    // 增加选中tag
    addVisitedViews ({ commit, state }, view) {
      let arr = state.visitedViews.slice()
      let filterArr = arr.filter(v => v.path !== view.path)
      filterArr.push({ name: view.name, path: view.path, isHide: view.meta.hidden })
      commit(types.SET_VISITED_VIEWS, filterArr)
    },

    // 删除选中tag
    delVisitedViews ({ commit, state }, view) {
      let index
      let arr = state.visitedViews.slice()
      for (const [i, v] of arr.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      arr.splice(index, 1)
      return new Promise((resolve) => {
        commit(types.SET_VISITED_VIEWS, arr)
        resolve([...arr])
      })
    },
    // 设置网络状态
    netWorkChangeStatus({commit, state},flag){
      commit(types.NETWORKSTATUS, flag)
    }    
  }
}

export default app
