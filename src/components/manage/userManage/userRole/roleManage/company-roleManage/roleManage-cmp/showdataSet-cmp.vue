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
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="已授权"
                    prop="Unable"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.Unable">
                            是
                        </span>
                        <span v-else>
                            否
                        </span>                        
                    </template>
                </el-table-column>

                <el-table-column
                    label="可编辑"
                    prop="Edit"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.Edit">
                            是
                        </span>
                        <span v-else>
                            否
                        </span>                        
                    </template>                
                </el-table-column>   

                <el-table-column
                    label="显示"
                    prop="Show"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.Show">
                            是
                        </span>
                        <span v-else>
                            否
                        </span>                        
                    </template>                 
                </el-table-column>  

                <el-table-column
                    label="加密"
                    prop="Encrypt"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.Encrypt">
                            是
                        </span>
                        <span v-else>
                            否
                        </span>                        
                    </template>  
                </el-table-column>     

                <el-table-column
                    label="分组/表"
                    prop="RefCode"
                >
                
                </el-table-column>

                <el-table-column
                    label="自定义字段名"
                    prop="FieldName"
                >
                
                </el-table-column>   

                <el-table-column
                    label="系统字段名"
                    prop="SysName"
                >
                
                </el-table-column>       

                <el-table-column
                    label="描述"
                    prop="Description"
                    show-overflow-tooltip
                >
                
                </el-table-column>                                                                         

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button 
                            type="text" 
                            size="mini"
                            @click.native="handlerEdit(scope.row)">
                            编辑
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
                :total="queryObj.total">
            </el-pagination>            
        </div>   
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import { 
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
        },
        components: {

        },
        data(){
            return {
                loading: false, 
                tableData: [],
                queryObj: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        computed: {

        },
        created(){
           this._getComTables()
        },
        methods: {
            _getComTables(){
                this._GetFieldSets()
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
                GetFieldSets(this.obj.ComponentCode,this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
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
            _SaveFieldSets(){
                this.loading = true
                SaveFieldSets().then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.loading = false
                        this.$message.success("数据保存成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`保存数据失败,${res.data.Error}`)
                    }
                })
            },
            // 编辑
            handlerEdit(row){

            },
        }
    }
</script>

