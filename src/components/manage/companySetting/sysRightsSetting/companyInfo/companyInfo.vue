<!--
  User: gaol
  Date: 2019/8/7
  功能：企业-系统权限-企业信息
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.companyInfo
  padding 0 20px
  box-sizing border-box
</style>

<template>
    <div class="companyInfo">
      企业-系统权限-企业信息
      <div class="containerBox">
        <company-info-cmp></company-info-cmp>
      </div>       
    </div>
</template>

<script type="text/ecmascript-6">
  import CompanyInfoCmp from '../../../userManage/companyInfo/companyInfo'
  export default {
    components: {
      CompanyInfoCmp
    },
    data(){
      return {   

      }
    },
    methods: {

    },
  }
</script>
