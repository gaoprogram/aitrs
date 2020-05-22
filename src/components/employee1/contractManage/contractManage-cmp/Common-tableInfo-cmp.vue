<!--
  User: gaol
  Date: 2019/8/9
  功能： 合同 —— 合同管理——合同管理 中的 通用表格组件 （已废用，通用了 在职员工、离职员工、待入职员工的通用列表组件）
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.setShowColumn-dialog
    .el-dialog__body
        padding 0 !important 
>>>.el-table__empty-block
    min-height 120px !important

.commonTableInfoBox_contract
    min-height 500px
    overflow auto
    .empDetailDailogBox
    >>>.el-table__body-wrapper
        min-height 100px

</style>
<template>
    <div class="commonTableInfoBox_contract" v-loading="loading">
        <!-- <el-button @click="change">测试按钮</el-button> -->
        <!-- queryObj: {{queryObj}} -->
        <!-- tableHead: {{tableHead}} -->
        <!-- propTableData: {{propTableData}} -->
        <!-- dataRes: {{dataRes}} -->
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
        <div class="setShowColumnBtn clearfix" v-if="finalTableHeadData.length>0">
            <span class="lt marginB10" @click="handleSetShowColumn">
                <el-tooltip content="设置表头列">
                    <i class="el-icon-setting"></i>
                </el-tooltip>
            </span>
        </div>
        <!---设置自定义表头列btn--end-->

        <!-------table表格区------start---->
        <!-- tableData: {{tableData}}
        ------
        finalTableHeadData： {{finalTableHeadData}} -->
        <div :class="['table', tableData.length<=0? 'not_found':'']">
            <el-table
                v-loading="tableLoading"
                :data="tableData"
                class="tb-edit"
                border
                empty-text=' '
                style="width: 100%"
                max-height="600">

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
                            <!---证件照片和员工照片--->
                            <span 
                                v-if="scope.column.property === 'PEEPhoto' ||
                                scope.column.property === 'PIDPhoto'"
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
                                <!--证件合同附件--->
                                <span
                                    v-if="scope.column.property === 'CTLaAATT'"
                                >
                                    <span v-if="scope.row[scope.column.property].length">
                                        {{scope.row[scope.column.property][0].Name}}
                                    </span>
                                </span>

                                <!--非中文名字，非证件合同附件--->
                                <span 
                                    v-if="scope.column.property != 'PCHName' &&
                                         scope.column.property != 'CTLaAATT'">
                                    {{scope.row[scope.column.property]}}
                                </span>
                            </span>
                        </span>
                        <!-- <span>---scope.row:{{scope.row}}</span> -->
                        <!-- <span>scope.column:{{scope.column}}</span> -->
                    </template>
                </el-table-column>

                <el-table-column 
                    v-if="finalTableHeadData.length>0"
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

        <!--合同详情dailog区域---start-->
        <div class="empDetailDailogBox" v-if="showEmpDetailInfo">
            <el-dialog 
                title="员工合同详情"
                :visible.sync="showEmpDetailInfo"
                fullscreen
                append-to-body
                :before-close="closeEmpDetailDailog"
                destroy-on-close
            >

                <!-- empInfo: {{empInfo}} -->
                <!--头像部分start--->
                    <emp-avatar-info-cmp 
                        :isContractManageDetail="true"
                        :empInfo="empInfo"
                    >
                    </emp-avatar-info-cmp>
                <!--头像部分end-->
                <!-- <el-card  class="empDetailbox-card"> -->
                    <!--合同详情field部分start---->
                    <div class="contractContentBox marginT20" v-loading="fieldContentLoading">
                        <!-- contractDetailInfo: {{contractDetailInfo}} -->
                        <contract-manage-field-content-cmp 
                            :rowFieldDataArr="contractDetailInfo"
                            :currentFieldsObj="currentFieldsObj"
                            :currentRowEmpObj="currentRowEmpObj"
                            :isAddOrEdit = "isAddOrEdit"
                            ref="contractContentCmp"
                            @editContractField="editContractField"
                            @addContractField="addContractField"
                            @deleteSuccess="deleteContractFieldSuccess"
                        ></contract-manage-field-content-cmp>
                    </div>
                    <!--合同详情field部分end----->                   
                <!-- </el-card> -->

            </el-dialog>
        </div>
        <!--合同详情dailog区域---end-->
     

        <!---编辑field弹框start---->
        <div class="editContractFieldBox" v-if="showEditContractDialog">
            <el-dialog
                title="编辑"
                fullscreen
                :visible.sync="showEditContractDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <field-edit-cmp 
                    ref="contractEditFieldsCmp"
                    :groupFieldData="currentFieldsObj"
                    :isAddField="true"
                    @isSubmit="isSubmit"
                ></field-edit-cmp>

                <div class="footerBox">
                    <save-footer @save="saveContractField" @cancel="cancelContractField"></save-footer>
                </div>
            </el-dialog>
        </div>
        <!---编辑field弹框end---->        
    </div>
