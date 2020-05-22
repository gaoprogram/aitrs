<!--
  User: gaol
  Date: 2019/5/15
  功能：审批规则——移动流程dailog 弹框页面
-->

<template>
  <el-dialog
    title="移动流程"
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
      height="300"
      @selection-change="handleSelectChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="Name"
        label="流程名称"
      >
      </el-table-column>
      <el-table-column
        prop="ApprovalName"
        label="审批名称"
      >
      </el-table-column>
      <el-table-column
        prop="VersionNumberText"
        label="版本号"
      >
      </el-table-column>
      <el-table-column
        prop="StateText"
        label="状态">
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-bottom: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryObj.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <div>
      移动流程到：
      <el-select v-model="selectApprovalId" placeholder="请选择审批">
        <el-option
          v-for="item in approvalList"
          :key="item.CompanyApprovalId"
          :label="item.Name"
          :value="item.CompanyApprovalId">
        </el-option>
      </el-select>
    </div>
    <save-footer
      @cancel="handleClose"
      saveText="移动"
      @save="handleSave">
    </save-footer>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { moveFlow, getFlowRulelist, companyTableList } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    data () {
      return {
        dialogTableTemplate: true,
        loadingTableTemplate: false,
        companyApprovalId: '',
        queryObj: {
          Key: '',
          isCanStart: '-1',
          State: '-1',
          pageSize: 10,
          pageNum: 1
        },
        total: null,
        tableData: [],
        approvalList: [],
        selectFlowArr: [],   // 表格中选中的指定的审批的集合（当前流程集合）
        selectApprovalId: '',  // 下拉框选项中选择的移动到的指定的流程 id（目前流程）
        selectedFlow: []
      }
    },
    created () {
      this._companyTableList()

      this._getFlowRulelist()
    },
    methods: {
      // 获取流程列表
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
      // 获取审批流列表
      _companyTableList () {
        debugger
        companyTableList('1').then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            if (res.data.Data.length) {
              res.data.Data.forEach(item => {
                this.approvalList.push(...item.CompanyApprovals)
              })
            }
          } else {
          }
        }).catch(() => {
        })
      },
      // 移动
      _moveFlow () {
        moveFlow(this.selectApprovalId, JSON.stringify(this.selectedFlow)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('移动成功')
            this._getFlowRulelist()
          } else {
            this.$message.error('移动失败，请重试')
          }
        }).catch(() => {
          this.$message.error('移动失败，请重试')
        })
      },
      handleSelectChange (val) {
        debugger
        this.selectFlowArr = val
      },
      // 保存
      handleSave () {
        if (!this.selectApprovalId) return this.$message.info('未选择审批')

        if (this.selectFlowArr && !this.selectFlowArr.length) return this.$message.info('未选择任何流程')
        debugger
        this.selectFlowArr.forEach(item => {
          //
          this.selectedFlow.push({FlowRuleId: item.FlowRuleId})
        })

        this._moveFlow()
      },
      // 关闭
      handleClose () {
        this.$bus.$emit('flowRuleRefresh')
        this.$emit('handleClose')
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
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
