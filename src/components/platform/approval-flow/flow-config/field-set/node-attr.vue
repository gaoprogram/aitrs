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
    <template v-for="nodeAttr in nodeAttrList">
      <div class="teams">
        <el-tag size="small" @click.native="handleChangeTeamState(nodeAttr)">{{nodeAttr.TeamName}}</el-tag>
        <el-collapse-transition>
          <el-form :model="nodeAttr" :ref="`team${nodeAttr.TeamCode}`" label-width="150px" class="detail-form" v-show="nodeAttr.IsSpread">
            <component
              v-for="(obj, index) in nodeAttr.Fields"
              :key="obj.FieldCode"
              :is="currentRuleComponent(obj.ControlType)"
              :prop="'Fields.' + index + '.FieldValue'"
              :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
              :obj="obj"
              :nodeId="nodeObjStore.NodeId"
            ></component>
          </el-form>
        </el-collapse-transition>
      </div>
    </template>
    <save-footer @save="handleClickSaveNodeAttr" @cancel="" :isCancel="false"></save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getNodeAttr, saveNodeAttr } from '@/api/approve'
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
        nodeAttrList: [],
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
        debugger
        getNodeAttr(this.nodeObj.NodeId, this.roleRange).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.nodeAttrList = res.data.Data
            if (res.data.Data.length) {
              this.nodeAttrList.forEach(item => {
                if (localStorage.getItem(item.TeamCode) !== null) {
                  item.IsSpread = localStorage.getItem(item.TeamCode) === 'true'
                }
              })
            }
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
        let result = []
        if (this.nodeAttrList && this.nodeAttrList.length) {
          this.nodeAttrList.forEach(item => {
            result.push(this.checkFormArray(`team${item.TeamCode}`))
          })
        }
        Promise.all(result).then(() => {
          this.loading = true
          saveNodeAttr(this.nodeObj.NodeId, JSON.stringify(this.nodeAttrList), this.roleRange).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              this.$message.success('保存节点属性成功！')
              // this._getNodeAttr()
            } else {
              this.$message.error('保存失败，请重试')
            }
          }).catch(() => {
            this.loading = false
            this.$message.error('保存失败，请重试')
          })
        }, () => {
          this.$message.error('表单验证失败，请检查')
        })
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve(true)
            } else {
              reject(new Error('验证失败'))
            }
          })
        })
      },
      // 切换分组显示/隐藏状态
      handleChangeTeamState (team) {
        team.IsSpread = !team.IsSpread
        localStorage.setItem(team.TeamCode, team.IsSpread)
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
