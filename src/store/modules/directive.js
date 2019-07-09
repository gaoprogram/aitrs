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
  }
}

export default directive
