/**
 * Created by Administrator on 2018/11/11.
 * function : 系统管控  【企业端】
 */
import fetch from '@/utils/fetch'
// import store from '../store'

// ------------------------------------------------------------------------------------
// 字典项API

// -------------------------------------------------------------------------------------
/**
 * 获取省市
 * @params  {*} CompanyCode  企业code
 * @params  {*} tokenId  用户凭据
 * @params  {*} UserId  用户id
 * @params  {} parentId  上级id，默认0
*/

export function GetAreaList ( CompanyCode, tokenId, UserId, parentId) {
    return fetch({
      module: 'SystemManage',
      url: '/Notice/AdministrativeArea',
      method: 'post',
      data: {
          Method: 'GetAreaList',
          CompanyCode,
          tokenId,
          UserId,
          parentId
      }
    })
  }


/********************************管理- 平台系统设置- 系统设置*********************start******************** */

/**
 * 获取系统菜单树形组件数据 [系统]
 * @params  title  非必需 
*/

export function getSysMenuTree (title) {
  return fetch({
    module: 'SystemManage',
    url: '/SYS_SystemManage/SysMenuTree',
    method: 'post',
    data: {
        Method: 'SysMenuTree',
        title
    }
  })
}

/**
 * 获取 模块/菜单树形组件数据 [企业]
 * @params  title  非必需 
 * @params  moduleCode  非必需 
*/

export function ComMenuTree (title, moduleCode) {
    return fetch({
      module: 'SystemManage',
      url: '/SystemManage/ComMenuTree',
      method: 'post',
      data: {
          Method: 'ComMenuTree',
          title,
          moduleCode
      }
    })
  }

/**
 * 获取系统菜单列表
 * @params {} key  多功能搜索关键字
 * @parmas {} scope  适用范围，1系统 2企业 3个人，默认-1全部
 * @parmas {} isPC  PC端显示，0否 1是，默认-1全部
 * @prams {} isMobile  移动端显示，0否 1是，默认-1全部
 * @prams {} state  状态，0停用 默认1启用
 * @prams {} pageSize
 * @prams {} pageNum
 */
export function getSysMenuList (searchObj) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysMenuList',
        method: 'post',
        data: {
            Method: 'SysMenuList',
            ...searchObj
        }
    })
}

/**
 * 菜单list 中删除 
 * @params {*} Id
 */
export function deleteSysMenu (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysMenuList',
        method: 'post',
        data: {
            Method: 'DelSysMenu',
            Id
        }
    })
}

/**
 *  页面组件 设置页面 的 页面搜索框的数据源
 * @params {*} moduleCode 模块code 
 */
export function GetSysMenuList (moduleCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysPageComponSet',
        method: 'post',
        data: {
            Method: 'GetSysMenuList',
            moduleCode
        }
    })
}

/**
 * 排序
 * @params {*} strJson
 */
export function sortSysMenu ( strJson ) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysMenuList',
        method: 'post',
        data: {
            Method: 'SortSysMenu',
            strJson
        }
    })
}

/**
 * 保存企业信息 [系统]
 * @params  strJson  保存对象json
 */
export function saveSysMenu (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysMenuList',
        method: 'post',
        data: {
            Method: 'SaveSysMenu',
            strJson
        }
    })
}

/**
 *  获取显示数据库表数据 【企业】
 * @params {} teamCode 分组code
 * @params {} moduleCode 模块code
 * @params  {} state 状态，0停用 默认1启用
 * @params {} pageSize 页大小
 * @params {} pageNum 页码
 */
export function CompTableDataSet (teamCode, moduleCode, state, pageSize, pageNum) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTableDataSet',
        method: 'post',
        data: {
            Method: 'CompTableDataSet',
            teamCode,
            moduleCode,
            state,
            pageSize,
            pageNum
        }
    })
}

/**
 *  企业数据库表  启用/停用 批量启用/批量停用状态 【企业】
 * @params  {} strJson 对象数组json
 * @params {} State 状态，0停用 1启用
 */
export function SetComTableConfigState (strJson, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTableDataSet',
        method: 'post',
        data: {
            Method: 'SetComTableConfigState',
            strJson,
            State
        }
    })
}

/**
 *  显示数据库页面的 编辑保存 【企业】
 * @params {} strJson 对象json
 */
export function SaveComTableConfig (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTableDataSet',
        method: 'post',
        data: {
            Method: 'SaveComTableConfig',
            strJson
        }
    })
}

/**
 *  显示数据库——字段设置——添加字段 中的字段选择器【企业】
 * @params {} teamCode 分组code
 */
export function SelectCompField (teamCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SelectCompField',
        method: 'post',
        data: {
            Method: 'SelectCompField',
            teamCode
        }
    })
}

/**
 *  显示数据库——字段设置——添加字段 保存接口【企业】
 * @params {} tableCode 表code
 * @parmas {} strJson 对象json
 */
export function AddComTableField (tableCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTableDataSet',
        method: 'post',
        data: {
            Method: 'AddComTableField',
            tableCode,
            strJson
        }
    })
}

/**
 *  显示数据库——字段设置——添加字段 保存接口【企业】
 * @params {} State 状态，0停用 1启用
 * @parmas {} strJson 对象数组json
 * @parmas {} tableCode 表code
 */
export function SetComTableFieldState (State, strJson, tableCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTableDataSet',
        method: 'post',
        data: {
            Method: 'SetComTableFieldState',
            State,
            strJson,
            tableCode
        }
    })
}



/**
 *  所属表 【企业】
 * @params {} moduleCode 模块code
 */
export function ComTableTree (moduleCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTableDataSet',
        method: 'post',
        data: {
            Method: 'ComTableTree',
            moduleCode,
        }
    })
}

/**
 *  获取显示组表数据 【企业】
 * @params {} moduleCode 模块code
 * @params  {} state 状态，0停用 默认1启用
 * @params {} pageSize 页大小
 * @params {} pageNum 页码
 */
export function CompTeamDataSet (moduleCode, state, pageSize, pageNum) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTeamDataSet',
        method: 'post',
        data: {
            Method: 'CompTeamDataSet',
            moduleCode,
            state,
            pageSize,
            pageNum
        }
    })
}

/**
 *  显示组表页面的 编辑保存 【企业】
 * @params {} strJson 对象json
 */
export function SaveComTeamConfig (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTeamDataSet',
        method: 'post',
        data: {
            Method: 'SaveComTeamConfig',
            strJson
        }
    })
}

/**
 *  所属群 【企业】
 * @params {} moduleCode 模块code
 */
export function ComGroups (moduleCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTeamDataSet',
        method: 'post',
        data: {
            Method: 'ComGroups',
            moduleCode
        }
    })
}

/**
 *  所属组 【企业】
 * @params {} moduleCode 模块code
 * @params {} groupCode 群组code
 * @params {} teamCode 当前分组code
 */
export function ComTeamTree (moduleCode, groupCode, teamCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTeamDataSet',
        method: 'post',
        data: {
            Method: 'ComTeamTree',
            moduleCode,
            groupCode,
            teamCode
        }
    })
}


