<!--
  User: gaol
  Date: 2019/12/31
  功能： [待入职、新入职员工、到岗、重新入职]btn事件 设置first页面组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-form-item
    margin-bottom 5px !important
.newEmployeeFirstCmp
    padding 0 20px
    box-sizing  border-box
    .conferEmpIdBox
        height calc(100vh - 100px)
        .box-card
            width 50%
            height calc(100vh - 400px)
            overflow auto
            margin 0 auto
</style>

<template>
  <div class="newEmployeeFirstCmp" v-loading = 'loading'>
    <!-- eventObj: {{eventObj}} -->
    <!-- formObj: {{formObj}} -->
    <!-- groupFields： {{groupFields}} -->
    <!---字段设置部分--start-->
    <div class="conferEmpIdBox">
        <emp-group-field-cmp
            ref="empGroupfieldEditCmp" 
            :groupFieldData="groupFields"
            :eventObj="eventObj"
            :eventRootObj="eventRootObj"
            @fieldValidateSuccess="fieldValidateSuccess"
            @closeComplexFirstSetPage="closeComplexFirstSetPage">          
        >
        </emp-group-field-cmp>
    </div>
    <!---字段设置部分--end-->


    <!---动态显示下层设置组件弹框--->
    <!-- showNextSetPage: {{showNextSetPage}}
    --
    eventObj.SubAction: {{eventObj.SubAction}} -->
    <!-- formObj: {{formObj}} -->
    <div class="nextSetPageBox" v-if="eventObj.SubAction && showNextSetPage">
        <el-dialog
            :visible.sync="showNextSetPage"
            :title="nextSetDialogTit"
            fullscreen
            :append-to-body="true"
            :close-on-click-modal="false"
        >
            <component 
                :is="nextSetComponent"
                :eventObj="eventObj.SubAction"
                :eventRootObj="eventRootObj"
                :showNextSetPage.sync="showNextSetPage"
                :firstPageObj= "formObj"
                :eventCode="eventObj.SubAction.EventCode"
                :taskCode = "formObj.TaskCode"
                :eventTarget="eventObj.SubAction.EventTarget"
                :isEventDetail = 'true'
                >
            </component>
        </el-dialog>
    </div>

    
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
//   import BasicGroupFieldCmp from '@/components/employee/employeeManage/empManage-cmp/BasicGroupfield-cmp'
  import EmpGroupFieldCmp from '@/components/employee/employeeManage/empManage-cmp/EmpGroupfieldEdit-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpEventHandlerCmp from '../empEventHandler-cmp'
  import OrgEventHandlerCmp from '../orgEventHandler-cmp'
  import PositionEventHandlerCmp from '../positionEventHandler-cmp'
  import JobEventHandlerCmp from '../jobEventHandler-cmp'
  import {
    SaveTask,
    loadEvent,
  } from '@/api/employee'
  import {
    PaGetDicDataSourceList 
  } from '@/api/dic'

  let DSType = 'SYS'
  let DataSource = 'EventReason'

  export default {
    props: {
        eventRootObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        eventObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        showComplexEventDialog: {
            type: Boolean,
            default: false
        },
        eventCode: {
            type: String,
            default: ""
        },
        eventTarget: {
            type: String,
            default: ""
        }
    },
    components: {
        EmpGroupFieldCmp,
        SaveFooter,
        EmpEventHandlerCmp,
        OrgEventHandlerCmp,
        PositionEventHandlerCmp,
        JobEventHandlerCmp
    },
    data(){
      return {
        loading: false,
        showComplexFirstSetPage: this.showComplexEventDialog,
        showNextSetPage: false, 
        nextSetDialogTit: '',
        groupFields: [],  
        // reasonName: '', // 事件原因
        formObj: {
            Id: this.eventObj.Id || 0,
            EventCode: this.eventObj.EventCode,
            EventName: this.eventObj.EventName,
            TaskCode: '',
            TargetId: this.eventObj.TargetId || '',
            TargetCode: this.eventObj.TargetCode || '',
            TargetName: this.eventObj.TargetName,
            EventReason: '',
            BeginDate: '',
        },
        res_eventCode: '', // 保存后 后台返回的 事件码
        // reasonOptions: []
      }
    },
    created(){
        // this._PaGetDicDataSourceList(DSType, DataSource)
        this._getCommTables()
    },
    computed: {
        // 将时间转化为 时间戳的格式
        initDate () {
            // switch (this.obj.Config.Attribute) {
            //   case 'yyyy-MM-dd':
            //     return 'date'
            //   default:
            //     return ''
            // }
        },
        nextSetComponent(){
            let nextEventObj = this.eventObj.SubAction
            if(nextEventObj){
                // 有下层设置页面
                let nextEventCode = nextEventObj.EventCode
                switch(nextEventCode){
                    // 新员工入职 PA_Hire
                    case 'PA_Hire':
                        this.nextSetDialogTit = nextEventObj.EventName
                        return EmpEventHandlerCmp
                    // 待入职 PA_WaitEntry
                    case 'PA_WaitEntry':
                    // 到岗 PA_NewOnboard
                    case 'PA_Onboard':
                        this.nextSetDialogTit = nextEventObj.EventName
                        return EmpEventHandlerCmp
                }
            }else {
                // 没有下层设置页面

            }
            // switch(nextEventCode){
            //     // 员工事件处理组件
            //     case 'Emp':
            //         this.commonComponentsTit = '员工事件处理'
            //         return EmpEventHandlerCmp
            //     // 组织事件处理组件
            //     case 'Org':
            //         this.commonComponentsTit = '组织事件处理'
            //         return OrgEventHandlerCmp
            //     // 职位事件处理组件
            //     case 'Pos':
            //         this.commonComponentsTit = '职位事件处理'
            //         return PositionEventHandlerCmp
            //     // 职务事件处理组件
            //     case 'Job':
            //         this.commonComponentsTit = '职务事件处理'
            //         return JobEventHandlerCmp
            // }
        },             
    },
    watch: {
        showComplexFirstSetPage: {
            handler(newValue, oldValue){
                if(!newValue){
                    this.$emit("update:showComplexEventDialog", newValue)
                }
            }
        }
    },
    methods:{
        // _PaGetDicDataSourceList(DSType, DataSource){
        //     PaGetDicDataSourceList(DSType, DataSource).then(res => {
        //         if(res && res.data.State === REQ_OK){
        //             this.reasonOptions = res.data.Data
        //         }else {
        //             this.$message.error(`获取事件原因下拉源数据失败,${res.data.Error}`)
        //         }
        //     })
        // },
        _getCommTables(){
            this._loadEvent()
        },
        refreshGroupData(){
            this._getCommTables()
        },
        _loadEvent(){
            this.loading = true
            loadEvent(this.eventObj.EventCode, "PA").then(res => {
                this.loading = false
                debugger
                if(res && res.data.State === REQ_OK){
                    // console.log(res.data.Data)
                    this.groupFields = res.data.Data
                }else {

                }
            })
        },
        _SaveTask(obj){
            this.loading = true
            SaveTask(JSON.stringify(obj)).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.formObj.TaskCode = res.data.Data
                    this.showCommonComponents = true
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            })
        },
        closeComplexFirstSetPage(){
            this.showComplexFirstSetPage = false
        },
        fieldValidateSuccess(empId){
            debugger
            if(this.eventObj.SubAction){
                this.showNextSetPage = true
            }else {
                // 没有下层设置页面 关闭当前页面
                this.showComplexFirstSetPage = false
                
            }
        },
        fieldValidateFailed(){
            
        }
    }
  }
</script>
