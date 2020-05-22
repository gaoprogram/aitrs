
<!--
  User: gaol
  Date: 2019/10/14
  功能：平台系统设置——版本套包-套包
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.package
  padding 0 20px
  box-sizing border-box
</style>

<template>
  <div class="package">
    平台系统设置——版本套包-套包

    <div class="topBox clearfix marginB10">
      <el-button type="primary" size="mini" style="float:right">新增</el-button>
    </div>

    tableData: {{tableData}}
    <div :class="['tableBox', tableData.length<=0? 'not_found':'']">
      <el-table
        :data="tableData"
        style="width: 100%"
        empty-text=" "
        border
      >
        <el-table-column
          prop="packageName"
          label="套包名"
        >
            
        </el-table-column>

        <el-table-column
          prop="range"
          label="包含"
        >

        </el-table-column>         

        <el-table-column
          prop="packageDiscount"
          label="套包折扣"
        >

        </el-table-column>                      


        <el-table-column
          prop="remark"
          label="说明"
        >

        </el-table-column> 

        <el-table-column
          prop="status"
          label="状态"
        >

        </el-table-column>                 


        <el-table-column
          prop="creatTime"
          label="创建日期"
        >

        </el-table-column>  

        <el-table-column
          prop="refreshTime"
          label="更新日期"
        >

        </el-table-column>  


        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope>
              <el-button type="text">编辑</el-button>
              <el-button type="text">启用</el-button>
              <el-button type="text">停用</el-button>
              <el-button type="text">包含</el-button>
          </template>
        </el-table-column> 
      </el-table>
      
      <!--分页部分-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryObj.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>      
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    GetModuleList
  } from '@/api/systemManage'
  export default {
    data(){
      return {
        loading: false, 
        total: 0,
        queryObj: {
          pageSize: 10,
          pageNum: 1
        },
        tableData: [
          // {
          //   packageName: '套餐包一',
          //   range: '组织初级;考勤中级',
          //   packageDiscount: '7折',
          //   remark: '说明内容',
          //   status: '停用',
          //   creatTime: '2019-10-19',
          //   refreshTime: '2019-10-08'
          // }
        ]
      }
    },
    created(){
      this._getProductModuleVerMgt()
    },
    methods: {
      _getComTables(){
        this._getProductModuleVerMgt()
      },
      _getProductModuleVerMgt(){
        this.loading = true
        GetModuleList().then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.data
            this.total = res.data.DataCount
          }else {
            this.$message({
              type: 'error',
              message: `获取套包版本数据失败,${res.data.Error}`
            })
          }
        })
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

