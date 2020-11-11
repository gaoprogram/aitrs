/**
 * Created by Administrator on 2018/10/16.
 * function : mixin
 */

import CommonInput from '@/base/Common-input/Common-input'
import CommonSelect from '@/base/Common-select/Common-select'
// import SendCmp from '@/components/platform/approval-flow/right-fixed/send-cmp'
import SendCmp from '@/components/platform/approval-flow/right-fixed/agree-cmp'
import AddnextstepacceptersCmp from '@/components/platform/approval-flow/right-fixed/nextStepAccepters-cmp'
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
import BaseProvinces from '@/base/Table-control-cmp/Base-provinces'

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
import BaseSetProvinces from '@/base/Table-set-control-cmp/Base-set-provinces'

// 系统管控中 显示组表——字段设置 控件规则验证-----------------------------------------------------------------
import BaseSetInput_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-input'
import TextareaSetInput_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Textarea-set-input'
import NumSetInput_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Num-set-input'
import MoneySetInput_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Money-set-input'
import BaseSetSelect_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-select'
import MultipleSetSelect_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Multiple-set-select'
import DateSet_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Date-set'
import RangeDateSet_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Range-date-set'
import TimeSet_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Time-set'
import MonthSet_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Month-set'
import BaseSetSwitch_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-switch'
import BaseSetRadio_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-radio'
import CheckboxSet_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Checkbox-set'
import BaseSetImg_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-img'
import BaseSetFile_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-file'
import BaseSetEmp_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-emp-select'
import BaseSetOrg_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-org-select'
import BaseSetOrgAndEmp_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-org-and-emp-select'
import BaseSetMap_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-map'
import BaseSetCalculate_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-calculate'
import BaseSetEditor_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-editor'
import BaseSetExplain_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-explain'
import BaseSetProvinces_manage from '@/base/Manage-common-cmp/Table-set-control-cmp/Base-set-provinces'





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
  deleteFlow,  // 删除
  sendAgain,  // 再次提交
  getForm,
  saveWorkSet, // 保存紧急程度的修改
  saveFlowCustomSet,  // 保存保密级别的修改
  getBusinessTypeList,
  getFlowList,
  getTrackForm, // 查看轨迹图
  unHungUp,    // 取消挂起
  focus,      // 关注
  ccRead,    // 抄送
  applyTask,  // 申领
  showFeedback,   // 显示反馈
  showInfluentState,  // 显示支流状态
  showAttachment,    // 显示相关附件
  showRelatedFlow,  // 显示相关流程
  showFormChangeLog, // 显示表单变更日志
  showSubFlow,      // 显示子流程
  showSchedule,     // 显示流程进度
  deleteRelatedWork,  // 删除关联的流程
  DeleteAttachment   // 表单中删除 图片、附件
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








// flow页面控件类型 （表单设置页面middle部分的组件）
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
          case '27':
            return 'BaseProvinces'
        }
      }
    }
  },
  components: {
    BaseInput,  // 单行文本输入框
    TextareaInput, // 多行文本输入框
    NumInput,   // 数字输入框
    MoneyInput,  // 金额输入框
    BaseSelect,  // 单选下拉框
    MultipleSelect, // 多选下拉框
    BaseDate,  // 时间——年月日
    RangeDate, // 时间区间
    TimeDate,  // 时分
    MonthSelect, // 月份
    BaseSwitch, // switch 选择器
    BaseRadio, // 单选radio
    BaseCheckbox, //多选chekbox
    BaseImgUpload, // 图片
    BaseFileUpload, // 附件
    BaseEmpUpload,  //  人员
    BaseOrgUpload,  // 组织
    BaseMapUpload,  // 地图
    BaseCalculate, // 计算公式
    BaseEditor,  // 富文本编辑器
    BaseExplain,  // 说明
    OrgAndEmpSelect,  // 组织和人员选择
    BaseProvinces  //省市区
  }
}

