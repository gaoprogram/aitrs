<!--
  User: gaol
  Date: 2020/1/3
  功能： 员工详情页面中 点击 【合同管理】 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
  <div class="contractManage-cmp" v-loading= 'loading'>
    <!-- empInfo: {{empInfo}} -->
    <emp-avatar-info-cmp 
        :isContractManageDetail="true"
        :empInfo="empInfo"
    >
    </emp-avatar-info-cmp>

    <div class="tabBox">
        <tab-info-cmp
            @selectTabitem = "selectTabitem" 
            :tabList="tabsList">
        </tab-info-cmp>
    </div>

    <div class="contractContentBox">
        
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import EmpAvatarInfoCmp from '@/components/commonComponents-cmp/contractManageDetailAvatar-cmp'
  import TabInfoCmp from './ContractManageTabs-cmp'
//   import TabInfoCmp from '../../contractManage/contractManage-cmp/Tabs-cmp'
  import { REQ_OK } from '@/api/config'
  import { parseTime } from '@/filters/index'
  import { 
      getContractType
   } from '@/api/employee' 
  import { PaGetEmpDataSourceList } from '@/api/dic'

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
      EmpAvatarInfoCmp,
      TabInfoCmp
    },
    data(){
        return {
            loading: false,
            dialogVisible: this.showCommonDialog, 
            tabsList: [],
            currentTabStrIndex: 0,
            currentTabData: {}     
        }
    },
    created() {
        debugger
        // 获取 员工的分类
        this._getContractType()
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
      // 切换 tabitem 标签btn 
      selectTabitem (index, obj) {
        debugger
        this.currentTabStrIndex = index
        this.currentTabData = obj
      }, 
      // 获取合同类型
      _getContractType() {
        getContractType().then(res => {
          if(res && res.data.State === REQ_OK){
            this.tabsList = res.data.Data
            this.currentTabData = res.data.Data[0]
          }else {
            this.$message.error(`获取合同类型数据失败,${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.warning("获取合同类型数据出错了")
        })
      },   
    }
  }
</script>
