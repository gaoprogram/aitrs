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

