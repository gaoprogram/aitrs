<!--
  User: gaol
  Date: 2019/6/12
  功能：我处理的
-->

<template>
  <div class="todo-container mglr-30">
    <tab-router></tab-router>
    <div class="left-container" :class="{'isRight': showRight}">

      <search-cmp
        :isMyDeal="true"
        @handleSearch="handleSearch"
        @exportFlowSelectAll="_exportFlowSelectAll"
        @handleReset="handleReset"
      >
      </search-cmp>
      
      <div class="table-container">
        <div class="tool-btn-container">
          <el-button 
            @click="_exportFlowSelect()" 
            size="mini"
            type="primary"
            :disabled="!multipleSelection.length">
          选中导出
        </el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="审批中" name="first"></el-tab-pane>
          <el-tab-pane label="审批通过" name="second"></el-tab-pane>
          <el-tab-pane label="审批拒绝" name="third"></el-tab-pane>
          <el-tab-pane label="审批已撤回" name="fourth"></el-tab-pane>
          <el-tab-pane label="全部" name="five"></el-tab-pane>
        </el-tabs>
        <div class="table" v-loading="loading">
          <el-table
            ref="multipleTable"
            border
            :data="tableArr"
            tooltip-effect="dark"
            style="width: 100%"
            height="500"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="FlowName"
              label="流程名"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="Title"
              label="标题"
            >   
              <template slot-scope="scope">
                <!-- <el-badge is-dot class="item"> -->
                  <el-button class="share-button" icon=""  disabled style="padding:5px" :type="_EmergencyLevelColor(scope.row.EmergencyLevel)" size="mini" v-text="_EmergencyLevel(scope.row.EmergencyLevel)"></el-button>
                <!-- </el-badge>      -->
                <el-tooltip effect="dark" :content="scope.row.Title">
                  <span>{{scope.row.Title}}</span>                  
                </el-tooltip>           
              </template>  

            </el-table-column>
            <el-table-column
              prop="StarterName"
              label="申请人"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="DeptName"
              label="组织"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="NodeName"
              label="当前节点"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="TodoEmps"
              label="当前处理人"
              width="120"
              sortable>
            </el-table-column>        
            <el-table-column
              prop="WFStateText"
              label="状态"
              width="120"
              sortable>
              <template slot-scope="scope">
                <!-- <el-badge is-dot class="item"> -->
                  <el-button class="share-button" disabled icon="" style="padding:5px" :type="_securityClass(scope.row.SecurityClass)" size="mini" @click="editSecurityClassLevel(scope)" v-text="_securityLevel(scope.row.SecurityClass)"></el-button>
                <!-- </el-badge>      -->
                <el-tooltip effect="dark" :content="scope.row.WFStateText">
                  <span>{{scope.row.WFStateText}}</span>                  
                </el-tooltip>           
              </template>                
            </el-table-column>
            <el-table-column
              prop="BusinessAreaName"
              label="业务领域"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="RDT"
              label="申请时间"
              sortable
              width="150"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.RDT | replaceTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleShowDetail({currentFlow:scope.row, typeStr: 'myApproval'}, scope.$index)"
                >查看
                </el-button>
                <!-- <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'five' || activeName === 'third'"
                  @click="handleFn(scope.row, 'send')"
                >再次提交
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'five' || activeName === 'four'"
                  @click="handleFn(scope.row, 'Delete')"
                >删除
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'five' || activeName === 'first'"
                  @click="handleFn(scope.row, 'UnSend')"
                >撤销
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="queryObj.pageNum"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="queryObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--右侧显示区----start--->
    <div v-if="showRight">
      <right-fixed
        ref="rightFixed"
        @closeRight="closeRight"
        :form="currentForm"
        :loadingProp.sync="rightLoading"
        :ccPk="ccPk"       
        :versionId="versionId"
        @next="next"
        @prev="prev"
        @refreshForm="refreshForm"
      >
      </right-fixed>
    </div>
    <!--右侧显示区----end--->



    <!-- 按钮统一弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
    >
      <component
        :is="currentComponent(str)"
        :flow="currentFlow"
        @DialogCancel="dialogVisible = false"
        @success="handleSuccess"
      ></component>
    </el-dialog>
    <!---->    
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    myJoinFlow
  } from '@/api/approve'
  import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
  import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
  import SearchCmp from '../search-cmp/search-cmp'
  import { flowCommonFn } from '@/utils/mixin'

  export default {
    mixins: [flowCommonFn],
    data () {
      return {
        keyWord: '',
        activeName: 'five',
        queryObj: {
          key: '',
          no: '',
          flowSortNo: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          wfSta: -1,
          pageSize: 10,
          pageNum: 1
        },
        tableArr: [],
        total: 0
      }
    },
    created () {
      // 接收 rightfixed 中改变节点后，从新调用getform后，将结果返回来 改变 currentform值
      this.$bus.$on('rightFixedFormChange', (data) => {
        debugger
        console.log("rightFixedFormChange 触发成功")
        if(data){
          debugger
          this.currentform = data
        }
      })       
    },
    beforeDestroy(){
      // 销毁eventBus
      this.$bus.$off('rightFixedFormChange')
    },
    methods: {
      // 我审批的
      _getFlowTable () {
        this.loading = true
        myJoinFlow(this.queryObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableArr = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '我审批的列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '我审批的列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 切换表格类型
      handleTabClick (tab, event) {
        // 需要将right-fixed 关闭，否则 从 挂起或者任务池类目 点击了查看btn了后，再切换到其他类目下查看 right-fixed 不会重新渲染
        this.showRight = false        
        switch (this.activeName) {
          case 'first':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 0})
            this._getFlowTable()
            return
          case 'second':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 1})
            this._getFlowTable()
            return
          case 'third':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 3})
            this._getFlowTable()
            return
          case 'fourth':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 4})
            this._getFlowTable()
            return
          case 'five':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1})
            this._getFlowTable()
        }
      },
      // 导出全部
      _exportFlowSelectAll (param) {
        this.queryObj = Object.assign(this.queryObj, param)
        let url = `${BASE_URL}/WorkFlow?Method=ExportMyJoinFlow&TokenId=&CompanyCode=${this.companyCode}&no=${this.queryObj.no}&key=${this.queryObj.key}&flowSortNo=${this.queryObj.flowSortNo}&starter=${this.queryObj.starter}&days=${this.queryObj.days}&begin=${this.queryObj.begin}&end=${this.queryObj.end}&wfSta=${this.queryObj.wfSta}&userId=${this.userCode}`
        window.open(url)
      }
    },
    components: {
      SearchCmp,
      tabRouter,
      rightFixed
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .todo-container
    .left-container
      .table-container
        overflow hidden
        .tool-btn-container
          text-align right
      &.isRight
        margin-right 700px
        transition: margin-right 0.2s ease-out
</style>

