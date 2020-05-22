/**
 * Created by Administrator on 2018/8/8.
 * 公告接口
 */
import fetch from '@/utils/fetch'
import { getToken, getCreatorName, getCreator } from '@/utils/auth'
import store from '../store'
// app id ,app key
let appId, appKey

// 发送反馈没有指定回复人员时的code
const EMPTY = '00000000-0000-0000-0000-000000000000'

/**
 * 获取公告列表
 */
export function getNoticeList (code, pageSize, pageNum, search, status, isAdmin) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'GetList',
      noticeTypeCode: code,
      pageSize,
      pageNum,
      search,
      status,
      isAdmin
    }
  })
}

/**
 * 获取公告类型
 */
export function getNoticeType () {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'GetNoticeTypeList',
      pageSize: 100
    }
  })
}

/**
 * 新建公告类型
 * @param typeName 公告类型名称
 */
export function addNoticeType (typeName) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'AddNoticeType',
      typeName
    }
  })
}

/**
 * 获取公告Code
 */
export function getNoticeCode () {
  return fetch({
    url: '/API/Account',
    method: 'post',
    data: {
      Method: 'GenerateGuid'
    }
  })
}

/**
 * 公告附件上传
 * @param file 选择的附件
 * @param code 公告code
 * @returns {Promise.<TResult>}
 */
export function attachmentPost (file, code) {
  // let appId, appKey
  let param = new FormData() // 创建form对象
  for (let i = 0; i < file.length; i++) {
    param.append(file[i].name, file[i]) // 通过append向form对象添加数据
  }
  // param.append(file[0].name, file[0]) // 通过append向form对象添加数据
  param.append('Method', 'UploadAttachments') // 添加form表单中其他数据
  param.append('companyCode', store.getters.companyCode) // 添加form表单中其他数据
  param.append('TokenId', getToken()) // 添加form表单中其他数据
  param.append('noticeCode', code) // 添加form表单中其他数据
  param.append('appId', appId)
  param.append('appKey', appKey)
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    noQS: true,
    headers: {'Content-Type': 'multipart/form-data'},
    data: param
  })
}

/**
 * 删除附件
 * @param noticeCode 公告code
 * @param Id 附件id
 */
export function attachmentDel (NoticeCode, Id) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'DeleteAttachment',
      NoticeCode,
      Id
    }
  })
}

/**
 * 保存公告
 * @param item 公告form表单
 */
export function saveNotice (item) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'Save',
      ...item
    }
  })
}

/**
 * 发布公告
 * @param item 公告form表单
 */
export function publishNotice (item, Operator, OperatorCode) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'Publish',
      ...item,
      Operator,
      OperatorCode
    }
  })
}

/**
 * 查看公告详情
 * @param noticeCode 公告code
 */
export function getNoticeDetail (noticeCode) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'Get',
      noticeCode,
      needFeedback: true
    }
  })
}

/**
 * 撤回公告
 * @param noticeCode 公告code
 */
export function retractNotice (noticeCode, operator, operatorCode) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'Retract',
      noticeCode,
      operator,
      operatorCode
    }
  })
}

/**
 * 公告历史
 * @param noticeCode 公告code
 */
export function historyNotice (noticeCode, pageSize, pageNum) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'GetHistoryList',
      noticeCode,
      pageSize,
      pageNum
    }
  })
}

/**
 * 公告历史详情
 * @param noticeCode 公告code
 * @param Id 公告id
 */
export function historyDetail (noticeCode, Id) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'GetHistoryInfo',
      noticeCode,
      Id
    }
  })
}

/**
 * 公告反馈
 * @param NoticeCode 公告code
 * @param Content 反馈内容
 * @param IsPublish 是否所有人可见
 * @param TargetFeedbackCode 反馈对象code,如果为空则反馈对象为公告
 */
export function feedback (isAdmin, NoticeCode, Content, IsPublish, TargetFeedbackCode) {
  if (!TargetFeedbackCode) {
    TargetFeedbackCode = EMPTY
  }
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'AddFeedback',
      NoticeCode,
      Creator: getCreator(),
      CreatorName: getCreatorName(),
      Content,
      IsPublish,
      isAdmin,
      TargetFeedbackCode
    }
  })
}

/**
 * 隐藏反馈
 * @param feedbackCode 反馈code
 */
export function hideFeedback (feedbackCode) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'Hide',
      feedbackCode
    }
  })
}

/**
 * 撤销回复
 * @param feedbackCode 反馈code
 */
export function cancelReply (feedbackCode) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'RetractFeedback',
      feedbackCode
    }
  })
}

/**
 * 修改置顶状态
 * @param NoticeCode 公告code
 * @param IsTop 是否置顶 boolean
 */
export function updateIsTop (NoticeCode, IsTop) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'UpdateIsTop',
      NoticeCode,
      IsTop
    }
  })
}

/**
 * 获取已阅回执
 * @param NoticeCode
 * @param IsTop
 */
export function getReadReceiptUser (NoticeCode, PageSize, PageNum) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'GetReadReceiptUser',
      NoticeCode,
      PageSize,
      PageNum
    }
  })
}

/**
 * 获取已阅回执
 * @param NoticeCode
 * @param IsTop
 */
export function getNotReadReceiptUser (NoticeCode, PageSize, PageNum) {
  return fetch({
    url: '/Notice/Notice',
    method: 'post',
    data: {
      Method: 'GetNotReadReceiptUser',
      NoticeCode,
      PageSize,
      PageNum
    }
  })
}
