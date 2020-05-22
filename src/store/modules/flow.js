import * as types from '../mutation-types'
import { DeleteAttachment } from '@/api/approve'
import { REQ_OK } from '@/api/config'
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
    currentFlowObj: {},  // 流转中 点击了 table表格的 查看后 存放的 table表格中的 对象集合
    currentFlowFormObj: {}  // right-fixed 中调取 getform 接口后获取的对象集合
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
    // 点击了查看之后，存放当前table表格的行对象
    [types.SET_FLOW_CURRENTOBJ] (state, obj) {
      state.currentFlowObj = obj
    },
    // right-fixed 中调取 getform 接口后获取的对象
    [types.SET_FLOW_CURRENTFLOWFORMOBJ] (state, obj) {
      debugger
      state.currentFlowFormObj = obj
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
    // 点击了“查看”后将 table表格中此行的数据保存下来
    setCurrentFlowObj ({commit, state}, obj) {
      commit(types.SET_FLOW_CURRENTOBJ, obj)
    },
    // right-fixed 中调取了getform接口后，获取的对象集合
    setFlowCurrentFormObj ({commit, state}, obj) {
      debugger
      commit(types.SET_FLOW_CURRENTFLOWFORMOBJ, obj)
    },
    setQuillNum ({commit, state}) {
      commit(types.SET_QUILLEDITORTOOLNum)
    },
    // 上传明细表（已经上传成功的明细表）
    addFlowAlreadyUploadDetail ({commit, state}, arr){
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
      let list = state.flowAlreadyUploadFile
      debugger
      // WorkId 为数字，有的会非常大 超出了 js 的数字范围 所以将其转化为 字符串类型
      let WorkId = item.WorkId || "" 
      WorkId = WorkId.toString()
      console.log(typeof WorkId)
      DeleteAttachment(item.AttachmentId, WorkId, item.NodeId, item.FieldCode, item.TableCode).then((res) => {
        debugger
        if (res.data.State === REQ_OK) {
          let arr = del(list, item) 
          debugger
          commit(types.SET_ALREADY_UPLOAD_FILE, arr)
          Message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          Message({
            type: 'error',
            message: `删除失败,${res.data.Error}`
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
  debugger
  let newArr = arr.filter((i) => {
    return i.AttachmentId !== item.AttachmentId
  })
  debugger
  console.log(newArr)
  return newArr
}

export default flow
