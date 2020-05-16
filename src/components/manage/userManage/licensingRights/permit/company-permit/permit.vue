<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——许可权-许可权配置  许可权限组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.permitRightsSetCmp
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
            <div class="marginL10">
                <span>
                    <span>许可权名称：</span>
                    <el-input
                        v-model="queryObj.Name"
                        placeholder="许可权名，编号"
                        clearable
                        style="width: 150px"
                        @clear="clearSearch"
                    ></el-input>
                </span>
                <span class="marginL5">
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
                <!-- <span class="marginL5">
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
                </span>                     -->
            </div> 

            <div class="marginL10">
                <el-button 
                    type="primary"
                    @click.native="handlerSearch">
                    搜索
                </el-button>  
                <el-button 
                    type="primary" 
                    @click.native="clearSearch"
                >重置</el-button>
            </div>                     
        </div>  
      </div> 


        <!-- queryObj.sysType: {{queryObj.sysType}} -->
        <!-- <el-tabs 
            class="marginT10"
            v-model="queryObj.sysType" 
            type="card" 
            @tab-click="handleClickTab">
            <el-tab-pane label="全部" name="-1"></el-tab-pane>
            <el-tab-pane label="系统" name="1"></el-tab-pane>
            <el-tab-pane label="企业" name="2"></el-tab-pane>
        </el-tabs> -->

        <!-- tableData: {{tableData}} -->
        <div class="contentBox">
            <div class="btnBox marginB10" style="text-align: right">
                <el-checkbox
                    style="float: left;margin-top:10px"
                    @change="handlerSelectBtn"
                >
                    停用
                </el-checkbox>  

                <el-button 
                    type="primary" size="mini"
                    @click.native="addPermit"
                >添加许可权</el-button>
                <!-- <el-button 
                    :disabled="!multipleSelection.length"
                    type="primary" 
                    size="mini"
                    @click.native="batchDeletePermit"
                >批量移除许可权</el-button> -->
                <el-tooltip content="请勾选一项后进行复制">
                    <el-button 
                        type="primary" 
                        size="mini"
                        @click.native="copyPermit"
                    >复制许可权</el-button>  
                </el-tooltip>              
                <!-- <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="batchDataSafety"
                >批量数据安全</el-button> -->
            </div>

            <!-- tableData： {{tableData}} -->
            <div :class="['tableBox', !tableData.length? 'not_found':'']" v-loading="loading">
                <el-table
                    border
                    size="medium"
                    max-height="500"
                    :data="tableData"
                    empty-text=" "
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"
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
                        label="许可权编号"
                        sortable
                        width="300"
                        show-overflow-tooltip                        
                        prop="PermissionPackageCode"
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
                        label="系统配置"
                        prop="SysType"
                        sortable
                        show-overflow-tooltip                           
                    >
                        <template slot-scope="scope">
                            <!-- scope.row.SysType: {{scope.row.SysType}} -->
                            <span v-if="scope.row.SysType ==1 " style="color: #409EFF">是</span>
                            <span v-if="scope.row.SysType ==2 " style="color: #67C23A">否</span>                       
                        </template>
                    </el-table-column>    

                    <el-table-column
                        label="描述"
                        prop="Description"
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

                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">                                              
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerScan(scope.row)">
                                查看
                            </el-button>  
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerEdit(scope.row)">
                                编辑
                            </el-button>     
                            <!-- <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerDataSafety(scope.row)">
                                数据安全
                            </el-button>  
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerDelete(scope.row)">
                                移除
                            </el-button>   -->  
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
                    </el-table-column>                                                  
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
                title="新增许可权"
                fullscreen
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

        <!---编辑/查看弹框--start-->
        <div class="editBox" v-if="showEditDialog">
            <el-dialog
                :title="scanOrEditTit"
                fullscreen
                :visible.sync="showEditDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <permit-scan-cmp 
                    :obj="currentRowObj"
                    :isScanOrEdit="isScanOrEdit"
                    @closeScanDialog="closeEditDialog"
                    @editPermitSuccess="editPermitSuccess"
                ></permit-scan-cmp>
            </el-dialog>
        </div>
        <!---编辑/查看弹框---end-->        

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    // import DataSafetyCmp from './permit-cmp/DataSafe-cmp'
    import DataSafetyCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/dataSafety-cmp'
    import AddPermitCmp from './permit-cmp/addPermit-cmp'
    // import PermitScanCmp from './permit-cmp/permitScan-cmp'
    // 引入公用的 组件
    import PermitScanCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/permitScan-cmp'
    import { 
        CompPermitPMgtList,
        SetComPermitPState,
        CopyComPermitP,
        batchDelSecurityTypeGroup
    } from '@/api/systemManage'
    export default {
        props: {

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
                showEditDialog: false,
                isScanOrEdit: false, 
                scanOrEditTit: '',
                copyName: '',
                stateOptions: [
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
                    sysType: '-1', //1系统，2企业 -1 全部
                    State: 1, //状态，默认1启用，0禁用
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        created(){
            this._getComTables()
        },
        computed: {

        },
        watch: {
            'queryObj.sysType': {
                handler(newValue, oldValue){
                    this._getComTables()
                }
            }
        },
        methods: {
            _getComTables(){
                this._CompPermitPMgtList()
            },
            handleClickTab(tab, index){
                debugger
                this.queryObj.sysType = tab.name
                // this._getComTables()
            },
            _CompPermitPMgtList(){
                this.loading = true
                CompPermitPMgtList(this.queryObj.Name, this.queryObj.State, this.queryObj.sysType, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
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
                if(this.queryObj.sysType == '-1'){
                    Object.assign(this.queryObj, {
                        Name: '',
                        sysType: '-1',
                        State: '1'
                    })   
                    this._getComTables()                 
                }else {
                    Object.assign(this.queryObj, {
                        Name: '',
                        sysType: '-1',
                        State: '1'
                    })                       
                }
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
            //搜索
            handlerSearch(){
                this.queryObj.pageNum = 1
                this._getComTables()
            }, 
            // 查看
            handlerScan(row){
                this.currentRowObj = row
                this.isScanOrEdit = false
                this.scanOrEditTit = '查看许可权'
                this.showEditDialog = true
            },
            // 编辑
            handlerEdit(row){
                this.currentRowObj = row
                this.scanOrEditTit = '编辑许可权'
                this.isScanOrEdit = true
                this.showEditDialog = true
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
            // 启用/停用 筛选
            handlerSelectBtn(value){
                debugger
                if(value){
                    this.queryObj.State = 0
                    this.queryObj.pageNum = 1
                }else {
                    this.queryObj.State = 1
                    this.queryObj.pageNum = 1
                }
                this._getComTables()        
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
                // this.showAddPermitDialog = false
            },
            editPermitSuccess(){
                debugger
                this._getComTables()
                this.showEditDialog = false                
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
                debugger
                this.currentRowObj = row
                this.$confirm(`确定要停用${row.PermissionPackageName}吗？`,"提示",{
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
                this.$confirm(`确定要启用${row.PermissionPackageName}吗？`,"提示",{
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
            closeEditDialog(){
                this.showEditDialog = false
            }
        }
    }
</script>

