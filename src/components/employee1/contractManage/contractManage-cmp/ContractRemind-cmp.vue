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
            prop="num"
            label="员工号"
            width="180">
        </el-table-column>

        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>

        <el-table-column
            prop="status"
            label="合同类型"
            width="180">
        </el-table-column>    

        <el-table-column
            prop="startDay"
            label="起始日期"
            width="180">
        </el-table-column>     

        <el-table-column
            prop="endDay"
            label="结束日期"
            width="180">
        </el-table-column>  

        <el-table-column
            prop="surplusDay"
            label="剩余天数"
            width="180">
        </el-table-column>                           

        <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click.native="handleDeal">处置</el-button>
              <el-button type="text" @click.native="handleApproval">发起审批</el-button>
            </template>
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
                num: '20160601',
                name: '小名',
                status: '编制内',
                startDay: '2016-04-05',
                endDay: '2019-05-09',
                surplusDay: '100',
                address: '湖北省武汉市洪山区华中科技大学'
            }, {
                num: '20160602',
                name: '张山',
                status: '编制内',
                startDay: '2016-04-05',
                endDay: '2019-05-09',
                surplusDay: '70',                
                address: '湖北省武汉市洪山区华中科技大学'
            }, {
                num: '20160603',
                name: '李四',
                status: '编制内',
                startDay: '2016-04-05',
                endDay: '2019-05-09',
                surplusDay: '40',                
                address: '湖北省武汉市洪山区华中科技大学'
            }, {
                num: '20160604',
                name: '王五',
                status: '编制内',
                startDay: '2016-04-05',
                endDay: '2019-05-09',
                surplusDay: '200',                
                address: '湖北省武汉市洪山区华中科技大学'
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
      },
      // 处置
      handleDeal() {

      },
      //发起审批
      handleApproval() {
        
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
