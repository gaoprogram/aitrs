/**
 * Created by Administrator on 2018/10/11.
 * function : 员工(PA)
 */
import fetch from '@/utils/fetch'
import store from '../store'
import { getToken } from '@/utils/auth'

// ------------------------------------------------------------------------------------
// 字典项API
/**
 * 
 * @param {*} moduleCode  模块code
 */
export function GetAuthority (moduleCode = 'PA') {
    return fetch({
        module: '',
        url: '/SystemManage',   
        method: 'post',
        data: {
            Method: 'GetAuthority',   
            moduleCode,
        }
    })
}