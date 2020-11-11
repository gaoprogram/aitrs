<!--
  User: gaol
  Date: 2019/5/14
  功能：审批规则————新增、编辑 流程时—— 流程配置页面 ，特别注意！！！！与 表单的查看（@/components/platform/approval-flow/read-flow-config/process-set/process-set） 时 没有共用同一个页面
-->

<template>
  <transition name="el-zoom-in-center">
    <el-dialog
      title="流程配置"
      :visible="true"
      fullscreen
      :before-close="handleClose"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <div class="flow-config-container">
        <!--调用-flow-config-router组件-->
        <flow-config-router :isNew="isNew"></flow-config-router>

        <!---子路由承载区，将此部分的路由承载区放入到了 上面的flow-config-router组件中了，效果是一样的--->
        <!-- <el-card> 
          <router-view /> 
        </el-card>  -->
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
