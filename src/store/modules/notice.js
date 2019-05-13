/* eslint-disable prefer-promise-reject-errors */

import * as types from '../mutation-types'
import { attachmentDel } from '@/api/notice'
import { REQ_OK } from '@/api/config'
import { Message } from 'element-ui'
const notice = {
  state: {
    alreadyUploadFile: [],
    loading: null
  },

  mutations: {
    [types.SET_ALREADY_UPLOAD_FILE] (state, alreadyUploadFile) {
      state.alreadyUploadFile = alreadyUploadFile
    },
    [types.SET_LOADING] (state, loading) {
      state.loading = loading
    }
  },

  actions: {
    setAlreadyUploadFile ({ commit, state }, arr) {
      commit(types.SET_ALREADY_UPLOAD_FILE, arr)
    },
    addAlreadyUploadFile ({ commit, state }, arr) {
      let list = state.alreadyUploadFile.concat(arr)
      commit(types.SET_ALREADY_UPLOAD_FILE, list)
    },
    emptyAlreadyUploadFile ({ commit, state }) {
      commit(types.SET_ALREADY_UPLOAD_FILE, [])
    },
    delAlreadyUploadFile ({ commit, state }, item) {
      let list = state.alreadyUploadFile.slice()
      attachmentDel(item.NoticeCode, item.Id).then((res) => {
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
    setLoadingState ({ commit, state }, status) {
      commit(types.SET_LOADING, status)
    }
  }
}

function del (arr, item) {
  let newArr = arr.filter((i) => {
    return i.Id !== item.Id
  })
  return newArr
}

export default notice