/**
 *  企业组表  启用/停用 批量启用/批量停用状态 【企业】
 * @params  {} strJson 对象数组json
 * @params {} State 状态，0停用 1启用
 */
export function SetComTeamConfigState (strJson, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompTeamDataSet',
        method: 'post',
        data: {
            Method: 'SetComTeamConfigState',
            strJson,
            State
        }
    })
}

/**
 *  企业组表  字段设置 列表数据 【企业】
 * @params  {} teamCode 分组code
 * @params {} tableCode 表code
 * @params {} state 状态 0 停用 默认 1 启用
 * @params {} pageSize 页大小，默认10
 * @params {} pageNum 页码，默认1
 * @params {} isNumber  类型bolean 是数值类型
 */
export function CompFieldList (teamCode, tableCode, state =1 , pageSize, pageNum,isNumber = false) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompFieldList',
        method: 'post',
        data: {
            Method: 'CompFieldList',
            teamCode,
            tableCode,
            state,
            pageSize,
            pageNum,
            isNumber
        }
    })
}

/**
 *  企业组表  字段设置 设置状态 【企业】
 * @params  {} strJson 对象数组json
 * @params {} State 状态，0停用 1启用
 */
export function SetComFieldConfigState (strJson, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompFieldList',
        method: 'post',
        data: {
            Method: 'SetComFieldConfigState',
            strJson,
            State
        }
    })
}

/**
 *  企业组表  编辑字段的保存  【企业】
 * @params  {} strJson 对象数组json
 * @params {} teamCode 组code
 * @params {} tableCode 表code
 */
export function SaveFieldList (strJson, teamCode, tableCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompFieldList',
        method: 'post',
        data: {
            Method: 'SaveFieldList',
            strJson,
            teamCode,
            tableCode
        }
    })
}

/**
 *  企业组表  字段删除  【企业】
 * @params  {} fieldCode 字段code
 * @params {} teamCode 组code
 * @params {} tableCode 表code
 */
export function DeleteComField (fieldCode, teamCode, tableCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompFieldList',
        method: 'post',
        data: {
            Method: 'DeleteComField',
            fieldCode,
            teamCode,
            tableCode
        }
    })
}

/**
 * 系统页面获取列表数据  【系统】
 * @parmas key 多功能搜索关键词
 * @params moduleCode 模块code
 * @params state  状态，0停用 默认1启用
 * @params pageSize 
 * @params pageNum
 */

export function getSysPageList (queryObj) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'SysPageList',
            ...queryObj
        }
    })
}

/**
 * 系统页面获取列表数据  【企业】
 * @parmas key 多功能搜索关键词
 * @params moduleCode 模块code
 * @params sysType 1 系统 2 企业
 * @params state  状态，0停用 默认1启用
 * @params pageSize 
 * @params pageNum
 */

export function ComPageList (queryObj) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComPageList',
        method: 'post',
        data: {
            Method: 'ComPageList',
            ...queryObj
        }
    })
}


/**
 * 页面组件管理中 获取页面搜索下拉源列表数据  【系统、企业】
 * @params pageSize  
 * @params pageNum
 */
export function getSysPageListOption (pageSize = 65553, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'SysPageList',
            pageSize,
            pageNum
        }
    })
}

/**
 * 页面组件管理中 获取页面搜索下拉源列表数据  【系统】
 * @params pageSize  
 * @params pageNum
 */
export function SysPageSelector (pageSize = 65553, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'SysPageSelector',
            pageSize,
            pageNum
        }
    })
}

/**
 * 页面组件管理中 获取页面搜索下拉源列表数据  【企业】
 * @params pageSize  
 * @params pageNum
 */
export function ComPageSelector (pageSize = 65553, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComPageList',
        method: 'post',
        data: {
            Method: 'ComPageSelector',
            pageSize,
            pageNum
        }
    })
}


/**
  * 获取系统页面
  * @parmas  Id  页面id
  *  
*/
export function getSysPage (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'GetSysPage',
            Id
        }
    })
}

/**
  * 菜单管理 设置 启用/停用 
  * @parmas  strJson 对象数组json
  * @parmas  State 状态，0停用 1启用
  *  
*/
export function SetSysMenuState (strJson, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysMenuList',
        method: 'post',
        data: {
            Method: 'SetSysMenuState',
            strJson,
            State
        }
    })
}

/**
  * 页面管理 设置 启用/停用 
  * @parmas  strJson 对象数组json
  * @parmas  State 状态，0停用 1启用
  *  
*/
export function SetSysPageState (strJson, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'SetSysPageState',
            strJson,
            State
        }
    })
}

/**
 * 保存系统页面 【系统】
 * @parmas  strJson 保存对象json
 */
export function saveSysPage (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'SaveSysPage',
            strJson
        }
    })
}

/**
 * 保存系统页面 【企业】
 * @params  strJson 保存对象json
 * @params menuCode 
 */
export function SaveComPage (strJson, menuCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComPageList',
        method: 'post',
        data: {
            Method: 'SaveComPage',
            strJson,
            menuCode
        }
    })
}

/**
 * 保存系统页面 【企业】
 * @params  strJson 保存对象json
 * @params State   0 停用 1 启用
 * @params sysType 1 系统 2 企业
 */
export function SetComPageState (strJson, State, sysType) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComPageList',
        method: 'post',
        data: {
            Method: 'SetComPageState',
            State,
            sysType,
            strJson
        }
    })
}

/**
 * 删除系统页面 [系统]
 * @pamras Id
*/
export function deleteSysPage (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysPageList',
        method: 'post',
        data: {
            Method: 'DelSysPage',
            Id
        }
    })
}

/**
 * 删除企业页面 [企业]
 * @params Id
 * @params menuCode
*/
export function deleteComPage (Id, menuCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComPageList',
        method: 'post',
        data: {
            Method: 'DelComPage',
            Id,
            menuCode
        }
    })
}


/**
 * 获取系统组件
 * @params componentName  组件名
 * @params state   状态，0停用 默认1启用
 * @params pageSize  页大小，默认10
 * @params pageNum  页码，默认1
*/
export function getSysComponList (queryObj) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysComponList',
        method: 'post',
        data: {
            Method: 'SysComponList',
            ...queryObj
        }
    })
}

/**
 * 保存系统组件 [系统]
 * @parmas strJson 
*/
export function saveSysComponList (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysComponList',
        method: 'post',
        data: {
            Method: 'SaveSysComponentInfo',
            strJson
        }   
    })
}

/**
 * 保存企业组件 [企业]
 * @parmas strJson 
*/
// export function saveComponList (strJson) {
//     return fetch({
//         module: 'SystemManage',
//         url: '/SystemManage/SysComponList',
//         method: 'post',
//         data: {
//             Method: 'SaveSysComponentInfo',
//             strJson
//         }   
//     })
// }


/**
 * 组件项配置 获取 模块下拉源list, 页面管理中 获取模块下拉源 [系统、企业]
 * @parmas pageSize  pageNum 
*/
export function GetModuleList (pageSize = 10, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/ProductModuleVerMgt',
        method: 'post',
        data: {
            Method: 'GetModuleList',
            pageSize,
            pageNum
        }   
    })
}

