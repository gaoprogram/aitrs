<!--
  User: gaol
  Date: 2019/12/31
  功能： 员工事件btn 组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-dialog
  .eventHandler_containerBox
    min-height 400px  
.empEventBtnCmp
    width 100%
    padding 0 5px
    box-sizing  border-box
    .btnBox
      width 100%
      .itemBtn
        min-width 38%
        text-overflow ellipsis !important 
        white-space nowrap !important
        overflow hidden !important
        margin 5px !important
</style>

<template>
  <div class="empEventBtnCmp">
    <!-- obj: {{obj}} -->
    <!----事件btn区域---->
    <div class="btnBox">
      <el-button
        class="itemBtn" 
        type="primary" 
        size="mini"
        v-for="(btn, key) in eventBtn"     
        :key="btn.EventCode"    
        @click.native="handlerClickEventBtn(btn, key)" 
      >
        {{btn.EventName}}
      </el-button>
    </div>
    
    <!---事件(除 删除、合同管理、待入职等 btn外)btn处理统一弹框---start-->
    <div class="commonEventBtnHandlerBox" v-if="showCommonEventEditDialog">
      <el-dialog 
        :title="currentName"
        append-to-body
        fullscreen
        :close-on-click-modal="false"
        :visible.sync="showCommonEventEditDialog"
      >
        <!--引入事件处理统一组件---start--->
        <!-- <emp-event-handler-cmp
          :eventObj="currentEventObj"
          :eventCode="currentEventCode"
          :eventTarget= 'currentEventTarget'
        >
        </emp-event-handler-cmp> -->
        <div class="eventHandler_containerBox">
          <component 
            :ref="`eventHandler_${currentEventCode}`"
            :is="currentEventHandlerPage(currentEventTarget)"
            :empInfo = "obj"
            :eventObj="currentEventObj"
            :eventCode="currentEventCode"
            :eventTarget= 'currentEventTarget'   
            @selectedEmp="selectedEmp"       
          >
          </component>          
        </div>

        <div class="footerBox" v-show="selectedEmpArr.length">
          <save-footer @save="saveEventHandler" @cancel="cancelEventHandler"></save-footer>
        </div>
      </el-dialog>
    </div>
    <!---事件(除 删除、合同管理、待入职等 btn外)btn处理统一弹框---end-->


    <!--合同管理事件弹框--start-->
    <!-- showContractManageDialog: {{showContractManageDialog}}
    ---
    currentEmpObj: {{currentEmpObj}}
    ---
    empInfo: {{empInfo}}
    -- -->
    <div class="contractBtnHandlerBox" v-if="showContractManageDialog">
      <el-dialog
        title="合同管理"
        fullscreen
        append-to-body
        custom-class="contractManageDialog"
        :visible.sync="showContractManageDialog"          
      >
        <contract-manage-dialog
          :empObj="currentEmpObj"
          :empInfo="empInfo"
          :eventObj="currentEventObj"
          :eventCode="currentEventCode"
          :eventTarget= 'currentEventTarget'                   
        ></contract-manage-dialog>  
      </el-dialog>
    </div>
    <!--合同管理事件弹框--end-->

    <!--新员工入职事件弹框--start-->
    <!-- <div class="newEmployeeBtnHandlerBox" v-if="showNewEmployeeDialog">
      <el-dialog
        title="新员工入职管理"
        fullscreen
        append-to-body
        custom-class="newEmployeeDialog"
        :visible.sync="showNewEmployeeDialog"          
      >
        <new-employee-cmp
          :empObj="currentEmpObj"
          :empInfo="empInfo"
          :eventObj="currentEventObj"
          :eventCode="currentEventCode"
          :eventTarget= 'currentEventTarget'      
        ></new-employee-cmp>  
      </el-dialog>      
    </div> -->
    <!---新员工入职事件弹框---end-->

    <!--复杂事件按钮(新员工入职、待入职、到岗等)弹框-start-->
    <div class="complexEventWrap" v-if="currentEventObj.SubAction && showComplexEventDialog">
      <el-dialog
        :title="currentEventObj.SubAction.EventName"
        fullscreen
        append-to-body
        custom-class="complexEventDialog"
        :visible.sync="showComplexEventDialog"          
      >
        <component 
          :is="currentComplexEventCmp"
          :empObj="currentEmpObj"
          :showComplexEventDialog.sync="showComplexEventDialog"
          :empInfo="empInfo"
          :eventObj="currentEventObj.SubAction"
          :eventRootObj="currentEventObj"
          :eventCode="currentEventCode"
          :eventTarget= 'currentEventTarget'          
          >
        </component>      
      </el-dialog>
    </div>
    <!--复杂事件按钮弹框--end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpEventHandlerCmp from './empEventHandler-cmp' 
  import PosEventHandlerCmp from './positionEventHandler-cmp' 
  import OrgEventHandlerCmp from './orgEventHandler-cmp' 
  import JobEventHandlerCmp from './jobEventHandler-cmp'
  import ContractManageDialog from './contractManageInfo-cmp'
  import newEmployeeCmp from './complexEventBtn-cmp/newEmployeeBtn-cmp'
  import { mapGetters } from 'vuex'
  import {
    deleteEmp,
    getEmpInfo
  } from '@/api/employee'
  export default {
    props: {
      // 员工对象信息
      obj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 事件按钮 集合
      eventBtn: {
        type: Array,
        default: () => {
          return []
        }
      },

    },
    components: {
      SaveFooter,
      EmpEventHandlerCmp,
      PosEventHandlerCmp,
      OrgEventHandlerCmp,
      JobEventHandlerCmp,
      ContractManageDialog,
      newEmployeeCmp
    },
    data(){
      return {
        loading: false,
        showCommonEventEditDialog: false,
        currentEventObj: {}, // 当前事件对象
        currentName: '',
        currentEventCode: '', // 当前事件code
        currentEventTarget: '', // 当前事件的 标识 （员工事件组件/组织事件组件/职务事件组件/职位事件组件）
        selectedEmpArr: [],  // 人员/组织/职位/职务选择器中选择了对象后
        showContractManageDialog: false, // 合同管理 弹框显示/隐藏
        // showNewEmployeeDialog: false, // 新员工入职 弹框显示/隐藏
        showComplexEventDialog: false, // 复杂事件 弹框显示/隐藏
        empInfo: {}, // 员工详情中的相关信息
      }
    },
    computed: {
      ...mapGetters([
        'currentEmpObj'
      ]),
      currentComplexEventCmp(){
        let EventCode = this.currentEventObj.EventCode
        switch(EventCode){
          // 新员工入职 PA_NewHire
          case 'PA_NewHire':
            return newEmployeeCmp
          // 待入职 "PA_NewWaitEntry"
          case 'PA_NewWaitEntry':
            return newEmployeeCmp
          // 到岗 "PA_NewOnboard"
          case 'PA_NewOnboard':
            return newEmployeeCmp  
        }
      },       
    },
    created(){
      this.selectedEmpArr = []
      // 获取 员工info信息
      try {
        if(!this.currentEmpObj){
          // 不是员工详情页中的 btn 不需要 获取 员工详情信息
        }else {
          // 全局中 currentEmpObj 不为空时 才去获取当前员工的 empInfo
          this._getEmpInfo()
        }
      } catch (error) {
        console.log("获取员工info 信息失败")
      }

      this.$bus.$on("busExecuteSuccess", () => {
        debugger
        // 关闭事件统一修改弹框
        this.showCommonEventEditDialog = false
        this.selectedEmpArr = []
        // 需要触发相关页面的刷新(Common-tableInfo-cmp.vue)
        this.$bus.$emit("eventBtnSaveSuccess")
      })      
    },
    beforeDestroy(){
      this.$bus.$off("busExecuteSuccess")
    },
    methods:{
      // 获取 员工详情信息
      _getEmpInfo(){
          debugger
          getEmpInfo(this.currentEmpObj.EmpId).then(res => {
              debugger
              if(res && res.data.State === REQ_OK){
                  debugger
                  // console.log("----获取到的员工信息---",res.data.Data)
                  this.empInfo = res.data.Data
              }else{
                  this.$message.error(`获取员工相关信息失败err,${res.data.Error}`)
              }
          }).catch(() => {
              this.$message.warning(`获取员工相关信息出错`)
          })
      },
      // 删除员工
      _deleteEmp(){
        deleteEmp().then(res => {
          if( res && res.data.State === REQ_Ok ){
            this.$message({
              type: 'success',
              message: '删除员工成功'
            })
            this.$bus.$emit("emitCloseEmpInfoDialog")
          }else {
            this.$message({
              type: 'error',
              message: `删除员工失败，${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '删除员工出错'
          })
        })
      },     
      // 在职状态——删除
      _deleteOnJob() {
        // this.currentEditBtnStr = 'deleteOnJob'
        // this.showCommonDialog = true
        this.$confirm("确定要删除此员工吗？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          //确定删除
          this._deleteEmp()
        }).catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '删除已取消'
          })  
        })
      },      
      // 点击了 事件 btn按钮
      handlerClickEventBtn(BtnObj,index){
        debugger
        this.currentName = BtnObj.EventName
        this.currentEventObj = BtnObj
        this.currentEventCode = BtnObj.EventCode
        this.currentEventTarget = BtnObj.EventTarget
        debugger
        // this.$notify({
        //   title: '提示',
        //   message: '功能正在开发中。。。',
        //   color: 'red',
        //   duration: 0
        // })
        // const h = this.$createElement
        // this.$notify({
        //   title: '标题名称',
        //   message: h('i', { style: 'color: teal'}, '功能正在开发中。。。')
        // })
        switch(this.currentEventCode){
          // 删除btn 不走统一 事件处理组件
          case 'PA_DelEmp':
            this._deleteOnJob()
            return
          // 合同管理btn 不走统一 事件处理组件
          case 'PA_Contract':
            this.showContractManageDialog = true
            return 
          // 新员工入职 btn 不走统一 事件处理组件
          case 'PA_NewHire':
            this.showComplexEventDialog = true
            return 
          // 待入职 btn  不走统一 事件处理组件
          case 'PA_NewWaitEntry':
            this.showComplexEventDialog = true
            return 
          // 到岗 btn 不走统一 事件处理组件
          case 'PA_NewOnboard':
            this.showComplexEventDialog = true
            return 
          default:
            // 其他事件btn 统一调用事件修改组件
            this.showCommonEventEditDialog = true 
        }       
      },
      currentEventHandlerPage(currentEventTarget){
        switch(this.currentEventTarget){
          case 'Emp':
            return EmpEventHandlerCmp;
          case 'Pos':
            return PosEventHandlerCmp;
          case 'Org':
            return OrgEventHandlerCmp;
          case 'Job':
            return JobEventHandlerCmp;
        }
      },
      saveEventHandler(){
        console.log(`eventHandler_${this.currentEventCode}`)
        let refStr = `eventHandler_${this.currentEventCode}`
        console.log(this.$refs[refStr])
        console.log(this.$refs[refStr].$refs.middleEventCmp)
        console.log(this.$refs[refStr].$refs.middleEventCmp.$refs.groupFieldCmp)
        // 调用 EmpGroupfieldEdit 组件中的 提交验证方法
        this.$refs[refStr].$refs.middleEventCmp.$refs.groupFieldCmp.submitValidate()
        debugger
      },
      cancelEventHandler(){
        debugger
        this.selectedEmpArr = []
        this.showCommonEventEditDialog = false
        this.$bus.$emit("busExecuteCloseEmpDialog")
      },
      // 选择了员工/组织/职位/职务后
      selectedEmp(empArr){
        this.selectedEmpArr = empArr || []
      }
    }
  }
</script>
