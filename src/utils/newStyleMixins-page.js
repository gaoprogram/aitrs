/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */

// import CommonInput from '@/base/Common-input/Common-input'
// import CommonSelect from '@/base/Common-select/Common-select'
// import SendCmp from '@/components/platform/approval-flow/right-fixed/send-cmp'
// import SendCmp from '@/components/platform/approval-flow/right-fixed/agree-cmp'
// import AddnextstepacceptersCmp from '@/components/platform/approval-flow/right-fixed/nextStepAccepters-cmp'
// import RefuseCmp from '@/components/platform/approval-flow/right-fixed/refuse-cmp'
// import CommentCmp from '@/components/platform/approval-flow/right-fixed/comment-cmp'
// import ShiftCmp from '@/components/platform/approval-flow/right-fixed/shift-cmp'
// import AskForCmp from '@/components/platform/approval-flow/right-fixed/ask-for-cmp'
// import ReturnCmp from '@/components/platform/approval-flow/right-fixed/return-cmp'
// import HungUpCmp from '@/components/platform/approval-flow/right-fixed/hung-up-cmp'
// import HuiQianCmp from '@/components/platform/approval-flow/right-fixed/huiqian-cmp'


/**页面组件类型********************************************************************* */
import pageCmp from '@/base/NewStyle-cmp/page-cmp/Base-page'


/**组件类型********************************************************************* */
import fieldGroupCmp from '@/base/NewStyle-cmp/FieldGroup-cmp/Base-fieldGroup'

// 字段控件类型----------------------------------------------------------------------------------------------
import BaseInput from '@/base/NewStyle-cmp/Field-cmp/Base-input'
import TextareaInput from '@/base/NewStyle-cmp/Field-cmp/Textarea-input'
import NumInput from '@/base/NewStyle-cmp/Field-cmp/Num-input'
import MoneyInput from '@/base/NewStyle-cmp/Field-cmp/Money-input'
import BaseSelect from '@/base/NewStyle-cmp/Field-cmp/Base-select'
import MultipleSelect from '@/base/NewStyle-cmp/Field-cmp/Multiple-select'
import BaseDate from '@/base/NewStyle-cmp/Field-cmp/Base-date'
import RangeDate from '@/base/NewStyle-cmp/Field-cmp/Range-date'
import TimeDate from '@/base/NewStyle-cmp/Field-cmp/Time-date'
import MonthSelect from '@/base/NewStyle-cmp/Field-cmp/Month-select'
import BaseSwitch from '@/base/NewStyle-cmp/Field-cmp/Base-switch'
import BaseRadio from '@/base/NewStyle-cmp/Field-cmp/Base-radio'
import BaseCheckbox from '@/base/NewStyle-cmp/Field-cmp/Base-checkbox'
import BaseImgUpload from '@/base/NewStyle-cmp/Field-cmp/Base-img-upload'
import BaseFileUpload from '@/base/NewStyle-cmp/Field-cmp/Base-file-upload'
import BaseEmpUpload from '@/base/NewStyle-cmp/Field-cmp/Base-emp-select'
import BaseOrgUpload from '@/base/NewStyle-cmp/Field-cmp/Base-org-select'
// import BaseMapUpload from '@/base/NewStyle-cmp/Field-cmp/Base-map-select'
import BaseCalculate from '@/base/NewStyle-cmp/Field-cmp/Base-calculate'
import BaseEditor from '@/base/NewStyle-cmp/Field-cmp/Base-editor'
import BaseExplain from '@/base/NewStyle-cmp/Field-cmp/Base-explain'
// import OrgAndEmpSelect from '@/base/NewStyle-cmp/Field-cmp/Org-and-emp-select'
// import BaseProvinces from '@/base/NewStyle-cmp/Field-cmp/Base-provinces'


// 其它组件-------------------------------------------------------------------------------------------------
import FlowConfigRouter from '@/components/platform/approval-flow/flow-config-router/flow-config-router'

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'
import {

} from '@/api/approve'

// import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// import store from '../store'
// 页面 类型 mixins
export const pageControlTypeMixin = {
    components: {
        pageCmp  // 通用页面组件
    },
    methods: {
        currentPageComponent ( controlType ) {
            switch ( controlType ) {
                case 'pageCmp':
                    return pageCmp
                default:
                    return pageCmp
            }
        }
    }
}

// 组件类型 mixins
export const componentsControlTypeMixin = {
    components : {
        fieldGroupCmp,  // 字段分组组件
    },
    methods: {
        currentComComponent ( controlType ) {
            switch ( controlType ) {
                case 'fieldGroup':
                    return fieldGroupCmp
                default:
                    return fieldGroupCmp
            }
        }
    }
}

// 分组字段控件类型  mixins
export const fieldGroupControlTypeMixin = {
    methods: {
        currentFieldComponent (controlType) {
            switch (controlType) {
                case '1':
                    return BaseInput
                case '2':
                    return TextareaInput
                case '3':
                    return NumInput
                case '4':
                    return MoneyInput
                case '5':
                    return BaseSelect
                case '6':
                    return MultipleSelect
                case '7':
                    return BaseDate
                case '8':
                    return RangeDate
                case '9':
                    return TimeDate
                case '10':
                    return MonthSelect
                case '11':
                    return BaseSwitch
                case '12':
                    return BaseRadio
                case '13':
                    return BaseCheckbox
                case '14':
                    return BaseImgUpload
                case '15':
                    return BaseFileUpload
                case '16':
                    return BaseCalculate
                case '19':
                    return BaseEmpUpload
                case '20':
                    return BaseOrgUpload
                case '21':
                    return OrgAndEmpSelect
                case '22':
                    return BaseMapUpload
                case '23':
                    return BaseEditor
                case '24':
                    return BaseExplain
                case '27':
                    return 'BaseProvinces'
            }
        }
    },
    components: {
        BaseInput,  // 单行文本输入框
        TextareaInput, // 多行文本输入框
        NumInput,   // 数字输入框
        MoneyInput,  // 金额输入框
        BaseSelect,  // 单选下拉框
        MultipleSelect, // 多选下拉框
        BaseDate,  // 时间——年月日
        RangeDate, // 时间区间
        TimeDate,  // 时分
        MonthSelect, // 月份
        BaseSwitch, // switch 选择器
        BaseRadio, // 单选radio
        BaseCheckbox, //多选chekbox
        BaseImgUpload, // 图片
        BaseFileUpload, // 附件
        BaseEmpUpload,  //  人员
        BaseOrgUpload,  // 组织
        BaseMapUpload,  // 地图
        BaseCalculate, // 计算公式
        BaseEditor,  // 富文本编辑器
        BaseExplain,  // 说明
        OrgAndEmpSelect,  // 组织和人员选择
        BaseProvinces  //省市区
    }
}
