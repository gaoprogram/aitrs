<!--
  User: xxxxxxx
  Date: 2019/4/30
  by： gaol
  功能： 审批流——表单管理内容页面
-->

<template>
  <div class="table-manage-container mglr-30">
    <!--搜索部分-->
    <div class="search-container">
      <el-select
        clearable
        v-model="queryObj.businessAreaCode"
        @change="handleChangeBusinessType"
        @clear="handleChangeBusinessType"
        placeholder="请选择业务领域/审批"
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
      <el-button type="primary" @click="handleClickSearch">搜索</el-button>
      <el-button type="primary" @click="handleReset">重置</el-button>
    </div>

    <!--启用表单，新增自定义表单，复制表单区域-->
    <div class="btn-container">
      <el-button type="primary" @click="openSysTable">启用系统表单</el-button>
      <el-button type="primary" @click="handleClickAddTable">新增自定义表单</el-button>
      <el-button type="primary" @click="handleClickCopyTable" :disabled="!selectedTable.length">复制表单</el-button>
    </div>

    <!--全部，已上架，已下架，草稿部分-->
    <el-tabs v-model="queryObj.state" @tab-click="handleChangeBusinessType">
      <el-tab-pane label="全部" :name="'-1'"></el-tab-pane>
      <el-tab-pane label="已上架" :name="'2'"></el-tab-pane>
      <el-tab-pane label="已下架" :name="'3'"></el-tab-pane>
      <el-tab-pane label="草稿" :name="'1'"></el-tab-pane>
    </el-tabs>

    <!--tab表格部分-->
    <div class="table-content-container">
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        border
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        :show-header="true"
        @selection-change="handleSelectionTable"
        style="width: 100%"
        max-height="450">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          fixed
          prop="TableName"
          label="表单名称"
          width="250"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="BusinessAreaName"
          label="业务领域"
          width="120"
          sortable
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="TableNature"
          label="表单属性"
          width="120"
          sortable>
        </el-table-column>

        <el-table-column
          prop="VersionNumberText"
          label="版号"
          width="80"
          sortable>
        </el-table-column>

        <el-table-column
          prop="Description"
          label="描述"
          width="250"
          sortable
          show-overflow-tooltip
        > 
        </el-table-column>

        <el-table-column
          prop="StateText"
          label="状态"
          sortable
          width="80">
        </el-table-column>

        <el-table-column
          prop="EmployeeName"
          label="修改人"
          width="120"
          sortable>
        </el-table-column>

        <el-table-column
          prop="CreateDate"
          label="修改时间"
          width="160"
          sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.CreateDate | replaceTime }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="350"
        >
          <template slot-scope="scope">
            <el-button @click="handleClickShow(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClickUp(scope.row)" type="text" size="small" v-if="!scope.row.IsSystem && scope.row.State === 2">升版</el-button>
            <el-button @click="handleClickEdit(scope.row)" type="text" size="small" v-show="!scope.row.IsSystem && scope.row.State !== 3">编辑</el-button>
            <el-button @click="handleClickDel(scope.row)" type="text" size="small" v-show="scope.row.State == 1 ">删除</el-button>
            <el-button @click="handleClickChangeState(scope.row)" type="text" size="small" v-html="scope.row.State === 2 ? '下架' : '上架' "></el-button>
            <el-button @click="handleClickQuote(scope.row)" type="text" size="small">引用</el-button>
            <el-button @click="handleClickHistory(scope.row)" type="text" size="small">历史</el-button>
            <el-button @click="handleClickLog(scope.row)" type="text" size="small" disabled>日志</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页部分-->
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

    <!--启用表单的dialog部分-->
    <el-dialog title="启用系统表单"
      :visible.sync="dialogTableVisible"
      width="960px"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-table :data="sysTableData" border @selection-change="handleSelectionChange" v-loading="sysTableLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="TableName" label="表单名" width="120"></el-table-column>
        <el-table-column property="BusinessTypeName" label="业务领域" width="120"></el-table-column>
        <el-table-column property="Description" label="描述"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClickTableDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <save-footer :isCancel="true" cancelText="关闭" @cancel="dialogTableVisible = false"
                   @save="handleSaveSelectSysTable"></save-footer>
    </el-dialog>


    <!--查看表单详情dialog区域-->
    <el-dialog title="系统表单详情"
      :visible.sync="dialogTableDetailVisible"
      width="500px"
      append-to-body
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
                </p>
                <div v-for="team in sysTableDetailObj.Teams"
                     :key="team.TeamCode"
                     v-if="sysTableDetailObj.Teams &&　sysTableDetailObj.Teams.length">
                  <p v-for="field in team.Fields" :key="field.FieldCode" v-if="team.Fields && team.Fields.length">
                    名称：{{field.FieldName}}
                    <span style="color: #cccccc;margin-left: 30px">类型：{{field.DataTypeName}}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-card>
      <save-footer :isCancel="false" saveText="关闭" @save="dialogTableDetailVisible = false"></save-footer>
    </el-dialog>


    <!--查看引用的弹框组件-->
    <table-quote v-if="showTableQuote" :tableCode="currentTableCode" @tableQuoteClose="showTableQuote = false"></table-quote>

    <!--查看历史部分的弹窗组件-->
    <table-history v-if="showTableHistory" :templateCode="currentTemplateCode" @versitionRollBack="versitionRollBack" @tableHistoryClose="showTableHistory = false"></table-history>

    <!--动态显示路由的部分-->
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getBusinessAreaList,
    getComTables,
    copyAddTable,
    deleteComTable,
    getTableConfigList,
    startUseTable,
    setComTableState,
    getTeamsAndFields,
    upgradeTableVersion
  } from '@/api/approve'
  import { flowAutoLogin } from '@/utils/mixin'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import TableQuote from './table-quote'
  import TableHistory from './table-history'

  export default {
    mixins: [flowAutoLogin],
    data () {
      return {
        tableLoading: false,
        queryObj: {
          state: '-1',
          businessAreaCode: '',
          Key: '',
          pageSize: 10,
          pageNum: 1
        },
        businessAreaList: [],
        tableData: [],
        total: 0,
        selectedTable: [],
        dialogTableVisible: false,
        sysTableData: [],
        sysTableLoading: false,
        dialogTableDetailVisible: false,
        sysTableDetailLoading: false,
        sysTableDetailObj: {},
        multipleSelection: [],
        showTableQuote: false,
        showTableHistory: false,
        currentTableCode: '',
        currentTemplateCode: ''
      }
    },
    created () {
      this._getBusinessAreaList()
      this._getComTables()
    },
    computed: {

    },
    mounted () {
      this.$bus.$on('tableManageRefresh', () => {
        this._getComTables()
      })
    },
    beforeDestroy () {
      this.$bus.$off('tableManageRefresh')
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        // console.log(column)
        // console.log(row[column["property"]])
        // console.log(rowIndex)
        // console.log(columnIndex)
        // if(rowIndex === 1 && columnIndex === 2){ //指定坐标
        //     return 'background:pink'
        // }else{
        //     return ''
        // }

        // if(rowIndex == 2){
        //   if(column["property"] == "TableName"){
        //     if (row[column["property"]] > 540) {
        //       return 'background:pink;color: red'
        //     }else {
        //       return 'background:black'
        //     }
        //   }
        // }
      },
      headerCellStyle({row,rowIndex}){
        debugger
        return `
          color: red;
        `
      },
      // 业务领域接口
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.businessAreaList = res.data.Data
          }
        })
      },
      // 获取表单列表
      _getComTables () {
        debugger
        this.tableLoading = true
        getComTables(this.queryObj).then(res => {
          this.tableLoading = false
          if (res.data.State === REQ_OK) {
            debugger
            this.tableData = res.data.Data
            this.total = res.data.Total
          } else {
            this.$message({
              type: 'error',
              message: '请求失败，刷新重试！'
            })
          }
        }).catch(() => {
          this.tableLoading = false
          this.$message({
            type: 'error',
            message: '请求失败，刷新重试！'
          })
        })
      },
      // 获取启用系统表单列表
      _getTableConfigList () {
        this.sysTableLoading = true
        getTableConfigList(this.versionId).then(res => {
          this.sysTableLoading = false
          if (res.data.State === REQ_OK) {
            this.sysTableData = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '系统表获取失败，请重试！'
            })
          }
        }).catch(() => {
          this.sysTableLoading = false
          this.$message({
            type: 'error',
            message: '系统表获取失败，请重试！'
          })
        })
      },
      // 选择业务类型
      handleChangeBusinessType () {
        this._getComTables()
      },
      // 搜索
      handleClickSearch () {
        this.queryObj.pageNum = 1
        this._getComTables()
      },
      // 重置搜索条件
      handleReset () {
        this.queryObj = {
          state: '-1',
          businessAreaCode: '',
          Key: '',
          pageSize: 10,
          pageNum: 1
        }
        this._getComTables()
      },
      // 新增表单
      handleClickAddTable () {
        // 跳转到 表单编辑的 页面
        this.$router.push({
          path: '/platform/approvalFlow/tableManage/tableEdit'
        })
      },
      // 复制表单
      handleClickCopyTable () {
        if (this.selectedTable.length > 1) return this.$message.info('每次只能复制一个表单')
        this.$confirm(`确定按照原表单'${this.selectedTable[0].TableName}'复制新增生成新的表单吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          copyAddTable(this.selectedTable[0].TableCode).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message.success('复制成功')
              this._getComTables()
            } else {
              this.$message.error('复制失败，请重试')
            }
          }).catch(() => {
            this.$message.error('复制失败，请重试')
          })
        }).catch(() => {
        })
      },
      // 表单勾选后的回调
      handleSelectionTable (val) {
        this.selectedTable = val
      },
      // 启用系统表单
      openSysTable () {
        this._getTableConfigList()
        this.dialogTableVisible = true
      },
      // 保存选择的启用系统表单
      handleSaveSelectSysTable () {
        if (!this.multipleSelection.length) {
          this.$message({
            type: 'warning',
            message: '未选择系统表单！'
          })
          return
        }
        let tables = this.multipleSelection.map(item => {
          return item.TableCode
        })
        startUseTable(JSON.stringify(tables)).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('启用成功')
            this.dialogTableVisible = false
            this._getComTables()
          } else {
            this.$message.error('启用失败，请重试')
          }
        }).catch(() => {
          this.$message.error('启用失败，请重试')
        })
      },
      // 手动勾选系统表单后的回调
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 查看系统表单详情
      handleClickTableDetail (row) {
        this.dialogTableDetailVisible = true
        this.sysTableDetailLoading = true
        getTeamsAndFields(row.TableCode).then(res => {
          this.sysTableDetailLoading = false
          if (res.data.State === REQ_OK) {
            this.sysTableDetailObj = res.data.Data
          } else {
            this.$message.error('加载失败，请关闭重试')
          }
        }).catch(() => {
          this.sysTableDetailLoading = false
          this.$message({
            type: 'error',
            message: '加载失败，请关闭重试！'
          })
        })
      },
      // 查看
      handleClickShow (row) {
        debugger
        this.$router.push({
          path: '/platform/approvalFlow/tableManage/showTable',
          query: {
            tableCode: row.TableCode
          }
        })
      },
      // 升版
      handleClickUp (row) {
        this.$confirm(`表单基本信息变更请通过编辑操作完成。表单配置变更方可执行升版操作。然后对新版本表单进行编辑。该操作将不影响历史和当前流转流程。`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableLoading = true
          upgradeTableVersion(row.TableCode).then(res => {
            this.tableLoading = false
            if (res.data.State === REQ_OK) {
              this.$message.success('升版成功')
              this._getComTables()
            } else {
              this.$message.error(`${res.data.Error}`)
            }
          }).catch(() => {
            this.tableLoading = false
            this.$message.error('升版失败err，请重试')
          })
        }).catch(() => {
        })
      },
      // 编辑
      handleClickEdit (row) {
        if (row.State === 2) {
          this.$confirm('该表单还有流程在运行，如果编辑的话，有可能导致运行中流程出错，确定要编辑吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/platform/approvalFlow/tableManage/tableEdit',
              query: {
                tableCode: row.TableCode
              }
            })
          }).catch(() => {
          })
        } else {
          this.$router.push({
            path: '/platform/approvalFlow/tableManage/tableEdit',
            query: {
              tableCode: row.TableCode
            }
          })
        }
      },
      // 删除
      handleClickDel (row) {
        debugger
        if (!row.SysTableName) {
          // 无关联表单
          this.$confirm(`确定要对表单【${row.TableName}】执行删除操作吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteComTable(row.TableCode).then(res => {
              if (res.data.State === REQ_OK) {
                this.$message.success('删除成功')
                this._getComTables()
              } else {
                this.$message.error(res.data.Error)
              }
            }).catch(() => {
              this.$message.error('删除失败，连接失败，请重试')
            })
          }).catch(() => {

          })
        } else {
          // 有关联系统表单则 无法删除
          this.$message(`表单${row.TableCode}曾被流程${row.RoleRange},表${row.ParentTableCode}引用过，无法执行删除操作`)
        }
      },
      // 修改状态
      handleClickChangeState (row) {
        debugger
        // State 1 是草稿  2 是已上架   3是 已下架  -1 是全部
        let str = row.State === 2 ? '下架' : '上架'
        this.$confirm(`是否对表单'${row.TableName}'执行${str}操作？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          debugger
          let status
          let str = row.State === 2 ? '下架' : '上架'
          this.tableLoading = true
          switch (str) {
            case '上架':
              status = 2
              break
            case '下架':
              status = 3
              break
          }
          debugger
          setComTableState(row.TableCode, status).then(res => {
            this.tableLoading = false
            if (res.data.State === REQ_OK) {
              this.$message.success(`${str}成功`)
              this._getComTables()
            } else {
              this.$message.error(res.data.Error)
            }
          }).catch(() => {
            this.tableLoading = false
            this.$message.error(`${str}失败，请重试`)
          })
        }).catch(() => {
        })
      },
      // 引用
      handleClickQuote (row) {
        this.currentTableCode = row.TableCode
        this.showTableQuote = true
      },
      // 历史
      handleClickHistory (row) {
        this.currentTemplateCode = row.TemplateCode
        this.showTableHistory = true
      },
      // 历史版本回滚后子组件触发的事件
      versitionRollBack () {
        this._getComTables()
      },
      // 日志
      handleClickLog (row) {
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
    components: {
      SaveFooter,
      TableQuote,
      TableHistory
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-manage-container
    .search-container, .btn-container
      margin-bottom 5px
    .btn-container
      text-align right
    .table-content-container 
      height max-height 600px !important
    >>>.el-loading-mask
      background transparent !important    
</style>
