/**
 * Created by Administrator on 2018/10/16.
 * function : mixin
 */

import CommonInput from '@/base/Common-input/Common-input'
import CommonSelect from '@/base/Common-select/Common-select'
// import SendCmp from '@/components/platform/approval-flow/right-fixed/send-cmp'
import SendCmp from '@/components/platform/approval-flow/right-fixed/agree-cmp'
import RefuseCmp from '@/components/platform/approval-flow/right-fixed/refuse-cmp'
import CommentCmp from '@/components/platform/approval-flow/right-fixed/comment-cmp'
import ShiftCmp from '@/components/platform/approval-flow/right-fixed/shift-cmp'
import AskForCmp from '@/components/platform/approval-flow/right-fixed/ask-for-cmp'
import ReturnCmp from '@/components/platform/approval-flow/right-fixed/return-cmp'
import HungUpCmp from '@/components/platform/approval-flow/right-fixed/hung-up-cmp'
import HuiQianCmp from '@/components/platform/approval-flow/right-fixed/huiqian-cmp'

// 控件类型----------------------------------------------------------------------------------------------
import BaseInput from '@/base/Table-control-cmp/Base-input'
import TextareaInput from '@/base/Table-control-cmp/Textarea-input'
import NumInput from '@/base/Table-control-cmp/Num-input'
import MoneyInput from '@/base/Table-control-cmp/Money-input'
import BaseSelect from '@/base/Table-control-cmp/Base-select'
import MultipleSelect from '@/base/Table-control-cmp/Multiple-select'
import BaseDate from '@/base/Table-control-cmp/Base-date'
import RangeDate from '@/base/Table-control-cmp/Range-date'
import TimeDate from '@/base/Table-control-cmp/Time-date'
import MonthSelect from '@/base/Table-control-cmp/Month-select'
import BaseSwitch from '@/base/Table-control-cmp/Base-switch'
import BaseRadio from '@/base/Table-control-cmp/Base-radio'
import BaseCheckbox from '@/base/Table-control-cmp/Base-checkbox'
import BaseImgUpload from '@/base/Table-control-cmp/Base-img-upload'
import BaseFileUpload from '@/base/Table-control-cmp/Base-file-upload'
import BaseEmpUpload from '@/base/Table-control-cmp/Base-emp-select'
import BaseOrgUpload from '@/base/Table-control-cmp/Base-org-select'
import BaseMapUpload from '@/base/Table-control-cmp/Base-map-select'
import BaseCalculate from '@/base/Table-control-cmp/Base-calculate'
import BaseEditor from '@/base/Table-control-cmp/Base-editor'
import BaseExplain from '@/base/Table-control-cmp/Base-explain'
import OrgAndEmpSelect from '@/base/Table-control-cmp/Org-and-emp-select'

// 控件设置----------------------------------------------------------------------------------------------
import BaseSetInput from '@/base/Table-set-control-cmp/Base-set-input'
import TextareaSetInput from '@/base/Table-set-control-cmp/Textarea-set-input'
import NumSetInput from '@/base/Table-set-control-cmp/Num-set-input'
import MoneySetInput from '@/base/Table-set-control-cmp/Money-set-input'
import BaseSetSelect from '@/base/Table-set-control-cmp/Base-set-select'
import MultipleSetSelect from '@/base/Table-set-control-cmp/Multiple-set-select'
import DateSet from '@/base/Table-set-control-cmp/Date-set'
import RangeDateSet from '@/base/Table-set-control-cmp/Range-date-set'
import TimeSet from '@/base/Table-set-control-cmp/Time-set'
import MonthSet from '@/base/Table-set-control-cmp/Month-set'
import BaseSetSwitch from '@/base/Table-set-control-cmp/Base-set-switch'
import BaseSetRadio from '@/base/Table-set-control-cmp/Base-set-radio'
import CheckboxSet from '@/base/Table-set-control-cmp/Checkbox-set'
import BaseSetImg from '@/base/Table-set-control-cmp/Base-set-img'
import BaseSetFile from '@/base/Table-set-control-cmp/Base-set-file'
import BaseSetEmp from '@/base/Table-set-control-cmp/Base-set-emp-select'
import BaseSetOrg from '@/base/Table-set-control-cmp/Base-set-org-select'
import BaseSetOrgAndEmp from '@/base/Table-set-control-cmp/Base-set-org-and-emp-select'
import BaseSetMap from '@/base/Table-set-control-cmp/Base-set-map'
import BaseSetCalculate from '@/base/Table-set-control-cmp/Base-set-calculate'
import BaseSetEditor from '@/base/Table-set-control-cmp/Base-set-editor'
import BaseSetExplain from '@/base/Table-set-control-cmp/Base-set-explain'

