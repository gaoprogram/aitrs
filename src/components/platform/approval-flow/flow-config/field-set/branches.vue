<!--
  User: gaol
  Date: 2019/5/26
  功能： 流程审批——节点设置——支流
-->

<template>
  <div class="node-branch-container" v-loading="loading">

    <!-- 当前对象nodeObj：{{nodeObj}}    -->

    <!-- 当前nodeList: {{nodeList}} -->
    <!--节点属性页面中的 节点切换下拉框，nodeObj为 当前的对象集合从 store中取，在field-set组件中点击属性时存入store的--start-->
    <el-select
      v-model="nodeObj.NodeId"
      placeholder="切换节点"
      size="small"
      @change="_getNodeTributaryAttr()"
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

    <!-- nodeAttrList:{{nodeAttrList}} -->
    <!-- <template v-for="(nodeAttr,index) in nodeAttrList.Fields"> -->
      <div class="teams">
        <!-- <el-tag size="small" @click.native="handleChangeTeamState(nodeAttr)">{{nodeAttr.TeamName}}</el-tag> -->
        <!-- nodeAttrList.Fields: {{nodeAttrList.Fields}} -->
        <!-- nodeAttr.Fields: {{nodeAttr}} -->
        <!-- nodeAttrList.Fields[0].ControlType: {{nodeAttrList.Fields[0].ControlType}} -->
        <!-- <el-collapse-transition> -->
          <!-- <el-form :model="nodeAttrList" :ref="`team${nodeAttrList.TeamCode}`" label-width="150px" class="detail-form" v-show="nodeAttrList.IsSpread"> -->
          <el-form :model="nodeAttrList" ref="branchesForm" label-width="150px" class="detail-form">
            <!--动态组件渲染并进行动态表单的验证注意 动态表单验证时prop的写法--->
            <component
              v-for="(obj, index) in nodeAttrList.Fields"
              :key="obj.FieldCode"
              :is="currentRuleComponent(obj.ControlType)"
              :prop="'Fields.' + index + '.FieldValue'"
              :orderProp="'Fields.' + index + '.FieldValue.parentIds'"
              :obj="obj"
              :flowId = "flowId"
              :nodeId="nodeObjStore.NodeId"
              :roleRange="roleRange"
              v-show="!nodeAttrList.Hidden"
              @notBoot = 'notBoot'
            ></component>
          </el-form>
        <!-- </el-collapse-transition> -->

      </div>
    <!-- </template> -->

    <save-footer @save="handleClickSaveNodeAttr" :isCancel="false"></save-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { GetNodeTributaryAttr, SaveNodeTributaryAttr } from '@/api/approve'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import { workFlowControlRuleMixin, flowNodeSet, flowAutoLogin } from '@/utils/mixin'
  export default {
    mixins: [workFlowControlRuleMixin, flowNodeSet, flowAutoLogin],
    props: {
      roleRange: {
        type: Number,
        default: 0
      }
    },
    components: {
      SaveFooter
    },
    data () {
      return {
        nodeAttrList: {},
        loading: true,
        flowId: '',
        flag_off:false
      }
    },
    created () {
  
    },
    mounted () {
      // 获取支流
      this.flowId = this.$route.query.ruleId
      this._getNodeTributaryAttr()
    },
    computed: {

    },
    methods: {
      notBoot (flag, value) {
        debugger
        // console.log(234)
        if (!flag) {
          // this.flag_off = true
          // 支流启动方式选择的 启动 
          if( value && value === '1' ){
            // 支流启动方式选择的是 按指定的字段启动
            if (this.nodeAttrList.Fields.length) {
              this.nodeAttrList.Fields.forEach(item => {
                // 将  动态组件 的 Hidden 设置为 false, 将 按明细表选择的 除外 （此下拉选项需要隐藏的）
                if(item.FieldCode !== 'DetailTableCode'){
                  item.Hidden = false
                }else {
                  item.Hidden = true
                }
              })
            }
            // 触发 选择启动字段的组件
            // this.$bus.$emit("initMainTableField")
          }else if ( value && value === '2'){
            // 支流启动方式选择的是 按明细表启动
            if (this.nodeAttrList.Fields.length) {
              this.nodeAttrList.Fields.forEach(item => {
                // 将  动态组件 的 Hidden 设置为 false
                  item.Hidden = false
              })
            } 
            // 触发 明细表的事件
            // this.$bus.$emit("initDetailTable")
          }
        } else {
          // 支流启动方式选择的是 不启动
          if (this.nodeAttrList.Fields.length) {
            this.nodeAttrList.Fields.forEach(item => {
                // 将 “支流启动方式” 外的 其他 动态组件 的 Hidden 设置为 true
              if (item.FieldCode !== 'SubFlowStartWay') {
                item.Hidden = true
              }
            })
          }
        }
      },
      // 切换节点
      _getNodeTributaryAttr () {
        debugger
        GetNodeTributaryAttr(this.nodeObj.NodeId, this.roleRange).then(res => {
          debugger
          this.loading = false
          if (res.data.State === REQ_OK) {
            debugger
            this.nodeAttrList = res.data.Data
            console.log("初始化时进入获取 this.nodeAttrList.Fields",this.nodeAttrList.Fields)
            // 将获取的nodeAttrList 存入sessionStorage中
            sessionStorage.setItem("branches_nodeAttrList", JSON.stringify(res.data.Data.Fields))
            if (res.data.Data.length) {
              this.nodeAttrList.forEach(item => {
                if (localStorage.getItem(item.TeamCode) !== null) {
                  item.IsSpread = localStorage.getItem(item.TeamCode) === 'true'
                }
              })
            }
  
            // 初始时，判断支流启动方式 是否是不启动做 初始的数据处理
            if (this.nodeAttrList.Fields.length) {
              this.nodeAttrList.Fields.forEach(item => {
                if (item.DataSource === 'SubFlowStartWay' && item.FieldCode === 'SubFlowStartWay') {
                  // 支流页面中 【支流启动方式】
                  if (item.FieldValue.parentIds == '0') {
                    // 【支流启动方式】设置的启动方式为 不启动，则 需要 隐藏其他 组件
                    item.Hidden = false
                    this.nodeAttrList.Fields.forEach(_ => {
                      if (_.FieldCode && _.FieldCode !== 'SubFlowStartWay') {
                        _.Hidden = true
                      }
                    })
                  }else if( item.FieldValue.parentIds == '1'){
                    debugger
                    // 支流启动方式选择的是 按指定的字段启动
                    if (this.nodeAttrList.Fields.length) {
                      this.nodeAttrList.Fields.forEach(item => {
                        // 将  动态组件 的 Hidden 设置为 false, 将 按明细表选择的 除外 （此下拉选项需要隐藏的）
                        if(item.FieldCode !== 'DetailTableCode'){
                          item.Hidden = false
                        }else {
                          item.Hidden = true
                        }
                      })
                    }                    
                    // 【支流启动方式】设置的启动方式为 【按指定的字段启动】，触发 【选择启动字段】组件的事件
                    // this.$bus.$emit("initMainTableField")
                  }else if( item.FieldValue.parentIds == '2'){
                    debugger
                    // 支流启动方式选择的是 按明细表启动
                    if (this.nodeAttrList.Fields.length) {
                      this.nodeAttrList.Fields.forEach(item => {
                        // 将  动态组件 的 Hidden 设置为 false
                          item.Hidden = false
                      })
                    }                     
                    // 【支流启动方式】设置的启动方式为 【按明细表启动】，触发 【选择明细表】组件的事件
                    this.nodeAttrList.Fields.forEach((item) => {
                      if(item.FieldCode === "DetailTableCode"){
                        // this.$bus.$emit("initDetailTable",item.FieldValue.parentIds)
                      }
                    })
                  }
                }
              })
            }
            debugger
          } else {
            this.$message.error(`获取节点属性失败，请重试,${res.data.Error}`)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('获取节点属性失败，请重试')
        })
      },
      // 保存节点属性
      handleClickSaveNodeAttr () {
        debugger
        let result = []
        if (this.nodeAttrList && this.nodeAttrList.length) {
          this.nodeAttrList.forEach(item => {
            result.push(this.checkFormArray(`team${item.TeamCode}`))
          })
        }

        Promise.all(result).then(() => {
          this.loading = true
          SaveNodeTributaryAttr(this.nodeObj.NodeId, JSON.stringify(this.nodeAttrList), this.roleRange).then(res => {
            this.loading = false
            if (res.data.State === REQ_OK) {
              this.$message.success('保存节点属性成功！')
              // this._getNodeAttr()
              // 保存成功后，触发父组件进行 节点table数据列表的更新显示
              this.$bus.$emit('fieldSetRefresh')
            } else {
              this.$message.error(`保存失败，请重试,${res.data.Error}`)
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
