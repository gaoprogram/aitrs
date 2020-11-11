<!--
  User: gaol
  Date: 2019/10/20
  功能：员工-电脑审批-申请查询
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.applyQuery
  padding 0 20px
</style>
<template>
  <div class="applyQuery">
    审批信息
    <el-tabs v-model="activeName" @tab-click="handleClickTabs">
      <el-tab-pane label="审批中" name="first">审批中</el-tab-pane>
      <el-tab-pane label="审批通过" name="second">审批通过</el-tab-pane>
      <el-tab-pane label="审批拒绝" name="third">审批拒绝</el-tab-pane>
      <el-tab-pane label="已撤回" name="fourth">已撤回</el-tab-pane>
      <el-tab-pane label="全部" name="fifth">全部</el-tab-pane>
    </el-tabs>  

    <div class="top marginB10" style="text-align: right">
      <el-button type="primary" size="mini">同意</el-button>
      <el-button type="primary" size="mini">拒绝</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      text-empty=" " 
      style="width:100%"
    >
      <el-table-column
        label="员工号"
        prop="EmpNo"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="员工姓名"
        prop="EmpName"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="模块"
        prop="Module"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="分组"
        prop="EmpGroup"
        sortable
      >
      </el-table-column>

      <el-table-column
        label="提交时间"
        prop="SubmitTime"
        sortable
      >
      </el-table-column>    

      <el-table-column
        label="审核状态"
        prop="ApproveStatus"
        sortable
      >
      </el-table-column>  

      <el-table-column
        label="操作"
      >
        <template>
          <el-button type="text">查看</el-button>
          <el-button type="text">同意</el-button>
          <el-button type="text">拒绝</el-button>
        </template>
      </el-table-column>     

    </el-table>  
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeName: 'first',
        tableData: [
          {
            EmpNo: 30,
            EmpName: '张三',
            Module: '模块一',
            EmpGroup: '分组一',
            SubmitTime: '2019-09-09',
            ApproveStatus: '已审核',
          }
        ]
      }
    },
    methods: {
      handleClickTabs(tab, event) {
        console.log(tab, event);
      }
    },
  }
</script>
