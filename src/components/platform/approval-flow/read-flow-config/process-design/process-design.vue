<!--
  User: xxxxxxx
  Date: 2018/7/9
  功能：xxxxxx
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
          <el-card shadow="never" class="box-card" style="width: 100%">
            <div slot="header" class="clearfix">
              <div style="margin-bottom: 10px">
                规则名：
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
          <div class="branch-list">
            <el-card shadow="hover"
                     class="box-card branch-item"
                     v-for="(branche, index) in ruleObj.Branches"
                     v-if="ruleObj.Branches && ruleObj.Branches.length"
                     :key="branche.NodeToNodeId"
                     v-dragging="{ item: branche, list: ruleObj.Branches, group: 'branches' }"
            >
              <div slot="header" class="clearfix" style="display: flex">
                <span style="flex: 1;">优先级{{branche.PRI}}</span>
                <el-tooltip class="item" effect="dark" content="删除此分支" placement="bottom">
                  <el-button type="text"
                             style="flex: 0 0 100px;padding: 0 20px"
                             v-if="index !== 0"
                             @click.native.prevent="_deleteBranch(branche.NodeToNodeId)">删除
                  </el-button>
                </el-tooltip>
              </div>
              <div style="margin-bottom: 10px">
                {{branche.Condition.Name}}：
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
                审批人：
                <el-button size="small" @click.native.prevent="handleAddApprover(branche)">
                  新增
                </el-button>
                <div style="margin-top: 10px">
                  <el-card shadow="hover">
                    <div class="deliverie-item">
                      <span class="name" style="font-size: 12px">
                        名称：{{branche.Name}}
                      </span>
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
                <div v-if="branche.Nodes && branche.Nodes.length">
                  <recursive-cmp :nodes="branche.Nodes"
                                 @handleSelectApprover="handleSelectApprover"></recursive-cmp>
                </div>
              </div>
              <div style="">
                抄送人：
                <el-button size="small" @click.native.prevent="handleSelectCc(branche.NodeToNodeId)">
                  选择
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
        </el-card>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getRule,
    getBranchCondition
  } from '@/api/approve'
  // import { mapGetters } from 'vuex'
  import { flowBaseFn } from '@/utils/mixin'
  import RecursiveCmp from './components/Recursive-cmp'


  export default {
    mixins: [flowBaseFn],
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
        addBranchNum: 1
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
    },
    methods: {
      getOrder () {
        this._getRule()
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
              message: `${res.data.Error}`,
              type: 'warning'
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
      // 获取分支
      _getBranchCondition (NodeToNodeCode) {
        getBranchCondition(NodeToNodeCode).then(res => {
          if (res.data.State === REQ_OK) {
          } else {
          }
        }).catch(() => {
        })
      },

      handleSelectApprover() {

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
      }
    },
    watch: {
      '$route' (to, from) {
        this.companyApprovalId = this.$route.query.approvalId
        this.ruleId = this.$route.query.ruleId
        this._getRule()
      }
    },
    components: {
      RecursiveCmp
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
