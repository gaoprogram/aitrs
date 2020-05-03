<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  显示数据组件 【企业】 【已废弃】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
        <div class="item">
            <span class="roleTit">用户名:</span>
            <span class="roleValue">{{obj.UserName}}</span>
        </div>      
        <div class="item">
            <span class="roleTit">用户号:</span>
            <span class="roleValue">{{obj.UserId}}</span>
        </div>     

        <div class="searchBox u-f-ac marginT10">
            <!-- moduleOptions: {{moduleOptions}} -->
            <div class="u-f-ac">
                <div>
                    <span>模块</span>
                    <el-select 
                        style="width: 150px"
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
                max-height="500"
                empty-text=" "
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="模块"
                    prop="ModuleName"
                >

                </el-table-column>

                <el-table-column
                    label="组件"
                    prop="ComponentCode"
                >
                
                </el-table-column>   

                <el-table-column
                    label="组件名"
                    prop="ComponentName"
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
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
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
            strFlag: {
                type: String,
                default: 'roleInfo'
            }
        },
        data(){
            return {
                loading: false, 
                total: 0,
                multipleSelection: [],
                tableData: [],
                moduleOptions: [],  // 模块下拉源数据
                queryObj: {
                    roleId: '',
                    userCode: this.obj.UserId, 
                    moduleCode: '',
                    componentName: '',
                    pageSize: 10,
                    pageNum: 1
                }
            }
        },
        computed: {

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
                this.queryObj.userCode = this.obj.UserId
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
                this.currentRowObj = row
            },
            // 查看
            handlerScan(row){
                this.currentRowObj = row
            },
            // 搜索
            handlerSearch(){
                this._getComTables()
            }
        }
    }
</script>

