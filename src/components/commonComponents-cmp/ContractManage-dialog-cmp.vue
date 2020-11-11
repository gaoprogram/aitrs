<!--
  User: gaol
  Date: 2020/1/3
  功能： 员工详情页面中 点击 【合同管理】弹框 
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="contractManageDialog-cmp" v-loading= 'loading'>
    <contract-manage-info-cmp
      :showCommonDialog.sync="showCommonDialog"
      :empObj="empObj"
      :empInfo="empInfo"
    ></contract-manage-info-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import ContractManageInfoCmp from './ContractManageInfo-cmp'
  import { REQ_OK } from '@/api/config'
  import { parseTime } from '@/filters/index'
  import { 

  } from '@/api/employee' 
  import { PaGetDicDataSourceList } from '@/api/dic'

  // 员工类型
  const DicType_empType = 'SYS'
  const DicCode_empType = 'EmpType'

  // 员工状态
  const DicType_empStatus = 'CUS'
  const DicCode_empStatus = 'EmpStatus'   
  export default {
    props: {
      showCommonDialog: {
        type: Boolean,
        default: false
      },
      empObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 员工头像、级别等信息
      empInfo: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components:{
      SaveFooter,
      ContractManageInfoCmp
    },
    data(){
      return {
        loading: false,       
      }
    },
    created() {
        debugger

    },
    watch: {
      dialogVisible: {
        handler(newValue, oldValue){
          debugger
          this.$emit("update:showCommonDialog", newValue)
        }
      }
    },
    methods: {
       
    }
  }
</script>
