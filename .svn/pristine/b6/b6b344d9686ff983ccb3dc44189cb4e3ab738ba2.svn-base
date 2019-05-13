<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：审批规则列表
-->

<template>
  <el-dialog
    title="审批规则列表"
    :visible.sync="dialogTableTemplate"
    width="800px"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <el-tabs v-model="queryObj.isCanStart" @tab-click="handleClickRunState">
      <el-tab-pane label="全部" :name="'-1'"></el-tab-pane>
      <el-tab-pane label="独立运行" :name="'1'"></el-tab-pane>
      <el-tab-pane label="非独立运行" :name="'0'"></el-tab-pane>
    </el-tabs>
    <el-tabs type="card" v-model="queryObj.State" @tab-click="handleClickHaveState">
      <el-tab-pane label="全部" :name="'-1'"></el-tab-pane>
      <el-tab-pane label="已上架" :name="'2'"></el-tab-pane>
      <el-tab-pane label="已下架" :name="'3'"></el-tab-pane>
      <el-tab-pane label="草稿" :name="'1'"></el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="loadingTableTemplate"
      :data="tableData"
      height="400"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ApprovalName"
        label="审批名">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="流程名称">
      </el-table-column>
      <el-table-column
        prop="VersionNumber"
        label="版本号">
      </el-table-column>
      <el-table-column
        prop="IsCanStart"
        label="是否独立运行"
        width="100">
        <template slot-scope="scope">
          <span v-html="scope.row.IsCanStart ? '是' : '否' "></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="Note"
        label="说明">
      </el-table-column>
      <el-table-column
        prop="StateText"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="handleClickConfig(scope.row)" disabled type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleClickUp(scope.row)">升版</el-button>
          <el-button type="text" size="small" @click="handleClickEdit(scope.row)">编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="handleClickChangeState(scope.row)"
            v-html="(scope.row.State === 1 || scope.row.State === 3) ? '上架' : '下架' "
          >
            上架
          </el-button>
          <el-button type="text" size="small" disabled @click="handleClickEdit(scope.row)">监控员</el-button>
          <el-button type="text" size="small" @click="handleClickDel(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="handleClickQuote(scope.row)">引用</el-button>
          <el-button type="text" size="small" @click="handleClickHistory(scope.row)">版本</el-button>
          <el-button type="text" size="small" disabled @click="handleClickEdit(scope.row)">日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryObj.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <save-footer
      :isCancel="false"
      saveText="关闭"
      @save="handleClickClose">
    </save-footer>
    <company-structure-cmp v-if="showCompanyStructureCmp" @handleClickClose="showCompanyStructureCmp = false"></company-structure-cmp>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getFlowRulelist, checkNewVersionTable, upgradeFlowVersion, deleteRule, setFlowState } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/dialog-common'
  export default {
    props: {
      companyApprovalId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        queryObj: {
          Key: '',
          isCanStart: '-1',
          State: '-1',
          pageSize: 10,
          pageNum: 1
        },
        tableData: [],
        total: 0,
        loadingTableTemplate: false,
        dialogTableTemplate: true,
        activeRunState: 'all',
        activeHaveState: 'all',
        showCompanyStructureCmp: false,
        textarea: '',
        selectTypeTab: 'zuzhi'
      }
    },
    created () {
      this._getFlowRulelist()
    },
    methods: {
      // 获取表单列表
      _getFlowRulelist () {
        this.loadingTableTemplate = true
        getFlowRulelist(this.companyApprovalId, this.queryObj).then(res => {
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
      // 升版api
      _upgradeFlowVersion (flowId, bool) {
        this.loadingTableTemplate = true
        upgradeFlowVersion(flowId, bool).then(res => {
          this.loadingTableTemplate = false
          if (res.data.State === REQ_OK) {
            this.$message.success('升版成功')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message.error('升版失败，请重试')
        })
      },
      // 切换是否独立运行状态
      handleClickRunState () {
        this._getFlowRulelist()
      },
      // 切换是否上架状态
      handleClickHaveState () {
        this._getFlowRulelist()
      },
      // 升版
      handleClickUp (row) {
        checkNewVersionTable(row.FK_Flow).then(res => {
          if (res.data.State === REQ_OK) {
            if (res.data.Data) {
              this.$confirm('检查到有新版本, 是否用新版本升版?', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '新版本继续',
                cancelButtonText: '旧版本继续',
                type: 'warning'
              }).then(() => {
                this._upgradeFlowVersion(row.FK_Flow, true)
              }).catch((action) => {
                if (action === 'cancel') {
                  this._upgradeFlowVersion(row.FK_Flow, false)
                } else {
                  this.$message({
                    type: 'info',
                    message: '已取消升版'
                  })
                }
              })
            } else {
              this.$confirm('未检查到有新版本, 是否继续升版?', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this._upgradeFlowVersion(row.FK_Flow, false)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消升版'
                })
              })
            }
          }
        })
      },
      // 编辑
      handleClickEdit (row) {
        this.$router.push({
          path: '/platform/approvalFlow/flowRule/flowConfig',
          query: {
            flowId: row.FK_Flow,
            approvalId: row.CompanyApprovalId,
            ruleId: row.FlowRuleId
          }
        })
      },
      // 删除规则
      handleClickDel (row) {
        this.$confirm('确认删除此规则吗?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRule(row.FlowRuleId).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message.success('删除成功')
              this._getFlowRulelist()
            } else {
              this.$message.error('删除失败')
            }
          }).catch(() => {
            this.$message.error('删除失败')
          })
        }).catch(() => {
        })
      },
      // 上架，下架
      handleClickChangeState (row) {
        this.$confirm('确认修改当前状态吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let state = (row.State === 1 || row.State === 3) ? 2 : 3
          this.loadingTableTemplate = true
          setFlowState(row.FK_Flow, state).then(res => {
            this.loadingTableTemplate = false
            if (res.data.State === REQ_OK) {
              this.$message.success('修改状态成功')
              this._getFlowRulelist()
            } else {
              this.$message.error('修改状态失败，请重试')
            }
          }).catch(() => {
            this.loadingTableTemplate = false
            this.$message.error('修改状态失败，请重试')
          })
        }).catch(() => {
        })
      },
      // 历史
      handleClickHistory (row) {
        this.showCompanyStructureCmp = true
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getFlowRulelist()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getFlowRulelist()
      },
      // 关闭
      handleClickClose () {
        this.$emit('closeApprovalRule')
      }
    },
    components: {
      SaveFooter,
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
