/**
 * Created by Administrator on 2018/8/8.
 * 审批流接口
 */
import fetch from '@/utils/fetch'
import store from '../store'
import { getToken } from '@/utils/auth'

// 字典接口--------------------------------------------------

/**
 * 获取员工
 * @param empType 员工类型，多个值用逗号相连或者用json数组
 * @param empStatus 员工状态，多个值用逗号相连或者用json数组
 * @param keyword 人员编号或姓名关键字
 * @param PageSize 页大小，默认10
 * @param PageIndex 当前页码，默认1
 */
export function getEmpListByCompanyCode (empType, empStatus, keyword, PageSize = 65535, PageIndex = 1) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/PA',
    method: 'post',
    data: {
      Method: 'GetEmpListByCompanyCode',
      empType,
      empStatus,
      keyword,
      PageSize,
      PageIndex
    }
  })
}

/**
 * 获取组织列表
 * @param PageSize 每页数量
 * @param PageIndex 当前页
 */
export function getOrgList (PageSize = 65535, PageIndex = 1) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/PA',
    method: 'post',
    data: {
      Method: 'GetOrgList',
      PageSize,
      PageIndex
    }
  })
}

/**
 * 选择岗位
 * @param parentOrgCode 所属组织Code
 * @param keyword 岗位编号或名称关键字
 * @param PageSize 页大小，默认10
 * @param PageIndex 当前页码，默认1
 */

export function getPositionList (param, PageSize = 65535, PageIndex = 1) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/PA',
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
 * 获取混合组织数据
 * @param org 部门编号，多个值用逗号相连或者用json数组
 * @param empType 员工类型，多个值用逗号相连或者用json数组
 * @param empStatus 员工状态，多个值用逗号相连或者用json数组
 * @param keyword 人员编号或姓名关键字
 * @param gender 性别
 * @param PageSize 页大小，默认10
 * @param PageIndex 当前页码，默认1
 */
export function getMixedTree (obj, PageSize = 65535, PageIndex = 1) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/PA',
    method: 'post',
    data: {
      Method: 'GetMixedTree',
      ...obj,
      PageSize,
      PageIndex
    }
  })
}

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
 * 抄送人明细规则
 */
export function deliveryWayCopy () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'CopyerWay'
    }
  })
}

/**
 * 抄送人规则
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
 * 加签模式
 */
export function askforHelpSta () {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDic',
      APPCode: 'WorkFlow',
      DicCode: 'AskforHelpSta'
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
 * 节点类型（节点工作模式）
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
 * 获取业务类型列表
 */
export function getBusinessTypeList () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetBusinessTypeList'
    }
  })
}

/**
 * 获取审批/流程列表
 */
export function getFlowList () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFlowList'
    }
  })
}

// 业务接口------------------------------------------------------------------------------------------------------

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

/**
 * 根据按表单字段查询 非文本字段的表单 获取字典表类型列表
 * @param DicCode 字典编号
 * @param DicType 字典类型
 */
export function getFieldDicLlist (DicCode, DicType) {
  return fetch({
    module: 'Dic',
    url: '/API/Dic',
    method: 'post',
    data: {
      Method: 'GetDicByKey',
      ModuleCode: 'WorkFlow',
      DicCode,
      DicType
    }
  })
}

/**
 * 1.管理员登录后台
 */
export function adminLogin (empid) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AdminLogin',
      userNo: empid
    }
  })
}

/**
 * 2.普通用户登录
 */
export function login () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Login',
      userNo: store.getters.userCode
    }
  })
}

/**
 * 3.退出登录（管理员、普通用户通用）
 */
export function logout () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Logout'
    }
  })
}

/**
 * 业务领域
 */
export function getBusinessAreaList () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetBusinessAreaList'
    }
  })
}

/**
 * 审批流首页列表
 * @param searchKey 关键词
 * @param state -1表示全部，1 表示 启用  0 表示 停用 默认是查询 启用的
 */
export function companyTableList (state = 1, searchKey) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'CompanyTableList',
      searchKey,
      state
    }
  })
}

/**
 * 审批排序
 * @param Sort 排序后的数组
 */
export function sortApproval (Sort) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SortApproval',
      Sort
    }
  })
}

export function setCompanyTableEnable (CompanyApprovalId, isEnable) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SetCompanyTableEnable',
      CompanyApprovalId,
      isEnable
    }
  })
}

/**
 * 获取审批基本信息
 */
export function getApprove (CompanyApprovalId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetApprove',
      CompanyApprovalId
    }
  })
}

/**
 * 保存审批基本信息
 */
export function saveApprove (flowAttr, CompanyApprovalId = '00000000-0000-0000-0000-000000000000') {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveApprove',
      flowAttr,
      CompanyApprovalId
    }
  })
}

/**
 * 删除审批
 * @param companyApprovalId  审批Id
 */
export function deleteApprove (companyApprovalId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteApprove',
      companyApprovalId
    }
  })
}

/**
 * 获取审批基本信息高级
 */
export function getApproveAdvance (CompanyApprovalId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetApproveAdvance',
      CompanyApprovalId
    }
  })
}

/**
 * 保存审批基本信息高级
 * @param CompanyApprovalId 审批流Id
 * @param flowAttr 基本信息对象
 */
export function saveApproveAdvance (CompanyApprovalId = '00000000-0000-0000-0000-000000000000', flowAttr) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveApproveAdvance',
      flowAttr,
      CompanyApprovalId
    }
  })
}

/**
 * 分页获取审批规则表
 * @param CompanyApprovalId
 * @param queryObj 查询参数 Key isCanStart State pageSize pageNum
 */
export function getFlowRulelist (CompanyApprovalId, queryObj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFlowRulelist',
      CompanyApprovalId,
      ...queryObj
    }
  })
}

/**
 * 检查审批是否有新版本
 * @param flowId 流程id
 */
export function checkNewVersionTable (flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'CheckNewVersionTable',
      flowId
    }
  })
}

/**
 * 显示表单新版本号
 * @param flowId 流程id
 * @param nodeId 节点id
 */
export function showNewVersionOfTable (flowId, nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowNewVersionOfTable',
      flowId
    }
  })
}

/**
 * 修改流程状态
 * @param flowId 流程id
 * @param state 状态值（2上架,3下架）
 */
export function setFlowState (flowId, state, useNewTable) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SetFlowState',
      flowId,
      state,
      useNewTable
    }
  })
}

/**
 * 流程升版
 * @param flowId 流程id
 * @param useNewTable 是否使用最新版表单
 */