// 控件规则验证--------------------------------------------------------------------------------------------
import BaseInputRule from '@/base/Table-control-rule-cmp/Base-input'
import TextareaInputRule from '@/base/Table-control-rule-cmp/Textarea-input'
import NumInputRule from '@/base/Table-control-rule-cmp/Num-input'
import MoneyInputRule from '@/base/Table-control-rule-cmp/Money-input'
import BaseSelectRule from '@/base/Table-control-rule-cmp/Base-select'
import MultipleSelectRule from '@/base/Table-control-rule-cmp/Multiple-select'
import BaseDateRule from '@/base/Table-control-rule-cmp/Base-date'
import RangeDateRule from '@/base/Table-control-rule-cmp/Range-date'
import TimeDateRule from '@/base/Table-control-rule-cmp/Time-date'
import MonthSelectRule from '@/base/Table-control-rule-cmp/Month-select'
import BaseSwitchRule from '@/base/Table-control-rule-cmp/Base-switch'

// 验证规则组件
import BaseRadioRule from '@/base/Table-control-rule-cmp/Base-radio'
import BaseCheckboxRule from '@/base/Table-control-rule-cmp/Base-checkbox'
import BaseImgUploadRule from '@/base/Table-control-rule-cmp/Base-img-upload'
import BaseFileUploadRule from '@/base/Table-control-rule-cmp/Base-file-upload'
import BaseEmpUploadRule from '@/base/Table-control-rule-cmp/Base-emp-select'
import BaseOrgUploadRule from '@/base/Table-control-rule-cmp/Base-org-select'
import BaseOrgAndEmpRule from '@/base/Table-control-rule-cmp/Base-org-and-emp-select'
import BaseMapUploadRule from '@/base/Table-control-rule-cmp/Base-map-select'
import BaseCalculateRule from '@/base/Table-control-rule-cmp/Base-calculate'
import BaseEditorRule from '@/base/Table-control-rule-cmp/Base-editor'
import BaseExplainRule from '@/base/Table-control-rule-cmp/Base-explain'

// 其它组件-------------------------------------------------------------------------------------------------
import FlowConfigRouter from '@/components/platform/approval-flow/flow-config-router/flow-config-router'

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'
import {
  adminLogin,
  getFieldList,
  getNodeList,
  unSend,  // 撤回
  cancelSend,  // 撤销
  deleteFlow,
  getForm,
  saveWorkSet,
  getBusinessTypeList,
  getFlowList,
  getTrackForm, // 查看轨迹图
  unHungUp,    // 取消挂起
  focus,      // 关注
  ccRead,
  applyTask,  // 申领
  showFeedback,   // 显示反馈
  showInfluentState,  // 显示支流状态
  showAttachment,    // 显示相关附件
  showRelatedFlow,  // 显示相关流程
  showFormChangeLog, // 显示表单变更日志
  showSubFlow,      // 显示子流程
  showSchedule     // 显示流程进度
} from '@/api/approve'

import { getDicByKey, getRoleRange, getDicCollection } from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

// import store from '../store'

// PA页面控件类型
export const paControlTypeMixin = {
  methods: {
    currentTabComponent (teamField) {
      if (teamField.ControlType) {
        switch (teamField.ControlType) {
          case '1':
            return CommonInput
          case '4':
            return CommonSelect
        }
      }
    }
  },
  components: {
    CommonInput,
    CommonSelect
  }
}

