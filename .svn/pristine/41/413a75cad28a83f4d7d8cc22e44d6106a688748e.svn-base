<!--
  User: xxxxxxx
  Date: 2018/7/9
  功能：xxxxxx
-->

<template>
  <div class="relation-table-container" v-loading="loading">
    <div class="content-container">
      <div class="title">共有表单库</div>
      <div class="table-item" v-for="(table, index) in relationTable.Public" :key="table.TableCode">
        <div class="main-table-content">
          <el-tag class="item">主表</el-tag>
          <el-input
            class="item"
            placeholder="请选择表单"
            v-model="table.TableName"
            size="small"
            style="width: 200px"
            :disabled="true">
          </el-input>
        </div>
        <div class="detail-table-content" v-for="(detailTable, i) in table.DetailTables" style="padding-left: 20px">
          <el-tag class="item">明细表</el-tag>
          <el-input
            class="item"
            placeholder="请选择表单"
            v-model="detailTable.TableName"
            size="small"
            style="width: 200px"
            :disabled="true">
          </el-input>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="title">自有表单库</div>
      <div class="table-item" v-for="(table, index) in relationTable.Private" :key="table.TableCode">
        <div class="main-table-content">
          <el-tag class="item">主表</el-tag>
          <el-input
            class="item"
            placeholder="请选择表单"
            v-model="table.TableName"
            size="small"
            style="width: 200px"
            :disabled="true">
          </el-input>
        </div>
        <div class="detail-table-content" v-for="(detailTable, i) in table.DetailTables" style="padding-left: 20px">
          <el-tag class="item">明细表</el-tag>
          <el-input
            class="item"
            placeholder="请选择表单"
            v-model="detailTable.TableName"
            size="small"
            style="width: 200px"
            :disabled="true">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getApprovalTable } from '@/api/approve'
  import { flowAutoLogin, flowBaseFn } from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin],
    data () {
      return {
        loading: false,
        ruleList: [],
        flowId: '',
        businessTypeList: [],
        relationTable: [],
        mainTableList: [],
        queryObj: {
          state: '1',
          businessTypeCode: '',
          Key: '',
          publicState: -1,
          pageSize: 10,
          pageNum: 1
        },
        total: 0,
        dialogTableVisible: false,
        tableLoading: false,
        currentTable: {},
        selectedTable: {}
      }
    },
    created () {
      this.flowId = this.$route.query.flowId
      this._getApprovalTable()
    },
    methods: {
      // 获取关联表
      _getApprovalTable () {
        this.loading = true
        getApprovalTable(this.flowId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.relationTable = res.data.Data
          } else {
            this.$message({
              message: '关联表单获取失败，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '关联表单获取失败，请刷新重试！',
            type: 'error'
          })
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.flowId = this.$route.query.flowId
        this._getApprovalTable()
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relation-table-container
    .content-container
      margin-bottom 10px
      .title
        margin-bottom 10px
      .table-item
        padding-left 20px
        margin-bottom 20px
        .main-table-content, .detail-table-content
          display flex
          margin-bottom 10px
          .item
            margin-right 5px

  .el-button+.el-button {
    margin-left: 5px!important;
  }
</style>