export function upgradeFlowVersion (flowId, useNewTable) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'UpgradeFlowVersion',
      flowId,
      useNewTable
    }
  })
}

/**
 * 移动流程
 * @param companyApprovalId 审批id
 * @param flows 流程id数组
 */
export function moveFlow (companyApprovalId, flows) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'MoveFlow',
      companyApprovalId,
      flows
    }
  })
}

/**
 * 复制流程
 * @param companyApprovalId 审批id
 * @param flowId 流程id
 */
export function copyFlow (companyApprovalId, flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'CopyFlow',
      companyApprovalId,
      flowId
    }
  })
}

/**
 * 获取引用该表单的流程
 * @param tableCode  表单code
 */
export function getUsedFlowlist (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetUsedFlowlist',
      tableCode
    }
  })
}

/**
 * 获取引用该表单的流程
 * @param templateCode  模版code
 */
export function getHistoryVersion (templateCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetHistoryVersion',
      templateCode
    }
  })
}

/**
 * 获取流程配置
 * @param flowId  流程Id
 * @param roleRange  权限
 */
export function getFlowSet (flowId, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFlowSet',
      flowId,
      roleRange
    }
  })
}

/**
 * 保存流程配置
 * @param flowId  流程Id
 * @param roleRange  权限
 */
export function saveFlowSet (flowId, roleRange, flowAttr) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveFlowSet',
      flowId,
      roleRange,
      flowAttr
    }
  })
}

/**
 * 表单流程配置——流程表单 获取赋值 的下拉框数据用于初始化下拉框的选项
 * @param tableCode / 主表code 或者明细表code
 */
export function GetEvaluationFields (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetEvaluationFields',
      tableCode
    }
  })
}

/**
 * 表单流程配置——流程表单 获取赋值
 * @param flowId  流程Id
 * @param nodeId  节点Id
 * @param mainTableCode  主表code
 * @param detailTableCode  明细code
 */
export function GetEvaluation (flowId, mainTableCode, detailTableCode, nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetEvaluation',
      flowId,
      nodeId,
      mainTableCode,
      detailTableCode
    }
  })
}

/**
 * 表单流程配置——流程表单 保存赋值
 * @param flowId  流程Id
 * @param nodeId  节点Id
 * @param mainTableCode  主表code
 * @param detailTableCode  明细code
 */
export function SaveEvaluation (flowId, nodeId, mainTableCode, detailTableCode, evaluations) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SaveEvaluation',
      flowId,
      nodeId,
      mainTableCode,
      detailTableCode,
      evaluations
    }
  })
}

/**
 * 表单流程配置——节点设置——流转——获取支流
 * @param roleRange
 * @param nodeId  节点Id
 */
export function GetNodeTributaryAttr (nodeId, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetNodeTributaryAttr',
      nodeId,
      roleRange
    }
  })
}

/**
 * 表单流程配置——节点设置——流转——保存支流
 * @param roleRange
 * @param nodeId  节点Id
 * @param nodeAttr
 */
export function SaveNodeTributaryAttr (nodeId, nodeAttr, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveNodeTributaryAttr',
      nodeId,
      roleRange,
      nodeAttr
    }
  })
}

/**
 * 4.获取规则列表
 */
export function getRuleList (CompanyApprovalId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetRuleList',
      CompanyApprovalId
    }
  })
}

/**
 * 5.新增规则
 * @param Name 规则名称
 * @param isEnable 是否启用
 */
export function addRule (CompanyApprovalId, Name, isEnable) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddRule',
      CompanyApprovalId,
      Name,
      isEnable
    }
  })
}

/**
 * 19.保存规则
 * @param flowRuleId 规则Id
 * @param rule 审批人，json格式
 * @param Name 规则名称
 * @param isEnable 是否启用
 */
export function updateRule (FlowRuleId, Name) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'UpdateRule',
      FlowRuleId,
      Name
    }
  })
}

/**
 * 20.获取规则
 * @param FlowRuleId 规则Id
 */
export function getRule (FlowRuleId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetRule',
      FlowRuleId
    }
  })
}

/**
 * 30.删除规则
 * @param flowRuleId 规则id
 */
export function deleteRule (flowRuleId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteRule',
      flowRuleId
    }
  })
}

/**
 * 6.启用分支条件---停用
 * @param flowRuleId 规则Id
 */
export function enableBranch (flowRuleId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'EnableBranch',
      flowRuleId
    }
  })
}

/**
 * 7.禁用分支条件---停用
 * @param flowRuleId 规则Id
 */
export function disableBranch (flowRuleId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DisableBranch',
      flowRuleId
    }
  })
}

/**
 * 8.获取发起人
 * @param flowId 流程ID
 * @param FlowRuleId 规则Id
 */
export function getFlowStarter (flowId = 0, FlowRuleId = '') {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFlowStarter',
      flowId,
      FlowRuleId
    }
  })
}

/**
 * 9.保存发起人
 * @param FlowRuleId 规则Id
 * @param Delivery 发起人json([{"DeliveryWay":0,"DeliveryParas":["1","2"]}])
 */
export function saveFlowStarter (flowId = 0, FlowRuleId = '', Delivery) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveFlowStarter',
      flowId,
      FlowRuleId,
      Delivery
    }
  })
}

/**
 * 10.获取条件
 * @param mainNodeId 当前节点
 * @param toNodeId 流出节点
 */
export function getBranchCondition (mainNodeId, toNodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetBranchCondition',
      mainNodeId,
      toNodeId
    }
  })
}

/**
 * 11.保存条件
 * @param branchCode 分支code
 * @param branchAttr 分支属性，json格式
 */
export function saveBranchCondition (nodeToNodeId, branchAttr) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveBranchCondition',
      nodeToNodeId,
      branchAttr
    }
  })
}

/**
 * 12.字段设置---获取节点列表
 * @param FlowRuleId 规则id
 * @param nodeId 节点id
 * @param fieldCode 表单code
 */
export function getNodeList (FlowRuleId = '', FlowId, nodeId = '', fieldCode = '') {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetNodeList',
      FlowRuleId,
      FlowId,
      nodeId,
      fieldCode
    }
  })
}

/**
 * 新增节点
 * @param FlowRuleId 规则ID
 * @param newNode 新节点对象  name / runModel
 */
export function addNode (FlowRuleId, newNode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddNode',
      FlowRuleId,
      ...newNode
    }
  })
}

/**
 * 删除节点
 * @param NodeId 节点id
 */
export function deleteNode (NodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteNode',
      NodeId
    }
  })
}

/**
 * 节点设置 中table表格 节点排序功能
 * @param nodes 节点数组，json格式
 */
