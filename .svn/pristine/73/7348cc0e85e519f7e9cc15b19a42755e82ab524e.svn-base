/**
 * Created by Administrator on 2018/8/8.
 * 薪资接口
 */
import fetch from '@/utils/fetch'
import store from '../store'
import { getToken } from '@/utils/auth'

// 字典表 ------------------------------------------------------------------------------

/**
 * 发薪周期字典
 */
export function getPayRecyle () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetPayRecyle'
    }
  })
}

/**
 * 项目字典
 */
export function getTermProject () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetTermProject'
    }
  })
}

/**
 * 项目属性字典
 */
export function getTermAttribute () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetTermAttribute'
    }
  })
}

/**
 * 项目类型字典
 */
export function getTermType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetTermType'
    }
  })
}

/**
 * 发放规则字典
 */
export function getPayRule () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetPayRule'
    }
  })
}

/**
 * 发放频率字典
 */
export function getPayFrequency () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetPayFrequency'
    }
  })
}

/**
 * 发放频率单位字典
 */
export function getPayMethod () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetPayMethod'
    }
  })
}

/**
 * 计算逻辑字典
 */
export function getPayLogic () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetPayLogic'
    }
  })
}

/**
 * 职等
 */
export function getJobLevel () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetJobLevel'
    }
  })
}

/**
 * 请假类型
 */
export function getOffWorkType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetOffWorkType'
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
 * 币种字典
 */
export function getCurrency () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetCurrency'
    }
  })
}

/**
 * 计税类型
 */
export function getTaxType () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetTaxType'
    }
  })
}

/**
 * 获取城市列表
 */
export function getCityList () {
  return fetch({
    url: '/Wage/Dic',
    method: 'post',
    data: {
      Method: 'GetCityList'
    }
  })
}

// ------------------------------------------------------------------------------------

/**
 * 获取薪资方案列表
 */
export function getSalaryList (PageSize, PageIndex) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetList',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 新增薪资方案
 */
export function addProject (strJson1, strJson2, strJson3) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'AddOne',
      strJson1,
      strJson2,
      strJson3
    }
  })
}

/**
 * 复制薪资方案
 */
export function copyOne (SchemeCode, SchemeName) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'CopyOne',
      SchemeCode,
      SchemeName
    }
  })
}

/**
 * 更改方案状态
 */
export function changeSchemeStatus (Code, Status) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'ChangeSchemeStatus',
      Code,
      Status
    }
  })
}

/**
 * 获取方案详情
 */
export function getSchemeDetail (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetSchemeDetail',
      SchemeCode
    }
  })
}

/**
 * 检查薪资方案名称唯一性
 */
export function checkUniqueName (Name, Code) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'CheckUniqueName',
      Name,
      Code
    }
  })
}

/**
 * 检查薪资方案名称唯一性
 */
export function getSchemeOrgList (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetSchemeOrgList',
      SchemeCode
    }
  })
}

/**
 * 薪资项目列表
 */
export function getTermList (SchemeCode, TaxType) {
  return fetch({
    url: '/Wage/Scheme ',
    method: 'post',
    data: {
      Method: 'GetTermList',
      SchemeCode,
      TaxType
    }
  })
}

/**
 * 更改薪资项目状态
 */
export function changeTermStatus (Code, Status) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'ChangeTermStatus',
      Code,
      Status
    }
  })
}

/**
 * 检查薪资项目名称的唯一性
 */
export function checkUniqueTermName (Name, SchemeCode, Code) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'CheckUniqueTermName',
      Code,
      Name,
      SchemeCode
    }
  })
}

/**
 * 获取项目构成数据
 */
export function getRelStructList (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetRelStructList',
      SchemeCode
    }
  })
}

/**
 * 新增/编辑薪资项目
 */
export function addTerm (strJson) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'AddTerm',
      strJson: strJson
    }
  })
}

/**
 * 获取薪资项目详情
 */
export function getTerm (Code) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetTerm',
      Code
    }
  })
}

/**
 * 更新薪资方案的审批人
 */
export function updateCheckPosition (SchemeCode, PositionCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'UpdateCheckPosition',
      SchemeCode,
      PositionCode
    }
  })
}

/**
 * 获取薪资档案列表（全部）
 */
export function getEmpTermList (obj) {
  return fetch({
    url: '/Wage/WageReport',
    method: 'post',
    data: {
      Method: 'GetEmpTermList',
      ...obj
    }
  })
}

