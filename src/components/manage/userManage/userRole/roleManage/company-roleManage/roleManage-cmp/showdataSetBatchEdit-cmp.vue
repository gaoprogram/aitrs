<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理-显示数据-显示数据设置- 批量编辑组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.showDataSetBatchEditCmp
    padding 0 0 20px 0
    >>>.btn
        position relative
        margin-left 20px
        &:before
            position absolute
            top 0
            left -10px
            content ''
            width 1px
            height 100%
            background-color #909399
</style>

<template>
    <div class="showDataSetBatchEditCmp animated fadeIn" v-loading="loading">
        <div 
            class="tableBox marginT10"
            :class="!tableData.length? 'not_found':''">
            <el-table
                border
                :data="tableData"
                max-height="500"
                empty-text=" "
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column> -->
                <el-table-column
                    label="已授权"
                    prop="Unable"
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.Unable"
                            active-color="#13ce66"
                            inactive-color="#F56C6C"
                            active-text="是"
                            inactive-text="否"                                
                        ></el-switch>  
                        <el-button 
                            class="btn"
                            v-if="tableData.length>1 && scope.$index == 0"
                            type="text" 
                            size="mini"
                            @click.native="copyToColumn(scope, scope.$index)"
                        >复制到此列</el-button>              
                    </template>
                </el-table-column>

                <el-table-column
                    label="可编辑"
                    prop="Edit"
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.Edit"
                            active-color="#13ce66"
                            inactive-color="#F56C6C"
                            active-text="是"
                            inactive-text="否"                                
                        ></el-switch>
                        <el-button 
                            class="btn"
                            v-if="tableData.length>1 && scope.$index == 0"
                            type="text" 
                            size="mini"
                            @click.native="copyToColumn(scope, scope.$index)"
                        >复制到此列</el-button>                             
                    </template>                
                </el-table-column>   

                <el-table-column
                    label="显示"
                    prop="Show"
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.Show"
                            active-color="#13ce66"
                            inactive-color="#F56C6C"
                            active-text="是"
                            inactive-text="否"                                
                        ></el-switch>    
                        <el-button 
                            class="btn"
                            v-if="tableData.length>1 && scope.$index == 0"
                            type="text" 
                            size="mini"
                            @click.native="copyToColumn(scope, scope.$index)"
                        >复制到此列</el-button>                                           
                    </template>                 
                </el-table-column>  

                <el-table-column
                    label="加密"
                    prop="Encrypt"
                    width="200"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.Encrypt"
                            active-color="#13ce66"
                            inactive-color="#F56C6C"
                            active-text="是"
                            inactive-text="否"                                
                        ></el-switch>       
                        <el-button 
                            class="btn"
                            v-if="tableData.length>1 && scope.$index == 0"
                            type="text" 
                            size="mini"
                            @click.native="copyToColumn(scope, scope.$index)"
                        >复制到此列</el-button>                             
                    </template>  
                </el-table-column>     

                <el-table-column
                    label="分组/表"
                    prop="RefCode"
                    show-overflow-tooltip
                >
                
                </el-table-column>

                <el-table-column
                    label="自定义字段名"
                    prop="FieldName"
                    show-overflow-tooltip
                >
                
                </el-table-column>   

                <el-table-column
                    label="系统字段名"
                    prop="SysName"
                    show-overflow-tooltip
                >
                
                </el-table-column>       

                <el-table-column
                    label="描述"
                    prop="Description"
                    show-overflow-tooltip
                >
                
                </el-table-column>                                                                         
            </el-table>

            <!--分页部分-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>            
        </div>   

        <div class="footBox">
            <save-footer @cancel="handlerCancel" @save="handlerSave"></save-footer>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { 
        GetFieldSets,
        SaveFieldSets
    } from '@/api/systemManage'
    export default {
        props: {
            propTableData: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false, 
                tableData: this.propTableData,
                queryObj: {
                    pageSize: 655553,
                    pageNum: 1,
                    total: this.propTableData.length || 0
                }
            }
        },
        computed: {

        },
        created(){
        },
        methods: {
            _getComTables(){

            },
            handleSelectionChange(val){
                
            },
            // 批量编辑
            handlerBatchEdit(){
                this.showBatchEditDialog = true
            },
            // 分页--每页多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getComTables()
            },
            // 分页--当前页
            handleCurrentChange (val) {
                this.queryObj.pageNum = val
                this._getComTables()
            },              
            // 保存显示数据设置数据
            handlerSave(){
                this.$emit("emitSaveFieldSet", this.tableData)
                // SaveFieldSets(JSON.stringify(data)).then(res => {
                //     if(res && res.data.State === REQ_OK){
                //         this.loading = false
                //         this.$message.success("数据保存成功")
                //         this._getComTables()
                //     }else {
                //         this.$message.error(`保存数据失败,${res.data.Error}`)
                //     }
                // })
            },
            // 取消
            handlerCancel(){
                debugger
                this.$emit("emitCancelFieldSet")
            },
            // 批量复制到此列
            copyToColumn(obj, idx){
                debugger
                let currentColumnProperty = obj.column.property
                let currentColumnValue = obj.row[currentColumnProperty]
                let currentColumnIndex = idx*1
                this.tableData.forEach((item, key) => {
                    item[currentColumnProperty] = currentColumnValue
                })
            }
        }
    }
</script>

