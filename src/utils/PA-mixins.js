/**
 * Created by Administrator on 2019/9/27.
 * function : mixin
 */

import CommonInput from '@/base/Common-input/Common-input'
import CommonSelect from '@/base/Common-select/Common-select'


// PA控件类型（包含规则验证）--------------------------------------------------------------------------------------------
import BaseInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-input'
import TextareaInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Textarea-input'
import NumInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Num-input'
import MoneyInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Money-input'
import BaseSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-select'
import MultipleSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Multiple-select'
import BaseDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-date'
import RangeDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Range-date'
import TimeDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Time-date'
import MonthSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Month-select'
import BaseSwitchRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-switch'

// PA控件类型 （包括 验证规则组件）
import BaseRadioRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-radio'
import BaseCheckboxRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-checkbox'
import BaseImgUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-img-upload'
import BaseFileUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-file-upload'
import BaseEmpUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-emp-select'
import BaseOrgUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-org-select'
import BaseOrgAndEmpRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-org-and-emp-select'
// import BaseMapUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-map-select'
import BaseCalculateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-calculate'
import BaseEditorRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-editor'
import BaseExplainRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-explain'

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'


import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// PA页面控件类型
export const paControlTypeMixin = {
  methods: {
    currentTabComponent (teamField) {
      if (teamField.ControlType) {
        switch (teamField.ControlType) {
          case '1':
            return CommonInput
          case '4':
            return CommonSelect
        }
      }
    }
  },
  components: {
    CommonInput,
    CommonSelect
  }
}



// PA 页面表单控件类型 以及控件规则验证
export const PaControlAndRuleMixin = {
  methods: {
    PAcurrentComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case 1:
            // 单行文本输入框
            return BaseInputRule
          case 2:
            // 多行文本输入框
            return TextareaInputRule
          case 3:
            // 数字输入框
            return NumInputRule
          case 4:
            // 金额 输入框
            return MoneyInputRule
          case 5:
            // 二级的 单选下拉框
            return BaseSelectRule
          case 6:
            // 多选下拉框 二级的
            return MultipleSelectRule
          case 7:
            return BaseDateRule
          case 8:
            return RangeDateRule
          case 9:
            return TimeDateRule
          case 10:
            return MonthSelectRule
          case 11:
            return BaseSwitchRule
          case 12:
            return BaseRadioRule
          case 13:
            return BaseCheckboxRule
          case 14:
            // 上传 图片
            return BaseImgUploadRule
          case 15:
            // 上传附件
            return BaseFileUploadRule
          case 16:
            // 发起中 明细表中的 计算公式 显示框
            return BaseCalculateRule
          case 19:
            // 发起中  明细表中的  按人员选择 的显示框
            return BaseEmpUploadRule
          case 20:
            // 发起中 明细表中的  按组织选择 的显示框
            return BaseOrgUploadRule
          case 21:
            // 发起中 明细表中的 按岗位选择后的显示input组件
            return BaseOrgAndEmpRule
        //   case 22:
        //     // 地图显示器组件
        //     return BaseMapUploadRule
          case 23:
            // 编辑器显示组件
            return BaseEditorRule
          case 24:
            // 说明框显示组件
            return BaseExplainRule
        }
      }
    }
  },
  components: {
    BaseInputRule,
    TextareaInputRule,
    NumInputRule,
    MoneyInputRule,
    BaseSelectRule,
    MultipleSelectRule,
    BaseDateRule,
    RangeDateRule,
    TimeDateRule,
    MonthSelectRule,
    BaseSwitchRule,
    BaseRadioRule,
    BaseCheckboxRule,
    BaseImgUploadRule,
    BaseFileUploadRule,
    BaseEmpUploadRule,
    BaseOrgUploadRule,
    // BaseMapUploadRule,
    BaseCalculateRule,
    BaseEditorRule,
    BaseExplainRule,
    BaseOrgAndEmpRule
  }
}

// PA 页面 员工管理(在职员工、离职员工、待入职员工) 类目 下的mixin
export const PaEmployeeManageMixin = {
    data(){
        return {

        }
    },
    methods: {
      
    }
}




