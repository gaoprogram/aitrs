<!--
  User: gaol
  Date: 2019/8/9
  功能：合同管理-合同提醒
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.contractRemind
  padding 20px
  box-sizing border-box
</style>

<template>
  <div class="contractRemind">
    <div class="containerBox" v-loading="loading">
      <!-- contractTypeList： {{contractTypeList}} -->
      <!-- ---
      contractRemindTypeList: {{contractRemindTypeList}} -->
      <!---合同提醒组件--start-->
      <contract-remind-cmp
        :contractTypeList="contractTypeList"
        :contractRemindTypeList="contractRemindTypeList"
        @clickSearchBtn="clickSearchBtn"
      ></contract-remind-cmp>
      <!--合同提醒组件----end-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ContractRemindCmp from '../contractManage-cmp/ContractRemind-cmp'
  import { REQ_OK } from '@/api/config'
  import { 
    getContractType,
    getContractRemindType,
    getContractRemindList  } from '@/api/employee'
  import { mapGetters } from 'vuex';
  export default {
    components: {
      ContractRemindCmp
    },
    data(){
      return {
        loading: false, // loaging
        contractTypeList: [],  // 合同类型下拉源list数据
        contractRemindTypeList: [], // 合同提醒类型list 数据
      }
    },
    computed: {
      ...mapGetters([
        'contractManagePageCode'
      ])
    },
    created(){
      // 获取合同类型
      this._getContractType()
      // 获取合同提醒类型
      this._getContractRemindType()
    },
    methods: {
      // 获取合同提醒类型
      _getContractRemindType(){
        getContractRemindType().then(res => {
          if(res && res.data.State === REQ_OK){
            this.contractRemindTypeList = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: `获取合同提醒类型数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          // this.$message({
          //   type: 'warning',
          //   message: '获取合同提醒类型数据出错了'
          // })
        })
      },
      // 获取合同类型
      _getContractType(PageCode, ModuleCode){
        getContractType(this.contractManagePageCode, 'PA').then(res => {
          if(res && res.data.State === REQ_OK){
            this.contractTypeList = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: `获取合同类型数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          // this.$message({
          //   type: 'warning',
          //   message: '获取合同类型数据出错了'
          // })
        })
      },

      clickSearchBtn(obj){
        debugger
        this._getContractRemindList(obj)
      },
    }
  }
</script>

