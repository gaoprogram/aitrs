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

        selectEditNameObj.ruleAttr: {{selectEditNameObj.ruleAttr}}
        <!--多人处理规则--start--->
        <el-form-item label="多人处理规则" prop="selectEditNameObj" class="manyPeopleRule">
          <el-radio label="或签"></el-radio>
          <el-radio label="会签"></el-radio>
          <el-radio label="队列"></el-radio>
          <el-radio label="任务池领取"></el-radio>
          <el-radio label="协助组长"></el-radio>
        </el-form-item>
        <!--多人处理规则--end--->

        <!--组长规则--start--->
        <el-form-item label="组长规则" prop="resource" class="headManRule">
          <el-radio label="按组织负责人计算"></el-radio>
          <el-radio label="按SQL计算"></el-radio>
          <el-radio label="按会签时主持人计算"></el-radio>
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
      }
    },
    data () {
      return {
        loading: false,
        form: {
          name: 'zhang'
        }
      }
    },
    components: {
      SaveFooter
    },
    created () {
    },
    mounted () {

    },
    methods: {
      // 取消
      handleCancelName () {
        // 双向修改 父组件 process-design 中传过来的 editNameAndRuleVisible
        this.$emit('update:editNameAndRuleVisible', false)
      },
      // 保存
      handleSaveEditName () {
        // 触发父组件的 保存
        this.$emit('handleSaveEditName')
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

