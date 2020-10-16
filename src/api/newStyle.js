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
        params: {   
            // get请求 这里需要是parmas
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

/**
 *  获取分组(子分组级各个子分组的字段名称)数据
 *  * @params {*} LogicMetaCode  取LogicMetaCode 的值
 * @parmas {*} MetaCode  类型，分组code
*/

export function teamField ( LogicMetaCode, MetaCode ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/team/teamField',
        method: 'get',
        params: {   // get请求 这里需要是parmas
            // Method: 'teamField',
            LogicMetaCode,
            MetaCode 
        }
    })
}

/**
 *  获取字段的value值数据集合 
 * @params {*} LogicMetaCode  取LogicMetaCode 的值
 * @parmas {*} MetaCode   类型，分组code
 * @parmas {*} TenantId   租户id，PA里是empId
 * @parmas {*} RowNo    行号，为0返回全部行
*/

export function fieldValues ( LogicMetaCode, MetaCode, TenantId, RowNo = 0 ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/page/fieldValues',
        method: 'get',
        params: {   // get请求 这里需要是parmas
            // Method: 'fieldValues',
            LogicMetaCode,
            MetaCode,
            TenantId,
            RowNo,
        }
    })
}


/**
 *  删除字段值 
 * @parmas {*} MetaCode   类型，分组code
 * @parmas {*} TenantId   租户id，PA里是empId
 * @parmas {*} RowNo    行号，为0返回全部行
*/

export function deleteFieldValues ( TenantId, MetaCode, RowNo = 0 ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/page/fieldValues',
        method: 'delete',
        params: {   // get请求 这里需要是parmas
            // Method: 'deleteFieldValues',
            MetaCode,
            RowNo,
            TenantId
        }
    })
}