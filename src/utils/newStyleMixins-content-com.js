/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */

/**组件类型********************************************************************* */
import ComSectionCmp from '@/base/NewStyle-cmp/Content-section-cmp/Base-comCmp-section'

import FieldGroupCmp from '@/base/NewStyle-cmp/Content-section-cmp/FieldGroup-cmp/Base-fieldGroup'
import TableCmp from '@/base/NewStyle-cmp/Content-section-cmp/Table-cmp/Base-table'
import TabSectionCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tab-cmp/Base-tab-section'
import NextStep from '@/base/NewStyle-cmp/Content-section-cmp/Next-step-cmp/Base-nextStep'
import UpBtnCmp from '@/base/NewStyle-cmp/UpBtn-section-cmp/Base-UpBtn'
import UpTextCmp from '@/base/NewStyle-cmp/UpText-section-cmp/Base-UpText'

import SeriesBarCmp from '@/base/NewStyle-cmp/Content-section-cmp/Echarts-cmp/Base-seriesBar'
import TreeCmp from '@/base/NewStyle-cmp/Content-section-cmp/Tree-cmp/Base-Tree'



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
        ComSectionCmp,  // 通用的组件布局层组件（表、分组组件等）
        UpTextCmp, // 文本组件
        FieldGroupCmp,  // 字段分组组件
        TableCmp, // 通用表组件
        TabSectionCmp,  // tab布局组件
        NextStep,    // 步骤组件
        SeriesBarCmp,  // 图组件
        TreeCmp,  // 树组件
        
    },
    methods: {
        currentComComponent ( CombineType ) {
            switch ( CombineType ) {
                case '0030300':
                    return  UpTextCmp // 文本组件
                case '0030302':
                    return TabSectionCmp  // tab布局组件
                    // return ComSectionCmp  // 通用的组件布局层组件
                case '0030303':
                    // return FieldGroupCmp  // 分组组件
                    return ComSectionCmp  // 分组组件(单分组和多分组组件)
                case  '0030304':
                    // return TableCmp   // 表组件(显示)  
                    return ComSectionCmp   // 单表组件  
                case  '0030305':
                    // return TableCmp   // 表组件(输入) 
                    return ComSectionCmp   // 表组件(输入) 
                case  '0030306':
                    return SeriesBarCmp   // 图组件
                case  '0030308':
                    return TableCmp   //待选对象列表组件                                                                              
                case '0030309':
                    return  NextStep    // 步骤组件
                case  '0030310':
                    return TreeCmp   // 树形组件 
                case  '0030312':
                    return TreeCmp   // 树表组件                                                                                  
                default:
                    // return FieldGroupCmp
            }
        }
    }
}

