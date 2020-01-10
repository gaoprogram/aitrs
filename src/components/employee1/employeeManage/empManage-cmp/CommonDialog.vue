<!--
  User: gaol
  Date: 2019/9/29
  功能： 员工详情页面中 点击（到岗、离职、调转、修改类型、修改状态、修改入职日、修改离职日、重新入职等）的通用弹框
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       

</style>
<template>
  <div class="common-dialog-cmp">
    <!-- 传入的 currentEditBtnStr: {{currentEditBtnStr}} -->
    <!--到岗---start-->
    <div v-if="currentEditBtnStr === 'reportJob'">
      <!--引入到岗的弹框----start-->
      <!-- <edit-leave-day-cmp 
        v-bind="$attrs" 
        v-on="$listeners">
      </edit-leave-day-cmp> -->
      <!--引入到岗的弹框----end-->
    </div>
    <!--到岗---end-->

    <!--转正---start--->
    <div v-if="currentEditBtnStr === 'fullMember'">
      <full-member-cmp v-bind="$attrs" v-on="$listeners"></full-member-cmp>
    </div>
    <!---转正--end--->

    <!--离职---start-->
    <div v-if="currentEditBtnStr === 'leaveJob'">
      <leave-job-cmp v-bind="$attrs" v-on="$listeners"></leave-job-cmp>
    </div>
    <!--离职---end-->

    <!--调转-start-->
    <div v-if="currentEditBtnStr === 'turnJob'">
      <turn-job-cmp v-bind="$attrs" v-on="$listeners"></turn-job-cmp>
    </div>
    <!--调转-end--->

    <!--合同管理-start-->             
    <div v-if="currentEditBtnStr === 'contractManage'">
      <contract-manage-dialog-cmp v-bind="$attrs" v-on="$listeners"></contract-manage-dialog-cmp>
    </div>
    <!--合同管理-end--->    

    <!--修改类型---start-->
    <div v-if="currentEditBtnStr === 'editCategory'">
      <edit-type-cmp v-bind="$attrs" v-on="$listeners"></edit-type-cmp>
    </div>
    <!--修改类型---end-->

    <!--修改状态---start-->
    <div v-if="currentEditBtnStr === 'editStatus'">
      <edit-status-cmp v-bind="$attrs" v-on="$listeners"></edit-status-cmp>
    </div>
    <!--修改状态---end-->    

    <!--修改离职日---start-->
    <div v-if="currentEditBtnStr === 'editLeaveDate'">
      <!--引入修改离职日的弹框----start-->
      <edit-leave-day-cmp 
        v-bind="$attrs" 
        v-on="$listeners">
      </edit-leave-day-cmp>
      <!--引入修改离职日的弹框----end-->
    </div>
    <!--修改离职日---end-->


    <!--修改入职日---start-->
    <div v-if="currentEditBtnStr === 'editJoinDate'">
      <!--引入修改入职日的弹框----start-->
      <edit-Join-day-cmp 
        v-bind="$attrs" 
        v-on="$listeners">
      </edit-Join-day-cmp>
      <!--引入修改入职日的弹框----end-->
    </div>
    <!--修改入职日---end-->

  </div>
</template>

<script type="text/ecmascript-6">
  import EditLeaveDayCmp from './EditLeaveDay-dialog-cmp'
  import EditJoinDayCmp from './EditJoinDay-dialog-cmp'
  import LeaveJobCmp from './LeaveJob-dialog-cmp'
  import TurnJobCmp from './TurnJob-dialog-cmp'
  import FullMemberCmp from './FullMember-dialog-cmp'
  import EditTypeCmp from './EditType-dialog-cmp'
  import EditStatusCmp from './EditStatus-dialog-cmp'
  import ContractManageDialogCmp from './ContractManage-dialog-cmp'
  export default {
    props: {
      // 传入的当前的弹框类型标识
      currentEditBtnStr: {
        type: String,
        default: 'editLeaveDay'
      }
    },
    components:{
      EditLeaveDayCmp,
      EditJoinDayCmp,
      LeaveJobCmp,
      TurnJobCmp,
      FullMemberCmp,
      EditTypeCmp,
      EditStatusCmp,
      ContractManageDialogCmp
    },
    data(){
        return {

        }
    },
    watch: {
      // showCommonDialog: {
      //   handler(newValue, oldValue){
      //     debugger
      //     this.$emit("update:showCommonDialog", newValue)
      //   }
      // }
    },
    created() {
        debugger
    },
    methods: {

    }
  }
</script>
