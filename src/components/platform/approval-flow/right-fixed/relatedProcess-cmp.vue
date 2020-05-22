<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示相关流程
-->

<template>
  <div :class="['relatedProcess-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <!-- 这是 显示 相关流程的 页面  nodeId: {{nodeId}} -->
    <!-- userCode: {{userCode}} -->
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      row-class-name="tableRowClassName"
      empty-text=" ">
      <el-table-column
        prop="FlowName"
        label="流程名"
        width="120"
        sortable
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="关联人"
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
        width="100"
        sortable>
        <template slot-scope="scope">
          <span>{{scope.row.RDT | replaceTime }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button v-if="scope.row.UserNo === userCode" sizi="mini" type="text" @click.native="deleteRelatedWork(scope.row)">删除</el-button>
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
      },
      form: {
        type: Object,
        default: () =>{
          return {}
        }
      }     
    },
    data () {
      return {

      }
    },
    components: {
 
    },    
    created () {
      // // 获取相关流程
      this._showRelatedFlow()
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    }, 
    watch: {
      // form: {
      //   handler (newValue, olderValue){
      //     if(newValue){
      //       // form 表单变化后 需要重新获取 相关流程  
      //       this._showRelatedFlow()
      //     }
      //   },
      //   immediate: true,
      //   deep: true
      // }
    },      
    methods: {
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relatedProcess-container
    min-height 200px
    >>>.el-table::before
        height 0 !important    
</style>