/**
 * 获取薪资方案关联员工列表
 */
export function getSchemeEmpList (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetSchemeEmpList',
      SchemeCode,
      PageIndex: 1,
      PageSize: 9999
    }
  })
}

/**
 * 新增员工薪资档案
 */
export function addOneEmpTerm (obj) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'AddOne',
      ...obj
    }
  })
}

/**
 * 下载薪资档案上传文件模板
 */
export function buildEmpTermTemplate (SchemeCode) {
  return fetch({
    url: '/Wage/IO',
    method: 'post',
    data: {
      Method: 'BuildEmpTermTemplate',
      SchemeCode
    }
  })
}

/**
 * 上传薪资档案数据文件
 */
export function uploadEmpTerm (file, obj) {
  let param = new FormData() // 创建form对象
  console.log(file)
  for (let i = 0; i < file.length; i++) {
    param.append(file[i].name, file[i]) // 通过append向form对象添加数据
  }
  // param.append(file[0].name, file[0]) // 通过append向form对象添加数据
  param.append('Method', 'UploadEmpTerm') // 添加form表单中其他数据
  param.append('companyCode', store.getters.companyCode) // 添加form表单中其他数据
  param.append('TokenId', getToken()) // 添加form表单中其他数据
  param.append('SchemeCode', obj.SchemeCode) // 添加form表单中其他数据
  console.log(Date.parse(obj.OnDate))
  param.append('OnDate', obj.OnDate.toISOString())
  return fetch({
    url: '/Wage/IO',
    method: 'post',
    noQS: true,
    headers: {'Content-Type': 'multipart/form-data'},
    data: param
  })
}

/**
 * 获取定薪调薪列表
 */
export function getEmpTermChangeLogList (obj) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'GetEmpTermChangeLogList',
      ...obj
    }
  })
}

/**
 * 获取薪资月报列表
 */
export function getWageReportList (obj) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'GetWageReportList',
      ...obj
    }
  })
}

/**
 * 新增薪资月报
 */
export function addOneReport (obj) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'AddOne',
      ...obj
    }
  })
}

/**
 * 操作--薪资月报/普通月发薪/特殊发薪/薪资审批
 */
export function process (Code, OP, Remark) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'Process',
      Code,
      OP,
      Remark
    }
  })
}

/**
 * 获取员工薪资月报列表（普通月发薪）
 */
export function getEmpWageReportList (obj) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'GetEmpWageReportList',
      ...obj
    }
  })
}

/**
 * 获取薪资月份批次列表
 */
export function getFlowIdList (SchemeCode, OnYear, OnMonth) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'GetFlowIdList',
      SchemeCode,
      OnYear,
      OnMonth
    }
  })
}

/**
 * 计算员工薪资月报
 */
export function runEmpReport (ReportCode, EmpIds) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'RunEmpReport',
      ReportCode,
      EmpIds
    }
  })
}

/**
 * 发薪查询
 */
export function getSingleEmpReport (EmpId, OnYear, SchemeCode) {
  return fetch({
    url: '/Wage/WageReport ',
    method: 'post',
    data: {
      Method: 'GetSingleEmpReport',
      EmpId,
      OnYear,
      SchemeCode
    }
  })
}

/**
 * 员工薪资项目列表
 */
export function getEmpTermListByEmpId (EmpId, SchemeCode, type) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'GetEmpTermListByEmpId',
      EmpId,
      SchemeCode,
      type
    }
  })
}

/**
 * 获取待审批和已审批薪资月报列表
 */
export function getCommitWageReportList (obj) {
  return fetch({
    url: '/Wage/WageReport',
    method: 'post',
    data: {
      Method: 'GetCommitWageReportList',
      ...obj
    }
  })
}

/**
 * 薪资审批
 */
export function approvalReport (obj) {
  return fetch({
    url: '/Wage/WageReport',
    method: 'post',
    data: {
      Method: 'ApprovalReport',
      ...obj
    }
  })
}

/**
 * 查看备注
 */
export function getRemarkList (ReportCode) {
  return fetch({
    url: '/Wage/WageReport',
    method: 'post',
    data: {
      Method: 'GetRemarkList',
      ReportCode
    }
  })
}

/**
 * 根据薪资方案编号获取工资条列表
 */
export function getPayRollList (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetPayRollList',
      SchemeCode
    }
  })
}

/**
 * 批量更新工资条序号
 */
export function updatePayRollSort (SchemeCode, strJson) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'UpdatePayRollSort',
      SchemeCode,
      strJson
    }
  })
}