/**
 * 组件项配置 获取 组件下拉源list 【系统】
 * @parmas moduleCode 模块code 
 * @parmas menuCode 菜单code 
*/
export function GetSysComponList (moduleCode, menuCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysComponList',
        method: 'post',
        data: {
            Method: 'GetSysComponList',
            moduleCode,
            menuCode
        }   
    })
}

/**
 * 组件项配置 页面获取 table list  【系统】
 * @parmas componentCode 组件Code
 * @parmas pageSize  pageNum
*/
export function SysComponSet (componentCode, pageSize = 10, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysComponSet',
        method: 'post',
        data: {
            Method: 'SysComponSet',
            componentCode,
            pageSize,
            pageNum
        }   
    })
}

/**
 * 组件项 页面 启用/停用  【企业】
 * @parmas strJson 对象数组 
 * @parmas State  状态，0停用 1启用
*/
export function setComponentsState (strJson, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysComponList',
        method: 'post',
        data: {
            Method: 'SetSysComponentInfoState',
            strJson,
            State
        }   
    })
}

/**
 * 组件项配置 页面 启用/停用  【系统】
 * @parmas Id 
 * @parmas State  状态，0停用 1启用
*/
export function SetSysComponentRefState (Id, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/CompComponSet',
        method: 'SetSysComponentRefState', 
        data: {
            Method: 'SetSysComponentRefState',
            Id,
            State
        }   
    })
}

/**
 * 组件项配置 页面  新增/编辑 保存 【系统】
 * @parmas strJson 
*/
export function saveSysComponentRef ( strJson ) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysComponSet',
        method: 'post',
        data: {
            Method: 'SaveSysComponentRef',
            strJson
        }   
    })
}

/**
 * 组件项配置 页面  新增/编辑 保存 【企业】
 * @params strJson 
 * @params pageCode
*/
export function SaveComComponentRef ( strJson, pageCode ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponSet',
        method: 'post',
        data: {
            Method: 'SaveComComponentRef',
            strJson,
            pageCode
        }   
    })
}



/**
 * 组件项配置 页面 获取项码下拉数据源  【企业】
 * @parmas {*} refType  类型
*/
export function GetDataByRefType ( refType ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponSet',
        method: 'post',
        data: {
            Method: 'GetDataByRefType',
            refType
        }   
    })
}



/********************************管理- 平台系统设置- 系统设置*********************end******************** */

/********************************管理- 平台系统设置- 用户角色*********************start******************** */
/**
 * 获取账户list
 * @params key 多功能搜索关键字
 * @params isLock  是否锁定 0否 1是，默认-1
 * @params isActive 是否激活 0冻结 1激活，默认-1全部
 */
export function getAccountList(queryObj){
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/AccountList',
        method: 'post',
        data: {
            Method: 'AccountList',
            ...queryObj
        }
    })
}

/**
 * 获取系统用户info
 * 
 */
export function getSysUserMgtList () {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysUserMgtList',
        method: 'post',
        data: {
            Method: 'SysUserMgtList',
        }
    })
}

/**
 * 用户管理  删除用户 [系统]
 * @params Id
 */
export function delSysUser (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserMgtList',
        method: 'post',
        data: {
            Method: 'DelSysUser',
            Id
        }
    })
}

/**
 * 用户管理  删除用户 [企业]
 * @params Id
 */
export function delComUser (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserMgtList',
        method: 'post',
        data: {
            Method: 'DelComUser',
            Id
        }
    })
}
/**
 * 用户管理 角色下拉框  数据源
 */
export function ComRoleDroplist () {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'ComRoleDroplist',
        }
    })
}

/**
 * 获取企业用户管理员list列表
 * @params key 多功能搜索关键字
 * @params userType 外部用户 0  内部用户 1  默认全部 -1
 * @params roleLevel 角色级别，默认-1全部
 * @params isLock  是否激活，0否 1是，默认-1全部
 * @params state  状态，0停用 默认
 * @params pageSize  pageNum
 */
export function getCompUserMgtList (queryObj) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserMgtList',
        method: 'post',
        data: {
            Method: 'CompUserMgtList',
            ...queryObj
        }
    })
}

/**
 * 获取企业用户用户
 * @params Id
 */
export function getComUser (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserMgtList',
        method: 'post',
        data: {
            Method: 'GetComUser',
            Id
        }
    })
}


/**
 * 保存企业用户用户
 * @params strJson  保存对象json
 */
export function saveComUser (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserMgtList',
        method: 'post',
        data: {
            Method: 'SaveComUser',
            strJson
        }
    })
}

/**
 * 激活/冻结
 * @params Id
 * @parmas isActive 是否激活 0否 1是
 */
export function setSysAccountActive (Id, isActive) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompSuperUserList',
        method: 'post',
        data: {
            Method: 'SetSysAccountActive',
            isActive,
            Id
        }
    })
}

/**
 * 锁定/解锁
 * @params Id
 * @parmas isLock 是否锁定 0否 1是
 */
export function setSysAccountLock (Id, isLock) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompSuperUserList',
        method: 'post',
        data: {
            Method: 'SetSysAccountLock',
            isLock,
            Id
        }
    })
}

/**
 * 密码重置
 * @params Id
 * @parmas Password 密码
 */
export function resetSysAccountPwd (Id, Password) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompSuperUserList',
        method: 'post',
        data: {
            Method: 'ResetSysAccountPwd',
            Password,
            Id
        }
    })
}


/**
 * 获取用户组的树形组件数据 【系统】
 * @params {*} userGroupName  用户组名称
 * @parmas State 状态，0停用 默认1启用
 */
export function getSysUserGroupTree (State = 1, userGroupName) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SysUserGroupTree',
            userGroupName,
            State
        }
    })
}

/**
 * 保存新增用户组 [系统]
 * @params strJson
 */
export function saveSysUserGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SaveSysUserGroup',
            strJson
        }
    })
}

/**
 * 保存新增角色组 [系统]
 * @params strJson
 */
export function saveSysRoleGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SaveSysRoleGroup',
            strJson
        }
    })
}



/**
 * 启用/停用用户组 [系统]
 * @params {*} Id
 * @params {*} State  状态，0停用 1启用
 */
export function setSysUserGroupState (Id, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SetSysUserGroupState',
            Id,
            State
        }
    })
}

/**
 * 启用/停用角色组 [系统]
 * @params {*} Id
 * @params {*} State  状态，0停用 1启用
 */
export function setSysRoleGroupState (Id, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysRoleGroupTree',
        method: 'post',
        data: {
            Method: 'SetSysRoleGroupState',
            Id,
            State
        }
    })
}

/**
 * 启用/停用角色组 [企业]
 * @params {*} Id
 * @params {*} State  状态，0停用 1启用
 */
export function setComRoleGroupState (Id, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleGroupTree',
        method: 'post',
        data: {
            Method: 'SetComRoleGroupState',
            Id,
            State
        }
    })
}

