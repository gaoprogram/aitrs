<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工、待入职员工、离职员工页面的 table 表格的数据展示
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.setShowColumn-dialog
    .el-dialog__body
        padding 0 !important 
>>>.el-table__empty-block
    min-height 180px !important        
.commonTableInfoBox_emp
    min-height 100px
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
    .contractDetailDailogBox
        .contractDetailbox-card
            // max-height calc(100vh - 200px)
            >>>.el-card__body
                // height calc(100vh - 200px)
                box-sizing border-box
                .contractDetailInfoBox
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
        finalTableHeadData: {{finalTableHeadData}} -->
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
                    :propLeftTableData="finalTableHeadData"
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
        <div 
            class="setShowColumnBtn clearfix"
            v-if="finalTableHeadData.length>0"
        >
            <span class="lt marginB10" @click="handleSetShowColumn">
                <!-- <el-tooltip content="设置表头列"> -->
                    <el-button 
                        size="mini"
                        type="primary" 
                        icon="el-icon-setting"
                    >
                        设置表头列
                    </el-button>                    
                <!-- </el-tooltip> -->
            </span>
            <span 
                class="lt marginL10" 
            >
                <!-- <el-tooltip content="导出"> -->
                    <el-button 
                        :disabled="!multipleSelection.length"
                        @click.native="handlerExport"                    
                        size="mini"
                        type="primary" 
                        icon="el-icon-download"
                    >
                        导出
                    </el-button>
                <!-- </el-tooltip> -->
            </span>
        </div>
        <!---设置自定义表头列btn--end-->

        <!-------table表格区------start---->
        <div :class="['table', tableData.length<=0? 'not_found':'']">
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
                    v-if="finalTableHeadData.length>0"
                    type="selection"
                    width="50"
                    fixed
                >
                </el-table-column>

                <el-table-column  
                    v-for="(item,key) in finalTableHeadData" 
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
                                    v-if="getCurrentPageCodeFlag && scope.column.property === 'PCHName'"
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
                    v-if="getCurrentPageCodeFlag && finalTableHeadData.length>0"
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
                        <keep-alive>
                            <emp-detailInfo-cmp 
                                ref="empDetailInfoCmp" 
                                :empObj="currentRowEmpObj"
                            ></emp-detailInfo-cmp>
                        </keep-alive>
                    </div>
                </el-card>

            </el-dialog>
        </div>
        <!--员工详情dailog区域---end-->

        <!--合同详情dailog区域---start-->
        <div class="contractDetailDailogBox" v-if="showContractDetailInfo">
            <el-dialog 
                title="合同详情"
                :visible.sync="showContractDetailInfo"
                fullscreen
                append-to-body
                :before-close="closeContractDetailDailog"
                destroy-on-close
            >
                <el-card  class="contractDetailbox-card">
                    <div class="contractDetailInfoBox">
                        <contract-detailInfo-cmp 
                            ref="contractDetailInfoCmp" 
                            :empObj="currentRowEmpObj"
                            :empInfo="empInfo"                                 
                        ></contract-detailInfo-cmp>
                    </div>
                </el-card>

            </el-dialog>
        </div>
        <!--合同详情dailog区域---end-->        
    </div>
</template>

