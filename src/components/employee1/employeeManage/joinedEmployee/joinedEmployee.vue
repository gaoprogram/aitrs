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



    <!--table数据-----start--->
    <div class="tablecontent">
        currentTableStr: {{currentTableStr}}
        <!---在职记录---->
        <template v-show="currentTableStr === 'JobRecord'">
          <job-record></job-record>
        </template>

        <!---合同信息---->
        <template v-show="currentTableStr === 'Contract'">
          <contract></contract>
        </template>

        <!---银行信息---->
        <template v-show="currentTableStr === 'Bank'">
          <bank></bank>
        </template>

        <!---家庭成员---->
        <template v-show="currentTableStr === 'Family'">
          <family></family>
        </template>

        <!---子女教育---->
        <template v-show="currentTableStr === 'childrenEducation'">
          <chileren-education></chileren-education>
        </template>

        <!---继续教育---->
        <template v-show="currentTableStr === 'ContinueEducation'">
          <continue-education></continue-education>
        </template>

        <!---大病---->
        <template v-show="currentTableStr === 'Illness'">
          <illness></illness>
        </template>

        <!---住房贷款---->
        <template v-show="currentTableStr === 'HomeLoans'">
          <home-loans></home-loans>
        </template>       

        <!---住房租金---->
        <template v-show="currentTableStr === 'HomeRent'">
          <home-rent></home-rent>
        </template>    

        <!---赡养老人---->
        <template v-show="currentTableStr === 'SupportOlder'">
          <support-older></support-older>
        </template>    
                                                                        
    </div>
    <!---table数据---end--->
    <div class="search-container">
      <el-input placeholder="请输入内容" v-model="input5" debounce clearable class="input-with-select" style="width: 500px">
        <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="筛选" placement="bottom">
          <el-button icon="el-icon-share"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="清空" placement="bottom">
          <el-button icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-button-group>
    </div>


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

  export default {
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
      Bank
    },
    data () {
      return {
        tabList: [],
        addEmpCmpVisible: false,
        activeName: 'second',
        input5: '',
        tableCode: 'PAR80001',
        filterParam: {},
        PageIndex: 1,
        PageSize: 10,

        currentTableStr: '',  // 当前table表格数据的类别
      }
    },
    created () {
      this._getPageList()
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
      }

    }
  }
</script>

