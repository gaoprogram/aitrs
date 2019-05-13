<!--
  User: xxxxxxx
  Date: 2018/10/16
  功能：xxxxxx
-->

<template>
  <div class="todo-container mg-30">
    <tab-router></tab-router>
    <div class="left-container" :class="{'isRight': showRight}">
      <search-cmp
        @handleSearch="handleSearch"
        @exportFlowSelectAll="_exportFlowSelectAll"
        @handleReset="handleReset"
      >
      </search-cmp>
      <div class="table-container">
        <div class="tool-btn-container" v-if="activeName !== 'five'">
          <el-button @click="_exportFlowSelect()" :disabled="!multipleSelection.length">选中导出</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="我发起的" name="first"></el-tab-pane>
          <el-tab-pane label="我审批的" name="second"></el-tab-pane>
        </el-tabs>
        <div class="table" v-loading="loading">
          <el-table
            ref="multipleTable"
            border
            height="500"
            :data="tableArr"
            tooltip-effect="dark"
            style="width: 100%"
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
              width="120">
            </el-table-column>
            <el-table-column
              prop="Title"
              label="标题"
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
              prop="TodoEmps"
              label="审批人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="WFStateText"
              label="状态"
              width="120">
            </el-table-column>
            <el-table-column
              prop="FlowSort"
              label="业务类型"
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
                  @click="handleFn(scope.row, 'UnSend')"
                >撤销
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
    </div>
    <div v-if="showRight">
      <right-fixed
        @closeRight="closeRight"
        :form="currentForm"
        :loading="rightLoading"
        @next="next"
        @prev="prev"
        @refreshForm="refreshForm"
      ></right-fixed>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    runingList
  } from '@/api/approve'
  import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
  import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
  import SearchCmp from '../search-cmp/search-cmp'
  import {flowCommonFn} from '@/utils/mixin'
  export default {
    mixins: [flowCommonFn],
    data () {
      return {
        keyWord: '',
        activeName: 'first',
        queryObj: {
          key: '',
          no: '',
          flowSortNo: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          type: 1,
          pageSize: 10,
          pageNum: 1
        },
        tableArr: [],
        total: 0
      }
    },
    created () {
    },
    methods: {
      // 待办列表
      _getFlowTable () {
        this.loading = true
        runingList(this.queryObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableArr = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '在途列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '在途列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 切换表格类型
      handleTabClick (tab, event) {
        switch (this.activeName) {
          case 'first':
            this.queryObj = Object.assign(this.queryObj, {type: 1})
            this._getFlowTable()
            return
          case 'second':
            this.queryObj = Object.assign(this.queryObj, {type: 2})
            this._getFlowTable()
        }
      },
      // 导出全部
      _exportFlowSelectAll (param) {
        this.queryObj = Object.assign(this.queryObj, param)
        let url = `${BASE_URL}/WorkFlow?Method=ExportRuningList&TokenId=&CompanyCode=${this.companyCode}&no=${this.queryObj.no}&key=${this.queryObj.key}&flowSortNo=${this.queryObj.flowSortNo}&starter=${this.queryObj.starter}&days=${this.queryObj.days}&begin=${this.queryObj.begin}&end=${this.queryObj.end}&type=${this.queryObj.type}&userId=${this.userCode}`
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
        margin-right 500px
        transition: margin-right 0.2s ease-out
</style>
