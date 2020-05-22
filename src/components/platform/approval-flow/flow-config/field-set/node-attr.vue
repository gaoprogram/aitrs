<!--
  User: xxxxxxx
  Date: 2019/1/2
  功能： 流程新增、编辑（与查看没有共用页面）—— 节点设置—— 节点属性 页面，
-->

<template>
  <div class="node-attr-container" v-loading="loading">

    <!-- 当前对象nodeObj：{{nodeObj}}   

    当前nodeList: {{nodeList}} -->
    <!--节点属性页面中的 节点切换下拉框，nodeObj为 当前的对象集合从 store中取，在field-set组件中点击属性时存入store的--start-->
    <el-select
      v-model="nodeObj.NodeId"
      placeholder="切换节点"
      size="small"
      @change="_getNodeAttr()"
      style="margin-bottom: 10px"
    >

      <!---注：nodeList（field-set组件中table表格中的所有数据集合） 为./field-set.vue组件传给 dialog.vue 再传给 此组件---->
      <el-option
        v-for="item in nodeList"
        :key="item.NodeId"
        :label="item.Name"
        :value="item.NodeId">
      </el-option>
    </el-select>
    <!--节点属性页面中的 节点切换下拉框--start-->

    <!-- {{nodeAttrList[1].Fields[4]}} -->
    <template v-for="nodeAttr in nodeAttrList">
      <div class="teams">
        <el-tag size="small" @click.native="handleChangeTeamState(nodeAttr)">{{nodeAttr.TeamName}}</el-tag>

        <el-collapse-transition>
          <el-form :model="nodeAttr" :ref="`team${nodeAttr.TeamCode}`" label-width="150px" class="detail-form" v-show="nodeAttr.IsSpread">
            <!--动态组件渲染并进行动态表单的验证注意 动态表单验证时prop的写法--->
            <component
              v-for="(obj, index) in nodeAttr.Fields"
              :key="obj.FieldCode"
              :is="currentRuleComponent(obj.ControlType)"
              :prop="'Fields.' + index + '.FieldValue'"
              :orderProp="'Fields.' + index + '.FieldValue'"
              :obj="obj"
              :nodeId="nodeObjStore.NodeId"
              :teamCode = 'nodeAttr.TeamCode'
              @autoFlowSet= 'autoFlowSet'
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
            debugger
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
              // 保存成功后，触发父组件进行 节点table数据列表的更新显示
              this.$bus.$emit('fieldSetRefresh')
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
      },
      // 设置 流转异常处理优先级 的设置
      autoFlowSet (type, obj, teamCode) {
        debugger
        console.log(this.nodeAttrList)
        switch (type) {
          case '1':
            // 自动流转到下一个节点
            if (this.nodeAttrList && this.nodeAttrList.length) {
              this.nodeAttrList.forEach((item, i) => {
                if (obj.TeamCode && teamCode === item.TeamCode) {
                  if (this.nodeAttrList[i].Fields && this.nodeAttrList[i].Fields.length) {
                    this.nodeAttrList[i].Fields.forEach(_ => {
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
            if (this.nodeAttrList && this.nodeAttrList.length) {
              this.nodeAttrList.forEach((item, i) => {
                if (obj.TeamCode && teamCode === item.TeamCode) {
                  if (this.nodeAttrList[i].Fields && this.nodeAttrList[i].Fields.length) {
                    this.nodeAttrList[i].Fields.forEach(_ => {
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
            if (this.nodeAttrList && this.nodeAttrList.length) {
              this.nodeAttrList.forEach((item, i) => {
                if (obj.TeamCode && teamCode === item.TeamCode) {
                  if (this.nodeAttrList[i].Fields && this.nodeAttrList[i].Fields.length) {
                    this.nodeAttrList[i].Fields.forEach(_ => {
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
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
