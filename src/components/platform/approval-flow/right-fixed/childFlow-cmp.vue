<!--
  User: gaol
  Date: 2019/6/17
  功能：显示子流程
-->
<template>
  <div :class="['childFlow-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    这是 显示 子流程的页面
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import { flowCommonFnRightFixed } from '@/utils/mixin'

  export default {
    mixins: [flowCommonFnRightFixed],
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      },
      nodeId: {
        type: [String,Number],
        default: ''
      }          
    },
    data () {
      return {
       
      }
    },
    created () {
      // 获取子流程
      this._showSubFlow()
    },
    mounted () {
    },
    methods: {
      // 获取版本号
      _getRoleRange () {
        getRoleRange('WorkFlow').then(res => {
          if (res.data.State === REQ_OK) {
            this._getForm(this.$route.query.no, this.$route.query.workId, this.$route.query.nodeId, res.data.Data)
          }
        })
      },
      // 获取form
      _getForm (flowId, workId, nodeId) {
        this.rightLoading = true
        getForm(flowId, workId, nodeId, this.versionId).then(res => {
          if (res.data.State === REQ_OK) {
            this.currentForm = res.data.Data
            setTimeout(() => {
              // 自动打印
              window.print()
            }, 1000)
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .childFlow-container
    min-height 350px
</style>