/**
 * 启用/停用用户组 [企业]
 * @params {*} Id
 * @params {*} State  状态，0停用 1启用
 */
export function SetComUserGroupState (Id, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserGroupTree',
        method: 'post',
        data: {
            Method: 'SetComUserGroupState',
            Id,
            State
        }
    })
}

/**
 * 获取系统用户组 table列表数据 [系统]
 * @params {*} userGroupCode
 * @params {} Key  搜索关键字
 */
export function getSysUserList (userGroupCode, Key) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserList',
        method: 'post',
        data: {
            Method: 'SysUserList',
            userGroupCode,
            Key
        }
    })
}

/**
 * 企业用户列表组件 table列表数据 [企业]
 * @params {*} userGroupCode
 * @params {} Key  搜索关键字
 */
export function getCompUserList (userGroupCode, Key) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserList',
        method: 'post',
        data: {
            Method: 'CompUserList',
            userGroupCode,
            Key
        }
    })
}

/**
 * 企业角色列表组件 table列表数据 [企业]
 * @params {*} roleGroupCode
 * @params {} permissionId
 * @params {} key  搜索关键字
 */
export function getCompRoleList (roleGroupCode, permissionId, key) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleList',
        method: 'post',
        data: {
            Method: 'CompRoleList',
            roleGroupCode,
            permissionId,
            key
        }
    })
}

/**
 *  复制角色 【企业】
 * @param {*} Id 
 * @param {*} name 
 * @params {} roleType 1系统角色，2企业自定义角色
 */
export function CopyComRole (Id, name, roleType) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'CopyComRole',
            Id,
            name,
            roleType
        }
    })
}

/**
 *  复制角色 【系统】
 * @param {*} Id 
 */
export function CopySysRole (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysRoleMgtList',
        method: 'post',
        data: {
            Method: 'CopySysRole',
            Id
        }
    })
}

/**
 * 角色组 移除/批量移除 [系统]
 * @params {*} strJson 对象数组json
 */
export function batchDelSysRoleGroupRole (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysRoleList',
        method: 'post',
        data: {
            Method: 'BatchDelSysRoleGroupRole',
            userGroupCode,
            Key
        }
    })
}

/**
 * 移除/批量移除用户组  【系统】
 * @params {*} strJson 对象数组json  对象必须有属性 Id
 */
export function batchDelSysUserGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserList',
        method: 'post',
        data: {
            Method: 'BatchDelSysUserGroup',
            strJson
        }
    })
}

/**
 * 移除/批量移除用户组  【企业】
 * @params {*} strJson 对象数组json  对象必须有属性 Id
 */
export function BatchDelComUserFromGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserList',
        method: 'post',
        data: {
            Method: 'BatchDelComUserFromGroup',
            strJson
        }
    })
}




/**
 * 移除/批量移除 角色组  【企业】
 * @params {*} strJson 对象数组json  对象必须有属性 Id
 */
export function batchDelComRoleGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleList',
        method: 'post',
        data: {
            Method: 'BatchDelComRoleGroupRole',
            strJson
        }
    })
}

/**
 * 移除/批量移除 用户组  【企业】
 * @params {*} strJson 对象数组json  对象必须有属性 Id
 */
export function batchDeleteComUserGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserGroupTree',
        method: 'post',
        data: {
            Method: 'BatchDeleteComUserGroup',
            strJson
        }
    })
}

/**
 * 系统用户添加到用户组 [系统]
 * @parms {*} userGroupCode 用户组code
 * @params {*} strJson 对象数组json  对象必须有属性 UserId
 */
export function setSysUserToGroup (userGroupCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserToGroup',
        method: 'post',
        data: {
            Method: 'SysUserToGroup',
            strJson
        }
    })
}

/**
 * 企业用户添加到用户组 [企业]
 * @parms {*} userGroupCode 用户组code
 * @params {*} strJson 对象数组json  对象必须有属性 UserId
 */
export function setCompUserToGroup (userGroupCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserToGroup',
        method: 'post',
        data: {
            Method: 'CompUserToGroup',
            strJson
        }
    })
}

/**
 * 系统角色组树形组件 角色组树形组件数据  【系统】
 * @parms {} roleGroupName 角色组名
 * @params {} state 状态，0停用 默认1启用
 * @params {} onlyParent  只查父级，默认false，用于所属角色组下拉框
 */
export function getSysRoleGroupTree (state = 1, roleGroupName, onlyParent = 'false') {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysRoleGroupTree',
        method: 'post',
        data: {
            Method: 'SysRoleGroupTree',
            roleGroupName,
            state,
            onlyParent
        }
    })
}

/**
 * 获取权限引用列表 [系统]
 * @parms {} permissionName 权限名称
 */
export function getSysPermissionList (permissionName) {
    return fetch({
        module: 'SystemManage',
        url: '/SYS_SystemManage/SysPermissionList',
        method: 'post',
        data: {
            Method: 'SysPermissionList',
            permissionName
        }
    })
}

/**
 * 获取权限引用列表 [企业]
 * @parms {} permissionName 权限名称
 */
export function getComPermissionList (permissionName) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermissionList',
        method: 'post',
        data: {
            Method: 'CompPermissionList',
            permissionName
        }
    })
}

/**
 * 获取权限引用列表 [企业]
 * @parms {*} permissionId 权限id
 * @parms {*} strJson 保存对象json
 */
export function AddComRolePermission (permissionId, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleList',
        method: 'post',
        data: {
            Method: 'AddComRolePermission',
            permissionId,
            strJson
        }
    })
}

/**
 * 获取权限引用列表 [系统]
 * @parms {} permissionName 权限名称
 */
export function getSystemPermissionList (permissionName) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysPermissionList',
        method: 'post',
        data: {
            Method: 'SysPermissionList',
            permissionName
        }
    })
}

/**
 * 批量移除  [系统]
 * @parms {} strJson 保存对象json
 */
export function batchDelSysRolePermission (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysRoleList',
        method: 'post',
        data: {
            Method: 'BatchDelSysRolePermission',
            strJson
        }
    })
}

/**
 * 批量移除  [企业]
 * @parms {} strJson 保存对象json
 */
export function BatchDelComRolePermission (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleList',
        method: 'post',
        data: {
            Method: 'BatchDelComRolePermission',
            strJson
        }
    })
}

/**
 * 获取系统角色列表 [系统]
 * @parms {} key 多功能搜索关键字
 * @parms {} roleGroupCode 角色组code  与 permissionId互斥
 * @parms {} permissionId 权限id 
 */
export function getSysRoleList (key, permissionId, roleGroupCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysRoleList',
        method: 'post',
        data: {
            Method: 'SysRoleList',
            key,
            permissionId,
            roleGroupCode
        }
    })
}

/**
 * 企业角色组树形组件 【企业】
 * @parms {*} roleGroupName 角色组名称
 * @params {} state 状态  状态，0停用 默认1启用 
 * @pamras {} onlyParent 只查父级，默认false，用于所属角色组下拉框
 */
