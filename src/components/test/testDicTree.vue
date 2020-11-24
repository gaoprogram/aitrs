<!--
    User:
    Date:
    功能:
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
    <div>
        tableData: {{tableData}}
        ---------
        treeData: {{treeData}}
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="Name"
                label="Name"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Code"
                label="Code"
                width="180">
            </el-table-column>
            <el-table-column
                prop="MaxTier"
                label="MaxTier">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button 
                        @click="handleClick(scope.row)" 
                        type="text" 
                        size="small"
                    >查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog 
            v-if="showScanDialog"
            title="查看"
            fullscreen
            :visible.sync="showScanDialog"
            append-to-body
            :close-on-click-modal="false"
        >
            <common-dic-tree
                :propTreeData="treeData"
                :propRowObj="currentRowObj"
                :propDicCode="currentRowObj.Code"
                :propDraggable="true"
                :propMaxTier="currentRowObj.MaxTier"
            ></common-dic-tree> 
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
import { 
    REQ_OK
} from '@/api/config'
import {
    getDicCollection,
} from '@/api/newStyle.js'
import {
    newStyleGetDicByKey
} from '@/api/dic'
import CommonDicTree from '@/base/NewStyle-cmp/Dic-cmp/Base-commonDicTree'
export default {
    components: {
        CommonDicTree
    },
    data() {
        return {
            loading: false,
            tableData: [],
            treeData: [],
            currentRowObj: {},
            showScanDialog: false,
        }
    },
   created(){
       this._getDicData()
   },
   computed:{
   },
   methods:{
    _getDicData(){
        this.loading = true
        getDicCollection('CUS').then(res => {
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.tableData = res.data.Data
            }else {
                
            }
        })      
    },
    // 查看
    handleClick(rowObj){
        this.loading = true
        this.currentRowObj = rowObj
        newStyleGetDicByKey('CUS', this.currentRowObj.Code, this.currentRowObj.ModuleCode).then(res => {
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.treeData = res.data.Data
            }else {
                
            }
            this.showScanDialog = true
        })
    }
   },
}
</script>
