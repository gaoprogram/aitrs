import * as types from '../mutation-types'
import { REQ_OK, DeleteAttachment } from '@/api/approve'
import { Message } from 'element-ui'

const flow = {
  state: {
    currentFieldStore: {},
    currentFieldsStore: [],
    nodeObjStore: {},
    quillEditorToolbarNum: 'toolbar',
    flowAlreadyUploadDetail: [], // 流转模块中 已经上传成功的明细表
    flowAlreadyUploadFile: [],  // 流转模块中 已经上传的附件的集合
    functionRole: {},  // 功能权限
    editorContentValue: '', // 流转中 编辑器中的内容
    currentFlowObj: {}  // 流转中 点击了 table表格的 查看后 存放的 对象集合
  },
  mutations: {
    [types.SET_CURRENT_FIELD] (state, currentField) {
      state.currentFieldStore = currentField
    },
    [types.SET_CURRENT_FIELDS] (state, currentFields) {
      state.currentFieldsStore = currentFields
    },
    [types.SET_NODE_OBJ] (state, nodeSetObj) {
      state.nodeObjStore = nodeSetObj
    },
    [types.SET_QUILLEDITORTOOLNum] (state) {
      state.quillEditorToolbarNum += 1
    },
    //流转中 已经上传成功的 附件（意见框下面的上传附件）
    [types.SET_ALREADY_UPLOAD_FILE] (state, arr) {
      debugger
      state.flowAlreadyUploadFile = arr
    },
    // 流转中 已经上传的明细表 （发起界面 和 right-fixed 页面上传明细表）
    [types.SET_ALREADY_UPLOAD_DETAIL] (state, arr){
      debugger
      state.flowAlreadyUploadDetail = arr
    },
    [types.SET_FLOW_FUNCTIONROLE] (state, obj) {
      state.functionRole = obj
    },
    [types.SET_FLOW_EDITORValue] (state, contentValue) {
      state.editorContentValue = contentValue
    },
    [types.SET_FLOW_CURRENTOBJ] (state, obj) {
      state.currentFlowObj = obj
    },
    // 删除明细表
    delFlowAlreadyUploadDetail (state){
      state.flowAlreadyUploadDetail = []
    }    
  },
  actions: {
    setCurrentField ({ commit, state }, obj) {
      commit(types.SET_CURRENT_FIELD, obj)
    },
    setCurrentFields ({ commit, state }, arr) {
      commit(types.SET_CURRENT_FIELDS, arr)
    },
    setNodeObj ({ commit, state }, obj) {
      commit(types.SET_NODE_OBJ, obj)
    },
    setCurrentFlowObj ({commit, state}, obj) {
      commit(types.SET_FLOW_CURRENTOBJ, obj)
    },
    setQuillNum ({commit, state}) {
      commit(types.SET_QUILLEDITORTOOLNum)
    },
    // 上传明细表（已经上传成功的明细表）
    addFlowAlreadyUploadDetail({commit, state}, arr){
      // let list = state.addFlowAlreadyUploadDetail.concat(arr)
      let list = arr
      commit(types.SET_ALREADY_UPLOAD_DETAIL, list)
    },
    // 上传附件(已经上传成功的附件)
    addFlowAlreadyUploadFile ({commit, state}, arr) {
      debugger
      let list = state.flowAlreadyUploadFile.concat(arr)
      commit(types.SET_ALREADY_UPLOAD_FILE, list)
    },
    // 删除 附件
    delFlowAlreadyUploadFile ({ commit, state }, item) {
      let list = state.flowAlreadyUploadFile.slice()
      debugger
      DeleteAttachment(item.ID, item.workId, item.nodeId, item.fieldCode, item.tableCode).then((res) => {
        debugger
        if (res.data.State === REQ_OK) {
          let arr = del(list, item)
          commit(types.SET_ALREADY_UPLOAD_FILE, arr)
          Message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          Message({
            type: 'error',
            message: '删除失败!'
          })
        }
      }).catch(() => {
        Message({
          type: 'error',
          message: '删除失败!'
        })
      })
    },
    // 设置 功能权限
    setFunctionRole ({ commit, state }, obj) {
      debugger
      commit(types.SET_FLOW_FUNCTIONROLE, obj)
    },
    // 将编辑器中的内容 存储到vuex中 
    setEditorContentValue ({commit, state}, contentValue) {
      commit(types.SET_FLOW_EDITORValue, contentValue)
    }
  }
}

function del (arr, item) {
  let newArr = arr.filter((i) => {
    return i.Id !== item.Id
  })
  return newArr
}

export default flow
