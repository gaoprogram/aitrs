/**
 * Created by Administrator on 2019/1/3.
 * function : 通用字典接口
 */
import fetch from '@/utils/fetch'
/**
 *
 * @param ModuleCode 模块code
 * @param StrJson 查询条件
 * @returns {Promise<Response>} 获取组织
 */
export function getOrg (ModuleCode, StrJson) {
  return fetch({
    module: 'workFlow',
    // url: '/API/ComData',   
    url: '/API/Common',    
    method: 'post',
    data: {
      Method: 'GetOrgList',
      ModuleCode,
      StrJson
    }
  })
}

// 人员选择器组件 用到的 获取员工通用接口（所有模块 都需要传）
export function getEmpList (ModuleCode, TabId, StrJson, pageSize, pageIndex) {
  return fetch({
    module: 'workFlow',
    // url: '/API/ComData',
    url: '/API/Common',
    method: 'post',
    data: {
      Method: 'GetEmpList',
      ModuleCode,
      TabId,
      StrJson,
      pageSize,
      pageIndex
    }
  })
}

/**
 * 获取岗位
 * @param ModuleCode 模块code
 * @param StrJson c查询条件
 * @param pageSize 每页展示条数
 * @param pageIndex 第几页
 */
export function getPosition (ModuleCode, StrJson, pageSize, pageIndex) {
  return fetch({
    module: 'workFlow',
    // url: '/API/ComData',
    url: '/API/Common',
    method: 'post',
    data: {
      Method: 'GetPositionList',
      ModuleCode,
      StrJson,
      pageSize,
      pageIndex
    }
  })
}

/**
 * 员工类型字典
 */
export function getEmpType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetEmpType'
    }
  })
}

/**
 * 员工状态字典
 */
export function getEmpStatus () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetEmpStatus'
    }
  })
}

/**
 * 8.获取职层
 * @param ModuleCode 业务模块
 */
export function getJobLevel (ModuleCode) {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetJobLevel',
      ModuleCode
    }
  })
}

/**
 * 9.获取职级
 * @param ModuleCode 业务模块
 */
export function getJobGrade (ModuleCode) {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetJobGrade',
      ModuleCode
    }
  })
}

/**
 * 10.获取职能类
 * @param ModuleCode 业务模块
 */
export function getJobSerial (ModuleCode) {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetJobSerial',
      ModuleCode
    }
  })
}

/**
 * 11.获取联动字典表
 * @param ModuleCode 模块code
 * @param dicCode 字典编号
 */
export function getParentDic (ModuleCode, dicCode) {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetParentDic',
      ModuleCode,
      dicCode
    }
  })
}

/**
 * 12.获取可进行配置的字典表项
 * @param ModuleCode 模块code
 * @param dicCode 字典编号
 * @param ParentDicCode 父级字典编号
 */
export function getDicWithConfig (ModuleCode, DicType, dicCode, ParentDicCode) {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDicWithConfig',
      ModuleCode,
      DicType,
      dicCode,
      ParentDicCode
    }
  })
}

/**
 * 13.获取一个唯一的编码
 */
export function getNewId () {
  return fetch({
    url: '/API/SYSConfig',
    method: 'post',
    data: {
      Method: 'GetNewId'
    }
  })
}
