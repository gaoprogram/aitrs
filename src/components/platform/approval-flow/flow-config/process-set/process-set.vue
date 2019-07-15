<!--
  User: gaol
  Date: 2019/5/14
  功能：新增流程后跳转到的一个 流程设置 的页面
-->

<template>
  <div class="process-set-container" v-loading="loading">
    <!-- {{flowList}} -->
    <template v-for="team in flowList">
      <div class="teams">

        <el-tag size="mini" @click.native="handleChangeTeamState(team)">{{team.TeamName}}</el-tag>
        
        <!-- {{team}} -->
        <!---遍历形成 多个不同的表单，最后提交保存时 需要分别对多个表单依次进行校验--->
        <el-form :model="team" :ref="`team${team.TeamCode}`" label-width="200px"
                 class="launch_form"
                 v-show="team.IsSpread"
        >
        
       <!-- team.Fields: {{team.Fields}} -->
          <component
            v-for="(obj, index) in team.Fields"
            :key="obj.FieldCode"
            :is="currentRuleComponent(obj.ControlType)"
            :prop="'Fields.' + index + '.FieldValue'"
            :obj.sync="obj"
            :teamCode = 'team.TeamCode'
            @autoFlowSet= 'autoFlowSet'
          ></component>

        </el-form>
      </div>
    </template>
    <!---调用保存、取消的按钮组件--->
    <save-footer @save="handleSaveProcessSet" :saveBtnIsShow="saveBtnIsShow" :isCancel="true" cancelText="关闭" @cancel="handleClose"></save-footer>
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
        flowList: [],  // 存入的是 流程设置页面中的  基础设置、高级设置、标签展示设置 、流转异常处理优先级1、流转异常处理优先级2 。。。。 几块的对象集合
        loading: true,
        saveBtnIsShow: true // 控制保存组件 中 保存按钮的显示/隐藏 防止重复提交
      }
    },
    created () {
      this._getRoleRange()
    },
    components: {
      SaveFooter
    },
    watch: {
      '$route' (to, from) {
        this._getFlowSet(this.roleRange)
      },
      'obj.FieldValue.parentIds': {
        handler (newValue, oldValue) {
          // 遍历
        }
      }
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
            // 获取流设置 数组集合对象
            debugger
            this.flowList = res.data.Data
            if (res.data.Data.length) {
              this.flowList.forEach(item => {
                if (localStorage.getItem(item.TeamCode) !== null) {
                  // 判断缓存中是否存入了 每个 组 code  来确定此组是否展开显示
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
        debugger
        let result = []
        if (this.flowList && this.flowList.length) {
          this.flowList.forEach(item => {
            result.push(this.checkFormArray(`team${item.TeamCode}`))
          })
          console.log('form表单验证结果', result)
          Promise.all(result).then((res) => {
            console.log(res)
            debugger
            saveFlowSet(this.$route.query.flowId, this.roleRange, JSON.stringify(this.flowList)).then(res => {
              debugger
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
        debugger
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            debugger
            console.log('每个form表单的valid', valid)
            if (valid) {
              resolve({
                msg: '验证pass',
                teamCode: `${formName}`
              })
            } else {
              reject(new Error(formName + '验证错误'))
            }
          })
        })
      },
      // 切换分组显示/隐藏状态
      handleChangeTeamState (team) {
        team.IsSpread = !team.IsSpread
        localStorage.setItem(team.TeamCode, team.IsSpread)
      },
      // 设置 流转异常处理优先级 的设置
      autoFlowSet (type, obj, teamCode) {
        debugger
        console.log(this.flowList)
        switch (type) {
          case '1':
            // 自动流转到下一个节点
            if (this.flowList && this.flowList.length) {
              this.flowList.forEach((item, i) => {
                if (obj.TeamCode && teamCode === item.TeamCode) {
                  if (this.flowList[i].Fields && this.flowList[i].Fields.length) {
                    this.flowList[i].Fields.forEach(_ => {
                      if (_.FieldCode === 'SubmitToNode') {
                        // 找到‘提交到指定节点’ 的动态组件 隐藏
                        _.Hidden = true
                      }
                      if (_.FieldCode === 'SubmitToUser') {
                        // 找到 ‘用户指定操作者’ 的动态组件  隐藏
                        _.Hidden = true
                      }
                    })
                  }
                }
              })
            }
            break
          case '2':
            // 提交到指定节点
            if (this.flowList && this.flowList.length) {
              this.flowList.forEach((item, i) => {
                if (obj.TeamCode && teamCode === item.TeamCode) {
                  if (this.flowList[i].Fields && this.flowList[i].Fields.length) {
                    this.flowList[i].Fields.forEach(_ => {
                      if (_.FieldCode === 'SubmitToNode') {
                        // 找到‘提交到指定节点’ 的动态组件 隐藏
                        _.Hidden = false
                      }
                      if (_.FieldCode === 'SubmitToUser') {
                        // 找到 ‘用户指定操作者’ 的动态组件  隐藏
                        _.Hidden = true
                      }
                    })
                  }
                }
              })
            }
            break
          case '3':
            // 用户指定操作者
            if (this.flowList && this.flowList.length) {
              this.flowList.forEach((item, i) => {
                if (obj.TeamCode && teamCode === item.TeamCode) {
                  if (this.flowList[i].Fields && this.flowList[i].Fields.length) {
                    this.flowList[i].Fields.forEach(_ => {
                      if (_.FieldCode === 'SubmitToNode') {
                        // 找到‘提交到指定节点’ 的动态组件 隐藏
                        _.Hidden = true
                      }
                      if (_.FieldCode === 'SubmitToUser') {
                        // 找到 ‘用户指定操作者’ 的动态组件  隐藏
                        _.Hidden = false
                      }
                    })
                  }
                }
              })
              break
            }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
