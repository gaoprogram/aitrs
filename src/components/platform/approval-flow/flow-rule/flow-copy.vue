<!--
  User: xxxxxxx
  Date: 2019/3/13
  功能：复制流程
-->

<template>
  <el-dialog
    title="复制流程"
    :visible.sync="dialogTableTemplate"
    width="800px"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <div v-loading="loadingTableTemplate">
      <p style="margin-bottom: 20px">执行此操作，系统自动按该流程配置包括表单配置全部复制新增创建新流程，归属在指定审批下，状态为草稿</p>
      <div>
        复制流程到：
        <el-select v-model="selectFlowObj.CompanyApprovalId" placeholder="请选择审批">
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
        saveText="复制"
        @save="handleSave">
      </save-footer>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { copyFlow, companyTableList } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      selectFlowObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        dialogTableTemplate: true,
        loadingTableTemplate: false,
        approvalList: []
      }
    },
    created () {
      this._companyTableList()
    },
    methods: {
      // 获取审批流列表
      _companyTableList () {
        companyTableList().then(res => {
          if (res.data.State === REQ_OK) {
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
      // 复制
      _copyFlow () {
        this.loadingTableTemplate = true
        copyFlow(this.selectFlowObj.CompanyApprovalId, this.selectFlowObj.FlowRuleId).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('复制成功')
            // 触发 父组件中 table 数据 刷新
            this.$bus.$emit('flowRuleRefresh')
            this.$emit('handleClose')
          } else {
            this.$message.error('复制失败，请重试')
          }
          this.loadingTableTemplate = false
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message.error('复制失败，请重试')
        })
      },
      // 保存
      handleSave () {
        if (!this.selectFlowObj.CompanyApprovalId) return this.$message.info('未选择审批')
        this._copyFlow()
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
