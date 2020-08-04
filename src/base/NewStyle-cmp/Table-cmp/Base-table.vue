<!--
  User: gaol
  Date: 2020/7/31
  功能：表 通用 组件  controlType 为
-->

<template>
    <div class="table-cmp-wrap">
        通用表组件
        <!----表组件部分------>
        <el-row>
            <!-- <div
                v-if="comsData.tableContentData.length>0"
                v-for="(com, key) in comsData.tableContentData"
                :key="key"
            > -->
                <el-col :span="24">
                    <!-------table表格区------start---->
                    <div :class="['table', comsData.tableContentData.length<=0? 'not_found':'']">
                        <el-table
                            v-loading="tableLoading"
                            :data="comsData.tableContentData"
                            max-height="350"
                            class="tb-edit"
                            border
                            empty-text=' '
                            style="width: 100%"
                            @selection-change="handleSelectionChange">

                            <el-table-column
                                v-if="comsData.tableHeadData.length>0"
                                type="selection"
                                width="50"
                                fixed
                            >
                            </el-table-column>

                            <el-table-column  
                                v-for="(item,key) in comsData.tableHeadData" 
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
                                    <!---入职日期、证件失效日期、生效日期、
                                        失效日期、出生日期、离职日期、离职申请日、工资结算日、
                                        合同解除日、奖金结算日
                                        --->
                                    <span
                                        v-if="scope.column.property === 'PEntrydate' || 
                                        scope.column.property === 'PMainIDEndDate' ||
                                        scope.column.property === 'PFMEffectDate' ||
                                        scope.column.property === 'PFMExpireDate' ||
                                        scope.column.property === 'PFMIDExpireDate' ||
                                        scope.column.property === 'PFMBirthDate' ||
                                        scope.column.property === 'PSeparDate' ||
                                        scope.column.property === 'PSeparApplyDate' ||
                                        scope.column.property === 'PlastSalarydate' ||
                                        scope.column.property === 'PContraTermDate' ||
                                        scope.column.property === 'PlastBonusdate'"
                                    >
                                        {{ scope.row[scope.column.property] | replaceTime }}
                                    </span>
                                    <span v-else>
                                        <!---证件照片和员工照片和 合同附件--->
                                        <span 
                                            v-if="scope.column.property === 'PEEPhoto' ||
                                            scope.column.property === 'PIDPhoto' ||
                                            scope.column.property === 'CTLaAATT'"
                                        >
                                            <template v-if="scope.row[scope.column.property].length">
                                                <span>
                                                {{scope.row[scope.column.property][0].Name}}
                                                </span>
                                            </template>
                                        </span>
                                        <span v-else>
                                            <!--中文名字列--->
                                            <el-button 
                                                v-if="scope.column.property === 'PCHName'"
                                                type="text"
                                                @click.native="handleScan(scope.$index, scope.row)"
                                            >
                                                {{scope.row[scope.column.property]}}
                                            </el-button>
                                            <span v-else>
                                                <!--是否有无商业保险--->
                                                <!-- <span v-if="scope.column.property === 'PFMComInsur'">
                                                    <span v-if="scope.row[scope.column.property] == 1">
                                                        有
                                                    </span>
                                                    <span v-if="scope.row[scope.column.property] == 0">
                                                        有
                                                    </span>                                        
                                                </span>
                                                <span v-else>
                                                    {{scope.row[scope.column.property]}}
                                                </span> -->
                                                <span>{{scope.row[scope.column.property]}}</span>
                                            </span>
                                        </span>
                                    </span>
                                    <!-- <span>---scope.row:{{scope.row}}</span> -->
                                    <!-- <span>scope.column:{{scope.column}}</span> -->
                                </template>
                            </el-table-column>

                            <el-table-column 
                                v-if="comsData.tableHeadData.length>0"
                                label="操作"
                                fixed="right">
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="mini"
                                        @click.native="handleScan(scope.$index, scope.row)"
                                    >查看</el-button>
                                    <!-- <el-button
                                        size="mini"
                                        type="text"
                                        @click.native="handleDelete(scope.$index, scope.row)"
                                    >删除</el-button> -->
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
                    <!-------table表格区------end---->                    
                </el-col>
            <!-- </div> -->
        </el-row>



        <div class="dialogScan" v-if="showDailogScan">
            <el-dialog
                title="表详情"
                :fullscreen="true"
                :append-to-body="true"
                :close-on-click-modal="false"
                :visible="showDailogScan"
            >
                详情页面
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
  } from '@/api/config'
//   import { componentsControlTypeMixin } from '@/utils/newStyleMixins-com.js'
//   import { fieldGroupControlTypeMixin } from '@/utils/newStyleMixins-fields.js'
  export default {
    // mixins: [ componentsControlTypeMixin, fieldGroupControlTypeMixin ],
    components: {
    },
    props: {
        pageCode: {
            type: String,
            default: ''
        },
        authrityObj: {
            type: Array,
            default: () => {
                return []
            }
        },
        comsData: {
            tableHeadData: {
                type: Array,
                default: () => {
                    return [
                        {
                            label: "公司",
                            property: "company",
                            Lock: false,
                            Hidden: false,
                            SortId: 1                         
                        },
                        {
                            label: "员工姓名",
                            property: "empName",
                            Lock: false,
                            Hidden: false,
                            SortId: 1                         
                        },
                        {
                            label: "员工号",
                            property: "empNo",
                            Lock: false,
                            Hidden: false,
                            SortId: 1                         
                        },                                        
                    ]
                }
            },
            tableContentData: {
                type: Array,
                default: () => {
                    return [
                        {
                            label: "中国移动",
                            property: "company",
                            Lock: false,
                            Hidden: false,
                            SortId: 1                         
                        },
                        {
                            label: "张三",
                            property: "empName",
                            Lock: false,
                            Hidden: false,
                            SortId: 1                         
                        },
                        {
                            label: "0001",
                            property: "empNo",
                            Lock: false,
                            Hidden: false,
                            SortId: 1                         
                        },  
                    ]
                }
            }    
        }
    },
    computed: {

    },
    data () {
        return {
            tableLoading: false,
            showDailogScan: false,
            multipleSelection: [], // 全选的数据
            queryObj: {
                // 每页的条数
                pageSize: 10,
                // 页码
                pageIndex: 1,
                // 总共的条数
                total: 10
            },         
        }
    },
    created () {
        this._getTableContentData()
    },
    beforeDestroy () {
      // 销毁
    },
    methods: {
        _getTableContentData(){

        },
        // 全选/取消全选
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        // 分页--一页展示多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getTableContentData()
        },
        // 分页--上一页，下一页
        handleCurrentChange (val) {
            this.queryObj.pageIndex = val
            this._getTableContentData()
        }, 
        // 表格里面的 查看按钮
        handleScan(){
           this.showDailogScan = true 
        }         
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