export function SortNode (nodes) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SortNode',
      nodes
    }
  })
}

/**
 * 13.批量添加分支条件
 * @param FlowRuleId 规则Id
 * @param Num 数量
 */
export function batchAddBranch (CompanyApprovalId, FlowRuleId, Num) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'BatchAddBranch',
      CompanyApprovalId,
      FlowRuleId,
      Num
    }
  })
}

/**
 * 14.删除分支
 * @param CompanyApprovalId 审批id
 * @param nodeToNodeId 节点主键
 */
export function deleteBranch (CompanyApprovalId, nodeToNodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteBranch',
      CompanyApprovalId,
      nodeToNodeId
    }
  })
}

/**
 * 图形设计中，中间节点 新增 插入节点
 * @param {*} formerId 前一个节点的NodeToNodeId值
 * @param {*} latterId 后一个节点的NodeToNodeId值，没有可不传，或者传Guid.Empty
 */
export function insertNode(formerId, latterId="", globalLoading=false, domClass="") {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    globalConfigs: {
      globalLoading,
      domClass
    },
    data: {
      Method: 'InsertNode',
      formerId,
      latterId
    }
  })
}




/**
 * 15.获取审批人
 * @param nodeToNodeId 主键
 * @param nodeId 节点Id
 */
export function getApprover (nodeToNodeId = '', nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetApprover',
      nodeToNodeId,
      nodeId
    }
  })
}

/**
 * 16.保存审批人
 * @param branchCode 分支code
 * @param delivery 审批人，json格式
 */
export function saveApprover (nodeToNodeId = '', nodeId = 0, Delivery) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveApprover',
      nodeId,
      nodeToNodeId,
      Delivery
    }
  })
}

/**
 * 添加下一步审批人
 * @param mainNodeId MainNodeId值
 * @param toNodeId ToNodeId值
 * @param delivery 审批人，json格式
 */
export function addNextStep (mainNodeId, toNodeId, delivery) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddNextStep',
      mainNodeId,
      toNodeId,
      delivery
    }
  })
}

/**
 * 17.获取抄送人
 * @param nodeToNodeId 主键
 * @param nodeId 当前节点id
 */
export function getCc (nodeToNodeId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetCc',
      nodeId,
      nodeToNodeId
    }
  })
}

/**
 * 18.保存抄送人
 * @param nodeToNodeId 主键
 * @param nodeId 当前节点id
 * @param Cc 抄送人，json格式 ({"Cc":{"CCIsStations":true,"CCIsDepts":true,"CCIsEmps":true},"CcDept":[{"FK_Dept":"1"}],"CcEmp":[{"FK_Emp":"2"}],"CcStation":[{"FK_Station":"20036"}]})
 */
export function saveCc (nodeToNodeId, nodeId = 0, Cc) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveCc',
      nodeId,
      nodeToNodeId,
      Cc
    }
  })
}

/**
 * 21.新增审批人组
 * @param Name 审批人组名称
 * @param delivery 审批人 ([{"DeliveryWay":0,"DeliveryParas":["1","2"]}]) DeliveryWay 节点访问规则, DeliveryParas 规则下的值
 */
export function addDeliveryGroup (Name, delivery) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddDeliveryGroup',
      delivery,
      Name
    }
  })
}

/**
 * 22.获取审批人组基本信息
 */
export function getDeliveryGroupInfo () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetDeliveryGroupInfo'
    }
  })
}

/**
 * 23.获取审批人组
 * @param code 审批人组code
 */
export function getDeliveryGroup (code) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetDeliveryGroup',
      code
    }
  })
}

/**
 * 24.删除审批人组
 * @param code 审批人组code
 */
export function deleteDeliveryGroup (code) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteDeliveryGroup',
      code
    }
  })
}

/**
 * 25.分支排序
 * @param Sort 分支序号，json字符串格格式 [{"Code":"64C659B0-2AA8-4502-D517-39E7EB8A6312","PRI":3}] (Code, 分支code  | PRI, 优先级)
 */
export function branchSort (Sort) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'BranchSort',
      Sort
    }
  })
}

/**
 * 26.规则排序
 * @param Sort 规则序号，json格式 [{"Id":"CAF3802A-1F1E-AE5C-E767-39E7C377D976","Idx":1}] (Id, 规则id  | Idx, 序号(base-info))
 */
export function roleSort (Sort) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'RoleSort',
      Sort
    }
  })
}

/**
 * 获取表单字段列表
 * @params   flowRuleId    nodeId
 */
export function getFieldList (flowRuleId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFieldList',
      flowRuleId,
      nodeId
    }
  })
}

/**
 * 39.获取主表单列表
 */
export function getCompanyTableList (flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetCompanyTableList',
      flowId
    }
  })
}

/**
 * 节点设置--字段控制、获取主表、明细表二级下拉框数据
 * @param flowId 流程id
 */
export function getMainAndDetailTables (flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetMainAndDetailTables',
      flowId
    }
  })
}

/**
 * 节点设置--支流- 按明细表启动时，获取明细表启动字段下拉选项
 * @param tableCode  表code
 */
export function getConditionFields (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetConditionFields',
      tableCode
    }
  })
}

/**
 * 重命名业务领域
 * @param businessAreaCode 业务领域code
 * @param name 修改后的名称
 */
export function renameBusinessArea (businessAreaCode, name) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'RenameBusinessArea',
      businessAreaCode,
      name
    }
  })
}

export function sortBusinessArea (data) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SortBusinessArea',
      data
    }
  })
}

/**
 * 40.获取字段权限表单列表
 */
export function getFieldRoleList (TableCode, flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFieldRoleList',
      TableCode,
      flowId
    }
  })
}

/**
 * 41.保存字段权限列表
 */
export function saveFieldRoleList (flowId, tableCode, teams) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveFieldRoleList',
      flowId,
      tableCode,
      teams
    }
  })
}

/**
 * 42.获取明细表列表
 */
export function getDetailTableList (flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetDetailTableList',
      flowId
    }
  })
}

/**
 * 43.获取明细表字段权限
 */
export function getDetailFieldRoleList (flowId, detailTableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetDetailFieldRoleList',
      flowId,
      detailTableCode
    }
  })
}

/**
 * 44.保存明细表字段权限
 */
export function saveDetailFieldRoleList (flowId, detailTableCode, teams) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveDetailFieldRoleList',
      flowId,
      detailTableCode,
      teams
    }
  })
}

/**
 * 45.获取主表功能权限列表
 * @params  在流程配置界面中的流程表单——功能控制页面 forFlowOnly 传 true 且 nodeId 传 0
 */
