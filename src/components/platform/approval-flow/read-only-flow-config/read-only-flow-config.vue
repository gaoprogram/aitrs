<!--
  User: xxxxxxx
  Date: 2018/11/15
  功能：只读流程配置
-->

<template>
  <div class="base-info-router-container">

    <div v-if="routeType() === 'table'">
      <router-link
        :to="{
        path: '/platform/approvalFlow/tableManage/flowConfig/processSet',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId  }
      }">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/tableManage/flowConfig/processSet' ? '' : 'info'">
          流程设置
        </el-tag>
      </router-link>
      <router-link
        :to="{
        path: '/platform/approvalFlow/tableManage/flowConfig/relationTable',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId }
      }">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/tableManage/flowConfig/relationTable' ? '' : 'info'">
          流程表单
        </el-tag>
      </router-link>
      <router-link
        :to="{
        path: '/platform/approvalFlow/tableManage/flowConfig/processDesign',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId  }}">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/tableManage/flowConfig/processDesign' ? '' : 'info'">
          流程设计
        </el-tag>
      </router-link>
      <router-link
        :to="{
        path: '/platform/approvalFlow/tableManage/flowConfig/fieldSet',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId  }}">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/tableManage/flowConfig/fieldSet' ? '' : 'info'">
          节点设置
        </el-tag>
      </router-link>
    </div>

    <!--审批规则的 查看--start-->
    <div v-if="routeType() === 'flow'">
      <router-link
        :to="{
        path: '/platform/approvalFlow/flowRule/flowDetail/processSet',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId, type: 'flow'  }
      }">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowDetail/processSet' ? '' : 'info'">
          流程设置
        </el-tag>
      </router-link>
      <router-link
        :to="{
        path: '/platform/approvalFlow/flowRule/flowDetail/relationTable',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId, type: 'flow' }
      }">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowDetail/relationTable' ? '' : 'info'">
          流程表单
        </el-tag>
      </router-link>
      <router-link
        :to="{
        path: '/platform/approvalFlow/flowRule/flowDetail/processDesign',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId, type: 'flow'  }}">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowDetail/processDesign' ? '' : 'info'">
          流程设计
        </el-tag>
      </router-link>
      <router-link
        :to="{
        path: '/platform/approvalFlow/flowRule/flowDetail/fieldSet',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId, type: 'flow'  }}">
        <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowDetail/fieldSet' ? '' : 'info'">
          节点设置
        </el-tag>
      </router-link>

    </div>
    <!--审批规则的 查看--end-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        currentFlowId: 0,
        currentApprovalId: '',
        currentRuleId: ''
      }
    },
    computed: {
    },
    created () {
      this.currentFlowId = parseInt(this.$route.query.flowId)
      this.currentApprovalId = this.$route.query.approvalId
      this.currentRuleId = this.$route.query.ruleId
    },
    methods: {
      routeType () {
        return this.$route.query.type
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .base-info-router-container
    margin-bottom 10px
</style>
