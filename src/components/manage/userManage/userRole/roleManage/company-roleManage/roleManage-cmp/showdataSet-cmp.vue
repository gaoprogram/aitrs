<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理-显示数据-显示数据设置组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.showDataSetCmp
    padding 0 0 20px 0
</style>

<template>
    <div class="showDataSetCmp animated fadeIn" v-loading="loading">
        <!-- obj：{{obj}}
            ----
            tableData: {{tableData}} -->
            <!-- currentEditRow_Copy: {{currentEditRow_Copy}}-->
        <div class="tabBox">
            <!-- queryObj.tCode: {{queryObj.tCode}}
            ---
            tabs: {{tabs}} -->
            <el-tabs 
                v-model="queryObj.tCode" 
                type="card" 
                @tab-click="handleClickTabs">
                <el-tab-pane 
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :label="tab.Name" 
                    :name="tab.Code"
                ></el-tab-pane>
            </el-tabs>
        </div>
        <div class="topBox clearfix">
            <el-button 
                v-if="!isFromScan"
                v-atris-sysManageScan="{'styleBlock':'inline-block'}"
                :disabled="multipleSelection.length<=0"
                type="primary" 
                size="mini" 
                style="float: right"
                @click.native="handlerBatchEdit"
            >批量编辑</el-button>
        </div>
        <div 
            class="tableBox marginT10"
            :class="!tableData.length? 'not_found':''">
            <el-table
                border
                :data="tableData"
                max-height="550px"
                empty-text=" "
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    v-if="!companyRoleScanFlag"
                    type="selection"
                    width="55"
                >
                </el-table-column>

                <el-table-column
                    label="已授权"
                    prop="Unable"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <!-- scope.$index： {{scope.$index}} -->
                        <span v-if="scope.$index === currentIndex">
                            <el-switch
                                v-model="scope.row.Unable"
                                active-color="#409EFF"
                                inactive-color="#67C23A"
                                active-text="是"
                                inactive-text="否"                                
                            ></el-switch>
                        </span>
                        <span v-else>
                            <span 
                                v-if="scope.row.Unable"
                                style="color: #409EFF"
                            >是</span>
                            <span 
                                v-else
                                style="color: #67C23A"
                            >否</span>
                        </span>                     
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="可新增"
                    prop="Add"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <span v-if="scope.$index === currentIndex">
                            <el-switch
                                v-model="scope.row.Add"
                                active-color="#409EFF"
                                inactive-color="#67C23A"
                                active-text="是"
                                inactive-text="否"                                
                            ></el-switch>
                        </span>
                        <span v-else>
                            <span 
                                v-if="scope.row.Add"
                                style="color: #409EFF"
                            >是</span>
                            <span 
                                v-else
                                style="color: #67C23A"
                            >否</span>
                        </span>                        
                    </template>                
                </el-table-column>  

                <el-table-column
                    label="可编辑"
                    prop="Edit"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <span v-if="scope.$index === currentIndex">
                            <el-switch
                                v-model="scope.row.Edit"
                                active-color="#409EFF"
                                inactive-color="#67C23A"
                                active-text="是"
                                inactive-text="否"                                
                            ></el-switch>
                        </span>
                        <span v-else>
                            <span 
                                v-if="scope.row.Edit"
                                style="color: #409EFF"
                            >是</span>
                            <span 
                                v-else
                                style="color: #67C23A"
                            >否</span>
                        </span>                        
                    </template>                
                </el-table-column>                    

                <el-table-column
                    label="显示"
                    prop="Show"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <span v-if="scope.$index === currentIndex">
                            <el-switch
                                v-model="scope.row.Show"
                                active-color="#409EFF"
                                inactive-color="#67C23A"
                                active-text="是"
                                inactive-text="否"                                
                            ></el-switch>
                        </span>
                        <span v-else>
                            <span 
                                v-if="scope.row.Show"
                                style="color: #409EFF"
                            >是</span>
                            <span 
                                v-else
                                style="color: #67C23A"
                            >否</span>
                        </span>                                                
                    </template>                 
                </el-table-column>  

                <el-table-column
                    label="加密"
                    prop="Encrypt"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <span v-if="scope.$index === currentIndex">
                            <el-switch
                                v-model="scope.row.Encrypt"
                                active-color="#409EFF"
                                inactive-color="#67C23A"
                                active-text="是"
                                inactive-text="否"                                
                            ></el-switch>
                        </span>
                        <span v-else>
                            <span 
                                v-if="scope.row.Encrypt"
                                style="color: #409EFF"
                            >是</span>
                            <span 
                                v-else
                                style="color: #67C23A"
                            >否</span>
                        </span>                      
                    </template>  
                </el-table-column>     

                <el-table-column
                    label="分组/表"
                    prop="RefName"
                    sortable
                    show-overflow-tooltip
                >
                
                </el-table-column>

                <el-table-column
                    label="自定义字段名"
                    prop="FieldName"
                    sortable
                    show-overflow-tooltip
                >
                
                </el-table-column>   

                <el-table-column
                    label="系统字段名"
                    prop="SysName"
                    sortable
                    show-overflow-tooltip
                >
                
                </el-table-column>       

                <el-table-column
                    label="描述"
                    prop="Description"
                    show-overflow-tooltip
                >
                
                </el-table-column>                                                                         

                <el-table-column
                    v-if="!companyRoleScanFlag && !isFromScan"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button 
                            v-if="scope.$index != currentIndex"
                            type="text" 
                            size="mini"
                            @click.native="handlerEdit(scope.row, scope.$index)">
                            编辑
                        </el-button>
                        <span v-else>
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerCancelRow(scope.row, scope.$index)">
                                取消
                            </el-button>                               
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerSaveRow(scope.row, scope.$index)">
                                保存
                            </el-button>                              
                        </span>                                                
                    </template>
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
        <!-- multipleSelectionCopy: {{multipleSelectionCopy}} -->
        <!---批量编辑弹框---->  
        <div class="batchEditBox" v-if="showBatchEditDialog">
            <el-dialog
                :title="currentEditTit"
                fullscreen
                append-to-body
                :close-on-click-modal="false"
                :visible.sync="showBatchEditDialog"
            >
                <showdata-set-batch-edit-cmp
                    :propTableData = "multipleSelectionCopy"
                    @emitCancelFieldSet="emitCancelFieldSet"
                    @emitSaveFieldSet="emitSaveFieldSet"
                ></showdata-set-batch-edit-cmp>
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import ShowdataSetBatchEditCmp from './showdataSetBatchEdit-cmp'
    import { mapGetters } from 'vuex'
    import { 
        GetFieldSetTags,
        GetFieldSets,
        SaveFieldSets
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isFromScan: {
                type: Boolean,
                default: false
            }
        },
        components: {
            ShowdataSetBatchEditCmp
        },
        data(){
            return {
                loading: false, 
                tabs: [],
                multipleSelection: [],
                showBatchEditDialog: false, // 批量编辑弹框 显示隐藏
                tableData: [],
                currentIndex: -1,
                isEditing: false,
                currentEditRow_Copy: {},
                currentEditTit:'',
                queryObj: {
                    tCode: '',
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        computed: {
            ...mapGetters([
                'companyRoleScanFlag'
            ])
        },
        created(){
            this._GetFieldSetTags()
        //    this._getComTables()
        },
        methods: {
            _GetFieldSetTags(){
                GetFieldSetTags(this.obj.ComponentCode).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.tabs = res.data.Data
                        if(this.tabs.length){
                            this.queryObj.tCode = this.tabs[0].Code
                            this._getComTables()
                        }
                    }else {
                        this.$message.error('获取标签数据失败,${res.data.Error}')
                    }
                })
            },
            _getComTables(){
                this._GetFieldSets()
            },
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            // 批量编辑
            handlerBatchEdit(){
                this.multipleSelectionCopy = JSON.parse(JSON.stringify(this.multipleSelection))
                this.showBatchEditDialog = true
            },
            handleClickTabs(tab, idx){
                debugger
                this.currentEditTit = '批量编辑：' + tab.label
                this._getComTables()
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
            // 获取显示数据设置列表
            _GetFieldSets(){
                this.loading = true
                GetFieldSets(this.obj.ComponentCode,this.queryObj.tCode, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.loading = false
                        this.tableData = res.data.Data
                        this.queryObj.total = res.data.Total
                    }else {
                        this.$message.error(`获取显示数据设置列表数据失败,${res.data.Error}`)
                    }
                })
            },
            // 保存显示数据设置数据
            _SaveFieldSets(data){
                this.loading = true
                SaveFieldSets(JSON.stringify(data)).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.loading = false
                        if(this.showBatchEditDialog){
                            this.showBatchEditDialog = false
                        }
                        this.$message.success("数据保存成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`保存数据失败,${res.data.Error}`)
                    }
                })
            },
            // 编辑
            handlerEdit(row, idx){
                debugger
                if(this.isEditing){
                    this.$message.info("请先保存的未保存字段")
                    return
                }
                this.currentIndex = idx*1
                this.currentEditRow_Copy = {...row}
                this.tableData[idx].Edit = true
                this.tableData[idx].Show = true
                this.isEditing = true
            },
            // 保存行
            handlerSaveRow(row, idx){
                debugger
                this.currentRowObj = row
                this.currentIndex = idx*1
                this.$confirm(`确定要保存"${row.FieldName}"吗？`, "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this.isEditing = false
                    this.currentIndex = -1
                    this._SaveFieldSets([this.currentRowObj])
                }).catch(() => {
                    this.$message.info("保存已取消")
                })
            },
            // 取消保存行
            handlerCancelRow(row, idx){
                debugger
                this.currentIndex = -1
                Object.assign(row, this.currentEditRow_Copy)
                this.isEditing = false
            },
            emitCancelFieldSet(){
                this.showBatchEditDialog = false
            },
            emitSaveFieldSet(data){
                data = data || []
                this._SaveFieldSets(data)
            },
        }
    }
</script>

