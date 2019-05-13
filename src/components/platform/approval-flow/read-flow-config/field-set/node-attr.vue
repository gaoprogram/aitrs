<!--
  User: xxxxxxx
  Date: 2019/1/2
  功能：节点属性
-->

<template>
  <div class="node-attr-container" v-loading="loading">
    <el-select
      v-model="nodeObj.NodeId"
      placeholder="切换节点"
      size="small"
      @change="_getNodeAttr()"
      style="margin-bottom: 10px"
    >
      <el-option
        v-for="item in nodeList"
        :key="item.NodeId"
        :label="item.Name"
        :value="item.NodeId">
      </el-option>
    </el-select>
    <div class="teams">
      <el-tag size="small" @click.native="nodeAttr.IsSpread = !nodeAttr.IsSpread">{{nodeAttr.TeamName}}</el-tag>
      <el-collapse-transition>
        <el-form :model="nodeAttr" ref="refForm" label-width="150px" class="detail-form" v-show="nodeAttr.IsSpread">
          <component
            v-for="(obj, index) in nodeAttr.Fields"
            :key="obj.FieldCode"
            :is="currentRuleComponent(obj.ControlType)"
            :prop="'Fields.' + index + '.FieldValue'"
            :obj="obj"
            :nodeId="nodeObjStore.NodeId"
          ></component>
        </el-form>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getNodeAttr, saveNodeAttr } from '@/api/approve'
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
    },
    mounted () {
      this._getNodeAttr()
    },
    methods: {
      _getNodeAttr () {
        getNodeAttr(this.nodeObj.NodeId, this.roleRange).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.nodeAttr = res.data.Data
          } else {
            this.$message.error('获取节点属性失败，请重试')
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('获取节点属性失败，请重试')
        })
      },
      // 保存节点属性
      handleClickSaveNodeAttr () {
        this.$refs.refForm.validate((valid) => {
          if (valid) {
            this.loading = true
            saveNodeAttr(this.nodeObj.NodeId, JSON.stringify(this.nodeAttr), this.roleRange).then(res => {
              this.loading = false
              if (res.data.State === REQ_OK) {
                this.$message.success('保存节点属性成功！')
                this._getNodeAttr()
              } else {
                this.$message.error('保存失败，请重试')
              }
            }).catch(() => {
              this.loading = false
              this.$message.error('保存失败，请重试')
            })
          } else {
            return false
          }
        })
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
