<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——许可权-许可权  许可权配置组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.rightsSetCmp
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
    <div class="rightsSetCmp">
        <!-- obj:{{obj}} -->
      <div class="searchBox u-f-ac marginT10">
          <!-- moduleOptions: {{moduleOptions}} -->
          <div class="u-f-ac">
              <div class="marginL10">
                  <!-- <span>菜单、组件</span> -->
                  <el-input
                      v-model="queryObj.Name"
                      clearable
                      placeholder="菜单、组件"
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
      </div> 


        <!-- tableData: {{tableData}} -->
        <div 
            class="tableBox marginT10" 
            :class="!tableData.length? 'not_found':''">
            <div class="btnBox marginB10" style="text-align: right">
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
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="模块code"
                    prop="ModuleCode"
                >

                </el-table-column>

                <el-table-column
                    label="模块名"
                    prop="ModuleName"
                >

                </el-table-column>                

                <el-table-column
                    label="菜单"
                    prop="Title"
                >
                
                </el-table-column>   

                <el-table-column
                    label="组件"
                    prop="ComponentName"
                >
                
                </el-table-column>  

                <!-- <el-table-column
                    label="企业权限组件id"
                    prop="PermissionPageComponentId"
                >
                
                </el-table-column>  -->

                <el-table-column
                    label="许可权code"
                    prop="PermissionPackageCode"
                >
                
                </el-table-column> 

                <el-table-column
                    label="项类型"
                    prop="PermissionType"
                >
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.PermissionType}}
                        </span>
                    </template>
                </el-table-column>                       

                <el-table-column
                    label="权限名称"
                    prop="PermissionName"
                >

                </el-table-column>                       

                <el-table-column
                    label="权限编号"
                    prop="PermissionId"
                >

                </el-table-column>

                <el-table-column
                    label="描述"
                    prop="Description"
                >
                
                </el-table-column>                        
                           
                <el-table-column
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

        <!---查看弹框--start-->
        <div class="copyBox" v-if="showScanDialog">
            <el-dialog
                title="复制许可权"
                width="30%"
                :visible.sync="showScanDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-permit-cmp></add-permit-cmp>
            </el-dialog>
        </div>
        <!---查看弹框---end-->        

    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import DataSafetyCmp from './dataSafety-cmp'
    // import AddPermitCmp from './addPermit-cmp'
    import AddPermissionCmp from './addPermission-cmp'
    import { 
        getCompPermitPSet,
        SetComPermitPState,
        CopyComPermitP,
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
            }
        },
        components: {
            DataSafetyCmp,
            // AddPermitCmp
            AddPermissionCmp
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
                queryObj: {
                    Name: '',
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        created(){
            debugger
            this.$nextTick(() => {
                this._getComTables()
            })
        },
        computed: {

        },
        methods: {
            _getComTables(){
                this._getCompPermitPSet()
            }, 
            _getCompPermitPSet(){
                this.loading = true
                getCompPermitPSet(this.obj.PermissionPackageCode, this.queryObj.Name, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.queryObj.total = res.data.Total
                    }else {
                        this.$message.error(`获取权限列表数据失败,${res.data.Error}`)
                    }
                })
            },             
            _BatchDelComPermissionPackageConfig(data){
                this.loading = true
                BatchDelComPermissionPackageConfig(this.currentRowObj.PermissionPackageCode, JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("安全组删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除安全组失败,${res.data.Error}`)
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
                this.queryObj.pageNum = 1
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
                this.currentRowObj = row
                this.$confirm("确定要删除此安全组吗？","提示",{
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
                    this.$confirm("确定要批量移除许可权限吗？","提示",{
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
            }
        }
    }
</script>

