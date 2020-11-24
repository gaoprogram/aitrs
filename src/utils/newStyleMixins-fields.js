/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */

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
import BaseMapUpload from '@/base/NewStyle-cmp/Field-cmp/Base-map-select'
import BaseCalculate from '@/base/NewStyle-cmp/Field-cmp/Base-calculate'
import BaseEditor from '@/base/NewStyle-cmp/Field-cmp/Base-editor'
import BaseExplain from '@/base/NewStyle-cmp/Field-cmp/Base-explain'
import BaseSwitchSelect from '@/base/NewStyle-cmp/Field-cmp/Base-switch-select'
import RangeNum from '@/base/NewStyle-cmp/Field-cmp/Range-num'
// import OrgAndEmpSelect from '@/base/NewStyle-cmp/Field-cmp/Org-and-emp-select'
import BaseProvinces from '@/base/NewStyle-cmp/Field-cmp/Base-provinces'
import BaseFieldSelect from '@/base/NewStyle-cmp/Field-cmp/Base-fieldSelect'
import BaseFieldSet from '@/base/NewStyle-cmp/Field-cmp/Base-fieldSet'
import BasePageLinkField from '@/base/NewStyle-cmp/Field-cmp/Base-pageLink'

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'
import {

} from '@/api/approve'

// import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// import store from '../store'

// 分组字段控件类型  mixins
export const fieldGroupControlTypeMixin = {
    methods: {
        currentFieldComponent (ControlType) {
            switch (ControlType) {
                case 1:
                    return BaseInput
                case 2:
                    return TextareaInput
                case 3:
                    return NumInput
                case 4:
                    return MoneyInput
                case 5:
                    return BaseSelect
                case 6:
                    return MultipleSelect
                case 7:
                    return BaseDate
                case 8:
                    return RangeDate
                case 9:
                    return TimeDate
                case 10:
                    return MonthSelect
                case 11:
                    return BaseSwitch
                case 12:
                    return BaseRadio
                case 13:
                    return BaseCheckbox
                case 14:
                    return BaseImgUpload
                case 15:
                    return BaseFileUpload
                case 16:
                    return BaseCalculate
                case 19:
                    return BaseEmpUpload
                case 20:
                    return BaseOrgUpload
                case 21:
                    return OrgAndEmpSelect
                case 22:
                    return BaseMapUpload
                case 23:
                    return BaseEditor
                case 24:
                    return BaseExplain
                case 27:
                    return BaseProvinces
                case 28:
                    return BaseFieldSelect    
                case 29:
                    return BaseFieldSet
                case 30:
                    return BasePageLinkField                                                           
                case 31:
                    return RangeNum
                case 32:
                    return BaseSwitchSelect
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
        // OrgAndEmpSelect,  // 组织和人员选择
        BaseProvinces,  //省市区,
        BaseFieldSelect, // 字段选择器
        BaseFieldSet, // 字段设置器
        BasePageLinkField, // 页面跳转字段
        RangeNum,  // 数字区间
        BaseSwitchSelect  // 是否下拉选择
    }
}
