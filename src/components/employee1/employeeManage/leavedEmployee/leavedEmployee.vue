<!--
  User: gaol
  Date: 2019/8/9
  功能：员工管理--离职员工
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .leavedEmployee 
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
  <div class="leavedEmployee">
   <div class="topContainer">
      <span class="tip">240人离职</span>
      <el-button type="primary" size="mini" @click="joinedEmployee">在职员工</el-button>
      <el-button type="primary" size="mini" @click="joinWaitedEmployee">待入职员工</el-button>
    </div>

    <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="table-tab-container">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs> -->

    <!--tab标签----start--->
    <!-- <div class="tabBox">
      <tab-item @selectTabitem = "selectTabitem"></tab-item>
    </div> -->

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
        <!-- currentTableStr: {{currentTableStr}} -->
        <!---离职员工---->
        <div class="leavedEmpBox" v-show="currentTableStr === 'JobRecord'">
          离职员工
          <!-- <job-record></job-record> -->
          <common-tableinfo-cmp></common-tableinfo-cmp>
        </div>

        <!---合同信息---->
        <div class="ContractBox" v-show="currentTableStr === 'Contract'">
          合同信息
          <contract></contract>
        </div>

        <!---银行信息---->
        <div class="BankBox" v-show="currentTableStr === 'Bank'">
          银行信息
          <bank></bank>
        </div>

        <!---家庭成员---->
        <div class="FamilyBox" v-show="currentTableStr === 'Family'">
          家庭成员
          <family></family>
        </div>

        <!---子女教育---->
        <div class="childrenEducationBox" v-show="currentTableStr === 'childrenEducation'">
          子女教育
          <children-education></children-education>
        </div>

        <!---继续教育---->
        <div class="ContinueEducationBox" v-show="currentTableStr === 'ContinueEducation'">
          继续教育
          <continue-education></continue-education>
        </div>

        <!---大病---->
        <div class="Illenss" v-show="currentTableStr === 'Illness'">
          大病
          <illness></illness>
        </div>

        <!---住房贷款---->
        <div class="HomeLoansBox" v-show="currentTableStr === 'HomeLoans'">
          住房贷款
          <home-loans></home-loans>
        </div>       

        <!---住房租金---->
        <div class="HomeRentBox" v-show="currentTableStr === 'HomeRent'">
          住房租金
          <home-rent></home-rent>
        </div>    

        <!---赡养老人---->
        <div class="SupportOlderBox" v-show="currentTableStr === 'SupportOlder'">
          赡养老人
          <support-older></support-older>
        </div>    
                                                                        
    </div>
    <!---table数据---end--->

    <div class="table-content-container">
      <div class="fn-btn-container">
        <el-button type="primary" @click="handleAddEmp()" size="small">新增员工</el-button>
        <el-button style="margin-left: 0" size="small">直接入职</el-button>
        <el-dropdown size="small" split-button trigger="hover">
          更多
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>批量离职</el-dropdown-item>
            <el-dropdown-item>批量转正</el-dropdown-item>
            <el-dropdown-item>批量调转</el-dropdown-item>
            <el-dropdown-item>批量删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="small" split-button trigger="hover">
          导入导出
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>批量新增员工</el-dropdown-item>
            <el-dropdown-item>批量修改</el-dropdown-item>
            <el-dropdown-item>批量导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="table-content">
      </div>
    </div>

    <!-----添加员工的dialog--start-->
    <template v-if="addEmpCmpVisible">
      <add-emp-cmp class="" @handleCancelAddEmp="handleCancelAddEmp" v-if="addEmpCmpVisible"></add-emp-cmp>
    </template>
    <!-----添加员工的dialog--end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getPageList } from '@/api/employee'
  // import CommonInput from '@/base/Common-input/Common-input'
  // import CommonSelect from '@/base/Common-select/Common-select'
  import AddEmpCmp from '@/components/employee/employeeList/addEmpCmp'


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
  import CommonTableinfoCmp from '@/components/employee1/employeeManage/empManage-cmp/Common-tableInfo-cmp'

  import SearchTools from '@/components/employee1/employeeManage/empManage-cmp/SearchTools-cmp'

  import { PaEmployeeManageMixin } from '@/utils/PA-mixins.js'

  export default {
   mixins: [ PaEmployeeManageMixin ],
   components: {
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
      CommonTableinfoCmp
    },
    data () {
      return {
        tabList: [],
        addEmpCmpVisible: false,
        activeName: 'second',
        tableCode: 'PAR80001',
        filterParam: {},
        PageIndex: 1,
        PageSize: 10,

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
      debugger
      this._getPageList()
      this.$nextTick(() => {
        console.log(this.$route.query.id)
      })
    },
    methods: {
      // 根据列表Code和查询条件获取数据
      _getPageList () {
        getPageList(this.tableCode, this.filterParam, this.PageIndex, this.PageSize).then(res => {
          if (res.data.State === REQ_OK) {
          }

        })
      },
      // 点击待入职员工
      joinWaitEmployee () {
        this.$router.push({path:'/employee/employeeManage/waitEmployee'})
      },
      // 点击 在职员工
      joinedEmployee () {
        this.$router.push({path:'/employee/employeeManage/joinedEmployee'})
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

