<!--
  User: gaol
  Date: 2019/8/9
  功能：员工管理--在职员工
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div class="joinedEmployee animated fadeIn">
    <employee-cmp v-atris-authrity-page1-com1-btn1></employee-cmp>
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
  import EmployeeCmp from '@/components/employee/employeeManage/empManage-cmp/CommonEmpPage-cmp'
  export default {
    props: {
      Pcode: {
        type: String,
        default: PA_PAGECODE_JOINEDEMPLOYEE
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
      // 设置 详情页面是 员工详情页面
      this.$store.dispatch("setIsEmpOrContractPage", true)        

      this.$store.dispatch("setAuthorityPageCode","page1")
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