export function getCompRoleGroupTree (state = 1, roleGroupName, onlyParent = 'false') {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleGroupTree',
        method: 'post',
        data: {
            Method: 'CompRoleGroupTree',
            roleGroupName,
            state,
            onlyParent
        }
    })
}

/**
 * 保存企业用户组 【企业】
 * @parms {*} strJson 保存对象json
 */
export function saveComUserGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserGroupTree',
        method: 'post',
        data: {
            Method: 'SaveComUserGroup',
            strJson
        }
    })
}

/**
 * 企业用户组树形组件【企业】
 * @params {} userGroupNamen
 * @params {}  State  -1 全部 1 是启用 0 是停用
 */
export function getCompUserGroupTree (userGroupName, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserGroupTree',
        method: 'post',
        data: {
            Method: 'CompUserGroupTree',
            userGroupName,
            State
        }
    })
}

/**
 * 保存企业角色组 【企业】
 * @parms {*} strJson 保存对象json
 */
export function saveComRoleGroup (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleGroupTree',
        method: 'post',
        data: {
            Method: 'SaveComRoleGroup',
            strJson
        }
    })
}

/**
 * 企业角色添加到角色组组件 【企业】
 * @params {*} roleGroupCode  角色组code
 * @parms {*} strJson 对象数组json
 */
export function compRoleToGroup (roleGroupCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleList',
        method: 'post',
        data: {
            Method: 'CompRoleToGroup',
            roleGroupCode,
            strJson
        }
    })
}

/**
 * 企业用户添加到用户组组件 【企业】
 * @params {*} userGroupCode  用户组code
 * @parms {*} userJson 对象数组json
 */
export function CompUserToGroup (userGroupCode, userJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserToGroup',
        method: 'post',
        data: {
            Method: 'CompUserToGroup',
            userGroupCode,
            userJson
        }
    })
}

/**
 * 企业角色组选择器 获取 企业角色组数据 【企业】
 * @parms {*}  roleGroupName 角色组名称
 * @params {} state 状态  状态，0停用 默认1启用
 */
export function getSelectCompRoleG (roleGroupName, state = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SelectCompRoleG',
        method: 'post',
        data: {
            Method: 'SelectCompRoleG',
            roleGroupName,
            state
        }
    })
}


/**
 * 企业用户组选择器 获取 企业用户组数据 【企业】
 * @parms {}  userGroupName 用户组名称
 * @parmas {} State 状态 0 是停用 1 是启用 -1 全部
 */
export function getSelectCompUserG (userGroupName, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SelectCompUserG',
        method: 'post',
        data: {
            Method: 'SelectCompUserG',
            userGroupName,
            State
        }
    })
}



/**
 * 企业角色选择器组件  【企业】
 * @parms {} roleName 角色名称
 * @params {} roleGroupCode 角色组code
 * @params {} state 状态  状态，0停用 默认1启用
 */
export function getSelectCompRole (roleName, roleGroupCode, state = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SelectCompRole',
        method: 'post',
        data: {
            Method: 'SelectCompRole',
            roleName,
            roleGroupCode,
            state
        }
    })
}

/**
 * 企业用户选择器组件  【企业】
 * @parms {*} userName 用户名称
 * @params {} isFrozen 状态  是否冻结，默认false
 */
export function getSelectCompUser (userName, isFrozen = 'false') {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SelectCompUser',
        method: 'post',
        data: {
            Method: 'SelectCompUser',
            userName,
            isFrozen
        }
    })
}

/**
 * 用户管理  冻结/激活  【企业】
 * @parms {*} Id 用户名称
 * @params {*} State   状态，0停用 1启用
 */
export function setComUserState (Id, State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserMgtList',
        method: 'post',
        data: {
            Method: 'SetComUserState',
            Id,
            State
        }
    })
}




/**
 * 用户授权界面 删除列表  【企业】
 * @parms {*} Id 
 */
export function deleteComUserRole (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComUserRoleList',
        method: 'post',
        data: {
            Method: 'DeleteComUserRole',
            Id
        }
    })
}

/**
 * 用户授权界面 删除列表  【系统】
 * @parms {*} Id 
 */
export function deleteSysUserRole (Id) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserAddRole',
        method: 'post',
        data: {
            Method: 'DeleteSysUserRole',
            Id
        }
    })
}

/**
 * 用户授权界面 企业用户授权角色组件 获取列表数据  【企业】
 * @parms {*} strJson  对象json
 * @params {} pageSize  pageNum
 */
export function comUserRoleList (strJson, pageSize = 10, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComUserRoleList',
        method: 'post',
        data: {
            Method: 'ComUserRoleList',
            strJson,
            pageSize,
            pageNum
        }
    })
}

/**
 * 用户授权界面 系统用户授权角色组件 获取列表数据  【系统】
 * @parms {*} strJson  对象json
 * @params {} pageSize  pageNum
 */
export function getSysUserRoleList (strJson, pageSize = 1, pageNum = 10) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysUserAddRole',
        method: 'post',
        data: {
            Method: 'SysUserRoleList',
            strJson,
            pageSize,
            pageNum
        }
    })
}

/**
 * 用户授权界面 企业用户授权角色组件 添加到用户组  【企业】
 * @parms {*} strJson  对象json 对象数组json，属性必须有RoleId,RoleName
 * @params {*} user  对象json，属性必须有UserId
 */
export function comUserAddRole (strJson, user) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComUserRoleList',
        method: 'post',
        data: {
            Method: 'ComUserAddRole',
            strJson,
            user
        }
    })
}


/**
 * 角色管理   企业角色管理列表组件 获取列表数据  【企业】
 * @parms {} roleName  角色名
 * @params {} roleType  角色类型，1系统角色，2企业自定义角色
 * @params {}  state  状态，0停用 默认1启用
 * @paramas {} pageSize pageNum
 * @params {} roleGroupCode  角色组code
 */
export function compRoleMgtList (roleName, roleType ,state = 1, pageSize = 10, pageNum = 1, roleGroupCode ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'CompRoleMgtList',
            roleName,
            roleType,
            state,
            pageSize,
            pageNum,
            roleGroupCode
        }
    })
}

/**
 * 角色管理   系统角色管理列表组件 获取列表数据  【系统】
 * @parms {} roleName  角色名
 * @params {} roleType  角色类型，1系统角色，2企业自定义角色
 * @params {}  state  状态，0停用 默认1启用
 * @parmas {} pageSize pageNum
 */
export function sysRoleMgtList (roleName, roleType,state = 1, pageSize = 10, pageNum = 1 ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/SysRoleMgtList',
        method: 'post',
        data: {
            Method: 'SysRoleMgtList',
            roleName,
            roleType,
            state,
            pageSize,
            pageNum
        }
    })
}


/**
 * 角色管理   企业角色管理列表组件 启用/停用  【企业】
 * @parms {*} Id  角色名
 * @params {*}  State  状态，0停用 默认1启用
 * @params {} roleType 1系统角色，2企业自定义角色
 */
export function setComRoleState (Id, State, roleType) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'SetComRoleState',
            Id,
            State,
            roleType
        }
    })
}

/**
 * 角色管理   新增企业角色  【企业】
 * @parms {*} strJson  保存对象json
 */
