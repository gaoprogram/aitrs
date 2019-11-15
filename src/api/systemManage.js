/**
 * Created by Administrator on 2018/11/11.
 * function : 系统管控
 */
import fetch from '@/utils/fetch'
// import store from '../store'

// ------------------------------------------------------------------------------------
// 字典项API

// -------------------------------------------------------------------------------------


/********************************管理- 平台系统设置- 系统设置*********************start******************** */

/**
 * 获取系统菜单树形组件数据
 * @params  title  非必需 
*/

export function getSysMenuTree (title) {
  return fetch({
    url: '/SysMenuTree',
    method: 'post',
    data: {
        Method: 'SysMenuTree',
        title
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
        url: '/SysMenuList',
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
        url: '/SysMenuList',
        method: 'post',
        data: {
            Method: 'DelSysMenu',
            Id
        }
    })
}

/**
 * 排序
 * @params {*} strJson
 */
export function sortSysMenu ( strJson ) {
    return fetch({
        url: '/SysMenuList',
        method: 'post',
        data: {
            Method: 'SortSysMenu',
            strJson
        }
    })
}

/**
 * 保存 系统菜单
 * @params  strJson  保存对象json
 */
export function saveSysMenu (strJson) {
    return fetch({
        url: '/SysMenuList',
        method: 'post',
        data: {
            Method: 'SaveSysMenu',
            strJson
        }
    })
}



/**
 * 系统页面获取列表数据
 * @parmas key 多功能搜索关键词
 * @params moduleCode 模块code
 * @params state  状态，0停用 默认1启用
 * @params pageSize 
 * @params pageNum
 */

export function getSysPageList (queryObj) {
    return fetch({
        url: '/SysPageList',
        method: 'post',
        data: {
            Method: 'SysPageList',
            ...queryObj
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
        url: '/SysPageList',
        method: 'post',
        data: {
            Method: 'GetSysPage',
            Id
        }
    })
}

/**
 * 保存系统页面
 * @parmas  strJson 保存对象json
 */
export function saveSysPage (strJson) {
    return fetch({
        url: '/SysPageList',
        method: 'post',
        data: {
            Method: 'SaveSysPage',
            strJson
        }
    })
}

/**
 * 删除系统页面
 * @pamras Id
*/
export function deleteSysPage (Id) {
    return fetch({
        url: '/SysPageList',
        method: 'post',
        data: {
            Method: 'DelSysPage',
            Id
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
        url:'/SysComponList',
        method: 'post',
        data: {
            Method: 'SysComponList',
            ...queryObj
        }
    })
}

/**
 * 保存系统组件
 * @parmas strJson 
*/
export function saveSysComponList (strJson) {
    return fetch({
        url: '/SysComponList',
        method: 'post',
        data: {
            Method: 'SaveSysComponentInfo',
            strJson
        }   
    })
}


/**
 * 组件项配置 获取 模块下拉源list
 * @parmas pageSize  pageNum 
*/
export function productModuleVerMgt (pageSize = 10, pageNum = 1) {
    return fetch({
        url: '/ProductModuleVerMgt',
        method: 'post',
        data: {
            Method: 'ProductModuleVerMgt',
            pageSize,
            pageNum
        }   
    })
}

/**
 * 组件项配置 获取 组件下拉源list
 * @parmas moduleCode 模块code 
 * @parmas menuCode 菜单code 
*/
export function getComOptions (moduleCode, menuCode) {
    return fetch({
        url: '/SysComponList',
        method: 'post',
        data: {
            Method: 'GetSysComponList',
            moduleCode,
            menuCode
        }   
    })
}

/**
 * 组件项配置 页面获取 table list 
 * @parmas componentCode 组件Code
 * @parmas pageSize  pageNum
*/
export function getSysComponSetList (componentCode, pageSize = 10, pageNum = 1) {
    return fetch({
        url: '/SysComponSet',
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
 * 组件项配置 页面 启用/停用 
 * @parmas Id 
 * @parmas State  状态，0停用 1启用
*/
export function setComponentsState (Id, State) {
    return fetch({
        url: '/SysComponList',
        method: 'post',
        data: {
            Method: 'SetSysComponentInfoState',
            Id,
            State
        }   
    })
}

/**
 * 组件项配置 页面  新增/编辑 保存
 * @parmas strJson 
*/
export function saveSysComponentRef ( strJson ) {
    return fetch({
        url: '/SysComponSet',
        method: 'post',
        data: {
            Method: 'SaveSysComponentRef',
            strJson
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
        url: '/AccountList',
        method: 'post',
        data: {
            Method: 'AccountList',
            ...queryObj
        }
    })
}

/**
 * 获取用户info
 * 
 */
export function getSysUserMgtList () {
    return fetch({
        url: '/SysUserMgtList',
        method: 'post',
        data: {
            Method: 'SysUserMgtList',
        }
    })
}

/**
 * 删除系统用户
 * @params Id
 */
export function delSysUser (Id) {
    return fetch({
        url: '/SysUserMgtList',
        method: 'post',
        data: {
            Method: 'DelSysUser',
            Id
        }
    })
}


/**
 * 获取企业用户管理员list列表
 * @params key 多功能搜索关键字
 * @params roleLevel 角色级别，默认-1全部
 * @params isLock  是否锁定，0否 1是，默认-1全部
 * @params state  状态，0停用 默认
 * @params pageSize  pageNum
 */
export function getCompUserMgtList (queryObj) {
    return fetch({
        url: '/CompUserMgtList',
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
        url: '/CompUserMgtList',
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
        url: '/CompUserMgtList',
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
        url: '/CompSuperUserList',
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
        url: '/CompSuperUserList',
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
        url: '/CompSuperUserList',
        method: 'post',
        data: {
            Method: 'ResetSysAccountPwd',
            Password,
            Id
        }
    })
}


/**
 * 获取用户组的树形组件数据
 * @params {*} userGroupName  用户组名称
 * @parmas State 状态，0停用 默认1启用
 */
export function getSysUserGroupTree (State = 1, userGroupName) {
    return fetch({
        url: '/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SysUserGroupTree',
            userGroupName,
            State
        }
    })
}

/**
 * 保存新增用户组
 * @params strJson
 */
export function saveSysUserGroup (strJson) {
    return fetch({
        url: '/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SaveSysUserGroup',
            strJson
        }
    })
}

/**
 * 启用/停用用户组
 * @params {*} Id
 * @params {*} State  状态，0停用 1启用
 */
export function setSysUserGroupState (Id, State) {
    return fetch({
        url: '/SysUserGroupTree',
        method: 'post',
        data: {
            Method: 'SetSysUserGroupState',
            Id,
            State
        }
    })
}


/**
 * 获取系统用户组 table列表数据
 * @params {*} userGroupCode
 * @params {} Key  搜索关键字
 */
export function getSysUserList (userGroupCode, Key) {
    return fetch({
        url: '/SysUserList',
        method: 'post',
        data: {
            Method: 'SysUserList',
            userGroupCode,
            Key
        }
    })
}

/**
 * 移除/批量移除用户组
 * @params {*} strJson 对象数组json  对象必须有属性 Id
 */
export function batchDelSysUserGroup (strJson) {
    return fetch({
        url: '/SysUserList',
        method: 'post',
        data: {
            Method: 'BatchDelSysUserGroup',
            strJson
        }
    })
}

/**
 * 系统用户添加到用户组
 * @parms {*} userGroupCode 用户组code
 * @params {*} strJson 对象数组json  对象必须有属性 UserId
 */
export function setSysUserToGroup (userGroupCode, strJson) {
    return fetch({
        url: '/SysUserToGroup',
        method: 'post',
        data: {
            Method: 'SysUserToGroup',
            strJson
        }
    })
}

/**
 * 角色组获取 角色组树形组件数据
 * @parms {} roleGroupName 角色组名
 * @params {} state 状态，0停用 默认1启用
 * @params {} onlyParent  只查父级，默认false，用于所属角色组下拉框
 */
export function getSysRoleGroupTree (roleGroupName, state, onlyParent) {
    return fetch({
        url: '/SysRoleGroupTree',
        method: 'post',
        data: {
            Method: 'SysRoleGroupTree',
            roleGroupName,
            state,
            onlyParent
        }
    })
}
/********************************管理- 平台系统设置- 用户角色*********************end******************** */

/********************************管理- 平台系统设置- 版本套包*********************start******************** */
/**
 * 获取版本套包 list
 * @parmas pageSize  pageNum
 */
export function getProductModuleVerMgt (pageSize = 10, pageNum = 1) {
    return fetch({
        url: 'ProductModuleVerMgt',
        method: 'post',
        data: {
            Method: 'ProductModuleVerMgt',
            pageSize,
            pageNum
        }
    })
}
/********************************管理- 平台系统设置- 版本套包*********************end******************** */

/********************************管理- 平台系统设置- 企业信息*********************start******************** */
/**
 * 获取企业信息
 * @parmas sysCompanyCode  企业号
 */
export function getSysCompany ( sysCompanyCode ) {
    return fetch({
        url: 'CompSuperUserList',
        method: 'post',
        data: {
            Method: 'GetSysCompany',
            sysCompanyCode
        }
    })
}

/********************************管理- 平台系统设置- 企业信息*********************end******************** */
