<!--
  User: xxxxxxx
  Date: 2018/11/15
  功能：审批规则——编辑——进入流程配置 页面
-->

<template>
  <div class="base-info-router-container">

    <div style="margin-bottom: 10px">
      <!-- 一级queryObj.isCanStart：{{queryObj.isCanStart}} -->
      <!---一级下拉--start-->
      <el-select v-model="queryObj.isCanStart" placeholder="请选择" style="width: 150px" @change="handleRunState">
        <el-option
          v-for="item in aloneRunState"
          :key="item.code"
          :label="item.value"
          :value="item.code">
        </el-option>
      </el-select>
      <!---一级下拉--end-->

      <!---二级下拉----start---->
      <!-- 二级：currentFlowId：{{currentFlowId}} -->
      <el-select v-model="currentFlowId" placeholder="请选择" style="width: 200px" @change="handleChangeFlow">
        <el-option
          v-for="item in flowList"
          :key="item.FK_Flow"
          :label="item.Name"
          :value="item.FK_Flow">
        </el-option>
      </el-select>
      <!---二级下拉----end---->

    </div>

    <router-link
      :to="{
        path: '/platform/approvalFlow/flowRule/flowConfig/processSet',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId  }
      }">
      <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowConfig/processSet' ? '' : 'info'">
        流程设置
      </el-tag>
    </router-link>
    <router-link
      :to="{
        path: '/platform/approvalFlow/flowRule/flowConfig/relationTable',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId }
      }">
      <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowConfig/relationTable' ? '' : 'info'">
        流程表单
      </el-tag>
    </router-link>
    <router-link
      :to="{
        path: '/platform/approvalFlow/flowRule/flowConfig/processDesign',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId  }}">
      <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowConfig/processDesign' ? '' : 'info'">
        流程设计
      </el-tag>
    </router-link>
    <router-link
      :to="{
        path: '/platform/approvalFlow/flowRule/flowConfig/fieldSet',
        query: { flowId: currentFlowId, approvalId: currentApprovalId, ruleId: currentRuleId  }}">
      <el-tag :type="this.$route.path === '/platform/approvalFlow/flowRule/flowConfig/fieldSet' ? '' : 'info'">
        节点设置
      </el-tag>
    </router-link>

    <!--路由承载区--start-->
    <el-card>
      <router-view/>
    </el-card>
    <!--路由承载区--end-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getFlowRulelist } from '@/api/approve'

  export default {
    props: {
      isNew: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        versionId: '',
        aloneRunState: [
          {
            value: '全部',
            code: '-1'
          },
          {
            value: '独立运行',
            code: '1'
          },
          {
            value: '非独立运行',
            code: '0'
          }
        ],
        queryObj: {
          Key: '',
          isCanStart: '-1',
          State: '-1',
          pageSize: 65535,
          pageNum: 1
        },
        currentRunState: '-1',
        flowList: [],
        currentFlowId: 0,
        currentApprovalId: '',
        currentRuleId: ''
      }
    },
    computed: {
      routeQuery () {
        return this.$route.query.flowId
      }
    },
    created () {
      this.currentFlowId = parseInt(this.$route.query.flowId)
      this.currentApprovalId = this.$route.query.approvalId
      this.currentRuleId = this.$route.query.ruleId
      this._getFlowRulelist()
    },
    methods: {
      // 获取表单列表
      _getFlowRulelist () {
        this.loadingTableTemplate = true
        getFlowRulelist(this.currentApprovalId, this.queryObj).then(res => {
          this.loadingTableTemplate = false
          if (res.data.State === REQ_OK) {
            this.flowList = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: '请求失败，刷新重试！'
            })
          }
        }).catch(() => {
          this.loadingTableTemplate = false
          this.$message({
            type: 'error',
            message: '请求失败，刷新重试！'
          })
        })
      },
      // 更改状态
      handleRunState () {
        this._getFlowRulelist()
      },
      // 更改流程
      handleChangeFlow () {
        let flow = this.flowList.filter(item => {
          return item.FK_Flow === this.currentFlowId
        })[0]
        this.$router.replace({
          path: this.$route.path,
          query: {
            flowId: flow.FK_Flow,
            approvalId: flow.CompanyApprovalId,
            ruleId: flow.FlowRuleId
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .base-info-router-container
    margin-bottom 10px
</style>