/**
 * 获取常规薪资项目列表
 */
export function getNormalTermList (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetNormalTermList',
      SchemeCode
    }
  })
}

/**
 * 获取常规薪资项目列表
 */
export function getOnceTermList (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetOnceTermList',
      SchemeCode
    }
  })
}

/**
 * 新增员工个税城市
 */
export function addTaxCity (obj) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'AddTaxCity',
      ...obj
    }
  })
}

/**
 * 新增员工个税城市
 */
export function UpdateTaxCity (obj) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'UpdateTaxCity',
      ...obj
    }
  })
}

/**
 * 获取员工个税城市列表
 */
export function getEmpTaxCityList (EmpId) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'GetEmpTaxCityList',
      EmpId
    }
  })
}

/**
 * 获取员工个税城市列表
 */
export function deleteEmpTaxCity (CityId, EmpId) {
  return fetch({
    url: '/Wage/EmpTerm',
    method: 'post',
    data: {
      Method: 'DeleteEmpTaxCity',
      CityId,
      EmpId
    }
  })
}

/**
 * 获取薪资档案列表
 */
export function getEmpSchemeList (obj) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetEmpSchemeList',
      ...obj
    }
  })
}

/**
 * 获取薪资档案列表
 */
export function editEmpScheme (EmpId, SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'EditEmpScheme',
      EmpId,
      SchemeCode
    }
  })
}

/**
 * 新增/编辑员工薪资方案关联记录
 */
export function addEmpScheme (EmpId, SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'AddEmpScheme',
      EmpId,
      SchemeCode
    }
  })
}

/**
 * 删除员工薪资方案关联记录
 */
export function deleteEmpScheme (Id) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'DeleteEmpScheme',
      Id
    }
  })
}

/**
 * 上传员工薪资方案excel文件
 */
export function uploadEmpScheme (file) {
  console.log(file)
  let param = new FormData() // 创建form对象
  for (let i = 0; i < file.length; i++) {
    param.append(file[i].name, file[i]) // 通过append向form对象添加数据
  }
  // param.append(file[0].name, file[0]) // 通过append向form对象添加数据
  param.append('Method', 'UploadEmpScheme') // 添加form表单中其他数据
  param.append('companyCode', store.getters.companyCode) // 添加form表单中其他数据
  param.append('TokenId', getToken()) // 添加form表单中其他数据
  return fetch({
    url: '/Wage/IO',
    method: 'post',
    noQS: true,
    headers: {'Content-Type': 'multipart/form-data'},
    data: param
  })
}

/**
 * 删除员工薪资方案关联记录
 */
export function changeEmpSchemeStatus (Id, State) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'ChangeEmpSchemeStatus',
      Id,
      State
    }
  })
}

/**
 * 获取奖惩设定
 */
export function getAmerce (SchemeCode, type) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      'Method': 'GetAmerce',
      SchemeCode,
      'A_Type': type
    }
  })
}

/**
 * 保存奖惩设定
 */
export function saveAmerce (SchemeCode, strJson) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'SaveAmerce',
      SchemeCode,
      strJson
    }
  })
}

/**
 * 更改奖惩设定状态
 */
export function updateAmerceStatus (SchemeCode, type, Status) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'UpdateAmerceStatus',
      SchemeCode,
      'A_Type': type,
      Status
    }
  })
}

/**
 * 获取请假设定
 */
export function getWithdrawingForLeave (SchemeCode, type) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetWithdrawingForLeave',
      SchemeCode,
      'A_Type': type
    }
  })
}

/**
 * 更改请假款项状态
 */
export function updateWithdrawingForLeaveStatus (SchemeCode, type, Status) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'UpdateWithdrawingForLeaveStatus',
      SchemeCode,
      'A_Type': type,
      Status
    }
  })
}

/**
 * 保存请假款项设定
 */
export function saveWithdrawingForLeave (SchemeCode, strJson) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'SaveWithdrawingForLeave',
      SchemeCode,
      strJson
    }
  })
}

/**
 * 获取加班设定
 */
export function getOverTime (SchemeCode) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'GetOverTime',
      SchemeCode
    }
  })
}

/**
 * 保存加班款项设定
 */
export function saveOverTime (SchemeCode, strJson) {
  return fetch({
    url: '/Wage/Scheme',
    method: 'post',
    data: {
      Method: 'SaveOverTime',
      SchemeCode,
      strJson
    }
  })
}
