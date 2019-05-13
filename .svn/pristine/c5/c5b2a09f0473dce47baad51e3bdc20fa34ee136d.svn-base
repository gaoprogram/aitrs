<!--
  User: xxxxxxx
  Date: 2019/3/13
  功能：新版本表单
-->

<template>
  <el-dialog
    title="新版本表单"
    :visible.sync="dialogTableTemplate"
    width="800px"
    @close="handleClose"
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <el-table
      v-loading="loadingTableTemplate"
      :data="showNewVersionOfTableList"
      border
      height="500"
      style="width: 100%">
      <el-table-column
        fixed
        prop="TableName"
        label="表单名称"
      >
      </el-table-column>
      <el-table-column
        prop="CurrentVersion"
        label="当前版本号"
      >
      </el-table-column>
      <el-table-column
        prop="NewVersion"
        label="上架的版本号/新版本号"
      >
      </el-table-column>
    </el-table>
    <save-footer
      @cancel="handleOld"
      cancelText="旧版本上架"
      saveText="新版本上架"
      @save="handleNew">
    </save-footer>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { showNewVersionOfTable } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      flowId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        dialogTableTemplate: true,
        loadingTableTemplate: false,
        total: null,
        showNewVersionOfTableList: []
      }
    },
    created () {
      this._showNewVersionOfTable()
    },
    methods: {
      // 显示新版本表单
      _showNewVersionOfTable () {
        showNewVersionOfTable(this.flowId).then(res => {
          if (res.data.State === REQ_OK) {
            this.showNewVersionOfTableList = res.data.Data
          }
        })
      },
      // 新版本
      handleNew () {
        this.$emit('handleNew')
      },
      handleOld () {
        this.$emit('handleOld')
      },
      // 关闭
      handleClose () {
        this.$emit('handleClose')
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
