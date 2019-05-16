<!--
  User: gaolong
  Date: 2019/5/16
  功能： 流程审批——查看流程的页面，特别注意！！！！！ 与 新增 和 编辑流程（@/components/platform/approval-flow/flow-config/process-set/process-set）时 没有共用，
-->

<template>
  <transition name="el-zoom-in-center">
    <el-dialog
      title="流程配置"
      :visible="true"
      fullscreen
      :before-close="handleCloseReadOnly"
      :close-on-press-escape="false"
    >
      <div class="flow-config-container">
        <flow-config-router></flow-config-router>
        <el-card>
          <router-view />
        </el-card>
      </div>
    </el-dialog>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { flowBaseFn } from '@/utils/mixin'
  import FlowConfigRouter from '../read-only-flow-config/read-only-flow-config'
  export default {
    mixins: [flowBaseFn],
    computed: {
      isNew () {
        return this.companyApprovalId === ''
      }
    },
    components: {
      FlowConfigRouter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .flow-config-container
    width 1000px
    margin auto
</style>
