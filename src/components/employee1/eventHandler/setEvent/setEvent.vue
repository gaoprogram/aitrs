<!--
  User: gaol
  Date: 2019/8/9
  功能：事件处理器 - 事件管理
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
      <search-tool-cmp
        @clickSearchBtn="clickSearchBtn"
      >
      </search-tool-cmp>
    </div>
    <!--头部区域---end-->

    <!--table表格区域---start-->
    <!-- tableData: {{tableData}} -->
    <div class="top marginB10 clearfix">
      <el-button 
        type="primary" 
        size="mini" 
        style="float:right"
      >执行</el-button>      
    </div>

    <div :class="tableData.length<=0? 'not_found': ''">
      <el-table
        :data="tableData"
        max-height="500"
        empty-text=" "
        border
      >
        <el-table-column
          width="50px"
          type="selection"
        >
        </el-table-column>

        <el-table-column
          label="事件码"
          prop="EventCode"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="对象名称"
          prop="TargetName"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="事件名称"
          prop="EventName"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="事件原因"
          prop="EventReason"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="操作人"
          prop="OP"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          label="操作时间"
          prop="OPDate"
          show-overflow-tooltip
        >
        </el-table-column>      

        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button 
              type="text" 
              @click.native="handleScan(scope.row)"
            >查看</el-button>
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
        <set-event-scan ref="executeEventScan"></set-event-scan>
      </el-dialog>
    </div>
    <!---查看dialog-end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchToolCmp from './setEvent-cmp/searchTool-cmp'
  import SetEventScan from './setEvent-cmp/setEvent-scan'
  import { 
    REQ_OK  
  } from '@/api/config'
  import {
    getExcutEventList
  } from '@/api/employee'
  export default {
    components: {
      SearchToolCmp,
      SetEventScan
    },
    data(){
      return {
        loading: false, 
        showScanDialog: false,  // 控制查看 dialog的显示/隐藏  
        tableData:[], // table表格数据集合
        queryObj:{
          KeyWord: '',  //关键词
          EventCode: '', // 事件码
          OPDateFrom: '', // 起始操作时间
          OPDateTo: '', // 结束操作时间
          OP: '', // 操作人
          State: '' // 状态，多选 0未执行 1已执行 -1执行失败
        }   
      }
    },
    created(){
      this._getComTables()
    },
    methods: {
      _getComTables(){
        this._getExcutEventList()
      },
      // 获取可执行的事件列表
      _getExcutEventList(data){
        this.loading = true
        getExcutEventList(JSON.stringify(data)).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
            this.tableData = res.data.Data
          }else {
            this.$message.error(`获取可执行事件列表失败,${res.data.Error}`)
          }
        })
      },
      // 查看
      handleScan(obj){
        this.showScanDialog = true
      },
      clickSearchBtn(obj){
        debugger
        Object.assign(this.queryObj, obj)
        this._getExcutEventList(this.queryObj)
      },
    },
  }
</script>


