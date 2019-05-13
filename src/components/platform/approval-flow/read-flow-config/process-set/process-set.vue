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
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getFlowSet } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import { workFlowControlRuleMixin, flowBaseFn } from '@/utils/mixin'

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
        debugger
        getFlowSet(this.$route.query.flowId, roleRange).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            debugger
            this.flowList = res.data.Data
            if (res.data.Data.length) {
              this.flowList.forEach(item => {
                if (localStorage.getItem(item.TeamCode) !== null) {
                  item.IsSpread = localStorage.getItem(item.TeamCode) === 'true'
                }
              })
            }
          } else {
            this.$message.warning(`${res.data.Error}`)
          }
        }).catch(() => {
          this.$message.error('流程设置获取失败')
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
