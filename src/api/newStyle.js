import fetch from '@/utils/fetch'

/**
 * @parmas  pageCode  页面code
*/

export function GetPageModelData (pageCode) {
    return fetch({
        module: 'SystemManage',
        url: '/SystemManage',
        method: 'post',
        data: {
            Method: 'GetPageModelData',
            pageCode
        }
    })
}