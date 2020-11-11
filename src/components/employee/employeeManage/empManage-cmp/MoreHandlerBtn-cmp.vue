<!--
  User: gaol
  Date: 2019/10/23
  功能： 员工-在职员工、待入职员工、离职员工页面的  更多操作按钮组件
  被 CommonEmpPage-cmp.vue 组件引用
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.moreHandlerBtn-cmp
    width 100%
    .fn-btn-container
        width 100%
        text-align right
        >>>.el-dropdown
        &.first-child
            margin-right 5px
</style>
<template>
    <div class="moreHandlerBtn-cmp animated fadeIn">
        <!-- showBatchJoinJob: {{showBatchJoinJob}} -->
        <!-- pageEventBtnList： {{pageEventBtnList}}
        --- -->
        <!-- pageBatchEventBtnList: {{pageBatchEventBtnList}} -->
        <div class="fn-btn-container u-f-ac u-f-jfd">
            <!-- <el-button 
                style="margin-left: 0" 
                size="small" 
                @click.native="joinJob"
            >
                直接入职
            </el-button> -->


            <!---动态btn区域---->
            <!-- pageEventBtnList： {{pageEventBtnList}} -->
            <div class="pageEventBtnWrap">
                <!--引入事件处理btn组件-start-->
                <event-btn-cmp
                    :eventBtn="pageEventBtnList"
                ></event-btn-cmp>
                <!--引入事件处理btn组件-end-->
            </div>
            

            <!--批量操作btn--->
            <!-- pageBatchEventBtnList： {{pageBatchEventBtnList}} -->
            <el-dropdown 
                v-if="pageBatchEventBtnList.length>0"
                @command="handleBatchCommandFn" 
                size="small" 
                split-button 
                trigger="hover"
            >
                更多
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="(batchItem, key) in pageBatchEventBtnList"
                    :key="batchItem.EventCode"
                    :command="batchItem.EventCode"
                >
                    {{batchItem.EventName}}
                </el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>

            <!--批量导出btn--->
            <!-- pageExportBtnList： {{pageExportBtnList}} -->
            <el-dropdown 
                v-if="pageExportBtnList.length>0"
                size="small" 
                split-button
                trigger="hover"
                @command="handleExportCommandFn"
            >
                导入导出
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item command="batchAddEmp">批量新增员工</el-dropdown-item>
                    <el-dropdown-item command="batchEditEmp">批量修改</el-dropdown-item>
                    <el-dropdown-item command="batchExport">批量导出</el-dropdown-item>  -->

                    <el-dropdown-item
                        v-for="(exportItem, key) in pageExportBtnList"
                        :key="exportItem.EventCode"
                        :command="exportItem.EventCode"
                    >
                        {{exportItem.EventName}}
                    </el-dropdown-item>              
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <!--pageEventBtnList 弹框--start-->
        <div class="pageEventBtnListBox" v-if="showLeftBtnDialog">
            <el-dialog
                :title="leftDialogTit"
                fullscreen
                append-to-body
                :close-on-click-modal="false"
                :visible.sync="showLeftBtnDialog"
            >
                <emp-groupfield-edit-cmp 
                    ref="empGroupfieldEditCmp" 
                    :groupFieldData="currentBtnContentData"
                    @executeSuccess="executeSuccess"
                >
                </emp-groupfield-edit-cmp>
                <!--引入保存按钮---start-->
                <save-footer @save="saveLeftBtnData" @cancel="cancelLeftBtnData"></save-footer>            
                <!---引入保存按钮--end-->
            </el-dialog>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import EmpGroupfieldEditCmp from '@/components/employee/employeeManage/empManage-cmp/EmpGroupfieldEdit-cmp'
    import EventBtnCmp from '@/components/commonComponents-cmp/eventBtnComponents-cmp'
    import { PaGetDicDataSourceList } from '@/api/dic'
    import { 
        getPageEventList,
        loadEvent,
        execute
    } from '@/api/employee'
    import { 
        REQ_OK, 
        PA_PAGECODE_JOINEDEMPLOYEE, 
        PA_PAGECODE_WAITEDEMPLOYEE,
        PA_PAGECODE_LEAVEDEMPLOYEE,
        PA_PAGECODE_CONTRACTMANAGE
    } from '@/api/config'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            SaveFooter,
            EmpGroupfieldEditCmp,
            EventBtnCmp
        },
        props: {
            //批量入职
            showBatchJoinJob: {
                type:Boolean,
                default: false 
            },
            // 批量离职
            showBatchLeaveJob: {
                type: Boolean,
                default: false,
            },
            // 批量转正
            showBatchSwitch: {
                type: Boolean,
                default: false,
            },
            // 批量调转
            showBatchTurn: {
                type: Boolean,
                default: false,
            },  
            // 批量删除
            showBatachDelete: {
                type: Boolean,
                default: false,
            },   
            // 批量修改
            showBatchEditEmp: {
                type: Boolean,
                default: false,
            },   
            // 批量新增员工
            showBatchAddEmp: {
                type: Boolean,
                default: false,
            }, 
            // 批量导出
            showBatchExportEmp: {
                type: Boolean,
                default: false,
            },  
            // 批量设置员工模板
            showBatchSetEmpTemplate: {
                type: Boolean,
                default: false,
            }, 
            // 直接入职
            showDirectJoinJob: {
                type: Boolean,
                default: false,
            },                                                                                  
        },
        data(){
            return {
                pageEventBtnList: [],  // 在职、离职、待入职页面中的事件btn集合
                pageBatchEventBtnList:[], //在职、离职、待入职页面中 批量事件btn集合
                pageExportBtnList: [],  // 在职、离职、待入职页面中 导入导出事件 btn 集合
                currentEventCode: '', // 当前的事件码
                currentLeftBtnObj: {},  // 当前的leftbtn对象
                currentBtnContentData: [], // 当前btn下的数据
                showLeftBtnDialog: false, 
                leftDialogTit: '',
                showBatchJoinJob_more: this.showBatchJoinJob, // 批量入职显示/隐藏
                showBatchLeaveJob_more: this.showBatchLeaveJob_more, // 批量离职显示/隐藏
                showBatchSwitch_more: this.showBatchSwitch_more, // 批量转正显示/隐藏
                showBatchTurn_more: this.showBatchTurn_more, // 批量调转显示/隐藏
                showBatachDelete_more: this.showBatachDelete_more, // 批量删除显示/隐藏
                showBatchEditEmp_more: this.showBatchEditEmp, // 批量修改显示/隐藏
                showBatchAddEmp_more: this.showBatchAddEmp, // 批量添加员工显示/隐藏
                showBatchExportEmp_more: this.showBatchExportEmp, // 批量导出 显示/隐藏
                showBatchSetEmpTemplate_more: this.showBatchSetEmpTemplate, // 批量设置员工模板 显示/隐藏
                showDirectJoinJob_more: this.showDirectJoinJob, // 直接入职 显示/隐藏
                batchExportBtnDisabled: true, // 控制 批量导出按钮的 disabled 属性
                
            }
        },
        computed:{
            ...mapGetters(['currentPageCode']),
            // showBatchJoinJob_more(){
            //     return this.showBatchJoinJob
            // }
        },   
        watch: {                                                                 
        },
        created() {
            // 获取页面可用事件
            this._getPageEventList()
        },
        methods: {
            // 更多中的 批量事件
            handleBatchCommandFn(command) {
                debugger
                // this.$message('click on item ' + command);
                switch(command){
                    // 批量入职
                    case 'batchJoinJob':
                        this.showBatchJoinJob_more = true
                        this.$emit("update:showBatchJoinJob", this.showBatchJoinJob_more)
                    break
                    // 批量离职
                    case 'PA_MultipleDimission':
                        this.showBatchLeaveJob_more = true
                        this.$emit("update:showBatchLeaveJob", this.showBatchLeaveJob_more)
                    break
                    // 批量转正
                    case 'PA_MultipleBeRegular':
                        this.showBatchSwitch_more = true
                        this.$emit("update:showBatchSwitch", this.showBatchSwitch_more)
                    break
                    //批量调转
                    case 'PA_MultipleTransfer':
                        this.showBatchTurn_more = true
                        this.$emit("update:showBatchTurn", this.showBatchTurn_more)
                    break
                    // 批量删除
                    case 'PA_MultipleDelete':
                        this.showBatachDelete_more = true
                        this.$emit("update:showBatachDelete", this.showBatachDelete_more)
                        break
                    break
                    // 批量设置员工模板
                    case 'batchSetEmpTemplate':
                        this.showBatchSetEmpTemplate_more = true
                        this.$emit("update:showBatchSetEmpTemplate", this.showBatchSetEmpTemplate_more)
                        break
                    break 
                    //直接入职
                    case 'directJoinJob':
                        this.showDirectJoinJob_more = true
                        this.$emit("update:showDirectJoinJob", this.showDirectJoinJob_more)
                        break
                    break   
                }
            },  
            // 导入导出中的 批量事件
            handleExportCommandFn(command){
                debugger
                // this.$message('click on item ' + command);
                switch(command){
                    // 批量入职
                    case 'PA_MultipleHire':   
                    // case 'batchAddEmp':  
                        this.showBatchJoinJob_more = true
                        this.$emit("update:showBatchJoinJob", this.showBatchJoinJob_more)                                                                                                                                                                           
                        break
                    // 批量修改员工
                    case 'PA_MultipleEdit':
                    // case 'batchEditEmp':
                        this.showBatchEditEmp_more = true
                        this.$emit("update:showBatchEditEmp", this.showBatchEditEmp_more)
                        break
                    // 批量 导出员工
                    case 'PA_MultipleExport':
                    // case  'batchExport':
                        this.showBatchExportEmp_more = true
                        this.$emit("update:showBatchExportEmp", this.showBatchExportEmp_more)
                        break
                }
            },        
            // 获取可用页面事件
            _getPageEventList(){
                debugger
                this.pageEventBtnList = []
                this.pageBatchEventBtnList = []
                this.pageExportBtnList = []
                getPageEventList(this.currentPageCode).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        if(res.data.Data && res.data.Data.length){
                            res.data.Data.forEach((item, key) => {
                                if(item.EventCode){
                                    this.pageEventBtnList.push(item)
                                }else {
                                    if(item.EventName === '更多'){
                                        if(item.Child && item.Child.length){
                                            this.pageBatchEventBtnList = [].concat(item.Child)
                                        }
                                    }else if(item.EventName === '导入导出'){
                                        if(item.Child && item.Child.length){
                                            this.pageExportBtnList = [].concat(item.Child)
                                        }                                        
                                    }
                                }
                            })
                        }
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取页面可用事件失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取页面可用事件出错'
                    })
                })                    
            },
            // 获取分类下面的数据
            _getCurrentTabData(){
                debugger
                // 直接调用子组件中的方法 改变子组件中的loading
                this.$refs["empGroupfieldEditCmp"].setLoading(true)
                loadEvent(this.currentEventCode).then(res => {
                    debugger
                    // 直接调用子组件中的方法 改变子组件中的loading
                    this.$refs["empGroupfieldEditCmp"].setLoading(false)
                    if(res && res.data.State === REQ_OK){
                        this.currentBtnContentData = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取事件实例失败，${res.data.Error}`
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '获取事件实例出错'
                    })
                })
            },
            executeSuccess(){
                this.showLeftBtnDialog = false
            }, 
            // 点击
            clickLeftBtn(item) {
                debugger
                this.currentLeftBetObj = item
                this.leftDialogTit = item.EventName
                this.currentEventCode = item.EventCode
                this.showLeftBtnDialog = true
                // setTimeout(() => {
                //     this._getCurrentTabData()
                // }, 0)      
                this.$nextTick(() => {
                    this._getCurrentTabData()
                })
            },
            // 保存
            saveLeftBtnData(){
                // empGroupfieldEdit-cmp 组件中进行 表单验证
                this.$refs["empGroupfieldEditCmp"].submitValidate(this.currentEventCode)
            },
            // 取消
            cancelLeftBtnData(){
                this.showLeftBtnDialog = false
            }       
        }
    }
</script>