export function getFunctionRoleList (flowId, roleRange, nodeId, forFlowOnly = false) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFunctionRoleList',
      flowId,
      roleRange,
      nodeId,
      forFlowOnly
    }
  })
}

/**
 * 46.保存主表功能权限列表
 */
export function saveFunctionRoleList (flowId, strJson, roleRange, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveFunctionRoleList',
      flowId,
      strJson,
      roleRange,
      nodeId
    }
  })
}

/**
 * 47.获取明细表功能权限列表
 * @params  在流程配置界面中的流程表单——功能控制页面 forFlowOnly 传 true 且 nodeId 传 0
 */
export function getDetailFunctionRoleList (flowId, roleRange, nodeId, forFlowOnly = false) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetDetailFunctionRoleList',
      flowId,
      roleRange,
      nodeId,
      forFlowOnly
    }
  })
}

/**
 * 48.保存明细表功能权限列表
 */
export function saveDetailFunctionRoleList (flowId, nodeFunctionRoles, roleRange, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveDetailFunctionRoleList',
      flowId,
      nodeFunctionRoles,
      roleRange,
      nodeId
    }
  })
}

/**
 * 49.获取附件功能权限列表
 * @params  在流程配置界面中的流程表单——功能控制页面 forFlowOnly 传 true 且 nodeId 传 0
 */
export function getAttachmentFunctionRoleList (flowId, roleRange, nodeId, forFlowOnly = false) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetAttachmentFunctionRoleList',
      flowId,
      roleRange,
      nodeId,
      forFlowOnly
    }
  })
}

/**
 * 50.保存附件功能权限列表
 */
export function saveAttachmentFunctionRoleList (flowId, nodeFunctionRoles, roleRange, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveAttachmentFunctionRoleList',
      flowId,
      nodeFunctionRoles,
      roleRange,
      nodeId
    }
  })
}

/**
 * 获取节点表单数据 / 获取节点主表列表
 * @param flowId 流程id
 * @param nodeId 节点id
 */
export function getNodeTable (flowId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetNodeTable',
      flowId,
      nodeId
    }
  })
}

/**
 * 保存节点表单数据
 * @param flowId
 * @param nodeId
 * @param strJson
 * @constructor
 */
export function saveNodeTable (flowId, nodeId, strJson) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SaveNodeTable',
      flowId,
      nodeId,
      strJson
    }
  })
}

/**
 * 获取节点属性
 * @param nodeId 节点id
 * @param roleRange 权限
 */
export function getNodeAttr (nodeId, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetNodeAttr',
      nodeId,
      roleRange
    }
  })
}

/**
 * 保存节点属性
 * @param nodeId 节点id
 * @param nodeAttr 节点配置json
 * @param roleRange 权限
 */
export function saveNodeAttr (nodeId, nodeAttr, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveNodeAttr',
      nodeId,
      nodeAttr,
      roleRange
    }
  })
}

/**
 * 获取节点流转属性
 * @param nodeId 节点id
 * @param roleRange 权限
 */
export function getNodeMoveAttr (nodeId, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetNodeMoveAttr',
      nodeId,
      roleRange
    }
  })
}

/**
 * 保存节点流转
 * @param nodeId 节点id
 * @param nodeAttr 节点配置json
 * @param roleRange 权限
 */
export function saveNodeMoveAttr (nodeId, nodeAttr, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveNodeMoveAttr',
      nodeId,
      nodeAttr,
      roleRange
    }
  })
}

/**
 * 获取出口方向
 * @param nodeId 节点id
 * @param flowId 流程id
 */
export function getToNodeSet (nodeId, flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetToNodeSet',
      nodeId,
      flowId
    }
  })
}

/**
 * 获取节点自定义按钮
 * @param nodeId 节点id
 * @param roleRange 权限
 */
export function getNodeBtnAttr (nodeId, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetNodeBtnAttr',
      nodeId,
      roleRange
    }
  })
}

/**
 * 保存节点自定义按钮
 * @param nodeId 节点id
 * @param nodeAttr 配置属性
 * @param roleRange 权限
 */
export function saveNodeBtnAttr (nodeId, nodeAttr, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveNodeBtnAttr',
      nodeId,
      nodeAttr,
      roleRange
    }
  })
}

/**
 * 51.发起
 * @param searchKey 搜索关键字
 */
export function startList (searchKey) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'StartList',
      searchKey
    }
  })
}

/**
 * 52.发起
 * @param no 流程编号
 */
export function start (no) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Start',
      no
    }
  })
}

/**
 * 53.发起起始页字段动态加载---主表和字段权限配置
 * @param no 流程编号
 * @param nodeId 节点Id，开始节点Id是流程编号no+001
 */
export function loadFieldAndRoles (no, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'LoadFieldAndRoles',
      no,
      nodeId
    }
  })
}

/**
 * 54.发起初始页字段动态加载---明细表和字段权限配置
 * @param no
 * @param nodeId
 */
export function loadDetailFieldAndRoles (no, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'LoadDetailFieldAndRoles',
      no,
      nodeId
    }
  })
}

/**
 * 56.保存主表值
 * @param no 流程编号
 * @param nodeId 节点Id，开始节点Id是流程编号no+001
 * @param workId 工作id
 * @param mainValue 主表值，json格式
 */
export function saveMainValue (no, nodeId, workId, mainValue) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveMainValue',
      no,
      nodeId,
      workId,
      mainValue
    }
  })
}

/**
 * 56.保存明细值
 * @param no 流程编号
 * @param nodeId 节点Id，开始节点Id是流程编号no+001
 * @param workId 工作id
 * @param detailValue 明细表值，json格式
 */
export function saveDetailValue (no, nodeId, workId, detailValue) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveDetailValue',
      no,
      nodeId,
      workId,
      detailValue
    }
  })
}

/**
 * 保存工作实例
 * @param no 流程编号
 * @param nodeId 工作id
 * @param workId 节点id
 */
export function saveWork (no, nodeId, workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveWork',
      no,
      nodeId,
      workId
    }
  })
}

/**
 * 查看流程轨迹
 * @param Workid 工作id
 * @param nodeId 节点id
 * @param no 流程编号
 */
export function getTrackForm (workId, nodeId, no) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetTrackForm',
      workId,
      nodeId,
      no
    }
  })
}

/**
 * 获取待办列表
 * @param obj 查询对象
 */
export function todolist (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Todolist',
      ...obj
    }
  })
}

/**
 * 在途流程列表
 * @param obj 查询对象
 */
