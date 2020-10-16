export const sidebar = state => state.app.sidebar

export const netWorkStatus = state => state.app.online

export const visitedViews = state => state.app.visitedViews

export const isCompanyOrSystemUser = state => state.user.isCompanyOrSystemUser

export const token = state => state.user.token

export const avatar = state => state.user.avatar

export const name = state => state.user.name

export const userType = state => state.user.userType

export const userCode = state => state.user.userCode

export const empNo = state => state.user.empNo

export const companyCode = state => state.user.companyCode

export const status = state => state.user.status

export const setting = state => state.user.setting

export const permissionRouters = state => state.permission.routers

export const addRouters = state => state.permission.addRouters


// 公告版块获取已经上传的附件的信息
export const alreadyUploadFile = state => state.notice.alreadyUploadFile

export const loading = state => state.notice.loading

export const schemeCode = state => state.salary.schemeCode

export const currentFieldStore = state => state.flow.currentFieldStore

export const currentFieldsStore = state => state.flow.currentFieldsStore

export const nodeObjStore = state => state.flow.nodeObjStore

// 获取
export const quilleditorToolNum = state => state.flow.quillEditorToolbarNum

//获取流程模块中的 已上传文件的数据
export const flowAlreadyUploadFile = state => state.flow.flowAlreadyUploadFile

// 流转版块获取 已经上传的明细表数据
export const flowAlreadyUploadDetail = state => state.flow.flowAlreadyUploadDetail

// 流转中 right-fixed页面 获取 功能节点或者流程中配置的功能权限
export const flowFunctionRole = state => state.flow.functionRole

// 流转中 right-fixed 中调取 getform 接口后 获取 的form对象集合
export const flowCurrentFormObj = state => state.flow.currentFlowFormObj

// 点击了查看后 获取 table表格中的该行对象集合
export const flowCurrentObj = state => state.flow.currentFlowObj

// 获取流转中 点击了菜单 待办、在途、我处理的、我关注的、抄送我的 、我发起的后的菜单 标识

export const flowCurrentTabStr = state => state.directive.currentTabStr
// 流转中 编辑器获取编辑器中的内容

export const flowEditorContentValue = state => state.flow.editorContentValue

// ------------pa 页面 -----------
// pa模块获取当前页面的pageCode
export const currentPageCode = state => state.pa.currentPageCode

export const currentTemplatePageCode = state => state.pa.currentTemplatePageCode

export const currentTemplateCode = state => state.pa.currentTemplateCode

export const alreadyUploadTemplateFile = state => state.pa.alreadyUploadTemplateFile

export const currentEmpObj = state => state.pa.currentEmpObj

export const currentTabItem = state => state.pa.currentTabItem

export const contractManagePageCode = state => state.pa.contractManagePageCode

export const batchExportOrImportEmpArr = state => state.pa.batchExportOrImportEmpArr

export const isEmpOrContractPage = state => state.pa.isEmpOrContract

//---------------directive---------------------------
export const isPublic = state => state.directive.isPublic

export const isPublic_params = state => state.directive.tableCodeCustomer

export const flowRuleScanFlag = state => state.directive.flowRuleScanFlag

export const currentActiveNameStr = state => state.directive.currentActiveNameStr

export const companyRoleScanFlag = state => state.directive.companyRoleScanFlag
// 当前的权限页面pageCode
export const currentAuthorityPageCode = state => state.directive.currentAuthorityPageCode
