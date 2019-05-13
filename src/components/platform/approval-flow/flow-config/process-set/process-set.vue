<!--
  User: xxxxxxx
  Date: 2018/12/28
  功能：xxxxxx
-->

<template>
  <div class="process-set-container" v-loading="loading">
    <template v-for="team in flowList">
      <div class="teams">
        <el-tag size="mini" @click.native="handleChangeTeamState(team)">{{team.TeamName}}</el-tag>
        <el-form :model="team" :ref="`team${team.TeamCode}`" label-width="200px"
                 class="launch_form"
                 v-show="team.IsSpread"
        >
          <component
            v-for="(obj, index) in team.Fields"
            :key="obj.FieldCode"
            :is="currentRuleComponent(obj.ControlType)"
            :prop="'Fields.' + index + '.FieldValue'"
            :obj="obj"
          ></component>
        </el-form>
      </div>
    </template>
    <save-footer @save="handleSaveProcessSet" :isCancel="true" cancelText="关闭" @cancel="handleClose"></save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getFlowSet, saveFlowSet } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import { workFlowControlRuleMixin, flowBaseFn } from '@/utils/mixin'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  export default {
    mixins: [workFlowControlRuleMixin, flowBaseFn],
    data () {
      return {
        tabPosition: '基本信息',
        flowList: [],
        loading: true
      }
    },
    created () {
      this._getRoleRange()
    },
    methods: {
      // 获取版本号
      _getRoleRange () {
        getRoleRange('WorkFlow').then(res => {
          if (res.data.State === REQ_OK) {
            this.roleRange = res.data.Data
            this._getFlowSet(this.roleRange)
          }
        })
      },
      // 获取流程设置
      _getFlowSet (roleRange) {
        getFlowSet(this.$route.query.flowId, roleRange).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.flowList = res.data.Data
            if (res.data.Data.length) {
              this.flowList.forEach(item => {
                if (localStorage.getItem(item.TeamCode) !== null) {
                  item.IsSpread = localStorage.getItem(item.TeamCode) === 'true'
                }
              })
            }
          } else {
            this.$message.error('流程设置获取失败')
          }
        }).catch(() => {
          this.$message.error('流程设置获取失败')
        })
      },
      // 保存
      handleSaveProcessSet () {
        let result = []
        if (this.flowList && this.flowList.length) {
          this.flowList.forEach(item => {
            result.push(this.checkFormArray(`team${item.TeamCode}`))
          })
          Promise.all(result).then(() => {
            saveFlowSet(this.$route.query.flowId, this.roleRange, JSON.stringify(this.flowList)).then(res => {
              if (res.data.State === REQ_OK) {
                this._getFlowSet(this.roleRange)
                this.$message.success('保存成功')
                this.$bus.$emit('flowRuleRefresh')
              } else {
                this.$message.error('保存失败，' + res.data.Error)
              }
            }).catch(() => {
              this.$message.error('保存失败')
            })
          })
        }
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve(true)
            } else {
              reject(new Error())
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
    watch: {
      '$route' (to, from) {
        this._getFlowSet(this.roleRange)
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
