<!--
    User:
    Date: markdown 富文本编辑器
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div>
        markdown富文本编辑器
        <mavon-editor v-model="value"></mavon-editor>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import { 
    CommonInterfaceMixin
} from '@/utils/CommonInterfaceMixin'
import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
export default {
    mixins: [CommonInterfaceMixin],
    component: {
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
        _refreshData(){
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
        },
        // 分页---每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getComTables()
        },
        // 分页 -- 当前页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            this._getComTables()
        }
    }
}
</script>
