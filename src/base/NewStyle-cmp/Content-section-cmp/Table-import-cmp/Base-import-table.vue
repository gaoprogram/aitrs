<!--
  User: gaol
  Date: 2019/5/14
  功能：commonTable 组件区 (输入表) 
-->
<template>
    <el-row class="commonTable">
        ++++++---------comsData: {{comsData}}---------+++++++
        <el-col :span="columnNum">   
            commonTable 组件区 (输入表) 
            <!-------table表格区------start---->
            <div 
                v-for="(tableObj, key) in comsData"
                :key="key"
            >            
                <div :class="['table', tableData.length <=0 ? 'not_found':'']">
                    <el-table
                        v-loading="tableLoading"
                        :data="tableData"
                        max-height="350"
                        class="tb-edit"
                        border
                        empty-text=' '
                        style="width: 100%"
                        @selection-change="handleSelectionChange">

                        <el-table-column
                            v-if="tableHeadData.length>0"
                            type="selection"
                            width="50"
                            fixed
                        >
                        </el-table-column>

                        <el-table-column  
                            v-for="(item,key) in tableHeadData" 
                            :key="key"
                            :label="item.label" 
                            :property="item.property"
                            width="180"
                            sortable
                            :fixed="item.Lock===1"
                            >

                            <template slot-scope="scope">
                                <!-- scope.row: {{scope.row}} -->
                                <!-- scope.row[scope.column.property]:{{scope.row[scope.column.property]}} -->
                                <!-- scope.column: {{scope.column}} -->
                                <div>
                                    <div 
                                        v-if="$isArray(scope.row[scope.column.property])"
                                    >
                                        <p 
                                            v-for="(colItem, key) in scope.row[scope.column.property]"  
                                            :key="key"
                                        >
                                            {{colItem}}
                                        </p>
                                    </div>
                                    <div v-else>
                                        {{scope.row[scope.column.property]}}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column 
                            v-if="tableHeadData.length>0"
                            label="操作"
                            fixed="right">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click.native="handleScan(scope.$index, scope.row)"
                                    v-for="(btnItem, index) in tableObj.Buttons"
                                    :key="index"
                                >
                                    {{btnItem.RalateName}}
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页部分--start--->
                    <div class="pagination-container">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="queryObj.pageIndex"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="queryObj.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="queryObj.total">
                        </el-pagination>
                    </div>
                    <!---分页部分--end--->   
                </div> 
            </div>
            <!-------table表格区------end---->            
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
import {
    REQ_OK
} from '@/api/config.js'
import { 
    GetComponentData
} from '@/api/newStyle.js'
  // 底部保存组件
  export default {
    props: {
        columnNum: {
            type: [String, Number],
            default: () => {
                return 24
            }
        },
        // 该table组件的数据
        comsData: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {
        SaveFooter
    },
    data(){
        return {
            tableLoading: false,
            data_table: [],
            tableHeadData: [
                {
                    label: '姓名',
                    property: 'empName',
                },
                {
                    label: '工号',
                    property: 'empNo'
                }                               
            ],
            tableData: [
                {
                    empName: '张三',
                    empNo: '1000',
                    Lock: 1,
                },
                {
                    empName: '李四',
                    empNo: '2000',
                    Lock: 0,
                },
                {
                    empName: '王五',
                    empNo: [ 8000, 9000, 10000 ],
                    Lock: 0,
                },                                
            ],  
            multipleSelection: [],
            queryObj: {
                pageSize: 10,
                pageIndex: 1,
                total: 0
            }
        }
    },
    created(){
        // const { CombineType, MetaCode } = this.comData 
        // this._GetComponentData(CombineType, MetaCode)
    },
    methods: {
        // 获取表数据
        _GetComponentData(Type, ComponentCode, ModuleCode){
            this.tableLoading = true
            GetComponentData(Type, ComponentCode, ModuleCode).then(res => {
                this.tableLoading = false
                if(res && res.data.State === REQ_OK){
                    debugger
                    this.data_table = res.data.Data
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取表数据失败,${res.data.Error}`
                    })
                }
            })
        },
        // 全选/取消全选
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        // 分页--一页展示多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getPaEmployeeTable()
        },
        // 分页--上一页，下一页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            this._getPaEmployeeTable()
        },  
        // 查看
        handleScan(index, row) {
            debugger
            console.log(index, row)
        },   
        isArray(data){
            return Object.prototype.toString.apply(data) === '[object Array]'? true: false 
        }            
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