<script>
    // import {example1, example2} from './columns';
    import EmpDetailInfoCmp from '@/components/employee/employeeManage/empManage-cmp/EmpDetailInfo-cmp'
    import contractDetailInfoCmp from '@/components/employee/employeeManage/empManage-cmp/ContractManageInfo-cmp'
    import ShowColumnCmp from './SetShowColumn-cmp'
    // import { PaEmployeeManageMixin } from '@/utils/PA-mixins'
    import { mapGetters } from 'vuex'
    import { 
        REQ_OK, 
        BASE_URL,
        PA_PAGECODE_JOINEDEMPLOYEE, 
        PA_PAGECODE_WAITEDEMPLOYEE,
        PA_PAGECODE_LEAVEDEMPLOYEE,
        PA_PAGECODE_CONTRACTMANAGE
    } from '@/api/config'    
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
            contractDetailInfoCmp,
            ShowColumnCmp
        },
        props: {
            tableHeadProp: {
                type: Array,
                default: () => {
                    return example1
                }
            }
        },
        data() {
            return {
                loading: false, 
                tableLoading: false, // loading的状态
                version: 0, // 版本 0 普通版本 1 高级版本
                multipleSelection: [], // 全选的数据
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
                selfTableHead: [], // 自定义的表头数据集合
                totalTableHead: [], // 没有自定义设置表头时的 默认表头数据      
                finalTableHeadData: [], // 最终的 表头数据                             
                customerTaleData:[],  // 获取的自定义表格的内容数据                           
                // 表头
                tableHead: this.tableHeadProp,
                tableDataCopy:{}, // 每个tab 上面携带的所有的表头数据
                tableData: [],
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
                dataRes: {}, 
                
                showContractDetailInfo: false, // 控制合同详情弹框显示/隐藏
            }
        },        
        computed: {
            // 所有的数据
            ...mapGetters([
                'currentPageCode',
                'companyCode',
                'token',
                'isEmpOrContractPage'
            ]),
            getCurrentPageCodeFlag(){
                if(this.currentPageCode!= PA_PAGECODE_WAITEDEMPLOYEE) {
                    // 待入职页面 没有查看详情页面
                    return true
                }else {
                    return false
                }
            },
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
        created(){
            this.$nextTick(() => {
                this.$bus.$on("selectTabitem", (index, itemObj) => {
                    debugger
                    this.dataRes = itemObj  
                    this.tableDataCopy = itemObj         
                    // 动态获取 表头 和 表内容数据
                    this._getCommTables()                                                         
                })                
                this.$bus.$on("emitSearchToolsResult", (searchObj) => {
                    // 搜索组件触发的
                    debugger
                    this.strSearchJson = searchObj
                    // 获取 table中员工数据
                    this._getPaEmployeeTable()                    
                })

                this.$bus.$on("searchEmpNo", (searchEmpNo) => {
                    // 搜索框中输入有员工工号此时需要合并 工号
                    this.strSearchJson.empNo = searchEmpNo
                })

                this.$bus.$on("emitCloseEmpInfoDialog", async () => {
                    debugger                    
                    // 重新获取自定义的数据
                    this._getCustomerSetData().then(res => {
                        if(res && res.length){
                            // 有自定义表头 取自定义表头
                            this._getSelfHeadData()
                        }else {
                            // 没有自定义表头，取 所有的表头
                            this._getTotalHeadData()
                        }
                        // 自定义表头数据获取完成后 需要获取table表格合同数据
                        this._getPaEmployeeTable()                        
                    })
                    // 关闭员工详情弹框  
                    this._closeEmpInfoDialog()
                })
                
                // 接收 empGroupfieldEdit 组件 触发的 busExecuteSucess 事件
                this.$bus.$on("eventBtnSaveSuccess", async () => {
                    // console.log(3333333333333333333333333333)
                    debugger
                    // 重新获取自定义的数据
                    this._getCustomerSetData().then(res => {
                        if(res && res.length){
                            // 有自定义表头 取自定义表头
                            this._getSelfHeadData()
                        }else {
                            // 没有自定义表头，取 所有的表头
                            this._getTotalHeadData()
                        }
                        // 自定义表头数据获取完成后 需要获取table表格合同数据
                        this._getPaEmployeeTable()                        
                    })
                    // 关闭员工详情弹框  
                    this._closeEmpInfoDialog()                    
                })

                // 接收 empGroupfieldEdit 组件 触发的 busExecuteCloseEmpDialog 事件
                this.$bus.$on("busExecuteCloseEmpDialog", () => {
                    debugger
                    // 关闭员工详情弹框  
                    this._closeEmpInfoDialog()                    
                })                
            })
        },
        beforeDestroy(){
            this.$bus.$off("selectTabitem")
            this.$bus.$off("emitSearchToolsResult")
            this.$bus.$off("searchEmpNo")
            this.$bus.$off("emitCloseEmpInfoDialog")
            this.$bus.$off("eventBtnSaveSuccess")
            this.$bus.$off("busExecuteCloseEmpDialog")
        },
        methods: {   
            _getCommTables(){
                // 获取自定义表头和表list数据
                this._getCustomerSetData().then((res) => {
                    if(res && res.length){
                        // 有自定义表头 取自定义表头
                        this._getSelfHeadData()
                    }else {
                        // 没有自定义表头，取 所有的表头
                        this._getTotalHeadData()
                    }
                    // 自定义表头数据获取完成后 需要获取table表格合同数据
                    this._getPaEmployeeTable()
                })                
            }, 
            // 所有的表头
            _getTotalHeadData(){
                this.totalTableHead = []
                if(this.tableDataCopy.Fields && this.tableDataCopy.Fields.length ){
                    this.tableDataCopy.Fields.forEach((item, i) => {
                        this.totalTableHead.push({
                            label: item.FieldName,
                            property: item.FieldCode,
                            Lock: item.Lock,
                            Hidden: item.Hidden,
                            SortId: item.SortId                                                           
                        })
                    })
                }else {
                    this.totalTableHead = []
                } 
                // 将 totalTableHead 赋值给  最终的
                this.finalTableHeadData = this.totalTableHead                             
            },
            // 自己的表头
            _getSelfHeadData(){
                this.selfTableHead = []
                if(this.customerTaleData && this.customerTaleData.length){
                    this.customerTaleData.forEach((item, i) => {
                        this.selfTableHead.push({
                            label: item.FieldName,
                            property: item.FieldCode,
                            Lock: item.Lock,
                            Hidden: item.Hidden,
                            SortId: item.SortId
                        })
                    })  
                }else {
                    this.selfTableHead = []
                }     
                // 将 selfTableHead 赋值给  最终的
                this.finalTableHeadData = this.selfTableHead
            },  
            // 全选/取消全选
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            // 批量导出
            handlerExport(){
                debugger
                let EmpIds = []
                // console.log(this.multipleSelection)
                if(this.multipleSelection && this.multipleSelection.length){
                    this.multipleSelection.forEach((item,key,arr) => {
                        EmpIds.push(item.EmpId)
                    })
                }
                EmpIds = EmpIds.join(",")
                // console.log(EmpIds)
                let TableCode = this.tableDataCopy.TableCode
                let CompanyCode = this.companyCode
                let token = this.token['Admin-Token']
                let url = `${BASE_URL}/API/PAIO?Method=ExportEmpDataByTable&TokenId=${token}&CompanyCode=${CompanyCode}&ModuleCode=PA&TableCode=${TableCode}&EmpIds=${EmpIds}`
                window.open(url)                  
            },                       
            // 给 finalTableHeadData 分别添加一个 是否锁定和 隐藏的标识
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
                // 清空 tableData
                this.tableData = []                
                return new Promise((resolve, reject) => {
                    getViewCol(this.currentPageCode, this.tableDataCopy.TableCode).then(res => {
                        this.tableLoading = false
                        if(res && res.data.State === REQ_OK){
                            // 自定义表头数据
                            this.customerTaleData = res.data.Data
                            resolve(this.customerTaleData)                            
                        }else {
                            this.$message({
                                type: 'error',
                                message: `获取自定义配置数据失败，${res.data.Error}`
                            })
                        }
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
                            this.tableData = JSON.parse(res.Data)
                            this.queryObj.total = res.DataCount
                            // console.log("获取的table表格的员工数据--------", this.tableData)
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
            // 关闭 合同详情弹框
            closeContractDetailDailog(){
                debugger
                this.showContractDetailInfo = false
            },
            // 查看
            handleScan(index, row) {
                debugger
                console.log(index, row)
                // 将当前的员工详情存入到vuex中
                this.$store.dispatch("setCurrentEmpObj", row)
                this.currentRowEmpObj = row
                // 判断是进入员工详情页面 还是 合同详情页面
                if(this.isEmpOrContractPage){
                    // 开启员工详情的弹框
                    this.showEmpDetailInfo = true
                }else {
                    // 开启 合同详情的弹框
                    this.showContractDetailInfo = true
                }
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
                        this._getCustomerSetData().then(res => {
                            if(res && res.length){
                                // 有自定义表头 取自定义表头
                                this._getSelfHeadData()
                            }else {
                                // 没有自定义表头，取 所有的表头
                                this._getTotalHeadData()
                            }
                            // 获取 table中员工数据
                            this._getPaEmployeeTable()                    
                        })                        
                        // 关闭 员工详情弹框
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
