/**
/**
 * Created by Administrator on 2018/12/14.
 * function : xxxxx
 */
import fetch from '@/utils/fetch'
/**
 * 多人处理规则
 */
export function todolistModel () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'TodolistModel'
    }
  })
}

/**
 * 组长规则
 */
export function teamLeaderConfirmRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'TeamLeaderConfirmRole'
    }
  })
}

/**
 * 审批人去重
 */
export function jumpRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'JumpRole'
    }
  })
}

/**
 * 通知抄送
 */
export function noticeCC () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'NoticeCC'
    }
  })
}

/**
 * 节点访问规则
 */
export function deliveryWay () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'DeliveryWay'
    }
  })
}

/**
 * 审批人找人规则
 */
export function deliveryWayType () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'DeliveryWayType'
    }
  })
}

/**
 * 发起人找人规则
 */
export function starterType () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'StarterType'
    }
  })
}

/**
 * 抄送人找人规则
 */
export function copyerType () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'CopyerType'
    }
  })
}

/**
 * 退回规则
 */
export function returnRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'ReturnRole'
    }
  })
}

/**
 * 会签模式
 */
export function huiQianRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'HuiQianRole'
    }
  })
}

/**
 * 人员选择器显示方式
 */
export function selectorModel () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'SelectorModel'
    }
  })
}

/**
 * 工作方式/组件类型
 */
export function fWCType () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'FWCType'
    }
  })
}

/**
 * 分支条件类型
 */
export function connDataFrom () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'ConnDataFrom'
    }
  })
}

/**
 * 指定处理人方式
 */
export function specOperway () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'SpecOperway'
    }
  })
}

/**
 * 表单类型
 */
export function formType () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'FormType'
    }
  })
}

/**
 * 节点类型
 */
export function runModel () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'RunModel'
    }
  })
}

/**
 * 撤销规则
 */
export function cancelRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'CancelRole'
    }
  })
}

/**
 * 流程数据存储模式
 */
export function dataStoreModel () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'DataStoreModel'
    }
  })
}

/**
 * 流程实例删除规则
 */
export function flowDeleteRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'FlowDeleteRole'
    }
  })
}

/**
 * 启动限制规则
 */
export function startLimitRole () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'StartLimitRole'
    }
  })
}

/**
 * 根据找人规则获取节点访问规则列表
 * @param P 找人规则字典表code值
 */
export function getDicByKey (DicCode, P) {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDicByKey',
      ModuleCode: 'WorkFlow',
      DicCode,
      P
    }
  })
}




/*------------------------------------------------PA 字典表--------------------------------- */

/*
* 
*根据 DicType  和 DicCode 来获取 下拉选项框的数据源(员工详情中的 编辑field字段时))
*@params  DicType 字典类型 SYS/CUS ，  DicCode 为 对象dataSource的值
*/
export function PaGetDicDataSourceList (DicType, DicCode) {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDicByKey',
      DicType,
      DicCode
    }
  })
}


/*------------------------------------------------newStyle 字典表--------------------------------- */


/**
 *  获取字段组件的字典表选项
 * @params  DicType  字典表类型，默认SYS
 * @params DicCode 字典表code
 * @params ModuleCode 模块code，默认SYS
*/

export function newStyleGetDicByKey ( DicType = 'SYS', DicCode, ModuleCode = 'SYS' ) {
  return fetch({
      module: 'newStyle',
      url: '/api/app/dic/dicByKey',
      method: 'get',
      params: {   
          // get请求 这里需要是parmas
          // Method: 'GetDicByKey',
          DicType,
          DicCode,
          ModuleCode
      }
  })
}


/**
 *  保存字典表tree
 * @params {*} Data   数组 [{Pcode: '', Name: '', Description: ''}]
*/

export function saveDicByKey ( DicCode, Data ) {
  return fetch({
      module: 'newStyle',
      url: '/api/app/dic/saveDicByKey',
      method: 'post',
      data: {   
        // get请求 这里需要是parmas， post 用 data
        // Method: 'saveDicByKey',
        DicCode,
        Data,
      }
  })
}

/**
 *  删除字典表tree
 * @params {}  ModuleCode 模块code，默认SYS
 * @params {*} DicCode    字典表code
 * @parmas {*} Id 字典表数据id
*/

export function deleteDicItem ( ModuleCode, DicCode, Id ) {
  return fetch({
      module: 'newStyle',
      url: '/api/app/dic/dicItem',
      method: 'delete',
      params: {   
        // get, delete请求 这里需要是parmas， post 用 data
        // Method: 'deleteDicItem',
        ModuleCode,
        DicCode,
        Id
      }
  })
}