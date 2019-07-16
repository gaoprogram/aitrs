import * as types from '../mutation-types'
import { REQ_OK, DeleteAttachment } from '@/api/approve'
import { Message } from 'element-ui'

const flow = {
  state: {
    currentFieldStore: {},
    currentFieldsStore: [],
    nodeObjStore: {},
    quillEditorToolbarNum: 'toolbar',
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
    [types.SET_FLOW_ALREADY_UPLOADFile] (state, arr) {
      debugger
      state.flowAlreadyUploadFile = arr
    },
    [types.SET_FLOW_FUNCTIONROLE] (state, obj) {
      state.functionRole = obj
    },
    [types.SET_FLOW_EDITORValue] (state, contentValue) {
      state.editorContentValue = contentValue
    },
    [types.SET_FLOW_CURRENTOBJ] (state, obj) {
      state.currentFlowObj = obj
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
    addFlowAlreadyUpload ({commit, state}, arr) {
      debugger
      let list = state.flowAlreadyUploadFile.concat(arr)
      commit(types.SET_FLOW_ALREADY_UPLOADFile, list)
    },
    
    // delFlowAlreadyUploadFile ({ commit, state }, item) {
    //   let list = state.flowAlreadyUploadFile.slice()
    //   DeleteAttachment(item.ID, item.workId, nodeId).then((res) => {
    //     if (res.data.State === REQ_OK) {
    //       let arr = del(list, item)
    //       commit(types.SET_FLOW_ALREADY_UPLOADFile, arr)
    //       Message({
    //         type: 'success',
    //         message: '删除成功!'
    //       })
    //     } else {
    //       Message({
    //         type: 'error',
    //         message: '删除失败!'
    //       })
    //     }
    //   }).catch(() => {
    //     Message({
    //       type: 'error',
    //       message: '删除失败!'
    //     })
    //   })
    // },
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
