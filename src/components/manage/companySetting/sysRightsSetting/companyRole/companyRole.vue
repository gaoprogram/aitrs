<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统权限-企业角色
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.companyRole
  padding 0 20px
  box-sizing border-box
</style>
<template>
  <div class="companyRole">
    <company-role-cmp></company-role-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import CompanyRoleCmp from '@/components/manage/userManage/userRole/roleManage/commonRoleManage'
  import { REQ_OK } from '@/api/config'
  import {
    SetSysCompanyState
  } from '@/api/systemManage'
  export default {
    components: {
      CompanyRoleCmp
    },
    data(){
      return {
        loading: false,
        currentRowObj: {}
      }
    },
    methods: {
      _getComtables(){

      },
      // 设置状态  
      _SetSysCompanyState(type){
        let text = type == 1? '激活': '冻结'
        SetSysCompanyState().then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success(`${text}成功`)
            this._getComtables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        })
      }
    },
  }
</script>
