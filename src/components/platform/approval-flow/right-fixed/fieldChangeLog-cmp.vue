<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示表单变更日志
-->

<template>
  <div :class="['fieldChangeLog-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      empty-text=' '>
      <!-- <el-table-column
        type="index"
        label="序号"
      >
      </el-table-column> -->
      <el-table-column
        prop="NodeName"
        label="节点"
        :show-overflow-tooltip="true"
        width="100"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="EmpName"
        label="操作人"
        :show-overflow-tooltip="true"
        width="120"
        sortable
      >
      </el-table-column>

      <el-table-column
        prop="Message"
        label="修改内容"
        :show-overflow-tooltip="true"
        sortable
      >
      </el-table-column>

      <el-table-column
        prop="CreateDate"
        label="修改时间"
        :show-overflow-tooltip="true"
        width="170"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.CreateDate | replaceTime }}</span>
        </template>      
      </el-table-column>  

      <!-- <el-table-column
        prop="address"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="text" size="mini">查看</el-button>
          <el-button type="text" size="mini">终止</el-button>
        </template>
      </el-table-column>                        -->
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
        doc: '',
        loading: false,
        empList: [],
        emps: [],
        depts: [],
        stations: []
      }
    },
    components: {
    },    
    created () {
      //获取表单变更日志
      this._showFormChangeLog()      
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .fieldChangeLog-container
    min-height 200px
    >>>.el-table::before
      height 0 !important    
</style>
