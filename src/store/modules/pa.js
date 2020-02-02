/* eslint-disable prefer-promise-reject-errors */
import * as types from '../mutation-types'
const pa = {
    state: {
        currentPageCode: '',  // 在职页面、待入职页面、离职页面的pageCode  'Emplist' 为 在职页面
        contractManagePageCode: 'ContractList', // 合同管理页面的 pageCode
        currentEmpObj: null,  // 在职页面、待入职页面、 离职页面中 查看的当前员工的信息
        currentTemplatePageCode: '', // 批量操作页面的 pageCode
        currentTemplateCode: '', // 批量操作时的模板templateCode
        alreadyUploadTemplateFile: [], // pa模块中已经上传成功的 模板文件
        currentTabItem: {}, // 当前点击的tab 分类对象
        batchExportOrImportEmpArr: [], // 批量导出、导入员工时 选择的员工数据集合
        isEmpOrContract: true, // true 员工详情页  false 合同详情页面
    },
    mutations:{
        // 设置 在职员工 、离职员工、 待入职员工页面的 pageCode
        [types.SET_CURRENTPAGECODE] (state, pageCode) {
            state.currentPageCode = pageCode
            // state.isEmpOrContract = true
        },
        [types.SET_CURRENTTEMPLATEPAGECODE] (state, templatePageCode) {
            state.currentTemplatePageCode = templatePageCode
        },
        [types.SET_CURRENTTEMPLATECODE] ( state, templateCode ) {
            state.currentTemplateCode = templateCode
        },
        [types.SET_ALREADYUPLOADFILE] (state, arr) {
            state.alreadyUploadTemplateFile = arr
        },
        [types.SET_CURRENTEMPOBJ] (state, empObj) {
            state.currentEmpObj = empObj
        },
        // 设置 在职员工 、离职员工、 待入职员工页面的 currentTab
        [types.SET_CURRENTTABITEM] (state, tabItem) {
            state.currentTabItem = tabItem
        },
        // 设置 合同管理 页面 pageCode
        [types.SET_CONTRACTMANAGEPAGECODE] (state, contractPageCode) {
            state.contractManagePageCode = contractPageCode
            state.isEmpOrContract = false
        },
        // 设置 批量 导入、导出时，选择的员工的集合
        [types.SET_BATCHEXPORTORIMPORTEMP] (state, empArr) {
            state.batchExportOrImportEmpArr = empArr
        },
        // 设置 是否是 员工详情页面 还是 合同详情页面
        [types.SET_ISEMPORCONTRACT] (state, flag) {
            state.isEmpOrContract = flag
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
        },
        // 设置 pa 中 查看的当前员工的 empObj
        setCurrentEmpObj({commit, state}, empObj){
            commit(types.SET_CURRENTEMPOBJ, empObj)
        },
        // 设置 pa 中 点击的 当前 合同tab 分类的 对象
        setCurrentTabItem({commit, state}, tabItem){
            commit(types.SET_CURRENTTABITEM, tabItem)
        },
        // 设置 pa 中 合同管理页面 的pageCode
        setContractManagePageCode({commit, state}, contractPageCode){
            commit(types.SET_CONTRACTMANAGEPAGECODE, contractPageCode)
        },
        // 设置 批量 导入、导出时，选择的员工的集合
        setBatchExportOrImportEmpArr({commit, state}, empArr) {
            commit(types.SET_BATCHEXPORTORIMPORTEMP, empArr)
        },
        // 设置 是否为 员工详情页面还是合同详情页面
        setIsEmpOrContractPage ({commit, state}, flag) {
            commit(types.SET_ISEMPORCONTRACT, flag)
        }
    }
}

export default pa
