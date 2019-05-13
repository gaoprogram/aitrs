<!--
  User: xxxxxxx
  Date: 2018/7/9
  功能：xxxxxx
-->

<template>
  <div class="relation-table-container" v-loading="loading">
    <div style="text-align: right">
      <el-button type="primary" size="small" @click="handleAddPublicTable">新增共有表单</el-button>
      <el-button type="primary" size="small" @click="handleAddPrivateTable">新增自有表单</el-button>
    </div>
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
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(table, 1)">选择</el-button>
          <el-button size="small" icon="el-icon-edit" :disabled="!table.TableName" @click="handleClickOverviewTable(table)">预览</el-button>
          <el-button size="small" icon="el-icon-delete" @click="_removeMainTable(index, relationTable.Public, table.TableCode, table.FlowId)">删除</el-button>
          <el-button size="small" icon="el-icon-plus" @click="handleAddDetailTable(table)">新增明细表</el-button>
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
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(detailTable, 1)">选择</el-button>
          <el-button size="small" icon="el-icon-edit" :disabled="!detailTable.TableName" @click="handleClickOverviewTable(detailTable)">预览</el-button>
          <el-button size="small" icon="el-icon-delete" @click="_removeDetailTable(i, table.DetailTables, detailTable.TableCode, table.FlowId)">删除</el-button>
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
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(table, 0)">选择</el-button>
          <el-button size="small" icon="el-icon-edit" :disabled="!table.TableName" @click="handleClickEditTable(table)">编辑</el-button>
          <el-button size="small" icon="el-icon-delete" @click="_removeMainTable(index, relationTable.Private, table.TableCode, table.FlowId)">删除</el-button>
          <el-button size="small" icon="el-icon-plus" :disabled="!table.TableName" @click="handleAddDetailTable(table)">新增明细表</el-button>
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
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(detailTable, 0)">选择</el-button>
          <el-button size="small" icon="el-icon-edit" :disabled="!detailTable.TableName" @click="handleClickEditTable(detailTable)">编辑</el-button>
          <el-button size="small" icon="el-icon-delete" @click="_removeDetailTable(i, table.DetailTables, detailTable.TableCode, table.FlowId)">删除</el-button>
        </div>
      </div>
    </div>
    <save-footer
      :isCancel="true"
      cancelText="关闭"
      @cancel="handleClose"
      @save="handleRelationTableSave">
    </save-footer>
    <el-dialog title="选择表单"
               :visible.sync="dialogTableVisible"
               width="960px"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :append-to-body="true"

    >
      <div v-loading="tableLoading">
        <div class="search-container" style="margin-bottom: 10px">
          <el-select
            clearable
            v-model="queryObj.businessAreaCode"
            @change="handleChangeBusinessType"
            @clear="handleChangeBusinessType"
            placeholder="请选择业务领域"
          >
            <el-option
              v-for="item in businessAreaList"
              :key="item.BusinessAreaCode"
              :label="item.Name"
              :value="item.BusinessAreaCode">
            </el-option>
          </el-select>
          <el-input v-model="queryObj.Key" placeholder="请输入表单名" clearable @clear="handleChangeBusinessType"
                    style="width: 200px"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="handleChangeBusinessType"></el-button>
        </div>
        <div class="table-content-container">
          <el-table
            :data="mainTableList"
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
              prop="BusinessAreaName"
              label="业务领域"
              width="200">
            </el-table-column>
            <el-table-column
              prop="Description"
              label="描述"
            >
            </el-table-column>
            <el-table-column
              prop="StateText"
              label="状态"
              width="80">
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
        </div>
        <save-footer
          :isCancel="true"
          cancelText="关闭"
          saveText="确认"
          @cancel="dialogTableVisible = false"
          @save="handleSaveSelectTable">
        </save-footer>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getApprovalTable, saveApprovalTable, getBusinessAreaList, getComTables, removeMainTable, removeDetailTable } from '@/api/approve'
  import { flowAutoLogin, flowBaseFn } from '@/utils/mixin'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  export default {
    mixins: [flowBaseFn, flowAutoLogin],
    data () {
      return {
        loading: false,
        ruleList: [],
        flowId: '',
        businessAreaList: [],
        relationTable: [],
        mainTableList: [],
        queryObj: {
          state: '2',
          businessAreaCode: '',
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
      this._getBusinessAreaList()
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
      },
      // 业务类型字典表
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          if (res.data.State === REQ_OK) {
            this.businessAreaList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '业务领域获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '业务领域获取失败，请刷新重试！'
          })
        })
      },
      // 获取主表列表
      _getComTables () {
        this.tableLoading = true
        getComTables(this.queryObj).then(res => {
          this.tableLoading = false
          if (res.data.State === REQ_OK) {
            this.mainTableList = res.data.Data
            this.total = res.data.Total
          } else {
            this.$message({
              type: 'error',
              message: '主表获取失败，请刷新重试！'
            })
          }
        })
      },
      // 删除主表
      _removeMainTable (index, tables, tableCode, flowId) {
        if (flowId) {
          this.$confirm('确认删除此主表配置吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            removeMainTable(tableCode, flowId).then(res => {
              if (res.data.State === REQ_OK) {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                tables.splice(index, 1)
                // this._getApprovalTable()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败！'
                })
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败！'
              })
            })
          }).catch(() => {
          })
        } else {
          tables.splice(index, 1)
        }
      },
      // 删除明细表
      _removeDetailTable (index, tables, tableCode, mainTableCode) {
        if (tableCode) {
          this.$confirm('确认删除此明细表吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            removeDetailTable(tableCode, mainTableCode, this.flowId).then(res => {
              if (res.data.State === REQ_OK) {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
                tables.splice(index, 1)
                // this._getApprovalTable()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败！'
                })
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败！'
              })
            })
          }).catch(() => {
          })
        } else {
          tables.splice(index, 1)
        }
      },
      // 点击规则切换
      handleRuleClick (tab, event) {
        this._getApprovalTable()
      },
      // 新增私有主表
      handleAddPrivateTable () {
        this.relationTable.Private.push({
          TableCode: '',
          TableName: '',
          DetailTables: []
        })
      },
      // 新增共有主表
      handleAddPublicTable () {
        this.relationTable.Public.push({
          TableCode: '',
          TableName: '',
          DetailTables: []
        })
      },
      // 新增明细表
      handleAddDetailTable (table) {
        table.DetailTables.push({
          TableCode: '',
          TableName: ''
        })
      },
      // 点击选择表弹窗
      handleClickSelectTable (table, state) {
        this.dialogTableVisible = true
        this.currentTable = table
        this.queryObj.publicState = state
        this._getComTables()
      },
      // 选择业务类型
      handleChangeBusinessType () {
        this._getComTables()
      },
      // 已择表弹窗回调
      handleSelectionChange (val) {
        this.selectedTable = val
      },
      // 保存选择表弹窗
      handleSaveSelectTable () {
        if (this.selectedTable && this.selectedTable.length > 1) {
          this.$message({
            type: 'warning',
            message: '最多只能选择一个表！'
          })
          return
        }
        if (this.selectedTable && !this.selectedTable.length) {
          this.$message({
            type: 'warning',
            message: '未选择表！'
          })
          return
        }
        this.dialogTableVisible = false
        this.currentTable.TableCode = this.selectedTable[0].TableCode
        this.currentTable.TableName = this.selectedTable[0].TableName
      },
      // 编辑
      handleClickEditTable (table) {
        this.$router.push({
          path: '/platform/approvalFlow/tableManage/tableEdit',
          query: {
            tableCode: table.TableCode
          }
        })
      },
      // 预览
      handleClickOverviewTable (table) {
        this.$router.push({
          path: '/platform/approvalFlow/tableManage/showTable',
          query: {
            tableCode: table.TableCode
          }
        })
      },
      // 保存关联表单
      handleRelationTableSave () {
        this.loading = true
        saveApprovalTable(JSON.stringify(this.relationTable), this.flowId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this._getApprovalTable()
          } else {
            this.$message({
              type: 'error',
              message: res.data.Error
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '保存失败，请重试！'
          })
        })
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
    },
    watch: {
      '$route' (to, from) {
        this.flowId = this.$route.query.flowId
        this._getApprovalTable()
      }
    },
    components: {
      SaveFooter
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
