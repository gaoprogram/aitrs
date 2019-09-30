<!--
  User: gaol
  Date: 2019/8/9
  功能:  合同提醒 组件
-->

<template>
  <div class="contractRemind-cmp" v-loading = "loading">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="试用期" name="first">试用期</el-tab-pane>
        <el-tab-pane label="试用期延长" name="second">试用期延长</el-tab-pane>
        <el-tab-pane label="合同到期" name="third">合同到期</el-tab-pane>
    </el-tabs>

    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>

        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>

        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
    </el-table>

    <!--分页--start-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryObj.total">
    </el-pagination>    
    <!---分页----end--->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
        return {
            loading: false, 
            activeName: 'first',
            queryObj: {
                pageSize: 10,
                pageNum: 1,
                total: 9999999
            },
            tableData: [{
                date: '2016-05-02',
                name: 'wang',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]            
        }
    },
    methods: {
      // 获取表格数据
      _getComTables(){

      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getComTables()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getComTables()
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