export function addComRole (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'AddComRole',
            strJson
        }
    })
}

/**
 * 角色管理  导出企业角色列表  【企业】
 * @parms {} roleName  角色名
 * @parms {} roleType  角色类型，1系统角色，2企业自定义角色
 * @parms {} state  角状态，0停用 默认1启用
 */
export function exportComRole (roleName, roleType, state) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'ExportComRole',
            roleName,
            roleType,
            state
        }
    })
}


/**
 * 角色管理  企业角色关系组件 获取列表数据 【企业】
 * @parms {*} roleId  角色id
 * @parms {} pageSize 
 * @parms {} pageNum  
 */
export function compRoleRelate (roleId, pageSize = 10, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleRelate',
        method: 'post',
        data: {
            Method: 'CompRoleRelate',
            roleId,
            pageSize,
            pageNum
        }
    })
}

/**
 * 角色管理  企业角色关系组件 编辑保存  【企业】
 * @parms {*} strJson  保存对象json
 */
export function saveComRoleRelate (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleRelate',
        method: 'post',
        data: {
            Method: 'SaveComRoleRelate',
            strJson
        }
    })
}

/**
 * 角色管理  企业角色关系组件 删除/批量删除  【企业】
 * @parms {*} strJson  保存对象json
 */
export function batchDelComRoleRelate (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleRelate',
        method: 'post',
        data: {
            Method: 'BatchDelComRoleRelate',
            strJson
        }
    })
}

/**
 * 角色管理  企业角色用户/组管理组件 【企业】
 * @params {*} roleId  角色id
 * @params {*} userType  1 用户 2 用户组
 * @params {} Key  搜索关键字
 * @params {} pageSize 
 * @params {} pageNum 
 */
export function compRoleUserGMgt (roleId, userType, Key, pageSize, pageNum) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleUserGMgt',
        method: 'post',
        data: {
            Method: 'CompRoleUserGMgt',
            roleId,
            userType,
            Key,
            pageSize,
            pageNum
        }
    })
}

/**
 * 角色管理  企业角色显示数据组件 【企业】
 * @parms {*} roleId  角色id
 * @parms {*} userCode  用户id
 * @parms {} moduleCode  模块code
 * @parms {} componentName  组件名
 * @parms {} pageSize  页大小，默认10
 * @parms {} pageNum  页码，默认1
 */
export function compRoleShowDataList (queryObj) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleShowDataList',
        method: 'post',
        data: {
            Method: 'CompRoleShowDataList',
            ...queryObj
        }
    })
}

/**
 * 角色管理  企业角色显示数据-显示数据设置  tag标签 【企业】
 * @params {} componentCode  组件code
 */
export function GetFieldSetTags (componentCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleShowDataList',
        method: 'post',
        data: {
            Method: 'GetFieldSetTags',
            componentCode
        }
    })
}


/**
 * 角色管理  企业角色显示数据-显示数据设置 列表获取 【企业】
 * @params {} componentCode  组件code
 * @params {} tcode Tag code
 * @params {} pageSize  页大小，默认10
 * @params {} pageNum  页码，默认1
 */
export function GetFieldSets (componentCode, tcode, pageSize, pageNum) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleShowDataList',
        method: 'post',
        data: {
            Method: 'GetFieldSets',
            componentCode,
            tcode,
            pageSize,
            pageNum
        }
    })
}

/**
 * 角色管理  企业角色显示数据-显示数据设置组件中的 保存数据【企业】
 * @parms {} componentCode  组件code
 * @parms {} pageSize  页大小，默认10
 * @parms {} strJson 对象数组json
 */
export function SaveFieldSets (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleShowDataList',
        method: 'post',
        data: {
            Method: 'SaveFieldSets',
            strJson
        }
    })
}

/**
 * 角色管理  企业角色  用户组/用户  批量移除 【企业】
 * @parms {*} strJson 对象数组json
 */
export function batchDelComUserRole (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleUserGMgt',
        method: 'post',
        data: {
            Method: 'BatchDelComUserRole',
            strJson
        }
    })
}

/**
 * 角色管理  企业角色  用户组/用户 批量添加 【企业】
 * @params {*} roleId 角色id
 * @parms {*} strJson 对象数组json
 */
export function batchAddComUserRole (roleId, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleUserGMgt',
        method: 'post',
        data: {
            Method: 'BatchAddComUserRole',
            roleId,
            strJson
        }
    })
}

/**
 * 角色管理  企业角色  角色信息  【企业】
 * @params {*} Id 
 * @params {*} roleType 1系统角色，2企业自定义角色
 */
export function getComRole (Id, roleType) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'GetComRole',
            Id,
            roleType
        }
    })
}

/**
 * 角色管理  企业角色  保存角色信息  【企业】
 * @params {*} strJson  保存对象json
 */
export function saveComRole (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRoleMgtList',
        method: 'post',
        data: {
            Method: 'SaveComRole',
            strJson
        }
    })
}


/**
 * 角色管理  企业角色许可权管理组件 获取列表数据  【企业】
 * @params {*} roleId  角色id
 * @params {} pageSize
 * @params {} pageNum
 */
export function compRolePermitList (RoleId, pageSize=10, pageNum=1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRolePermitList',
        method: 'post',
        data: {
            Method: 'CompRolePermitList',
            RoleId,
            pageSize,
            pageNum
        }
    })
}

/**
 * 角色管理  许可权列表  【企业】
 * @params {*} permissionPackageCode  权限包编码
 */
export function getPermissionList (permissionPackageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSecuritySet',
        method: 'post',
        data: {
            Method: 'GetPermissionList',
            permissionPackageCode
        }
    })
}

/**
 * 角色管理  数据安全组  【企业】
 * @params {*} permissionPackageCode  权限包编码,用逗号分隔多个值
 */
export function getSecurityTypeGroupList (permissionPackageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSecuritySet',
        method: 'post',
        data: {
            Method: 'GetSecurityTypeGroupList',
            permissionPackageCode
        }
    })
}

/**
 * 角色管理  数据安全组  【企业】
 * @params {*} currentCode  权限包编码,用逗号分隔多个值
 * @params  {} pageSize
 * @params {} pageNum
 */
export function ComSecurityTypeGroupList (currentCode, pageSize=65553, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComSecurityTypeGroup',
        method: 'post',
        data: {
            Method: 'ComSecurityTypeGroupList',
            currentCode,
            pageSize,
            pageNum
        }
    })
}

/**
 * 角色管理  数据安全组  【企业】
 * @params {*} securityTypeGroupCode  安全类型组码
 */
export function getSecurityTypeInfoList (securityTypeGroupCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSecuritySet',
        method: 'post',
        data: {
            Method: 'GetSecurityTypeInfoList',
            securityTypeGroupCode
        }
    })
}

// /**
//  * 角色管理  企业数据安全类型组列表组件 获取列表数据  【企业】
//  * @params {} pageSize  
//  * @parmas {} pageNum
//  */
// export function ComSecurityTypeGroupList (pageSize= 10, pageNum = 1) {
//     return fetch({
//         module: 'SystemManage',
//         url: '/SystemManage/ComSecurityTypeGroup',
//         method: 'post',
//         data: {
//             Method: 'ComSecurityTypeGroupList',
//             pageSize,
//             pageNum
//         }
//     })
// }

