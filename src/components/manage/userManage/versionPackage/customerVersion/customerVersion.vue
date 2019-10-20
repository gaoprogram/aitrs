
<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——版本套包-客户版本
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.customerVersion
  padding 0 20px
  box-sizing border-box
</style>
<template>
  <div class="customerVersion">
    平台系统设置——版本套包-客户版本

    <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
      <el-tab-pane label="有效" name="first">有效</el-tab-pane>
      <el-tab-pane label="过期" name="second">过期</el-tab-pane>
      <el-tab-pane label="全部" name="third">全部</el-tab-pane>
    </el-tabs>

    <div class="topBox clearfix marginB10">
      <el-button 
        style="float:right;margin-left: 10px"
        type="primary" 
        size="mini">新增</el-button>
      <el-button 
        style="float:right"
        type="primary" 
        size="mini">导出</el-button>
    </div>

    <el-table
      :data="tableData"
      border
    >

      <el-table-column
        type="selection"
        width="50"
      >
      </el-table-column>

      <el-table-column
        prop="companyNo"
        label="企业号"
      >
      </el-table-column>

      <el-table-column
        prop="companyName"
        label="企业名称"
      >
      </el-table-column>   

      <el-table-column
        prop="package"
        label="套包"
      >
      </el-table-column> 

      <el-table-column
        prop="moduleVersion"
        label="模块版本"
      >
      </el-table-column>       

      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
        </template>
      </el-table-column>   
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        activeName: 'first',
        tableData: [
          {
            companyNo: 2019,
            companyName: '阿里巴巴',
            package: '套包一',
            moduleVersion: '组织中级，考勤初级'
          },
        ]
      }
    },
    methods: {
      // 切换tabs
      handleClickTabs(tab, event){

      }
    },
  }
</script>

