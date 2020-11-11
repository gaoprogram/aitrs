<!--
  User: gal
  Date: 2019/5/22
  功能：审批流——审批规则 页面
  
-->

<template>
  <div class="mglr-30 flow-rule-container">
    <!-- approvalList: {{approvalList}} -->
    <div style="margin-bottom: 10px">
      <el-cascader
        placeholder="请搜索业务领域/审批名"
        style="width: 200px;"
        :options="approvalList"
        filterable
        clearable
        :props="propsSet"
        v-model="selectedOptions"
        checkStrictly="true"
        @change="handleChangeApprovalList"
      >    
      </el-cascader>
      
      <el-input v-model="queryObj.Key" placeholder="请输入流程名称" clearable style="width: 200px;"
          @clear="handleSearch"></el-input>
      <el-button type="primary" @click.native="handleSearch">搜索</el-button>
      <el-button type="primary" @click.native="handleReset">重置</el-button>
    </div>
    <div style="display: flex">
      <div style="flex: 0 0 254px">
        <el-tabs v-model="queryObj.isCanStart" @tab-click="handleClickRunState">
          <el-tab-pane label="全部" :name="'-1'"></el-tab-pane>
          <el-tab-pane label="独立运行" :name="'1'"></el-tab-pane>
          <el-tab-pane label="非独立运行" :name="'0'"></el-tab-pane>
        </el-tabs>
      </div>
      <div style="flex: 1;text-align: right">
        <el-button type="primary" @click.native="addFlow">新增流程</el-button>
        <el-button @click.native="showFlowMove = true">移动流程</el-button>

        <el-tooltip class="copyBtnTip" :disabled="(!!selectApproval.length && selectApproval.length==1)" :content="(selectApproval.length && selectApproval.length!=1)?'一次仅能选择一个审批进行复制':'请选择一个审批进行复制'">
          <div>
            <el-button :disabled="!selectApproval.length || selectApproval.length!==1" @click.native="showFlowCopy = true">复制流程到</el-button>
          </div>
        </el-tooltip>

      </div>
    </div>
    <el-tabs type="card" v-model="queryObj.State" @tab-click="handleClickTabState">
      <el-tab-pane label="全部" :name="'-1'"></el-tab-pane>
      <el-tab-pane label="已上架" :name="'2'"></el-tab-pane>
      <el-tab-pane label="已下架" :name="'3'"></el-tab-pane>
      <el-tab-pane label="草稿" :name="'1'"></el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="loadingTableTemplate"
      :data="tableData"
      height="420"
      border
      @selection-change="handleSelectChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="ApprovalName"
        width="250"
        label="审批名"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="Name"
        width="260"
        label="流程名称"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        width="80"
        prop="VersionNumber"
        label="版号"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="IsCanStart"
        label="是否独立运行"
        width="140"
        sortable
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-html="scope.row.IsCanStart ? '是' : '否' "></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="Note"
        width="250"
        label="说明"
        show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.Note}}</p>
              <div slot="reference" class="name-wrapper">
                <span class="ellipsis1">{{scope.row.Note}}</span>
              </div>
            </el-popover>
          </template> -->
      </el-table-column>
      <el-table-column
        prop="StateText"
        label="状态"
        width="100"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        fixed="right"
        width="350"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click="handleClickShow(scope.row)" type="text" size="small">查看</el-button>
          <el-button v-show="scope.row.State === 2" type="text" size="small" @click="handleClickUp(scope.row)">升版
          </el-button>
          <el-button v-show="scope.row.State === 2 || scope.row.State === 1 || scope.row.State === -1" type="text" size="small" @click="handleClickEdit(scope.row)">编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleClickChangeState(scope.row)"
            v-html="(scope.row.State === 1 || scope.row.State === 3) ? '上架' : '下架' "
          >
            上架
          </el-button>
          <el-button type="text" size="small" disabled @click="handleClickEdit(scope.row)">监控员</el-button>
          <el-button v-if="scope.row.State === 1" type="text" size="small" @click="handleClickDel(scope.row)">删除
          </el-button>
          <el-button type="text" size="small" @click="handleClickQuote(scope.row)">引用</el-button>
          <el-button type="text" size="small" @click="handleClickHistory(scope.row)">版本</el-button>
          <el-button type="text" size="small" disabled @click="handleClickLog(scope.row)">日志</el-button>
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
    <!--引用 审批规则里面的 版本历史记录dailog 弹框 start--->
    <flow-history v-if="showFlowHistory" :templateCode="currentTemplateCode"
                  @historyClose="showFlowHistory = false"></flow-history>
    <!--引用 审批规则里面的 版本历史记录dailog 弹框 end--->

    <!---引用 审批规则里面的 引用记录dailog 弹框 start---->
    <flow-quote v-if="showFlowQuote" :flowId="currentFlowId" @quoteClose="showFlowQuote = false"></flow-quote>
    <!---引用 审批规则里面的 引用记录dailog 弹框 end---->


    <!-- <add-flow v-if="showAddFlow" :approvalList="addApprovalList" @saveSuccess="addFlowSaveSuccess"
              @cancel="addFlowCancel"></add-flow> -->

    <!--引用新增流程的组件---start-->
    <div v-if="showAddFlow">
      <add-flow :approvalList="addApprovalList" @saveSuccess="addFlowSaveSuccess"
                @cancel="addFlowCancel">
      </add-flow>
    </div>   
    <!--引用新增流程的组件---end-->


    <!--引用移动流程的组件- start-->   
    <flow-move v-if="showFlowMove" @handleClose="showFlowMove = false"></flow-move>
    <!--引用移动流程的组件- end-->   

    <!---引用 复制流程的组件---start--->
    <flow-copy v-if="showFlowCopy" @handleClose="showFlowCopy = false" :selectFlowObj="selectApproval[0]"></flow-copy>
    <!---引用 复制流程的组件---end--->

    <!---引用版本的组件-start-->
    <flow-new-version
      v-if="showNewVersionDialog"
      :flowId="currentFlowId"
      @handleClose="showNewVersionDialog = false"
      @handleNew="handleNew"
      @handleOld="handleOld"
    >
    </flow-new-version>
    <!---引用版本的组件-start-->

    <!--查看、编辑 子路由承载区--->
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getFlowRulelist,
    checkNewVersionTable,
    upgradeFlowVersion,
    companyTableList,
    deleteRule,
    setFlowState
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/dialog-common'
  import FlowQuote from './flow-quote'
  import FlowHistory from './flow-history'
  import AddFlow from './add-flow'
  import FlowMove from './flow-move'
  import FlowCopy from './flow-copy'
  import FlowNewVersion from './flow-new-version'

  export default {
    data () {
      return {
        companyApprovalId: '',
        queryObj: {
          Key: '',
          isCanStart: '-1',
          State: '-1',
          pageSize: 10,
          pageNum: 1
        },
        propsSet: {
          value: 'Name',
          label: 'Name',
          children: 'CompanyApprovals'
        },
        selectedOptions: [], // 搜索级联选择器中的数组
        approvalList: [],
        approvalName: '',
        tableData: [],
        total: 0,
        loadingTableTemplate: false,
        dialogTableTemplate: true,
        activeRunState: 'all',
        activeHaveState: 'all',
        showCompanyStructureCmp: false,
        textarea: '',
        selectTypeTab: 'zuzhi',
        showFlowQuote: false,
        currentFlowId: null,
        showFlowHistory: false,
        currentTemplateCode: '',
        showAddFlow: false,
        addApprovalList: [],
        showFlowMove: false,
        selectApproval: [],
        showFlowCopy: false,
        showNewVersionDialog: false
      }
    },
    watch:{
      $route:{
        handler(newValue, oldValue){
          debugger
          console.log(newValue.path)
          if(newValue.path === '/platform/approvalFlow/flowRule'){
            // 进入到 审批规则的首页后 需要 将store中的 directives 中的flowRuleScanFlag 设置为 false
            // store 中存储 从查看入口进入的标识 用于 自定义指令 控制 进入后 里面各个页面的相关操作权限
            this.$store.dispatch("setFlowRuleScan", false)
          }
        }
      }
    },
    created () {
      this._getFlowRulelist()
      this._companyTableList()
    },
    mounted () {
      this.$bus.$on('flowRuleRefresh', () => {
        this._getFlowRulelist()
      })
    },
    methods: {
      // 获取流程列表 table表格数据
      _getFlowRulelist () {
        debugger
        this.loadingTableTemplate = true
        // let loading = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' })
        // setTimeout(() => {
        //   loading.close()
        // }, 2000)
        getFlowRulelist(this.companyApprovalId, this.queryObj).then(res => {
          debugger
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
      // 获取审批流列表
      _companyTableList () {
        companyTableList().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.approvalList = res.data.Data
            if (this.approvalList.length) {
              this.approvalList.forEach(item => {
                this.addApprovalList.push(...item.CompanyApprovals)
              })
            }
          } else {
          }
        }).catch(() => {
        })
      },
      // 升版api
      _upgradeFlowVersion (flowId, bool) {
        this.loadingTableTemplate = true
        upgradeFlowVersion(flowId, bool).then(res => {
          this.loadingTableTemplate = false
          if (res.data.State === REQ_OK) {
            this.$message.success('升版成功')
            // 升版成功后 重新调用接口读取最新的table表格数据信息
            this._getFlowRulelist()
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message.error('升版失败，err请重试')
        })
      },
      // 切换是否独立运行状态
      handleClickRunState () {
        this._getFlowRulelist()
      },
      // 切换是否流程状态tab
      handleClickTabState () {
        this.queryObj.pageNum = 1
        this._getFlowRulelist()
      },
      // 新增流程
      addFlow () {
        this.showAddFlow = true
      },
      // 新增流程成功回调
      addFlowSaveSuccess (data) {
        this.showAddFlow = false
        this._getFlowRulelist()
        // 新增流程时 需要 将 store 中的 flowRuleScanFlag 设置为 false
        this.$store.dispatch("setFlowRuleScan", false)

        this.$router.push({
          path: '/platform/approvalFlow/flowRule/flowConfig',
          query: {
            flowId: data.FK_Flow,
            approvalId: data.CompanyApprovalId,
            ruleId: data.FlowRuleId
          }
        })
      },
      // 取消新增流程
      addFlowCancel () {
        this.showAddFlow = false
      },
      // 查看
      handleClickShow (row) {
        // this.$router.push({
        //   path: '/platform/approvalFlow/flowRule/flowDetail',
        //   query: {
        //     flowId: row.FK_Flow,
        //     approvalId: row.CompanyApprovalId,
        //     ruleId: row.FlowRuleId,
        //     type: 'flow'          
        //   }
        // })

        // store 中存储 从查看入口进入的标识 用于 自定义指令 控制 进入后 里面各个页面的相关操作权限
        this.$store.dispatch("setFlowRuleScan", true)

        this.$router.push({
          path: '/platform/approvalFlow/flowRule/flowConfig',
          query: {
            flowId: row.FK_Flow,
            approvalId: row.CompanyApprovalId,
            ruleId: row.FlowRuleId
          }  
        })      
      },
      _setFlowState (flowId, state, str, bool) {
        setFlowState(flowId, state, bool).then(res => {
          this.loadingTableTemplate = false
          if (res.data.State === REQ_OK) {
            this.$message.success(`${str}成功`)
            this._getFlowRulelist()
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message.error(`${str}失败，请重试`)
        })
      },
      // 上架，下架
      handleClickChangeState (row) {
        if (row.State === 3) {
          checkNewVersionTable(row.FK_Flow).then(res => {
            if (res.data.State === REQ_OK) {
              if (res.data.Data) {
                this.currentFlowId = row.FK_Flow
                this.showNewVersionDialog = true
              } else {
                this.changeState(row)
              }
            }
          })
        } else {
          this.changeState(row)
        }
      },
      //
      changeState (row) {
        debugger
        let str = (row.State === 1 || row.State === 3) ? '上架' : '下架'
        this.$confirm(`是否对流程'${row.Name}'执行${str}操作？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let state = (row.State === 1 || row.State === 3) ? 2 : 3
          this.loadingTableTemplate = true
          this._setFlowState(row.FK_Flow, state, str)
        }).catch(() => {
        })
      },
      handleNew () {
        this.showNewVersionDialog = false
        this._setFlowState(this.currentFlowId, 2, '上架', true)
      },
      handleOld () {
        this.showNewVersionDialog = false
        this._setFlowState(this.currentFlowId, 2, '上架', false)
      },
      // 升版
      handleClickUp (row) {
        debugger
        checkNewVersionTable(row.FK_Flow).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            debugger
            if (res.data.Data) {
              debugger
              // 检测到有新版本
              this.$confirm('检查到有新版本, 是否用新版本升版?', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '新版本继续',
                cancelButtonText: '旧版本继续',
                type: 'warning'
              }).then(() => {
                // 确认后 就调用升版的接口
                this._upgradeFlowVersion(row.FK_Flow, true)
              }).catch((action) => {
                // 点击的取消
                debugger
                if (action === 'cancel') {
                  // 旧版本的确认
                  this._upgradeFlowVersion(row.FK_Flow, false)
                } else {
                  this.$message({
                    type: 'info',
                    message: '已取消升版'
                  })
                }
              })
            } else {
              // 未检测到新版本
              this.$confirm('未检查到有新版本, 是否继续升版?', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                // 旧版本进行升版
                this._upgradeFlowVersion(row.FK_Flow, false)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消升版'
                })
              })
            }
          } else {
            this.$message.error(`${res.data.Error}`)
          }
        })
      },
      // 编辑
      handleClickEdit (row) {
        debugger
        if (row.State === 2) {
          this.$confirm('确定要编辑当前流程吗？此编辑会对运行中流程产生影响，确定要编辑吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            debugger
            // 从 编辑入口进入的此页 将 store 中的  flowRuleScanFlag 设置为 false
            this.$store.dispatch("setFlowRuleScan", false)

            this.$router.push({
              path: '/platform/approvalFlow/flowRule/flowConfig',
              query: {
                flowId: row.FK_Flow,
                approvalId: row.CompanyApprovalId,
                ruleId: row.FlowRuleId
              }
            })
            debugger
          }).catch(() => {
          })
        } else {
          debugger
          // 从 编辑 入口进入 的，需要将 store 中的flowruleScanFlag 的值修改为 false
          this.$store.dispatch("setFlowRuleScan", false)

          this.$router.push({
            path: '/platform/approvalFlow/flowRule/flowConfig',
            query: {
              flowId: row.FK_Flow,
              approvalId: row.CompanyApprovalId,
              ruleId: row.FlowRuleId
            }
          })
        }
      },
      // 引用
      handleClickQuote (row) {
        this.currentFlowId = row.FK_Flow
        this.showFlowQuote = true
      },
      // 版本
      handleClickHistory (row) {
        debugger
        this.currentTemplateCode = row.TemplateCode
        this.showFlowHistory = true
      },
      // 日志
      handleClickLog (row) {
      },
      // 删除规则
      handleClickDel (row) {
        this.$confirm('确认删除此流程吗?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRule(row.FlowRuleId).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message.success('删除成功')
              this._getFlowRulelist()
            } else {
              this.$message.error('删除失败')
            }
          }).catch(() => {
            this.$message.error('删除失败')
          })
        }).catch(() => {
        })
      },
      // 切换审批流列表
      handleChangeApprovalList (item) {
        if (item.length === 0) {
          this.companyApprovalId = ''
          this._getFlowRulelist()
          return
        }
        this.approvalList.forEach(approval => {
          if (item.length === 1) {
            if (approval.Name === item[0]) {
              this.companyApprovalId = approval.BusinessAreaCode
              this._getFlowRulelist()
            }
          }
          if (item.length === 2) {
            approval.CompanyApprovals.forEach(i => {
              if (i.Name === item[1]) {
                this.companyApprovalId = i.CompanyApprovalId
                this._getFlowRulelist()
              }
            })
          }
        })
      },
      handleSelectChange (val) {
        this.selectApproval = val
      },
      // 搜索
      handleSearch () {
        this._getFlowRulelist()
      },
      // 重置
      handleReset () {
        debugger
        this.queryObj = {
          Key: '',
          isCanStart: '-1',
          State: '-1',  // 默认显示 是“全部”下面的数据
          pageSize: 10,
          pageNum: 1
        }
        this.propsSet = {
          value: 'Name',
          label: 'Name',
          children: 'CompanyApprovals'
        }
        this.companyApprovalId = ''
        this.selectedOptions = []
        this._getFlowRulelist()
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
      },
      // 关闭
      handleClickClose () {
        this.$emit('closeApprovalRule')
      },
      destroyed () {
        this.$bus.$off('flowRuleRefresh')
      }
    },
    components: {
      SaveFooter,
      CompanyStructureCmp,
      FlowQuote,
      FlowHistory,
      AddFlow,
      FlowMove,
      FlowCopy,
      FlowNewVersion
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.copyBtnTip
  display inline-block
>>>.el-loading-mask
  background transparent !important
</style>
