/**
 * Created by Administrator on 2018/8/8.
 * 公共接口
 */
import fetch from '@/utils/fetch'
/**
 * 获取人员列表
 */
export function getEmpListByCompanyCode (PageSize, PageIndex) {
  return fetch({
    url: '/API/PA',
    method: 'post',
    data: {
      Method: 'GetEmpListByCompanyCode',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 获取组织列表
 */
export function getOrgList (PageSize, PageIndex) {
  return fetch({
    url: '/Wage/PA',
    method: 'post',
    data: {
      Method: 'GetOrgList',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 获取岗位列表
 */
export function getPositionList (param, PageSize = 100, PageIndex) {
  return fetch({
    url: '/Wage/PA',
    method: 'post',
    data: {
      Method: 'GetPositionList',
      ...param,
      PageSize,
      PageIndex
    }
  })
}

/**
 * 获取权限菜单
 */
export function getMenu () {
  // debugger
  return fetch({
    url: '/API/Account',
    method: 'post',
    data: {
      Method: 'GetVUEMenu'
    }
  })
}

/**
 * 获取组织与员工的混合树形数据
 */
export function getMixedTree (obj) {
  return fetch({
    url: '/Wage/PA',
    method: 'post',
    data: {
      Method: 'GetMixedTree',
      ...obj
    }
  })
}

/**
 *
 * @param AppCode 业务领域(Notice-公告, WorkFlow-工作流, CA-考勤, Wage-薪资, Policy-社保, PA-员工)
 */
export function getRoleRange (AppCode) {
  return fetch({
    url: '/API/Account',
    method: 'post',
    data: {
      Method: 'GetRoleRange',
      AppCode
    }
  })
}

/**
 * 文本类型字典表
 * @param AppCode 业务领域
 * @param AppCode 业务领域
 * @param moduleCode 模块类型,
 * @param DicCode 字典编号 Module--模块  ContentType--文本 TimeBreak--时间刻度 DateFormat--时间日期格式 Currency--币种
 * @param PCode 上级字典项编号
 */
export function getDicByKey (AppCode = 'SyS', moduleCode = 'SYS', DicType = 'SYS', DicCode = 'ContentType', PCode = '') {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDicByKey',
      AppCode,
      moduleCode,
      DicType,
      DicCode,
      PCode
    }
  })
}

/**
 * 数据源列表
 * @param moduleCode 业务模块
 * @param DicType 字典表类型
 */

export function getDicCollection (ModuleCode, DicType) {
  return fetch({
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDicCollection',
      ModuleCode,
      DicType
    }
  })
}
