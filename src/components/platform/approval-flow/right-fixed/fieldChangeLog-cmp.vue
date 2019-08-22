<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示表单变更日志
-->

<template>
  <div :class="['fieldChangeLog-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <!-- rightContentCurrentStr： {{rightContentCurrentStr}} -->
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
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryObj.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryObj.total">
      </el-pagination>
    </div>        
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
      obj: {
        type: Object,
        default: () => {
          return {}
        }
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
    watch: {
      'obj.TableCode': {
        handler(newValue, oldValue){
          debugger
          // 如果处在当前 显示变更日志页面
          if( this.rightContentCurrentStr === 'ShowFormChangeLog' ){
            this._showFormChangeLog()
          }
        }
      }
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
    .pagination-container
      margin-top 60px
</style>
