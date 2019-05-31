<!--
  User: gaol
  Date: 2019/5/25
  功能：流程配置——流程设计——简洁设计界面
-->

<template>
  <div class="process-design-container">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" size="mini">
      <el-radio-button label="简洁设计">简洁设计</el-radio-button>
      <el-radio-button label="图形设计">图形设计</el-radio-button>
    </el-radio-group>
    <div class="container" v-loading="loading">
      <div class="branch-container">
        <el-card class="box-card">
          <el-button
            size="small"
            @click="sortBranch()"
            class="sortBranch"
            type="primary"
            style="margin-bottom: 10px"
          >
            分支排序
          </el-button>

          <el-button
            size="small"
            @click="batchAddBranch()"
            class="batchAddBranch"
            type="primary"
            style="margin-bottom: 10px"
          >
            新增分支
          </el-button>


          <el-card shadow="never" class="box-card" style="width: 100%">
            <div slot="header" class="clearfix">
              <div style="margin-bottom: 10px">
                <!-- 规则名： -->
                <el-input size="small" v-model="ruleObj.Name" placeholder="请输入规则名" style="width: 200px;"></el-input>
              </div>
            </div>
            <div class="text item" style="margin-bottom: 10px">
              <div>
                发起人：
                <el-button size="small" @click.native.prevent="flowStartVisible = true">
                  选择
                </el-button>
                <div style="margin-top: 10px" v-if="ruleObj.Starters && ruleObj.Starters.length">
                  <el-card shadow="hover">

                    <template v-for="Deliverie in ruleObj.Starters">
                      <div>{{Deliverie.DeliveryWayText}}</div>
                      <div
                        style="font-size: 12px; padding: 5px;"
                        v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                      >
                        已选岗位：
                        <span
                          v-for="(org, index) in Deliverie.PositionValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <div style="font-size: 12px; padding: 5px;"
                           v-if="Deliverie.OrgValue && Deliverie.OrgValue.length">
                        已选组织：
                        <span
                          v-for="(org, index) in Deliverie.OrgValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.OrgValue && Deliverie.OrgValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <div style="font-size: 12px; padding: 5px;"
                           v-if="Deliverie.EmpValue && Deliverie.EmpValue.length">
                        已选人员：
                        <span
                          v-for="(org, index) in Deliverie.EmpValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                          </span>
                      </div>
                    </template>
                  </el-card>
                </div>
              </div>
            </div>
          </el-card>


          <!--分支list container--start-->
          <div class="branch-list">
            <el-card shadow="hover"
                     class="box-card branch-item"
                     v-for="(branche, index) in ruleObj.Branches"
                     v-if="ruleObj.Branches && ruleObj.Branches.length"
                     :key="branche.NodeToNodeId"
                     v-dragging="{ item: branche, list: ruleObj.Branches, group: 'branches' }"
            >
              <div slot="header" class="clearfix" style="display: flex">
                <!-- <h4 style="flex: 1;">优先级：{{branche.PRI}}</h4> -->
                <h3 style="flex: 1;">{{branche.PRI}}</h3>
                <el-tooltip class="item" effect="dark" content="删除此分支" placement="bottom">
                  <el-button type="text"
                             style="flex: 0 0 100px;padding: 0 20px"
                             v-if="index !== 0"
                             @click.native.prevent="_deleteBranch(branche.NodeToNodeId)">删除
                  </el-button>
                </el-tooltip>
              </div>
              <div style="margin-bottom: 10px">
                <span class="" style="font-weight: bold">{{branche.Condition.Name}}：</span>
                <el-button size="small" @click.native.prevent="handleSelectBranch(branche)">
                  编辑
                </el-button>
                <div style="margin-top: 10px">
                  <el-card shadow="hover">
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.ConnDataFromText"
                    >
                      条件类型：
                      <span
                        style="color: #cccccc">{{branche.Condition.ConnDataFromText}}
                          </span>
                    </div>
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.SpecOperWayText"
                    >
                      处理人：
                      <span
                        style="color: #cccccc">{{branche.Condition.SpecOperWayText}}
                          </span>
                    </div>
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.NodeNames"
                    >
                      选定节点：
                      <!-- 范德萨范德萨发达{{branche.Condition.NodeNames}} -->
                      <span
                        style="color: #cccccc">{{branche.Condition.NodeNames}}
                          </span>
                    </div>
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.FieldValue"
                    >
                      选定表单：
                      <span
                        style="color: #cccccc">{{branche.Condition.FieldValue}}
                          </span>
                    </div>
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.Value && branche.Condition.Value.length"
                    >
                      选定值：
                      <span
                        v-for="(item, index) in branche.Condition.Value"
                        style="color: #cccccc"
                      >
                            {{item.Name}}
                              <span
                                v-if="branche.Condition.Value.length-1 !== index">,
                              </span>
                            </span>
                    </div>
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.FieldConditions && branche.Condition.FieldConditions.length"
                    >
                      表单字段：
                      <span
                        v-for="(item, index) in branche.Condition.FieldConditions"
                        style="color: #cccccc"
                      >
                            <span v-if="index === 0">
                              {{item.Field}}{{operChange(item.Oper)}}{{item.FieldValue.Id}}
                            </span>
                            <span v-if="index === 1">
                              ，{{saveTypeChange(item.SaveType)}}{{item.Field}}{{operChange(item.Oper)}}{{item.FieldValue.Id}}
                            </span>
                            </span>
                    </div>
                  </el-card>
                </div>
              </div>
              <div style="margin-bottom: 10px">
                处理人：
                <el-button size="small" @click.native.prevent="handleAddApprover(branche)">
                  新增
                </el-button>

                <div style="margin-top: 10px">
                  <el-card shadow="hover">
                    <div class="deliverie-item">
                      <el-tooltip class="item" effect="dark" content="编辑此名称和审批规则" placement="bottom">
                        <span class="name" style="font-size: 12px" @click="handleEditNameAndRule(branche)">
                          名称：{{branche.Name}}
                        </span> 
                      </el-tooltip >

                      <div class="deliverie-item-left">
                        <el-tooltip class="item" effect="dark" content="编辑此审批" placement="bottom">
                          <i class="el-icon-edit" @click="handleSelectApprover(branche.NodeToNodeId)"></i>
                        </el-tooltip>
                      </div>

                      <div class="deliverie-item-right" style="flex: 1"
                           v-if="branche.Deliveries && branche.Deliveries.length">
                        <template v-for="Deliverie in branche.Deliveries">
                          <div>{{Deliverie.DeliveryWayText}}</div>
                          <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.PositionValue && Deliverie.PositionValue.length">
                            已选岗位/角色/职务：
                            <span
                              v-for="(org, index) in Deliverie.PositionValue"
                              style="display: inline-block; padding: 5px; color: #cccccc"
                            >
                                {{org.Name}}
                                  <span
                                    v-if="Deliverie.PositionValue.length-1 !== index">,
                                  </span>
                                </span>
                          </div>
                          <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.OrgValue && Deliverie.OrgValue.length">
                            已选组织：
                            <span
                              v-for="(org, index) in Deliverie.OrgValue"
                              style="display: inline-block; padding: 5px; color: #cccccc">
                              {{org.Name}}
                              <span
                                v-if="Deliverie.OrgValue.length-1 !== index">,</span>
                              </span>
                          </div>
                          <div style="font-size: 12px;padding-left: 10px" v-if="Deliverie.EmpValue && Deliverie.EmpValue.length">
                            已选人员：
                            <span
                              v-for="(org, index) in Deliverie.EmpValue"
                              style="display: inline-block; padding: 5px; color: #cccccc">
                              {{org.Name}}
                              <span
                                v-if="Deliverie.EmpValue.length-1 !== index">,</span>
                              </span>
                          </div>
                        </template>
                      </div>
                      <div
                        class="deliverie-item-right"
                        style="flex: 1; font-size: 12px; color: #cccccc"
                        v-if="branche.Deliveries && !branche.Deliveries.length"
                      >
                        默认节点
                      </div>
                    </div>
                  </el-card>
                </div>
                <!-- {{branche.Nodes}} -->
                <!-- branche.Nodes：{{branche.Nodes}} -->
                <!--新增处理人后，动态生成的节点显示区--start--->
                <div v-if="branche.Nodes && branche.Nodes.length">
                  <recursive-cmp :nodes="branche.Nodes"
                                 @handleSelectApprover="handleSelectApprover"
                                 ></recursive-cmp>
                </div>
                <!--新增处理人后，动态生成的节点显示区--end--->

              </div>

              <div style="">
                抄送人：
                <el-button size="small" @click.native.prevent="handleSelectCc(branche.NodeToNodeId)">
                  编辑
                </el-button>

                <div style="margin-top: 10px" v-if="branche.CcModel && branche.CcModel.length">
                  <el-card shadow="hover">
                    <template v-for="Deliverie in branche.CcModel">
                      <div>{{Deliverie.DeliveryWayText}}</div>
                      <div
                        style="font-size: 12px; padding: 5px;"
                        v-if="Deliverie.PositionValue && Deliverie.PositionValue.length"
                      >
                        已选岗位：
                        <span
                          v-for="(org, index) in Deliverie.PositionValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.PositionValue && Deliverie.PositionValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <div style="font-size: 12px; padding: 5px;"
                           v-if="Deliverie.OrgValue && Deliverie.OrgValue.length">
                        已选组织：
                        <span
                          v-for="(org, index) in Deliverie.OrgValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.OrgValue && Deliverie.OrgValue.length-1 !== index">,</span>
                          </span>
                      </div>
                      <div style="font-size: 12px; padding: 5px;"
                           v-if="Deliverie.EmpValue && Deliverie.EmpValue.length">
                        已选人员：
                        <span
                          v-for="(org, index) in Deliverie.EmpValue"
                          :key="index"
                          style="color: #cccccc">{{org.Name}}
                          <span
                            v-if="Deliverie.EmpValue && Deliverie.EmpValue.length-1 !== index">,</span>
                          </span>
                      </div>
                    </template>
                  </el-card>
                </div>

              </div>
            </el-card>
          </div>
          <!--分支list container--end-->

        </el-card>
      </div>
    </div>

    <!--调用 mixins 中的 flowBaseFn方法中的 handleClose 方法----->
    <save-footer @save="onRuleSave" :isCancel="true" cancelText="关闭" @cancel="handleClose"></save-footer>

    <template v-if="flowStartVisible">
      <start-emp-dialog :ruleId="ruleObj.FlowRuleId" @handleCancelFlowStart="handleCancelFlowStart"
                        @refresh="refreshRule"></start-emp-dialog>
    </template>

    <!--编辑此审批（处理人）dialog 弹窗--start-->
    <template v-if="approverVisible">
      <approver-dialog :NodeToNodeCode="NodeToNodeCode"
                       :ruleId="ruleObj.FlowRuleId"
                       @handleCancelApprover="handleCancelApprover"
                       @refresh="refreshRule"></approver-dialog>
    </template>
    <!--编辑此审批（处理人）dialog 弹窗--end-->

    <!--编辑此名称 和 审批规则 的 dialog 弹窗--start-->
    <template v-if="editNameAndRuleVisible">
      <edit-nameandrule-dialog :selectEditNameObj= "selectEditNameObj"
                       :editNameAndRuleVisible.sync="editNameAndRuleVisible"
                       :loadingShow.sync= 'editNameLoading'
                       @handleSaveEditName = "handleSaveEditName"
                       @refresh="refreshRule"></edit-nameandrule-dialog>
    </template>
    <!--编辑此审批和审批规则 的dialog 弹窗--end-->

    <!---新增处理人后的dialog 弹窗----start-->
    <template v-if="addApproverVisible">
      <add-approver-dialog :mainNodeId="mainNodeId" :toNodeId="toNodeId"
                           :ruleId="ruleObj.FlowRuleId"
                           @handleCancelAddApprover="handleCancelAddApprover"
                           @refresh="refreshRule"></add-approver-dialog>
    </template>
    <!---新增处理人后的dialog 弹窗----end-->


    <template v-if="ccVisible">
      <cc-dialog :NodeToNodeCode="NodeToNodeCode" @handleCancelCc="handleCancelCc"
                 @refresh="refreshRule"></cc-dialog>
    </template>

    <!--点击了分支名称后面的 编辑按钮后，弹出框----start-->
    <template v-if="branchVisible">
      <branch-dialog
        :mainNodeId="mainNodeId" :toNodeId="toNodeId"
        :ruleId="ruleObj.FlowRuleId"
        @refresh="refreshRule"
        @handleCancelBranch="handleCancelBranch"></branch-dialog>
    </template>
    <!--点击了分支名称后面的 编辑按钮后，弹出框------end-->


    <dialog-flow-login-error v-if="loginVisible"></dialog-flow-login-error>

    <!--分支排序dialog--start-->
    <!-- ruleObj.Branches: {{ruleObj.Branches}} -->
    <div v-if="sortBranchShow">
      <branch-sort
      :objList='ruleObj.Branches'
      :sortBranchShow.sync = 'sortBranchShow'
      @saveSort = 'saveSort'
      >
      </branch-sort>
    </div>
    <!--分支排序dialog--end-->

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import StartEmpDialog from './components/Start-emp-dialog'
  import RecursiveCmp from './components/Recursive-cmp'
  import ApproverDialog from './components/Approver-dialog'
  import AddApproverDialog from './components/Add-approver-dialog'
  import CcDialog from './components/Cc-dialog'
  import BranchDialog from './components/Branch-dialog'
  import BranchSort from './components/Branch-sort'
  import EditNameandruleDialog from './components/Edit-nameandrule-dialog'
  import DialogFlowLoginError from '@/components/platform/approval-flow/dialog-flow-login-error/dialog-flow-login-error'
  import BaseInfoRouter from '@/components/platform/approval-flow/flow-config-router/flow-config-router'
  import {
    getRule,
    batchAddBranch,
    deleteBranch,
    updateRule,
    branchSort,
    getNodeInfo,
    saveNodeInfo,
    todolistModel,
    teamLeaderConfirmRole
  } from '@/api/approve'
  // import { mapGetters } from 'vuex'
  import { flowBaseFn, flowAutoLogin} from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin],
    components: {
      SaveFooter,
      StartEmpDialog,
      ApproverDialog,
      AddApproverDialog,
      CcDialog,
      BranchDialog,
      DialogFlowLoginError,
      BaseInfoRouter,
      RecursiveCmp,
      BranchSort,
      EditNameandruleDialog
    },
    data () {
      return {
        tabPosition: '简洁设计',
        loading: true,
        oldRuleObj: {},
        ruleObj: {
          FlowRuleId: '',
          Name: '',
          IsEnable: false,
          Branches: [],
          EnableBranch: false,
          Starters: []
        },
        NodeToNodeCode: '',
        mainNodeId: '',
        toNodeId: '',
        flowStartVisible: false,
        approverVisible: false,
        addApproverVisible: false,
        ccVisible: false,
        branchVisible: false,
        loginVisible: false,
        activeName: 'third',
        tags: [],
        currentRuleIndex: '',
        currentRuleId: '',
        addBranchNum: 1,

        sortBranchShow: false,  // 控制分支排序dialog 的显示/隐藏
        editNameAndRuleVisible: false,  // 编辑分支的 名称和规则 dialog 的显示/隐藏
        selectEditNameObj: {},   // 编辑的 当前 分支名称对象
        // selectEditNameObjAttr: {} // 编辑的 当前 分支名称对象获取到的 配置属性信息 将此属性添加到了 selectEditNameObj 对象中的ruleAttr中了
        editNameLoading: false  // 传递给 edit-nameandrule-dialog 页面的loading
      }
    },
    created () {
      try {
        this.loading = true
        this.companyApprovalId = this.$route.query.approvalId
        this.ruleId = this.$route.query.ruleId
        this.getOrder()
      } catch (e) {
        this.$message({
          type: 'error',
          message: '获取数据失败，请刷新重试!'
        })
        this.loading = false
      }
    },
    mounted () {
      this.$dragging.$on('dragged', ({value}) => {
        console.log('dragged', value)
      })
      this.$dragging.$on('dragend', (value) => {
        console.log('dragend', value)
      })
      this.$bus.$on('handleSelectApprover', (code) => {
        this.handleSelectApprover(code)
      })
      this.$bus.$on('handleEditNameAndRule', (node) => {
        this.handleEditNameAndRule(node)
      })
    },
    beforeDestroy () {
      // 页面销毁前
      this.$bus.$off('handleSelectApprover')
      this.$bus.$off('handleEditNameAndRule')
    },
    computed: {
    },
    watch: {
      '$route' (to, from) {
        this.companyApprovalId = this.$route.query.approvalId
        this.ruleId = this.$route.query.ruleId
        this._getRule()
      }
    },
    methods: {
      getOrder () {
        this._getRule()
      },
      // 获取多人处理规则dic 字典表
      _getMorePersonDicCode () {
        debugger
        // 多人处理规则：DicCode=TodolistModel
        todolistModel()
      },
      // 获取组长规则dic 字典表
      _getHeadManRulDicCode () {
        // 组长规则：DicCode=TeamLeaderConfirmRole
        teamLeaderConfirmRole()
      },
      // 获取规则详情
      _getRule () {
        if (!this.ruleId) return
        this.loading = true
        getRule(this.ruleId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.ruleObj = res.data.Data
            this.oldRuleObj = JSON.parse(JSON.stringify(this.ruleObj))
          } else {
            this.loading = false
            this.$message({
              message: '规则获取失败，请重试',
              type: 'error'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '规则获取失败，请重试',
            type: 'error'
          })
        })
      },
      // 删除分支条件
      _deleteBranch (code) {
        this.$confirm('此操作将永久删除之前所配置的分支条件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBranch(this.companyApprovalId, code).then(res => {
            if (res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this._getRule(this.currentRuleId)
            } else {
              this.$message({
                type: 'error',
                message: '删除分支条件失败!'
              })
            }
          })
        })
      },
      // 获取节点配置的审批规则属性
      _getNodeInfo () {
        getNodeInfo(this.selectEditNameObj.ToNodeId).then(res => {
          this.loadingShow = false
          if (res && res.data.State === REQ_OK) {
            // 将获取的属性数据 添加为 selectEditNameObjAttr 的 ruleAttr 属性字段中
            this.$set(this.selectEditNameObj, 'ruleAttr', res.data.Data)
            console.log(this.selectEditNameObj)
          } else {
            this.loadingShow = false
            this.$message({
              type: 'error',
              message: '节点配置规则信息获取失败err,请刷新后重新'
            })
          }
        }).catch(() => {
          this.loadingShow = false
          this.$message({
            type: 'error',
            message: '节点配置规则信息获取失败err,请刷新后重新'
          })
        })
      },
      // 保存 接地那配置的属性 和 节点名称
      _saveNodeInfo (data) {
        debugger
        console.log(data)
        this.loadingShow = true
        saveNodeInfo(JSON.stringify(data)).then((res) => {
          this.loadingShow = false
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          } else {
            this.$message.error('保存失败err,请刷新后重试')
          }
        }).catch(() => {
          this.loadingShow = false
          this.$message.error('保存失败err,请刷新后重试')
        })
      },
      // 新增分支条件
      batchAddBranch () {
        this.loading = true
        batchAddBranch(this.companyApprovalId, this.ruleObj.FlowRuleId, this.addBranchNum).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '新增分支成功！',
              type: 'success'
            })
            this._getRule(this.ruleObj.FlowRuleId)
          } else {
            this.$message({
              message: '新增分支失败，请重试！',
              type: 'error'
            })
          }
          this.loading = false
        }).catch(() => {
          this.$message({
            message: '新增分支失败，请重试！',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 分支排序
      sortBranch () {
        // 显示排序的dialog
        this.sortBranchShow = true
      },
      // 保存规则
      onRuleSave () {
        this.loading = true
        updateRule(this.ruleId, this.ruleObj.Name).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              message: '规则保存成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '规则保存失败，请重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            message: '规则保存失败，请重试！',
            type: 'error'
          })
        })
      },
      // 刷新规则
      refreshRule () {
        this._getRule(this.ruleObj.FlowRuleId)
      },
      // 发起人dialog取消
      handleCancelFlowStart () {
        this.flowStartVisible = false
      },
      // 点击了分支名称后面的 “编辑”btn
      handleSelectBranch (branch) {
        this.mainNodeId = branch.MainNodeId
        this.toNodeId = branch.ToNodeId
        this.branchVisible = true
      },
      // 分之条件dialog取消
      handleCancelBranch () {
        this.branchVisible = false
      },
      // 编辑节点名称 和 规则
      handleEditNameAndRule (branc) {
        debugger
        this.selectEditNameObj = branc
        // 调用获取该节点 配置属性的接口
        this.editNameAndRuleVisible = true
        // 获取 多人处理规则 和 组长规则的 字典表
        this.loadingShow = true
        Promise.all([todolistModel(), teamLeaderConfirmRole()]).then(([morePersonRuleData, headManRuleData]) => {
          debugger
          if (morePersonRuleData.data.State === REQ_OK &&
              headManRuleData.data.State === REQ_OK
          ) {
            // 将获取到的多人规则添加到 selectEditNameObj 的 morePersonRuleList 属性上
            this.$set(this.selectEditNameObj, 'morePersonRuleList', morePersonRuleData.data.Data)
            // 将获取到的多人规则添加到 selectEditNameObj 的 headManRuleList 属性上
            this.$set(this.selectEditNameObj, 'headManRuleList', headManRuleData.data.Data)

            // 获取该节点配置信息
            this._getNodeInfo()
            debugger
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取多人规则/组长规则失败err,请刷新后重试'
          })
        })
      },
      // 保存编辑姓名和规则
      handleSaveEditName (data) {
        debugger
        // 提交 保存的接口
        this._saveNodeInfo(data)
      },
      // 编辑默认审批人/编辑新增审批人
      handleSelectApprover (code) {
        this.NodeToNodeCode = code
        this.approverVisible = true
      },
      // 默认审批人dialog取消
      handleCancelApprover () {
        this.approverVisible = false
      },
      // 新增下一步审批人
      handleAddApprover (branche) {
        debugger
        if (branche.Nodes && branche.Nodes.length) {
          this.forEachNodes(branche)
        } else {
          this.mainNodeId = branche.MainNodeId
          this.toNodeId = branche.ToNodeId
        }
        console.log(this.mainNodeId, this.toNodeId)
        // 显示设置 审批人的弹窗
        this.addApproverVisible = true
      },
      // 递归遍历节点信息
      forEachNodes (node) {
        node.Nodes.forEach(item => {
          if (item.Nodes && item.Nodes.length) {
            this.forEachNodes(item)
          } else {
            this.mainNodeId = item.MainNodeId
            this.toNodeId = item.ToNodeId
          }
        })
      },
      // 新增审批人取消
      handleCancelAddApprover () {
        this.addApproverVisible = false
      },
      // 选择抄送人
      handleSelectCc (NodeToNodeCode) {
        this.NodeToNodeCode = NodeToNodeCode
        this.ccVisible = true
      },
      // 抄送人dialog取消
      handleCancelCc () {
        this.ccVisible = false
      },
      // 操作符转义
      operChange (num) {
        switch (num) {
          case '0':
            return '等于'
          case '1':
            return '大于'
          case '2':
            return '小于'
          case '3':
            return '大于等于'
          case '4':
            return '小于等于'
          case '5':
            return '不等于'
        }
      },
      // 保存排序
      saveSort (data) {
        console.log(data)
        // 将新数据赋值给 this.ruleObj.Branches
        this.ruleObj.Branches = data
        branchSort(JSON.stringify(this.ruleObj.Branches)).then(res => {
          if (res && res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '排序保存成功'
            })
            // 调排序的接口进行排序的保存 成功后 关闭排序dialog
            this.sortBranchShow = false
          } else {
            this.$message({
              type: 'error',
              message: '排序保存失败err,请刷新后重试'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '排序保存失败err,请刷新后重试'
          })
        })
      },
      // 保存类型转义
      saveTypeChange (num) {
        switch (num) {
          case 'AND':
            return '且'
          case 'OR':
            return '或者'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .process-design-container
    .container
      .branch-container
        margin-top 10px
        margin-bottom 20px
        .batchAddBranch
          float right
          margin-right 10px
        .sortBranch
          float right
        .box-card
          .el-card__header
            padding 10px 20px
        .branch-list
          margin-top 20px
          .branch-item
            width 100%
            margin-bottom 5px
            .deliverie-item
              display flex
              .name
                display: flex;
                align-items: center;
                font-size: 12px;
                color rgba(59,159,227,.8)
                &:hover
                  cursor pointer
                  color rgba(59,139,227,1)
              .deliverie-item-left
                display: flex;
                flex: 0 0 50px;
                align-items: center;
                justify-content: center;
                .el-icon-edit
                  color #cccccc
                  &:hover
                    cursor pointer
      .more-set
        .set-item
          padding 5px 20px
          font-size 14px
          .w-120
            display inline-block
            width 120px
    .dialog-item
      .item
        margin-bottom 10px;
      .el-dialog__body
        max-height: 400px;
        overflow-y: scroll;

  .el-tag + .el-tag {
    margin-left: 10px;
  }


</style>
