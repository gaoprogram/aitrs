<!--
  User: gaol
  Date: 2019/6/2
  功能：管理--平台系统设置-企业信息 
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.companyInfoBox
  padding 0 20px
  box-sizing border-box
</style>

<template>
    <div class="companyInfoBox">
      <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
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
      </div> -->

      <div class="companyBox">
        <company-info-table-cmp 
          ref="companyInfoCmp">
        </company-info-table-cmp>              
      </div>     
    </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getSysCompany } from '@/api/systemManage'
  import CompanyInfoTableCmp from './CompanyInfoTable-cmp'
export default {
  components: {
    CompanyInfoTableCmp
  },
  data(){
    return {    
    }
  },
  created(){
    // this._getInit()
  },
  methods: {
    _getInit(){
      debugger
      console.log(this.$refs)
      
      this.$nextTick(() => {
        this.$refs['companyInfoCmp'].getCompanyInfo()
      })
    },
    // // 分页--每页多少条
    // handleSizeChange (val) {
    //   this.queryObj.pageSize = val
    //   this._getComTables()
    // },
    // // 分页--当前页
    // handleCurrentChange (val) {
    //   this.queryObj.pageNum = val
    //   this._getComTables()
    // },     
    // // 切换tabs
    // handleClickTabs(tab, event){

    // },
    // // 点击 企业名称
    // clickCompanyName(row, column, cell, event){
    //   debugger
    // }
  },
}
</script>



