<!--
  User: xxxxxxx
  Date: 2018/7/9
  功能：表单设置
-->

<template>
  <div class="relation-table-container" v-loading="loading">
    <div style="display: flex">
      <div class="left-container">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
          <el-select v-model="nodeObj.NodeId" placeholder="切换节点" size="small" @change="_getNodeTable">
            <el-option
              v-for="item in nodeList"
              :key="item.NodeId"
              :label="item.Name"
              :value="item.NodeId">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" @click="handleAddNodeTable">新增节点表单</el-button>
        </div>
        <div class="left-title">节点表单</div>
        <div class="table-content-container">
          <div class="title-table">已配置表单库</div>
          <p style="padding-left: 20px; color: #cccccc" v-if="tableSetArr && tableSetArr.length === 0">暂无数据</p>
          <div class="table-item" v-for="(table, index) in tableSetArr" :key="table.TableCode">
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
              <el-button size="small" icon="el-icon-delete" @click="_removeMainTable(index, table.TableCode, table.FlowId)">删除</el-button>
              <el-button size="small" icon="el-icon-plus" @click="handleAddDetailTable(table)">明细表</el-button>
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
              <el-button size="small" icon="el-icon-delete" @click="_removeDetailTable(i, table.DetailTables, detailTable.TableCode, table.FlowId)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="right-title">流程表单</div>
        <div class="table-content-container">
          <div class="title-table">共有表单库</div>
          <p style="padding-left: 20px; color: #cccccc" v-if="relationTable.Public && relationTable.Public.length === 0">暂无数据</p>
          <div class="table-item" v-for="(table, index) in relationTable.Public" :key="table.TableCode">
            <div class="main-table-content">
              <el-tag class="item">主表</el-tag>
              <el-input
                class="item"
                placeholder="请选择表单"
                v-model="table.TableName"
                size="small"
                style="width: 150px"
                :disabled="true">
              </el-input>
              <el-button size="small" type="primary" @click="handleClickTableDetail(table.TableCode)">预览</el-button>
            </div>
            <div class="detail-table-content" v-for="(detailTable, i) in table.DetailTables" style="padding-left: 20px" :key="i">
              <el-tag class="item">明细表</el-tag>
              <el-input
                class="item"
                placeholder="请选择表单"
                v-model="detailTable.TableName"
                size="small"
                style="width: 150px"
                :disabled="true">
              </el-input>
              <el-button size="small" type="primary" @click="handleClickTableDetail(detailTable.TableCode)">预览</el-button>
            </div>
          </div>
        </div>
        <div class="table-content-container">
          <div class="title-table">自有表单库</div>
          <p style="padding-left: 20px; color: #cccccc" v-if="relationTable.Private && relationTable.Private.length === 0">暂无数据</p>
          <div class="table-item" v-for="(table, index) in relationTable.Private" :key="table.TableCode">
            <div class="main-table-content">
              <el-tag class="item">主表</el-tag>
              <el-input
                class="item"
                placeholder="请选择表单"
                v-model="table.TableName"
                size="small"
                style="width: 150px"
                :disabled="true">
              </el-input>
              <el-button size="small" type="primary" @click="handleClickTableDetail(table.TableCode)">预览</el-button>
            </div>
            <div class="detail-table-content" v-for="(detailTable, i) in table.DetailTables" style="padding-left: 20px">
              <el-tag class="item">明细表</el-tag>
              <el-input
                class="item"
                placeholder="请选择表单"
                v-model="detailTable.TableName"
                size="small"
                style="width: 150px"
                :disabled="true">
              </el-input>
              <el-button size="small" type="primary" @click="handleClickTableDetail(detailTable.TableCode)">预览</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <save-footer
      :isCancel="false"
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
               v-loading="tableLoading"
    >
      <div class="table-content-container">
        <el-table
          :data="currntSelectTableList"
          border
          height="500"
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
            width="120">
          </el-table-column>
          <el-table-column
            prop="Description"
            label="描述"
          >
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
      </div>
      <save-footer
        :isCancel="true"
        cancelText="关闭"
        saveText="确认"
        @cancel="dialogTableVisible = false"
        @save="handleSaveSelectTable">
      </save-footer>
    </el-dialog>
    <el-dialog title="表单预览"
               :visible.sync="dialogTableDetailVisible"
               width="600px"
               :append-to-body="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
    >
      <el-card v-loading="sysTableDetailLoading">
        <div class="table-design-container" style="height: 400px">
          <el-scrollbar style="height: 100%" :native="false">
            <div style="font-size: 18px; text-align: center; padding: 10px 0">表单名：{{sysTableDetailObj.TableName}}</div>
            <div class="content">
              <div>已配置表单控件：</div>
              <div style="padding: 10px">
                <p v-for="field in sysTableDetailObj.Fields"
                   :key="field.FieldCode"
                   v-if="sysTableDetailObj.Fields && sysTableDetailObj.Fields.length"
                >
                  名称：{{field.FieldName}}
                  <span style="color: #cccccc;margin-left: 30px">类型：{{field.DataTypeName}}</span>
                  <span style="color: #cccccc;margin-left: 30px" v-if="field.Tips">提示：{{field.Tips}}</span>
                </p>
                <div v-for="team in sysTableDetailObj.Teams"
                     :key="team.TeamCode"
                     v-if="sysTableDetailObj.Teams &&　sysTableDetailObj.Teams.length">
                  <p v-for="field in team.Fields" :key="field.FieldCode" v-if="team.Fields && team.Fields.length">
                    名称：{{field.FieldName}}
                    <span style="color: #cccccc;margin-left: 30px">类型：{{field.DataTypeName}}</span>
                    <span style="color: #cccccc;margin-left: 30px" v-if="field.Tips">提示：{{field.Tips}}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
      <save-footer :isCancel="false" saveText="关闭" @save="dialogTableDetailVisible = false"></save-footer>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getApprovalTable,
    getBusinessTypeList,
    getComTables,
    removeMainTable,
    removeDetailTable,
    getComTeamsAndFields,
    getNodeTable,
    saveNodeTable
  } from '@/api/approve'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
    data () {
      return {
        loading: false,
        nodeObj: {},
        currentNodeId: '',
        ruleList: [],
        flowId: '',
        businessTypeList: [],
        relationTable: [],
        currntSelectTableList: [],
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
        selectedTable: {},
        tableSetArr: [],
        dialogTableDetailVisible: false,
        sysTableDetailLoading: false,
        sysTableDetailObj: {}
      }
    },
    created () {
      this.nodeObj = {...this.nodeObjStore}
      this.flowId = this.$route.query.flowId
      this._getNodeTable()
      this._getBusinessTypeList()
      this._getApprovalTable()
    },
    methods: {
      // 获取节点表单
      _getNodeTable () {
        this.loading = true
        getNodeTable(this.flowId, this.nodeObj.NodeId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.tableSetArr = res.data.Data
          } else {
            this.$message.error('节点表单获取失败，请重试')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('节点表单获取失败，请重试')
        })
      },
      // 获取关联表
      _getApprovalTable () {
        getApprovalTable(this.flowId).then(res => {
          if (res.data.State === REQ_OK) {
            this.relationTable = res.data.Data
          } else {
            this.$message({
              message: '关联表单获取失败，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '关联表单获取失败，请刷新重试！',
            type: 'error'
          })
        })
      },
      // 业务类型字典表
      _getBusinessTypeList () {
        getBusinessTypeList().then(res => {
          if (res.data.State === REQ_OK) {
            this.businessTypeList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '业务类型获取失败，请刷新重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '业务类型获取失败，请刷新重试！'
          })
        })
      },
      // 选择添加弹窗获取表单列表
      _getComTables () {
        this.tableLoading = true
        getComTables(this.queryObj).then(res => {
          this.tableLoading = false
          if (res.data.State === REQ_OK) {
            this.currntSelectTableList = res.data.Data
            this.total = res.data.Total
          } else {
            this.$message({
              type: 'error',
              message: '主表获取失败，请刷新重试！'
            })
          }
        })
      },
      // 流程表单预览
      handleClickTableDetail (tableCode) {
        this.dialogTableDetailVisible = true
        this.sysTableDetailLoading = true
        getComTeamsAndFields(tableCode).then(res => {
          this.sysTableDetailLoading = false
          if (res.data.State === REQ_OK) {
            this.sysTableDetailObj = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '加载失败，请关闭重试！'
            })
          }
        }).catch(() => {
          this.sysTableDetailLoading = false
          this.$message({
            type: 'error',
            message: '加载失败，请关闭重试！'
          })
        })
      },
      // 删除主表
      _removeMainTable (index, tableCode, flowId) {
        if (tableCode) {
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
                console.log()
                this.tableSetArr.splice(index, 1)
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
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.tableSetArr.splice(index, 1)
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
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          tables.splice(index, 1)
        }
      },
      // 点击规则切换
      handleRuleClick (tab, event) {
        this._getApprovalTable()
      },
      // 新增节点主表
      handleAddNodeTable () {
        this.tableSetArr.push({
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
      // 保存节点表单
      handleRelationTableSave () {
        this.loading = true
        saveNodeTable(this.flowId, this.nodeObj.NodeId, JSON.stringify(this.tableSetArr)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this._getNodeTable()
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
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relation-table-container
    .left-container, .right-container
      flex 1
      padding 0 10px
      .left-title, .right-title
        margin-bottom 10px
      .table-content-container
        margin-bottom 10px
        .title-table
          margin-bottom 10px
        .table-item
          padding-left 20px
          margin-bottom 20px
          .main-table-content, .detail-table-content
            display flex
            margin-bottom 10px
            .item
              margin-right 5px
    .right-container
      border-left 1px solid #dedede

  .el-button+.el-button {
    margin-left: 5px!important;
  }
</style>
