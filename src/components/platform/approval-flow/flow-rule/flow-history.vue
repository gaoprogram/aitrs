<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：表单模版
-->

<template>
  <el-dialog
    title="历史版本"
    :visible.sync="dialogTableTemplate"
    width="800px"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <el-table
      v-loading="loadingTableTemplate"
      :data="tableData"
      border
      height="500"
      style="width: 100%">
      <el-table-column
        fixed
        prop="Name"
        label="名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="VersionNumberText"
        label="版本号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="StateText"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="handleClickShow(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClickQuote(scope.row)" type="text" size="small">引用</el-button>
          <el-button @click="handleClickUp(scope.row)" type="text" size="small" v-if="scope.row.State === 3">回滚</el-button>
        </template>
      </el-table-column>
    </el-table>
    <save-footer
      :isCancel="false"
      saveText="关闭"
      @save="handleClose">
    </save-footer>
    <flow-quote v-if="showFlowQuote" :flowId="currentFlowId" @quoteClose="showFlowQuote = false"></flow-quote>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getFlowHistoryVersion, upgradeFlowVersion } from '@/api/approve'
  import FlowQuote from './flow-quote'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      templateCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        tableData: [],
        loadingTableTemplate: false,
        dialogTableTemplate: true,
        showFlowQuote: false
      }
    },
    created () {
      this._getHistoryVersion()
    },
    methods: {
      // 获取历史流程列表
      _getHistoryVersion () {
        this.loadingTableTemplate = true
        getFlowHistoryVersion(this.templateCode).then(res => {
          this.loadingTableTemplate = false
          if (res.data.State === REQ_OK) {
            this.tableData = res.data.Data
            this.total = res.data.Total
          } else {
            this.$message({
              type: 'error',
              message: '请求失败，刷新重试！'
            })
          }
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message({
            type: 'error',
            message: '请求失败，刷新重试！'
          })
        })
      },
      // 查看
      handleClickShow (row) {
        this.$router.push({
          path: '/platform/approvalFlow/flowRule/flowDetail',
          query: {
            flowId: row.FK_Flow,
            approvalId: row.CompanyApprovalId,
            ruleId: row.FlowRuleId,
            type: 'flow'
          }
        })
      },
      // 引用
      handleClickQuote (row) {
        this.currentFlowId = row.FK_Flow
        this.showFlowQuote = true
      },
      // 回滚
      handleClickUp (row) {
        this.$confirm(`执行此操作，最新版流程将引用此版流程的全面配置。是否确定执行此操作？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loadingTableTemplate = true
          upgradeFlowVersion(row.FlowRuleId, true).then(res => {
            this.loadingTableTemplate = false
            if (res.data.State === REQ_OK) {
              this.$message.success('回滚成功')
              this._getHistoryVersion()
            } else {
              this.$message.error(res.data.Error)
            }
          }).catch(() => {
            this.loadingTableTemplate = false
            this.$message.error('回滚失败，请重试')
          })
        }).catch(() => {
        })
      },
      // 取消
      handleClose () {
        this.$emit('historyClose')
      }
    },
    components: {
      SaveFooter,
      FlowQuote
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