/**
 * 角色管理  企业数据安全类型组列表组件  保存单个 【企业】
 * @params {*} strJson  
 */
export function SaveComSecurityTypeInfo (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/ComSecurityTypeGroup',
        method: 'post',
        data: {
            Method: 'SaveComSecurityTypeInfo',
            strJson
        }
    })
}

/**
 * 角色管理  企业数据安全类型组列表组件 批量添加保存 【企业】
 * @params {*} permissionPackageCode
 * @params {*} strJson  
 */
export function BatchAddSecurityTypeGroup (permissionPackageCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSecuritySet',
        method: 'post',
        data: {
            Method: 'BatchAddSecurityTypeGroup',
            permissionPackageCode,
            strJson
        }
    })
}

/**
 * 角色管理  批量移除安全组  【企业】
 * @params {*} strJson  对象数组json
  * @params {*} permissionPackageCode
 */
export function BatchDelSecurityTypeGroup (strJson, permissionPackageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSecuritySet',
        method: 'post',
        data: {
            Method: 'BatchDelSecurityTypeGroup',
            strJson,
            permissionPackageCode
        }
    })
}

/**
 * 角色管理  批量添加安全组  【企业】
 * @params {*} roleId  角色id
 * @params {*} strJson  对象数组json
 */
export function BatchAddComRolePermit (strJson, roleId) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRolePermitList',
        method: 'post',
        data: {
            Method: 'BatchAddComRolePermit',
            roleId,
            strJson
        }
    })
}

/**
 * 角色管理 - 许可权  移除/批量移除角色许可权 【企业】
 * @params {*} strJson  对象字段属性必须有Id
 */
export function BatchDelComRolePermit (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompRolePermitList',
        method: 'post',
        data: {
            Method: 'BatchDelComRolePermit',
            strJson
        }
    })
}

/**
 * 用户管理 - 许可权  企业用户许可权管理组件 【企业】
 * @params {*} userJson  对象json
 * @params {} pageSize pageNum
 */
export function CompUserPermitList (userJson, pageSize = 10, pageNum = 1) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserPermitList',
        method: 'post',
        data: {
            Method: 'CompUserPermitList',
            userJson,
            pageSize,
            pageNum
        }
    })
}

/**
 * 用户管理 - 许可权  添加用户许可权 【企业】
 * @params {*} strJson  对象数组json 对象属性必须有PermissionPackageCode
 * @params {*} userCode   
 */
export function BatchAddComUserPermit (strJson, userCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserPermitList',
        method: 'post',
        data: {
            Method: 'BatchAddComUserPermit',
            strJson,
            userCode
        }
    })
}


/**
 * 用户管理 - 许可权  批量移除用户许可权 【企业】
 * @params {*} strJson  对象数组json  对象字段属性必须有Id
 */
export function BatchDelComUserPermit (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompUserPermitList',
        method: 'post',
        data: {
            Method: 'BatchDelComUserPermit',
            strJson
        }
    })
}




/********************************管理- 平台系统设置- 用户角色*********************end******************** */

/*************************管理- 平台系统设置- 许可权*****************start******************** */
/**
 * 许可权  企业许可权列表组件  【企业】
 * @params {} Name  许可权名
 * @params {} State  状态，默认1启用，0禁用
 * @params {} permissionId 
 * @params {} sysType  1系统，2企业
 * @params {} pageSize pageNum
 * @params roleId 角色Id
 */
export function CompPermitPMgtList (Name,State, sysType, pageSize = 10, pageNum = 1, permissionId, roleId) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPMgtList',
        method: 'post',
        data: {
            Method: 'CompPermitPMgtList',
            Name,
            State,
            sysType,
            pageSize,
            pageNum,
            permissionId,
            roleId
        }
    })
}

/**
 * 许可权  设置状态 启用/停用  【企业】
 * @params {*} strJson  
 */
export function SetComPermitPState (strJson,State) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPMgtList',
        method: 'post',
        data: {
            Method: 'SetComPermitPState',
            strJson,
            State
        }
    })
}

/**
 * 许可权  复制许可权  【企业】
 * @params {*} Id  许可权名
 * @params {*} Name 
 */
export function CopyComPermitP (Id, Name) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPMgtList',
        method: 'post',
        data: {
            Method: 'CopyComPermitP',
            Id,
            Name
        }
    })
}

/**
 * 许可权  企业许可权设置组件 获取列表数据 【企业】
 * @params {*} permissionPackageCode  权限包Id
 * @parmas {} permissionItemCode  菜单编号/功能码/事件码/资源id/组件编号
 * @params {} pageSize pageNum
 * @params {} permissionType 权限类型
 * @params {} componentCode 组件code
 * @params {} menuCodes 菜单对象数组
 */
export function getCompPermitPSet (permissionPackageCode, permissionItemCode, pageSize = 10, pageNum = 1, permissionType, componentCode, menuCodes) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSet',
        method: 'post',
        data: {
            Method: 'CompPermitPSet',
            permissionPackageCode,
            permissionItemCode,
            pageSize,
            pageNum,
            permissionType,
            componentCode,
            menuCodes
        }
    })
}

/**
 * 许可权  保存基本信息  【企业】
 * @params {*} strJson  保存对象json
 */
export function SaveComPermitPSet (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSet',
        method: 'post',
        data: {
            Method: 'SaveComPermitPSet',
            strJson
        }
    })
}

/**
 * 许可权  批量移除配置权限  【企业】
 * @params {*} permissionPackageCode  权限包Id
 * @params {*} strJson  对象数组json
 */
export function BatchDelComPermissionPackageConfig (permissionPackageCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSet',
        method: 'post',
        data: {
            Method: 'BatchDelComPermissionPackageConfig',
            permissionPackageCode,
            strJson
        }
    })
}

/**
 * 权限引用列表中 移除许可权  【企业】
 * @params {*} permissionId  权限包Id
 * @params {*} strJson  对象数组json
 */
export function BatchDelFromComPermissionPackage (permissionId, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPMgtList',
        method: 'post',
        data: {
            Method: 'BatchDelFromComPermissionPackage',
            permissionId,
            strJson
        }
    })
}

/**
 * 许可权  批量添加权限  【企业】
 * @params {*} permissionPackageCode  权限包Id
 * @params {*} strJson  对象数组json
 */
export function BatchAddComPermissionPackageConfig (permissionPackageCode, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPSet',
        method: 'post',
        data: {
            Method: 'BatchAddComPermissionPackageConfig',
            permissionPackageCode,
            strJson
        }
    })
}
/**
 * 权限引用列表 中添加到许可权 【企业】
 * @params {*} permissionId  权限包Id
 * @params {*} strJson  对象数组json
 */
export function AddToComPermissionPackage (permissionId, strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPermitPMgtList',
        method: 'post',
        data: {
            Method: 'AddToComPermissionPackage',
            permissionId,
            strJson
        }
    })
}

