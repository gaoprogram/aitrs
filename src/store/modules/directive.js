/****
 * 主要集中处理 自定义指令相关的操作 用store进行存储
 */
// import Cookies from 'js-cookie'
import * as types from '../mutation-types'

const directive = {
  state: {
    isPublic: false,   // 流程表单页面跳转到 表单管理页面标识
    tableCodeCustomer: '',
    flowRuleScanFlag: false, // 流程规则中点击的 是 “查看”btn
    currentTabStr: '',   // 流转中 点击了菜单：待办、在途、我发起的、我处理的、抄送我的、我关注的 这些栏目的标识
    currentActiveNameStr: '' // 待办中点击的查看时， 挂起 和 任务池申领类目的 标识
  },
  mutations: {
    [types.SET_isPublic] (state, flag, params) {
        if(!flag){
            // 非流程表单页面跳转到表单配制页面
            state.isPublic = false
            state.tableCodeCustomer = ''
        }else {
            // 从流程表单页面跳转到表单配制页面
            state.isPublic = true
            if(params) {
                state.tableCodeCustomer = params.tableCodeCustomer 
            }else {
                state.tableCodeCustomer = ''
            }
        }
    },
    [types.SET_FLOWRULESCAN_FLAG] (state, flag, params) {
      if(!flag) {
        state.flowRuleScanFlag = false
      }else {
        state.flowRuleScanFlag = true
      }
    },
    [types.SET_FLOW_CURRENTTAB] (state, {currentTabstr, currentActiveName}){
      debugger
      state.currentTabStr = currentTabstr
      state.currentActiveNameStr = currentActiveName
    }    
  },
  actions: {
    // 指令：atris-IsPublic： 从流程表单中跳转到 表单配制页面
    setIsPublic ({ commit, state }, flag, params = {}) {
      commit(types.SET_isPublic, flag, params)
    },
    // 指令：atris-IsPublic： 从流程表单中跳转到 表单配制页面
    setFlowRuleScan ({ commit, state }, flag, params = {}) {
      commit(types.SET_FLOWRULESCAN_FLAG, flag, params)
    }, 
    setFlowCurrentTab ({commit, state}, {currentTabstr, currentActiveName}){
      commit(types.SET_FLOW_CURRENTTAB, {currentTabstr, currentActiveName})
    }       
  }
}

export default directive
