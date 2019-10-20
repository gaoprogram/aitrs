<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统权限-企业角色
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.companyRole
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="companyRole">
      <div class="tabBox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
          <el-tab-pane label="系统企业角色" name="first">系统企业角色</el-tab-pane>
          <el-tab-pane label="企业自定义角色" name="second">企业自定义角色</el-tab-pane>
        </el-tabs>
      </div>

      <div class="topBox clearfix marginB10">
        <el-button 
          style="float:right"
          type="primary" size="mini">导出</el-button>
        <el-button 
          style="float: right;margin-right:10px"
          type="primary" size="mini">复制角色</el-button>
        <el-button 
          style="float:right"
          type="primary" size="mini">新增角色</el-button>
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
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>

        <el-table-column
          label="角色类型"
          prop="roleType"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          prop=""
        >
          <template slot-scope="scope">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">停用</el-button>
            <el-button type="text" size="mini">许可权限</el-button>
            <el-button type="text" size="mini">用户/组</el-button>
            <el-button type="text" size="mini">显示数据</el-button>
          </template>
        </el-table-column>
      </el-table>


      <!-----分页区--start---->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryObj.total">
      </el-pagination>      
      <!--分页区--end-->
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        activeName: 'first',
        queryObj:{
          pageSize: 10,
          pageIndex: 1,
          total: 0
        },
        tableData: [
          {
            roleName: '企业管理员',
            roleType: '角色类型一',
            remark: '备注一',
          },
          {
            roleName: 'HR筹薪管理',
            roleType: '角色类型二',
            remark: '备注',
          },          
        ]
      }
    },
    methods: {
      // 切换tabs
      handleClickTab(tab, event) {
        console.log(tab, event);
      },
      // 分页--每页多少条
      handleSizeChange(val){
        this.queryObj.pageSize = val

      },
      // 分页--当前页
      handleCurrentChange(val){
        this.queryObj.pageIndex = val
      }
    },
  }
</script>
