import fetch from '@/utils/fetch'

/**
 *  获取页面级的数据
 * @parmas  pageCode  页面code
*/

export function GetPageModelData (pageCode) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/page/pageModelData',
        method: 'get',
        params: {   // get请求 这里需要是parmas
            // Method: 'GetPageModelData',
            pageCode
        }
    })
}

/**
 *  获取组件级的数据
 * @parmas {*} Type  类型，ConfigType 或者 CombineType
 * @parmas {*} ComponentCode   组件code
 * @parmas ModuleCode   模块code
*/

export function GetComponentData ( Type, ComponentCode, ModuleCode ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/page/componentData',
        method: 'get',
        params: {   // get请求 这里需要是parmas
            // Method: 'GetPageModelData',
            Type,
            ComponentCode,
            ModuleCode
        }
    })
}