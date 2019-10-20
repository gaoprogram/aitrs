<!--
  User: gaol
  Date: 2019/6/2
  功能：管理--平台系统设置-企业信息
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.companyInfo
  padding 0 20px
  box-sizing border-box
</style>

<template>
    <div class="companyInfo">
      企业-系统权限-企业信息
      <div class="customerVersion">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
          <el-tab-pane label="激活" name="first">激活</el-tab-pane>
          <el-tab-pane label="冻结" name="second">冻结</el-tab-pane>
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
          @cell-click="clickCompanyName"
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
            prop="province"
            label="所属省份"
          >
          </el-table-column>       

          <el-table-column
            prop="city"
            label="所属城市"
          >
          </el-table-column>   

          <el-table-column
            prop="area"
            label="所属区域"
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
          >
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">激活</el-button>
              <el-button type="text">版本</el-button>
            </template>
          </el-table-column>   
        </el-table>
      </div>        
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
            moduleVersion: '组织中级，考勤初级',
            province: '湖北省',
            city: '武汉市',
            area: '洪山区雄楚大道',
            creatTime: '2019-09-09',
            refreshTime: '2019-09-08',
            companyType: '股份制',
            companySize: '3000-200000'
          },
        ]        
      }
    },
    methods: {
      // 切换tabs
      handleClickTabs(tab, event){

      },
      // 点击 企业名称
      clickCompanyName(row, column, cell, event){
        debugger
      }
    },
  }
</script>