export function runingList (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'RuningList',
      ...obj
    }
  })
}

/**
 * 我发起的流程
 * @param obj 查询对象
 */
export function myStartFlow (obj, globalLoading, domClass) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'MyStartFlow',
      ...obj
    },
    globalConfigs: {
      globalLoading,
      domClass
    }    
  })
}

/**
 * 我审批的流程
 * @param obj 查询对象
 */
export function myJoinFlow (obj, globalLoading, domClass) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'MyJoinFlow',
      ...obj
    },
    globalConfigs: {
      globalLoading,
      domClass
    }       
  })
}

/**
 * 抄送给我的
 * @param obj 查询对象
 */
export function getCcList (obj, globalLoading, domClass) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetCcList',
      ...obj
    },
    globalConfigs: {
      globalLoading,
      domClass
    }      
  })
}

/**
 * 我关注的流程
 * @param obj 查询对象
 */
export function myFocusFlow (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'MyFocusFlow',
      ...obj
    }
  })
}

/**
 * 62.查看表单
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param roleRange 权限
 * @param ccPk 抄送提示 只有 抄送我的页面 才会有这个 抄送提示
 * @param pageType  待办为 0， 在途、我发起的、我审批的、抄送我的、我关注的 为1
 * @param selectNodeId 切换节点后 节点id
 */
export function getForm (no, workId, nodeId, roleRange = 0, pageType = -1, ccPk="", selectNodeId ) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetForm',
      no,
      workId,
      nodeId,
      roleRange,
      ccPk,
      pageType,
      selectNodeId
    }
  })
}

/**
 * getform 接口中分拆出来的 权限接口 getworkFunctionRole
 * 
 */
export function getWorkFunctionRole (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'getWorkFunctionRole',
      workId
    }
  })
}


/**
 * 获取标签展示设置
 * @param flowId 流程id
 * @param roleRange 权限
 * @param nodeId 节点id
 */
export function getTagSet (flowId, roleRange, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetTagSet',
      flowId,
      roleRange,
      nodeId
    }
  })
}

/**
 * 保存标签展示设置
 * @param flowId 流程id
 * @param roleRange 权限
 * @param nodeId 节点id
 * @param attr 配置的属性
 */
export function saveTagSet (flowId, roleRange, nodeId, attr) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveTagSet',
      flowId,
      roleRange,
      nodeId
    }
  })
}

/**
 * 59.发送/同意/提交
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param opinion 审批意见
 */
export function send (no, workId, nodeId, opinion) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Send',
      no,
      workId,
      nodeId,
      opinion
    }
  })
}

/**
 *  添加下一步接收人后提交
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param opinion 审批意见
 * @param accepters 接收人，Delivery对象，json格式
 */
export function addNextStepAccepters (no, workId, nodeId, opinion, accepters) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddNextStepAccepters',
      no,
      workId,
      nodeId,
      opinion,
      accepters
    }
  })
}

/**
 * 67.挂起
 * @param no 流程编号
 * @param workId 工作id
 * @param hungUpWay 挂起方式（0永远挂起，1在指定日自动解除挂起）
 * @param date 指定日
 * @param note 挂起原因
 */
export function hungUp (no, nodeId, workId, hungUpWay, date, note) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'HungUp',
      no,
      nodeId,
      workId,
      hungUpWay,
      date,
      note
    }
  })
}

/**
 * 68. 取消挂起
 * @param no 流程编号
 * @param workId 工作id
 */
export function unHungUp (no, workId, nodeId, note) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'UnHungUp',
      no,
      workId,
      nodeId,
      note
    }
  })
}

export function cc (workId, nodeId, title, doc, emps, depts, stations, opinion) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Cc',
      title,
      workId,
      'fk_Node': nodeId,
      doc,
      emps,
      depts,
      stations,
      opinion
    }
  })
}

/**
 * 69.申请任务
 * @param workId 工作id
 */
export function applyTask (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ApplyTask',
      workId
    }
  })
}

/**
 * 70.放回任务池
 * @param workId 工作id
 */
export function putIntoTaskPool (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'PutIntoTaskPool',
      workId
    }
  })
}

/**
 * 71.拒绝
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param opinion 拒绝意见
 */
export function refuse (no, workId, nodeId, opinion) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Refuse',
      no,
      workId,
      nodeId,
      opinion
    }
  })
}

/**
 * 72.转交
 * @param no 流程编号
 * @param workId 工作id
 * @param nodeId 节点id
 * @param message 转交消息
 * @param toEmp 对方编号
 */
export function shift (no, workId, nodeId, message, toEmp) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Shift',
      no,
      workId,
      nodeId,
      message,
      toEmp
    }
  })
}

/**
 * 加签
 * @param workId 工作id
 * @param nodeId 节点id
 * @param empNo 加签人编号
 * @param askforHelpSta 加签模式
 * @param reason 加签原因
 */
export function askfor (workId, nodeId, empNo, askforHelpSta, reason) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Askfor',
      empNo,
      workId,
      nodeId,
      askforHelpSta,
      reason
    }
  })
}

/**
 * 获取可退回的节点
 * @param workId
 * @param nodeId
 */
export function returnInit (workId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ReturnInit',
      workId,
      nodeId
    }
  })
}

/**
 * 退回
 * @param workId 工作id
 * @param nodeId 节点id
 * @param no 流程编号
 * @param toNodeId 退回到节点id
 * @param isBackTracking 是否原路返回
 * @param reason 退回原因
 */
export function returnBack (workId, nodeId, no, toNodeId, isBackTracking, reason) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ReturnBack',
      no,
      workId,
      nodeId,
      toNodeId,
      isBackTracking,
      reason
    }
  })
}

/**
 * 会签列表
 * @param workId 工作id
 * @param nodeId 节点id
 */
export function huiQianInit (workId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'HuiQianInit',
      workId,
      nodeId
    }
  })
}

/**
 * 移除会签人员
 * @param workId
 * @param nodeId
 */
export function huiQianDelete (workId, nodeId, fkEmp) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'HuiQianDelete',
      workId,
      nodeId,
      'fk_Emp': fkEmp
    }
  })
}

/**
 * 73.撤回
 * @param workId 工作id
 */
export function unSend (no, workId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'UnSend',
      no,
      workId,
      nodeId
    }
  })
}


/**
 * 再次提交
 * @param no   流id
 * @param workId 工作id
 */
export function sendAgain (no, workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'sendAgain',
      no,
      workId
    }
  })
}


/**
 * 撤销
 * @param workId 工作id  *
 * @param no 流程编号  *
 * @param opinion 意见  非必需
 */
