import fetch from '@/utils/fetch'

/**
 *  获取页面级的数据
 * @params  pageCode  页面code
*/

export function GetPageModelData (pageCode) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/page/pageModelData',
        method: 'get',
        params: {   
            // get请求 这里需要是params
            // Method: 'GetPageModelData',
            pageCode
        }
    })
}

/**
 *  获取组件级的数据
 * @params {*} Type  类型，ConfigType 或者 CombineType
 * @params {*} ComponentCode   组件code
 * @params ModuleCode   模块code
*/

export function GetComponentData ( Type, ComponentCode, ModuleCode ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/page/componentData',
        method: 'get',
        params: {   // get请求 这里需要是params
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
 * @params {*} MetaCode   类型，分组code
 * @params {*} TenantId   租户id，PA里是empId
 * @params {*} RowNo    行号，为0返回全部行
 * @params {*} PersonId     
 * @params { } CAR   分组的新增：Add-TM 编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH     
 * @params {}  IsSearch 是搜索区  默认false 否
*/

export function teamFieldValue ( PersonId = 1, LogicMetaCode, MetaCode, RowNo = 0, CAR = '', IsSearch = false ) {
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
            CAR,
            IsSearch
        }
    })
}

/**
 *  保存字段值，入参SaveFieldsRequest，参数Data属性同Get TeamFieldValue 接口
 * @params {*} TenantId   租户id，PA里是empId
 * @params {*} PersonId     
 * @params {*} Data  json     
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
 * @params {*} LogicMetaCode    分组code等
 * @params {*} PersonId    目标用户id
 * @params {*} SNo     行号，默认值0
 * @params { } IsParent     是否父分组  boolean
*/

export function deleteFieldValues ( LogicMetaCode, PersonId, SNo = 0,  IsParent ) {
    return fetch({
        module: 'newStyle',
        url: '/api/app/team/teamFieldValues',
        method: 'delete',
        params: {   // get请求 这里需要是params
            // Method: 'deleteFieldValues',
            LogicMetaCode,
            PersonId,
            SNo,
            IsParent
        }
    })
}


/**
 *  获取字典表列表
 * @params { } DicType    字典表类型，默认SYS
 * @params { * } ModuleCode   模块code，ALL表示全部模块
*/

export function getDicCollection ( DicType = 'SYS', ModuleCode = "ALL") {
    return fetch({
        module: 'newStyle',
        url: '/api/app/dic/dicCollection',
        method: 'get',
        params: {   // get请求 这里需要是params
            // Method: 'getDicCollection',
            DicType,
            ModuleCode
        }
    })
}




// -------------页面配置 基础接口--------------------

