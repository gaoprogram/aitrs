/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */

/**组件类型********************************************************************* */
import FieldGroupCmp from '@/base/NewStyle-cmp/Content-section-cmp/FieldGroup-cmp/Base-fieldGroup'
import TableCmp from '@/base/NewStyle-cmp/Content-section-cmp/Table-cmp/Base-table'
import TabCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tab-cmp/Base-tab'
import NextStep from '@/base/NewStyle-cmp/Content-section-cmp/Next-step-cmp/Base-nextStep'


// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'
import {

} from '@/api/approve'

// import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// import store from '../store'

// 组件类型 mixins
export const contentCmpControlTypeMixin = {
    components : {
        FieldGroupCmp,  // 字段分组组件
        TableCmp, // 通用表组件
        TabCmp,  // tab组件
        NextStep,    // 步骤组件
    },
    methods: {
        currentComComponent ( CombineType ) {
            switch ( CombineType ) {
                case '0030302':
                    return TabCmp  // tab组件
                case '0030309':
                    return  NextStep    // 步骤组件
                case '0030303':
                    return FieldGroupCmp  // 分组组件
                case  '0030304':
                    return TableCmp   // 表组件                   
                default:
                    // return FieldGroupCmp
            }
        }
    }
}

