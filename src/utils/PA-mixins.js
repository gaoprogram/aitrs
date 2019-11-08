/**
 * Created by Administrator on 2019/9/27.
 * function : mixin
 */

import CommonInput from '@/base/Common-input/Common-input'
import CommonSelect from '@/base/Common-select/Common-select'


// PA控件类型（包含规则验证）--------------------------------------------------------------------------------------------
import BaseInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-input'
import TextareaInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Textarea-input'
import NumInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Num-input'
import MoneyInputRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Money-input'
import BaseSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-select'
import MultipleSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Multiple-select'
import BaseDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-date'
import RangeDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Range-date'
import TimeDateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Time-date'
import MonthSelectRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Month-select'
import BaseSwitchRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-switch'

// PA控件类型 （包括 验证规则组件）
import BaseRadioRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-radio'
import BaseCheckboxRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-checkbox'
import BaseImgUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-img-upload'
import BaseFileUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-file-upload'
import BaseEmpUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-emp-select'
import BaseOrgUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-org-select'
import BaseOrgAndEmpRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-org-and-emp-select'
// import BaseMapUploadRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-map-select'
import BaseCalculateRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-calculate'
import BaseEditorRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-editor'
import BaseExplainRule from '@/base/PA-common-cmp/Table-control-rule-cmp/Base-explain'

// 接口-----------------------------------------------------------------------------------------------------
import { REQ_OK, BASE_URL } from '@/api/config'

import {
  getTotalEmployee,
  getTableList,
  SaveTemplateConfig
} from '@/api/employee'

import { 
  getDicByKey, 
  getRoleRange, 
  getDicCollection
} from '@/api/permission'

// vuex --------------------------------------------------------------------------------------------------
import { mapGetters } from 'vuex'

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



