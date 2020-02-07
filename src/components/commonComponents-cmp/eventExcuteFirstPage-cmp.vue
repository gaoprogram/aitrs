<!--
  User: gaol
  Date: 2019/12/31
  功能： 事件执行设置first页面组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-form-item
    margin-bottom 5px !important
.eventExcuteFirstCmp
    padding 0 20px
    box-sizing  border-box
    .box-card
        width 50%
        height calc(100vh - 400px)
        overflow auto
        margin 0 auto
</style>

<template>
  <div class="eventExcuteFirstCmp" v-loading = 'loading'>
    <!-- eventObj: {{eventObj}} -->
    <!-- formObj: {{formObj}} -->
    <el-card class="box-card">
        <el-form label-width="100px" :model="formObj">
            <el-form-item label="生效日期：" prop="BeginDate">
                <!-- <span class="value">
                    {{eventObj.BeginDate | replaceTime}}
                </span> -->
                <el-date-picker
                    style="width: 300px"
                    v-model="formObj.BeginDate"
                    type="date"
                    :format="initDate"
                    value-format="timestamp"
                    placeholder="选择日期">
                </el-date-picker>                
            </el-form-item>

            <el-form-item label="事件名称：" prop="EventName">
                <span class="value">
                    {{formObj.EventName}}
                </span>
            </el-form-item>

            <el-form-item label="事件原因：" prop="EventReason">
                <!-- <span class="value">
                    {{eventObj.EventReason}}
                </span> -->
                <!-- reasonOptions: {{reasonOptions}} -->
                <el-select 
                    v-model="formObj.EventReason">
                    <el-option
                        v-for="(item, key) in reasonOptions"
                        :key="key"
                        :value="item.Code"
                        :label="item.Name"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="对象：" prop="EventTarget">
                <span class="value">
                    {{formObj.EventTarget}}
                </span>
            </el-form-item>

            <el-form-item label="名称：" prop="EventTargetName">
                <span class="value">
                    {{formObj.EventTargetName}}
                </span>
            </el-form-item>   

        </el-form>
    </el-card>

    <div class="footerBox">
        <save-footer 
            saveText = "确定"
            @save="saveEventHander" 
            @cancel="cancelEventHander"
        ></save-footer>
    </div>

    <!---动态显示当前的执行组件--->
    <!-- showCommonComponents: {{showCommonComponents}} -->
    <!-- formObj: {{formObj}} -->
    <div class="commonComponentsBox" v-if="showCommonComponents">
        <el-dialog
            :visible.sync="showCommonComponents"
            :title="commonComponentsTit"
            fullscreen
            :append-to-body="true"
            :close-on-click-modal="false"
        >
            <component 
                :is="currentComponent()"
                :eventObj="eventObj"
                :firstPageObj= "formObj"
                :eventCode="eventObj.EventCode"
                :taskCode = "formObj.TaskCode"
                :eventTarget="eventObj.EventTarget"
                :isEventDetail = 'true'
                >
            </component>
        </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpEventHandlerCmp from './empEventHandler-cmp'
  import OrgEventHandlerCmp from './orgEventHandler-cmp'
  import PositionEventHandlerCmp from './positionEventHandler-cmp'
  import JobEventHandlerCmp from './jobEventHandler-cmp'
  import {
    SaveTask,
    GetEventReason
  } from '@/api/employee'
  import {
    PaGetDicDataSourceList 
  } from '@/api/dic'

  let DSType = 'SYS'
  let DataSource = 'EventReason'

  export default {
    props: {
        eventObj: {
            type: Object,
            default: () => {
                return {}
            }
        },
        showDialog: {
            type: Boolean,
            default: false
        }
    },
    components: {
      SaveFooter,
      EmpEventHandlerCmp,
      OrgEventHandlerCmp,
      PositionEventHandlerCmp,
      JobEventHandlerCmp
    },
    data(){
      return {
        loading: false,
        showFirstSetPage: this.showDialog, 
        showCommonComponents: false, 
        commonComponentsTit: '',
        reasonName: '', // 事件原因
        formObj: {
            Id: this.eventObj.Id || 0,
            EventCode: this.eventObj.EventCode,
            EventName: this.eventObj.EventName,
            TaskCode: '',
            TargetId: this.eventObj.TargetId || '',
            TargetCode: this.eventObj.TargetCode || '',
            TargetName: this.eventObj.TargetName,
            EventTargetName: this.eventObj.EventTargetName,
            EventTarget:this.eventObj.EventTarget,
            EventReason: '',
            BeginDate: '',
        },
        res_eventCode: '', // 保存后 后台返回的 事件码
        reasonOptions: []
      }
    },
    created(){
        // this._PaGetDicDataSourceList(DSType, DataSource)
        //获取事件原因下拉源
        this._GetEventReason()
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
      }        
    },
    watch: {
        showFirstSetPage: {
            handler(newValue, oldValue){
                if(!newValue){
                    this.$emit("update:showDialog", newValue)
                }
            }
        }
    },
    methods:{
        _PaGetDicDataSourceList(DSType, DataSource){
            PaGetDicDataSourceList(DSType, DataSource).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.reasonOptions = res.data.Data
                }else {
                    this.$message.error(`获取事件原因下拉源数据失败,${res.data.Error}`)
                }
            })
        },
        // 获取事件原因下拉源
        _GetEventReason(){
            GetEventReason(this.formObj.EventCode, "PA").then(res => {
                if(res && res.data.State === REQ_OK){
                    this.reasonOptions = res.data.Data
                }else {
                    this.$message.error(`获取事件原因下拉数据源失败,${res.data.Error}`)
                }
            })
        },
        currentComponent(){
            switch(this.eventObj.EventTarget){
                // 员工事件处理组件
                case 'Emp':
                    this.commonComponentsTit = '员工事件处理'
                    return EmpEventHandlerCmp
                // 组织事件处理组件
                case 'Org':
                    this.commonComponentsTit = '组织事件处理'
                    return OrgEventHandlerCmp
                // 职位事件处理组件
                case 'Pos':
                    this.commonComponentsTit = '职位事件处理'
                    return PositionEventHandlerCmp
                // 职务事件处理组件
                case 'Job':
                    this.commonComponentsTit = '职务事件处理'
                    return JobEventHandlerCmp
            }
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
        saveEventHander(){
            debugger
            this._SaveTask(this.formObj)
        },
        cancelEventHander(){
            this.showFirstSetPage = false
        }
    }
  }
</script>
