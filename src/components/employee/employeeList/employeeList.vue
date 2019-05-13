<!--
  User: xxxxxxx
  Date: 2018/10/11
  功能：员工列表
-->

<template>
  <div class="employee_list-container mg-30">
    <div class="child-page-container">
      <el-button type="primary">待入职员工</el-button>
      <el-button type="primary">离职员工</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="table-tab-container">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
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
    <add-emp-cmp class="" @handleCancelAddEmp="handleCancelAddEmp" v-if="addEmpCmpVisible"></add-emp-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getPageList } from '@/api/employee'
  // import CommonInput from '@/base/Common-input/Common-input'
  // import CommonSelect from '@/base/Common-select/Common-select'
  import AddEmpCmp from '@/components/employee/employeeList/addEmpCmp'
  export default {
    data () {
      return {
        addEmpCmpVisible: false,
        activeName: 'second',
        input5: '',
        tableCode: 'PAR80001',
        filterParam: {},
        PageIndex: 1,
        PageSize: 10
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
      // 新增员工
      handleAddEmp () {
        this.addEmpCmpVisible = true
      },
      handleCancelAddEmp () {
        this.addEmpCmpVisible = false
      },
      handleClick (tab, event) {
        // console.log(tab, event)
      }
    },
    components: {
      AddEmpCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .employee_list-container
    .child-page-container
      margin-bottom 20px
    .table-tab-container
      margin-bottom 20px
    .search-container
      margin-bottom 20px
      .el-button-group
        vertical-align: top!important
    .table-content-container
      .fn-btn-container
        text-align right
</style>
