<!--
  User: xxxxxxx
  Date: 2019/6/28
  功能：导出主表word
-->

<template>
  <div class="word-container">
    <!-- form: {{form}} -->
    <!--<div>导出word表单</div>-->
    <el-card class="main-container" v-for="mainForm in form.MainTableInfos" :key="mainForm.TableCode">
      <div class="main-title">{{mainForm.TableName}}：</div>
      <div class="main-content">
        <p v-for="field in mainForm.Fields" :key="field.FieldCode">{{field.FieldName}}：{{field.DisplayValue}}</p>
      </div>
      <div class="detail-container" v-for="detailForm in mainForm.DetailTableInfos" :key="detailForm.DetailTableCode">
        <div class="main-title">{{detailForm.TableName}}</div>
        <div class="main-content">
          <p v-for="field in detailForm.Fields" :key="field.FieldCode">{{field.FieldName}}：{{field.DisplayValue}}</p>
        </div>
      </div>
    </el-card>
    <div class="print-btn-container">
      <!--<el-button type="primary" @click.native="handlePrint" size="small">打印</el-button>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import ElCard from 'element-ui/packages/card/src/main'

  export default {
    components: {ElCard},
    data () {
      return {
        currentForm: {}
      }
    },
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    created () {
      // this._getRoleRange()
    },
    mounted () {
    },
    methods: {
      // 获取版本号
      // _getRoleRange () {
      //   getRoleRange('WorkFlow').then(res => {
      //     if (res.data.State === REQ_OK) {
      //       this._getForm(this.$route.query.no, this.$route.query.workId, this.$route.query.nodeId, res.data.Data)
      //     }
      //   })
      // },
      // 获取form
      _getForm (flowId, workId, nodeId) {
        // this.rightLoading = true
        // getForm(flowId, workId, nodeId, this.versionId).then(res => {
        //   if (res.data.State === REQ_OK) {
        //     this.currentForm = res.data.Data
        //     // setTimeout(() => {
        //     //   // 自动打印
        //     //   window.print()
        //     // }, 1000)
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: '审批表单获取失败，请重试！'
        //     })
        //   }
        //   // this.rightLoading = false
        // }).catch(() => {
        //   this.$message({
        //     type: 'error',
        //     message: '审批表单获取失败，请重试！'
        //   })
        //   // this.rightLoading = false
        // })
      },
      // 手动打印，暂时不用
      handlePrint () {
        // window.print()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .word-container
    .main-container
      width 800px
      min-height 500px
      margin 20px
      .main-title
        margin-bottom 10px
        font-weight 700
      .main-content
        padding-left 20px
        font-size 14px
        p
          margin-bottom 10px
    .print-btn-container
      width 800px
      margin 20px
      text-align center
</style>
