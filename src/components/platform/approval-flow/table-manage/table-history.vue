<!--
  User: gaolong
  Date: 2019/5/16
  功能：表单管理里面的历史记录dialog 弹窗
-->

<template>
  <el-dialog
    title="历史版本"
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
        prop="TableName"
        label="表单"
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
    <table-quote v-if="showTableQuote" :tableCode="currentTableCode" @tableQuoteClose="showTableQuote = false"></table-quote>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getHistoryVersion, upgradeTableVersion } from '@/api/approve'
  import TableQuote from './table-quote'
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
        showTableQuote: false,
        currentTableCode: ''
      }
    },
    created () {
      this._getHistoryVersion()
    },
    methods: {
      // 获取表单列表
      _getHistoryVersion () {
        this.loadingTableTemplate = true
        getHistoryVersion(this.templateCode).then(res => {
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
          path: '/platform/approvalFlow/tableManage/showTable',
          query: {
            tableCode: row.TableCode
          }
        })
      },
      // 引用
      handleClickQuote (row) {
        this.currentTableCode = row.TableCode
        this.showTableQuote = true
      },
      // 回滚
      handleClickUp (row) {
        this.$confirm(`执行此操作，最新版表单将引用此版表单的全面配置。是否确定执行此操作？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          debugger
          this.loadingTableTemplate = true
          upgradeTableVersion(row.TableCode).then(res => {
            this.loadingTableTemplate = false
            if (res.data.State === REQ_OK) { 
              this.$message.success('回滚成功')
              // 回滚成功后 触发父组件中 table列表中 显示出最新的表单数据
              this.$emit('versitionRollBack')
              debugger
              // 回滚成功后调用 历史版本的接口回显
              this._getHistoryVersion()
            } else {
              this.$message.error(`${res.data.Error}`)
            }
          }).catch(() => {
            this.loadingTableTemplate = false
            this.$message.error('回滚失败err，请重试')
          })
        }).catch(() => {
          this.loadingTableTemplate = false
        })
      },
      // 取消
      handleClose () {
        this.$emit('tableHistoryClose')
      }
    },
    components: {
      TableQuote,
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
