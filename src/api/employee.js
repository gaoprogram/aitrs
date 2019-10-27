/**
 * Created by Administrator on 2018/10/11.
 * function : 员工(PA)
 */
import fetch from '@/utils/fetch'
// import store from '../store'

// ------------------------------------------------------------------------------------
// 字典项API

// -------------------------------------------------------------------------------------


/********************************员工-员工管理*********************start******************** */

/**
 * 获取员工人数
 * @pageCode  PageCode ：'EmpList' 表示 在职员工页面  ，
*/

export function getTotalEmployee (PageCode) {
  return fetch({
    url: '/API/Emp/EmpList',
    method: 'post',
    data: {
      Method: 'GetTotal',
      PageCode
    }
  })
}

/****
 * 获取 员工的  分类
 * @params   PageCode:  'EmpList' 表示 在职员工页面  ，
 */
export function getTableList (PageCode) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetTableList',
      PageCode
    }
  })
}

/***
 *获取 table表格中 员工数据 
 @params PageIndex  PageSize
 * @params  TableCode  视图编码   strSearchJson 查询条件json 
 */

export function getTableEmplist (TableCode, strSearchJson, PageIndex = 1, PageSize = 9999 ) {
  return fetch({
    url: '/API/Emp/EmpList',
    method: 'post',
    data: {
      Method: 'QueryList',
      TableCode,
      strSearchJson
    }
  })
}


/****
 * 获取 自定义配置数据
 * @params  PageCode， TableCode
 */

export function getViewCol (PageCode, TableCode) {
  return fetch({
    url: '/API/Emp/EmpList',
    method: 'post',
    data: {
      Method: 'GetViewCol',
      PageCode,
      TableCode
    }
  })
}

/***
 * 员工管理 中 保存自定义视图字段配置
 * @params  PageCode TableCode  strJson
 */

export function saveViewCol (PageCode, TableCode, strJson) {
  return fetch({
    url: '/API/Emp/EmpList',
    method: 'post',
    data: {
      Method: 'SaveViewCol',
      PageCode,
      TableCode,
      strJson
    }
  })
}

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
 * @params TeamCode 为组编号
 * @params EmpId 为 员工id
 * 
*/
export function teamCodeGetFeild ( TeamCode, EmpId = 1, PageSize = 65535, PageIndex = 1 ) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetFieldList',
      TeamCode,
      EmpId,
      PageSize,
      PageIndex      
    }
  })
}


/**
 * 
 *  获取员工所有字段属性列表（员工详情页中获取分类的详细字段属性）
 * 
*/
export function getEmpFull (EmpId = 1) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetEmpFull',
      EmpId 
    }
  })
}


/**
 * 
 *  编辑员工详情字段后的保存
 * @params  TeamCode 分组编号  Id 行id  strJson 字段数组Json字符串,
 * 
*/
export function saveEmpFieldData (TeamCode, Id, strJson) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'Save',
      TeamCode,
      Id,
      strJson
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


/**
 * 获取员工头像相关信息
 * @param {*} EmpId  员工id 新入职为 0  
 */

export function getEmpInfo ( EmpId ) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetEmpInfo',
      EmpId
    }
  })
 }

 /**
  * 获取可用页面事件
  * @params  PageCode  页面码
  */
 export function getPageEventList ( PageCode ) {
   return fetch({
     url: '/API/Emp/Event',
     method: 'post',
     data: {
       Method: 'GetPageEventList',
       PageCode
     },
   })
 }

 /**
  * 初始化事件实例
  * @param EventCode  事件编码
  */
export function loadEvent ( EventCode ) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'LoadEvent',
      EventCode
    }
  })
}
/***
 * 执行事件实例
 * @params [*]EventCode 事件编码  StrJson
 * @params  EmpId 员工id   非必须
 * 
 */
export function execute (EventCode, StrJson, EmpId) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'Execute',
      EventCode,
      StrJson,
      EmpId
    }
  })
}


/****
 *删除员工
 * @params  EmpId  员工Id
 */
export function deleteEmp (EmpId) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'Delete',
      EmpId
    }
  })
}

/**
 * 
 * 员工转正
 * @param EmpId 员工Id , BeginDate 生效时间， 员工类型 EmpType， 员工状态 EmpStatus
 */
export function empBeRegular (EmpId, BeginDate, EmpType, EmpStatus) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'BeRegular',
      EmpId,
      BeginDate,
      EmpType,
      EmpStatus
    }
  })
}

/**
 * 调转
 * @param  EmpId 员工Id， BeginDate 生效时间  strJson
 * 
 */
export function empTransfer (EmpId, BeginDate, strJson) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'Transfer',
      EmpId,
      BeginDate,
      strJson
    }
  })
}
/**
 * 获取离职表单数据
 *  
 */
export function getLeaveJobFieldList() {
  return fetch({
    url: '/API/Dimission',
    method: 'post',
    data: {
      Method: 'GetFieldValueList'
    }
  })
}

