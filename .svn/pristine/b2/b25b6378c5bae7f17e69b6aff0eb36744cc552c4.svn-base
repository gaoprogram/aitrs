<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：表单模版
-->

<template>
  <el-dialog
    title="引用该表单的模版"
    :visible.sync="dialogTableTemplate"
    width="800px"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
    v-loading="loadingTableTemplate"
  >
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="ApprovalName"
        label="审批"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="流程"
        width="120">
      </el-table-column>
      <el-table-column
        prop="VersionNumberText"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="StateText"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <span v-html="scope.row.State === 0 ? '禁用' : '启用' "></span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="handleClickShow(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <save-footer
      :isCancel="false"
      saveText="关闭"
      @save="handleClose">
    </save-footer>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getUsedFlowlist } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      tableCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        tableData: [],
        loadingTableTemplate: false,
        dialogTableTemplate: true
      }
    },
    created () {
      this._getUsedFlowlist()
    },
    methods: {
      // 获取表单列表
      _getUsedFlowlist () {
        this.loadingTableTemplate = true
        getUsedFlowlist(this.tableCode).then(res => {
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
          path: '/platform/approvalFlow/tableManage/flowConfig',
          query: {
            flowId: row.FK_Flow,
            approvalId: row.CompanyApprovalId,
            ruleId: row.FlowRuleId
          }
        })
      },
      // 取消
      handleClose () {
        this.$emit('tableQuoteClose')
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
