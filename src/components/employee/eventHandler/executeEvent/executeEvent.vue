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

    <div class="searchBox marginB10">
      <search-tool-cmp></search-tool-cmp>
    </div>
    
    <event-excute-list-cmp></event-excute-list-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchToolCmp from './executeEvent-cmp/searchTool-cmp'
  import EventExcuteListCmp from './executeEvent-cmp/eventExcuteList-cmp'
  import { 
    REQ_OK  
  } from '@/api/config'
  export default {
    components: {
      SearchToolCmp,
      EventExcuteListCmp,
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