// PA 页面表单控件类型 以及控件规则验证
export const PaControlAndRuleMixin = {
  methods: {
    PAcurrentComponent (controlType) {
      if (controlType) {
        switch (controlType) {
          case '1':
            // 单行文本输入框
            return BaseInputRule
          case '2':
            // 多行文本输入框
            return TextareaInputRule
          case '3':
            // 数字输入框
            return NumInputRule
          case '4':
            // 金额 输入框
            return MoneyInputRule
          case '5':
            // 二级的 单选下拉框
            return BaseSelectRule
          case '6':
            // 多选下拉框 二级的
            return MultipleSelectRule
          case '7':
            // 日期选择器
            return BaseDateRule
          case '8':
            // 有范围的日期选择器
            return RangeDateRule
          case '9':
            // 时间选择器
            return TimeDateRule
          case '10':
            // 月份选择器
            return MonthSelectRule
          case '11':
            // 是否
            return BaseSwitchRule
          case '12':
            // 单选
            return BaseRadioRule
          case '13':
            // 多选
            return BaseCheckboxRule
          case '14':
            // 上传 图片
            return BaseImgUploadRule
          case '15':
            // 上传附件
            return BaseFileUploadRule
          case '16':
            // 计算公式 显示框
            return BaseCalculateRule
          case '19':
            //  按人员选择 的显示框
            return BaseEmpUploadRule
          case '20':
            // 按组织选择 的显示框
            return BaseOrgUploadRule
          case '21':
            // 按岗位选择后的显示input组件
            return BaseOrgAndEmpRule
        //   case '22':
        //     // 地图显示器组件
        //     return BaseMapUploadRule
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
    // BaseMapUploadRule,
    BaseCalculateRule,
    BaseEditorRule,
    BaseExplainRule,
    BaseOrgAndEmpRule
  }
}

// PA 页面 员工管理(在职员工、离职员工、待入职员工) 类目页面 下的mixin
export const PaEmployeeManageMixin = {
    data(){
        return {
          loading: false, 
          totalEmployee: 0,  // 员工人数
          tableList: [], // 员工的table分类
          searchValue: '',  // 搜索框中输入的 搜索条件： 员工号
          showSearchCmp: false,  // 控制搜索组件的显示/隐藏
          showBatchJoinJob: false, // 批量入职弹框 显示/隐藏
          showBatchLeaveJob: false, // 批量离职弹框 显示/隐藏
          showBatchSwitch: false, // 批量转正弹框 显示/隐藏
          showBatchTurn: false, // 批量调转弹框 显示/隐藏
          showBatachDelete: false, // 批量删除弹框 显示/隐藏
          showBatchEditEmp: false, // 批量修改员工弹框 显示/隐藏
          showBatchAddEmp: false, //批量新增员工 弹框 显示/隐藏
          showBatchExportEmp: false, // 批量导出弹框 显示/隐藏
          showBatchSetEmpTemplate: false, // 批量设置员工模板
          showDirectJoinJob: false, // 直接入职 弹框 显示/隐藏
        }
    },
    computed: {
      // ...mapGetters(['currentPageCode'])
    },
    created () {

    },
    beforeDestroy() {

    },
    watch: {
    },
    methods: {
      // 将该页面的pageCode传到 全局中存储
      setCurrentPageCode(str){
        switch(str){
          case 'EmpList':
          this.$store.dispatch('setCurrentPageCode', 'EmpList')
        }
      },
      // 获取员工人数
      getEmployeeNum(pageCode){
        getTotalEmployee(pageCode).then(res => {
          if( res && res.data.State === REQ_OK ){
            this.totalEmployee = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: `获取员工总数失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `获取员工总数失败,${res.data.Error}`
          })
        })
      },
      // 获取员工的分类
      getTableList(pageCode){
        getTableList(pageCode).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.tableList = res.data.Data
            this.currentTableTableData = res.data.Data[0]
          }else {
            this.$message({
              type: 'error',
              message: `获取员工tableList失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: `获取员工tableList出错`              
          })
        })
      },
      //搜索组件传给父级的事件
      emitSearchResult(searchObj){
        debugger
        console.log(searchObj)
        // 关闭搜索框
        this.showSearchCmp = false
      },
      // 点击 搜索btn 查询 table表格中的 员工数据
      clickSearchBtn(){
        debugger
        this.loading = true
        if( this.searchValue){
          // 搜索框中有输入内容则 
          this.$bus.$emit("searchEmpNo", this.searchValue)
        }else {
          this.$bus.$emit("searchEmpNo", this.searchValue)
        }
        // 触发 commonTableInfo中 进行搜查
        this.$refs.commonTableInfoCmp._getPaEmployeeTable()        
      },
      // 搜索框中的 清空
      handlerReset(){
        this.searchValue = ''
      },
      emitGetEmpSuccess(){
        this.loading = false
      },
      
      handleCommandFn(command){
        debugger
        switch( command ){
          // 批量入职
          case 'batchJoinJob':
            this.showBatchJoinJob = true
          break

          // 批量离职
          case 'batchLeaveJob':
            this.showBatchLeaveJob = true
          break

          // 批量转正
          case 'batchSwitch':
            this.showBatchSwitch = true
          break

          //批量调转
          case 'batchTurn':
            this.showBatchTurn = true
          break

          // 批量删除
          case 'batchDelete':
            this.showBatachDelete = true
          break

        }
      },
      hanleBatchFn(command){
        switch(command){
          // 批量新增员工
          case 'batchAddEmp':
            this.showBatchAddEmp = true
          break

          // 批量修改员工
          case 'batchEditEmp':
            this.showBatchEditEmp = true
          break

          // 批量导出员工
          case 'batchExport':
            this.showBatchExportEmp = true 
          break
        }
      },
      // 直接入职
      joinJob() {
        this.showDirectJoinJob = true
      },
    }
}


// PA 页面 员工管理(在职员工、离职员工、待入职员工) 类目 下的 【批量操作】弹框页面 中的mixin
export const PaBatchHandlerMixin = {
  data(){

  },
  computed: {
    ...mapGetters([
      'companyCode',
      'token',
      'userCode'
    ])    
  },
  methods: {
    setCurrentTemplatePageCode(templatePageCode){
      this.$store.dispatch("setCurrentTemplatePageCode", templatePageCode)
    },
    // 下载导入模板
    _downLoadTemplate(){
      debugger
      let url = `${BASE_URL}/API/PAIO?Method=BuildTemlate&TokenId=${this.token['Admin-Token']}&UserId=${this.userCode}&CompanyCode=${this.companyCode}&TemplateCode=${this.downLoadTemplateCode}`
      debugger
      window.open(url)
    },
    // 上传模板
    _upLoadTemplate(){
      debugger

    },
    // 保存批量入职
    _saveBatchJoinJobTemplate(data, templateCode){
      // 处理数据
      SaveTemplateConfig(templateCode, JSON.stringify(data)).then(res => {
        debugger
        if(res && res.data.State === REQ_OK){
          this.$message.success("批量入职模板保存成功")
          // 关闭批量入职弹框
          this.showSetEmpTemplate = false
        }else {
          this.$message.error(`批量入职模板保存失败,${res.data.Error}`)
        }
      }).catch(() => {
        this.$message.warning("批量入职模板保存出错了")
      })
    },    
  }
}




