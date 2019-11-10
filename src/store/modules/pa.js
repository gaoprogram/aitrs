/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pa = {
    state: {
        currentPageCode: 'Emplist',  // 在职页面、待入职页面、离职页面的pageCode  'Emplist' 为 在职页面
        currentTemplatePageCode: '', // 批量操作页面的 pageCode
        currentTemplateCode: '', // 批量操作时的模板templateCode
        alreadyUploadTemplateFile: [], // pa模块中已经上传成功的 模板文件
    },
    mutations:{
        [types.SET_CURRENTPAGECODE] (state, pageCode) {
            state.currentPageCode = pageCode
        },
        [types.SET_CURRENTTEMPLATEPAGECODE] (state, templatePageCode) {
            state.currentTemplatePageCode = templatePageCode
        },
        [types.SET_CURRENTTEMPLATECODE] ( state, templateCode ) {
            state.currentTemplateCode = templateCode
        },
        [types.SET_ALREADYUPLOADFILE] (state, arr) {
            state.alreadyUploadTemplateFile = arr
        }
    },
    actions: {
        // 设置在职页面、离职页面、待入职页面 的currentPageCode
        setCurrentPageCode({commit, state}, pageCode){
            commit(types.SET_CURRENTPAGECODE, pageCode)
        },
        // 设置 批量操作的页面中 当前的模板pagecode
        setCurrentTemplatePageCode({ commit, state }, templatePageCode){
            commit(types.SET_CURRENTTEMPLATEPAGECODE, templatePageCode)
        },
        // 设置批量操作页面中的 当前模板templateCode
        setCurrentTemplateCode({ commit, state}, templateCode) {
            commit(types.SET_CURRENTTEMPLATECODE, templateCode)
        },
        // 设置 pa 批量操作页面中 已经上传的 templateFile 
        setAlreadyUploadTemplateFile ({commit, state}, arr) {
            commit(types.SET_ALREADYUPLOADFILE, arr)
        }
    }
}

export default pa
