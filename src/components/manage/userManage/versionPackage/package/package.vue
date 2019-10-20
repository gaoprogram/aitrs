
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

    <el-table
        :data="tableData"
        style="width: 100%"
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        tableData: [
          {
            packageName: '套餐包一',
            range: '组织初级;考勤中级',
            packageDiscount: '7折',
            remark: '说明内容',
            status: '停用',
            creatTime: '2019-10-19',
            refreshTime: '2019-10-08'
          }
        ]
      }
    },
    methods: {
      
    },
  }
</script>

