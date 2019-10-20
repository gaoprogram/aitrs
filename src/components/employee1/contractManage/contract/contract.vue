<!--
  User: gaol
  Date: 2019/8/9
  功能：合同管理-合同管理
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.contract
  padding 0 20px 
  box-sizing border-box
</style>

<template>
  <div class="contract" v-loading = "loading">
    <div class="contractBtnBox clearfix">
      <el-button 
        class="rt marginB10"
        type="primary" 
        size="mini" 
        @click.native="handleContractBtn"
      >
      合同管理
      </el-button>
    </div>
    <common-table-cmp></common-table-cmp>

    <!--合同管理弹框---start--->
    <div class="contractDialog" v-if="showContractDialog">
      <el-dialog
        title="合同管理"
        width="30%"
        append-to-body
        :visible.sync="showContractDialog"
      >

      </el-dialog>
    </div>
    <!------合同管理弹框-----end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonTableCmp from '@/components/employee1/employeeManage/empManage-cmp/Common-tableInfo-cmp'
  export default {
    components: {
      CommonTableCmp
    },
    data(){
      return {
        loading: false, // 控制loading的状态
        showContractDialog: false, // 控制合同管理的弹框显示/隐藏
      }
    },
    created(){
      // this.loading = true
      // 请求获取合同管理的接口
    },
    methods: {
      // 合同管理
      handleContractBtn(){
        this.showContractDialog = true
      }
    }
  }
</script>

