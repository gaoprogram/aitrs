<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户管理——许可权组件中 添加许可权列表组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.permitRightsSetCmp
    padding 20px
    box-sizing border-box
    .item
        font-size 0
        .roleTit
            display inline-block
            width 70px
            height 20px
            font-weight bold
            line-height 20px
            font-size 14px
            color #606266
        .roleValue
            display inline-block
            font-size 12px
            margin-left 10px
</style>

<template>
    <div class="permitRightsSetCmp animated fadeIn">
        <div class="searchBox u-f-ac marginT10">
            <!-- moduleOptions: {{moduleOptions}} -->
            <div class="u-f-ac">
                <div class="marginL10 u-f u-f-ac u-f-jsb">
                    <span class="u-f-ac u-f-jsb">
                        <span>许可权名称：</span>
                        <el-input
                            v-model="queryObj.Name"
                            placeholder="许可权名"
                            clearable
                            style="width: 150px"
                            @clear="clearSearch"
                        ></el-input>
                    </span>
                    <span class="marginL5 u-f-ac u-f-jsb">
                        <span>类型：</span>
                        <el-select v-model="queryObj.sysType">
                            <el-option 
                                v-for="(item, key) in sysTypeOptions"
                                :key="key"
                                :value="item.value"
                                :label="item.label"
                            >
                            </el-option>                           
                        </el-select>
                    </span>
                    <span class="marginL5 u-f-ac u-f-jsb">
                        <!-- roleOptions: {{roleOptions}} -->
                        <!-- queryObj.role: {{queryObj.role}} -->
                        <span>角色：</span>
                        <el-cascader
                            v-model="queryObj.role"
                            :options="roleOptions"
                            :props="{ 
                                checkStrictly: false,
                                value:'RoleGroupCode',
                                label:'RoleGroupName',
                                children:'Children'}"
                            :show-all-levels="false"
                            clearable>
                        </el-cascader>                        
                    </span>                    
                    <span class="marginL5 u-f-ac u-f-jsb">
                        <span>状态：</span>
                        <el-select v-model="queryObj.State">
                            <el-option 
                                v-for="(item, key) in stateOptions"
                                :key="key"
                                :value="item.value"
                                :label="item.label"
                            >
                            </el-option>
                        </el-select>    
                    </span>                
                </div> 

                <div class="marginL10 u-f-ac u-f-jsb">
                    <el-button 
                        type="primary"
                        size="small"
                        @click.native="handlerSearch">
                        搜索
                    </el-button>      
                    <el-button 
                        type="primary"
                        size="small"
                        @click.native="handlerReset">
                        重置
                    </el-button>                                    
                </div>                     
            </div> 
        </div> 

        <!-- tableData: {{tableData}} -->
        <!-- obj: {{obj}} -->
        <div class="contentBox marginT10">
            <div :class="['tableBox', !tableData.length? 'not_found':'']">
                <el-table
                    border
                    max-height="450px"
                    :data="tableData"
                    v-loading="loading"
                    empty-text=" "
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>
                    <el-table-column
                        label="许可权"
                        sortable
                        show-overflow-tooltip                        
                        prop="PermissionPackageCode"
                    >

                    </el-table-column>

                    <el-table-column
                        label="许可权名称"
                        prop="PermissionPackageName"
                        width="150"
                        sortable
                        show-overflow-tooltip                           
                    >
                    
                    </el-table-column>   

                    <el-table-column
                        label="描述"
                        prop="Description"
                        sortable
                        show-overflow-tooltip                           
                    >
                    
                    </el-table-column>  

                    <el-table-column
                        label="引用的角色"
                        prop="RoleNames"
                        sortable
                        show-overflow-tooltip                           
                    >
                    
                    </el-table-column> 

                    <el-table-column
                        label="状态"
                        prop="State"
                        width="80"
                        sortable
                        show-overflow-tooltip                           
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.State == 1">
                                启用
                            </span>
                            <span v-if="scope.row.State == 0">
                                停用
                            </span>                        
                        </template>
                    </el-table-column>                                 

                    <!-- <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">                                              
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerScan(scope.row)">
                                编辑
                            </el-button>     
                            <el-button 
                                v-if="scope.row.State == 1"
                                type="text"
                                size="mini"
                                @click.native="handlerStopUsing(scope.row,0)">
                                停用
                            </el-button>      
                            <el-button 
                                v-if="scope.row.State == 0"
                                type="text"
                                size="mini"
                                @click.native="handlerStartUsing(scope.row,1)">
                                启用
                            </el-button>                                           
                        </template>
                    </el-table-column>                                                   -->
                </el-table>
            </div>
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

            <div class="footerBox">
                <save-footer @save="saveAddPermit" @cancel="cancelAddPermit" saveText="确定添加"></save-footer>
            </div>      
        </div>   

        <!----数据安全弹框--start-->
        <div class="dataSafetyBox" v-if="showDataSafetyDialog">
            <el-dialog
                title="数据安全"
                width="40%"
                :visible.sync="showDataSafetyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <data-safety-cmp 
                    :obj="currentRowObj"
                ></data-safety-cmp>
            </el-dialog>
        </div>
        <!--数据安全弹框-end-->     



        <!----添加许可权限弹框--start-->
        <div class="addPermitBox" v-if="showAddPermitDialog">
            <el-dialog
                title="添加许可权"
                width="40%"
                :visible.sync="showAddPermitDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-permit-cmp 
                    ref="addPermitCmp"
                    @closeAddDialog="closeAddDialog"
                    @addPermitSuccess="addPermitSuccess"
                ></add-permit-cmp>
            </el-dialog>
        </div>
        <!--添加许可权限弹框-end-->    

        <!---复制弹框--start-->
        <div class="copyBox" v-if="showCopyDialog">
            <el-dialog
                title="复制许可权"
                width="40%"
                :visible.sync="showCopyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <div class="content u-f-ac">
                    <h3>复制后名称：</h3>
                    <el-input 
                        style="width: 300px;display: inline-block"
                        v-model="copyName"
                        placeholder="请输入名称"
                    ></el-input>
                </div>
                <div class="footerBox">
                    <save-footer @save="saveCopy" @cancel="cancelCopy"></save-footer>
                </div>                
            </el-dialog>
        </div>
        <!---复制弹框---end-->

        <!---编辑弹框--start-->
        <div class="editBox" v-if="showScanDialog">
            <el-dialog
                title="编辑许可权"
                width="60%"
                :visible.sync="showScanDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <permit-scan-cmp 
                    :obj="currentRowObj"
                    @closeScanDialog="closeScanDialog"
                    @editPermitSuccess="editPermitSuccess"
                ></permit-scan-cmp>
            </el-dialog>
        </div>
        <!---编辑弹框---end-->        

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import DataSafetyCmp from './dataSafety-cmp'
    import AddPermitCmp from './addPermit-cmp'
    import PermitScanCmp from './permitScan-cmp'
    import { 
        getSelectCompRole,
        CompPermitPMgtList,
        SetComPermitPState,
        CopyComPermitP,
        BatchAddComUserPermit,
        batchDelSecurityTypeGroup
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            DataSafetyCmp,
            AddPermitCmp,
            PermitScanCmp,
            SaveFooter
        },
        data(){
            return {
                loading: false, 
                multipleSelection: [],
                tableData: [],
                currentRowObj: {},
                showDataSafetyDialog: false,
                showAddPermitDialog: false,
                showCopyDialog: false,
                showScanDialog: false,
                copyName: '',
                stateOptions: [
                    {
                        label: '全部',
                        value: '-1'
                    },
                    {
                        label: '停用',
                        value: "0"
                    },
                    {
                        label: '启用',
                        value: "1"
                    }
                ],
                sysTypeOptions: [
                    {
                        label: '全部',
                        value: '-1'
                    },                    
                    {
                        label: '系统',
                        value: "1"
                    },
                    {
                        label: '企业',
                        value: "2"
                    }                    
                ],             
                queryObj: {
                    Name: '',
                    State: '-1', //状态，默认1启用，0禁用 -1 全部
                    sysType: '-1', //1系统，2企业 全部 -1
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    role: [],
                    permissionId: this.obj.PermissionId
                },
                roleOptions: []
            }
        },
        created(){
            this._getComTables()
            // 获取 角色组-角色下拉框数据源
            this._getSelectCompRole()
        },
        computed: {

        },
        watch: {
        
        },
        methods: {
            _getComTables(){
                this._CompPermitPMgtList()
            },
            _changeData(data){
                if(data && data.length){
                    data.forEach((item, key) => {
                        item.label = item.RoleGroupName
                        item.value = item.RoleGroupCode
                        if(item.Children && item.Children.length){
                            item.children = item.Children
                        }

                        if(item.Children && item.Children.length){
                            this._changeData(item.Children)
                        }else {
                            delete item.Children
                        }
                    })
                }
                return data
            },   
            // 获取 搜索条件： 角色组-角色下拉选项
            _getSelectCompRole(){
                getSelectCompRole("","",1).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.roleOptions = res.data.Data
                        // 处理option 数据
                        this.roleOptions = this._changeData(this.roleOptions)                        
                    }else {
                        this.$message.warning(`获取角色下拉框数据失败,${res.data.Error}`)
                    }
                })
            },
            // 判断是数组
            isArray(data){
                return Object.prototype.toString.call(data) === '[object Array]'
            },
            _CompPermitPMgtList(Name,State, sysType, pageSize = 10, pageNum = 1, permissionId, roleId){
                this.loading = true
                let length = this.queryObj.role.length
                let role_id = ''
                if(length && this.isArray(this.queryObj.role)){
                    role_id = this.queryObj.role[length-1]
                }else {
                    role_id = ''
                }
                CompPermitPMgtList(this.queryObj.Name, this.queryObj.State, this.queryObj.sysType, this.queryObj.pageSize,this.queryObj.pageNum,this.queryObj.permissionId, role_id).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.queryObj.total = res.data.Total
                    }else {
                        this.$message.error(`获取许可权限列表数据失败,${res.data.Error}`)
                    }
                })
            },   
            _batchDelSecurityTypeGroup(data){
                this.loading = true
                batchDelSecurityTypeGroup(JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("安全组删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除安全组失败,${res.data.Error}`)
                    }
                })
            }, 
            // 清空搜索框
            clearSearch(){
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
            handleSelectionChange(val){
                this.multipleSelection = val
            }, 
            // 重置
            handlerReset(){
                Object.assign(this.queryObj, {
                    Name: '',
                    sysType: "-1",
                    State: "-1",
                    role: []
                })
                this._getComTables()
            },             
            //搜索
            handlerSearch(){
                this._getComTables()
            }, 
            // 添加权限
            _BatchAddComUserPermit(data){
                BatchAddComUserPermit(JSON.stringify(data), this.obj.UserId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("添加成功")
                        this._getComTables()
                        this.$emit("addPermitSuccess")
                    }else {
                        this.$message.error(`添加失败,${res.data.Error}`)
                    }
                })
            },
            // 添加保存
            saveAddPermit(){
                if(!this.multipleSelection.length){
                    return this.$message.warning("请先选择需要添加的权限")
                }
                this._BatchAddComUserPermit(this.multipleSelection)

            },
            // 取消添加
            cancelAddPermit(){
                this.$emit("closeAddDialog")
            },
            // 编辑
            handlerScan(row){
                this.currentRowObj = row
                this.showScanDialog = true
            },
            // 数据安全
            handlerDataSafety(row){
                this.currentRowObj = row
                this.showDataSafetyDialog = true
            },
            // 移除
            handlerDelete(row){
                this.currentRowObj = row
                this.$confirm("确定要删除此安全组吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._batchDelSecurityTypeGroup([this.currentRowObj])
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            // 添加许可权限
            addPermit(){
                debugger
                this.showAddPermitDialog = true
            },
            // 批量移除许可权限
            batchDeletePermit(){
                debugger
                if(!this.multipleSelection.length){
                    this.$message.warning("请先选择要移除的许可权限")
                    return
                }else {
                    this.$confirm("确定要批量移除许可权限吗？","提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(res => {
                        this._batchDelSecurityTypeGroup(this.multipleSelection)
                    }).catch(() => {
                        this.$message.info("批量删除已取消")
                    })
                }
            },
            // 复制许可权
            copyPermit(){
              debugger  
              if(this.multipleSelection.length!=1){
                this.$message.warning("请选择一项进行复制")
                return
              }
            
              this.showCopyDialog = true
            },
            // 批量数据安全
            batchDataSafety(){
                debugger

            },
            closeAddDialog(){
                this.showAddPermitDialog = false
            },
            addPermitSuccess(){
                this._getComTables()
                this.showAddPermitDialog = false
            },
            editPermitSuccess(){
                this._getComTables()
                this.showScanDialog = false                
            },
            // 启用/停用
            _SetComPermitPState(data, type){
                let text = type == 1 ? '启用': '停用'
                SetComPermitPState(JSON.stringify([data]), type).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success(`${text}成功`)
                        this._getComTables()
                    }else {
                        this.$message.error(`${text}失败,${res.data.Error}`)
                    }
                })
            },
            // 停用
            handlerStopUsing(row,type){
                this.currentRowObj = row
                this.$confirm("确定要停用吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                   this._SetComPermitPState(this.currentRowObj, 0) 
                }).catch(() => {
                    this.$message.info("已取消成功")
                })
            },
            // 启用
            handlerStartUsing(row,type){
                this.currentRowObj = row
                this.$confirm("确定要启用吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                   this._SetComPermitPState(this.currentRowObj, 1) 
                }).catch(() => {
                    this.$message.info("已取消成功")
                })                
            },
            _CopyComPermitP(){
                this.loading = true
                let Id = this.multipleSelection[0].Id
                CopyComPermitP(Id, this.copyName).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("复制许可权成功")
                        this.showCopyDialog = false
                        this._getComTables()
                    }else {
                        this.$message.error(`复制许可权失败,${res.data.Error}`)
                    }
                })                
            },            
            // 复制保存
            saveCopy(){
                if(!this.copyName){
                    this.$message.warning("名称为空，请填写名称")
                    return
                }
                this._CopyComPermitP()
            },
            // 复制取消
            cancelCopy(){
                this.showCopyDialog = false
            },
            closeScanDialog(){
                this.showScanDialog = false
            }
        }
    }
</script>

