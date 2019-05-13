<!--
  User: xxxxxxx
  Date: 2019/1/2
  功能：自定义按钮
-->

<template>
  <div class="node-attr-container" v-loading="loading">
    <div class="teams">
      <div>
        <el-select
          v-model="nodeObj.NodeId"
          placeholder="切换节点"
          size="small"
          @change="_getNodeBtnAttr()"
          style="margin-bottom: 10px"
        >
          <el-option
            v-for="item in nodeList"
            :key="item.NodeId"
            :label="item.Name"
            :value="item.NodeId">
          </el-option>
        </el-select>
      </div>
      <el-tag size="small" @click.native="handleChangeTeamState()">{{nodeAttr.TeamName}}</el-tag>
      <el-collapse-transition>
        <el-form :model="nodeAttr" ref="refForm" label-width="150px" class="detail-form" v-show="nodeAttr.IsSpread">
          <component
            v-for="(obj, index) in nodeAttr.Fields"
            :key="obj.FieldCode"
            :is="currentRuleComponent(obj.ControlType)"
            :prop="'Fields.' + index + '.FieldValue'"
            :obj="obj"
            :nodeId="nodeObjStore.NodeId"
            :flowId="nodeObjStore.FlowId"
            :currentFields="nodeAttr.Fields"
          ></component>
        </el-form>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getNodeBtnAttr } from '@/api/approve'
  import { workFlowControlRuleMixin, flowNodeSet } from '@/utils/mixin'
  export default {
    mixins: [workFlowControlRuleMixin, flowNodeSet],
    props: {
      roleRange: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        nodeAttr: {},
        loading: true
      }
    },
    created () {
      this._getNodeBtnAttr()
    },
    methods: {
      _getNodeBtnAttr () {
        getNodeBtnAttr(this.nodeObj.NodeId, this.roleRange).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.nodeAttr = res.data.Data
            if (localStorage.getItem(this.nodeAttr.TeamCode) !== null) {
              this.nodeAttr.IsSpread = localStorage.getItem(this.nodeAttr.TeamCode) === 'true'
            }
          } else {
            this.$message.error('获取自定义按钮失败，请重试')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('获取自定义按钮失败，请重试')
        })
      },
      // 切换分组显示/隐藏状态
      handleChangeTeamState () {
        this.nodeAttr.IsSpread = !this.nodeAttr.IsSpread
        localStorage.setItem(this.nodeAttr.TeamCode, this.nodeAttr.IsSpread)
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
