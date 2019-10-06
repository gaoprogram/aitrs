<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面的 [银行信息] table 表格的数据展示
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.commonTableInfoBox
    min-height 300px
    max-height 500px
    overflow auto
    .empDetailDailogBox
        .empDetailbox-card
            // max-height calc(100vh - 200px)
            >>>.el-card__body
                // height calc(100vh - 200px)
                box-sizing border-box
                .empDetailInfoBox
                    height 100%
                    overflow auto

</style>
<template>
    <div class="commonTableInfoBox">
        <el-button @click="change">测试按钮</el-button>
        tableHead: {{tableHead}}
        <el-table
            :data="tableData"
            class="tb-edit"
            border
            style="width: 100%">

            <el-table-column
                type="selection"
                width="50"
                fixed
            >
            </el-table-column>
      
            <el-table-column  
                v-for="(item,key) in tableHead" 
                :key="key"
                :label="item.label" 
                :property="item.property"
                width="180"
                >

                <template slot-scope="scope">
                    <!-- scope: {{scope}} -->
                    <span>{{scope.row[scope.column.property]}}</span>
                    <!-- <span>scope:{{scope.row}}</span>
                    <span>scope:{{scope.column}}</span> -->
                </template>
            </el-table-column>

            <el-table-column 
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <el-button
                            type="text"
                            size="mini"
                            @click="handleScan(scope.$index, scope.row)">查看</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页部分--start--->
        <div class="pagination-container">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>
        </div>
        <!---分页部分--end--->        

        <!--员工详情dailog区域---start-->
        <div class="empDetailDailogBox" v-if="showEmpDetailInfo">
            <el-dialog 
                title="员工详情"
                :visible.sync="showEmpDetailInfo"
                fullscreen
                append-to-body
                :before-close="closeEmpDetailDailog"
                destroy-on-close
            >
                <el-card  class="empDetailbox-card">
                    <div class="empDetailInfoBox">
                        <emp-detailInfo-cmp ref="empDetailInfoCmp" ></emp-detailInfo-cmp>
                    </div>
                </el-card>

            </el-dialog>
        </div>
        <!--员工详情dailog区域---end-->
    </div>
</template>

<script>
    // import {example1, example2} from './columns';
    import EmpDetailInfoCmp from './EmpDetailInfo-cmp'
    // import { PaEmployeeManageMixin } from '@/utils/PA-mixins'
    // 表头1
    let example1=[
        {
            label:'姓名',
            property:'name'
        },{
            label:'地址',
            property:'address'
        }
    ]

    // 表头2
    let example2=[
        {
            label:'姓名',
            property:'name'
        },{
            label:'地址',
            property:'address'
        },{
            label:'日期',
            property:'date'
        }
    ]
 

    export default {
        name:'commonTableInfo',
        components: {
            EmpDetailInfoCmp
        },
        props: {
            tableHeadProp: {
                type: Array,
                default: () => {
                    return example1
                }
            }
        },
        watch: {
            tableHead: {
                handler(newVal, oldVal){
                    this.$message({
                        type: 'scucess',
                        message: 'tableHead已改变'
                    })
                }
            }
        },
        data() {
            return {
                queryObj: {
                    // 每页的条数
                    pageSize: 10,
                    // 页码
                    pageNum: 1,
                    // 总共的条数
                    total: 999999
                },                
                // 表头
                tableHead: this.tableHeadProp,
                // 数据值
                tableData: [{
                    date: '2016-05-02',
                    name: '张三',
                    address: '武汉洪山区华中科技大学'
                }, {
                    date: '2016-05-04',
                    name: '李四',
                    address: '武汉洪山区华中科技大学'
                }, 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },                                                                                 
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // },
                // {
                //     date: '2016-05-01',
                //     name: '王五',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                {
                    date: '2016-05-03',
                    name: '小明',
                    address: '武汉洪山区华中科技大学'
                }],
                showEmpDetailInfo: false,  // 控制 员工详情弹框的显示/隐藏
            }
        },
        methods: {   
            // 获取table表格每页的数据
            _getPaEmployeeTable(){
               
            }, 
            // 分页--一页展示多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getPaEmployeeTable()
            },
            // 分页--上一页，下一页
            handleCurrentChange (val) {
                this.queryObj.pageNum = val
                this._getPaEmployeeTable()
            },                    
            // 关闭 员工详情弹框
            closeEmpDetailDailog() {
                debugger
                this.showEmpDetailInfo = false
            },
            handleScan(index, row) {
                debugger
                console.log(index, row)
                // 开启员工详情的弹框
                this.showEmpDetailInfo = true
                // 跳转路由至 员工详情页面

                // this.$router.push({
                //     path:'/employee/employeeManage/empDetailInfo',
                //     query: {
                //         id: "dfjkdfjkdfj"
                //     }
                // })
            },
            handleDelete(index, row) {
                console.log(index, row)
                this.$confirm("确定要删除此员工吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    // 
                }).catch(() => {
                    
                })
            },
            change(){
                // this.tableHead = example2;
            }
        }
    }
</script>
