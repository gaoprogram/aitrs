<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 批量事件导入
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.batchEventsImport
  padding 0 20px 
  box-sizing border-box
</style>

<template>
  <div class="batchEventsImport">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="批量组织事件" name="first">批量组织事件</el-tab-pane>
        <el-tab-pane label="批量职务事件" name="second">批量职务事件</el-tab-pane>
        <el-tab-pane label="批量职位事件" name="third">批量职位事件</el-tab-pane>
        <el-tab-pane label="批量员工事件" name="fourth">批量员工事件</el-tab-pane>
      </el-tabs>     
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        activeName: 'first'
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
