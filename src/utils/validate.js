/* eslint-disable no-irregular-whitespace */
/**
 * 验证
 */

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/*
 "^\\d+$"　非负整数（正整数 + 0）
 "^[0-9]*[1-9][0-9]*$"　　正整数
 "^((-\\d+)|(0+))$"　　非正整数（负整数 + 0）
 "^-[0-9]*[1-9][0-9]*$"　　负整数
 "^-?\\d+$"　整数
 "^\\d+(\\.\\d+)?$"　非负浮点数（正浮点数 + 0）
 "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$"　正浮点数
 "^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$"　　//非正浮点数（负浮点数 + 0）
 "^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$"　负浮点数
 "^(-?\\d+)(\\.\\d+)?$"　　浮点数
 "/^\d+(\.\d)?$/"   验证最多小数点后一位
*/

/* 验证正整数 */
export function validatPositiveNum (val) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(val)
}

/* 验证最多小数点后一位 */
export function validatNumDotOne (val) {
  const reg = /^\d+(\.\d)?$/
  return reg.test(val)
}

/**
 * 验证金额
 * @param val 需要验证的值
 * @param num 验证位数
 * @returns {boolean}
 */
export function validatMoney (val, num = 2) {
  // const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  const reg = new RegExp(`(^[1-9]([0-9]+)?(\\.[0-9]{1,${num})?$)|(^(0){1}$)|(^[0-9]\\.[0-9]([0-9])?$)`, 'i')
  return reg.test(val)
}

/* 验证身份证 */
export function validatUserId (val) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(val)
}

/* 验证邮箱 */
export function validatEmail (val) {
  const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return reg.test(val)
}

/* 验证手机 */
export function validatMobilePhone (val) {
  const reg = /^((1)3(\d){9}$)|(^(1)4[5-9](\d){8}$)|(^(1)5[^4]{9}$)|(^(1)66(\d){8}$)|(^(1)7[0-8](\d){8}$)|(^(1)8(\d){9}$)|(^(1)9[8-9](\d){8}$)/
  return reg.test(val)
}

/* 验证固定电话 */
export function validatTel (val) {
  const reg = /0\d{2,3}-\d{7,8}/
  return reg.test(val)
}


/* currentpageshowType  当前查看的方式  直接显示 1  新增页面的显示 2  编辑页面的显示 3 */
export function validateViewAuth (num, obj, currentpageshowType = 1, fromScale = 16, toScale = 2) {
  // 先进行16进制转化为2进制
  let str = parseInt(num, fromScale).toString(toScale) || "11110"
  console.log(`----打印【${obj.DisplayName}】-的权限----`, str)
  return {
    "scanViewEncry": str.split("")[4] * 1,  // 查看视图是否加密   1 和 0 区分
    "addorEditViewEdit": str.split("")[3] * 1,  // 新增/编辑视图是否可编辑   1 和 0 区分
    "scanViewShow": str.split("")[2] * 1,  // 查看视图是否可见   1 和 0 区分
    "editViewShow": str.split("")[1] * 1,  // 编辑视图是否可见   1 和 0 区分
    "addViewShow": str.split("")[0] * 1,  // 新增视图是否可见   1 和 0 区分
  }
}

/**
* [isXXX 基础方法]
* @param  {[type]}  item [description]
* @return {Boolean}      [description]
*/
export function isUndefined (item) {
  return typeof item === 'undefined'
}
export function isDefined (item) {
  return !isUndefined(item)
}
export function isString (item) {
  return typeof item === 'string'
}
export function isNumber (item) {
  return typeof item === 'number'
}
export function isArray (item) {
  return Object.prototype.toString.apply(item) === '[object Array]'
}
export function isObject (item) {
  return typeof item === 'object' && !isArray(item)
}
export function isFunction (item) {
  return typeof item === 'function'
}

