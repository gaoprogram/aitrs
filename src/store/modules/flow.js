import * as types from '../mutation-types'

const flow = {
  state: {
    currentFieldStore: {},
    currentFieldsStore: [],
    nodeObjStore: {},
    quillEditorToolbarNum: 'toolbar'
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
    }
  }
}

export default flow
