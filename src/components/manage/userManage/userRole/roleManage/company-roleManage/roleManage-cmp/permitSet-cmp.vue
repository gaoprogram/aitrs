<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——角色管理-许可权-查看——许可权配置组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.rightsSetCmp
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
    <div class="rightsSetCmp">
        <!-- obj:{{obj}} -->
        <div class="searchBox u-f-ac marginT5 marginB5">
            <!-- moduleOptions: {{moduleOptions}} -->
            <div class="u-f-ac">
                <!-- <div class="marginL10">
                    <el-input
                        size="medium"
                        v-model="queryObj.Name"
                        clearable
                        placeholder="模块、菜单、组件"
                        style="width: 200px"
                        @clear="clearSearch"
                    ></el-input>
                </div>  -->
                <div class="marginL10">
                    <!-- permissionTypesOption:{{permissionTypesOption}}
                    ----
                    checkedPermissionTypes: {{checkedPermissionTypes}}
                    --
                    queryObj.permissionType: {{queryObj.permissionType}} -->
                    <el-select
                        size="medium"  
                        clearable 
                        placeholder="类型"
                        filterable
                        v-model="queryObj.permissionType">
                        <el-option
                            v-for="(item, key) in permissionTypesOption"
                            :key="key"
                            :label="item.label"
                            :value="item.value"
                        >
                            <!-- <el-checkbox-group
                                v-model="checkedPermissionTypes"
                                :max="1"
                            > -->
                            <!-- <el-checkbox 
                                style="float: left"
                                :disabled="(''+key) == item.value"
                            >{{ item.label }}</el-checkbox> -->
                            <!-- </el-checkbox-group> -->
                            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>                         -->
                        </el-option>
                    </el-select>
                </div> 
                <div class="marginL10">
                    <!-- menuCodesOptions: {{menuCodesOptions}}
                    --- -->
                    <!-- queryObj.menuCodes: {{queryObj.menuCodes}}
                    -----
                    searchMenuCodes: {{searchMenuCodes}}
                    ----- -->
                    <el-cascader
                        ref="cascader"
                        size="mini"
                        collapse-tags
                        clearable
                        filterable
                        placeholder="模块菜单, 可输入"
                        :show-all-levels="false"
                        :props="{ multiple: true, checkStrictly: false }"
                        expand-trigger="hover"
                        v-model="searchMenuCodes"
                        :options="menuCodesOptions"
                        @change="handleChange"
                        @active-item-change="itemChange">
                    </el-cascader>
                </div>                  
                <div class="marginL10">
                    <!-- componentCodeOption: {{componentCodeOption}} -->
                    <!-- queryObj.componentCode: {{queryObj.componentCode}} -->
                    <el-select 
                        size="medium"
                        clearable 
                        placeholder="组件，可输入"
                        filterable
                        v-model="queryObj.componentCode">
                        <el-option
                            v-for="(item, key) in componentCodeOption"
                            :key="key"
                            :label="item.ComponentName"
                            :value="item.ComponentCode"
                        ></el-option>
                    </el-select>
                </div>                                  
                <div class="marginL10 u-f-ac">
                    <el-button 
                      size="mini"
                      type="primary"
                      @click.native="handlerSearch">
                      搜索
                    </el-button>    
                    <el-button 
                        size="mini"
                        type="primary"
                        @click.native="clearSearch"
                    >
                        重置
                    </el-button>              
                 </div>                     
            </div>  
        </div> 


        <!-- tableData: {{tableData}} -->
        <div 
            class="tableBox"
            :class="!tableData.length? 'not_found':''">
            <div 
                v-if="isScanOrEdit"
                class="btnBox marginB10" 
                style="text-align: right"
            >
                <el-button 
                    type="primary" size="mini"
                    @click.native="addRights"
                >添加权限</el-button>
                <el-button 
                    :disabled="!multipleSelection.length"
                    type="primary" 
                    size="mini"
                    @click.native="batchDeletePermit"
                >批量移除</el-button>
                <!-- <el-tooltip content="请勾选一项后进行复制">
                    <el-button 
                        type="primary" 
                        size="mini"
                        @click.native="copyPermit"
                    >复制许可权</el-button>  
                </el-tooltip>               -->
                <!-- <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="batchDataSafety"
                >批量数据安全</el-button> -->
            </div>
            
            <el-table
                border
                :data="tableData"
                v-loading="loading"
                empty-text=" "
                max-height="500px"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <!-- <el-table-column
                    label="模块code"
                    prop="ModuleCode"
                    sortable
                    show-overflow-tooltip
                >

                </el-table-column> -->

                <el-table-column
                    label="模块名"
                    prop="ModuleName"
                    sortable
                    show-overflow-tooltip                    
                >

                </el-table-column>                

                <el-table-column
                    label="菜单"
                    prop="Title"
                    width="80"
                    sortable
                    show-overflow-tooltip                    
                >
                
                </el-table-column>   

                <el-table-column
                    label="组件"
                    prop="ComponentName"
                    width="80"
                    sortable
                    show-overflow-tooltip                    
                >
                
                </el-table-column>  

                <el-table-column
                    label="上级组件"
                    prop="ParentComponentName"
                    sortable
                    show-overflow-tooltip
                >
                
                </el-table-column> 


                <el-table-column
                    label="项类型"
                    prop="PermissionType"
                    width="100"
                    sortable
                    show-overflow-tooltip                    
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.PermissionType == 1">
                            分组
                        </span>
                        <span v-if="scope.row.PermissionType == 2">
                            表
                        </span>     
                        <span v-if="scope.row.PermissionType == 3">
                            按钮
                        </span>
                        <span v-if="scope.row.PermissionType == 4">
                            人事事件
                        </span>   
                        <span v-if="scope.row.PermissionType == 5">
                            资源
                        </span> 
                        <span v-if="scope.row.PermissionType == 6">
                            组件
                        </span>
                        <span v-if="scope.row.PermissionType == 7">
                            系统事件
                        </span>                        
                    </template>
                </el-table-column>                       

                <el-table-column
                    label="权限名称"
                    prop="PermissionName"
                    width="220"
                    show-overflow-tooltip
                    sortable
                >

                </el-table-column>                       

                <el-table-column
                    label="权限编号"
                    prop="PermissionId"
                    show-overflow-tooltip
                    sortable
                >

                </el-table-column>

                <el-table-column
                    label="描述"
                    show-overflow-tooltip
                    prop="Description"
                >
                
                </el-table-column>     

                <el-table-column
                    label="是否有子项"
                    prop="HaveChild"
                    sortable
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.HaveChild">
                            有
                        </span>
                        <span v-if="!scope.row.HaveChild">
                            无
                        </span>                        
                    </template>
                </el-table-column>                                      
                           
                <el-table-column
                    v-if="isScanOrEdit"
                    label="操作"
                >
                    <template slot-scope="scope">                                              
                        <!-- <el-button 
                            type="text" 
                            size="mini"
                            @click.native="handlerScan(scope.row)">
                            查看
                        </el-button>      -->
                        <!-- <el-button 
                            type="text" 
                            size="mini"
                            @click.native="handlerDataSafety(scope.row)">
                            数据安全
                        </el-button>   -->
                        <el-button 
                            type="text" 
                            size="mini"
                            @click.native="handlerDelete(scope.row)">
                            移除
                        </el-button> 
                        <!-- <el-button 
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
                        </el-button>                                            -->
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



        <!----添加数据权限弹框--start-->
        <div class="addPermitBox" v-if="showAddPermitDialog">
            <el-dialog
                title="添加权限"
                width="40%"
                :visible.sync="showAddPermitDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-permission-cmp 
                    ref="addPermitCmp"                    
                    @closeAddDialog="closeAddDialog"
                    @addPermitSuccess="addPermitSuccess"
                ></add-permission-cmp>
            </el-dialog>
        </div>
        <!--添加数据权限弹框-end-->    

        <!---复制弹框--start-->
        <div class="copyBox" v-if="showCopyDialog">
            <el-dialog
                title="复制许可权"
                width="30%"
                :visible.sync="showCopyDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <h3>复制后名称：</h3>
                <el-input 
                    style="width: 300px"
                    v-model="copyName"
                    placeholder="请输入名称"
                ></el-input>

                <div class="footerBox">
                    <save-footer @save="saveCopy" @cancel="cancelCopy"></save-footer>
                </div>
            </el-dialog>
        </div>
        <!---复制弹框---end-->       

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import DataSafetyCmp from './dataSafety-cmp'
    import AddPermissionCmp from './addPermission-cmp'
    import { 
        getCompPermitPSet,
        SetComPermitPState,
        CopyComPermitP,
        GetComComponList,
        ComMenuTree,
        BatchDelComPermissionPackageConfig,
        BatchAddComPermissionPackageConfig
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            isScanOrEdit: {
                type: Boolean,
                default: true  // false 查看 true 编辑
            }
        },
        components: {
            DataSafetyCmp,
            AddPermissionCmp,
        },
        data(){
            return {
                loading: false, 
                multipleSelection: [],
                checkedPermissionTypes: [],
                tableData: [],
                currentRowObj: {},
                showDataSafetyDialog: false,
                showAddPermitDialog: false,
                showCopyDialog: false,
                copyName: '',
                savePermissionArr: [],
                queryObj: {
                    Name: '',
                    PermissionPackageCode: '',
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    permissionType: '', //权限类型
                    componentCode: '', // 组件code
                    menuCodes: [], // 菜单对象数组json
                },
                permissionTypesOption: [
                    {
                        label: '分组',
                        value: '1'
                    },
                    {
                        label: '表',
                        value: '2'
                    },
                    {
                        label: '按钮',
                        value: '3'
                    },
                    {
                        label: '人事事件',
                        value: '4'
                    },
                    {
                        label: '资源',
                        value: '5'
                    },
                    {
                        label: '组件',
                        value: '6'
                    },
                    {
                        label: '系统事件',
                        value: '7'
                    }                                                                                                   
                ],
                componentCodeOption: [],
                menuCodesOptions:[],
                searchMenuCodes: []
            }
        },
        created(){
            // 获取 列表数据
            this._getComTables()
            // 获取 模块/菜单树形组件数据
            this._ComMenuTree()
            // 获取 组件下拉源
            this._GetComComponList("") 
        },
        computed: {

        },
        watch: {
            'searchMenuCodes.length': {
                handler(newValue, oldValue){
                    if(newValue){
                        let length = this.searchMenuCodes.length
                        this.searchMenuCodes.forEach((item, key) => {
                            if(item && item.length){
                                this.queryObj.menuCodes.push({
                                    MenuCode: item[item.length-1]
                                })
                            }
                        })
                    }else {
                        this.queryObj.menuCodes = []
                    }
                }
            }
        },
        methods: {
            _getComTables(){
                this._getCompPermitPSet()
            },
            handleChange(e){
                debugger
                // this.queryObj.menuCodes = []
                let obj = {}
                obj.stopPropagation = () =>{}
                try {
                    this.$refs.cascader.clearValue({})
                } catch (error) {
                    this.$refs.cascader.clearValue({})                                    
                }
            },
            itemChange(s){
                debugger
            },
            _getCompPermitPSet(){
                debugger
                this.loading = true
                getCompPermitPSet(this.obj.PermissionPackageCode, this.queryObj.Name, this.queryObj.pageSize, this.queryObj.pageNum, this.queryObj.permissionType, this.queryObj.componentCode, JSON.stringify(this.queryObj.menuCodes)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.queryObj.total = res.data.Total
                    }else {
                        this.$message.error(`获取权限列表数据失败,${res.data.Error}`)
                    }
                })
            },   
            // 获取 搜索条件 组件下拉源 
            _GetComComponList(moduleCode, menuCode){
                GetComComponList(moduleCode).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.componentCodeOption = res.data.Data
                    }else {
                        this.$message.error(`获取组件下拉源数据失败,${res.data.Error}`)
                    }
                })
            },
            _changeData(data){
                if(data && data.length){
                    data.forEach((item, key) => {
                        if(!item.MenuCode){
                            item.MenuCode = item.ModuleCode || 'yyyyy'
                        }
                        this.$set(item, 'label', item.Title)
                        this.$set(item, 'value', item.MenuCode)
                        if(item.Children && item.Children.length){
                            this.$set(item, 'children', item.Children)
                        }
                        if(item.Children && item.Children.length){
                            this._changeData(item.Children)
                        }                        
                    })
                }
                return data
            },
            // 获取 搜索条件 模块/菜单 下拉源 
            _ComMenuTree(){
                ComMenuTree().then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.menuCodesOptions = res.data.Data
                        // 处理 数据
                        this._changeData(this.menuCodesOptions)
                        debugger
                    }else {
                        this.$message.error(`获取模块/菜单下拉源数据失败,${res.data.Error}`)
                    }
                })
            },            
            _BatchDelComPermissionPackageConfig(data){
                this.loading = true
                BatchDelComPermissionPackageConfig(this.obj.PermissionPackageCode, JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除失败,${res.data.Error}`)
                    }
                })
            }, 
            // 清除搜索
            clearSearch(){
                Object.assign(this.queryObj, {
                    Name: '',
                    PermissionPackageCode: '',
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                    permissionType: '', //权限类型
                    componentCode: '', // 组件code
                    menuCodes: [], // 菜单对象数组json
                })
                this.searchMenuCodes = []
                this.queryObj.menuCodes = []

                let obj = {}
                obj.stopPropagation = () =>{}
                try {
                    this.$refs.cascader.clearValue({})
                } catch (error) {
                    // this.$refs.cascader.clearValue({})                                    
                }  

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
            //搜索
            handlerSearch(){
                this._getComTables()
            }, 
            // 查看
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
                debugger
                this.currentRowObj = row
                this.$confirm(`确定要删除"${row.PermissionName}"吗？`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._BatchDelComPermissionPackageConfig([this.currentRowObj])
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            // 添加许可权限
            addRights(){
                debugger
                this.showAddPermitDialog = true
            },
            // 批量移除配置权限
            batchDeletePermit(){
                debugger
                if(!this.multipleSelection.length){
                    this.$message.warning("请先选择要移除的许可权限")
                    return
                }else {
                    let str = ''
                    let length = this.multipleSelection.length
                    if(length){
                        this.multipleSelection.forEach((item,key) => {
                            if(key != (length-1)){
                                str += item.PermissionName + ','
                            }else {
                                str += item.PermissionName
                            }
                        })
                    }                    
                    this.$confirm(`确定要批量移除"${str}"吗？`,"提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(res => {
                        this._BatchDelComPermissionPackageConfig(this.multipleSelection)
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
            _handlerSaveData(data){
                this.savePermissionArr = data.map((item, key) => {
                    return {
                        PermissionId: item.Code
                    }
                })
            },
            _BatchAddComPermissionPackageConfig(){
                debugger
                BatchAddComPermissionPackageConfig(this.obj.PermissionPackageCode, JSON.stringify(this.savePermissionArr)).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("添加权限保存成功")
                        this.showAddPermitDialog = false
                        this._getComTables()
                    }else {
                        this.$message.error(`添加权限保存失败,${res.data.Error}`)
                    }
                })
            },
            addPermitSuccess(data){
                debugger
                if(data && data.length){
                    // 处理data
                    this._handlerSaveData(data)
                }else {

                }
                this._BatchAddComPermissionPackageConfig()
            },
            // 启用/停用
            _SetComPermitPState(type){
                let text = type == 1 ? '启用': '停用'
                SetComPermitPState(this.currentRowObj.Id, type).then(res => {
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
                this.$message.confirm("确定要停用吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                   this._SetComPermitPState(0) 
                }).catch(() => {
                    this.$message.info("已取消成功")
                })
            },
            // 启用
            hanlderStartUsing(row,type){
                this.currentRowObj = row
                this.$message.confirm("确定要启用吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                   this._SetComPermitPState(1) 
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
            treeNodeClick(data){
                debugger
                this.currentCode = data.Code
                this.currentKeyName = data.label
                this.currentTreeNodeObj = data
            },
            checkedPermission(checkedPermissionObj){
                debugger
                this.currentCheckedPermissionObj = checkedPermissionObj
            }             
        }
    }
</script>



