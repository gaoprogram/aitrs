<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 执行事件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.executeEvent
  padding 0 20px
  box-sizing border-box
</style>

<template>
  <div class="executeEvent" v-loading="loading">
    <event-excute-list-cmp></event-excute-list-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import EventExcuteListCmp from '@/components/commonComponents-cmp/eventExcuteList-cmp'
  import { 
    REQ_OK  
  } from '@/api/config'
  export default {
    components: {
      EventExcuteListCmp
    },
    data(){
      return {
        loading: false, 
      }
    },
    created(){
      // this._getComTables()
    },
    methods: {
      _getComTables(){
       
      },
      // 查看
      handleScan(){

      }
    },
  }
</script>