export function cancelSend (no, workId, opinion) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'CancelSend',
      no,
      workId,
      opinion
    }
  })
}

/**
 * 74.删除
 * @param no 流程编号
 * @param workId 工作id
 */
export function deleteFlow (no, workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Delete',
      no,
      workId
    }
  })
}

/**
 * 待办页面中 修改保存紧急程度/保密级别
 * @param workId 工作id
 * @param emergencyLevel  紧急程度，0 正常， 1 紧急  2 加急
 * @param securityClass   保密级别， 0 正常  1 保密  2 机密 3 绝密， 修改保密级别时需要将 emergencyLevel 也传过去
 */
export function saveWorkSet (workId, emergencyLevel, securityClass='') {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveWorkSet',
      emergencyLevel,
      securityClass,
      workId
    }
  })
}

/**
 *  发起页面 修改 修改保存保密级别  与 待办页面修改 保密级别的接口不一样
 * @param {*} securityLevel 
 * @param {*} no  流编号 
 * @param {*} workId 
 */

 export function saveFlowCustomSet (no, workId, securityClass) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveFlowCustomSet',
      securityClass,
      no,
      workId
    }
  })
 }

/**
 * 75.抄送已读
 * @param no 流程编号
 * @param workId 工作id
 */
export function ccRead (nodeId, workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'CcRead',
      nodeId,
      workId
    }
  })
}

/**
 * 76.设置关注
 * @param workId 工作id
 * @param isFocus 1关注，0取消关注
 */
export function focus (workId, isFocus) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'Focus',
      isFocus,
      workId
    }
  })
}

/**
 * 77.导出待办/待我审批列表
 * @param obj 审批对象
 */
export function exportTodolist (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ExportTodolist',
      ...obj
    }
  })
}

/**
 * 78.导出在途流程列表
 * @param obj 审批对象
 */
export function exportRuningList (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ExportRuningList',
      ...obj
    }
  })
}

/**
 * 79.导出我发起的流程
 * @param obj 审批对象
 */
export function exportMyStartFlow (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ExportMyStartFlow',
      ...obj
    },
    responseType: 'blob' // 表明返回服务器返回的数据类型
  })
}

/**
 * 80.导出  待办，在途，我发起的，我审批的，我关注的 列表中，选中导出
 * @param workIds 对象实例集合，jsonStr
 * @param pageType 页面类型，默认值0；“我关注的”页面，值为1；“我审批的”页面，值为2；
 */
export function exportSelectedWork (obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ExportSelectedWork',
      ...obj
    },
    responseType: 'blob' // 表明返回服务器返回的数据类型
  })
}

/**
 * 82.添加评论
 * @param workId 工作id
 * @param content 评论内容
 */
export function addComment (workId, content) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddComment',
      workId,
      content
    }
  })
}

/**
 * 83.删除评论
 * @param workId  工作id
 * @param id 评论id
 */
export function deleteComment (workId, id) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteComment',
      id,
      workId
    }
  })
}

/**
 * 待办中， right-fixed 区域中的  【显示反馈】
 * @param workId 工作id
 */
export function showFeedback (workId, globalLoading = false, domClass = '') {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowFeedback',
      workId
    },
    globalConfigs: {
      globalLoading,
      domClass
    }
  })
}

/**
 * 待办中， right-fixed 区域中的  【显示附件】
 * @param workId 工作id
 */
export function showAttachment (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowAttachment',
      workId
    }
  })
}

/**
 * 待办中， right-fixed 区域中的  【显示支流状态】
 * @param workId 工作id
 */
export function showInfluentState (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowInfluentState',
      workId
    }
  })
}

/**
 * 待办中， right-fixed 区域中的  【显示流程进度】
 * @param workId 工作id
 * @param nodeId
 */
export function showSchedule (workId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowSchedule',
      workId,
      nodeId
    }
  })
}

/**
 * 待办中， right-fixed 区域中的  【显示相关流程】
 * @param workId 工作id
 */
export function showRelatedFlow (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowRelatedFlow',
      workId
    }
  })
}

/**
 * 待办中， right-fixed 区域中的  【显示子流程】
 * @param workId 工作id
 */
export function showSubFlow (workId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowSubFlow',
      workId
    }
  })
}

/**
 * 94.批量同意
 * @param works 审批流json数组 WorkId，FK_Flow，FK_Node
 * @param opinion 审批意见
 */
export function batchSend ({Works, opinion}) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'BatchSend',
      Works: JSON.stringify(Works),
      opinion
    }
  })
}

/**
 * 获取关联流程list
 * @param globalConfigs 非必须  主要用于全局控制 loading加载
 * @param 
 */
export function getRelatedWorkList({type, pageSize, pageNum}, tableCode, globalLoading=false, domClass="") {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    globalConfigs: {
      globalLoading,
      domClass
    },
    data: {
      Method: 'GetRelatedWorkList',
      type,
      pageSize,
      pageNum,
      tableCode
    }
  })
}


/**
 * 添加关联流程
 * @param {*} nodeId 节点id
 * @param {*} workId 工作id
 * @param {*} works  相关流程对象数组，json格式
 */

export function addRelatedWork(nodeId, workId, works, globalLoading="false", domClass=""){
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    globalConfigs: {
      globalLoading,
      domClass
    },
    data: {
      Method: 'AddRelatedWork',
      nodeId,
      workId,
      works
    }
  })
}


/**
 * 95.批量拒绝
 * @param works 审批流json数组 WorkId，FK_Flow，FK_Node
 * @param opinion 审批意见
 */
export function batchRefuse ({Works, opinion}) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'BatchRefuse',
      Works: JSON.stringify(Works),
      opinion
    }
  })
}

/**
 * 96.批量取消关注
 * @param works 审批流json数组 WorkId，FK_Flow，FK_Node
 * @param opinion 审批意见
 */
export function batchSetFocus (works, opinion) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'BatchSetFocus',
      works,
      opinion
    }
  })
}

/**
 * 图片/附件上传 (审批流类目下)
 * @param file 所选文件
 * @param workId 工作id
 * @param nodeId 节点id
 * @param fieldCode  当处理意见处 上传附件时，fieldCode 值为OpinionAttachment
 */
