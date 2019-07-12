<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示支流状态
-->

<template>
  <div :class="['branchStatus-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <!-- 这是 显示 支流的 页面
    这是 workId ： {{workId}}
    这是minxin中的获取的 显示返回的数据： mixinsDataRes: {{mixinsDataRes}} -->
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      empty-text=' '>
      <el-table-column
        type="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="FlowName"
        label="节点"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="TodoEmps"
        label="处理人"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="StarterName"
        label="组织"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="WFStateText"
        label="状态"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="RDT"
        label="处理时间"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.RDT | replaceTime }}</span>
        </template>      
      </el-table-column>   
      <el-table-column
        prop="address"
        label="操作"
        width="200">
        <template>
          <el-button type="primary" size="mini">查看</el-button>
          <el-button type="danger" size="mini">终止</el-button>
          <!-- <span scope-slot="" style="color: #13ce66" >查看</span>
          <span scope-slot="" style="color: #ff4949">终止</span> -->
        </template>
      </el-table-column>                       
    </el-table>      
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { flowCommonFnRightFixed } from '@/utils/mixin'
  export default {
    mixins: [flowCommonFnRightFixed],
    components: {},
    data () {
      return {
        mixinsDataRes: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    props: {
      workId: {
        type: String,
        default: ''
      },
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [String,Number],
        default: ''
      }
    },
    created () {
      // 获取支流状态
      this._showInfluentState()
    },
    mounted () {
      // console.log(this.mixinsDataRes)
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  >>>.el-table__body-wrapper
    min-height 350px
  .branchStatus-container
    min-height 350px
  
</style>

