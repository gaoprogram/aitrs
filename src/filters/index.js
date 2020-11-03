/* eslint-disable camelcase,no-unused-vars */
import { getNoticeType } from '@/api/notice'
import { REQ_OK } from '@/api/config'
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function replaceTime (time, cFormat) {
  if (!time) {
    return '暂无'
  }
  if (typeof time === 'object') {
    time = parseTime(time, cFormat || '{y}-{m}-{d} {h}:{i}:{s}')
  } else {
    let endTime = time.replace('/Date(', '')
    endTime = endTime.replace(')/', '')
    time = parseTime(endTime, cFormat || '{y}-{m}-{d} {h}:{i}:{s}')
  }
  return time
}

// 不要时分秒的时间转换
export function replaceTimeNoH (time) {
  if (!time) {
    return '暂无'
  }
  if (typeof time === 'object') {
    time = parseTime(time, '{y}-{m}-{d}')
  } else {
    let endTime = time.replace('/Date(', '')
    endTime = endTime.replace(')/', '')
    time = parseTime(endTime, '{y}-{m}-{d}')
  }
  return time
}

// 不要日期的时间转换
export function replaceTimeNoY (time) {
  if (!time) {
    return '暂无'
  }
  if (typeof time === 'object') {
    time = parseTime(time, '{h}:{i}')
  } else {
    let endTime = time.replace('/Date(', '')
    endTime = endTime.replace(')/', '')
    time = parseTime(endTime, '{h}:{i}')
  }
  return time
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化 */
export function nFormatter (num, digits) {
  const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 公告类型过滤
 * @param code 公告code
 * @param arr 公告类型数组
 * @returns {*}
 */
export async function noticeTypeFilter (code) {
  let typeList = []
  let str = ''
  let res = await getNoticeType()
  if (res.data.State === REQ_OK) {
    typeList = res.data.Data
    if (code) {
      for (let i = 0; i < typeList.length; i++) {
        if (typeList[i].Code === code) {
          str = typeList[i].TypeName
        }
      }
    }
  }
  console.log(str)
  return '草稿'
}

/**
 *
 * @param num 公告状态码
 * @returns {*}
 */
export function stateFilter (num) {
  let str
  if (num === 1) {
    str = '草稿'
  } else if (num === 2) {
    str = '发布'
  } else if (num === 4) {
    str = '撤回'
  } else {
    str = '无'
  }
  return str
}

/**
 *
 * @param num 部分员工范围
 * @returns {*}
 */
export function partEmployeesFilter (num) {
  let str
  if (num === 1) {
    str = '部门'
  } else if (num === 2) {
    str = '职层'
  } else if (num === 4) {
    str = '员工'
  } else {
    str = '无'
  }
  return str
}
/**
 *
 * @param num 公告范围
 * @returns {*}
 */
export function noticeRangeFilter (num) {
  let str
  if (num === 0) {
    str = '全体'
  } else if (num === 1) {
    str = '或'
  } else if (num === 2) {
    str = '和'
  } else {
    str = '无'
  }
  return str
}

/**
 *
 * @param num 公告范围
 * @returns {*}
 */
export function noticeRange (num) {
  let str
  if (num === 0) {
    str = '全体员工'
  } else if (num === 1) {
    str = '部分员工'
  }
  return str
}

/**
 *
 * @param num 重要级别
 * @returns {*}
 */
export function levelFilter (num) {
  let str
  if (num === 1) {
    str = '重要'
  } else if (num === 2) {
    str = '紧急'
  } else if (num === 4) {
    str = '普通'
  } else {
    str = '无'
  }
  return str
}

/**
 *
 * @param num 是否置顶
 * @returns {*}
 */
export function isTop (num) {
  let str
  if (num) {
    str = '是'
  } else {
    str = '否'
  }
  return str
}

/**
 *
 * @param num 允许反馈
 * @returns {*}
 */
export function enableFeedback (num) {
  let str
  if (num) {
    str = '是'
  } else {
    str = '否'
  }
  return str
}

/**
 *
 * @param num 是否公开
 * @returns {*}
 */
export function feedbackIsPublic (num) {
  let str
  if (num) {
    str = '是'
  } else {
    str = '否'
  }
  return str
}

/**
 *
 * @param arr 发薪周期数组
 * @returns {*}
 */
export function payDateContent (arr) {
  let str = ''
  let month
  arr.forEach((i, index) => {
    switch (i.Month) {
      case 0:
        month = '当月'
        break
      case 1:
        month = '次月'
        break
      default:
        month = '当月'
    }
    if (index > 0) {
      str = str + ' - ' + month + i.Date + '号'
    } else {
      str = month + i.Date + '号'
    }
  })
  return str
}

/**
 *
 * @param num 班次类型num
 * @returns {string} 班次类型
 */
export function classType (num) {
  let str = ''
  if (num === 0) {
    str = '自定义'
  } else if (num === 1) {
    str = '系统'
  }
  return str
}

/**
 *
 * @param num 枚举类型
 * @returns {string} 权限
 */
export function roleHasDownload (num) {
  let str = ''
  if (num === 1) {
    str = '可下载'
  } else if (num === 2) {
    str = '可上传'
  } else if (num === 3) {
    str = '删除规则'
  }
  return str
}

/**
 * 流程状态1
 * @param num 状态码
 * @returns {string}
 * @constructor
 */
export function WFState (num) {
  let str = ''
  switch (num) {
    case 0:
      str = '审批中'
      break
    case 1:
      str = '审批通过'
      break
    case 2:
      str = '草稿'
      break
    case 3:
      str = '审批拒绝'
      break
    case 4:
      str = '审批已撤回'
      break
    case 10:
      str = '挂起'
      break
    case -1:
      str = '全部'
      break
  }
  return str
}

export function Sta (num) {
  let str = ''
  switch (num) {
    case 0:
      str = '未读'
      break
    case 1:
      str = '已读'
      break
    case -1:
      str = '全部'
      break
  }
  return str
}


/**时间戳转化为年月日
*/
export function TimeStampToDate (timeStamp) {
  let date = '', Y = '', M = '', D = '', h = '', m = '', s = ''
  if(timeStamp.length === 13){//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    date = new Date(timeStamp)
  }else {
    date = new Date(timeStamp * 1000)
  }
  Y = date.getFullYear() + '-'
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  D = date.getDate() + ' '
  // h = date.getHours() + ':'
  // m = date.getMinutes() + ':'
  // s = date.getSeconds()
  return Y+M+D+h+m+s  
}
/**时间戳区间转化为年月日区间
*/
export function TimeStampToDateRange (timeStampArr) {
  let arr = []

  for(let i = 0; i< timeStampArr.length; i++){
    let date = '', Y = '', M = '', D = '', h = '', m = '', s = ''    
    let timeStampItem = timeStampArr[i]
    if(timeStampItem.length === 13){//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      date = new Date(timeStampItem)
    }else {
      date = new Date(timeStampItem * 1000)
    }
    Y = date.getFullYear() + '-'
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    D = date.getDate() + ' '
    // h = date.getHours() + ':'
    // m = date.getMinutes() + ':'
    // s = date.getSeconds()
    arr.push(Y+M+D+h+m+s)
  }
  return arr[0]+ '—' + arr[1]
}
