<!--
  User: gaol
  Date: 2019/9/25
  功能： 员工的 详情中的 员工状态 标签组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.empStatusInfo
    height 100%
    .tagContent
        max-height 100%
        max-width 200px
        overflow auto
        display flex
        flex-wrap wrap
        justify-content flex-start
        align-items flex-start 
        .itemBtn
            width 45%
            margin 5px !important

.editDutyDate
    .tip
        color red




</style>
<template>
  <div class="empStatusInfo" v-loading="loading">
    <!---待入职状态--start-->
    <div class="tagContent" v-if="empStatus === 'waitEmployee'">
        <el-button class="itemBtn"  type="primary" size="mini">到岗</el-button>
        <el-button class="itemBtn" type="primary" size="mini">删除</el-button>
    </div>
    <!---待入职状态---end---->

    <!---离职状态--start-->
    <div class="tagContent" v-if="empStatus === 'leaveJob'">
        <el-button class="itemBtn" type="primary" size="mini" @click.native="editLeaveDate">修改离职日</el-button>
        <el-button class="itemBtn" type="primary" size="mini">重新入职</el-button>
        <el-button class="itemBtn" type="primary" size="mini">删除</el-button>
    </div>
    <!---离职状态---end---->   

    <!---在职其他状态--start-->
    <div class="tagContent" v-if="empStatus === 'onTheJob'">
        <el-button class="itemBtn" type="primary" size="mini">转正</el-button>
        <el-button class="itemBtn" type="primary" size="mini">离职</el-button>
        <el-button class="itemBtn" type="primary" size="mini">调转</el-button>
        <el-button class="itemBtn" type="primary" size="mini">合同管理</el-button>
        <el-button class="itemBtn" type="primary" size="mini">修改类型</el-button>
        <el-button class="itemBtn" type="primary" size="mini">修改状态</el-button>
        <el-button class="itemBtn" type="primary" size="mini">删除</el-button>
        <el-button class="itemBtn" type="primary" size="mini" @click.native="editJoinDate">修改入职日</el-button>
    </div>
    <!---在职其他状态---end---->         

    <!--修改入职/离职日弹框--start-->
    <div class="editDutyDateBox" v-if="showEditDate">
        <el-dialog
            :title="editDutyDateStr"
            width="30%"
            append-to-body
            :visible.sync="showEditDate"
            custom-class="editDutyDate"
            >
            <p class="tip">注：该操作将引发相关的数据生效日期发生变动，请谨慎操作</p>

            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label=""
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="d"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            </el-table>

            <!---底部保存按钮区域--start-->
            <save-footer @save="saveEditDutyDate" @cancel="cancelEditDutyDate"></save-footer>        
            <!--底部保存按钮区域----end-->            
        </el-dialog>
    </div>
    <!--修改入职/离职日弹框--end--->          
  </div>
</template>

<script type="text/ecmascript-6">
  import IconSvg from '@/base/Icon-svg/index'
  import { REQ_Ok } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
        // 员工状态： 在职 onTheJob  离职 leaveJob  待入职  waitEmployee
        empStatus: {
            type: String,
            default: ''
        },
    },
    components: {
      IconSvg,
      SaveFooter
    },
    data(){
        return {
          loading: false,  // 控制 头像部分的loading
          iconPhoto: 'icon-photo',
          showEditDate: false, // 修改入职/离职日期弹框的 显示/隐藏
          editDutyDateStr: 'leaveDate',  //  修改离职日期leaveDate   修改入职日期 joinDate的 标识
          tableData: [{
            date: '2016-05-02',
            name: '小明同学',
            address: '武汉华中科技大学'
          }]
        }
    },
    created() {
        debugger

    },
    methods: {
      // 添加标签
      // 修改入职日期
      editJoinDate() {
        this.showEditDate = true
      },
      // 修改离职日期
      editLeaveDate(){
        debugger
        this.showEditDate = true
      },
      // 确定修改离职日期
      saveEditDutyDate() {

      },
      // 取消修改离职日期
      cancelEditDutyDate(){

      }
    }
  }
</script>
