<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示相关流程
-->

<template>
  <div :class="['relatedProcess-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <!-- 这是 显示 相关流程的 页面  nodeId: {{nodeId}} -->
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      row-class-name="tableRowClassName"
      empty-text=" ">
      <el-table-column
        prop="FlowName"
        label="流程名"
        width="150"
        sortable
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="发起人"
        sortable
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.StarterName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="DeptName"
        label="部门"
        width="80"
        sortable
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="Title"
        label="标题"
        width="100"
        sortable
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="WFStateText"
        label="状态"
        width="80"
        sortable
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop="RDT"
        label="创建日期"
        width="120"
        sortable
        show-overflow-tooltip="">
        <template slot-scope="scope">
          <span>{{scope.row.RDT | replaceTime }}</span>
        </template>
      </el-table-column>
    </el-table>       
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    cc
  } from '@/api/approve'
 import { flowCommonFnRightFixed } from '@/utils/mixin'
  export default {
    mixins: [flowCommonFnRightFixed],
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      }, 
      nodeId: {
        type: [String,Number],
        default: ''
      }     
    },
    data () {
      return {

      }
    },
    components: {
 
    },    
    created () {
      // 获取相关流程
      this._showRelatedFlow()
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relatedProcess-container
    min-height 150px
</style>