</template>

<script>
    // import {example1, example2} from './columns';
    // import EmpDetailInfoCmp from './EmpDetailInfo-cmp'
    // import ShowColumnCmp from './SetShowColumn-cmp'
    // import { PaEmployeeManageMixin } from '@/utils/PA-mixins'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import EmpAvatarInfoCmp from '@/components/commonComponents-cmp/contractManageDetailAvatar-cmp'
    import ShowColumnCmp from '../../employeeManage/empManage-cmp/SetShowColumn-cmp'
    // import EmpContractDetailFieldCmp from './empContractDetailField-cmp'
    import ContractManageFieldContentCmp from './ContractManageFieldContent-cmp'
    import FieldEditCmp from './FieldEdit-cmp'
    import { mapGetters } from 'vuex'
    import { REQ_OK } from '@/api/config'
    import {
        getEmpInfo, // 获取员工头像等信息
        GetTableColumnInfo,  // 获取合同table 自定义表头数据
        saveContractViewCol, // 保存 自定义设置 表头设置
        getContractList,   // 获取合同 table 的 list 数据
        getContractFieldList, // 获取合同表单字段
        GetOneContractDetail, // 获取合同详情
        saveContract // 保存合同合同
    } from '@/api/employee'
    // // 表头1
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
            ContractManageFieldContentCmp,
            ShowColumnCmp,
            FieldEditCmp,
            SaveFooter,
            EmpAvatarInfoCmp
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
                showEmpDetailInfo: false,  // 控制 合同详情弹框的显示/隐藏
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
                currentRowContractDetail: [], // 点击的当前row 获取的合同详情信息
                // currentRowFieldData: {}, // 点击当前row 获取的 field 信息
                currentEditRowObj: {},  // 合同合同详情中 当前点击的 合同row 对象
                currentEditTeamObj: {}, // 合同合同详情中 当前点击的 合同row 对应的当前组信息
                editFieldShow: false, // 控制 合同合同详情中 编辑/新增弹框的显示 /隐藏
                editFieldData: {},  // 当前新增/编辑的 field 详情
                isAddField: false, //  是否是新增
                isEditField: false, // 是否是编辑

                fieldContentLoading: false, 
                contractDetailInfo: [],   // 合同详情 
                showEditContractDialog: false,
                currentFieldsObj: {},  // 当前点击的编辑的合同field对象
                currentEditSavedFields: {}, // 当前编辑后保存的field对象
                isAddOrEdit: false, // false 编辑 true 为新增
                currentAddSavedFields: {}, // 当前新增后保存的field对象 
                empInfo: {},// 员工头像信息等    
                dataRes: {},          
            }
        },        
        computed: {
            // 所有的数据
            // tableDataCopy(){
            //     debugger
            //     return this.propTableData
            // },
            ...mapGetters(['contractManagePageCode']),
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
                this.$bus.$on("selectContractTabitem", (index, itemObj) => {
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
                })

                this.$bus.$on("searchEmpNo", (searchEmpNo) => {
                    // 搜索框中输入有合同工号此时需要合并 工号
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
                        // 获取 table中合同数据
                        this._getPaEmployeeTable()                   
                    })  
                    // 关闭合同详情弹框  
                    this._closeEmpInfoDialog()
                })

                // this.$bus.$on("busExecuteSuccess", async () => {
                //     debugger
                //     // 重新获取自定义的数据
                //     this._getCustomerSetData().then(res => {
                //         if(res && res.length){
                //             // 有自定义表头 取自定义表头
                //             this._getSelfHeadData()
                //         }else {
                //             // 没有自定义表头，取 所有的表头
                //             this._getTotalHeadData()
                //         }
                //         // 获取 table中合同数据
                //         this._getPaEmployeeTable()                   
                //     })  
                //     // 关闭合同详情弹框  
                //     this._closeEmpInfoDialog()                    
                // })

                this.$bus.$on("highSearch", (highSearchObj) => {
                    debugger
                    // 搜索框中输入有合同工号此时需要合并 工号
                    // this.strSearchJson.empNo = highSearchObj.searchEmpNo
                    this.strSearchJson = highSearchObj
                })
            })
        },
        beforeDestroy(){
            this.$bus.$off("selectContractTabitem")
            this.$bus.$off("emitSearchToolsResult")
            this.$bus.$off("searchEmpNo")
            this.$bus.$off("emitCloseEmpInfoDialog")
            this.$bus.$off("highSearch")
            // this.$bus.$off("busExecuteSuccess")
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
                    this._getPaContrctTable()
                })                
            }, 
            // 所有的表头
            _getTotalHeadData(){
                debugger
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
                debugger
                this.finalTableHeadData = this.totalTableHead                             
            },
            // 自己的表头
            _getSelfHeadData(){
                debugger
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
                debugger
                this.finalTableHeadData = this.selfTableHead
            },
            // 给 finalTableHeadData 分别添加一个 是否锁定和 隐藏的标识
            addLockAndHiddenAttr(){

            },
            // 关闭 合同详情的弹框
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
                    GetTableColumnInfo( this.tableDataCopy.TableCode, this.contractManagePageCode, "PA").then(res => {
                        this.tableLoading = false
                        debugger
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
            _getPaContrctTable(){
                debugger
                this.tableLoading = true
                getContractList(this.tableDataCopy.TableCode, JSON.stringify(this.strSearchJson),this.queryObj.pageIndex,this.queryObj.pageSize).then(res => {
                    debugger
                    this.tableLoading = false
                    if(  res && res.State === REQ_OK ){
                        // 表内容数据
                        this.tableData = JSON.parse(res.Data)
                        this.queryObj.total = res.DataCount
                        // console.log("获取的table表格的合同数据--------", this.tableData)
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
                            message: `获取合同数据失败,${res.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取合同数据出错'
                    })
                }) 
            },
            // 获取合同详情
            _GetOneContractDetail(TeamCode, EmpId, Id){
                debugger
                GetOneContractDetail(this.tableDataCopy.TeamCode, this.currentRowEmpObj.EmpId, this.currentRowEmpObj.ID).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        // this.currentRowContractDetail = [
                        //     {
                        //         TeamCode: this.tableDataCopy.TeamCode,
                        //         Rows: [res.data.Data]
                        //     }
                        // ]

                        this.contractDetailInfo = [res.data.Data]
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取合同详情数据失败,${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取合同详情出错'
                    })
                })
            },
            // 获取合同field 字段
            _getContractFieldList(TeamCode, EmpId){
                getContractFieldList(this.tableDataCopy.TeamCode, this.currentRowEmpObj.EmpId).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取合同表单字段数据失败,${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取合同表单字段出错了'
                    })
                })
            },
            // 保存编辑的合同fields
            _saveContract(groupFieldData){
                this.$refs.contractEditFieldsCmp.loading = true
                let strJson = ''
                    if(!this.isAddOrEdit){
                        // 编辑保存
                        strJson = JSON.stringify(this.currentEditSavedFields)
                    }else {
                    // 新增保存
                        strJson = JSON.stringify(this.currentAddSavedFields)
                    }
                saveContract(this.tableDataCopy.TeamCode, this.currentRowEmpObj.EmpId, strJson).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.$refs.contractEditFieldsCmp.loading = false
                        this.$message.success("保存成功")
                        // 重新获取数据
                        this._GetOneContractDetail()
                        this.showEditContractDialog = false
                    }else {
                        this.$message.error(`保存数据失败,${res.data.Error}`)
                    }
                })
            },
            isSubmit(data, groupFieldData){
                debugger
                if(!this.isAddOrEdit){
                // 编辑的保存
                if(data && data.length){
                    if(data[1] === true){
                    this.currentEditSavedFields = groupFieldData
                    // 调取保存合同的接口
                    this._saveContract(groupFieldData)
                    }else {

                    }
                }
                }else {
                // 新增的保存
                if(data && data.length){
                    if(data[1] === true){
                    this.currentAddSavedFields = groupFieldData
                    // 调取保存合同的接口
                    this._saveContract(groupFieldData)
                    }else {

                    }
                }          
                }
            },            
            // 编辑合同表单
            editContractField(data){
                debugger
                this.currentFieldsObj = data
                this.showEditContractDialog = true
            },
            // 新增合同表单
            addContractField(data){
                debugger
                this.isAddOrEdit = true
                this.currentFieldsObj = data
                this.showEditContractDialog = true
            },            
            // field取消保存
            editContractFieldCancel(data){
                debugger
                this.editFieldShow = false                
            },
            // 新增field 分组
            clickAddNewGroup(rowObj, teamObj){
                debugger
                // 将 this.groupFieldData 的值 复制一份
                this.isAddField = true
                this.isEditField = false
                this.currentEditRowObj = rowObj
                this.currentEditTeamObj = teamObj
                // 显示新增分组的弹框
                this.editFieldShow = true

                if(rowObj && rowObj.FieldValueSet && rowObj.FieldValueSet.length){
                    rowObj.FieldValueSet.forEach((item, key) => {
                        item.FieldValue = ''
                    })
                    this.editFieldData = rowObj 
                }else {
                    this.editFieldData = {}
                }                
            },
            // 编辑保存
            saveContractField(){
                // 直接调用子组件中的 submitForm 方法
                this.$refs.contractEditFieldsCmp.submitForm()
            },
            //编辑取消
            cancelContractField(){
                this.showEditContractDialog = false
            },
            // 删除表单
            deleteContractFieldSuccess(rowObj){
                this._getContractDetail()
            },            
            // 编辑field字段
            clickEditFieldBtn(rowObj, teamObj){
                debugger
                this.currentEditRowObj = rowObj
                this.currentEditTeamObj = teamObj

                this.isEditField = true
                this.isAddField = false
                // 显示编辑字段的弹框
                this.editFieldShow = true 

                if(rowObj && rowObj.FieldValueSet && rowObj.FieldValueSet.length){
                    this.editFieldData = rowObj 
                }else {
                    this.editFieldData = {}
                }
            },            
            // 分页--一页展示多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getPaContrctTable()
            },
            // 分页--上一页，下一页
            handleCurrentChange (val) {
                this.queryObj.pageIndex = val
                this._getPaContrctTable()
            },                    
            // 关闭 合同详情弹框
            closeEmpDetailDailog() {
                debugger
                this.showEmpDetailInfo = false
            },
            _getAvatarInfo(){
                getEmpInfo(this.currentRowEmpObj.EmpId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.empInfo = res.data.Data
                    }else {
                        this.$message.error(`获取员工头像信息失败,${res.data.Error}`)
                    }
                })
            },
            // 查看
            handleScan(index, row) {
                debugger
                console.log(index, row)
                this.currentRowEmpObj = row
                // 将当前的 员工信息 存入到 vuex中
                this.$store.dispatch("setCurrentEmpObj", row) 
                // 获取合同的field数据               
                this._GetOneContractDetail()
                // 获取头像信息
                this._getAvatarInfo()
                // this._getContractFieldList()
                // 开启合同详情的弹框
                this.showEmpDetailInfo = true
                // 跳转路由至 合同详情页面

                // this.$router.push({
                //     path:'/employee/employeeManage/empDetailInfo',
                //     query: {
                //         id: "dfjkdfjkdfj"
                //     }
                // })
            },
            _deleteEmp(){
                deleteEmp(this.currentRowEmpObj.EmpId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("删除成功")
                        // 重新获取合同
                        this._getPaContrctTable()
                    }else {
                        this.$message({
                            type: 'error',
                            message: `删除失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '删除合同出错'
                    })
                })
            },
            // 删除合同
            handleDelete(index, row) {
                console.log(index, row)
                this.$confirm("确定要删除此合同吗？", "提示", {
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
                // 保存设置
                this.loading = true
                saveContractViewCol(this.contractManagePageCode, this.tableDataCopy.TableCode, JSON.stringify(data)).then(async (res) => {
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
                            // 获取 table中合同数据
                            this._getPaContrctTable()                       
                        })
                        // 关闭 弹框
                        this.showSetColumnDailog = false                        

                    }else {
                        this.$message({
                            type: 'error',
                            message: `保存失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    debugger
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
