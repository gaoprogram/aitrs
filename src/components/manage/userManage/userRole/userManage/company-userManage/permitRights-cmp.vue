<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色——用户管理——  许可权 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.permitRightsCmp
    padding 0 0 20px 0
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
    <div class="permitRightsCmp animated fadeIn">
        <!-- obj: {{obj}} -->
        <div>
            <div class="item">
                <span class="roleTit">用户名:</span>
                <span class="roleValue">{{obj.UserName}}</span>
            </div>
            <!-- <div class="item">
                <span class="roleTit">角色类型:</span>
                <span class="roleValue" v-if="obj.RoleType == 2">企业自定义角色</span>
                <span class="roleValue" v-if="obj.RoleType == 1">系统角色</span>
            </div>         -->
            <div class="item">
                <span class="roleTit">用户号:</span>
                <span class="roleValue">{{obj.UserId}}</span>
            </div>
            <!-- <div class="item">
                <span class="roleTit">角色编号:</span>
                <span class="roleValue">{{obj.RoleId}}</span>
            </div>   -->
        </div>  


        <!-- <div class="searchBox u-f-ac marginT10">
            <div class="u-f-ac">
                <div class="marginL10">
                    <span>许可权名称：</span>
                    <el-input
                        v-model="queryObj.componentName"
                        placeholder="许可权名"
                        style="width: 150px"
                    ></el-input>
                </div> 

                <div class="marginL10">
                    <el-button 
                        type="primary"
                        @click.native="handlerSearch">
                        搜索
                    </el-button>                  
                </div>                     
            </div>  
        </div>  -->


        <!-- tableData: {{tableData}} -->
        <div 
            class="tableBox marginT10" 
            :class="!tableData.length? 'not_found':''">
            <div class="btnBox marginB10" style="text-align: right">
                <el-button 
                    type="primary" size="mini"
                    @click.native="addPermit"
                >添加许可权</el-button>              
                <el-button 
                    :disabled="!multipleSelection.length"
                    type="primary" 
                    size="mini"
                    @click.native="batchDeletePermit"
                >批量移除许可权</el-button>
                <el-button 
                    :disabled="!multipleSelection.length"
                    type="primary" 
                    size="mini"
                    @click.native="batchDataSafety"
                >批量数据安全</el-button>
            </div>
            <div 
                v-loading="loading"
                :class="['tableBox', tableData.lengt<=0?'not_found':'']">
                <el-table
                    border
                    :data="tableData"
                    
                    empty-text=" "
                    max-height="500px"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>
                    <el-table-column
                        label="许可权"
                        prop="PermissionPackageCode"
                        width="120"
                        show-overflow-tooltip
                    >

                    </el-table-column>

                    <el-table-column
                        label="许可权名称"
                        prop="PermissionPackageName"
                        show-overflow-tooltip
                    >
                    
                    </el-table-column>   

                    <el-table-column
                        label="引用的角色"
                        prop="RoleNames"
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        label="系统配置"
                        prop="SysType"
                        show-overflow-tooltip
                        sortable
                    >
                        <template slot-scope="scope">
                            <!-- scope.row.SysType: {{scope.row.SysType}} -->
                            <span style="color: rgb(64, 158, 255)" v-if="scope.row.SysType == 1">
                                是
                            </span>
                            <span style="color:rgb(245, 108, 108) " v-if="scope.row.SysType == 2">
                                否
                            </span>                            
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="描述"
                        prop="Description"
                        show-overflow-tooltip
                    >
                    
                    </el-table-column>  


                    <el-table-column
                        label="状态"
                        prop="State"
                        sortable
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
                            <!-- <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerScan(scope.row)">
                                编辑
                            </el-button>      -->
                            <el-button 
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
                width="60%"
                :visible.sync="showDataSafetyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <data-safety-cmp 
                    :obj="currentRowObj"
                    :batchSafetyArr="multipleSelection"
                    :isBatchSafety="isBatchSafety"   
                    :propPermissionPackageName="propPermissionPackageName"                 
                ></data-safety-cmp>
            </el-dialog>
        </div>
        <!--数据安全弹框-end-->     

        <!----添加许可权弹框--start-->
        <div class="addPermitBox" v-if="showAddPermitDialog">
            <el-dialog
                title="添加许可权"
                fullscreen
                :visible.sync="showAddPermitDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-permit-list-cmp 
                    ref="addPermitCmp"
                    :obj="obj"
                    :roleId="code"
                    @closeAddDialog="closeAddDialog"
                    @addPermitSuccess="addPermitSuccess"
                ></add-permit-list-cmp>
            </el-dialog>
        </div>
        <!--添加许可权弹框-end-->    

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    // import DataSafetyCmp from './dataSafety-cmp'
    import DataSafetyCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/dataSafety-cmp'
    // import AddPermitListCmp from './permitList-cmp'
    import AddPermitListCmp from './permitList-cmp'
    import PermitScanCmp from './permitScan-cmp'
    import { 
        CompUserPermitList,
        BatchDelComUserPermit
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            // strFlag: {
            //     type: String,
            //     default: 'roleInfo'
            // }
        },
        components: {
            DataSafetyCmp,
            AddPermitListCmp,
            PermitScanCmp
        },
        data(){
            return {
                loading: false, 
                multipleSelection: [],
                tableData: [],
                currentRowObj: {},
                showDataSafetyDialog: false,
                showAddPermitDialog: false,
                showScanDialog: false,
                isBatchSafety: false,
                propPermissionPackageName: '',
                queryObj: {
                    componentName: '',
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
        methods: {
            _getComTables(){
                this._CompUserPermitList()
            },
            _CompUserPermitList(){
                this.loading = true
                CompUserPermitList(JSON.stringify(this.obj), this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
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
                        this.$message.success("安全组移除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`安全组移除失败,${res.data.Error}`)
                    }
                })
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
                this._getComTables()
            }, 
            // 编辑
            handlerScan(row){
                debugger
                this.currentRowObj = row
                this.showScanDialog = true
            },
            // 数据安全
            handlerDataSafety(row){
                this.currentRowObj = row
                this.propPermissionPackageName = row.PermissionPackageName
                this.isBatchSafety = false
                this.showDataSafetyDialog = true
            },
            // 移除
            handlerDelete(row){
                this.currentRowObj = row
                this.$confirm(`确定要删除"${row.PermissionPackageName}"权限吗？`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._BatchDelComUserPermit([this.currentRowObj])
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            // 添加许可权限
            addPermit(){
                debugger
                this.showAddPermitDialog = true
            },
            // 移除/批量移除 许可权
            _BatchDelComUserPermit(data){
                this.loading = true
                BatchDelComUserPermit(JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除失败,${res.data.Error}`)
                    }
                })
            },
            // 批量移除许可权限
            batchDeletePermit(){
                debugger
                if(!this.multipleSelection.length){
                    this.$message.warning("请先选择要移除的许可权限")
                    return
                }else {
                    let str = ''
                    this.multipleSelection.forEach((item, key) => {
                        let length = this.multipleSelection.length
                        if(key!=(length-1)){
                            str += item.PermissionPackageName + "、"
                        }else if(key == (length - 1)) {
                            str += item.PermissionPackageName 
                        }
                    }) 
                    this.$confirm(`确定要批量移除"${str}"许可权限吗？`,"提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(res => {
                        this._BatchDelComUserPermit(this.multipleSelection)
                    }).catch(() => {
                        this.$message.info("批量删除已取消")
                    })
                }
            },
            // 批量数据安全
            batchDataSafety(){
                debugger
                let length = this.multipleSelection.length
                let str = ''
                this.multipleSelection.forEach((item, key) => {
                    if(key != (length-1)){
                        str += item.PermissionPackageName + ', '
                    }else {
                        str += item.PermissionPackageName
                    }
                })
                this.propPermissionPackageName = str                
                this.isBatchSafety = true
                this.showDataSafetyDialog = true
            },
            closeAddDialog(){
                this.showAddPermitDialog = false
            },
            closeScanDialog(){
                this.showScanDialog = false
            },
            addPermitSuccess(){
                this._getComTables()
                this.showAddPermitDialog = false
            },
            editPermitSuccess(){
                this._getComTables()
                this.showScanDialog = false
            }
        }
    }
</script>