/**
 * Created by Administrator on 2018/10/11.
 * function : 员工(PA)
 */
import fetch from '@/utils/fetch'
// import store from '../store'

// ------------------------------------------------------------------------------------
// 字典项API

// -------------------------------------------------------------------------------------

/**
 * 根据GroupCode获取所属数据组列表
 */
export function getTeam () {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetTeam',
      GroupCode: 'PA00001'
    }
  })
}

/**
 * 根据teamcode获取所属字段列表
 * @param TeamCode 分组code
 */
export function getTeamField (TeamCode) {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetTeamField',
      TeamCode
    }
  })
}

/**
 * 
 * 获取数据组列表(非树形结构数据)
 * 
*/
export function getList ( PageSize = 65535, PageIndex = 1 ) {
  return fetch({
    url: '/API/PATeam/tm',
    method: 'post',
    data: {
      Method: 'GetList',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 
 * 获取数据组列表(树形结构)
 * 
*/
export function getListTree ( PageSize = 65535, PageIndex = 1 ) {
  return fetch({
    url: '/API/PATeam/tm',
    method: 'post',
    data: {
      Method: 'GetTree',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 
 *  根据TeamCode获取所属字段列表
 * 
*/
export function teamCodeGetFeild ( TeamCode, PageSize = 65535, PageIndex = 1 ) {
  return fetch({
    url: '/API/PATeam/fd',
    method: 'post',
    data: {
      Method: 'GetList',
      TeamCode,
      PageSize,
      PageIndex      
    }
  })
}


/**
 * 3.保存员工数据
 * @param EmpId 员工Id，新入职时为0
 * @param StrJson 字段对象数组Json字符串
 */
export function saveEmpField (EmpId = 0, StrJson) {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'SaveEmpField',
      EmpId,
      StrJson
    }
  })
}

/**
 * 4.根据ModuleCode和DataSource获取所属字段的填充字典项
 * @param ModuleCode 模块code，默认PA
 * @param DicCode Field的DataSource属性值
 */
export function getDicByKey (ModuleCode = 'PA', DicCode) {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetDicByKey',
      ModuleCode,
      DicCode
    }
  })
}

/**
 * 5.根据PageCode获取页面各控件的显示属性
 * @param ModuleCode 模块code
 * @param PageCode 页面code
 */
export function getControlRoleList (ModuleCode = 'PA', PageCode = 'EmpListView') {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetControlRoleList',
      ModuleCode,
      PageCode
    }
  })
}

/**
 * 6.根据TableCode获取自定义显示列
 * @param ModuleCode 模块code
 * @param PageCode 页面code
 * @param TableCode 视图code
 */
export function getCusColList (ModuleCode = 'PA', PageCode = 'EmpListView', TableCode = 'PAR80001') {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetCusColList',
      ModuleCode,
      PageCode,
      TableCode
    }
  })
}

/**
 * 7.根据列表Code获取应显示字段
 * @param TableCode 视图code
 */
export function getShowColList (TableCode = 'PAR80001') {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetShowColList',
      TableCode
    }
  })
}

/**
 * 8.根据列表Code和查询条件获取数据
 * @param TableCode 数据组code
 * @param Filter 查询条件json
 * @param PageIndex 页标，默认1
 * @param PageSize 页容，默认10
 */
export function getPageList (TableCode = 'PAR80001', Filter = {}, PageIndex = 1, PageSize = 10) {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetPageList',
      TableCode,
      Filter: 0,
      PageIndex,
      PageSize
    }
  })
}

/**
 * 9.根据TeamCode和EmpId获取员工数据
 * @param TeamCode 数据组code
 * @param EmpId 员工Id
 */
export function getEmpData (TeamCode, EmpId) {
  return fetch({
    url: '/API/COMGroupTeam',
    method: 'post',
    data: {
      Method: 'GetEmpData',
      TeamCode,
      EmpId
    }
  })
}
