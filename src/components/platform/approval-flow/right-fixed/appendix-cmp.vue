<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示相关附件
-->

<template>
  <div :class="['appendix-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    这是 显示附件 的页面  
    <!-- $attrs: {{$attrs}} -->
    <!-- rightContentCurrentStr: {{rightContentCurrentStr}} -->
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      empty-text=" ">
      <el-table-column
        prop="date"
        label="资源名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建日期">
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
    },
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]  
      }
    },
    components: {
 
    },    
    created () {
      // 获取相关附件
      this._showAttachment()      
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {    
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }     
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .appendix-container
    min-height 350px
  >>>.el-table__body-wrapper
    min-height 350px
</style>
