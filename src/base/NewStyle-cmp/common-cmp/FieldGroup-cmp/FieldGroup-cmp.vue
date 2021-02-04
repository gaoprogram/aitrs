<!--
    User:
    Date: newStyle 分组组件
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div class="fieldGroup-cmp">
        <!-- groupObj.groupAttributeArr: {{groupObj.groupAttributeArr}} -->
        <el-form
            v-for="(formObj, index) in groupObj.groupAttributeArr"
            :key="index"
            :ref="`team_${formObj.mainCode}`"
            :model="formObj"
        >
            <h3 class="header">
                <i class="header-icon el-icon-info"></i>                
                {{formObj.desc}}
            </h3>

            <div class="setCmpContentBox">
                <component 
                    v-for="(field, key) in formObj.teamControlList"
                    :key="key"                
                    :is="currentFieldComponentMixin(field.controltype)"
                    :obj.sync="field"
                    :prop="'field.' + key + '.convalue'"
                    :isNeedGetDataSource="true"
                    :disableFlag="false"
                    :isShowing="formObj.readOnly"
                    :isNeedCheck="true"
                ></component>
            </div>             
        </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import {
    fieldControlTypeMixin
} from '@/utils/newStyleMixins-fields'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [fieldControlTypeMixin, CommonInterfaceMixin],
    props: {
        groupObj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        SearchToolsCmp,
    },
    data() {
        return {
        }
    },
    created(){
    },
    computed:{
    },
    watch:{
    },
    methods:{
        //重新刷新获取数据
        _refreshData () {

        },
        _getComTables(){

        },
        //启用/停用
        handlerStopOrUsing(){
            let statusText = row.state == 1? '停用': '启用'
            let name = row.rolename || ''
            let ids = row.id ? [row.id] : []
            let baseKey = 'plat_sysmg_sys_rolegroup'
            this.commonSetStatusMixin({
                statusText,
                name,
                ids,
                basekey
            })
        },
        //批量删除
        handlerBatchDelete(){
            let statusText = '批量删除'
            let baseKey = 'plat_sysmg_sys_rolegroup'
            let name = ''
            let ids = []
            let length = this.multipleSelection.length
            if(length){
                this.multipleSelection.forEach((item, key) => {
                    item.id && ids.push(item.id)
                    if(key != length-1){
                        name += item.rolename + ','
                    }else {
                        name += item.rolename
                    }
                })
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        },
        // 删除
        handlerDelete(row){
            if(row.id){
                let statusText = '删除'
                let name = row.rolename || ''
                let ids = row.id ? [row.id] : []
                let baseKey = 'plat_sysmg_sys_rolegroup'
                this.commonDeleteListMixin({
                    statusText,
                    name,
                    ids,
                    baseKey
                })
            }
        }
    }
}
</script>
