<!--
  User: gaol
  Date: 2019/5/21
  功能：流程规则——流程编辑——流程表单 
-->

<template>
  <div class="relation-table-container" v-loading="loading">
    <div v-atris-flowRuleScan="{styleBlock:'block'}" style="text-align: right">
      <!-- <el-button type="primary" size="small" @click="handleClickSetTable(relationTable.Public[0])">表单设置</el-button> -->
      <el-button type="primary" size="small" @click="handleClickFunctionControl()">功能控制</el-button>
      <!-- <el-button type="primary" size="small" @click="handleClickTableAssign()">表单赋值</el-button> -->
      <el-button type="primary" size="small" @click="handleAddPublicTable">新增共有表单</el-button>
      <el-button type="primary" size="small" @click="handleAddPrivateTable">新增自有表单</el-button>
    </div>


    <!-- 公共表：{{relationTable.Public}} -->
    <!-- --------------------------------- -->
    <!-- 自有表：{{relationTable.Private}} -->
    <!--共用表单库部分--start-->
    <div class="content-container">
      <div class="title" style="font-weight:bold">共有表单库</div>
      <div class="table-item" v-for="(table, index) in relationTable.Public" :key="table.TableCode">
          <!-- 当前主表：{{table}} -->
          <!-- 已经选择的表： {{currentTable}} -->
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
          
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(table, 1, index, 'public_zhubiao')">选择</el-button>
          <el-button size="small" icon="el-icon-tickets" :disabled="!table.TableName" @click="handleClickOverviewTable(table)">预览</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-edit" :disabled="!table.TableName" @click="handleClickSetTable(table)">设置</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-delete" @click="_removeMainTable(index, relationTable.Public, table.TableCode, table.FlowId)">删除</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-plus" @click="handleAddDetailTable(table)">新增明细表</el-button>
        </div>

        <!--明细表--start-->
        <div class="detail-table-content" v-for="(detailTable, i) in table.DetailTables" style="padding-left: 20px">
           <!-- 明细表：{{table.DetailTables}} -->
           <!-- 明细表：{{table.DetailTables}} -->
          <el-tag class="item">明细表</el-tag>
          <el-input
            class="item"
            placeholder="请选择表单"
            v-model="detailTable.TableName"
            size="small"
            style="width: 200px"
            :disabled="true">
          </el-input>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(detailTable, 1, index, 'public_zhubiao_mingxi')">选择</el-button>
          <el-button size="small" icon="el-icon-tickets" :disabled="!detailTable.TableName" @click="handleClickOverviewTable(detailTable)">预览</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-edit" :disabled="!detailTable.TableName" @click="handleClickSetTable(detailTable)">设置</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-setting" :disabled="!detailTable.TableName" @click="handleClickEvaluation(table,detailTable,1,index,i)">表单赋值</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-delete" v-if="detailTable.Type!=='4'" @click="_removeDetailTable(i, table.DetailTables, detailTable.TableCode, table.TableCode)">删除</el-button>
        </div>
        <!--明细表--end-->

      </div>
    </div>
    <!--共用表单库部分--end-->

    <!--自有表单库部分--start-->
    <div class="content-container">
      <div class="title" style="font-weight:bold">
        <span>自有表单库</span>
        <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" effect="dark" content="添加自有表单">
          <i class="el-icon-circle-plus-outline privateTit"  @click="checkPrivateTable"></i>
        </el-tooltip>
      </div>
      <div class="table-item" v-for="(table, index) in relationTable.Private" :key="table.TableCode">
        <!----自有表单主表--start--->
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
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(table, 0, index,'private_zhubiao')">选择</el-button>
          <el-button size="small" icon="el-icon-tickets" :disabled="!table.TableName" @click="handleClickOverviewTable(table)">预览</el-button>          
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-edit" :disabled="!table.TableName" @click="handleClickSetTable(table)">设置</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-delete" @click="_removeMainTable(index, relationTable.Private, table.TableCode, table.FlowId)">删除</el-button>
          <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" icon="el-icon-plus" :disabled="!table.TableName" @click="handleAddDetailTable(table)">新增明细表</el-button>
        </div>
        <!----自有表单主表--end--->

        <!----自有表单明细表--start--->
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
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleClickSelectTable(detailTable, 0, index,'private_zhubiao_mingxi')">选择</el-button>
          <el-button size="small" icon="el-icon-tickets" :disabled="!detailTable.TableName" @click="handleClickOverviewTable(detailTable)">预览</el-button>
          <el-button size="small" icon="el-icon-edit" :disabled="!detailTable.TableName" @click="handleClickSetTable(detailTable)">设置</el-button>
          <el-button size="small" icon="el-icon-setting" :disabled="!detailTable.TableName" @click="handleClickEvaluation(table,detailTable,0,index,i)">表单赋值</el-button>
          <el-button size="small" icon="el-icon-delete" v-if="detailTable.Type!=='4'" @click="_removeDetailTable(i, table.DetailTables, detailTable.TableCode, table.TableCode)">删除</el-button>
        </div>
        <!----自有表单明细表--end--->

      </div>
    </div>
    <!--自有表单库部分--end-->

    <!---底部关闭/保存按钮部分--start-->
    <save-footer
      :isCancel="true"
      cancelText="关闭"
      @cancel="handleClose"
      @save="handleRelationTableSave">
    </save-footer>
    <!---底部关闭/保存按钮部分--end-->


    <!---新增主表、明细表时的dailog弹窗部分---start--->
    <el-dialog title="选择表单"
               :visible.sync="dialogTableVisible"
               width="960px"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :append-to-body="true"

    >
      <div v-loading="tableLoading">
        <!--搜索栏---start-->
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
        <!--搜索栏---end-->
        <!--table数据表格---start-->
        <div class="table-content-container">
          <el-table
            ref="multipleTable"
            :data="mainTableList"
            border
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
        <!--table数据表格---start-->

        <!---dailog弹框的 关闭、确认按钮--start-->
        <save-footer
          :isCancel="true"
          cancelText="关闭"
          saveText="确认"
          @cancel="dialogTableVisible = false"
          @save="handleSaveSelectTable">
        </save-footer>
        <!---dailog弹框的 关闭、确认按钮--end-->
      </div>
    </el-dialog>
    <!---新增主表、明细表时的dailog弹窗部分---end--->

    <!--功能控制--start--->
      <div v-show="functionControlShow" class="function-controlBox">
        <function-control :functionControlShow.sync = "functionControlShow"></function-control>
        <!-- <function-auth :roleRange="versionId"></function-auth> -->
      </div>
    <!--功能控制--end--->

    <!---明细表表单赋值--start--->
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
    <!---明细表表单赋值--end--->    

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { mapGetters } from 'vuex'
  import {
    getApprovalTable,
    saveApprovalTable,
    getBusinessAreaList,
    getComTables,
    removeMainTable,
    removeDetailTable,
    GetEvaluationFields,
    GetEvaluation,
    SaveEvaluation} from '@/api/approve'
  import { flowAutoLogin, flowBaseFn, flowNodeSet } from '@/utils/mixin'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import FunctionControl from './function-control'
  // import FunctionAuth from '@/components/platform/approval-flow/flow-config/field-set/function-auth'
  import TableAssign from './table-assign'

  export default {
    mixins: [flowBaseFn, flowAutoLogin, flowNodeSet],
    components: {
      SaveFooter,
      FunctionControl,
      // FunctionAuth,
      TableAssign
    },
    data () {
      return {
        loading: false,
        ruleList: [],
        flowId: '',   // 流id
        businessAreaList: [],
        relationTable: [],   // 表的数据集合（主表和明细表）
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
        selectedTable: {},

        currentPublicArr: [],  // 新增时 当前共有大类 下的所有的主表数据集合
        currentPrivateArr: [], // 新增时 当前 自有大类 下的所有主表数据集合
        currentPublicArr_mingxi: [], // 新增时 当前共有大类 下的所有的 明细表 数据集合
        currentPrivateArr_mingxi: [], // 新增时 当前自有大类 下的所有的 明细表 数据集合
        currentStr: '',  // 当前点击新增 的 类型（公共主表、公共明细、自有主表、自有明细表）

        functionControlShow: false, // 功能控制的 dialog 弹窗的显示/隐藏

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
      this._getBusinessAreaList()
      // 获取关联表单信息
      debugger
      this._getApprovalTable()
      //
    },
    mounted () {
      try{
        // this.tableCode_customer = this.$route.query.tableCode_customer

      }catch(err){
        
      }
    },
    computed: {
      ...mapGetters([
        // 'isPublic_params'
      ])
    },
    watch: {
      '$route'(to, from) {
        this.flowId = this.$route.query.flowId
        this._getApprovalTable()
      }
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
      // 获取关联表
      _getApprovalTable () {
        this.loading = true
        debugger
        getApprovalTable(this.flowId).then(res => {
          this.loading = false
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
          debugger
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
      // 获取主表/明细表 table表格数据
      _getComTables () {
        this.tableLoading = true
        getComTables(this.queryObj).then(res => {
          this.tableLoading = false
          if (res.data.State === REQ_OK) {
            debugger
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
        debugger
        if (flowId) {
          if (tables && tables.length === 1) {
            // 这是公用主表中的最后一条主表进行删除时 给用户一个提示
            this.$confirm('这是最后一条主表配置,请谨慎删除！！！', '提示', {
              confirmButtonText: '删除',
              cancelButtonText: '再考虑考虑',
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
                    message: `${res.data.Error},删除失败`
                  })
                }
              }).then(() => {

              })
            }).catch(() => {
  
            })
          } else {
            // 不是最后一条主表配置
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
                    message: `${res.data.Error},删除失败`
                  })
                }
              }).catch(() => {
                this.$message({
                  type: 'error',
                  message: '删除失败err！'
                })
              })
            }).catch(() => {

            })
          }
        } else {
          tables.splice(index, 1)
        }
      },
      // 删除明细表
      _removeDetailTable (index, tables, tableCode, mainTableCode) {
        if (tableCode) {
          debugger
          this.$confirm('确认删除此明细表吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            debugger
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
                  message: `${res.data.Error},删除失败`
                })
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: 'err删除失败！'
              })
            })
          }).catch(() => {
          })
        } else {
          tables.splice(index, 1)
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
              message: `获取主表表单字段数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `获取主表表单字段数据失败err`
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
              message: `获取明细表表单字段数据失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `获取组明细表表单字段数据失败err`
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
      // 点击规则切换
      handleRuleClick (tab, event) {
        this._getApprovalTable()
      },
      // 点击功能控制
      handleClickFunctionControl () {
        debugger
        this.functionControlShow = true
      },
      // 表单赋值
      // handleClickTableAssign () {
      //   this.tableAssignShow = true
      // },
      // 新增自有表单
      handleAddPrivateTable () {
        // this.relationTable.Private.push({
        //   TableCode: '',
        //   TableName: '',
        //   DetailTables: []
        // })
        //改变 store 中的isPublic 的值
        this.$store.dispatch("setIsPublic", true)

        this.$router.push({
          path: '/platform/approvalFlow/tableManage/tableEdit',
          query: {
            
          }
        })
      },
      // 选择私有表单
      checkPrivateTable () {
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
      handleClickSelectTable (table, state, idx, str) {
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
            this.relationTable.Public.forEach(item => {
              this.currentPublicArr.push(item.TableCode)
            })
            break

          case 'public_zhubiao_mingxi':
            this.currentStr = 'public_zhubiao_mingxi'
            this.relationTable.Public[idx].DetailTables.forEach(item => {
              this.currentPublicArr_mingxi.push(item.TableCode)
            })
            break

          case 'private_zhubiao':
            this.currentStr = 'private_zhubiao'
            this.relationTable.Private.forEach(item => {
              this.currentPrivateArr.push(item.TableCode)
            })
            break

          case 'private_zhubiao_mingxi':
            this.currentStr = 'private_zhubiao_mingxi'
            this.relationTable.Private[idx].DetailTables.forEach(item => {
              this.currentPrivateArr_mingxi.push(item.TableCode)
            })
            break
          default:
            break
        }
        // 显示表格弹框
        this.dialogTableVisible = true
        this.currentTable = table
        this.queryObj.publicState = state

        // 获取表数据
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
      // table表格中保存选择表弹窗
      handleSaveSelectTable () {
        debugger
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

        // 所选的表不能和已经添加的表重复
  
        this.dialogTableVisible = false
        this.currentTable.TableCode = this.selectedTable[0].TableCode
        this.currentTable.TableName = this.selectedTable[0].TableName
      },
      // 设置
      handleClickSetTable (table) {
        this.$router.push({
          // path: '/platform/approvalFlow/flowRule/flowConfig/fieldSet',
          path: '/platform/approvalFlow/tableManage/tableEdit',
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
      // 编辑
      // handleClickEditTable (table) {
      //   this.$router.push({
      //     path: '/platform/approvalFlow/tableManage/tableEdit',
      //     query: {
      //       tableCode: table.TableCode
      //     }
      //   })
      // },
      // 预览
      handleClickOverviewTable (table) {
        this.$router.push({
          path: '/platform/approvalFlow/tableManage/showTable',
          query: {
            tableCode: table.TableCode
          }
        })
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
      // 最终保存所有选择的 主表和明细表 提交后台保存
      handleRelationTableSave () {
        this.loading = true
        debugger
        // 验证 共有表单和 自有表单中分别 对应的主表与主表名称，明细表与明细表名称不能重复，重复给出提示，不调保存接口
        // this.relationTable.Private  this.relationTable.Public

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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relation-table-container
    .content-container
      margin-bottom 10px
      .title
        margin-bottom 10px
        .privateTit
          margin-left 10px
          &:hover
            color #3B8BE3
            cursor pointer
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