// flow页面控件类型
export const workFlowControlTypeMixin = {
  methods: {
    currentTabComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case '1':
            return BaseInput
          case '2':
            return TextareaInput
          case '3':
            return NumInput
          case '4':
            return MoneyInput
          case '5':
            return BaseSelect
          case '6':
            return MultipleSelect
          case '7':
            return BaseDate
          case '8':
            return RangeDate
          case '9':
            return TimeDate
          case '10':
            return MonthSelect
          case '11':
            return BaseSwitch
          case '12':
            return BaseRadio
          case '13':
            return BaseCheckbox
          case '14':
            return BaseImgUpload
          case '15':
            return BaseFileUpload
          case '16':
            return BaseCalculate
          case '19':
            return BaseEmpUpload
          case '20':
            return BaseOrgUpload
          case '21':
            return OrgAndEmpSelect
          case '22':
            return BaseMapUpload
          case '23':
            return BaseEditor
          case '24':
            return BaseExplain
        }
      }
    }
  },
  components: {
    BaseInput,
    TextareaInput,
    NumInput,
    MoneyInput,
    BaseSelect,
    MultipleSelect,
    BaseDate,
    RangeDate,
    TimeDate,
    MonthSelect,
    BaseSwitch,
    BaseRadio,
    BaseCheckbox,
    BaseImgUpload,
    BaseFileUpload,
    BaseEmpUpload,
    BaseOrgUpload,
    BaseMapUpload,
    BaseCalculate,
    BaseEditor,
    BaseExplain,
    OrgAndEmpSelect
  }
}

// flow页面设置控件类型
export const workFlowSetControlMixin = {
  methods: {
    currentSetComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case '1':
            return BaseSetInput
          case '2':
            return TextareaSetInput
          case '3':
            return NumSetInput
          case '4':
            return MoneySetInput
          case '5':
            return BaseSetSelect
          case '6':
            return MultipleSetSelect
          case '7':
            return DateSet
          case '8':
            return RangeDateSet
          case '9':
            return TimeSet
          case '10':
            return MonthSet
          case '11':
            return BaseSetSwitch
          case '12':
            return BaseSetRadio
          case '13':
            return CheckboxSet
          case '14':
            return BaseSetImg
          case '15':
            return BaseSetFile
          case '16':
            return BaseSetCalculate
          case '19':
            return BaseSetEmp
          case '20':
            return BaseSetOrg
          case '21':
            return BaseSetOrgAndEmp
          case '22':
            return BaseSetMap
          case '23':
            return BaseSetEditor
          case '24':
            return BaseSetExplain
        }
      }
    }
  },
  components: {
    BaseSetInput,
    TextareaSetInput,
    NumSetInput,
    MoneySetInput,
    BaseSetSelect,
    MultipleSetSelect,
    DateSet,
    RangeDateSet,
    TimeSet,
    MonthSet,
    BaseSetSwitch,
    BaseSetRadio,
    CheckboxSet,
    BaseSetImg,
    BaseSetFile,
    BaseSetCalculate,
    BaseSetEmp,
    BaseSetOrg,
    BaseSetMap,
    BaseSetEditor,
    BaseSetExplain,
    BaseSetOrgAndEmp
  }
}

// flow页面表单验证控件类型
export const workFlowControlRuleMixin = {
  methods: {
    currentRuleComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case '1':
            return BaseInputRule
          case '2':
            return TextareaInputRule
          case '3':
            return NumInputRule
          case '4':
            return MoneyInputRule
          case '5':
            return BaseSelectRule
          case '6':
            return MultipleSelectRule
          case '7':
            return BaseDateRule
          case '8':
            return RangeDateRule
          case '9':
            return TimeDateRule
          case '10':
            return MonthSelectRule
          case '11':
            return BaseSwitchRule
          case '12':
            return BaseRadioRule
          case '13':
            return BaseCheckboxRule
          case '14':
            // 上传 图片
            return BaseImgUploadRule
          case '15':
            // 上传附件
            return BaseFileUploadRule
          case '16':
            return BaseCalculateRule
          case '19':
            // 发起中  明细表中的  按人员选择 的显示框
            return BaseEmpUploadRule
          case '20':
            // 发起中 明细表中的  按组织选择 的显示框
            return BaseOrgUploadRule
          case '21':
            // 发起中 明细表中的 按岗位选择后的显示input组件
            return BaseOrgAndEmpRule
          case '22':
            // 地图显示器组件
            return BaseMapUploadRule
          case '23':
            // 编辑器显示组件
            return BaseEditorRule
          case '24':
            // 说明框显示组件
            return BaseExplainRule
        }
      }
    }
  },
  components: {
    BaseInputRule,
    TextareaInputRule,
    NumInputRule,
    MoneyInputRule,
    BaseSelectRule,
    MultipleSelectRule,
    BaseDateRule,
    RangeDateRule,
    TimeDateRule,
    MonthSelectRule,
    BaseSwitchRule,
    BaseRadioRule,
    BaseCheckboxRule,
    BaseImgUploadRule,
    BaseFileUploadRule,
    BaseEmpUploadRule,
    BaseOrgUploadRule,
    BaseMapUploadRule,
    BaseCalculateRule,
    BaseEditorRule,
    BaseExplainRule,
    BaseOrgAndEmpRule
  }
}

