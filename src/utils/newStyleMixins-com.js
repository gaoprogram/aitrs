/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */

/**组件类型********************************************************************* */
import fieldGroupCmp from '@/base/NewStyle-cmp/Content-section-cmp/FieldGroup-cmp/Base-fieldGroup'
import tableCmp from '@/base/NewStyle-cmp/Content-section-cmp/Table-cmp/Base-table'



// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'
import {

} from '@/api/approve'

// import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// import store from '../store'

// 组件类型 mixins
export const componentsControlTypeMixin = {
    components : {
        fieldGroupCmp,  // 字段分组组件
        tableCmp, // 通用表组件
    },
    methods: {
        currentComComponent ( controlType ) {
            switch ( controlType ) {
                case 'fieldGroup':
                    return fieldGroupCmp
                case  'tableCmp':
                    return tableCmp
                default:
                    // return fieldGroupCmp
            }
        }
    }
}

