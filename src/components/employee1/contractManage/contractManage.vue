<!--
  User: gaol
  Date: 2019/8/9
  功能：员工-合同管理
-->

<template>
  <div class="contractManage">
    <!-- <router-view></router-view> -->
    <employee-cmp></employee-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
    PA_PAGECODE_JOINEDEMPLOYEE, 
    PA_PAGECODE_WAITEDEMPLOYEE,
    PA_PAGECODE_LEAVEDEMPLOYEE,
    PA_PAGECODE_CONTRACTMANAGE
  } from '@/api/config'
  import EmployeeCmp from '@/components/employee1/employeeManage/empManage-cmp/CommonEmpPage-cmp'
  export default {
    props: {
      Pcode: {
        type: String,
        default: PA_PAGECODE_CONTRACTMANAGE
      }
    },
    components: {
      EmployeeCmp
    },
    data(){
      return {

      }
    },
    computed: {
      
    },
    created(){
      debugger
      this._setPageCode(this.Pcode)
    },
    methods: {
      // 将该页面的pageCode传到 全局中存储
      _setPageCode(pageCode){
        debugger
        if(pageCode){
          this.$store.dispatch('setCurrentPageCode', pageCode)
        }
      }      
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
