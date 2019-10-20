/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pa = {
    state: {
        currentPageCode: 'Emplist',  // 当前页面的pageCode  'Emplist' 为 在职页面
    },
    mutations:{
        [types.SET_CURRENTPAGECODE] (state, pageCode) {
        state.currentPageCode = pageCode
        }
    },
    actions: {
        // 设置当前页面的currentPageCode
        setCurrentPageCode({commit, state}, pageCode){
            commit(types.SET_CURRENTPAGECODE, pageCode)
        }
    }
}

export default pa
