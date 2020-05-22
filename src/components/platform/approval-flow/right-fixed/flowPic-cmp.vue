<!--
  User: gaol
  Date: 2019/6/17
  功能：显示流程图
-->
<template>
  <div class="flowPic-container" v-loading="containerLoading">
    流程图的页面
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getForm
  } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import ElCard from 'element-ui/packages/card/src/main'
  import { flowCommonFnRightFixed } from '@/utils/mixin'


  export default {
    mixins: [flowCommonFnRightFixed],
    components: {ElCard},
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
        type: [String, Number],
        default: ''
      }         
    },
    data () {
      return {
       
      }
    },
    created () {
      
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
  .flowPic-container 
    min-height 350px
</style>