export function uploadAttachments (file, workId, nodeId, fieldCode = '', tableCode='') {
  // let appId, appKey
  let param = new FormData() // 创建form对象
  console.log('selectFile', file)
  for (let i = 0; i < file.length; i++) {
    if(file[i].raw){
      // 发起界面上传 附件时用的是elementui 的上传组件，读取的file对象中有 raw属性
      param.append(file[i].name, file[i].raw) // 通过append向form对象添加数据
    }else {
      // 流转里面的比如 意见框上传关联附件 用的是原生模拟的上传文件，读取到的file对象没有 raw属性
      param.append(file[i].name, file[i]) // 通过append向form对象添加数据
    }
  }
  // param.append(file[0].name, file[0]) // 通过append向form对象添加数据
  param.append('Method', 'UploadAttachments') // 添加form表单中其他数据
  param.append('companyCode', store.getters.companyCode) // 添加form表单中其他数据
  param.append('UserId', store.getters.userCode) // 添加form表单中其他数据
  param.append('TokenId', getToken()) // 添加form表单中其他数据
  param.append('workId', workId) // 添加form表单中其他数据
  param.append('nodeId', nodeId) // 添加form表单中其他数据
  param.append('fieldCode', fieldCode) // 添加form表单中其他数据
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    noQS: true,
    headers: {'Content-Type': 'multipart/form-data'},
    data: param,
    withCredentials: false
  })
}

/**
 * 明细表上传 (流转下的)
 * @param file1  所选的明细表
 * @param workId 工作id
 * @param nodeId 节点id
 * @param detailTableCode 明细表code
 * @param mainTableCode 主表code
 * @param fieldCode  当处理意见处 上传附件时，fieldCode 值为OpinionAttachment
 */
export function uploadDetail (file1, workId, nodeId, detailTableCode, mainTableCode) {
  // let appId, appKey
  let param = new FormData() // 创建form对象
  console.log('selectDetailTable', file1)
  for (let i = 0; i < file1.length; i++) {
    param.append(file1[i].name, file1[i]) // 通过append向form对象添加数据
  }
  // param.append(file1[0].name, file1[0]) // 通过append向form对象添加数据
  param.append('Method', 'UploadDetail') // 添加form表单中其他数据
  param.append('companyCode', store.getters.companyCode) // 添加form表单中其他数据
  param.append('UserId', store.getters.userCode) // 添加form表单中其他数据
  param.append('TokenId', getToken()) // 添加form表单中其他数据
  param.append('workId', workId) // 添加form表单中其他数据
  param.append('nodeId', nodeId) // 添加form表单中其他数据
  param.append('detailTableCode', detailTableCode) // 添加form表单中其他数据
  param.append('mainTableCode', mainTableCode) // 添加form表单中其他数据
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    noQS: true,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: param,
    withCredentials: false
  })
}



/**
 * right-fixed导出主表的 word文档
 * @param file2  所选的明细表
 * @param workId 工作id
 * @param tableCode 主表code
 */
export function exportDoc ( workId, tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'ExportDoc',
    workId,
    tableCode
  })
}



/**
 * 获取 常用批示语
 * @param type  类型 'Default' 、 'Send' 、 'Shift' 、 'Cc'、 'ReturnBack'
 * 
 */
export function getInstructionByType (type = 'Default') {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetInstructionByType',
      type
    }
  })
}

/**
 * 新增 批示语时，获取新增批示语的类型
 * @param 
 */

export function getInstructionList(obj) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetInstructionList',
      ...obj
    }
  })
}


/**
 * 保存 批示语
 * @param {*} strJson  json格式 
 */

 export function saveInstruction (strJson) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveInstruction',
      strJson
    }
  })
 }

 /**
  * 删除批示语
  * @param {*} id  
  */
 export function deleteInstruction (id) {
   return fetch({
     module: 'workFlow',
     url: '/WorkFlow',
     method: 'post',
     data: {
       Method: 'DeleteInstruction',
       id
     }
   })
 }




/**
 * 下载明细表模版
 * @param workId 工作id
 * @param detailTableCode  明细表code
 * @param mainTableCode  主表code
 * @param nodeId  节点id
 * @param onlyTemplate  默认是 false, 下载明细表模版时 传 true
 * @constructor
 */
export function exportDetail (workId, detailTableCode, mainTableCode, onlyTemplate, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ExportDetail',
      workId,
      detailTableCode,
      mainTableCode,
      onlyTemplate,
      nodeId
    }
  })
}

/**
 * 删除附件/图片
 * @param attachmentId 附件/图片id
 * @param workId 工作id
 * @param nodeId 节点id
 * @param tableCode  表单code非必须参数；在发起页面 和 待办详情页面 删除时是 必传
 * @param fieldCode 字段code（用于验证有无修改权限）非必须参数；在发起页面 和 待办详情页面 删除时是 �����传
 * @constructor
 */
export function DeleteAttachment (attachmentId, workId, nodeId, fieldCode, tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteAttachment',
      attachmentId,
      workId,
      nodeId,
      tableCode,
      fieldCode
    }
  })
}

// ---------------------------------表单管理----------------------------------------
/**
 * 获取企业表
 * @param state 状态  0 表示 自有表（主表/明细表） 1 表示 共有表（主表/明细表）
 * @param businessTypeCode 业务类型
 * @param Key 关键词
 * @param pageSize 一页展示数量
 * @param pageNum 页码
 */
export function getComTables ({state, businessAreaCode, Key, pageSize, pageNum, publicState}) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetComTables',
      state,
      businessAreaCode,
      Key,
      pageSize,
      pageNum,
      publicState
    }
  })
}

/**
 * 启用/禁用企业表   对表单管理进行上架 下架
 * @param tableCode 表单code
 * @param state 更改状态码
 */
export function setComTableState (tableCode, state) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SetComTableState',
      tableCode,
      state
    }
  })
}

/**
 * 新增自定义表单时，获取表单code
 *
 */
export function GetTableCode () {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetTableCode'
    }
  })
}
/**
 * 复制表单
 * @param tableCode 表单code
 */
export function copyAddTable (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'CopyAddTable',
      tableCode
    }
  })
}

/**
 *
 *
 */
export function deleteComTable (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'DeleteComTable',
      tableCode
    }
  })
}

/**
 * 获取启用系统表单
 */
export function getTableConfigList (roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetTableConfigList',
      roleRange
    }
  })
}

/**
 * 启用系统表单
 * @param tableCodes 表单code
 */
export function startUseTable (tableCodes) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'StartUseTable',
      tableCodes
    }
  })
}

/**
 * 获取企业表设置
 * @param tableCode 表code
 */
export function getComTableConfig (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetComTableConfig',
      tableCode
    }
  })
}

/**
 * 表单管理-表单升版
 * @param tableCode 表单code
 */
export function upgradeTableVersion (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'UpgradeTableVersion',
      tableCode
    }
  })
}

/**
 * 保存企业表设置 ---------------停
 * @param strJson json格式
 * @constructor
 */
