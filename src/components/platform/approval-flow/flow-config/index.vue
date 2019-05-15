<!--
  User: gaol
  Date: 2019/5/14
  功能：新增、编辑 、查看 流程—— 流程配置页面
-->

<template>
  <transition name="el-zoom-in-center">
    <el-dialog
      title="流程配置"
      :visible="true"
      fullscreen
      :before-close="handleClose"
      :close-on-press-escape="false"
    >
      <div class="flow-config-container">
        <!--调用-flow-config-router组件-->
        <flow-config-router :isNew="isNew"></flow-config-router>

        <el-card>
          <router-view />
        </el-card>
        
      </div>
    </el-dialog>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { flowBaseFn } from '@/utils/mixin'
  import FlowConfigRouter from '../flow-config-router/flow-config-router'
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
