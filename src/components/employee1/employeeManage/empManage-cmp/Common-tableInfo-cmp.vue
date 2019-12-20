<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面的 table 表格的数据展示
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.setShowColumn-dialog
    .el-dialog__body
        padding 0 !important 
>>>.el-table__empty-block
    min-height 180px !important        
.commonTableInfoBox_emp
    min-height 100px
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

    >>>.el-table__body-wrapper
        min-height 100px

</style>
<template>
    <div class="commonTableInfoBox_emp" v-loading="loading">
        <!-- <el-button @click="change">测试按钮</el-button> -->
        <!-- queryObj: {{queryObj}} -->
        <!-- tableHead: {{tableHead}} -->
        <!-- propTableData: {{propTableData}} -->
        <!-- strSearchJson: {{strSearchJson}} -->
        <!-- tableDataCopy: {{tableDataCopy}} -->
        <!-- ----------- -->
        <!-- customerTaleData: {{customerTaleData}}
        -----------
        customerTableHeadData: {{customerTableHeadData}} -->
        <!--自定义表头列弹框----start-->
        <div class="setShowColumnBox" v-if="showSetColumnDailog">
            <el-dialog
                title="设置显示列"
                width="70%"
                append-to-body
                :visible.sync="showSetColumnDailog"
                :close-on-click-modal="false"
                custom-class="setShowColumn-dialog"
            >
                <!---引入设置自定义显示列组件--start-->
                <show-column-cmp 
                    ref="showColumnCmp"
                    :obj="tableDataCopy"
                    :propLeftTableData="customerTableHeadData"
                    :propCheckboxGroup="customerTaleData"
                    @saveSuccess="saveSuccess"
                    @cancelSuccess="cancelSuccess"
                >
                </show-column-cmp>  
                <!--引入设置自定义显示列组件--end-->              
            </el-dialog>
        </div>
        <!--自定义表头列弹框----end-->


        <!---设置自定义表头列btn--start-->
        <div class="setShowColumnBtn clearfix">
            <span class="lt marginB10" @click="handleSetShowColumn">
                <el-tooltip content="设置表头列">
                    <i class="el-icon-setting"></i>
                </el-tooltip>
            </span>
        </div>
        <!---设置自定义表头列btn--end-->

        <!-------table表格区------start---->
        <div :class="['table', tableData.length<=0? 'not_found':'']">
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                max-height="600"
                class="tb-edit"
                border
                empty-text=' '
                style="width: 100%">

                <el-table-column
                    v-if="customerTableHeadData.length>0"
                    type="selection"
                    width="50"
                    fixed
                >
                </el-table-column>

                <el-table-column  
                    v-for="(item,key) in customerTableHeadData" 
                    :key="key"
                    :label="item.label" 
                    :property="item.property"
                    width="180"
                    sortable
                    :fixed="item.Lock===1"
                    >

                    <template slot-scope="scope">
                        
                        <!---入职日期、证件失效日期--->
                        <span
                            v-if="scope.column.property === 'PEntrydate' || 
                            scope.column.property === 'PMainIDEndDate'"
                        >
                            {{ scope.row[scope.column.property] | replaceTime }}
                        </span>
                        <span v-else>
                            <!-- scope.row: {{scope.row}} -->
                            <!-- scope.column: {{scope.column}} -->
                            {{scope.row[scope.column.property]}}
                        </span>
                        <!-- <span>---scope.row:{{scope.row}}</span> -->
                        <!-- <span>scope.column:{{scope.column}}</span> -->
                    </template>
                </el-table-column>

                <el-table-column 
                    v-if="customerTableHeadData.length>0"
                    label="操作"
                    width="150"
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
                        <emp-detailInfo-cmp ref="empDetailInfoCmp" :empObj="currentRowEmpObj"></emp-detailInfo-cmp>
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
    import ShowColumnCmp from './SetShowColumn-cmp'
    // import { PaEmployeeManageMixin } from '@/utils/PA-mixins'
    import { mapGetters } from 'vuex'
    import { REQ_OK } from '@/api/config'
    import {
        getViewCol,
        saveViewCol,
        getTableEmplist,
        deleteEmp
    } from '@/api/employee'
    // 表头1
    let example1=[
        {
            label: '工号',
            property: 'empNo'
        },
        {
            label:'姓名',
            property: 'empName'
        },
        {
            label:'地址',
            property:'address'
        }
    ]

    // 表头2
    let example2=[
        {
            label: '工号',
            property: 'empNo'
        },
        {
            label:'姓名',
            property: 'empName'
        },        
        {
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
            EmpDetailInfoCmp,
            ShowColumnCmp
        },
        props: {
            tableHeadProp: {
                type: Array,
                default: () => {
                    return example1
                }
            },
            propTableData: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        computed: {
            // 所有的数据
            tableDataCopy(){
                debugger
                return this.propTableData
            },
            ...mapGetters(['currentPageCode']),
            // 自定义的数据
            customerTableHeadData(){
                debugger
                let tableHead = []
                if(this.customerTaleData.length){
                    // 如果 自定义设置中有数据则表格取自定义的
                    this.customerTaleData.forEach((item, i) => {
                        tableHead.push({
                            label: item.FieldName,
                            property: item.FieldCode,
                            Lock: item.Lock,
                            Hidden: item.Hidden,
                            SortId: item.SortId
                        })
                    })
                }else {
                    //反之，取 总数据
                    if(this.tableDataCopy.Fields && this.tableDataCopy.Fields.length ){
                        this.tableDataCopy.Fields.forEach((item, i) => {
                            tableHead.push({
                                label: item.FieldName,
                                property: item.FieldCode,
                                Lock: item.Lock,
                                Hidden: item.Hidden,
                                SortId: item.SortId                                                           
                            })
                        })
                    }
                }
                return tableHead
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
            },
            'propTableData.TableCode': {
                // tableCode 变化后 会触发调取 table的数据
                handler(newVal, oldVal){
                    if(newVal){
                        debugger
                        this._getCustomerSetData().then(() => {
                            // 表格数据获取完成后 需要获取table表格员工数据
                            this._getPaEmployeeTable()
                        })
                    }
                }
            }
        },
        data() {
            return {
                loading: false, 
                tableLoading: false, // loading的状态
                version: 0, // 版本 0 普通版本 1 高级版本
                queryObj: {
                    // 每页的条数
                    pageSize: 10,
                    // 页码
                    pageIndex: 1,
                    // 总共的条数
                    total: 10
                }, 
                lockIndexArr: [],  // 表头锁定的序列数组
                hiddenIndexArr: [], // 表头隐藏的序列数组
                customerTaleData:[],  // 获取的自定义表格的内容数据           
                // 表头
                tableHead: this.tableHeadProp,
                // 数据值
                // tableData: [{
                //     empNo: '100010',
                //     empName: '张山',
                //     date: '2016-05-02',
                //     address: '武汉洪山区华中科技大学'
                // }, {
                //     empNo: '100010',
                //     empName: '李四',                    
                //     date: '2016-05-04',
                //     address: '武汉洪山区华中科技大学'
                // }, 
                // {
                //     date: '2016-05-03',
                //     empNo: '888888',
                //     empName: '小明',   
                //     address: '武汉洪山区华中科技大学'
                // }],
                tableData: [
                    // {
                    //     EmpNo: '2001',
                    //     PCHName: '张三',
                    //     PENName: 'zhangsan',
                    //     PGender: '男',
                    //     PEEType: '员工类型-经理',
                    //     PEEStatus: '员工状态-在职',  
                    //     PEntrydate: '入职日期：2019-06-06',
                    //     PStaffQuota: '编制：编制内',
                    //     PMainIDType: '身份证',
                    //     PMainIDNo: '420522198905021245',
                    //     PMainIDEndDate: '2028-09-08',
                    //     PEESeq: '员工排序号-9',
                    //     POrg: '组织-234',
                    //     PPosCode: '职位-产品经理',
                    //     PJobClass: '职务层级-高管',
                    //     PJobGrade: '职级-高级',
                    //     // SortId: 5,
                    //     // Lock: 1,
                    //     // Hidden: 0
                    // },
                    // {
                    //     EmpNo: '2002',
                    //     PCHName: '王五',
                    //     PENName: 'wangwu',
                    //     PGender: '女',
                    //     PEEType: '员工类型-经理',
                    //     PEEStatus: '员工状态-在职',  
                    //     PEntrydate: '入职日期：2019-06-06',
                    //     PStaffQuota: '编制：编制内',
                    //     PMainIDType: '身份证',
                    //     PMainIDNo: '420522198905021245',
                    //     PMainIDEndDate: '2028-09-08',
                    //     PEESeq: '员工排序号-9',
                    //     POrg: '组织-234',
                    //     PPosCode: '职位-产品经理',
                    //     PJobClass: '职务层级-高管',
                    //     PJobGrade: '职级-高级',                        
                    // }
                ],
                showEmpDetailInfo: false,  // 控制 员工详情弹框的显示/隐藏
                showSetColumnDailog: false, // 控制 显示列设置弹框的显示/隐藏
                strSearchJson: {
                    empNo: '',
                    empName: '',
                    Org: '',
                    Pos:'',
                    empType: '',
                    empStatus: ''
                }, // 查询条件的字符串
                currentRowEmpObj: {},  // 点击的当前row 中的对象信息
            }
        },
        created(){
            this.$nextTick(() => {
                this.$bus.$on("emitSearchToolsResult", (searchObj) => {
                    // 搜索组件触发的
                    debugger
                    this.strSearchJson = searchObj
                })

                this.$bus.$on("searchEmpNo", (searchEmpNo) => {
                    // 搜索框中输入有员工工号此时需要合并 工号
                    this.strSearchJson.empNo = searchEmpNo
                })

                this.$bus.$on("emitCloseEmpInfoDialog", async () => {
                    debugger                    
                    // 重新获取自定义的数据
                    await this._getCustomerSetData()
                    // 获取 table中员工数据
                    this._getPaEmployeeTable()
                    // 关闭员工详情弹框  
                    this._closeEmpInfoDialog()
                })
            })
        },
        beforeDestroy(){
            this.$bus.$off("emitSearchToolsResult")
            this.$bus.$off("searchEmpNo")
            this.$bus.$off("emitCloseEmpInfoDialog")
        },
        methods: {   
            // 给 customerTableHeadData 分别添加一个 是否锁定和 隐藏的标识
            addLockAndHiddenAttr(){

            },
            // 关闭 员工详情的弹框
            _closeEmpInfoDialog(){
                this.showEmpDetailInfo = false
            },
            // 处理自定义数据中的Lock（锁定） 返回需要锁定的 index序列 数组
            _handlerLockData(customerTaleData){
                if( customerTaleData.length ){
                    customerTaleData.forEach((item, key) => {
                        if(item.Lock === 1){
                            // 需要锁定
                            this.lockIndexArr.push(key)
                        }
                        if(item.Hidden === 1){
                            // 需要隐藏
                            this.hiddenIndexArr.push(key)
                        }
                    })
                }
            },      
            // 获取自定义配置的数据(table表头的数据)
            _getCustomerSetData(){
                debugger
                this.tableLoading = true
                return new Promise((resolve, reject) => {
                    getViewCol(this.currentPageCode, this.tableDataCopy.TableCode).then(res => {
                        this.tableLoading = false
                        if(res && res.data.State === REQ_OK){
                            // 表头数据
                            this.customerTaleData = res.data.Data
                        }else {
                            this.$message({
                                type: 'error',
                                message: `获取自定义配置数据失败，${res.data.Error}`
                            })
                        }
                        resolve()
                    }).catch(() => {
                        this.$message.info("获取自定义配置数据出错")
                    })   
                })
            },            
            // 获取table表格每页的数据
            _getPaEmployeeTable(){
                debugger
                this.tableLoading = true
                getTableEmplist(this.tableDataCopy.TableCode,JSON.stringify(this.strSearchJson),this.queryObj.pageIndex,this.queryObj.pageSize).then(res => {
                    debugger
                    this.tableLoading = false
                    if(res && res.State === REQ_OK ){
                        debugger
                            // 表内容数据
                            this.tableData = res.Data
                            this.queryObj.total = res.DataCount
                            console.log("获取的table表格的员工数据--------", this.tableData)
                            //需要清空 strSearchJson
                            Object.assign(this.strSearchJson, {
                                empNo: '',
                                empName: '',
                                Org: '',
                                Pos:'',
                                empType: '',
                                empStatus: ''                        
                            })
                            // 触发父组件 
                            this.$emit("emitGetEmpSuccess")
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取员工数据失败,${res.Error}`
                        })                        
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取员工数据出错'
                    })
                }) 
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
            // 关闭 员工详情弹框
            closeEmpDetailDailog() {
                debugger
                this.showEmpDetailInfo = false
            },
            // 查看
            handleScan(index, row) {
                debugger
                console.log(index, row)
                this.currentRowEmpObj = row
                // 开启员工详情的弹框
                this.showEmpDetailInfo = true
            },
            _deleteEmp(){
                deleteEmp(this.currentRowEmpObj.EmpId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("删除成功")
                        // 重新获取员工
                        this._getPaEmployeeTable()
                    }else {
                        this.$message({
                            type: 'error',
                            message: `删除失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '删除员工出错'
                    })
                })
            },
            // 删除员工
            handleDelete(index, row) {
                console.log(index, row)
                this.$confirm("确定要删除此员工吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this._deleteEmp()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            // 添加列
            change(){
                this.tableHead = example2;
            },
            // 设置列显示
            handleSetShowColumn(){
                debugger
                this.showSetColumnDailog = true
            },
            // 设置列保存成功
            async saveSuccess(data){
                debugger
                saveViewCol(this.currentPageCode, this.tableDataCopy.TableCode, JSON.stringify(data)).then(async (res) => {
                    debugger
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("保存成功")
                        // 重新获取自定义的数据
                        await this._getCustomerSetData()
                        // 获取 table中员工数据
                        this._getPaEmployeeTable()
                        // 关闭 弹框
                        this.showSetColumnDailog = false                        
                    }else {
                        this.$message({
                            type: 'error',
                            message: `保存失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '保存数据出错'
                    })
                })                
            },
            // 设置列取消成功
            cancelSuccess() {
                this.showSetColumnDailog = false
            }
        }
    }
</script>
