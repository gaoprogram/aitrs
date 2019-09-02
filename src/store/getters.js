export const sidebar = state => state.app.sidebar

export const visitedViews = state => state.app.visitedViews

export const token = state => state.user.token

export const avatar = state => state.user.avatar

export const name = state => state.user.name

export const userType = state => state.user.userType

export const userCode = state => state.user.userCode

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

export const flowCurrentObj = state => state.flow.currentFlowObj

// 获取流转中 点击了菜单 待办、在途、我处理的、我关注的、抄送我的 、我发起的后的菜单 标识

export const flowCurrentTabStr = state => state.directive.currentTabStr
// 流转中 编辑器获取编辑器中的内容

export const flowEditorContentValue = state => state.flow.editorContentValue


//---------------directive---------------------------
export const isPublic = state => state.directives.isPublic

export const isPublic_params = state => state.directives.tableCodeCustomer

export const flowRuleScanFlag = state => state.directives.flowRuleScanFlag
