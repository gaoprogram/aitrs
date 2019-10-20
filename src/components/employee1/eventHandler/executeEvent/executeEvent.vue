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
    <!--头部区域---start-->
    <div class="headerBox">
      <search-tool-cmp></search-tool-cmp>
    </div>
    <!--头部区域---end-->

    <!--table表格区域---start-->
    <div class="tableBox">
      <el-button type="primary" size="mini" style="float:right;margin-bottom:10px">执行</el-button>
      <el-table
        :class="eventTableList.length<=0? 'not_found': ''"
        :data="eventTableList"
        style="width: 100%"
        border
      >

        <el-table-column
          width="50px"
          type="selection"
        >
        </el-table-column>

        <el-table-column
          label="事件码"
          prop="eventCode"
          show-overflow-tooltip
          width="200px"
        >
        </el-table-column>

        <el-table-column
          label="对象名称"
          prop="targetName"
          show-overflow-tooltip
          width="200px"
        >
        </el-table-column>

        <el-table-column
          label="事件名称"
          prop="eventtName"
          show-overflow-tooltip
          width="200px"
        >
        </el-table-column>

        <el-table-column
          label="事件原因"
          prop="eventReason"
          show-overflow-tooltip
          width="200px"
        >
        </el-table-column>

        <el-table-column
          label="操作人"
          prop="handlerPeople"
          show-overflow-tooltip
          width="200px"
        >
        </el-table-column>

        <el-table-column
          label="操作时间"
          prop="handlerTime"
          show-overflow-tooltip
          width="200px"
        >
        </el-table-column>      

        <el-table-column
          label="操作"
          prop=""
        >
          <template slot-scope="scope">
            <el-button type="text" @click.native="handleScan(scope.row)">查看</el-button>
          </template>
        </el-table-column>

      </el-table> 
      <!--table表格区域-----end-->
    </div>
    <!--table表格区域--end--->

    <!--查看dialog--start-->
    <div class="scanDialogBox" v-if="showScanDialog">
      <el-dialog
        fullscreen
        title="查看"
        :visible.sync="showScanDialog"
        append-to-body
        :close-on-click-modal="false"
      >
        <execute-event-scan ref="executeEventScan"></execute-event-scan>
      </el-dialog>
    </div>
    <!---查看dialog-end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchToolCmp from './executeEvent-cmp/SearchTool-cmp'
  import ExecuteEventScan from './executeEvent-scan'
  export default {
    components: {
      SearchToolCmp,
      ExecuteEventScan
    },
    data(){
      return {
        loading: false, 
        showScanDialog: false,  // 控制查看 dialog的显示/隐藏
        // table表格数据集合  
        eventTableList:[
          {
            eventCode: '20839-bijkiji-78',  // 对象码
            targetName: '对象名称一',
            eventName: '事件名称一',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '20839-bijkiji-78',  // 对象码
            targetName: '对象名称一',
            eventName: '事件名称一',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '20839-bijkiji-78',  // 对象码
            targetName: '对象名称一',
            eventName: '事件名称一',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '20839-bijkiji-78',  // 对象码
            targetName: '对象名称一',
            eventName: '事件名称一',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          },
          {
            eventCode: '20839-bijkiji-78',  // 对象码
            targetName: '对象名称一',
            eventName: '事件名称一',
            eventReason: '原因一',
            handlerPeople: '张三',
            handlerTime: '2019-06-06',
          }                                        
        ],
      }
    },
    methods: {
      // 查看
      handleScan(obj){
        this.showScanDialog = true
      }
    },
  }
</script>


