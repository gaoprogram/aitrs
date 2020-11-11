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
 *  获取分组字段 数据集合 
 * @params {*} LogicMetaCode  取LogicMetaCode 的值
 * @parmas {*} MetaCode   类型，分组code
 * @parmas {*} TenantId   租户id，PA里是empId
 * @parmas {*} RowNo    行号，为0返回全部行
 * @parmas {*} PersonId     
 * @parmas {*} ActionAttr   分组的新增：Add-TM 编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH     
*/

export function teamFieldValue ( PersonId = 1, LogicMetaCode, MetaCode, RowNo = 0, ActionAttr = '' ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/team/teamFieldValue',
        method: 'get',
        params: {   // get请求 这里需要是parmas
            // Method: 'teamFieldValue',
            PersonId,
            LogicMetaCode,
            MetaCode,
            RowNo,
            ActionAttr
        }
    })
}

/**
 *  保存字段值，入参SaveFieldsRequest，参数Data属性同Get TeamFieldValue 接口
 * @parmas {*} TenantId   租户id，PA里是empId
 * @parmas {*} PersonId     
 * @parmas {*} Data  json     
*/

export function saveTeamFieldValues ( PersonId = 1, Data ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/team/saveTeamFieldValues',
        method: 'post',
        data: {   // get请求 这里需要是parmas
            // Method: 'saveTeamFieldValues',
            PersonId,
            Data
        }
    })
}


/**
 *  删除字段值 
 * @parmas {*} LogicMetaCode    分组code等
 * @parmas {*} PersonId    目标用户id
 * @parmas {*} SNo     行号，默认值0
 * @parmas { } IsParent     是否父分组  boolean
*/

export function deleteFieldValues ( LogicMetaCode, PersonId, SNo = 0,  IsParent ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/team/teamFieldValues',
        method: 'delete',
        params: {   // get请求 这里需要是parmas
            // Method: 'deleteFieldValues',
            LogicMetaCode,
            PersonId,
            SNo,
            IsParent
        }
    })
}