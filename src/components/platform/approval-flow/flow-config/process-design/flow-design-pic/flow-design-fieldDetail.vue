<!--
  User: gaol
  Date: 2019/6/6
  功能：画图流程设计 中 点击 了节点名称后 跳转的页面显示 (此页面暂时未用)
-->

<template>
  <div class="flow-design-container">
    <div v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="handleRuleClick">
        <el-tab-pane :label="rule.Name" :name="rule.FlowRuleId" v-for="rule in ruleList" :key="rule.FlowRuleId">
        </el-tab-pane>
      </el-tabs>
      <div style="margin-bottom: 20px">
        <el-select v-model="currentNodeId" placeholder="请选择节点" @change="handleSelectNodeId">
          <el-option
            v-for="item in nodeList"
            :key="item.NodeId"
            :label="item.Name"
            :value="item.NodeId">
          </el-option>
        </el-select>
      </div>
      <el-card>
        <div class="item-field">
          <span class="name">节点名称：</span>
          <el-input v-model="nodeObj.Name" style="width: 300px">
          </el-input>
        </div>
        <div class="item-field">
          <span class="name">节点类型：</span>
          <el-select v-model="nodeObj.RunModel" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in runModelList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field">
          <span class="name" style="vertical-align: top">操作提示：</span>
          <el-input
            type="textarea"
            style="width: 300px"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="nodeObj.Tip">
          </el-input>
        </div>
        <div class="item-field">
          <span class="name">撤销规则：</span>
          <el-select v-model="nodeObj.CancelRole" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in cancelRoleList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field" v-if="nodeObj.CancelRole === '3'">
          <span class="name">选择节点：</span>
          <el-select v-model="nodeObj.NodeCancels" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in cancelRoleList"
              multiple
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field">
          是否开启投递路径自动记忆功能？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.IsRememberMe"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          是否允许组织外部人员执行的节点？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.IsGuestNode"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          本节点审批人不允许包含上一步发送人？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.IsExpSender"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          <span class="name w-120">多人处理规则：</span>
          <el-select class="filter-item"
                     v-model="nodeObj.TodolistModel"
                     style="width:217px;"
                     clearable
          >
            <el-option v-for="item in todolistModel" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field" v-if="nodeObj.TodolistModel === '4'">
          <span class="name w-120">组长规则：</span>
          <el-select class="filter-item"
                     v-model="nodeObj.TeamLeaderConfirmRole"
                     style="width:217px;"
                     clearable
          >
            <el-option v-for="item in teamLeaderConfirmRole" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field">
          <span class="name w-120">审批人去重：</span>
          <el-select v-model="nodeObj.JumpRole" multiple placeholder="请选择">
            <el-option
              v-for="item in jumpRoleList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field">
          <span class="name w-120">启用按钮：</span>
          <div style="padding-left: 20px">
            <el-checkbox v-model="nodeObj.SaveEnable">保存</el-checkbox>
            <el-checkbox v-model="nodeObj.ShiftEnable">转交</el-checkbox>
            <el-checkbox v-model="nodeObj.AskforEnable">加签</el-checkbox>
            <el-checkbox v-model="nodeObj.FocusEnable">关注</el-checkbox>
            <el-checkbox v-model="nodeObj.ReturnEnable">退回</el-checkbox>
            <el-checkbox v-model="nodeObj.HungEnable">挂起</el-checkbox>
            <el-checkbox v-model="nodeObj.CcEnable">抄送</el-checkbox>
            <el-checkbox v-model="nodeObj.RefuseEnable">拒绝</el-checkbox>
            <el-checkbox v-model="nodeObj.HuiQianEnable">会签</el-checkbox>
            <el-checkbox v-model="nodeObj.DelEnable">删除</el-checkbox>
            <el-checkbox v-model="nodeObj.CancelEnable">撤销</el-checkbox>
            <el-checkbox v-model="nodeObj.CommentEnable">评论</el-checkbox>
          </div>
        </div>
        <div class="item-field" v-if="nodeObj.ReturnEnable">
          <span class="name w-120">退回规则：</span>
          <el-select v-model="nodeObj.ReturnRole" placeholder="请选择">
            <el-option
              v-for="item in returnRoleList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field" v-if="nodeObj.HuiQianEnable">
          <span class="name w-120">会签模式：</span>
          <el-select v-model="nodeObj.HuiQianRole" placeholder="请选择">
            <el-option
              v-for="item in huiQianRoleList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field">
          是否显示审核信息？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.FWCListEnable"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          是否使用图片签名？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.SigantureEnabel"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          是否显示退回信息？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.FWCIsShowReturnMsg"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          是否显示轨迹表？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.FWCTrackEnable"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          允许上传附件？：
          <el-switch
            style="vertical-align: top;margin-left: 10px"
            v-model="nodeObj.FWCAth"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </div>
        <div class="item-field">
          人员选择器显示方式：
          <el-select v-model="nodeObj.SelectorModel" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in selectorModelList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="item-field">
          <span class="name">节点意见名称：</span>
          <el-input v-model="nodeObj.FWCNodeName" style="width: 300px">
          </el-input>
        </div>
        <div class="item-field">
          <span class="name">工作方式：</span>
          <el-select v-model="nodeObj.FWCType" placeholder="请选择" style="width: 300px">
            <el-option
              v-for="item in fWCTypeList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <save-footer :isCancel="true" cancelText="关闭" @cancel="handleClose" @save="handleFlowDesignSave"></save-footer>
      </el-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getNodeAttr,
    saveNodeAttr,
    getRuleList,
    runModel,
    cancelRole,
    todolistModel,
    teamLeaderConfirmRole,
    jumpRole,
    selectorModel,
    fWCType,
    returnRole,
    huiQianRole,
    getNodeList
  } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { flowBaseFn, flowAutoLogin } from '@/utils/mixin'

  export default {
    mixins: [flowBaseFn, flowAutoLogin],
    data () {
      return {
        loading: true,
        activeName: '',
        ruleList: [],
        nodeList: [],
        props: {
          value: 'value',
          children: 'child'
        },
        currentNodeId: '',
        nodeObj: {
          Name: '', // 节点名称
          RunModel: '', // 节点类型
          Tip: '', // 前台操作提示
          CancelRole: '', // 撤销规则
          NodeCancels: [
            // {
            //   CancelTo: '', // 可撤销到节点的Id
            //   CancelNodeName: '' // 节点名称
            // }
          ], // 可撤销的节点
          IsRememberMe: false, // 是否开启投递路径自动记忆功能
          IsGuestNode: false, // 是允许组织外部人员执行的节点？
          IsExpSender: false, // 本节点审批人不允许包含上一步发送人?
          TodolistModel: '', // 多人处理规则
          TeamLeaderConfirmRole: '', // 组长规则
          JumpRole: '', // 审批人去重
          SaveEnable: false, // 保存按钮是否启用
          ShiftEnable: false, // 转交按钮是否启用
          AskforEnable: false, // 加签按钮是否启用
          FocusEnable: false, // 关注按钮是否启用
          ReturnEnable: false, // 是否可以退回
          ReturnRole: '', // 退回规则
          HungEnable: false, // 挂起按钮是否启用
          CcEnable: false, // 抄送是否启用
          RefuseEnable: false, // 拒绝按钮是否启用
          HuiQianEnable: false, // 会签按钮是否启用
          HuiQianRole: '', // 会签模式
          DelEnable: false, // 删除按钮是否启用
          CancelEnable: false, // 撤销按钮是否启用
          CommentEnable: false, // 评论按钮是否启用
          FWCListEnable: false, // 是否显示审核信息
          SigantureEnabel: false, // 是否使用图片签名
          FWCIsShowReturnMsg: false, // 是否显示退回信息
          FWCTrackEnable: false, // 是否显示轨迹表
          FWCAth: false, // 允许上传附件
          SelectorModel: '', // 人员选择器显示方式
          FWCNodeName: '', // 节点意见名称
          FWCType: '' // 工作方式/组件类型
        },
        runModelList: [],
        cancelRoleList: [],
        todolistModel: [],
        teamLeaderConfirmRole: [],
        jumpRoleList: [],
        selectorModelList: [],
        fWCTypeList: [],
        returnRoleList: [],
        huiQianRoleList: []
      }
    },
    created () {
      try {
        Promise.all(
          [
            this._getRuleList(),
            this._runModel(),
            this._cancelRole(),
            this._todolistModel(),
            this._teamLeaderConfirmRole(),
            this._jumpRole(),
            this._selectorModel(),
            this._fWCType(),
            this._returnRole(),
            this._huiQianRole()
          ]
        )
      } catch (error) {
        this.$message({
          message: '请求错误，请刷新重试！',
          type: 'error'
        })
        this.loading = false
      }
    },
    methods: {
      // 获取节点属性
      _getNodeAttr () {
        this.loading = true
        getNodeAttr(this.currentNodeId).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.nodeObj = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '获取节点属性失败，请重试!'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取节点属性失败，请重试!'
          })
        })
      },
      // 保存节点属性
      _saveNodeAttr () {
        this.loading = true
        if (!this.currentNodeId) return this.$message.info('未选择节点')
        saveNodeAttr(this.currentNodeId, JSON.stringify(this.nodeObj)).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '保存失败，请重试!'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '保存失败，请重试!'
          })
        })
      },
      // 获取规则列表
      _getRuleList () {
        getRuleList(this.companyApprovalId).then(res => {
          if (res.data.State === REQ_OK) {
            this.ruleList = res.data.Data
            if (res.data.Data.length) {
              this.activeName = res.data.Data[0].FlowRuleId
              this._getNodeList()
            } else {
              this.loading = false
              this.$alert('未建立规则，请先在流程设计添加规则！', '提示', {
                confirmButtonText: '确定'
              })
            }
          } else {
            this.$message({
              message: '规则列表获取失败，请刷新重试！',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '规则列表获取失败，请刷新重试！',
            type: 'error'
          })
        })
      },
      // 获取节点列表
      _getNodeList () {
        getNodeList(this.activeName).then(res => {
          if (res.data.State === REQ_OK) {
            this.nodeList = res.data.Data
          }
        })
      },
      // 获取节点类型
      _runModel () {
        runModel().then(res => {
          if (res.data.State === REQ_OK) {
            this.runModelList = res.data.Data
          }
        }).catch(() => {
        })
      },
      // 撤销规则
      _cancelRole () {
        cancelRole().then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.cancelRoleList = res.data.Data
          }
        }).catch(() => {
          this.loading = false
        })
      },
      // 规则切换
      handleRuleClick (tab, event) {
        this._getRule(this.activeName)
      },
      // 选择节点
      handleSelectNodeId () {
        this._getNodeAttr()
      },
      // 保存节点属性
      handleFlowDesignSave () {
        if (!this.currentNodeId) {
          this.$message({
            type: 'warning',
            message: '未选择任何节点'
          })
        } else {
          this._saveNodeAttr()
        }
      },
      // 字典项--多人处理规则
      _todolistModel () {
        todolistModel().then(res => {
          if (res.data.State === REQ_OK) {
            this.todolistModel = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '多人处理规则获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '多人处理规则获取失败，请重试!'
          })
        })
      },
      // 字典项--组长规则
      _teamLeaderConfirmRole () {
        teamLeaderConfirmRole().then(res => {
          if (res.data.State === REQ_OK) {
            this.teamLeaderConfirmRole = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '组长规则获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '组长规则获取失败，请重试!'
          })
        })
      },
      // 字典项--审批人去重
      _jumpRole () {
        jumpRole().then(res => {
          if (res.data.State === REQ_OK) {
            this.jumpRoleList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '审批人获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '审批人获取失败，请重试!'
          })
        })
      },
      // 人员选择器显示方式
      _selectorModel () {
        selectorModel().then(res => {
          if (res.data.State === REQ_OK) {
            this.selectorModelList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '人员选择器获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '人员选择器获取失败，请重试!'
          })
        })
      },
      // 工作方式
      _fWCType () {
        fWCType().then(res => {
          if (res.data.State === REQ_OK) {
            this.fWCTypeList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '工作方式获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '工作方式获取失败，请重试!'
          })
        })
      },
      // 退回规则
      _returnRole () {
        returnRole().then(res => {
          if (res.data.State === REQ_OK) {
            this.returnRoleList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '退回规则获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '退回规则获取失败，请重试!'
          })
        })
      },
      // 会签模式
      _huiQianRole () {
        huiQianRole().then(res => {
          if (res.data.State === REQ_OK) {
            this.huiQianRoleList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '会签模式获取失败，请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '会签模式获取失败，请重试!'
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
  .flow-design-container
    .el-card
      .item-field
        display flex
        align-items center
        margin-bottom 10px
        .name
          display inline-block;
          width 120px

  .el-checkbox
    margin-right 20px
    margin-bottom 10px

  .el-checkbox + .el-checkbox
    margin-left: 0 !important
    margin-right 20px
</style>
