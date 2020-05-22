<!--
  User: gaol
  Date: 2019/9/25
  功能： 员工的 详情中的 员工状态 标签组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.empStatusInfo
  height 100%
  overflow auto
  .tagContent
    width 300px
  //   // max-width 200px
  //   display flex
  //   flex-wrap wrap
  //   justify-content flex-start
  //   align-items flex-start 
  //   .itemBtn
  //     width 45%
  //     margin 5px !important
.editDutyDate
  .tip
    color red



</style>
<template>
  <div class="empStatusInfo" v-loading="loading">
    <!-- empStatus: {{empStatus}}
    -------
    empObj： {{empObj}} -->
    <!---待入职状态--start-->
    <!-- <div class="tagContent" v-if="empStatus === '0'">
      <el-button class="itemBtn"  type="primary" size="mini" @click.native="reportJob">到岗</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="deleteWaitJob">删除</el-button>
    </div> -->
    <!---待入职状态---end---->

    <!---离职状态--start-->
    <!-- <div class="tagContent" v-if="empStatus === '-1'">
      <el-button class="itemBtn" type="primary" size="mini" @click.native="editLeaveDate">修改离职日</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="againJoinJob">重新入职</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="deleteLeaveJob">删除</el-button>
    </div> -->
    <!---离职状态---end---->   

    <!---在职其他状态--start-->
    <!-- <div class="tagContent" v-if="empStatus === '1' || (empStatus!='0' && empStatus!='-1')">
      <el-button class="itemBtn" type="primary" size="mini" @click.native="fullMember">转正</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="leaveJob">离职</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="turnJob">调转</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="contractManage">合同管理</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="editCategory">修改类型</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="editStatus">修改状态</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="deleteOnJob">删除</el-button>
      <el-button class="itemBtn" type="primary" size="mini" @click.native="editJoinDate">修改入职日</el-button>
    </div> -->
    <!---在职其他状态---end---->   

    <!--动态显示员工事件btn---start-->
    <div class="tagContent" v-if="empInfo.Events && empInfo.Events.length>=0">
      <!--引入事件处理btn组件-start-->
      <event-btn-cmp
        :obj="empInfo"
        :eventBtn="empInfo.Events"
      ></event-btn-cmp>
      <!--引入事件处理btn组件-end-->
    </div>
    <!--动态显示员工事件btn---end----> 
  
    <!--通用弹框(转正、离职、调转、合同管理、修改类型、修改状态、删除、修改入职日期、到岗等)------>
    <!-- showCommonDialog： {{showCommonDialog}} -->
    <!-- empObj: {{empObj}} -->
    <!-- empInfo: {{empInfo}} -->
    <div v-if="showCommonDialog">
      <common-dialog 
        :currentEditBtnStr="currentEditBtnStr"
        :showCommonDialog.sync = "showCommonDialog"
        :empObj="empObj"
        :empInfo="empInfo"
      ></common-dialog>          
    </div>
    <!--通用弹框(转正、离职、调转、合同管理、修改类型、修改状态、删除、修改入职日期、到岗等)---end--->      

  </div>
</template>

<script type="text/ecmascript-6">
  import IconSvg from '@/base/Icon-svg/index'
  import { REQ_Ok } from '@/api/config'
  import {
    deleteEmp
  } from '@/api/employee'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EventBtnCmp from '@/components/commonComponents-cmp/eventBtnComponents-cmp'
  import CommonDialog from './CommonDialog'
  export default {
    props: {
      // 员工状态： 在职 onTheJob  离职 leaveJob  待入职  waitEmployee
      empStatus: {
        type: String,
        default: ''
      },
      empObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 员工头像、级别、事件btn等信息
      empInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      IconSvg,
      CommonDialog,
      SaveFooter,
      EventBtnCmp
    },
    data(){
      return {
        loading: false,  // 控制 头像部分的loading
        iconPhoto: 'icon-photo',
        showEditDate: false, // 修改入职/离职日期弹框的 显示/隐藏
        editDutyDateStr: 'onTheJob',  //  修改离职日期leaveDate   修改入职日期 joinDate的 标识
        showCommonDialog: false, // 控制修改入职、修改离职等btn 后 通用弹框的显示/隐藏
        currentEditBtnStr: '',   // 点击的 修改入职/离职、转正、调离。。。。btn 的一个标识
      }
    },
    created() {
      debugger
      this.$bus.$on("contractManageBtnEvent", () => {
        this.contractManage()
      })
    },
    beforeDestroy(){
      this.$bus.$off("contractManageBtnEvent")
    },
    methods: {
      // 添加标签
      // 到岗
      reportJob(){
        this.currentEditBtnStr = 'reportJob'
        this.showCommonDialog = true
      },
      // 待入职状态——删除
      deleteWaitJob() {
        this.currentEditBtnStr = 'deleteWaitJob'
        this.showCommonDialog = true
      },
      // 修改离职日期
      editLeaveDate(){
        debugger
        this.currentEditBtnStr = 'editLeaveDate'
        this.showCommonDialog = true
      },
      // 重新入职
      againJoinJob() {
        this.currentEditBtnStr = 'againJoinJob'
        this.showCommonDialog = true
      },
      // 离职状态——删除
      deleteLeaveJob() {
        this.currentEditBtnStr = 'deleteLeaveJob'
        this.showCommonDialog = true
      },
      // 转正
      fullMember(){
        this.currentEditBtnStr = 'fullMember'
        this.showCommonDialog = true
      },
      // 离职
      leaveJob() {
        this.currentEditBtnStr = 'leaveJob'
        this.showCommonDialog = true
      },
      // 调转
      turnJob(){
        this.currentEditBtnStr = 'turnJob'
        this.showCommonDialog = true
      },
      // 合同管理
      contractManage() {
        debugger
        this.currentEditBtnStr = 'contractManage'
        this.showCommonDialog = true
      },
      // 修改类型
      editCategory(){
        this.currentEditBtnStr = 'editCategory'
        this.showCommonDialog = true
      },
      // 修改状态
      editStatus() {
        this.currentEditBtnStr = 'editStatus'
        this.showCommonDialog = true
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
      deleteOnJob() {
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
      // 修改入职日期
      editJoinDate() {
        debugger
        this.currentEditBtnStr = 'editJoinDate'
        this.showCommonDialog = true
        //触发 joinedEmp页面
      },
      // 确定修改离职日期
      saveEditDutyDate() {

      },
      // 取消修改离职日期
      cancelEditDutyDate(){

      },
    }
  }
</script>
