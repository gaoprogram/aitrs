<!--
  User: gaol
  Date: 2019/8/9
  功能：员工管理--在职员工
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .joinedEmployee
    padding 0 30px 
    box-sizing border-box
    .topContainer
      margin-bottom 20px
      .tip
        font-size 14px
    .tabBox
      margin-bottom 20px
    .search-container
      margin-bottom 20px
      .el-button-group
        vertical-align: top!important
    .table-content-container
      .fn-btn-container
        text-align right
</style>

<template>
  <div class="joinedEmployee marginT30">

    <div class="topContainer">
      <span class="tip">240人在职</span>
      <el-button type="primary" size="mini" @click="joinWaitEmployee">待入职员工</el-button>
      <el-button type="primary" size="mini" @click="joinLeavedEmployee">离职员工</el-button>
    </div>

    <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="table-tab-container">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs> -->

    <!--tab标签----start--->
    <div class="tabBox">
      <tab-item @selectTabitem = "selectTabitem"></tab-item>
    </div>


    <!---search部分-----start--->
    <div class="search-container">
      <el-input placeholder="请输入内容" v-model="searchValue" debounce clearable class="input-with-select" style="width: 500px">
        <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="筛选" placement="bottom">
          <el-button icon="el-icon-share" @click.native="handlerShowSearchcmp"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="清空" placement="bottom">
          <el-button icon="el-icon-delete" @click.native="handlerReset"></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <!---search部分-----end--->

    <!----搜索弹框组件------start---->
    <div class="searchWrap" v-if="showSearchCmp">
      <el-dialog 
        title="提示"
        :visible.sync="showSearchCmp"
        width="30%">
        <search-tools 
          :showMoreSearch="showMoreSearchConditions">
        </search-tools>
      </el-dialog>
    </div>
    <!----搜索弹框组件------end---->


    <!--table数据-----start--->
    <div class="tablecontent">
        currentTableStr: {{currentTableStr}}
        <!---在职记录---->
        <!-- <div class="JobRecordBox" v-show="currentTableStr === 'JobRecord'">
          在职记录
          <job-record></job-record>
        </div> -->

        <!---合同信息---->
        <!-- <div class="ContractBox" v-show="currentTableStr === 'Contract'">
          合同信息
          <contract></contract>
        </div> -->

        <!---银行信息---->
        <!-- <div class="BankBox" v-show="currentTableStr === 'Bank'">
          银行信息
          <bank></bank>
        </div> -->

        <!---家庭成员---->
        <!-- <div class="FamilyBox" v-show="currentTableStr === 'Family'">
          家庭成员
          <family></family>
        </div> -->

        <!---子女教育---->
        <!-- <div class="childrenEducationBox" v-show="currentTableStr === 'childrenEducation'">
          子女教育
          <children-education></children-education>
        </div> -->

        <!---继续教育---->
        <!-- <div class="ContinueEducationBox" v-show="currentTableStr === 'ContinueEducation'">
          继续教育
          <continue-education></continue-education>
        </div> -->

        <!---大病---->
        <!-- <div class="Illenss" v-show="currentTableStr === 'Illness'">
          大病
          <illness></illness>
        </div> -->

        <!---住房贷款---->
        <!-- <div class="HomeLoansBox" v-show="currentTableStr === 'HomeLoans'">
          住房贷款
          <home-loans></home-loans>
        </div>        -->

        <!---住房租金---->
        <!-- <div class="HomeRentBox" v-show="currentTableStr === 'HomeRent'">
          住房租金
          <home-rent></home-rent>
        </div>     -->

        <!---赡养老人---->
        <!-- <div class="SupportOlderBox" v-show="currentTableStr === 'SupportOlder'">
          赡养老人
          <support-older></support-older>
        </div>   -->

        <!---通用的table表格组件---start--->  
        <div class="CommonTableInfo">
          通用表格区
          <common-table-info ref="commonTableInfoCmp"></common-table-info>
        </div>
        <!---通用的table表格组件---end--->  
                                                                        
    </div>
    <!---table数据---end--->

    <div class="table-content-container">
      <div class="fn-btn-container">
        <el-button type="primary" @click="handleAddEmp()" size="small">新增员工</el-button>
        <el-button style="margin-left: 0" size="small" @click.native="joinJob">直接入职</el-button>

        <el-dropdown 
          @command="handleCommandFn" 
          size="small" 
          split-button 
          trigger="hover"
        >
          更多
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item 
              command="batchJoinJob"
            >
              批量入职
            </el-dropdown-item>
            <el-dropdown-item 
              command="batchLeaveJob">
              批量离职
            </el-dropdown-item>
            <el-dropdown-item
              command="batchSwitch">
              批量转正
            </el-dropdown-item>
            <el-dropdown-item
              command="batchTurn">
              批量调转
            </el-dropdown-item>
            <el-dropdown-item
             command="batchDelete">
             批量删除
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown 
          size="small" 
          split-button
          trigger="hover"
          @command="hanleBatchFn"
        >
          导入导出
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="batchAddEmp">批量新增员工</el-dropdown-item>
            <el-dropdown-item command="batchEditEmp">批量修改</el-dropdown-item>
            <el-dropdown-item command="batchExport">批量导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="table-content">
      </div>
    </div>

    <!-- <el-button @click="clickBtn">回到顶部</el-button> -->

    <!-----直接添加员工的dialog--start-->
    <div v-if="addEmpCmpVisible">
      <add-emp-cmp 
        class="addEmp" 
        @handleCancelAddEmp="handleCancelAddEmp" 
        v-if="addEmpCmpVisible">
      </add-emp-cmp>
    </div>
    <!-----直接添加员工的dialog--end-->


    <!--批量入职弹框----start-->
    <div class="batchJoinJobBox" v-if="showBatchJoinJob">
      <el-dialog
        title="批量入职"
        :visible.sync="showBatchJoinJob"
        append-to-body
        width="40%"
      >
        <batch-join-job-cmp></batch-join-job-cmp>
      </el-dialog>
    </div>
    <!--批量入职弹框----end-->

    <!--批量离职弹框----start-->
    <div class="batchLeaveJobBox" v-if="showBatchLeaveJob">
      <el-dialog
        title="批量离职"
        :visible.sync="showBatchLeaveJob"
        append-to-body
        width="40%"
      >
        <batch-leave-job-cmp></batch-leave-job-cmp>
      </el-dialog>
    </div>
    <!--批量离职弹框----end-->

    <!--批量转正弹框----start-->
    <div class="batchSwitchBox" v-if="showBatchSwitch">
      <el-dialog
        title="批量转正"
        :visible.sync="showBatchSwitch"
        append-to-body
        width="40%"
      >
        <batch-switch-cmp></batch-switch-cmp>
      </el-dialog>
    </div>
    <!--批量转正弹框----end-->    

    <!--批量调转弹框----start-->
    <div class="batchTurnBox" v-if="showBatchTurn">
      <el-dialog
        title="批量调转"
        :visible.sync="showBatchTurn"
        append-to-body
        width="40%"
      >
        <batch-turn-cmp></batch-turn-cmp>
      </el-dialog>
    </div>
    <!--批量调转弹框----end-->      

    <!--批量删除弹框----start-->
    <div class="batchDelteBox" v-if="showBatachDelete">
      <el-dialog
        title="批量删除"
        :visible.sync="showBatachDelete"
        append-to-body
        width="40%"
      >
        <batch-delete-cmp></batch-delete-cmp>
      </el-dialog>
    </div>
    <!--批量删除弹框----end-->   
    

    <!--批量修改员工弹框----start-->
    <div class="batchDelteBox" v-if="showBatchEditEmp">
      <el-dialog
        title="批量修改"
        :visible.sync="showBatchEditEmp"
        append-to-body
        width="40%"
      >
        <batch-edit-cmp></batch-edit-cmp>
      </el-dialog>
    </div>
    <!--批量修改员工弹框----end-->      

    <!--批量新增员工弹框----start-->
    <div class="batchDelteBox" v-if="showBatchAddEmp">
      <el-dialog
        title="批量新增"
        :visible.sync="showBatchAddEmp"
        append-to-body
        width="40%"
      >
        <batch-add-cmp></batch-add-cmp>
      </el-dialog>
    </div>
    <!--批量新增员工弹框----end-->     

    <!--批量导出员工弹框----start-->
    <div class="batchDelteBox" v-if="showBatchExportEmp">
      <el-dialog
        title="批量导出"
        :visible.sync="showBatchExportEmp"
        append-to-body
        width="40%"
      >
        <batch-export-cmp></batch-export-cmp>
      </el-dialog>
    </div>
    <!--批量导出员工弹框----end-->         

    <!--批量设置员工模板弹框----start-->
    <div class="batchDelteBox" v-if="showBatchSetEmpTemplate">
      <el-dialog
        title="批量设置员工模板"
        :visible.sync="showBatchSetEmpTemplate"
        append-to-body
        width="40%"
      >
        <batch-set-emp-template-cmp></batch-set-emp-template-cmp>
      </el-dialog>
    </div>
    <!--批量设置员工模板弹框----end-->             


  </div>  
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getPageList } from '@/api/employee'
  // import CommonInput from '@/base/Common-input/Common-input'
  // import CommonSelect from '@/base/Common-select/Common-select'
  import AddEmpCmp from '@/components/employee/employeeList/addEmpCmp'

  import CommonTableInfo from '@/components/employee1/employeeManage/empManage-cmp/Common-tableInfo-cmp'
  import TabItem from '@/components/employee1/employeeManage/empManage-cmp/TabInfo-cmp'
  import JobRecord from '@/components/employee1/employeeManage/empManage-cmp/JobRecord-tableInfo-cmp'
  import Contract from '@/components/employee1/employeeManage/empManage-cmp/Contract-tableInfo-cmp'
  import ChildrenEducation from '@/components/employee1/employeeManage/empManage-cmp/ChildrenEducation-tableInfo-cmp'
  import ContinueEducation from '@/components/employee1/employeeManage/empManage-cmp/ContinueEducation-tableInfo-cmp'
  import Family from '@/components/employee1/employeeManage/empManage-cmp/Family-tableInfo-cmp'
  import HomeLoans from '@/components/employee1/employeeManage/empManage-cmp/HomeLoans-tableInfo-cmp'
  import HomeRent from '@/components/employee1/employeeManage/empManage-cmp/HomeRent-tableInfo-cmp'
  import Illness from '@/components/employee1/employeeManage/empManage-cmp/Illness-tableInfo-cmp'
  import SupportOlder from '@/components/employee1/employeeManage/empManage-cmp/SupportOlder-tableInfo-cmp'
  import Bank from '@/components/employee1/employeeManage/empManage-cmp/Bank-tableInfo-cmp'
  import SearchTools from '@/components/employee1/employeeManage/empManage-cmp/SearchTools-cmp'
  import BatchJoinJobCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchJoinJob-cmp'
  import BatchLeaveJobCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchLeaveJob-cmp'
  import BatchSwitchCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchSwitch-cmp'
  import BatchTurnCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchTurn-cmp'
  import BatchDeleteCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchDelete-cmp'
  import BatchEditCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchEdit-cmp'
  import BatchAddCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchAdd-cmp'
  import BatchExportCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchExport-cmp'
  import BatchSetEmpTemplateCmp from '@/components/employee1/employeeManage/empManage-cmp/BatchSetEmpTemplate-cmp'

  import { scrollAnimation } from '@/utils/scrollAnimation.js'


  import { PaEmployeeManageMixin } from '@/utils/PA-mixins.js'

  export default {
    mixins: [ PaEmployeeManageMixin ],
    components: {
      CommonTableInfo,
      AddEmpCmp,
      TabItem,
      JobRecord,
      Contract,
      ChildrenEducation,
      ContinueEducation,
      Family,
      HomeLoans,
      HomeRent,
      Illness,
      SupportOlder,
      Bank,
      SearchTools,
      BatchJoinJobCmp,
      BatchLeaveJobCmp,
      BatchSwitchCmp,
      BatchTurnCmp,
      BatchDeleteCmp,
      BatchEditCmp,
      BatchAddCmp,
      BatchExportCmp,
      BatchSetEmpTemplateCmp
    },
    data () {
      return {
        tabList: [],
        addEmpCmpVisible: false,
        activeName: 'second',
        tableCode: 'PAR80001',
        filterParam: {},
        queryObj: {
          PageIndex: 1,
          PageSize: 10
        },
        currentTableStr: 'JobRecord',  // 当前table表格数据的类别
        showSearchCmp: false,  // 控制搜索组件的显示/隐藏
        showMoreSearchConditions: [
          {
            label: "字段1",
            value: "one",
          },
          {
            label: "字段2",
            value: "two",
          }
        ], // 搜索组件中的更多搜索条件
      }
    },
    created () {
      this._getPageList()
    },
    methods: {
      clickBtn(){
      //获取当前document的上滚长度
      const currentY = document.documentElement.scrollTop || document.body.scrollTop
        scrollAnimation(currentY, 0)         
      },
      // 根据列表Code和查询条件获取数据
      _getPageList () {
        getPageList(this.tableCode, this.filterParam, this.queryObj.PageIndex, this.queryObj.PageSize).then(res => {
          if (res.data.State === REQ_OK) {

          }
        })
      },
      // 点击待入职员工
      joinWaitEmployee () {
        this.$router.push({path:'/employee/employeeManage/waitEmployee'})
      },
      // 点击 离职员工
      joinLeavedEmployee () {
        this.$router.push({path:'/employee/employeeManage/leavedEmployee'})
      },
      // 新增员工
      handleAddEmp () {
        this.addEmpCmpVisible = true
      },
      handleCancelAddEmp () {
        this.addEmpCmpVisible = false
      },
      handleClick (tab, event) {
        // console.log(tab, event)
      },
      // 切换 tabitem 标签btn 
      selectTabitem (str) {
        debugger
        this.currentTableStr = str
        switch (str) {
          // 在职记录
          case 'JobRecord':
            break;
          // 合同信息
          case 'Contract':
            break;
          // 银行信息
          case 'Bank':
            break;
          // 家庭成员
          case 'Family':
            break;
          // 子女教育
          case 'childrenEducation':
            break;
          // 继续教育
          case 'ContinueEducation':
            break;
          // 大病
          case 'Illness':
            break;
          // 住房贷款
          case 'HomeLoans':
            break;     
          // 住房租金
          case 'HomeRent':
            break;  
          // 赡养老人
          case 'SupportOlder':
            break;                                                                                                         
        }
      },
      // 点击 删选显示搜索组件
      handlerShowSearchcmp() {
        debugger
        this.showSearchCmp = true
      }
    }
  }
</script>

