<!--
  User: gaol
  Date: 2019/5/23
  功能：节点设置—节点表单——表单设置
-->

<template>
  <div class="relation-table-container" v-loading="loading">
    <div style="display: flex">
      <div class="left-container">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
          <el-select v-model="nodeObj.NodeId" placeholder="切换节点" size="small" @change="_getNodeTable">
            <el-option
              v-for="(item,index) in nodeList"
              :key="item.NodeId"
              :label="item.Name"
              :value="item.NodeId">
            </el-option>
          </el-select>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" type="primary" size="small" @click="handleAddNodeTable">新增节点表单</el-button>
        </div>
        <div class="left-title">节点表单</div>
        <div class="table-content-container">
          <div class="title-table">已配置表单库</div>
          <!-- tableSetArr:{{tableSetArr}} -->
          <p style="padding-left: 20px; color: #cccccc" v-if="tableSetArr && tableSetArr.length === 0">暂无数据</p>
          <!---主表--start-->
          <div class="table-item" v-for="(table, index) in tableSetArr" :key="table.TableCode + index">
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
              <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectMainTable(table, 0, index, 'public_zhubiao')">选择</el-button>
              <el-button size="small" icon="el-icon-edit" :disabled="!table.TableName" @click="handleClickOverviewTable(table)">预览</el-button>
              <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-delete" @click="_removeMainTable(index, tableSetArr, table.TableCode, table.FlowId)">删除</el-button>
              <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-plus" @click="handleAddDetailTable(table)">新增明细表</el-button>
            </div>
            <!---主表--end-->

            <!-- table:{{table}} -->

            <!---明细表---start-->
            <div 
              class="detail-table-content" 
              v-for="(detailTable, i) in table.DetailTables" 
              :key="i"
              style="padding-left: 20px">
              <el-tag class="item">明细表</el-tag>
              <el-input
                class="item"
                placeholder="请选择表单"
                v-model="detailTable.TableName"
                size="small"
                style="width: 200px"
                :disabled="true">
              </el-input>
              <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectDetailTable(detailTable, 0, index, 'public_zhubiao_mingxi')">选择</el-button>
              <el-button size="small" icon="el-icon-edit" :disabled="!detailTable.TableName" @click="handleClickOverviewTable(detailTable)">预览</el-button>
              <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-setting" :disabled="!detailTable.TableName" @click="handleClickEvaluation(table,detailTable,0,index,i)">表单赋值</el-button>
              <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-delete" v-if="detailTable.Type!=='4'" @click="_removeDetailTable(i, table.DetailTables, detailTable.TableCode, table.TableCode)">删除</el-button>
            </div>
            <!---明细表---end-->
          </div>
        </div>
      </div>

      <!--表单设置右边区域——-start-->
      <!-- relationTable.Public：{{relationTable}} -->
      <div class="right-container">
        <div class="right-title">流程表单</div>
        <div class="table-content-container">
          <div class="title-table">共有表单库</div>
          <p style="padding-left: 20px; color: #cccccc" v-if="relationTable.Public && relationTable.Public.length === 0">暂无数据</p>
          <div class="table-item" v-for="(table, index) in relationTable.Public" :key="table.TableCode + index">
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
          <div class="table-item" v-for="(table, index) in relationTable.Private" :key="table.TableCode + index">
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
      <!--表单设置右边区域——-end-->

    </div> 
    <save-footer
      :isCancel="false"
      cancelText="关闭"
      @cancel="handleClose"
      @save="handleRelationTableSave">
    </save-footer>


    <!---选择表单的dialog弹框----start---->
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
          :highlight-current-row="true"
          border
          height="500"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55"
            :selectable="selectInit">
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
    <!---选择表单的dialog弹框----start---->

    <!--预览表单dialog---start--->
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
                <p v-for="(field,index) in sysTableDetailObj.Fields"
                   :key="field.FieldCode + index"
                   v-if="sysTableDetailObj.Fields && sysTableDetailObj.Fields.length"
                >
                  名称：{{field.FieldName}}
                  <span style="color: #cccccc;margin-left: 30px">类型：{{field.DataTypeName}}</span>
                  <span style="color: #cccccc;margin-left: 30px" v-if="field.Tips">提示：{{field.Tips}}</span>
                </p>
                <div v-for="(team,index) in sysTableDetailObj.Teams"
                     :key="team.TeamCode + index"
                     v-if="sysTableDetailObj.Teams &&　sysTableDetailObj.Teams.length">
                  <p v-for="(field,index) in team.Fields" :key="field.FieldCode" v-if="team.Fields && team.Fields.length">
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
    <!--预览表单---end--->


    <!---明细表表单赋值dialog--start--->
    <div v-show="tableAssignShow" class="table-assignBox">
      <table-assign 
       @tableAssignSave='tableAssignSave' 
       :dailog_loading.sync = 'dailog_loading'
       :tableAssignShow.sync = "tableAssignShow" 
       :calculationType= 'calculationType' 
       :EvaluationData_detail='EvaluationData_detailRes'
       :EvaluationData_main='EvaluationData_mainRes'
       :evaluationData='evaluationData_res'></table-assign>
    </div>
    <!---明细表表单赋值dialog--end--->      

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getApprovalTable,
    getBusinessTypeList,
    getComTables,
    GetNodeMainTables,
    GetNodeDetailTables,
    removeMainTable,
    removeDetailTable,
    getComTeamsAndFields,
    getNodeTable,
    saveNodeTable,
    GetEvaluationFields,
    GetEvaluation,
    SaveEvaluation
  } from '@/api/approve'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import TableAssign from '../relation-table/table-assign'

  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
    components: {
      TableAssign,
      SaveFooter
    },
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
        tableSetArr: [],  // 左边的组表数据
        dialogTableDetailVisible: false,
        sysTableDetailLoading: false,
        sysTableDetailObj: {},

        currentPublicArr: [],  // 新增时 当前共有大类 下的所有的主表数据集合
        currentPrivateArr: [], // 新增时 当前 自有大类 下的所有主表数据集合
        currentPublicArr_mingxi: [], // 新增时 当前共有大类 下的所有的 明细表 数据集合
        currentPrivateArr_mingxi: [], // 新增时 当前自有大类 下的所有的 明细表 数据集合
        currentStr: '',  // 当前点击新增 的 类型（公共主表、公共明细、自有主表、自有明细表）

        tableAssignShow: false,  // 表单赋值的 dialog 弹框的 显示/隐藏
        calculationType: [
          {
            type: '合计',
            value: 'sum'
          },
          {
            type: '平均',
            value: 'avg'
          }
        ],                        // 表单赋值 的类型
        evaluationData_res: [
          {
            DetailFieldCode: [],
            MainFieldCode: [],
            CurrentEvaluation: {
              CalculationType: '',
              DetailFieldCode: '',
              MainFieldCode: ''
            }
          }
        ], // 赋值明细表下拉框的配置数据
        EvaluationData_mainRes: [], // 获取的主表表单 赋值 字段的下拉框数据集合
        EvaluationData_detailRes: [], // 获取的明细表表单 字段下拉框 数据集合
        CurrentEvaluation_Res: [], // 当前的 赋值数据的集合
        mainTableCode_assign: '', // 点击表单赋值时候 的主表code
        detailTableCode_assign: '', // 点击表单赋值时的明细表code
        dailog_loading: false   // 控制 赋值弹框中的loading
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
      // 表格初始化时不让勾选已选过的行
      selectInit (row, index) {
        debugger
        console.log(this.currentPublicArr)
        console.log(this.currentPrivateArr)
        console.log(this.currentPublicArr_mingxi)
        console.log(this.currentPrivateArr_mingxi)
        switch (this.currentStr) {
          case 'public_zhubiao':
            if (this.currentPublicArr && this.currentPublicArr.length) {
              console.log(this.currentPublicArr)
              console.log(row.TableCode)
              debugger
              // tableCode 相同的就返回 false
              return this.currentPublicArr.indexOf(row.TableCode) === -1
            }
            break

          case 'public_zhubiao_mingxi':
            if (this.currentPublicArr_mingxi && this.currentPublicArr_mingxi.length) {
              console.log(this.currentPublicArr_mingxi)
              console.log(row.TableCode)
              debugger
              // tableCode 相同的就返回 false
              return this.currentPublicArr_mingxi.indexOf(row.TableCode) === -1
            }
            break
  
          case 'private_zhubiao':
            if (this.currentPrivateArr && this.currentPrivateArr.length) {
              console.log(this.currentPrivateArr)
              console.log(row.TableCode)
              debugger
              // tableCode 相同的就返回 false
              return this.currentPrivateArr.indexOf(row.TableCode) === -1
            }
            break

          case 'private_zhubiao_mingxi':
            if (this.currentPrivateArr_mingxi && this.currentPrivateArr_mingxi.length) {
              console.log(this.currentPrivateArr_mingxi)
              console.log(row.TableCode)
              debugger
              // tableCode 相同的就返回 false
              return this.currentPrivateArr_mingxi.indexOf(row.TableCode) === -1
            }
            break
  
          default:
            break
        }
      },
      // 赋值时获取 主表单下拉框字段
      _getMainEvaluation () {
        GetEvaluationFields(this.mainTableCode_assign).then((res) => {
          debugger
          if (res && res.data.State === REQ_OK) {
            debugger
            this.EvaluationData_mainRes = res.data.Data
            if (this.evaluationData_res && this.evaluationData_res.length) {
              this.evaluationData_res.forEach((item, i) => {
                item.MainFieldCode = JSON.parse(JSON.stringify(res.data.Data))
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: `获取主表表单字段数据失败,请刷新后重试`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `获取主表表单字段数据失败,请刷新后重试`
          })
        })
      },
      // 赋值时获取 明细表字段下拉框选项
      _getDetailEvaluation () {
        GetEvaluationFields(this.detailTableCode_assign).then((res) => {
          debugger
          if (res && res.data.State === REQ_OK) {
            debugger
            this.EvaluationData_detailRes = res.data.Data
            if (this.evaluationData_res && this.evaluationData_res.length) {
              this.evaluationData_res.forEach((item, i) => {
                item.DetailFieldCode = JSON.parse(JSON.stringify(res.data.Data))
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: `获取明细表表单字段数据失败,请刷新后重试`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `获取组明细表表单字段数据失败,请刷新后重试`
          })
        })
      },
      // 获取赋值
      _getEvaluation () {
        GetEvaluation(this.flowId, this.mainTableCode_assign, this.detailTableCode_assign).then((res) => {
          this.dailog_loading = false
          if (res && res.data.State === REQ_OK) {
            debugger
            this.CurrentEvaluation_Res = res.data.Data
            if (this.evaluationData_res && this.evaluationData_res.length) {
              this.evaluationData_res.forEach((item, i) => {
                if (res.data.Data && res.data.Data.length) {
                  item.CurrentEvaluation = JSON.parse(JSON.stringify(res.data.Data[i]))
                } else {
                  item.CurrentEvaluation = {
                    CalculationType: '--请选择--',
                    DetailFieldCode: '--请选择--',
                    MainFieldCode: '--请选择--'
                  }
                }
              })
            }
            // this.evaluationData_res[0].CalculationType = res.data.Data
            // this.evaluationData_res[0].CurrentEvaluation = res.data.Data
          } else {
            this.dailog_loading = false
            this.$message({
              type: 'error',
              message: '获取赋值数据失败err,请刷新后重试'
            })
          }
        }).catch(() => {
          this.dailog_loading = false
          this.$message({
            type: 'error',
            message: '获取赋值数据失败err,请刷新后重试'
          })
        })
      },
      // 获取节点表单
      _getNodeTable () {
        this.loading = true
        // 注： 此nodeObj 为 mixin中的 flowNodeSet 中获取的
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
            debugger
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
      // 获取主表、明细表数据
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
      // 选择添加弹窗获取主表单列表
      _getMainTables () {
        this.tableLoading = true
        GetNodeMainTables(this.flowId).then(res => {
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
      // 选择添加弹窗获取明细表单列表
      _getDetailTables () {
        this.tableLoading = true
        GetNodeDetailTables(this.flowId, this.nodeObj.nodeId).then(res => {
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
      // 左边界面的主表预览 和明细表预览
      handleClickOverviewTable (table) {
        this.$router.push({
          path: '/platform/approvalFlow/tableManage/showTable',
          query: {
            tableCode: table.TableCode
          }
        })
      },
      // 赋值
      handleClickEvaluation (table, detailTable, type, index, i) {
        debugger
        this.detailTableData = table
        this.mainTableCode_assign = table.TableCode
        this.detailTableCode_assign = detailTable.TableCode
        this.tableAssignShow = true
        this.dailog_loading = true
        // 获取主表表单赋值的数据
        this._getMainEvaluation()
        // 获取明细表单赋值的数据
        this._getDetailEvaluation()
        // 获取赋值
        this._getEvaluation()
      },
        // 保存赋值
      tableAssignSave (selectCalculationType) {
        debugger
        this.dailog_loading = true
        let evaluationSetData = []
        this.evaluationData_res.forEach((item, i) => {
          evaluationSetData.push(item.CurrentEvaluation)
        })
        console.log(evaluationSetData)
        SaveEvaluation(this.flowId, 0, this.mainTableCode_assign, this.detailTableCode_assign, JSON.stringify(evaluationSetData)).then((res) => {
          this.dailog_loading = false
          debugger
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '赋值保存成功'
            })
            // 隐藏弹框
            this.tableAssignShow = false
          } else {
            this.dailog_loading = false
            this.$message({
              type: 'error',
              message: '赋值保存失败'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '赋值保存失败'
          })
        })
      },
      // 右边界面的流程表单预览
      handleClickTableDetail (tableCode) {
        debugger
        // this.dialogTableDetailVisible = true
        // this.sysTableDetailLoading = true
        // getComTeamsAndFields(tableCode).then(res => {
        //   this.sysTableDetailLoading = false
        //   if (res.data.State === REQ_OK) {
        //     this.sysTableDetailObj = res.data.Data
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: '加载失败，请关闭重试！'
        //     })
        //   }
        // }).catch(() => {
        //   this.sysTableDetailLoading = false
        //   this.$message({
        //     type: 'error',
        //     message: '加载失败，请关闭重试！'
        //   })
        // })


        this.$router.push({
          path: '/platform/approvalFlow/tableManage/showTable',
          query: {
            tableCode: tableCode
          }
        })        
      },
      // 删除主表
      _removeMainTable (index, tables, tableCode, flowId) {
        debugger
        if (flowId) {
          if (tables && tables.length === 1) {
            // 这是公用主表中的最后一条主表进行删除时 给用户一个提示
            this.$confirm('这是最后一条主表配置,请谨慎删除！！！', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '再考虑考虑',
              type: 'warning'
            }).then(() => {
              // this.nodeObj 为minxin中 flowNodeSet 中获取的
              removeMainTable(tableCode, flowId, this.nodeObj.NodeId).then(res => {
                if (res.data.State === REQ_OK) {
                  this.$message({
                    type: 'success',
                    message: '删除成功！'
                  })
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
            })
          } else {
            // 不是最后一条 主表配置
            this.$confirm('确认删除此主表配置吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              removeMainTable(tableCode, flowId, this.nodeObj.NodeId).then(res => {
                if (res.data.State === REQ_OK) {
                  this.$message({
                    type: 'success',
                    message: '删除成功！'
                  })
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
            })
          }
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
            // this.nodeObj 为minxin中 flowNodeSet 中获取的
            removeDetailTable(tableCode, mainTableCode, this.flowId, this.nodeObj.NodeId).then(res => {
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
      // 点击选择主表
      handleClickSelectMainTable (table, state, idx, str) {
        debugger
        // state 0 表示 自有表类型， 1 表示 共用表类型
        // idx 表示当前的索引    str 表示 新增的是 共有主表 、 共有明细表、自有主表、自有明细表 这四种类型
        this.currentPublicArr = []
        this.currentPublicArr_mingxi = []
        this.currentPrivateArr = []
        this.currentPrivateArr_mingxi = []
        switch (str) {
          case 'public_zhubiao':
            this.currentStr = 'public_zhubiao'
            this.tableSetArr.forEach(item => {
              this.currentPublicArr.push(item.TableCode)
            })
            break

          case 'public_zhubiao_mingxi':
            this.currentStr = 'public_zhubiao_mingxi'
            this.tableSetArr[idx].DetailTables.forEach(item => {
              this.currentPublicArr_mingxi.push(item.TableCode)
            })
            break
          // case 'private_zhubiao':
          //   this.currentStr = 'private_zhubiao'
          //   this.relationTable.Private.forEach(item => {
          //     this.currentPrivateArr.push(item.TableCode)
          //   })
          //   break

          // case 'private_zhubiao_mingxi':
          //   this.currentStr = 'private_zhubiao_mingxi'
          //   this.relationTable.Private[idx].DetailTables.forEach(item => {
          //     this.currentPrivateArr_mingxi.push(item.TableCode)
          //   })
          //   break
          default:
            break
        }
        this.dialogTableVisible = true
        this.currentTable = table
        this.queryObj.publicState = state
        this._getMainTables()
      },
      // 点击选中明细表
      handleClickSelectDetailTable (table, state, idx, str) {
        // state 0 表示 自有表类型， 1 表示 共用表类型
        // idx 表示当前的索引    str 表示 新增的是 共有主表 、 共有明细表、自有主表、自有明细表 这四种类型
        debugger
        this.currentPublicArr = []
        this.currentPublicArr_mingxi = []
        this.currentPrivateArr = []
        this.currentPrivateArr_mingxi = []
        switch (str) {
          case 'public_zhubiao':
            this.currentStr = 'public_zhubiao'
            this.tableSetArr.forEach(item => {
              this.currentPublicArr.push(item.TableCode)
            })
            break

          case 'public_zhubiao_mingxi':
            this.currentStr = 'public_zhubiao_mingxi'
            this.tableSetArr[idx].DetailTables.forEach(item => {
              this.currentPublicArr_mingxi.push(item.TableCode)
            })
            break
          // case 'private_zhubiao':
          //   this.currentStr = 'private_zhubiao'
          //   this.relationTable.Private.forEach(item => {
          //     this.currentPrivateArr.push(item.TableCode)
          //   })
          //   break

          // case 'private_zhubiao_mingxi':
          //   this.currentStr = 'private_zhubiao_mingxi'
          //   this.relationTable.Private[idx].DetailTables.forEach(item => {
          //     this.currentPrivateArr_mingxi.push(item.TableCode)
          //   })
          //   break
          default:
            break
        }
        this.dialogTableVisible = true
        this.currentTable = table
        this.queryObj.publicState = state
        this._getDetailTables()
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relation-table-container
    .left-container, .right-container
      flex 1
      padding 0 10px
      box-sizing border-box
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
      width 30%
  .el-button+.el-button 
    margin-left: 5px!important;
  
  >>>.el-dialog__footer
    margin-top 0 !important
</style>
