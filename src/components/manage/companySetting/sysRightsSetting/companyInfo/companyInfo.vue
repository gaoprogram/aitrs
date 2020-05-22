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
      <div class="containerBox">
        <company-info-cmp></company-info-cmp>
      </div>       
    </div>
</template>

<script type="text/ecmascript-6">
  import CompanyInfoCmp from './companyInfo-cmp/comInfo-cmp'
  import { REQ_OK } from '@/api/config'
  import {
    SetSysCompanyState
  } from '@/api/systemManage'  
  export default {
    components: {
      CompanyInfoCmp
    },
    data(){
      return {   

      }
    },
    methods: {
      _getComtables(){

      },
      // 设置状态  
      _SetSysCompanyState(data, type){
        let text = type == 1? '激活': '冻结'
        SetSysCompanyState(JSON.stringify(data), type).then(res => {
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
