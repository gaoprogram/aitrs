<template>
  <el-dialog
    title="编辑名称和审批规则"
    width="800px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :append-to-body= "true"
  >
    <div v-loading="loading">
      <!-- selectEditNameObj: {{selectEditNameObj}} -->
      <el-form ref="selectEditNameObj" :model="selectEditNameObj" label-width="80px">
        <!--节点名称---start-->
        <el-form-item label="节点名称" :rules="rules.Name" prop="Name">
          <el-input v-model="selectEditNameObj.Name" clearable class="name"></el-input>
        </el-form-item>
        <!--节点名称---end-->

        <!-- selectEditNameObj.ruleAttr.RunModel:{{selectEditNameObj.ruleAttr.RunModel}} -->
        <!--节点工作模式---start-->
        <el-form-item label="工作模式" prop="ruleAttr" :rules="rules.ruleAttr.RunModel">
          <el-select clearable  v-model="selectEditNameObj.ruleAttr.RunModel"  placeholder="请选择">
            <el-option
              v-for="item in selectEditNameObj.runModelList"
              :key="item.Code"
              :label="item.Name"
              :value="+item.Code">
            </el-option>
          </el-select>
        </el-form-item> 
        <!--节点工作模式---end--->



        <!-- selectEditNameObj： {{selectEditNameObj}} -->
        <!---工作模式---start-->
        <!-- <el-form-item label="工作模式">
          <el-input v-model="selectEditNameObj.Name" clearable class="name"></el-input>
        </el-form-item> -->
        <!--工作模式---end-->

        <!-- selectEditNameObj: {{selectEditNameObj}} -->
        <!-- selectEditNameObj.ruleAttr.TodolistModel: {{selectEditNameObj.ruleAttr.TodolistModel}}
        selectEditNameObj.morePersonRuleList:{{selectEditNameObj.morePersonRuleList}} -->
        
        <!--多人处理规则--start--->
        <el-form-item label="多人处理规则"  class="manyPeopleRule">
          <template v-for="item in selectEditNameObj.morePersonRuleList">
            <el-radio :label="+item.Code" v-model="selectEditNameObj.ruleAttr.TodolistModel">{{item.Name}}</el-radio>
          </template>
        </el-form-item>
        <!--多人处理规则--end--->

        <!--组长规则--start--->
        <el-form-item label="组长规则" class="headManRule" v-show="selectEditNameObj.ruleAttr.TodolistModel &&  selectEditNameObj.ruleAttr.TodolistModel=== 4">
          <template v-for="item in selectEditNameObj.headManRuleList">
            <el-radio :label="+item.Code" v-model="selectEditNameObj.ruleAttr.TeamLeaderConfirmRole">{{item.Name}}</el-radio>
          </template>
        </el-form-item>
        <!--组长规则--end--->

      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelName()">取消</el-button>
      <el-button v-atris-flowRuleScan="{styleBlock:'inline-block'}" @click="handleSaveEditName()" type="primary">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import {
    runModel,
    todolistModel,
    teamLeaderConfirmRole,
    getNodeInfo} from '@/api/approve'
  // import { dialogFnMixin } from '@/utils/mixin'
  export default {
    // mixins: [dialogFnMixin],
    props: {
      editNameAndRuleVisible: {
        type: Boolean,
        default: true
      },
      selectEditNameObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      var validateFieldName = (rule, value, callback) => {
        debugger
        if (!this.selectEditNameObj.Name) {
          callback(new Error('节点名称未填写'))
        } else {
          callback()
        }
      }
      var validateWorkModel = (rule, value, callback) => {
        if (!this.selectEditNameObj.ruleAttr.RunModel && this.selectEditNameObj.ruleAttr.RunModel!==0) {
          callback(new Error('节点工作模式未设定'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          Name: [
            { required: true, validator: validateFieldName, trigger: ['change', 'blur']}
          ],
          ruleAttr: {
            RunModel: [
              { required: true, validator: validateWorkModel, trigger: ['change', 'blur']}
            ]
          }
        },
        loading: false,
        nodeId: this.selectEditNameObj.ToNodeId,
        RunModel: '',  // 
        TodolistModel: '',     // 多人处理规则
        TeamLeaderConfirmRole: '',  // 组长规则
        WorkModelList: '' // 节点工作模式 （普通节点，合流节点，分流节点，分合流节点，分流中间点）
      }
    },
    components: {
      SaveFooter
    },
    created () {
      // 获取 节点工作模式 的字典表
        // 获取 多人处理规则 和 组长规则的 字典表
      // this.loadingShow = true
      debugger
    },
    mounted () {
      this.$nextTick(() => {
        Promise.all([runModel(), todolistModel(), teamLeaderConfirmRole()]).then(([runModelList, morePersonRuleData, headManRuleData]) => {
          debugger
          if (runModelList.data.State === REQ_OK &&
              morePersonRuleData.data.State === REQ_OK &&
              headManRuleData.data.State === REQ_OK
          ) {
            // 将获取到的 节点工作模式 添加到 selecEditNameObj 的 runModel 属性上
            this.$set(this.selectEditNameObj, 'runModelList', runModelList.data.Data)
            // 将获取到的多人规则添加到 selectEditNameObj 的 morePersonRuleList 属性上
            this.$set(this.selectEditNameObj, 'morePersonRuleList', morePersonRuleData.data.Data)
            // 将获取到的组长规则添加到 selectEditNameObj 的 headManRuleList 属性上
            this.$set(this.selectEditNameObj, 'headManRuleList', headManRuleData.data.Data)
            // 获取该节点配置信息
            this._getNodeInfo()
            debugger
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取多人规则/组长规则失败err,请刷新后重试'
          })
        })
      })
    },
    watch: {
      loadingShow (newValue, oldValue) {
        this.$emit('update:loadingShow', newValue)
      }
    },
    methods: {
      // 获取节点工作模式
      _getRunModel () {
        runModel()
      },
      // 获取多人处理规则dic 字典表
      _getMorePersonDicCode () {
        debugger
      // 多人处理规则：DicCode=TodolistModel
        // todolistModel()
      },
      // 获取组长规则dic 字典表
      _getHeadManRulDicCode () {
        // 组长规则：DicCode=TeamLeaderConfirmRole
        teamLeaderConfirmRole()
      },
      // 获取节点配置的审批规则属性
      _getNodeInfo () {
        this.loading = true
        getNodeInfo(this.selectEditNameObj.ToNodeId).then(res => {
          this.loading = false
          if (res && res.data.State === REQ_OK) {
            // 将获取的属性数据 添加为 selectEditNameObjAttr 的 ruleAttr 属性字段中
            this.$set(this.selectEditNameObj, 'ruleAttr', res.data.Data)
            console.log(this.selectEditNameObj)
          } else {
            this.loading = false
            this.$message({
              type: 'error',
              message: '节点配置规则信息获取失败err,请刷新后重新'
            })
          }
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '节点配置规则信息获取失败err,请刷新后重新'
          })
        })
      },
      // 取消
      handleCancelName () {
        // 双向修改 父组件 process-design 中传过来的 editNameAndRuleVisible
        if (this.selectEditNameObj.Name) {
          this.$emit('update:editNameAndRuleVisible', false)
        } else {
          this.$message({
            type: 'warning',
            message: '节点名称未填写完整'
          })
        }
      },
      // 保存
      handleSaveEditName () {
        // this.loading = true
        debugger
        // 向 selectEditNameObj 对象中添加 NodeId， TodolistModel， TeamLeaderConfirmRole RunModel 四个 属性
        this.TodolistModel = this.selectEditNameObj.ruleAttr.TodolistModel
        this.TeamLeaderConfirmRole = this.selectEditNameObj.ruleAttr.TeamLeaderConfirmRole
        this.RunModel = this.selectEditNameObj.ruleAttr.RunModel
        this.selectEditNameObj = Object.assign(this.selectEditNameObj, {
          nodeId: this.nodeId,
          TodolistModel: this.TodolistModel,
          TeamLeaderConfirmRole: this.TeamLeaderConfirmRole,
          RunModel: this.RunModel
        })
        debugger
        // 触发父组件的 保存
        if (!this.selectEditNameObj.Name) {
          this.$message({
            type: 'warning',
            message: '节点名称未填写完整'
          })
          return
        }


        if (this.selectEditNameObj.ruleAttr.RunModel === '' ||
            this.selectEditNameObj.ruleAttr.RunModel == null &&
            this.selectEditNameObj.ruleAttr.RunModel !== 0) {
          this.$message({
            type: 'warning',
            message: '节点工作模式未设置'
          })
          return
        }
  
        this.$emit('update:editNameAndRuleVisible', false)
  
        this.$emit('handleSaveEditName', this.selectEditNameObj)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-form-item__label
  width 100px !important
.name 
  width 200px
.dialog-footer 
  margin-top  0 !important
</style>