// flow 表单管理 页面 设置控件类型 (表单设置页面中 右边区域的基础设置组件)
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
          case '27':
            return BaseSetProvinces
        }
      }
    }
  },
  components: {
    BaseSetInput,    // 单行文本输入框
    TextareaSetInput, // 多行文本输入框
    NumSetInput,   // 数字输入框
    MoneySetInput, // 金额输入框
    BaseSetSelect,  // 单选下拉框
    MultipleSetSelect, // 多选下拉框
    DateSet, // 时间——年月日
    RangeDateSet, // 时间区间
    TimeSet,  // 时分
    MonthSet,  // 月份
    BaseSetSwitch,  // switch 选择器
    BaseSetRadio, // 单选radio
    CheckboxSet, //多选chekbox
    BaseSetImg,  // 图片
    BaseSetFile, // 附件
    BaseSetCalculate,  //  人员
    BaseSetEmp,  // 组织
    BaseSetOrg,  // 地图
    BaseSetMap,   // 计算公式
    BaseSetEditor,  // 富文本编辑器
    BaseSetExplain, // 说明
    BaseSetOrgAndEmp  // 组织和人员选择
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
            // 二级的 单选下拉框
            return BaseSelectRule
          case '6':
            // 多选下拉框 二级的
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
            // 发起中 明细表中的 计算公式 显示框
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

// flow审批流基本函数  貌似页面中 没有用到过
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

// flow审批流流程设计发起人、处理人、审批人、抄送人选择弹窗公用函数
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

// flow审批流页面控件类型
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

// flow审批流自动登录
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

// flow审批流共同函数（发起、待办、在途、我发起的、我审批的、抄送给我的我关注的）等模块的
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
      str: '',    // right-fixed  点击的  提交 send，移交shift，加签askfor，退回 return, 挂起 hungup， 拒绝refuse 会签 huiqian 
      pageType: -1,   // 0 表示 待办页面   1表示： 在途、我发起的、我审批的、抄送给我的、我关注的 页面
      ccPk: '',   // 抄送我的 页面中调取 getform时需要增加的参数 来查询 抄送指引信息
      showRight: false,   // 是否显示 右边区域
      currentForm: {},   // 当前right-fixed 中的表单数据对象
      currentFlow: {},     // 点击当前table 行数据
      rightLoading: false,   // 右边区域的loading
      loading: false,      // table 表格中的 loading状态
      approvalNo: [],    // 审批类型字典表数据集合
      flowSortNo: [],    // 业务类型 字典表数据集合
      versionId: '',        // 版本
      multipleSelection: [],  // 控制多选
      energencyLevelSource: [],  // 紧急程度的集合

      currentEditObj: {}, // 当前编辑的紧急程度的对象
      securityTitleStatus: '', //  v-model的值 保密级别： 0：正常 1：秘密 2 机密 3 绝密
      emergencyTitleStatus: '', // v-model的值 紧急状态  0：正常  1： 紧急  2： 加急 ;
      showTitleStatus: false, // 控制显示修改紧急状态的 dialog 的显示/隐藏      
      levelTitle: '', // 紧急程度 或者 保密级别弹窗的标题文字
      currentSendAgainObj: {},  // 再次提交的 行对象信息
      workId_sendAgain: '',  // 再次提交成功后，返回的新的workid，用于再次发起流程
      no_sendAgain: '',   // 再次提交时，获取的当前行对象的 no (FK_flow)
      currentTabStr: '',   // 当前菜单的str： "todo"、"onTheWay"、'myStart'、'myFlow'、 'myApproval'、 'myFollow'
      activeNameStr: '',   // currentTabStr 为todo时 待办页面 中点击 草稿、挂起和 任务池申领类目中的查看，看到的详情不能进行操作
      activeWfState: '',  // currentTabStr 为todo时 待办页面 中点击 全部类目中的 草稿（WFState为1）查看，看到的详情不能进行操作
      nextStepAccepterEmpArr: [], // 下一步操作人的集合
      isNotMust: false   // 下一步操作人是否必选  true 非必选  false 必选
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
        'addNextStepAccepters': AddnextstepacceptersCmp,
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
    _getDicByKey (type) {
      if(type === 'EmergencyLevel') {

      }
      getDicByKey('WorkFlow', 'WorkFlow', 'CUS', type).then(res => {
        if (res.data.State === REQ_OK) {
          debugger
          this.energencyLevelSource = res.data.Data
        }else {
          this.$message({
            type: 'error',
            message: '数据获取失败,请重试'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '数据获取失败,请重试'
        })
      })
    },
    // 获取版本号
    _getRoleRange () {
      debugger
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
    // 保密级别 的样式
    _securityClass(state) {
      switch(state){
        case 0:
          return ""
          break
        case  1:
          return "primary"
          break
        case  2:
          return "warning"
          break
        case 3:
          return "danger"
          break
      } 
    },
    // 保密级别 文字
    _securityLevel(state) {
      switch(state){
        case 0:
          return "正常"
          break
        case  1:
          return "秘密"
          break
        case  2:
          return "机密"
          break
        case 3:
          return "绝密"
          break
      } 
    },    

    // 修改保密级别
    editSecurityClassLevel (obj) {
      // 调取 紧急程度下拉list 数据
      debugger
      this.securityTitleStatus = ''
      this.currentEditObj = obj.row
      this.showTitleStatus = true
      this.levelTitle = "修改保密级别"
      this._getDicByKey('SecurityLevel')
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
      this.emergencyTitleStatus = ''
      this.currentEditObj = obj.row
      this.showTitleStatus = true
      this.levelTitle = "修改紧急程度"
      this._getDicByKey('EmergencyLevel')
    },    
  
    // 修改紧急程度保存
    _clickEditSureBtn(str) {
      debugger
      if(str === '修改紧急程度'){
        // 紧急程度
        if (!this.emergencyTitleStatus){
          this.$message({
            type: 'warning',
            message: '未做任何设置,请设置后保存'
          })
          return 
        }
        saveWorkSet(this.currentEditObj.WorkId, this.emergencyTitleStatus).then(res => {
          if( res && res.data.State === REQ_OK ){
            this.showTitleStatus = false
            this.$message({
              type: 'success',
              message: '紧急程度修改成功'
            })
            // 修改成功后，刷新获取最新数据
            this._getFlowTable()
          }else {
            this.$message({
              type: 'error',
              message: '紧急程度修改失败,请重试'
            })
          }
        })
      }else if(str === '修改保密级别'){
        // 保密级别
        debugger
        if (!this.securityTitleStatus){
          this.$message({
            type: 'warning',
            message: '未做任何设置,请设置后保存'
          })
          return 
        }
        saveWorkSet(this.currentEditObj.WorkId, this.currentEditObj.EmergencyLevel, this.securityTitleStatus).then(res => {
          if( res && res.data.State === REQ_OK ){
            this.showTitleStatus = false
            this.$message({
              type: 'success',
              message: '保密级别修改成功'
            })
            // 修改成功后，刷新获取最新数据
            this._getFlowTable()
          }else {
            this.$message({
              type: 'error',
              message: '保密级别修改失败,请重试'
            })
          }
        })        
      }
    },
    // 获取form
    _getForm (flowId, workId, nodeId, pageType, ccPk ) {
      debugger
      this.rightLoading = true
      getForm(flowId, workId, nodeId, this.versionId, this.pageType, this.ccPk, this.selectNodeId).then(res => {
        if (res.data.State === REQ_OK) {
          debugger
          this.currentForm = res.data.Data
          // store 中存放 此时的form对象集合
          this.$store.dispatch('setFlowCurrentFormObj', res.data.Data)
          // store 中存放 此时的权限
          this.$store.dispatch('setFunctionRole', res.data.Data.FunctionRole)
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
          this.showRight = false
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
          this.showRight = false
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: `撤销失败，${res.data.Error}`
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
          this.showRight = false
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: `撤回失败，${res.data.Error}`
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
          // 关闭右侧right-fixed
          this.showRight = false
          this.loading = true
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: `取消挂起失败，${res.data.Error}`
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
    // 我发起的页面中（审批已拒绝）里面再次提交
    _sendAgain (obj, idx) {
      debugger
      this.loading = true 
      this.no_sendAgain = obj.FK_Flow
      this.currentSendAgainObj = obj
      sendAgain(obj.FK_Flow,obj.WorkId).then((res) => {
        debugger
        if(res && res.data.State === REQ_OK){
          this.workId_sendAgain = res.data.Data
          this.$router.push({
            path: '/platform/approvalFlow/launch',
            query: {
              workId_sendAgain: this.workId_sendAgain,
              no_sendAgain:  this.no_sendAgain,
              securityClass_sendAgain:  this.currentSendAgainObj.SecurityClass
            }
          })
        }else {
          this.$message({
            type: 'error',
            message: `再次提交失败err：${res.data.Error},请重试`
          })
        }
        this.loading = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '再次提交失败err,请重试'
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
          // 关闭 右侧righ-fixed
          this.showRight = false
          // 刷新table列表
          this._getFlowTable()
        } else {
          this.$message({
            type: 'error',
            message: `任务申领失败,${res.data.Error}`
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
    //待办、在途、我发起的、我处理的、抄送我的、我关注的 页面中table表格中点击了  查看 btn
    // 或者 right-fixed 中点击 上一条、下一条 后调用此方法
    handleShowDetail ( currentObj, index, type) {
      debugger
      this.rightLoading = true 
      // 清空 富文本编辑器中的内容
      try {
        // 触发option-cmp 组件中的 flowContent 为空
        this.$bus.$emit('clearFlowEditor')
        // 清空store 中的 editorContentValue
        this.$store.dispatch('setEditorContentValue','')
      } catch (error) {
        
      }
      // typeStr: "todo"、"onTheWay"、'myStart'、'myFlow'、'copyWithMe'、 'myApproval'、 'myFollow'
      let FK_Flow="", WorkId="", FK_Node="", MyPk = ""
      
      if(currentObj.typeStr){
        // 点击的是 查看按钮
        this.currentTabStr = currentObj.typeStr
        if(currentObj.activeNameStr && currentObj.WFState){
          // 待办页面中的 草稿、 挂起 和 任务池申领 以及 全部类目中的草稿（WFState为1）点击查看后，页面中 只能查看不能进行其他操作
          this.activeNameStr = currentObj.activeNameStr
          this.activeWfState = currentObj.WFState
        }else {
          this.activeNameStr = ''
          this.activeWfState = ''
        }
      }
      // 将当前的 typeStr 存入 store——directive中的 flowCurrentTabStr中
      this.$store.dispatch('setFlowCurrentTab', {currentTabstr: this.currentTabStr, currentActiveName: this.activeNameStr, currentWFState: this.activeWfState})

      if( currentObj.currentFlow ){
        // 点击的是
        FK_Flow = currentObj.currentFlow.FK_Flow
        WorkId = currentObj.currentFlow.WorkId
        FK_Node = currentObj.currentFlow.FK_Node
        try {
          MyPk = currentObj.currentFlow.MyPK          
        } catch (error) {
          console.log("myPk 获取失败")
          Promise.reject("myPk 获取失败")
        }
        // 将当前行的数据 赋值给 this.currentObj
        this.currentFlow = currentObj.currentFlow
      }else {
        // 点击的是 上一页、 下一页时 
        FK_Flow = currentObj.FK_Flow
        WorkId = currentObj.WorkId
        FK_Node = currentObj.FK_Node
        MyPk = currentObj.MyPK
        this.currentFlow = currentObj
      }
      
      // 将 this.currentFlowObj 存放在全局vuex  中
      this.$store.dispatch('setCurrentFlowObj', this.currentFlow)
      
      this.$store.dispatch('setQuillNum')

      this.currentIndex = index
      if (!this.showRight) {
        // 显示 右边区域的内容
        this.showRight = true
      }
      // 调用getform 接口获取数据 待办页面中 pageType 为 0， 其他页面为 1 
      if( this.currentTabStr === 'todo'){
        this.pageType = 0
      }else {
        this.pageType = 1
      }

      if( this.currentTabStr === 'copyWithMe' ){
        // 抄送的时候需要传 一个抄送的参数
        debugger
        this.ccPk = this.currentFlow.MyPK
      }

      this._getForm(FK_Flow, WorkId, FK_Node, this.pageType, this.ccPk)
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
      console.log(this.currentForm)
      // 注意： 点击了 “关注” 按钮后 此时 currentFlow 是没有的
      this._getForm(this.currentFlow.FK_Flow, this.currentFlow.WorkId, this.currentFlow.FK_Node, this.pageType )
      // 获取 table 数据列表
      debugger
      this._getFlowTable()
    },
    //
    // 操作成功
    handleSuccess (obj) {
      debugger
      if(!obj){
        // 非 todo 页面table表格中的提交 成功后
        // 关闭弹框
        this.dialogVisible = false
        // 关闭右侧right-fixed
        this.showRight = false
        debugger
        // 刷新table表格数据
        this.refreshForm()
      }else {
        if(obj.state === 1){
          // 直接提交成功
          // 关闭弹框
          this.dialogVisible = false
          // 关闭右侧right-fixed
          this.showRight = false
          debugger
          // 刷新table表格数据
          this.refreshForm()          
        }else if( obj.state === 2 ){
          debugger
          // 状态值为 2 需要选择下一步操作人 必须新增选择了下一步操作人之后才能继续提交
          this.dialogTitle = '选择下一步操作人'
          this.dialogVisible = true
          // 选下一步操作人是必选
          this.isNotMust = false
          this.nextStepAccepterEmpArr = obj.nextStepAccepterEmpArr.Data || []
          this.str = 'addNextStepAccepters'  
        }else if( obj.state === 3 ){
          // 状态值为 3，会弹出下一步操作人，但是选择下一步操作人 不是必选 可以关闭后继续提交
          this.dialogTitle = '选择下一步操作人'
          this.dialogVisible = true
          // 选下一步操作人不是必选
          this.isNotMust = true
          this.nextStepAccepterEmpArr = obj.nextStepAccepterEmpArr.Data || []
          this.str = 'addNextStepAccepters' 
        }
      }
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
    handleReset (queryObj) {
      this.queryObj = Object.assign(this.queryObj, queryObj)
      debugger
      this._getFlowTable()
    },
    // 关闭右边fixed
    closeRight () {
      this.showRight = false
    },
    // 下一条
    next () {
      debugger
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
      debugger
      if (this.currentIndex === 0) {
        this.$message.info('已到当前页第一条，请翻页')
        return
      }
      if (this.currentIndex <= this.tableArr.length - 1) {
        this.currentIndex--
        this.handleShowDetail(this.tableArr[this.currentIndex], this.currentIndex)
      }
    },
    // table表格区点击 提交、拒绝、申领、挂起、取消挂起等
    handleFn (row, method, flag ) {
      debugger
      this.currentFlow = row
      switch (method) {
        case 'Send':
          this.str = 'send'
          this.todoSendFlag = flag || ''
          this.batchAgreeObj.Works = []
          this.batchAgreeObj.Works.push({
            WorkId: row.WorkId,
            FK_Flow: row.FK_Flow,
            FK_Node: row.FK_Node
          })
          this.dialogTitle = '提交'
          this.$store.dispatch('setQuillNum')
          this.dialogVisible = true
          break
        // case 'SaveMainValue,SaveDetailValue,SaveWork':
        //   this._save(method)
        //   break
        // case 'Shift':
        //   this.str = 'shift'
        //   this.dialogTitle = '移交'
        //   this.dialogVisible = true
        //   break
        // case 'Askfor':
        //   this.str = 'askFor'
        //   this.dialogTitle = '加签'
        //   this.dialogVisible = true
        //   break
        // case 'Focus':
        //   this._focus(this.currentFlow.WorkId, 1)
        //   break
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
          this.dialogTitle = '反馈评论'
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

// flow审批流  right-fixed区域中的 （显示流程进度，显示反馈，显示流程图，显示子流程，显示支流状态，显示相关附件，显示相关流程，显示表单变更日志）公用的 方法
export const flowCommonFnRightFixed = {
  data () {
    return {
      rightBoxLoading: false,   //right-fixed 中的loading
      selectNodeId: '', // right-fixed 中节点id
      containerLoading: false,  // 标签页面的loading
      isNotMust: false,  // right-fixed 页面提交时 选择下一步联系人是否必选
      mixinsDataRes: [],  // 调取接口后返回的数据集合
      travelData: [],    // 轨迹数据集合
      currentTraveItemIdx: -1,  // 显示当前鼠标滑过的 进度item的index
      currentTraveObj: {},  // 当前hover 的 进度item 的 对象
      showTraveDialog: false, // 显示/隐藏 轨迹图的弹框 
      queryObj: {   // 显示日志的 分页查询对象
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    }
  },
  created () {

  },
  computed: {
    ...mapGetters([
      'flowCurrentObj',
      'flowCurrentTabStr',
      'userCode'
    ]),
    pageTabType(){
      // 待办页面中 pageTabType 为 0， 其他页面获取getform时值为 1
      if( this.flowCurrentTabStr === 'todo' ){
        return 0
      }else {
        return 1
      }
    },
  },
  mounted () {

  },
  methods: {
    // 获取form
    _getForm (flowId, workId, nodeId, versionId, pageTabType, ccPk, selectNodeId) {
      debugger
      this.rightBoxLoading = true 
      debugger
      getForm(flowId, workId, nodeId, this.versionId, this.pageTabType, this.ccPk, this.selectNodeId).then(res => {
        if (res.data.State === REQ_OK) {
          debugger
          // 触发父级页面的 form 变化
          debugger
          this.$bus.$emit('rightFixedFormChange', res.data.Data)
          // store 中存放 此时的form对象集合
          this.$store.dispatch('setFlowCurrentFormObj', res.data.Data)          
          // store 中存放 此时的权限
          this.$store.dispatch('setFunctionRole', res.data.Data.FunctionRole)
        } else {
          this.$message({
            type: 'warning',
            message: `审批表单获取失败err，${res.Error}！`
          })
        }
        this.rightBoxLoading = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '审批表单获取失败，请重试！'
        })
        this.rightBoxLoading = false
      })
    },    
    // right-fiexd切换节点
    changeNodeId (selectNodeId) {
      debugger
      this.selectNodeId = this.flowCurrentFormObj.Node.NodeId
      // 重新调 getform接口
      this._getForm(this.flowCurrentObj.FK_Flow, this.flowCurrentObj.WorkId, this.flowCurrentObj.FK_Node, this.versionId, this.pageTabType, this.ccPk, this.selectNodeId)
      // 切换节点后 需要重新 调用 评论 和 流程进度的接口 （因为详情中的评论数据、流程进度数据 都是单独的一个组件） 
      this._getComments()
      this._showSchedule()
    },    
    // 分页--一页展示多少条
    handleSizeChange (val) {
      this.queryObj.pageSize = val
      this._showFormChangeLog()
    },
    // 分页--上一页，下一页
    handleCurrentChange (val) {
      this.queryObj.pageNum = val
      this._showFormChangeLog()
    },    
    // 保密级别 的样式
    _securityClass(state) {
      switch(state){
        case 0:
          return ""
          break
        case  1:
          return "primary"
          break
        case  2:
          return "warning"
          break
        case 3:
          return "danger"
          break
      } 
    },
    // 保密级别 文字
    _securityLevel(state) {
      switch(state){
        case 0:
          return "正常"
          break
        case  1:
          return "秘密"
          break
        case  2:
          return "机密"
          break
        case 3:
          return "绝密"
          break
      } 
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
    // 删除表单图片\附件
    _deletePic(opt, obj, mainTableCode) {
      debugger
      if(opt.UserNo != this.userCode ){
        // 非本人上传的
        this.$message({
          type: 'warning',
          message: '只能删除自己上传的文件'
        })
        return 
      }

      this.$confirm("确认要删除此图片吗？","提示",{
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "waining"
      }).then(() => {
        debugger
        console.log(mainTableCode)
        let nodeId_jiedian = this.form.Node.NodeId
        if(opt && opt.AttachmentId ){
          DeleteAttachment(opt.AttachmentId, this.flowCurrentObj.WorkId, nodeId_jiedian, obj.FieldCode, mainTableCode).then(res => {
            debugger
            if (res.data.State === REQ_OK) {
              this.$message({
                type: 'success',
                message: `【${opt.Name}】已删除成功!`
              })
              
              debugger
              // 处理 obj.FieldValue中的数据
              obj.FieldValue = obj.FieldValue.filter((item) => {
                return item.AttachmentId !== opt.AttachmentId
              })
              // 处理 obj.DisplayValue 中的数据
              obj.DispalyValue = obj.DispalyValue.filter((item) => {
                return item.AttachmentId !== opt.AttachmentId
              })
    
              console.log("删除成功后打印 this.fileList", this.fileList)
            } else {
              this.$message({
                type: 'error',
                message: `删除失败err,${res.data.Error}!`
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }) 
        } else {

        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除已取消!'
        })
      })
    }, 
    // 删除 相关附件  
    _deleteAppendix(item) {
      debugger

      if( item.UserNo != this.userCode){
        this.$message({
          type: 'warning',
          message: '只能删除自己上传的附件'
        })
        return
      }
      this.$confirm("确定要删除此附件吗?","提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.containerLoading = true   
        // WorkId 为数字，有的会非常大 超出了 js 的数字范围 所以将其转化为 字符串类型
        let WorkId = item.WorkId || "" 
        WorkId = WorkId.toString()
        console.log(typeof WorkId)           
        DeleteAttachment(item.AttachmentId, WorkId, item.NodeId, item.FieldCode, item.TableCode).then((res) => {
          debugger    
          this.containerLoading = false   
          if (res.data.State === REQ_OK) {
            // let arr = (list, item) => {
            //   let newArr = arr.filter((i) => {
            //     return i.AttachmentId !== item.AttachmentId
            //   })
            //   return newArr
            // }
            debugger
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功后 刷新列表
            this._showAttachment()
          } else {
            this.$message({
              type: 'error',
              message: `删除失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        // 取消
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },     
    // 显示反馈
    _showFeedback () {
      debugger
      this.containerLoading = true
      showFeedback(this.flowCurrentObj.WorkId).then((res) => {
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
      showSubFlow(this.flowCurrentObj.WorkId).then((res) => {
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
      showSchedule(this.flowCurrentObj.WorkId, this.flowCurrentObj.FK_Node).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
        } else {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: `显示流程进度数据获取失败,${res.data.Error}`
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
    // 显示表单变更日志
    _showFormChangeLog (tableCode) {
      debugger
      this.containerLoading = true
      let code = tableCode ? tableCode : this.obj.TableCode
      let nodeId_jiedian = this.form.Node.NodeId
      showFormChangeLog(this.flowCurrentObj.WorkId, nodeId_jiedian, code, this.queryObj.pageSize, this.queryObj.pageNum).then((res) => {
        debugger
        this.containerLoading = false
        if (res && res.data.State === REQ_OK) {
          this.mixinsDataRes = res.data.Data
          this.queryObj.total = res.data.Total
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
    _showRelatedFlow () {
      debugger
      this.containerLoading = true
      showRelatedFlow(this.flowCurrentObj.WorkId).then((res) => {
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
          message: '显示相关流程数据获取失败err，请重试'
        })
      })
    },
    // 显示相关附件
    _showAttachment () {
      debugger
      this.containerLoading = true
      showAttachment(this.flowCurrentObj.WorkId).then((res) => {
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
      console.log(this.flowCurrentObj)
      showInfluentState(this.flowCurrentObj.WorkId).then((res) => {
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
    },
    // 鼠标移动上去显示 轨迹btn
    hoverTrackItem(idx,obj){
      debugger
      this.currentTraveItemIdx = idx
      this.currentTraveObj = obj
    },
    // 删除关联的流程
    deleteRelatedWork(obj) {
      debugger
      if( obj.UserNo !== this.userCode ){
        this.$message({
          type: 'warning',
          message: '只能删除自己关联的流程'
        })
        return
      }  

      // console.log(obj)
      this.$confirm('确认要删除此关联流程吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.containerLoading = true
        deleteRelatedWork(this.flowCurrentObj.WorkId, obj.WorkId).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message({
              type: 'success',
              message: '此关联流程删除成功'
            })
            // 触发 刷新
            this._showRelatedFlow()
          }else {
            this.$message({
              type: 'error',
              message: `此关联流程删除失败,${res.data.Error}`
            })
          }
          this.containerLoading = false
        }).catch((err) => {
          this.containerLoading = false
          this.$message({
            type: 'error',
            message: `此关联流程删除失败`
          })        
        })
      }).catch(()=>{

      })
    } 
  }
}

// flow审批流表单控件配置
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

// flow节点设置  （node-attr.vue 、approval-cmp等中有用到）
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


// 系统管控 显示组表——字段设置中的 编辑字段
export const sysManageFieldSetControlMixin = {
  methods: {
    currentSetComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case '1':
            return BaseSetInput_manage
          case '2':
            return TextareaSetInput_manage
          case '3':
            return NumSetInput_manage
          case '4':
            return MoneySetInput_manage
          case '5':
            return BaseSetSelect_manage
          case '6':
            return MultipleSetSelect_manage
          case '7':
            return DateSet_manage
          case '8':
            return RangeDateSet_manage
          case '9':
            return TimeSet_manage
          case '10':
            return MonthSet_manage
          case '11':
            return BaseSetSwitch_manage
          case '12':
            return BaseSetRadio_manage
          case '13':
            return CheckboxSet_manage
          case '14':
            return BaseSetImg_manage
          case '15':
            return BaseSetFile_manage
          case '16':
            return BaseSetCalculate_manage
          case '19':
            return BaseSetEmp_manage
          case '20':
            return BaseSetOrg_manage
          case '21':
            return BaseSetOrgAndEmp_manage
          case '22':
            return BaseSetMap_manage
          case '23':
            return BaseSetEditor_manage
          case '24':
            return BaseSetExplain_manage
          case '27':
            return BaseSetProvinces_manage
        }
      }
    }
  },
  components: {
    BaseSetInput_manage,    // 单行文本输入框
    TextareaSetInput_manage, // 多行文本输入框
    NumSetInput_manage,   // 数字输入框
    MoneySetInput_manage, // 金额输入框
    BaseSetSelect_manage,  // 单选下拉框
    MultipleSetSelect_manage, // 多选下拉框
    DateSet_manage, // 时间——年月日
    RangeDateSet_manage, // 时间区间
    TimeSet_manage,  // 时分
    MonthSet_manage,  // 月份
    BaseSetSwitch_manage,  // switch 选择器
    BaseSetRadio_manage, // 单选radio
    CheckboxSet_manage, //多选chekbox
    BaseSetImg_manage,  // 图片
    BaseSetFile_manage, // 附件
    BaseSetCalculate_manage,  //  人员
    BaseSetEmp_manage,  // 组织
    BaseSetOrg_manage,  // 地图
    BaseSetMap_manage,   // 计算公式
    BaseSetEditor_manage,  // 富文本编辑器
    BaseSetExplain_manage, // 说明
    BaseSetOrgAndEmp_manage,  // 组织和人员选择
    BaseSetProvinces_manage  // 省市区
  }
}