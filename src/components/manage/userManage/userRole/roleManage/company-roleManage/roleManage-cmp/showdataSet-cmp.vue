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
    <div class="showDataSetCmp animated fadeIn">
     
        <!-- tableData: {{tableData}} -->
        <div 
            class="tableBox marginT10"
            :class="!tableData.length? 'not_found':''">
            <el-table
                border
                :data="tableData"
                v-loading="loading"
                max-height="450"
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
        data(){
            return {
                loading: false, 
                tableData: [],
            }
        },
        computed: {

        },
        created(){
           
        },
        methods: {
            _getComTables(){

            },
        }
    }
</script>

