<!--
  User: gaol
  Date: 2019/8/9
  功能：合同管理-合同提醒
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
  <div class="contractRemind">
    合同管理——合同提醒

    <div class="containerBox">
      <!---合同提醒组件--start-->
      <!-- <contract-remind-cmp></contract-remind-cmp> -->
      <!--合同提醒组件----end-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ContractRemindCmp from '../contractManage-cmp/ContractRemind-cmp'
  export default {
    components: {
      ContractRemindCmp
    },
    data(){
      return {

      }
    }
  }
</script>

