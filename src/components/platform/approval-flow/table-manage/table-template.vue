<!--
  User: xxxxxxx
  Date: 2018/12/5
  功能：表单模版-------------------
-->

<template>
  <el-dialog
    title="表单模版"
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
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="TableName"
        label="表单名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="BusinessTypeName"
        label="业务类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="State"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <span v-html="scope.row.State === 0 ? '禁用' : '启用' "></span>
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
    <span slot="footer" class="dialog-footer">
          <el-button @click="handleClickCancel">取 消</el-button>
          <el-button type="primary" @click="handleClickSure">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getComTables } from '@/api/approve'
  export default {
    data () {
      return {
        queryObj: {
          businessTypeCode: '',
          Key: '',
          pageSize: 10,
          pageNum: 1
        },
        tableData: [],
        total: 0,
        loadingTableTemplate: false,
        dialogTableTemplate: true
      }
    },
    created () {
      this._getComTables()
    },
    methods: {
      // 获取表单列表
      _getComTables () {
        this.loadingTableTemplate = true
        getComTables(this.queryObj).then(res => {
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
      // 取消
      handleClickCancel () {
        this.$emit('tableTemplateCancel')
      },
      // 确定
      handleClickSure () {
        this.$emit('tableTemplateSure', this.multipleSelection)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 分页--每页多少条
      handleSizeChange (val) {
        this.queryObj.pageSize = val
        this._getComTables()
      },
      // 分页--当前页
      handleCurrentChange (val) {
        this.queryObj.pageNum = val
        this._getComTables()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