// 审批流基本函数  貌似页面中 没有用到过
export const flowBaseFn = {
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$router.replace({
        path: '/platform/approvalFlow/flowRule'
      })
    },
    handleCloseReadOnly () {
      if (this.$route.path.indexOf('flowRule') !== -1) {
        this.$router.replace({
          path: '/platform/approvalFlow/flowRule'
        })
      }
      if (this.$route.path.indexOf('tableManage') !== -1) {
        this.$router.replace({
          path: '/platform/approvalFlow/tableManage'
        })
      }
    }
  },
  components: {
    FlowConfigRouter
  }
}

// 审批流流程设计发起人、处理人、审批人、抄送人选择弹窗公用函数
export const dialogFnMixin = {
  data () {
    return {
      formList: [],
      fieldList: [],
      currentSelectObj: 0,
      currentSelectType: '',
      loading: false
    }
  },
  created () {
    this.companyApprovalId = this.$route.query.approvalId
    this.flowId = this.$route.query.flowId
    this.ruleId = this.$route.query.ruleId
    // 获取 表单字段
    // this._formType()
    this._getNodeList()
  },
  // computed: {
  //   ...mapGetters([
  //     'nodeObjStore'
  //   ])
  // },
  methods: {
    // 表单字段
    _formType () {
      // 注： this.nodeObj 为 mixin中flowNodeSet 方法中所获得的，因为minxin中 flowNodeSet 和此dialogFnMixin 方法都被 approval-cmp.vue 同时使用了
      getFieldList(this.ruleId, this.nodeObj.NodeId).then(res => {
        if (res.data.State === REQ_OK) {
          debugger
          this.formList = res.data.Data
        }
      })
    },
    // 节点列表
    _getNodeList () {
      getNodeList(this.ruleId).then(res => {
        if (res.data.State === REQ_OK) {
          this.fieldList = res.data.Data
        }
      })
    }
  },
  beforeDestroy () {
    // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    this.$bus.$off('saveOrg')
    this.$bus.$off('savePos')
    this.$bus.$off('saveEmp')
  }
}

// 审批流页面控件类型
export const flowControlTypeMixin = {
  methods: {
    currentTabComponent (code) {
      if (code) {
        switch (code) {
          case 1:
            return CommonInput
          case 4:
            return CommonSelect
          default:
            return CommonInput
        }
      }
    }
  },
  components: {
    CommonInput,
    CommonSelect
  }
}

// 审批流自动登录
export const flowAutoLogin = {
  data () {
    return {
      loginVisible: false,
      versionId: ''
    }
  },
  computed: {
    ...mapGetters([
      'userCode'
    ])
  },
  created () {
    this._getRoleRange()
    // this._adminLogin()
    // this.getOrder()
  },
  methods: {
    // 审批流验证登录
    _adminLogin () {
      adminLogin(this.userCode).then(res => {
        if (res.data.State === REQ_OK) {

        } else {
          // this.loginVisible = true
        }
      }).catch(() => {
        // this.loginVisible = true
      })
    },
    // 获取版本号
    _getRoleRange () {
      getRoleRange('WorkFlow').then(res => {
        if (res.data.State === REQ_OK) {
          this.versionId = res.data.Data
        }
      })
    },
    getOrder () {

    }
  }
}

