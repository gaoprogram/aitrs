<!--
  User: gaol
  Date: 2019/6/17
  功能：right-fixed 中 点击  非详情 tab(显示流程进度，显示反馈，显示流程图，显示子流程，显示支流状态，显示相关附件，显示相关流程，显示表单变更日志)后内容区显示  的组件
-->

<template>
  <el-card class="containerCardBox">
    <!-- 这是 非详情区域内容显示 -->
    <!-- obj:{{obj}} -->
    <!-- +++
    workId：{{workId}}
    +++
    nodeId: {{nodeId}}
    +++++
    attachmentRole:　{{attachmentRole}} -->
    <!-- rightContentCurrentStr: {{rightContentCurrentStr}} -->
    <div>
      <!---显示流程进度----start--->
      <div v-if="rightContentCurrentStr==='ShowSchedule'">
        <!-- $attrs： {{$attrs}} -->
        <process-progress-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </process-progress-cmp>
      </div>
      <!---显示流程进度----end--->

      <!--显示反馈----start-->
      <div v-if="rightContentCurrentStr==='ShowFeedback'">
        <!-- $attrs： {{$attrs}} -->
        <feedback-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </feedback-cmp>
      </div>     
      <!--显示反馈----end-->

      <!--显示流程图----start-->
      <div v-if="rightContentCurrentStr==='ShowFlowChart'">
        <!-- $attrs： {{$attrs}} -->
        <flow-pic-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </flow-pic-cmp>
      </div>     
      <!--显示流程图----end-->      

      <!--显示子流程----start-->
      <div v-if="rightContentCurrentStr==='ShowSubFlow'">
        <!-- $attrs： {{$attrs}} -->
        <child-flow-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </child-flow-cmp>
      </div>     
      <!--显示子流程----end-->       

      <!--显示支流状态----start-->
      <div v-if="rightContentCurrentStr==='ShowInfluentState'">
        <!-- $attrs： {{$attrs}} -->
        <branch-status-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </branch-status-cmp>
      </div>     
      <!--显示支流状态----end-->        


      <!--显示相关附件----start-->
      <div v-if="rightContentCurrentStr==='ShowAttachment'">
        <!-- $attrs： {{$attrs}} -->
        <appendix-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </appendix-cmp>
      </div>     
      <!--显示相关附件----end-->        

      <!--显示相关流程----start-->
      <div v-if="rightContentCurrentStr==='ShowRelatedFlow'">
        <!-- $attrs： {{$attrs}} -->
        <related-process-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </related-process-cmp>
      </div>     
      <!--显示相关流程----end-->         

      <!--显示表单变更日志----start-->
      <div v-if="rightContentCurrentStr==='ShowFormChangeLog'">
        <!-- $attrs： {{$attrs}} -->
        <field-change-log-cmp v-bind="$attrs" v-on="$listeners" :rightContentCurrentStr="rightContentCurrentStr">
        </field-change-log-cmp>
      </div>     
      <!--显示表单变更日志----end-->            
    </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
  import ProcessProgressCmp from './processProgress-cmp'
  import FeedbackCmp from './feedback-cmp'
  import FlowPicCmp from './flowPic-cmp'
  import ChildFlowCmp from './childFlow-cmp'
  import BranchStatusCmp from './branchStatus-cmp'
  import AppendixCmp from './appendix-cmp'
  import RelatedProcessCmp from './relatedProcess-cmp'
  import FieldChangeLogCmp from './fieldChangeLog-cmp'
  export default {
    components: {
      ProcessProgressCmp,
      FeedbackCmp,
      FlowPicCmp,
      ChildFlowCmp,
      BranchStatusCmp,
      AppendixCmp,
      RelatedProcessCmp,
      FieldChangeLogCmp
    },
    inheritAttrs: false,
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      }
      // obj: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // },
      // workId: {
      //   type: String,
      //   default: ''
      // },
      // nodeId: {
      //   type: String,
      //   default: ''
      // },
      // attachmentRole: {
      //   type: String,
      //   default: ''
      // }

    },
    data () {
      return {

      }
    },
    created () {
 
    },
    methods: {
    
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      changeOrgDetailCmp (prop) {
        this.$refs[`detailForm${this.currentDetailTableCode}`].validateField(prop)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:detailTableList , 并且把值传过去
          console.log('obj', newValue, oldValue)
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .detail-table-dialog /deep/
    .border-card
      .el-scrollbar__wrap
        margin-bottom: 0!important
        .el-form-item
          margin-bottom: 0!important


  table {
    border: 1px solid #dfe4ed;
  }

  table tr th {
    padding 10px 0
    border: 1px solid #dfe4ed;
    border-top 2px solid #3b8be3
  }

  table tr td {
    min-width 300px
    padding 20px
    border: 1px solid #dfe4ed;
  }

  table {
    border-collapse: collapse
  }

</style>
