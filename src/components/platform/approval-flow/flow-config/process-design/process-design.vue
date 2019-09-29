<!--
  User: gaol
  Date: 2019/5/25
  功能：流程配置——流程设计——简洁设计界面
-->
<template>
  <div class="process-design-container">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;" size="mini" @change="clickBtn">
      <el-radio-button label="简洁设计">简洁设计</el-radio-button>
      <el-radio-button label="图形设计">图形设计</el-radio-button>
    </el-radio-group>

    <div class="container" v-loading="loading">
      <div class="branch-container">
        <el-card class="box-card">
          <div v-atris-flowRuleScan="{styleBlock:'block'}">
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
              开始节点新增分支
            </el-button>

            <el-button
              size="small"
              @click="batchOutPosition()"
              class="batchAddBranch"
              type="primary"
              style="margin-bottom: 10px"
            >
              出口方向
            </el-button>  
          </div>        

          <!---流程区域（流程名称、发起人等）---start--->
          <el-card shadow="never" class="box-card" style="width: 100%">
            <div slot="header" class="clearfix">
              <div>
                <!-- 规则名： -->
                <!-- <el-input size="small"  disabled  v-model="ruleObj.Name" placeholder="请输入规则名" style="width: 200px;"></el-input> -->
                <h3>{{ruleObj.Name}}</h3>
              </div>
            </div>
            <div class="text item" style="margin-bottom: 10px">
              <div>
                发起人：
                <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" @click.native.prevent="flowStartVisible = true">
                  选择
                </el-button>
                <div style="margin-top: 10px" v-if="ruleObj.Starters && ruleObj.Starters.length">
                  <el-card shadow="hover">

                    <template v-for="Deliverie in ruleObj.Starters">
                      <!--按节点或者表单字段时--start-->
                      <div>
                        <div>{{Deliverie.DeliveryWayText}}</div>
                        <div style="margin-left:10px;margin-top:5px">
                          {{Deliverie.DeliveryWayTypeText}}: 
                          <!--注 8 为按节点---->
                          <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                          <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>
                        </div>                         
                      </div>
                      <!--按节点或者表单字段时--start-->                      
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
          <!---流程区域（流程名称、发起人等）---end--->


          <!--该流程下的所有分支list container--start-->
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
                <!-- <h3 style="flex: 1;">{{branche.PRI}}</h3> -->
                <h3 style="min-width: 60px;">{{branche.Condition.Name}}</h3>

                <el-tooltip v-atris-flowRuleScan="{styleBlock:'inline-block'}" class="item" effect="dark" content="删除此分支" placement="bottom">
                  <el-button type="text"
                             style="flex: 0 0 100px;padding: 0 20px"
                             v-if="index !== 0"
                             @click.native.prevent="_deleteBranch(branche.NodeToNodeId)">删除
                  </el-button>
                </el-tooltip>
              </div>

              <div style="margin-bottom: 10px">
                <!-- branche.Condition.Name： {{branche.Condition.Name}} -->
                <!-- <span class="" style="font-weight: bold">{{branche.Condition.Name}}：</span> -->
                <span class="" style="font-weight: bold">出口条件：</span>
                <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" @click.native.prevent="handleSelectBranch(branche)">
                  编辑
                </el-button>
                      <!-- branche.Condition.ConnDataFromText: {{branche.Condition.ConnDataFromText}} -->
                <!----分支的说明显示区域（条件类型，选定值等）---start-->
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
                      {{branche.Condition.NodeNames}}
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

                    <!-- branche.Condition.FieldConditions：{{branche.Condition.FieldConditions}} -->
                    <div
                      style="font-size: 12px; padding: 5px;"
                      v-if="branche.Condition.FieldConditions && branche.Condition.FieldConditions.length"
                    >
                      表单字段：
                      <span
                        v-for="(item, index) in branche.Condition.FieldConditions"
                        style="color: #cccccc"
                      > 
                      <!--拼接 表单字段的显示内容--start--->
                      <span v-if="index === 0">
                        {{item.FieldName}}{{operChange(item.Oper)}}{{item.FieldValue.Id}}
                      </span>
                      <span v-if="index === 1">
                        ，{{saveTypeChange(item.SaveType)}}{{item.FieldName}}{{operChange(item.Oper)}}{{item.FieldValue.Id}}
                      </span>
                      </span>
                      <!--拼接 表单字段的显示内容--end--->
                    </div>
                    <!----分支的条件类型 和 表单字段 等内容---end-->

                  </el-card>
                </div>
                <!----分支的说明显示区域（条件类型，选定值等）---end-->
              </div>

              <!----处理人区域（该分支下面 所有的处理人节点显示）--start--->
              <div style="margin-bottom: 10px">
                处理人：
                <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" @click.native.prevent="handleAddApprover(branche)">
                  新增
                </el-button>

                <!---处理人list区域（所有节点处理人的 集合）---start--->
                <!-- branche.Name: {{branche.Name}} -->
                <div style="margin-top: 10px">
                  <el-card shadow="hover">
                    <!---第一个处理人节点显示区-----start--->
                    <div class="deliverie-item">
                      <el-tooltip class="item" effect="dark" content="编辑此节点" placement="bottom">
                        <span class="name" style="font-size: 12px" @click="handleEditNameAndRule(branche)">
                          名称：{{branche.Name}}
                        </span> 
                      </el-tooltip >

                      <div class="deliverie-item-left" v-atris-flowRuleScan="{styleBlock:'block'}">
                        <el-tooltip class="item" effect="dark" content="编辑此审批" placement="bottom">
                          <i class="el-icon-edit" @click="handleSelectApprover(branche.NodeToNodeId)"></i>
                        </el-tooltip>
                      </div>

                      <!-- branche.Deliveries: {{branche.Deliveries}} -->
                      <div class="deliverie-item-right" style="flex: 1"
                           v-if="branche.Deliveries && branche.Deliveries.length">
                        <template v-for="Deliverie in branche.Deliveries">
                          <!--按节点或者表单字段时--start-->
                          <div>
                            <!-- Deliverie： {{Deliverie}} -->
                            <div>{{Deliverie.DeliveryWayText}}</div>
                            <div style="margin-left:10px;margin-top:5px">
                              {{Deliverie.DeliveryWayTypeText}}: 
                              <!--注 8 为按节点---->
                              <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                              <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>
                            </div>                         
                          </div>
                          <!--按节点或者表单字段时--start-->
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
                <!---第一个处理人节点显示区-----end--->

                <!-- {{branche.Nodes}} -->
                <!-- branche.Nodes：{{branche.Nodes}} -->

                <!--新增处理人后，动态生成的节点处理人显示区--start--->
                <div v-if="branche.Nodes && branche.Nodes.length">
                  <recursive-cmp :nodes="branche.Nodes"
                                 @handleSelectApprover="handleSelectApprover"
                                 ></recursive-cmp>
                </div>
                <!--新增处理人后，动态生成的节点处理人显示区--end--->

              </div>
              <!----处理人区域（该分支下面 所有的处理人节点显示）--end--->

              <!----抄送人区域（该分支下的抄送人说明显示，和 抄送人 编辑 按钮）--start--->
              <!-- branche.NodeToNodeId：{{branche.NodeToNodeId}} -->
              <div style="">
                <span class="tit" style="color:rgba(59,159,227,0.8)">{{_CurrentHandler(branche)}}</span><span>的抄送人:</span>
                <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" size="small" @click.native.prevent="handleSelectCc(branche)">
                  编辑
                </el-button>

                <div style="margin-top: 10px" v-if="_getLastFieldObJ(branche).CcModel && _getLastFieldObJ(branche).CcModel.length">
                  <el-card shadow="hover">
                    <template v-for="Deliverie in (_getLastFieldObJ(branche).CcModel)">
                      <!--按节点或者表单字段时--start-->
                      <!-- Deliverie： {{Deliverie}} -->
                      <div>
                        <div>{{Deliverie.DeliveryWayText}}</div>
                        <div style="margin-left:10px;margin-top:5px">
                          {{Deliverie.DeliveryWayTypeText}}: 
                          <!--注 8 为按节点---->
                          <span style="color: #cccccc" v-if="Deliverie.DeliveryWay!=='8'">{{Deliverie.FieldName}}</span>
                          <span style="color: #cccccc" v-else>{{Deliverie.NodeNames}}</span>
                        </div>                         
                      </div>
                      <!--按节点或者表单字段时--start-->                      
                      <!--已选岗位区域---start--->
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
                      <!--已选岗位区域---end--->

                      <!--已选组织区域---start--->                                                          
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
                      <!--已选组织区域---end--->                                                          

                      <!--已选人员---start--->                                                                                
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
                      <!--已选人员---end--->                                                                                
                    </template>
                  </el-card>
                </div>

              </div>
              <!----抄送人区域（该分支下的抄送人显示，和 抄送人 编辑 按钮）--end--->

            </el-card>
          </div>
          <!--该流程下的所有分支llist container--end-->

        </el-card>
      </div>
    </div>

    <!--调用 mixins 中的 flowBaseFn方法中的 handleClose 方法----->
    <save-footer @save="onRuleSave" :isCancel="true" cancelText="关闭" @cancel="handleClose"></save-footer>

    <!--点击发起人按钮后的dialog弹窗---start--->
    <template v-if="flowStartVisible">
      <start-emp-dialog :ruleId="ruleObj.FlowRuleId" @handleCancelFlowStart="handleCancelFlowStart"
                        @refresh="refreshRule"></start-emp-dialog>
    </template>
    <!--点击发起人按钮后的dialog弹窗---end--->

    <!--编辑此审批（编辑最后一个节点的处理人）dialog 弹窗--start-->
    <template v-if="approverVisible">
      <approver-dialog :NodeToNodeCode="NodeToNodeCode"
                       :ruleId="ruleObj.FlowRuleId"
                       @handleCancelApprover="handleCancelApprover"
                       @refresh="refreshRule"></approver-dialog>
    </template>
    <!--编辑此审批（处理人）dialog 弹窗--end-->

    <!---新增处理人后的dialog 弹窗----start-->
    <template v-if="addApproverVisible">
      <add-approver-dialog :mainNodeId="mainNodeId" :toNodeId="toNodeId"
                           :ruleId="ruleObj.FlowRuleId"
                           @handleCancelAddApprover="handleCancelAddApprover"
                           @refresh="refreshRule"></add-approver-dialog>
    </template>
    <!---新增处理人后的dialog 弹窗----end-->    

    <!--编辑此名称 和 审批规则 的 dialog 弹窗--start-->
    <template v-if="editNameAndRuleVisible">
      <edit-nameandrule-dialog 
                      :selectEditNameObj= "selectEditNameObj"
                       :editNameAndRuleVisible.sync="editNameAndRuleVisible"
                       @handleSaveEditName = "handleSaveEditName"
                       @refresh="refreshRule"></edit-nameandrule-dialog>
    </template>
    <!--编辑此审批和审批规则 的dialog 弹窗--end-->

    <!--点击了编辑处理人按钮后的 dialog 弹框---start--->
    <template v-if="ccVisible">
      <cc-dialog :NodeToNodeCode="NodeToNodeCode" 
                 @handleCancelCc="handleCancelCc"
                 @refresh="refreshRule"></cc-dialog>
    </template>
    <!--点击了编辑处理人按钮后的 dialog 弹框---end--->

    <!--点击了分支名称后面的 编辑按钮（出口条件的dialog）后，弹出框----start-->
    <template v-if="branchVisible">
      <branch-dialog
        :mainNodeId="mainNodeId" 
        :toNodeId="toNodeId"
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

    <!---点击了 图形设计 后的dialog 弹框--start--->
    <!-- showDesignPic: {{showDesignPic}} -->
    <div class="flowDisgnPic" v-if="showDesignPic">
      <transition name="el-fade-in">
        <flow-design-pic ref="showDisgnPic" :ruleObj.sync="ruleObj" @addLastNode="handleAddApprover" @closeDessignPic="closeDessignPic"></flow-design-pic>
      </transition>
    </div>
    <!----点击了 图形设计 后的dialog 弹框--------end--->

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
  import FlowDesignPic from './flow-design-pic/flow-design-pic'
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
    getNodeList,
    saveNodeInfo,
    insertNode
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
      EditNameandruleDialog,
      FlowDesignPic
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
        approverVisible: false,   // 编辑处理人的的弹框
        addApproverVisible: false, // 新增处理人的弹框
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
        selectEditNameObj: {},  // 编辑的 当前 分支名称对象
  
        showDesignPic: false,  // 控制流程图弹框的显示/隐藏
        nodeData: []   // 用于跳转到 出口方向时 调接口获取的节点对象数据
      }
    },
    created () {
      try {
        // 清除一下 localStorage中的 posFlag： 由 流程图设计 跳转到 出口方向
        localStorage.setItem('posFlag', '')
        // 清除一下 fieldSetToFlowDessign ： 由 表单设置 跳转到 流程图设计页面
        sessionStorage.setItem('fieldSetToFlowDessign', '')
        // 关闭 图形设计的弹框
        this.showDesignPic = false
        // 将 tabPosition 设置为 '简洁设计'
        this.tabPosition = '简洁设计'
  
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
      // 编辑分支 处理人（跟 新增 处理人不一样）
      this.$bus.$on('handleSelectApprover', (code) => {
        this.handleSelectApprover(code)
      })
      // 图形设计中 点击了 抄送人 的编辑btn
      this.$bus.$on('handleSelectCc_designPic', (code) => {
        this.handleSelectCc_designPic(code)
      })
      // 编辑分支规则
      this.$bus.$on('handleEditNameAndRule', (node) => {
        this.handleEditNameAndRule(node)
      })
      // 编辑 分支条件
      this.$bus.$on('handleSelectBranch', (node) => {
        this.handleSelectBranch(node)
      })
      // 编辑节点名称及规则
      this.$bus.$on('handleEditNameAndRule', (node) => {
        this.handleEditNameAndRule(node)
      })
      // 编辑发起人
      this.$bus.$on('handleFlowStart', (node) => {
        this.handleFlowStart(node)
      })
      // 处理人 编辑了 人员后，分发的 flowDssignRefresh 的 $bus事件
      this.$bus.$on('flowDssignRefresh', () => {
        debugger
        this._getRule()
      })
      // 分支排序
      this.$bus.$on('sortBranch', () => {
        this.sortBranch()
      })
      // 新增分支
      this.$bus.$on('batchAddBranch', () => {
        this.batchAddBranch()
      })
      // 出口方向
      this.$bus.$on('getPosDataList', () => {
        this.batchOutPosition()
      })
      // 中间节点新增插入节点
      this.$bus.$on('insertNode', (NodeToNodeId_formerId, NodeToNodeId_latterId) => {
        this.insertNode(NodeToNodeId_formerId, NodeToNodeId_latterId)
      })
    },
    beforeDestroy () {
      // 页面销毁前
      this.$bus.$off('handleSelectApprover')
      this.$bus.$off('handleEditNameAndRule')
      this.$bus.$off('flowDssignRefresh')
      this.$bus.$off('handleSelectCc_designPic')
      this.$bus.$off('handleSelectBranch')
      this.$bus.$off('handleFlowStart')
      this.$bus.$off('sortBranch')
      this.$bus.$off('batchAddBranch')
      this.$bus.$off('getPosDataList')
      this.$bus.$off('insertNode')
    },
    computed: {
    },
    // 导航钩子函数
    beforeRouteEnter (to, from, next) {
      debugger
      let flag = sessionStorage.getItem('fieldSetToFlowDessign')
      if (from.path === '/platform/approvalFlow/flowRule/flowConfig/fieldSet' && flag) {
        // 判断从 节点设置页面 点击 流程图进入  这里 组件还没有创建 故没有 this 需要用vm 来获取 实例对象
        next(vm => {
          console.log(vm)
          vm.tabPosition = '图形设计'
          vm.showDesignPic = true
        })
      } else {
        next()
      }
    },
    watch: {
      '$route' (to, from) {
        this.companyApprovalId = this.$route.query.approvalId
        this.ruleId = this.$route.query.ruleId
        this._getRule()
        debugger
      }
    },
    methods: {
      getOrder () {
        this._getRule()
      },
      // 中间节点插入节点
      insertNode (formerId, latterId) {
        debugger
        // 调用子组件显示子组件loading 的方法
        this.$refs['showDisgnPic'].showLoading()
        insertNode(formerId, latterId).then((res)=>{
          if(res && res.data.State ===REQ_OK){
            // 刷新获取最新的数据
            this.getOrder()
            // 调用子组件 隐藏子组件 loading 的方法
            this.$refs['showDisgnPic'].hideLoading()            
            this.$message({
              type: 'success',
              message: "新增插入节点成功"
            })
          }else {
            this.$message({
              type: 'warning',
              message: `新增插入节点失败${res.data.Error},请重试`
            })
          }
          // 调用子组件 隐藏子组件 loading 的方法
          this.$refs['showDisgnPic'].hideLoading()
        }).catch(() =>{
            this.$message({
              type: 'error',
              message: `新增插入节点失败${res.data.Error},请重试`
            })
            // 调用子组件 隐藏子组件 loading 的方法
            this.$refs['showDisgnPic'].hideLoading()
        })
      },      
      // 获取 分支最后一个节点对象
      _getLastFieldObJ (branche) {
        if (branche.Nodes && branche.Nodes.length) {
          function getNodesName (opt) {
            if (opt && opt.length) {
              for (let i = 0; i < opt.length; i++) {
                let item = opt[i]
                if (item.Nodes && item.Nodes.length) {
                  return getNodesName(item.Nodes)
                } else {
                  // console.log(opt[0].Name)
                  // console.log(item.Name)
                  return item
                }
              }
            } else {
              return opt
            }
          }
          return getNodesName(branche.Nodes)
        } else {
          if (branche) {
            return branche
          }
        }
      },
      // 处理显示分支最后一个节点的 节点名称
      _CurrentHandler (branche) {
        if (branche.Nodes && branche.Nodes.length) {
          function getNodesName (opt) {
            if (opt && opt.length) {
              for (let i = 0; i < opt.length; i++) {
                let item = opt[i]
                if (item.Nodes && item.Nodes.length) {
                  return getNodesName(item.Nodes)
                } else {
                  // console.log(opt[0].Name)
                  // console.log(item.Name)
                  return item.Name
                }
              }
            } else {
              return opt.Name
            }
          }
          return getNodesName(branche.Nodes)
        } else {
          if (branche.Name) {
            return branche.Name
          }
        }
      },
      // 用于 跳转到 出口方向时 获取节点数据 列表
      _getNodeList () {
        debugger
        this.loading = true
        return new Promise((resolve, reject) => {
          getNodeList(this.$route.query.ruleId).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              debugger
              this.nodeData = res.data.Data
              resolve(res.data.Data)
            } else {
              this.$message.error('节点列表获取失败')
            }
          }).catch((err) => {
            this.loading = false
            this.$message.error('节点列表获取失败')
            reject(err)
          })
        })
      },
      // 获取规则详情
      _getRule () {
        if (!this.ruleId) return
        // debugger
        this.loading = true
        getRule(this.ruleId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.ruleObj = res.data.Data
            this.oldRuleObj = JSON.parse(JSON.stringify(this.ruleObj))
          } else {
            this.loading = false
            this.$message({
              message: `获取数据失败err,${res.data.Error}`,
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

      // 设置出口方向
      batchOutPosition () {
        // 先调取接口 获取 该流程的节点数据
        this._getNodeList().then(res => {
          // 将 this.nodeData 的数据存入 sessionStorage 中
          if (res && res.length) {
            // 默认将 第一条数据 存入 store 中
            this.$store.commit('SET_NODE_OBJ', res[0])

            // 在sesstionStorage中 存入 一个标识 来确定 是从 流程设计 的页面 进入到 出口方向的
            localStorage.setItem('posFlag', true)
            // 页面跳转
            this.$router.push({
              path: '/platform/approvalFlow/flowRule/flowConfig/fieldSet',
              query: {
                'flowId': this.$route.query.flowId,
                'approvalId': this.$route.query.approvalId,
                'ruleId': this.$route.query.ruleId
              }
            })
          }
        })
      },
      // 切换 图形设计
      clickBtn (val) {
        debugger
        switch (val) {
          case '简洁设计':
            this.showDesignPic = false
            break
          case '图形设计':
            this.showDesignPic = true
            break
        }
      },
      // 新增分支条件
      batchAddBranch () {
        this.$confirm("确认新增分支吗？","提示",{
          confirmBtnText: "确定",
          cancelBtnText: "取消",
          type: "warning"
        }).then(()=>{
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
        }).catch(()=>{
          this.$message({
            type: "info",
            message:"新增分支已取消！"
          })
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
      // flow-design-pic 组件 触发给父组件的事件(关闭 图形设计的 弹框)
      closeDessignPic () {
        this.showDesignPic = false
        this.tabPosition = '简洁设计'
      },
      // 刷新规则
      refreshRule () {
        this._getRule(this.ruleObj.FlowRuleId)
      },
      // 发起人规则弹窗
      handleFlowStart () {
        this.flowStartVisible = true
      },
      // 发起人dialog取消
      handleCancelFlowStart () {
        this.flowStartVisible = false
      },
      // 点击了分支名称后面的 “编辑”btn （编辑出口条件）
      handleSelectBranch (branch) {
        this.mainNodeId = branch.MainNodeId
        this.toNodeId = branch.ToNodeId
        // 显示  出口条件 的dialog 弹框
        this.branchVisible = true
      },
      // 分之条件dialog取消
      handleCancelBranch () {
        // 隐藏 出口条件的 dialog 弹框
        this.branchVisible = false
      },
      // 编辑节点名称 和 规则
      handleEditNameAndRule (branc) {
        debugger
        this.selectEditNameObj = branc
        // 调用获取该节点 配置属性的接口
        this.editNameAndRuleVisible = true
      },
      // 保存编辑姓名和规则
      handleSaveEditName (data) {
        debugger
        // 提交 保存的接口
        this._saveNodeInfo(data)
      },
      // 编辑默认审批人/编辑新增审批人（跟新增 处理人不一样）
      handleSelectApprover (code) {
        debugger
        this.NodeToNodeCode = code
        this.approverVisible = true
      },
      // 默认审批人dialog取消
      handleCancelApprover () {
        this.approverVisible = false
      },
      // 新增下一步审批人（即新增一个 节点的审批人）
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
      // 图形设计中，点击了 抄送人的 编辑 btn (对应节点的 抄送人编辑)
      handleSelectCc_designPic (obj) {
        debugger
        this.NodeToNodeCode = obj.NodeToNodeId
        this.ccVisible = true
      },
      // 简洁设计中 ，点击了 抄送人 的 编辑 btn（此时 只是 针对最后一个节点 的 抄送人的编辑）
      handleSelectCc (branche) {
        debugger
        // this.NodeToNodeCode = NodeToNodeCode
        // 需要 选取最后一个节点的 NodeToNodeCode 作为  this.NodeToNodeCode 的值 需要递归遍历
        if (branche.Nodes && branche.Nodes.length) {
          let getNodesName = (opt) => {
            if (opt && opt.length) {
              for (let i = 0; i < opt.length; i++) {
                let item = opt[i]
                if (item.Nodes && item.Nodes.length) {
                  return getNodesName(item.Nodes)
                } else {
                  // console.log(opt[0].Name)
                  // console.log(item.Name)
                  return item.NodeToNodeId
                }
              }
            } else {
              return opt.NodeToNodeId
            }
          }
          let lastNodeToNodeId = getNodesName(branche.Nodes)
          this.NodeToNodeCode = lastNodeToNodeId
        } else {
          if (branche.NodeToNodeId) {
            this.NodeToNodeCode = branche.NodeToNodeId
          }
        }
        // 显示出 编辑抄送人的 dialog 弹窗
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
                display inline-block
                align-items center
                font-size 12px
                margin-right 10px
                color rgba(59,159,227,.8)
                &:hover
                  cursor pointer
                  color rgba(59,139,227,1)
              .deliverie-item-left
                display flex
                flex: 0 0 50px
                align-items center
                justify-content center
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
        margin-bottom 10px
      .el-dialog__body
        max-height 400px
        overflow-y scroll

  .el-tag + .el-tag {
    margin-left 10px
  }


</style>
