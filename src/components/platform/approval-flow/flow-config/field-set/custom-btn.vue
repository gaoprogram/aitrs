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
            :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
            :obj="obj"
            :nodeId="nodeObjStore.NodeId"
            :flowId="nodeObjStore.FlowId"
            :currentFields="nodeAttr.Fields"
          ></component>
        </el-form>
      </el-collapse-transition>
    </div>
    <save-footer @save="handleClickSaveNodeAttr()" @cancel="" :isCancel="false"></save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getNodeBtnAttr, saveNodeBtnAttr } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
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
      // 保存节点属性
      handleClickSaveNodeAttr () {
        this.$refs['refForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.loading = true
            saveNodeBtnAttr(this.nodeObj.NodeId, JSON.stringify(this.nodeAttr), this.roleRange).then(res => {
              this.loading = false
              if (res.data.State === REQ_OK) {
                this.$message.success('保存自定义按钮成功！')
                // this._getNodeBtnAttr()
              } else {
                this.$message.error('保存失败，请重试')
              }
            }).catch(() => {
              this.loading = false
              this.$message.error('保存失败，请重试')
            })
          } else {
            this.$message.error('验证失败，请重试')
          }
        })
      },
      // 切换分组显示/隐藏状态
      handleChangeTeamState () {
        this.nodeAttr.IsSpread = !this.nodeAttr.IsSpread
        localStorage.setItem(this.nodeAttr.TeamCode, this.nodeAttr.IsSpread)
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