/**
 * 保存离职表单数据
 * @param  EmpId 员工id  StrJson 
 */
export function saveLeaveJobFieldList(EmpId, StrJson){
  return fetch({
    url: '/API/Dimission',
    method: 'post',
    data: {
      Method: 'Save',
      EmpId,
      StrJson
    }
  })
}
/**
 * 修改员工类型
 * @params  EmpId 员工id  BeginDate 生效日期 EmpType 员工类型
 */
export function changeEmpType (EmpId, BeginDate, EmpType) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'ChangeEmpType',
      EmpId,
      BeginDate,
      EmpType
    }
  })
}

/**
 * 修改员工状态
 * @param EmpId 员工id  BeginDate 生效日期， EmpStatus 员工状态 
 */
export function changeEmpStatus (EmpId, BeginDate, EmpStatus) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'ChangeEmpStatus',
      EmpId,
      BeginDate,
      EmpStatus
    }
  })
}

/**
 * 修改入职日期
 * @param EmpId 员工id  Date 入职日
 */
export function changeEmpEntryDate (EmpId, Date) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'ChangeEmpEntryDate',
      EmpId,
      Date
    }
  })
}

/**
 * 修改离职日期
 * @param EmpId 员工id Date 离职日期
 */
export function changeEmpLeaveDate (EmpId, Date) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'ChangeEmpDimissionDate',
      EmpId,
      Date
    }
  })
}

/**
 *获取员工当前工作岗位
 * @param  EmpId 员工id
 */
export function getEmpCurrentWorkState (EmpId) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetEmpCurrentWorkState',
      EmpId
    }
  })
}


/**
 * 获取档案机构列表
 * @param  PageSize    PageIndex
*/

export function getOrganization (PageSize, PageIndex) {
  return fetch({
    url: '/API/ArchiveOrg',
    method: 'post',
    data: {
      Method: 'GetList',
      PageSize,
      PageIndex
    }
  })
}

/**
  * 保存档案机构列表
  * @param strJson   档案机构json
*/

export function saveOraganization (strJson) {
  return fetch({
    url: '/API/ArchiveOrg',
    method: 'post',
    data: {
      Method: 'Save',
      strJson
    }
  })
}

/***
 * 根据id获取档案机构
 * @params Id
 */
export function getPersonnelFile (Id) {
  return fetch({
    url: '/API/ArchiveOrg',
    method: 'post',
    data: {
      Method: 'Get',
      Id
    }
  })
}

/**
 *  根据id 获取 行政区域
 * @param CountryId
 */

export function getRegionData (CountryId) {
  return fetch({
    url: '/DIc',
    method: 'post',
    data: {
      Method: 'GetRegion',
      CountryId
    }
  })
}
/**
 * 修改档案机构状态 
 * @param   Code 档案机构编号 State 状态值
 */
export function changeOraganizationState (Code, State){
  return fetch({
    url: '/API/ArchiveOrg',
    method: 'post',
    data: {
      Method: 'ChangeState',
      Code,
      State
    }
  })
}
/********************************员工-员工管理*********************end******************** */



/********************************员工-事件处理器*********************start******************** */
/**
 * 获取事件配置列表
 * @param PageIndex页码  PageSize 每页条数
 */
export function getEventDisposeList (PageSize = 10, PageIndex = 1) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'GetList',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 获取单个事件配置
 * @params Code 事件码
 */
export function getSingleEventDispose (Code) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'Get',
      Code
    }
  })
}

/**
 * 保存单个事件配置
 * @params strJson 事件对象Json
 * @params Id 时间对象Id
 */
export function saveSingleEventDispose (strJson, Id) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'Save',
      strJson,
      Id
    }
  })
}


/**
 * 获取事件配置中所有的分组
 *  
 */
export function getEventSetTeamList () {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetSimpleTeamList',
    }
  })
}

/**
 * 根据teamCode 来获取该team下的 所有字段
 * @params TeamCode
 */
export function getEventSetFieldList (TeamCode) {
  return fetch({
    url: '/API/Emp',
    method: 'post',
    data: {
      Method: 'GetSimpleFieldList',
      TeamCode
    }
  })
}

/****
 * 获取事件配置中 已经勾选设置的选项
 * @params  EventCode 事件编码
 */
export function getCheckedSetFieldList (EventCode) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'GetTeamFieldList',
      EventCode
    }
  })
}


/***
 * 保存事件配置中的设置 
 * @params EventCode 事件码
 * @params  strJsonTeam 
 */
export function saveEventSetFieldList (EventCode, strJsonTeam) {
  return fetch({
    url: '/API/Emp/Event',
    method: 'post',
    data: {
      Method: 'SaveTeamFieldList',
      EventCode,
      strJsonTeam
    }
  })
}
/********************************员工-事件处理器*********************end******************** */
