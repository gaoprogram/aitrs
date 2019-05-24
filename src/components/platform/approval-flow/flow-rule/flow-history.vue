<!--
  User: gaol
  Date: 2019/5/15
  功能：审批规则——版本弹框页面组件
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
  import { getFlowHistoryVersion, upgradeFlowVersion, checkNewVersionTable } from '@/api/approve'
  import FlowQuote from './flow-quote'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { Loading } from 'element-ui'
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
        loadingTableTemplate: false,  // 控制版本记录弹窗表格中的数据加载时的 loading
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
        // 调用获取版本历史记录的接口
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
        checkNewVersionTable(row.FK_Flow).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            debugger
            if (res.data.Data) {
              debugger
              // 检测到有新版本
              this.$confirm('检查到表单有新版本, 是否用新版本回滚?', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '新版本继续',
                cancelButtonText: '旧版本继续',
                type: 'warning'
              }).then(() => {
                // 确认后 就调用回滚的接口
                this.loadingTableTemplate = true
                upgradeFlowVersion(row.FlowRuleId, true).then(res => {
                  this.loadingTableTemplate = false
                  debugger
                  if (res.data.State === REQ_OK) {
                    // 弹框表格中的数据刷新显示
                    // const h = this.$createElement
                    // debugger
                    // this.$notify({
                    //   title: '提示',
                    //   message: h('i', { style: 'color: teal'}, '表单正在回滚中...')
                    // })
  
                    this._getHistoryVersion()
                    // 触发父组件 table中获取最新的数据
                    // this.$parent._getFlowRulelist()
                    // loadingInstance.close()

                    this.$bus.$emit('flowRuleRefresh')
                    this.$message.success('回滚成功')
                  } else {
                    this.$message.error(res.data.Error)
                  }
                }).catch(() => {
                  this.loadingTableTemplate = false
                  this.$message.error('回滚失败，请重试')
                })
              }).catch((action) => {
                // 点击的取消
                debugger
                if (action === 'cancel') {
                  // 旧版本的确认
                  this.loadingTableTemplate = true
                  upgradeFlowVersion(row.FlowRuleId, false).then(res => {
                    this.loadingTableTemplate = false
                    if (res.data.State === REQ_OK) {
                      this.$message.success('回滚成功')
                      // 触发父组件 table中获取最新的数据
                      this.$bus.$emit('flowRuleRefresh')
                      // 弹框表格中的数据刷新显示
                      this._getHistoryVersion()
                    } else {
                      this.$message.error(res.data.Error)
                    }
                  }).catch(() => {
                    this.loadingTableTemplate = false
                    this.$message.error('回滚失败，请重试')
                  })
                } else {
                  this.$message({
                    type: 'info',
                    message: '已取消升版'
                  })
                }
              })
            } else {
              // 未检测到新版本
              this.$confirm('未检查到表单有新版本, 是否继续回滚?', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 旧版本进行升版
                this.loadingTableTemplate = true
                upgradeFlowVersion(row.FlowRuleId, false).then(res => {
                  this.loadingTableTemplate = false
                  if (res.data.State === REQ_OK) {
                    this.$message.success('回滚成功')
                    // 触发父组件 table中获取最新的数据
                    this.$bus.$emit('flowRuleRefresh')
                    // 弹框表格中的数据刷新显示
                    this._getHistoryVersion()
                  } else {
                    this.$message.error(res.data.Error)
                  }
                }).catch(() => {
                  this.loadingTableTemplate = false
                  this.$message.error('回滚失败，请重试')
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消升版'
                })
              })
            }
          } else {
            this.$message.error(`${res.data.Error}`)
          }
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
