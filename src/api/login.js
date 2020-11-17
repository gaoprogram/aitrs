/**
 * Created by Administrator on 2017/11/13.
 * 登录接口
 */
import MD5 from 'js-md5'
import fetch from '@/utils/fetch'

/**
 *  登录
 * @param companyCode 企业号
 * @param UserName 用户名
 * @param pwd 密码
 * @returns {Promise.<TResult>}
 */
export async function loginByUsername (UserName, pwd, companyCode) {
  return fetch({
    // url: '/API/Account',
    url: '/SystemManage/Account',
    method: 'post',
    data:  {
      Method: 'logon',
      UserName,
      pwd: MD5(pwd),
      companyCode
    }
  })
}

/**
 *  获取用户信息
 * @param TokenId
 */
export function getUserInfo (TokenId) {
  return fetch({
    // url: '/API/Account',
    url: '/SystemManage/Account',
    method: 'post',
    data: {
      Method: 'getUser',
      TokenId
    }
  })
}

/**
 * 登出
 */
export function logout () {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}
