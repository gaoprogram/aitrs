import * as types from '../mutation-types'
import { REQ_OK, DeleteAttachment } from '@/api/approve'
import { Message } from 'element-ui'

const flow = {
  state: {
    currentFieldStore: {},
    currentFieldsStore: [],
    nodeObjStore: {},
    quillEditorToolbarNum: 'toolbar',
    flowAlreadyUploadFile: []
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
      state.flowAlreadyUploadFile = arr
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
    setQuillNum ({commit, state}) {
      commit(types.SET_QUILLEDITORTOOLNum)
    },
    addFlowAlreadyUpload ({commit, state}, arr) {
      let list = state.flowAlreadyUploadFile.concat(arr)
      commit(types.SET_FLOW_ALREADY_UPLOADFile, list)
    },
    delFlowAlreadyUploadFile ({ commit, state }, item) {
      let list = state.flowAlreadyUploadFile.slice()
      DeleteAttachment(item.ID, item.workId, nodeId).then((res) => {
        if (res.data.State === REQ_OK) {
          let arr = del(list, item)
          commit(types.SET_FLOW_ALREADY_UPLOADFile, arr)
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