/*************************管理- 平台系统设置- 许可权*********************end******************** */

/********************************管理- 平台系统设置- 版本套包*********************start******************** */

/********************************管理- 平台系统设置- 版本套包*********************end******************** */

/********************************管理- 平台系统设置- 企业信息*********************start******************** */
/**
 * 获取企业信息 列表
 * @parmas {} key 关键词
 * @parmas {} City 城市id
 * @parmas {} businessType 行业
 * @parmas {} companyScope  人员规模
 * @parmas {} natureType 企业性质
 * @parmas {} startDate 开始日期
 * @parmas {} endDate 结束日期
 * @parmas {} state 状态，0冻结 1激活 默认-1全部
 * @parmas {} pageSize pageNum
 * 
 */
export function CompInfoList ( queryObj ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompInfoList',
        method: 'post',
        data: {
            Method: 'CompInfoList',
            ...queryObj
        }
    })
}

/**
 *  企业信息  设置状态 
 * @parmas {*} strJson 对象数组
 * @params {*} State 状态，0冻结 1激活
 * 
 */
export function SetSysCompanyState ( strJson, State ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManageCompInfoList',
        method: 'post',
        data: {
            Method: 'SetSysCompanyState',
            strJson,
            State
        }
    })
}

/**
 *  企业信息 导出企业信息列表组件
 * @parmas {} key 关键词
 * @params {} City 城市id
 * @params {} businessType 行业
 * @params {} companyScope 人员规模
 * @params {} natureType 企业性质
 * @params {} startDate 开始日期
 * @params {} endDate 结束日期
 * @params {} state 状态，0冻结 1激活 默认-1全部
 * 
 */
export function ExportCompInfoList ( obj ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompInfoList',
        method: 'post',
        data: {
            Method: 'ExportCompInfoList',
            ...obj
        }
    })
}

/**
 *  企业信息 导出企业信息列表组件
 * @parmas {*} strJson 对象json
 * 
 */
export function SaveSysCompany ( strJson ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompInfoList',
        method: 'post',
        data: {
            Method: 'SaveSysCompany',
            strJson
        }
    })
}

/**
 *  企业信息  企业获取本企业的企业信息 【企业】
 * @parmas {*} sysCompanyCode 企业号
 * 
 */
export function GetSysCompany ( sysCompanyCode ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompSuperUserList',
        method: 'post',
        data: {
            Method: 'GetSysCompany',
            sysCompanyCode
        }
    })
}

/**
 *  页面组件管理 启用/停用 【企业】
 * @parmas {*} State 状态，0停用 1启用
 * @parmas {*} sysType 1系统 2企业
 * @params {*} strJson 对象数组json
 * 
 */
export function SetComPageComponentConfigState ( strJson, State, sysType ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPageComponList',
        method: 'post',
        data: {
            Method: 'SetComPageComponentConfigState',
            State,
            strJson,
            sysType
        }
    })
}

/**
 *  组件树  【企业】
 * 
 */
export function CompComponentList () {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponSet',
        method: 'post',
        data: {
            Method: 'CompComponentList',
        }
    })
}

/********************************管理- 平台系统设置- 企业信息*********************end******************** */



/********************************管理- 企业-系统设置-组件管理*********************start******************** */
/**
 *  企业组件列表组件 [企业]
 * @parmas {} componentName 组件名
 * @params {} state  状态，0停用 默认1启用
 * @params {*} sysType 1系统 默认2企业
 * @params {} pageSize
 * @params {} pageNum
 * @parmas }{} moduleCode
 */
export function CompComponList ( sysType = 2, componentName, state = 1, pageSize = 10, pageNum = 1, moduleCode ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponList',
        method: 'post',
        data: {
            Method: 'CompComponList',
            sysType,
            componentName,
            state,
            pageSize,
            pageNum,
            moduleCode
        }
    })
}

/**
 *  获取企业组件 [企业]
 * @parmas {*} Id 
 */
export function GetComComponentInfo ( Id ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponList',
        method: 'post',
        data: {
            Method: 'GetComComponentInfo',
            Id
        }
    })
}


/**
 *  保存企业组件 [企业]
 * @parmas {*} strJson
 */
export function SaveComComponentInfo ( strJson ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponList',
        method: 'post',
        data: {
            Method: 'SaveComComponentInfo',
            strJson
        }
    })
}

/**
 * 组件项配置 获取 组件下拉源list 【企业】
 * @parmas {*} moduleCode 模块code  
 * @parmas {} menuCode 菜单code 
 * @params {} pageCode 页面code
 * 
*/
export function GetComComponList (moduleCode, menuCode, pageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponList',
        method: 'post',
        data: {
            Method: 'GetComComponList',
            moduleCode,
            menuCode,
            pageCode
        }   
    })
}

/**
 * 组件项配置 页面获取 table list  【企业】
 * @parmas componentCode 组件Code
 * @parmas pageSize  pageNum
 * @params {*} State   1启用 0 停用
 * @params {} pageCode 页面code
*/
export function CompComponSet (componentCode, pageSize = 10, pageNum = 1, State, pageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponSet',
        method: 'post',
        data: {
            Method: 'CompComponSet',
            componentCode,
            pageSize,
            pageNum,
            State,
            pageCode
        }   
    })
}

/**
 * 组件配置页面 中的 设置 状态（启用/停用） 【企业】
 * @parmas strJson 对象数组json
 * @parmas sysType // 1系统组件 2 企业组件
 * @parmas State  状态，0停用 1启用
 * @params pageCode
*/
export function SetComComponentRefState (sysType, strJson, State, pageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponSet',
        method: 'post',
        data: {
            Method: 'SetComComponentRefState',
            sysType,
            strJson,
            State,
            pageCode
        }   
    })
}
/**
 * 组件项配置 页面 启用/停用 【企业】
 * @parmas strJson  对象数组json
 * @parmas State  状态，0停用 1启用
 * @parmas sysType  1系统 2 企业
*/
export function SetComComponentInfoState (strJson, State, sysType) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompComponList',
        method: 'post',
        data: {
            Method: 'SetComComponentInfoState',
            strJson,
            State,
            sysType
        }   
    })
}

/**
 * 企业 页面管理 页面获取列表数据  【企业】
 * @parmas key 多功能搜索关键词
 * @params pageCode 页面code
 * @params state  状态，0停用 默认1启用
 * @params pageSize 
 * @params pageNum
 */

export function CompPageComponList (key,pageCode,state=1,pageSize=10,pageNum=1 ) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPageComponList',
        method: 'post',
        data: {
            Method: 'CompPageComponList',
            key,
            pageCode,
            state,
            pageSize,
            pageNum
        }
    })
}

/**
 * 企业页面管理页面 保存 【企业】
 * @parmas  strJson 保存对象json
 */
export function SaveComPageComponentConfig (strJson) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage/CompPageComponList',
        method: 'post',
        data: {
            Method: 'SaveComPageComponentConfig',
            strJson
        }
    })
}

/********************************管理- 企业-系统设置-组件管理*********************end******************** */