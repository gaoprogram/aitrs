/**
 * Created by Administrator on 2020/7/31.
 * function : newStyle_mixin
 */


/**页面组件类型********************************************************************* */
import pageCmp from '@/base/NewStyle-cmp/page-cmp/Base-page'



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