export function saveComTableConfig (strJson) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SaveComTableConfig',
      strJson
    }
  })
}

/**
 * 获取系统组和字段 ---- 获取系统表单查看页面
 * @param tableCode 表单code
 */
export function getTeamsAndFields (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetTeamsAndFields',
      tableCode
    }
  })
}

/**
 * 获取企业组和字段 ---- 获取表单配置页面接口
 * @param tableCode 表单code
 */
export function getComTeamsAndFields (tableCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetComTeamsAndFields',
      tableCode,
      
    }
  })
}

/**
 * 保存企业字段设置---表单配置
 * @param strJson
 */
export function SaveComTeamsAndFields (strJson) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SaveComTeamsAndFields',
      strJson
    }
  })
}

/**
 * 获取企业字段设置
 * @param fieldCode
 */
export function getComFieldConfig (fieldCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetComFieldConfig',
      fieldCode
    }
  })
}

export function deleteComField (tableCode, fieldCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'DeleteComField',
      tableCode,
      fieldCode
    }
  })
}

/**
 * 保存新增分组
 * @param obj 表单code + 新分组名称
 */
export function saveComTeamConfig (strJson) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SaveComTeamConfig',
      strJson
    }
  })
}

/**
 * 删除表单分组
 * @param teamCode 分组code
 */
export function deleteComTeam (tableCode, teamCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'DeleteComTeam',
      tableCode,
      teamCode
    }
  })
}

/**
 * 表单变更日志
 * @param tableCode  主表code
 *@param workId 
 *@param nodeId 
 */
export function showFormChangeLog (workId, nodeId, tableCode, pageSize = 10, pageNum = 1) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'ShowFormChangeLog',
      workId,
      nodeId,
      tableCode,
      pageSize,
      pageNum
    }
  })
}

// ------------------------------------ 关联表单 ---------------------------------------------------
/**
 * 获取关联表单数据
 * @param flowId 流程id
 * @param nodeId 节点id，默认值0
 */
export function getApprovalTable (flowId, nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetApprovalTable',
      flowId,
      nodeId
    }
  })
}

/**
 * 保存关联表数据
 * @param strJson json对象数组
 * @param flowId 流程id
 * @param nodeId 节点id，默认值0
 */
export function saveApprovalTable (strJson, flowId, nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'SaveApprovalTable',
      strJson,
      flowId,
      nodeId
    }
  })
}

/**
 * 删除关联的流程
 * @param workId  工作id
 * @param relatedWorkId 相关流程工作id
 */
export function deleteRelatedWork ( workId, relatedWorkId ) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteRelatedWork',
      workId,
      relatedWorkId
    }
  })
}

/**
 * 获取明细表列表
 * @param businessTypeCode 业务类型code
 */
export function getDetailTables ({pageSize, businessTypeCode}) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'GetDetailTables',
      pageSize,
      businessTypeCode
    }
  })
}

/**
 * 移除主表
 * @param tableCode 主表code
 * @param flowId 流程id
 * @param nodeId 节点id，默认值0
 */
export function removeMainTable (tableCode, flowId, nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'RemoveMainTable',
      tableCode,
      flowId,
      nodeId
    }
  })
}

/**
 * 移除明细表
 * @param tableCode 明细表code
 * @param mainTableCode 主表code
 * @param flowId 流程id
 * @param nodeId 节点id，默认值0
 */
export function removeDetailTable (tableCode, mainTableCode, flowId, nodeId = 0) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form',
    method: 'post',
    data: {
      Method: 'RemoveDetailTable',
      tableCode,
      mainTableCode,
      flowId,
      nodeId
    }
  })
}

/**
 * 用于 流程设计——简洁设计——修改节点的审批规则时 获取 节点审批规则属性数据
 * @param nodeId 节点编号
 */
export function getNodeInfo (nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetNodeInfo',
      nodeId
    }
  })
}

/**
 * 用于 流程设计——简洁设计——修改节点名称 和审批规则时 保存修改的数据
 * @param nodeInfo, strJson 格式
 */
export function saveNodeInfo (nodeInfo) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'SaveNodeInfo',
      nodeInfo
    }
  })
}

/**
 * 用于 审批规则——节点设置——基本信息——同步 页面中 获取流程下 指定节点 的同步数据
 * @param nodeId  节点id
 * @param roleRange 权限
 */
export function getSyncSetting (nodeId, roleRange) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow  ',
    method: 'post',
    data: {
      Method: 'GetSyncSetting',
      nodeId,
      roleRange
    }
  })
}

/**
 * 用于 审批规则——节点设置——基本信息——同步 页面中 保存流程下 指定节点 的同步数据
 * @param nodeId  节点id
 * @param strJson  对象的序列化形式
 */
export function saveSyncSetting (nodeId, strJson) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow  ',
    method: 'post',
    data: {
      Method: 'SaveSyncSetting',
      nodeId,
      strJson
    }
  })
}

/**
 * 用于 审批规则——节点设置——表单设置 页面中 获取 指定节点下 的主表 数据
 * @param flowId 流程编号
 */
export function GetNodeMainTables (flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form  ',
    method: 'post',
    data: {
      Method: 'GetNodeMainTables',
      flowId
    }
  })
}

/**
 * 用于 审批规则——节点设置——表单设置 页面中 获取 指定节点下的明细表数据
 * @param flowId 流程编号
 * @param nodeId 节点编号
 */
export function GetNodeDetailTables (flowId, nodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow/Form  ',
    method: 'post',
    data: {
      Method: 'GetNodeDetailTables',
      flowId,
      nodeId
    }
  })
}

/**
 * 用于规则“引用”页
 * @param flowId 流程编号
 */
export function getParentFlow (flowId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetParentFlow',
      flowId
    }
  })
}

/**
 * 用于规则“历史版本”页
 * @param templateCode 模板code
 */
export function getFlowHistoryVersion (templateCode) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'GetFlowHistoryVersion',
      templateCode
    }
  })
}

/**
 * 仅增加连接线/方向
 * @param flowId
 * @param mainNodeId
 * @param toNodeId
 */
export function addDirection (flowId, mainNodeId, toNodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'AddDirection',
      flowId,
      mainNodeId,
      toNodeId
    }
  })
}

/**
 * 仅删除连接线/方向
 * @param nodeToNodeId NodeToNode主键
 */
export function deleteDirection (nodeToNodeId) {
  return fetch({
    module: 'workFlow',
    url: '/WorkFlow',
    method: 'post',
    data: {
      Method: 'DeleteDirection',
      nodeToNodeId
    }
  })
}
