<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统设置-数据库表
-->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.dataBase
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="dataBase" v-loading="loading">
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
        label="数据表码"
        prop="dataCode"
      >
        <template slot-scope="scope">
          <span>{{scope.row.dataCode}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="数据表名"
        prop="dataName"
      >
        <template slot-scope="scope">
          <span>{{scope.row.dataName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
      >
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>            


      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text">启用</el-button>
          <el-button type="text">停用</el-button>
          <el-button type="text">字段设置</el-button>
        </template>
      </el-table-column>     


      </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        loading: false, // loading 状态
        tableData: [
          {
            dataCode: '234-89htttts',
            dataName: '组织基本信息',
            status: '启用'
          },
          {
            dataCode: 'yyyyy-hhhh',
            dataName: '组织基本信息',
            status: '停用'
          },          
        ]
      }
    }
  }
</script>

