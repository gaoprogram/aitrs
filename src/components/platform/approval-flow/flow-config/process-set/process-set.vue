<!--
  User: gaol
  Date: 2019/5/14
  功能：新增流程后跳转到的一个 设置流程的页面
-->

<template>
  <div class="process-set-container" v-loading="loading">
    <template v-for="team in flowList">
      <div class="teams">
        <el-tag size="mini" @click.native="handleChangeTeamState(team)">{{team.TeamName}}</el-tag>
        <!-- {{team}} -->
        <!---遍历形成 多个不同的表单，最后提交保存时 需要分别对多个表单依次进行校验--->
        <el-form :model="team" :ref="`team${team.TeamCode}`" label-width="200px"
                 class="launch_form"
                 v-show="team.IsSpread"
        >
        <!-- {{team.Fields}} -->
          <component
            v-for="(obj, index) in team.Fields"
            :key="obj.FieldCode"
            :is="currentRuleComponent(obj.ControlType)"
            :prop="'Fields.' + index + '.FieldValue'"
            :obj.sync="obj"
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
        flowList: [],  // 存入的是 流程设置页面中的  基础设置、高级设置、标签展示设置 三块的对象集合
        loading: true,
        saveBtnIsShow: true // 控制保存组件 中 保存按钮的显示/隐藏 防止重复提交
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
        let result = []
        if (this.flowList && this.flowList.length) {
          debugger
          this.flowList.forEach(item => {
            // 在父组件中 进行必填项验证
            result.push(this.checkFormArray(`team${item.TeamCode}`))
            console.log(result)
            debugger
          })

          // 保证填写的 业务领域有选择才进行下面的 提交
          //   Promise.all(result).then(() => {
          //     // 确保异步验证都已验证结束
          //     // result.every
          //     // 判断全部是验证通过了之后才进行
          //     saveFlowSet(this.$route.query.flowId, this.roleRange, JSON.stringify(this.flowList)).then(res => {
          //       if (res.data.State === REQ_OK) {
          //         // 调用 流设置接口
          //         this._getFlowSet(this.roleRange)
          //         // 隐藏掉 保存按钮，防止重复提交
          //         this.saveBtnIsShow = false
          //         this.$message.success('保存成功')
          //         this.$bus.$emit('flowRuleRefresh')
          //       } else {
          //         this.$message.error('保存失败，' + res.data.Error)
          //       }
          //     }).catch(() => {
          //       this.$message.error('保存失败err')
          //     })
          //   })
          // }

          // return this.flowList.forEach(val => {
          //   if (val.DataSource === 'GetBusinessAreaList') {
          //     if (val.Fields && val.Fields.length) {
          //       if (val.Fields[0].FieldValue.parentIds) {
          //         // 流程设置页面中 有选择业务领域
          //         // Promise.all(result).then(() => {
          //         //   // 确保异步验证都已验证结束
          //         //   // result.every
          //         //   // 判断全部是验证通过了之后才进行
          //         //   saveFlowSet(this.$route.query.flowId, this.roleRange, JSON.stringify(this.flowList)).then(res => {
          //         //     if (res.data.State === REQ_OK) {
          //         //       // 调用 流设置接口
          //         //       this._getFlowSet(this.roleRange)
          //         //       // 隐藏掉 保存按钮，防止重复提交
          //         //       this.saveBtnIsShow = false
          //         //       this.$message.success('保存成功')
          //         //       this.$bus.$emit('flowRuleRefresh')
          //         //     } else {
          //         //       this.$message.error('保存失败，' + res.data.Error)
          //         //     }
          //         //   }).catch(() => {
          //         //     this.$message.error('保存失败err')
          //         //   })
          //         // })
          //       } else {
          //         // 流程设置页面中没有填写 业务领域
          //         this.$message('业务领域没有填写,请填写后提交')
          //         return false
          //       }
          //     }
          //   } else {
          //     Promise.all(result).then(() => {
          //       // 确保异步验证都已验证结束
          //       // result.every
          //       // 判断全部是验证通过了之后才进行
          //       saveFlowSet(this.$route.query.flowId, this.roleRange, JSON.stringify(this.flowList)).then(res => {
          //         if (res.data.State === REQ_OK) {
          //           // 调用 流设置接口
          //           this._getFlowSet(this.roleRange)
          //           // 隐藏掉 保存按钮，防止重复提交
          //           this.saveBtnIsShow = false
          //           this.$message.success('保存成功')
          //           this.$bus.$emit('flowRuleRefresh')
          //         } else {
          //           this.$message.error('保存失败，' + res.data.Error)
          //         }
          //       }).catch(() => {
          //         this.$message.error('保存失败err')
          //       })
          //     })
          //   }
          // })

          try {
            if (this.flowList[0].Fields && this.flowList[0].Fields.length) {
              if (this.flowList[0].Fields[0].FieldValue.parentIds) {
                Promise.all(result).then(() => {
                  // 确保异步验证都已验证结束
                  // result.every
                  // 判断全部是验证通过了之后才进行
                  saveFlowSet(this.$route.query.flowId, this.roleRange, JSON.stringify(this.flowList)).then(res => {
                    if (res.data.State === REQ_OK) {
                      // 调用 流设置接口
                      this._getFlowSet(this.roleRange)
                      // 隐藏掉 保存按钮，防止重复提交
                      this.saveBtnIsShow = false
                      this.$message.success('保存成功')
                      this.$bus.$emit('flowRuleRefresh')
                    } else {
                      this.$message.error('保存失败，' + res.data.Error)
                    }
                  }).catch(() => {
                    this.$message.error('保存失败err')
                  })
                })
              } else {
                this.$message('业务领域没有填写,请填写后提交')
              }
            }
          } catch (error) {
            console.log(error)
          }
        }
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        debugger
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve(true)
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
