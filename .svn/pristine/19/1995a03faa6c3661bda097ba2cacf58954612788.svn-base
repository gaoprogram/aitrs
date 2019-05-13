/**
 * Created by Administrator on 2018/12/13.
 * function : 表单字段验证规则
 */
import { validatMoney } from '@/utils/validate'
function NumRule (obj) {
  let validatePass = (rule, value, callback) => {
    if (obj.Required && (obj.FieldValue === '' || !obj.FieldValue)) {
      callback(new Error(obj.FieldName + '不能为空'))
    }
  }
  let rules = {
    required: obj.Required,
    validator: validatePass,
    trigger: 'blur'
  }
  return rules
}

function MoneyRule (obj) {
  let validatePass = (rule, value, callback) => {
    if (obj.Required && (obj.FieldValue === '' || !obj.FieldValue)) {
      callback(new Error(obj.FieldName + '不能为空'))
    }
    if (!validatMoney(obj.FieldValue)) {
      callback(new Error('金额格式输入不正确'))
    }
  }
  let rules = {
    required: obj.Required,
    validator: validatePass,
    trigger: 'blur'
  }
  return rules
}

export function fieldValidateRule (obj) {
  switch (obj.ControlType) {
    case '3':
      return NumRule(obj)
    case '4':
      return MoneyRule(obj)
  }
}
