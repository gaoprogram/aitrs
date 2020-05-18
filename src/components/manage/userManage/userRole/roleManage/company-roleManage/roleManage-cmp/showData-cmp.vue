<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  显示数据组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-dialog
    padding-bottom 20px !important
.showDataCmp
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
    <div class="showDataCmp animated fadeIn">
        <!-- obj: {{obj}} -->
        <template v-if="isRole">
            <div class="item">
                <span class="roleTit">角色名:</span>
                <span class="roleValue">{{obj.RoleName}}</span>
            </div>
            <div class="item">
                <span class="roleTit">角色类型:</span>
                <span class="roleValue" v-if="obj.RoleType == 2">企业自定义角色</span>
                <span class="roleValue" v-if="obj.RoleType == 1">系统角色</span>
            </div>        
            <div class="item">
                <span class="roleTit">角色编号:</span>
                <span class="roleValue">{{obj.RoleId}}</span>
            </div>   
        </template>  
        <template v-if="!isRole">
            <div class="item">
                <span class="roleTit">用户名:</span>
                <span class="roleValue">{{obj.UserName}}</span>
            </div>
            <div class="item">
                <span class="roleTit">用户号:</span>
                <span class="roleValue">{{obj.UserId}}</span>
            </div>          
        </template>

        <div class="searchBox u-f-ac marginT10">
            <!-- moduleOptions: {{moduleOptions}} -->
            <div class="u-f-ac">
                <div>
                    <span>模块</span>
                    <el-select 
                        style="width: 150px"
                        clearable
                        v-model="queryObj.moduleCode">
                        <el-option 
                            v-for="(item, index) in moduleOptions"
                            :key="item.ModuleCode"
                            :label="item.ModuleName"
                            :value="item.ModuleCode">
                        </el-option>
                    </el-select>
                </div>

                <div class="marginL10">
                    <span>组件名</span>
                    <el-input
                        clearable
                        v-model="queryObj.componentName"
                        placeholder="组件名"
                        style="width: 150px"
                    ></el-input>
                </div>   
            </div>

            <div class="marginL10">
                <el-button 
                    type="primary"
                    @click.native="handlerSearch">
                    搜索
                </el-button>      
                <el-button 
                    type="primary"
                    @click.native="handlerReset">
                    重置
                </el-button>                               
            </div>       
        </div> 


        <!-- tableData: {{tableData}} -->
        <div 
            class="tableBox marginT10"
            :class="!tableData.length? 'not_found':''">
            <el-table
                border
                :data="tableData"
                v-loading="loading"
                max-height="450px"
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
                    label="基模块"
                    prop="ModuleName"
                    show-overflow-tooltip
                    sortable
                >

                </el-table-column>

                <el-table-column
                    label="组件实义名"
                    prop="ComponentRealName"
                    show-overflow-tooltip
                    sortable                    
                >
                
                </el-table-column>   

                <el-table-column
                    label="组件名"
                    prop="ComponentName"
                    show-overflow-tooltip
                    sortable                    
                >
                
                </el-table-column>  

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button 
                            type="text" 
                            size="mini"
                            @click.native="showDataSet(scope.row)">
                            显示数据设置
                        </el-button>
                        <el-button 
                            type="text" 
                            size="mini"
                            @click.native="handlerScan(scope.row)">
                            查看
                        </el-button>                        
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
                :total="total">
            </el-pagination>            
        </div>   

        <!---设置/查看 显示数据---->
        <div class="showDataSetDialogBox" v-if="showDataSetDialog">
            <el-dialog
                :title="showDataTit"
                fullscreen
                :close-on-click-modal="false"
                :append-to-body="true"
                :visible.sync="showDataSetDialog"
            >
                <showdata-set-cmp
                    :obj="currentShowDataSetRow"
                    :isFromScan = "isFromScan"
                >
                </showdata-set-cmp>
            </el-dialog>
        </div>

        <!---查看---->
        <div class="showDataSetDialogBox" v-if="showScanDialog">
            <el-dialog
                title="查看"
                width="30%"
                :close-on-click-modal="false"
                :append-to-body="true"
                :visible.sync="showScanDialog"
            >
                <!-- currentScanRow: {{currentScanRow}} -->
                <div>
                    <span>基模块:</span>
                    <el-button type="text">{{currentScanRow.ModuleName}}</el-button>
                </div>
                <div>
                    <span>组件:</span>
                    <el-button type="text">{{currentScanRow.ComponentRealName}}</el-button>
                </div>
                <div>
                    <span>组件名:</span>
                    <el-button type="text">{{currentScanRow.ComponentName}}</el-button>
                </div>                                
            </el-dialog>
        </div>        
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import ShowdataSetCmp from './showdataSet-cmp'
    import { mapGetters } from 'vuex'
    import { 
       GetModuleList,
       compRoleShowDataList 
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            propRoleId: {
                type: String,
                default:''
            },
            propUserId: {
                type: String,
                default:''
            },            
            isRole:{
                type: Boolean,
                default: true
            }
        },
        components: {
            ShowdataSetCmp
        },
        data(){
            return {
                loading: false, 
                total: 0,
                multipleSelection: [],
                tableData: [],
                moduleOptions: [],  // 模块下拉源数据
                showDataSetDialog: false, 
                showScanDialog: false, 
                currentShowDataSetRow: {},
                currentScanRow: {},
                isFromScan: false, // true 是设置数据  false 是查看
                showDataTit: '',
                queryObj: {
                    userCode: '',  // 人员管理中的 显示数据 用到的参数
                    roleId: '', // 角色管理/企业角色 - 显示数据 用到的参数
                    moduleCode: '',
                    componentName: '',
                    pageSize: 10,
                    pageNum: 1
                }
            }
        },
        computed: {
            ...mapGetters([
                'companyRoleScanFlag'
            ])
        },
        watch: {
            propRoleId: {
                handler(newValue, oldValue){
                    this.queryObj.roleId = newValue
                },
                immediate: true
            },
            propUserId: {
                handler(newValue, oldValue){
                    this.queryObj.userCode = newValue
                },
                immediate: true
            }            
        },        
        created(){
            this._getComTables()
            // 获取模块下拉源
            this._getProductModuleVerMgt()
        },
        methods: {
            _getComTables(){
                this._compRoleShowDataList()
            },
            // 获取 模块下拉源
            _getProductModuleVerMgt(){
                GetModuleList().then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.moduleOptions = res.data.Data
                    }else {
                        this.$message.error(`获取模块下拉源数据失败,${res.data.Error}`)
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
            // 获取table表格数据
            _compRoleShowDataList(){
                this.loading = true
                if(this.isRole){
                    // 企业角色/角色管理
                    delete this.queryObj.userCode
                }else {
                    // 人员管理
                    delete this.queryObj.roleId
                }
                compRoleShowDataList(this.queryObj).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.total = res.data.Total
                    }else {
                        this.$message.error(`获取显示数据失败,${res.data.Error}`)
                    }
                })
            },
            handleSelectionChange(val){
                this.multipleSelection  = val
            },
            // 显示数据设置
            showDataSet(row){
                this.currentShowDataSetRow = row
                this.showDataTit = '设置显示数据'
                this.isFromScan = false
                this.showDataSetDialog = true
            },
            // 查看
            handlerScan(row){
                debugger
                this.currentScanRow = row
                this.currentShowDataSetRow = row
                this.showDataTit = '查看显示数据'
                // this.showScanDialog = true
                this.isFromScan = true
                this.showDataSetDialog = true
            },
            // 搜索
            handlerSearch(){
                this._getComTables()
            },
            // 重置
            handlerReset(){
                this.queryObj.moduleCode = ''
                this.queryObj.componentName = ''
                this._getComTables()
            }
        }
    }
</script>