// 审批流共同函数（发起、待办、在途、我发起的、我审批的、抄送给我的我关注的）等模块的
export const flowCommonFn = {
  components: {
    SendCmp,     // 提交
    RefuseCmp,   // 拒绝
    CommentCmp,  // 评论
    ShiftCmp,   // 移交
    AskForCmp,   //
    ReturnCmp,  //
    HungUpCmp,
    HuiQianCmp
  },
  data () {
    return {
      dialogVisible: false, // 点击了自定义按钮（提交，拒绝，移交，会签，加签等）后的 弹框显示隐藏
      dialogTitle: '',     // 点击了自定义按钮（提交，拒绝，移交，会签，加签等）后的 弹框显示的 标题
      str: '',
      showRight: false,   // 是否显示 右边区域
      currentForm: {},   // 当前的 表单数据对象
      currentFlow: {},     // 点击的当前 行数据
      rightLoading: false,   // 右边区域的loading
      loading: false,      // table 表格中的 loading状态
      approvalNo: [],    // 审批类型字典表数据集合
      flowSortNo: [],    // 业务类型 字典表数据集合
      versionId: '',        // 版本
      multipleSelection: [],  // 控制多选
      energencyLevelSource: [],  // 紧急程度的集合

      currentEditObj: {}, // 当前编辑的紧急程度的对象
      titleStatus: '', //  标题的紧急状态  0：正常  1： 紧急  2： 加急
      showTitleStatus: false,  // 控制显示修改紧急状态的 dialog 的显示/隐藏      
    }
  },
  computed: {
    ...mapGetters([
      'companyCode',
      'token',
      'userCode'
    ])
  },
  created () {
    // 获取 roleRange
    this._getRoleRange()
    this._getBusinessTypeList()
    this._getFlowList()
    // 获取表格数据
    this._getFlowTable()
  },
  methods: {
    // 动态组件 ( 流程流转中的 待办、在途、我发起的、我审批的、抄送我的、我关注的)页面中的 统一弹框组件
    currentComponent (str) {
      return {
        'send': SendCmp,
        'refuse': RefuseCmp,
        'comment': CommentCmp,
        'shift': ShiftCmp,
        'askFor': AskForCmp,
        'return': ReturnCmp,
        'hungUp': HungUpCmp,
        'huiqian': HuiQianCmp
      }[str] || ''
    },
    // 获取 紧急程度 字典表数据源数据
    _getDicByKey () {
      getDicByKey('WorkFlow', 'WorkFlow', 'CUS', 'EmergencyLevel').then(res => {
        if (res.data.State === REQ_OK) {
          debugger
          this.energencyLevelSource = res.data.Data
        }else {
          this.$message({
            type: 'error',
            message: '紧急程度list集合数据获取失败,请重试'
          })
        }
      })
    },
    // 获取版本号
    _getRoleRange () {
      getRoleRange('WorkFlow').then(res => {
        if (res.data.State === REQ_OK) {
          this.versionId = res.data.Data
        }
      })
    },
    // 业务类型字典表
    _getBusinessTypeList () {
      getBusinessTypeList().then(res => {
        if (res.data.State === REQ_OK) {
          this.flowSortNo = res.data.Data
        }
      })
    },
    // 审批类型字典表
    _getFlowList () {
      getFlowList().then(res => {
        if (res.data.State === REQ_OK) {
          this.approvalNo = res.data.Data
        }
      })
    },
    // 紧急程度
    _EmergencyLevel (state) {
      if (state === 0) {
        return '正常'
      } else if (state === 1) {
        return '紧急'
      } else if (state === 2) {
        return '加急'
      } else {
        return '暂无紧急状态'
      }
    },
    // 紧急程度对应的颜色
    _EmergencyLevelColor (state) {
      if (state === 0) {
        return 'primary'
      } else if (state === 1) {
        return 'warning'
      } else if (state === 2) {
        return 'danger'
      } else {
        return 'info'
      }
    },
    // 修改紧急程度
    editEmergencyLevel (obj) {
      // 调取 紧急程度下拉list 数据
      debugger
      this.titleStatus = ''
      this.currentEditObj = obj.row
      this.showTitleStatus = true
      this._getDicByKey()
    },    
    // 修改紧急程度保存
    _clickEditSureBtn() {
      if (!this.titleStatus){
        this.$message({
          type: 'warning',
          message: '未做任何设置,请设置后保存'
        })
        return 
      }
      saveWorkSet(this.currentEditObj.WorkId, this.titleStatus).then(res => {
        if( res && res.data.State === REQ_OK ){
          this.showTitleStatus = false
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          // 修改成功后，刷新获取最新数据
          this._getFlowTable()
        }else {
          this.$message({
            type: 'error',
            message: '修改失败,请重试'
          })
        }
      })
    },
    // 获取form
    _getForm (flowId, workId, nodeId) {
      this.rightLoading = true
      getForm(flowId, workId, nodeId, this.versionId).then(res => {
        if (res.data.State === REQ_OK) {
          debugger
          this.currentForm = res.data.Data
        } else {
          this.$message({
            type: 'error',
            message: '审批表单获取失败，请重试！'
          })
        }
        this.rightLoading = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '审批表单获取失败，请重试！'
        })
        this.rightLoading = false
      })
    },
    // 删除
    _delete () {
      deleteFlow(this.currentFlow.FK_Flow, this.currentFlow.WorkId).then(res => {
        if (res.data.State === REQ_OK) {
          this.$message.success('删除成功')
          this._getFlowTable()
        } else {
          this.$message.error(`删除失败,${res.data.Error}`)
        }
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 撤销
    _cancelSend () {
      cancelSend(this.currentFlow.FK_Flow, this.currentFlow.WorkId).then(res => {
        if (res.data.State === REQ_OK) {
          this.$message({
            type: 'success',
            message: '撤销成功！'
          })
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: res.data.Error
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '撤销失败，请重试！'
        })
      })
    },
    // 撤回
    _unSend () {
      unSend(this.currentFlow.FK_Flow, this.currentFlow.WorkId, this.currentFlow.FK_Node).then(res => {
        if (res.data.State === REQ_OK) {
          this.$message({
            type: 'success',
            message: '撤回成功！'
          })
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: res.data.Error
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '撤回失败，请重试！'
        })
      })
    },
    // 取消挂起
    _unHungUp () {
      this.loading = true
      unHungUp(this.currentFlow.FK_Flow, this.currentFlow.WorkId, this.currentFlow.FK_Node).then(res => {
        if (res.data.State === REQ_OK) {
          this.$message({
            type: 'success',
            message: '取消挂起成功！'
          })
          this.loading = true
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: '取消挂起失败，请重试！'
          })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'error',
          message: '取消挂起失败，请重试！'
        })
      })
    },
    // 任务池申领
    _applyTask () {
      this.loading = true
      debugger
      applyTask(this.currentFlow.WorkId).then(res => {
        if (res.data.State === REQ_OK) {
          this.$message({
            type: 'success',
            message: '任务申领成功！'
          })
          this.loading = true

          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: '任务申领失败，请重试！'
          })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message({
          type: 'error',
          message: '任务申领失败，请重试！'
        })
      })
    },
    // 关注/取消关注 1关注，0取消关注--ok
    _focus (workId, num) {
      focus(workId, num).then(res => {
        this.loading = true
        if (res.data.State === REQ_OK) {
          this.loading = false
          if (num === 1) {
            this.$message({
              type: 'success',
              message: '关注成功！'
            })
            this._getFlowTable()
          } else if (num === 0) {
            this.$message({
              type: 'success',
              message: '取消关注成功！'
            })
            this._getFlowTable()
          }
        } else {
          this.loading = false
          this.$message({
            type: 'error',
            message: '设置失败，请重试！'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '设置失败，请重试！'
        })
      })
    },
    // 查看
    handleShowDetail ({FK_Flow, WorkId, FK_Node}, index, type) {
      debugger
      this.$store.dispatch("setQuillNum")
      this.currentIndex = index
      if (!this.showRight) {
        // 显示 右边区域的内容
        this.showRight = true
      }
      this._getForm(FK_Flow, WorkId, FK_Node)
      if (type === 'copy') {
        ccRead(FK_Node, WorkId)
      }
    },
    // 取消挂起
    handleCancelHungUp (row) {
      this._unHungUp(row.FK_Flow, row.WorkId, row.Fk_Node)
    },
    // 刷新form
    refreshForm () {
      debugger
      console.log(this.currentFlow)
      //
      this._getForm(this.currentFlow.FK_Flow, this.currentFlow.WorkId, this.currentFlow.FK_Node)
      // 获取 table 数据列表
      this._getFlowTable()
    },
    // 操作成功
    handleSuccess () {
      this.dialogVisible = false
      debugger
      this.refreshForm()
    },
    // 表格多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 导出选中
    _exportFlowSelect () {
      debugger
      let workIds = []
      this.multipleSelection.forEach(item => {
        workIds.push(item.WorkId)
      })
      workIds = JSON.stringify(workIds)
      let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&workIds=${workIds}&userId=${this.userCode}`
      window.open(url)
    },
    // 搜索
    handleSearch (param) {
      debugger
      this.queryObj = Object.assign(this.queryObj, param)
      debugger
      this._getFlowTable()
    },
    // 重置
    handleReset () {
      this.queryObj = Object.assign(this.queryObj, {
        key: '',
        no: '',
        flowSortNo: '',
        starter: '',
        days: '',
        begin: '',
        end: ''})
      this._getFlowTable()
    },
    // 关闭右边fixed
    closeRight () {
      this.showRight = false
    },
    // 下一条
    next () {
      if (this.currentIndex < this.tableArr.length - 1) {
        this.currentIndex++
        this.handleShowDetail(this.tableArr[this.currentIndex], this.currentIndex)
        return
      }
      if (this.currentIndex === this.tableArr.length - 1) {
        this.$message.info('已到当前页最后一条，请翻页')
      }
    },
    // 上一条
    prev () {
      if (this.currentIndex === 0) {
        this.$message.info('已到当前页第一条，请翻页')
        return
      }
      if (this.currentIndex <= this.tableArr.length - 1) {
        this.currentIndex--
        this.handleShowDetail(this.tableArr[this.currentIndex], this.currentIndex)
      }
    },
    // 点击按钮（提交，移交，加签，退回，挂起，拒绝，会签，评论等）
    handleFn (row, method) {
      this.currentFlow = row
      switch (method) {
        case 'Send':
          this.str = 'send'
          this.dialogTitle = '提交'
          this.$store.dispatch('setQuillNum')
          this.dialogVisible = true
          break
        case 'SaveMainValue,SaveDetailValue,SaveWork':
          this._save()
          break
        case 'Shift':
          this.str = 'shift'
          this.dialogTitle = '移交'
          this.dialogVisible = true
          break
        case 'Askfor':
          this.str = 'askFor'
          this.dialogTitle = '加签'
          this.dialogVisible = true
          break
        case 'Focus':
          this._focus(this.currentFlow.WorkId, 1)
          break
        case 'ReturnBack':
          this.str = 'return'
          this.dialogTitle = '退回'
          this.dialogVisible = true
          break
        case 'HungUp':
          this.str = 'hungUp'
          this.dialogTitle = '挂起'
          this.dialogVisible = true
          break
        case 'unHungUp':
          this.$confirm('确认取消挂起吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._unHungUp()
          }).catch(() => {
          })
          break
        case 'applyTask':
          this.$confirm('确认要申领此任务吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            debugger
            this._applyTask()
          }).catch(() => {
          })
          break
        case 'Refuse':
          this.str = 'refuse'
          this.dialogTitle = '拒绝'
          this.dialogVisible = true
          break
        case 'HuiQianInit':
          this.str = 'huiqian'
          this.dialogTitle = '会签 '
          this.dialogVisible = true
          break
        case 'Delete':
          this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._delete()
          }).catch(() => {
          })
          break
        case 'UnSend':
          this.$confirm('确认撤回吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._unSend()
          }).catch(() => {
          })
          break
        case 'CancelSend':
          this.$confirm('确认撤销吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this._cancelSend()
          }).then(() => {

          })
          break
        case 'AddComment':
          this.str = 'comment'
          this.dialogTitle = '评论'
          this.dialogVisible = true
          break
      }
    },
    // 分页--一页展示多少条
    handleSizeChange (val) {
      this.queryObj.pageSize = val
      this._getFlowTable()
    },
    // 分页--上一页，下一页
    handleCurrentChange (val) {
      this.queryObj.pageNum = val
      this._getFlowTable()
    }
  }
}

// 审批流  right-fixed区域中的 （显示流程进度，显示反馈，显示流程图，显示子流程，显示支流状态，显示相关附件，显示相关流程，显示表单变更日志）公用的 方法
export const flowCommonFnRightFixed = {
  data () {
    return {
      containerLoading: false,
      mixinsDataRes: [],  // 调取接口后返回的数据集合
      travelData: [],    // 轨迹数据集合
      currentTraveItemIdx: -1,  // 显示当前鼠标滑过的 进度item的index
      currentTraveObj: {},  // 当前hover 的 进度item 的 对象
      showTraveDialog: false // 显示/隐藏 轨迹图的弹框
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 显示反馈
    _showFeedback () {
      debugger
      this.containerLoading = true
      showFeedback(this.workId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示反馈数据获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示反馈数据获取失败err，请重试'
        })
      })
    },
    // 显示子流程
    _showSubFlow () {
      debugger
      this.containerLoading = true
      showSubFlow(this.workId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示子流程数据获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示子流程数据获取失败err，请重试'
        })
      })
    },
    // 流程进度
    _showSchedule () {
      debugger
      this.containerLoading = true
      showSchedule(this.workId, this.nodeId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示流程进度数据获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示流程进度数据获取失败err，请重试'
        })
      })
    },
    // 鼠标移动上去显示 轨迹btn
    hoverTrackItem(idx,obj){
      debugger
      this.currentTraveItemIdx = idx
      this.currentTraveObj = obj
    },  
    // 显示表单变更日志
    _showFormChangeLog () {
      debugger
      this.containerLoading = true
      showFormChangeLog(this.workId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示表单变更数据获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示表单变更数据获取失败err，请重试'
        })
      })
    },

    // 显示相关流程
    _showInfluentState () {
      debugger
      this.containerLoading = true
      showInfluentState(this.workId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示表单变更数据获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示表单变更数据获取失败err，请重试'
        })
      })
    },
    // 显示相关附件
    _showAttachment () {
      debugger
      this.containerLoading = true
      showAttachment(this.workId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示相关附件获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示相关附件获取失败err，请重试'
        })
      })
    },
    // 显示支流状态
    _showInfluentState () {
      debugger
      this.containerLoading = true
      showInfluentState(this.workId).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: '显示支流状态数据获取失败err，请重试'
          })
        }
      }).catch((err) => {
        this.containerLoading = false
        this.$message({
          type: 'error',
          message: '显示支流状态数据获取失败err，请重试'
        })
      })
    }
  }
}

// 审批流表单控件配置
export const workFlowTableFieldConfigMixin = {
  props: {
    setObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    moduleList: {
      type: Array,
      default: () => {
        return []
      }
    },
    textTypeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    timeBreakList: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataFormatList: {
      type: Array,
      default: () => {
        return []
      }
    },
    currencyList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      dataSourceType: [
        {
          value: '系统字典表',
          code: 'SYS'
        },
        {
          value: '企业字典表',
          code: 'CUS'
        }
      ],
      dataSourceList: []
    }
  },
  created () {
    console.log('mixin', this.setObj)
    this.handleChangeModule()
  },
  methods: {
    // 更改模块类型或数据源类型
    handleChangeModule () {
      getDicCollection(this.setObj.ModuleCode, this.setObj.DSType).then(res => {
        if (res.data.State === REQ_OK) {
          this.dataSourceList = res.data.Data
        }
      })
    }
  },
  watch: {
    setObj: {
      handler (newValue, oldValue) {
        // 每当obj的值改变则发送事件update:obj , 并且把值传过去
        this.$emit('update:setObj', newValue)
      },
      deep: true
    }
  }
}

// 节点设置  （node-attr.vue 、approval-cmp等中有用到）
export const flowNodeSet = {
  props: {
    nodeList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      nodeObj: {},
      flowId: '',
      ruleId: ''
    }
  },
  computed: {
    ...mapGetters([
      'nodeObjStore'
    ])
  },
  created () {
    this.nodeObj = {...this.nodeObjStore}  // 深拷贝
    this.flowId = this.$route.query.flowId
    this.ruleId = this.$route.query.ruleId
    console.log('mixins-flow', this.nodeObj)
  }
}
