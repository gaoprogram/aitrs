<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流——待办
-->

<template>
  <div class="todo-container mg-30">
    <tab-router></tab-router>
    <!--左边区域---start-->
    <div class="left-container" :class="{'isRight': showRight}">
      <!----搜索组件-start-->
      <search-cmp
        @handleSearch="handleSearch"
        @exportFlowSelectAll="_exportFlowSelectAll"
        @handleReset="handleReset"
      >
      </search-cmp>
      <!----搜索组件-end-->
      <!--表格内容区域--start--->
      <div class="table-container">
        <div class="tool-btn-container" v-if="activeName !== 'five'">
          <el-button @click="dialogBatchAgree = true" v-if="activeName === 'first'" :disabled="!multipleSelection.length">批量同意
          </el-button>
          <el-button @click="dialogBatchRefuse = true" v-if="activeName === 'first'" :disabled="!multipleSelection.length">
            批量拒绝
          </el-button>
          <el-button @click="_exportFlowSelect()" :disabled="!multipleSelection.length">选中导出</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="审批中" name="first"></el-tab-pane>
          <el-tab-pane label="草稿" name="second"></el-tab-pane>
          <el-tab-pane label="挂起" name="third"></el-tab-pane>
          <el-tab-pane label="全部" name="fourth"></el-tab-pane>
          <el-tab-pane label="任务池" name="five"></el-tab-pane>
          <el-tab-pane label="任务池申领" name="six"></el-tab-pane>
        </el-tabs>

        <div :class="['table',!tableArr.length? 'not_found': '']" v-loading="loading">
          <el-table
            ref="multipleTable"
            border
            height="500"
            :data="tableArr"
            tooltip-effect="dark"
            style="width: 100%"
            empty-text=' '
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
              label="审批名"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="Title"
              label="标题"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="StarterName"
              label="申请人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="DeptName"
              label="组织"
              width="120">
            </el-table-column>
            <el-table-column
              prop="NodeName"
              label="当前节点"
              width="120">
            </el-table-column>
            <el-table-column
              prop="WFStateText"
              label="状态"
              width="120">
            </el-table-column>
            <el-table-column
              prop="FlowSort"
              label="业务领域"
              width="120">
            </el-table-column>
            <el-table-column
              prop="RDT"
              label="申请时间"
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
                  @click="handleShowDetail(scope.row, scope.$index)"
                >查看
                </el-button>

                <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'first' || (activeName==='second')"
                  @click="handleFn(scope.row, 'Send')"
                >提交
                </el-button>
                
                <!-- <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'second'"
                  @click="handleFn(scope.row, 'Send')"
                >提交
                </el-button> -->

                <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'first' "
                  @click="handleFn(scope.row, 'Refuse')"
                >拒绝
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="activeName === 'third'"
                  @click="handleFn(scope.row, 'unHungUp')"
                >取消挂起
                </el-button>
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
      <!--表格内容区域--start--->
    </div>
    <!--左边区域---end-->

    <!--右边区域---start-->
    <div v-if="showRight" class="rightContentWrap">
      <right-fixed
        @closeRight="closeRight"
        :form="currentForm"
        :loading="rightLoading"
        @next="next"
        @prev="prev"
        @refreshForm="refreshForm"
      >
      </right-fixed>
    </div>
    <!--右边区域---start-->

    <!-- 按钮统一弹窗区域 --start--->
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

    <el-dialog
      title="批量同意意见"
      :visible="dialogBatchAgree"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
    >
      <div class="btn-component-container" v-loading="loading">
        <aitrs-editor
          v-if="dialogBatchAgree"
          ref="aitrsEditorAgree"
          @editor="changeContentAgree"
          :content="batchAgreeObj.opinion"
          :isShowImg="isShowImg"
          placeholder="请输入处理意见"
        >
        </aitrs-editor>
        <span class="footer">
          <el-button @click="dialogBatchAgree = false">取 消</el-button>
          <el-button type="primary" @click="handleBatchSend()">确 定</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog
      title="批量拒绝意见"
      :visible="dialogBatchRefuse"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
    >
      <div class="btn-component-container" v-loading="loading">
        <aitrs-editor
          v-if="dialogBatchRefuse"
          ref="aitrsEditorRefuse"
          @editor="changeContentRefuse"
          :content="batchRefuseObj.opinion"
          :isShowImg="isShowImg"
          placeholder="请输入处理意见"
        >
        </aitrs-editor>

        <span class="footer">
          <el-button @click="dialogBatchRefuse = false">取 消</el-button>
          <el-button type="primary" @click="handleBatchRefuse()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!--按钮统一弹窗区域--end--->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    todolist,
    batchSend,
    batchRefuse
  } from '@/api/approve'
  import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
  import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
  import SearchCmp from '../search-cmp/search-cmp'
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import { flowCommonFn } from '@/utils/mixin'

  export default {
    // 引用的mixin中的 flowCommonFn 方法进行 查看，取消挂起，获取form 表单数据等
    mixins: [flowCommonFn],
    components: {
      SearchCmp,
      tabRouter,
      rightFixed,
      AitrsEditor
    },
    data () {
      return {
        keyWord: '',
        activeName: 'fourth',
        // loading: true,
        queryObj: {
          key: '',
          no: '',
          flowSortNo: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          wfSta: -1,
          taskSta: '',
          pageSize: 10,
          pageNum: 1
        },
        tableArr: [],
        total: 0,
        multipleSelection: [],
        dialogBatchAgree: false,
        batchAgreeObj: {
          Works: [],
          opinion: ''
        },
        dialogBatchRefuse: false,
        batchRefuseObj: {
          Works: [],
          opinion: ''
        },
        isShowImg: false
      }
    },
    created () {
    },
    methods: {
      // 待办列表
      _getFlowTable () {
        debugger
        this.loading = true
        todolist(this.queryObj).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.tableArr = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '待办列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '待办列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 批量同意
      _batchSend () {
        this.loading = true
        batchSend(this.batchAgreeObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message('批量同意成功')
            this.dialogBatchAgree = false
            // 成功了之后 重新获取表格的数据
            this._getFlowTable()
          } else {
            this.$message.error(res.data.Error)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error('设置失败，请重试！无法执行批量提交')
        })
      },
      // 批量拒绝
      _batchRefuse () {
        batchRefuse(this.batchRefuseObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('批量拒绝成功')
            this.dialogBatchRefuse = false
            this._getFlowTable()
          } else {
            this.$message.error(res.data.Error)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error('设置失败，请重试！无法执行批量提交')
        })
      },
      // 切换表格类型
      handleTabClick (tab, event) {
        switch (this.activeName) {
          case 'first':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 0, taskSta: ''})
            this._getFlowTable()
            return
          case 'second':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 2, taskSta: ''})
            this._getFlowTable()
            return
          case 'third':
            this.queryObj = Object.assign(this.queryObj, {wfSta: 10, taskSta: ''})
            this._getFlowTable()
            return
          case 'fourth':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1, taskSta: ''})
            this._getFlowTable()
            return
          case 'five':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1, taskSta: 1})
            this._getFlowTable()
            return
          case 'six':
            this.queryObj = Object.assign(this.queryObj, {wfSta: -1, taskSta: 2})
            this._getFlowTable()
        }
      },
  
      // 表格多选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      changeContentAgree (val) {
        this.batchAgreeObj.opinion = val
      },
      changeContentRefuse (val) {
        this.batchRefuseObj.opinion = val
      },
      // 批量同意
      handleBatchSend () {
        debugger
        this.batchAgreeObj.Works = []
        this.multipleSelection.forEach(item => {
          this.batchAgreeObj.Works.push({
            WorkId: item.WorkId,
            FK_Flow: item.FK_Flow,
            FK_Node: item.FK_Node
          })
        })
        // if (!this.batchAgreeObj.opinion) return this.$message.info('请输入处理意见')
        this._batchSend()
      },
      // 批量拒绝
      handleBatchRefuse () {
        this.batchRefuseObj.Works = []
        this.multipleSelection.forEach(item => {
          this.batchRefuseObj.Works.push({
            WorkId: item.WorkId,
            FK_Flow: item.FK_Flow,
            FK_Node: item.FK_Node
          })
        })
        // if (!this.batchRefuseObj.opinion) return this.$message.info('请输入处理意见')
        this._batchRefuse()
      },
      // 导出全部
      _exportFlowSelectAll (param) {
        this.queryObj = Object.assign(this.queryObj, param)
        let url = `${BASE_URL}/WorkFlow?Method=ExportTodolist&TokenId=&CompanyCode=${this.companyCode}&no=${this.queryObj.no}&key=${this.queryObj.key}&flowSortNo=${this.queryObj.flowSortNo}&starter=${this.queryObj.starter}&days=${this.queryObj.days}&begin=${this.queryObj.begin}&end=${this.queryObj.end}&wfSta=${this.queryObj.wfSta}&userId=${this.userCode}`
        window.open(url)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .todo-container
    .left-container
      .table-container
        overflow hidden
        .tool-btn-container
          text-align right
      &.isRight
        margin-right 500px
        transition margin-right .1s ease-out
    .rightContentWrap
      .right-fixed-container
        .close
          margin-top 40px  
          color red   
  .btn-component-container
    .footer
      display block
      margin-top 20px
      text-align center

// >>>.el-table__empty-text
</style>
