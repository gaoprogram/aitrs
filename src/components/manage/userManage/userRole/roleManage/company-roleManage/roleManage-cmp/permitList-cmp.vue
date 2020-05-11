<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——角色管理——许可权组件中 添加许可权列表组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.permitRightsSetCmp
    padding 0 20px 20px 20px
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
                            size="small"
                            style="width: 150px"
                            @clear="clearSearch"
                        ></el-input>
                    </span>
                    <span class="marginL5 u-f-ac u-f-jsb">
                        <span>类型：</span>
                        <el-select size="small" v-model="queryObj.sysType">
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
                            size="small"
                            v-model="queryObj.role"
                            :options="roleOptions"
                            filterable
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
                        <el-select size="small" v-model="queryObj.State">
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
        <!-- obj: {{obj}}
        roleId: {{roleId}} -->
        <div class="contentBox marginT10">
            <div :class="['tableBox', !tableData.length? 'not_found':'']">
                <el-table
                    border
                    max-height="600px"
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
                            <span style="color: #409EFF" v-if="scope.row.SysType == 1">
                                是
                            </span>
                            <span style="color: #67C23A" v-if="scope.row.SysType == 2">
                                否
                            </span>                            
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

            <div class="footerBox" style="margin-top:-30px !important">
                <save-footer @save="saveAddPermit" @cancel="cancelAddPermit" saveText="确定添加"></save-footer>
            </div>      
        </div>         

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { 
        getSelectCompRole,
        CompPermitPMgtList,
        BatchAddComRolePermit,
        BatchAddComUserPermit,
        batchDelSecurityTypeGroup,
        AddToComPermissionPackage
    } from '@/api/systemManage'
    export default {
        props: {
            // 是否是 权限引用列表中 添加到许可权的组件引用的此组件
            isAuthrityPage: {
                type: Boolean,
                default: false,
            },
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            roleId: {
                type: String,
                default: ''
            },
            // 是否是用户管理中——许可权——添加到许可权
            isFromUserManageFlag: {
                type: Boolean,
                default: false
            }
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false, 
                multipleSelection: [],
                tableData: [],
                currentRowObj: {},
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
                    sysType: "-1", //1系统，2企业 全部 -1
                    State: "-1", //状态，默认1启用，0禁用 -1 全部
                    role: [],
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
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
            // 判断是数组
            isArray(data){
                return Object.prototype.toString.call(data) === '[object Array]'
            },            
            _CompPermitPMgtList(){
                this.loading = true
                let length = this.queryObj.role.length
                let role_id = ''
                if(length && this.isArray(this.queryObj.role)){
                    role_id = this.queryObj.role[length-1]
                }else {
                    role_id = ''
                }                
                CompPermitPMgtList(this.queryObj.Name, this.queryObj.State, this.queryObj.sysType, this.queryObj.pageSize, this.queryObj.pageNum, '', role_id).then(res => {
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
            //搜索
            handlerSearch(){
                this._getComTables()
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
            // 添加权限
            _BatchAddComRolePermit(data){
                BatchAddComRolePermit(JSON.stringify(data), this.roleId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("添加成功")
                        this._getComTables()
                        this.$emit("addPermitSuccess")
                    }else {
                        this.$message.error(`添加失败,${res.data.Error}`)
                    }
                })
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
            _AddToComPermissionPackage(data){
                AddToComPermissionPackage(this.roleId, JSON.stringify(data)).then(res => {
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
                if(this.isAuthrityPage){
                    // 权限引用列表页面中的添加到 许可权
                    this._AddToComPermissionPackage(this.multipleSelection)
                }else {
                    // 非权限引用列表页面中的 添加到许可权的保存
                    if(!this.isFromUserManageFlag){
                        this._BatchAddComRolePermit(this.multipleSelection)
                    }else {
                        // 用户管理——许可权——添加许可权列表
                        this._BatchAddComUserPermit(this.multipleSelection)

                    }
                }

            },
            // 取消添加
            cancelAddPermit(){
                this.$emit("closeAddDialog")
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
            closeScanDialog(){
                this.showScanDialog = false
            }
        }
    }
</script>

