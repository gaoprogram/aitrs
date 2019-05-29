<template>
  <el-dialog
    title="编辑名称和审批规则"
    width="800px"
    :visible="true"
    custom-class="dialog-item"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <div v-loading="loading">
      <!-- selectEditNameObj: {{selectEditNameObj}} -->
      <el-form ref="selectEditNameObj" :model="selectEditNameObj" label-width="80px">
        <!--节点名称---start-->
        <el-form-item label="节点名称">
          <el-input v-model="selectEditNameObj.Name" clearable class="name"></el-input>
        </el-form-item>
        <!--节点名称---end-->

        <!-- selectEditNameObj: {{selectEditNameObj}} -->
        <!-- selectEditNameObj.ruleAttr.TodolistModel: {{selectEditNameObj.ruleAttr.TodolistModel}}
        selectEditNameObj.morePersonRuleList:{{selectEditNameObj.morePersonRuleList}} -->
        <!--多人处理规则--start--->
        <el-form-item label="多人处理规则" prop="selectEditNameObj.morePersonRuleList" class="manyPeopleRule">
          <template v-for="item in selectEditNameObj.morePersonRuleList">
            <el-radio :label="+item.Code" v-model="selectEditNameObj.ruleAttr.TodolistModel">{{item.Name}}</el-radio>
          </template>
        </el-form-item>
        <!--多人处理规则--end--->

        <!--组长规则--start--->
        <el-form-item label="组长规则" prop="selectEditNameObj.headManRuleList" class="headManRule" v-show="selectEditNameObj.ruleAttr.TodolistModel===4">
          <template v-for="item in selectEditNameObj.headManRuleList">
            <el-radio :label="+item.Code" v-model="selectEditNameObj.ruleAttr.TeamLeaderConfirmRole">{{item.Name}}</el-radio>
          </template>
        </el-form-item>
        <!--组长规则--end--->

      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancelName()">取消</el-button>
      <el-button @click="handleSaveEditName()" type="primary">保存</el-button>
    </div>

  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import SaveFooter from '@/base/Save-footer/Save-footer'
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
      },
      loadingShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loading: false,
        nodeId: this.selectEditNameObj.ToNodeId,
        TodolistModel: '',
        TeamLeaderConfirmRole: ''
      }
    },
    components: {
      SaveFooter
    },
    created () {
    },
    mounted () {

    },
    watch: {
      loadingShow (newValue, oldValue) {
        this.$emit('update:loadingShow', newValue)
      }
    },
    methods: {
      // 取消
      handleCancelName () {
        // 双向修改 父组件 process-design 中传过来的 editNameAndRuleVisible
        if( this.selectEditNameObj.Name ) {
          this.$emit('update:editNameAndRuleVisible', false)
        }else {
          this.$message({
            type: 'warning',
            message: '节点名称未填写完整'
          })
        }     
      },
      // 保存
      handleSaveEditName () {
        debugger
        // 向 selectEditNameObj 对象中添加 NodeId， TodolistModel， TeamLeaderConfirmRole 四个 属性
        this.TodolistModel = this.selectEditNameObj.ruleAttr.TodolistModel
        this.TeamLeaderConfirmRole = this.selectEditNameObj.ruleAttr.TeamLeaderConfirmRole
        this.selectEditNameObj = Object.assign(this.selectEditNameObj, {
          nodeId: this.nodeId,
          TodolistModel: this.TodolistModel,
          TeamLeaderConfirmRole: this.TeamLeaderConfirmRole
        })
        debugger
        // 触发父组件的 保存
        if( !this.selectEditNameObj.Name ) {
          this.$message({
            type: 'warning',
            message: '节点名称未填写完整'
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

