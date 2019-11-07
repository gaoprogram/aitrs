/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pa = {
    state: {
        currentPageCode: 'Emplist',  // 当前页面的pageCode  'Emplist' 为 在职页面
        currentTemplatePageCode: '', // 批量操作页面的 pageCode
    },
    mutations:{
        [types.SET_CURRENTPAGECODE] (state, pageCode) {
            state.currentPageCode = pageCode
        },
        [types.SET_CURRENTTEMPLATEPAGECODE] (state, templatePageCode) {
            state.currentTemplatePageCode = templatePageCode
        },
    },
    actions: {
        // 设置当前页面的currentPageCode
        setCurrentPageCode({commit, state}, pageCode){
            commit(types.SET_CURRENTPAGECODE, pageCode)
        },
        // 设置 批量操作的页面中 当前的模板pagecode
        setCurrentTemplatePageCode({ commit, state }, templatePageCode){
            commit(types.SET_CURRENTTEMPLATEPAGECODE, templatePageCode)
        }

    }
}

export default pa
