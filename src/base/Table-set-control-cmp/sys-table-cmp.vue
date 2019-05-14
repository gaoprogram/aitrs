<!--
  User: gaol
  Date: 2019/5/14
  功能：系统字典表配置dialog弹框 被 sys-table-cmp 组件引用  （table-config中  单选下拉框基础组件设置部分中 点击“字典表配置”按钮后的系统字典表 和 企业字典表 弹框）
-->

<template>
  <div class="custom-table-cmp">
    <el-dialog
      title="系统字典表"
      :visible.sync="dialogCustomTable"
      width="800px"
      :show-close="false"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="选中"
          width="50"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.State"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          v-if="setObj.Depend"
          prop="ParentItemName"
          label="字典项">
        </el-table-column>
        <el-table-column
          prop="ChildItemName"
          label="字典项子类">
        </el-table-column>
        <el-table-column
          label="默认选中"
          width="50"
        >
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.CheckState"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>

      <save-footer
        :isCancel="true"
        saveText="确认"
        @cancel="hanldeClickCancelCustomTable"
        @save="handleClickSaveCustomTable">
      </save-footer>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  export default {
    props: {
      setObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      tableData: {
        type: Array,
        default: () => {
          return []
        }
      },
      isMul: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dialogCustomTable: true
      }
    },
    created () {
      if (this.tableData.length) {
        this.tableData.forEach(item => {
          if (this.setObj.Ext.LimitOpt.includes(item.ChildItemCode)) {
            item.State = true
          } else {
            item.State = false
          }
          if (this.setObj.Ext.DefaultOpt.includes(item.ChildItemCode)) {
            item.CheckState = true
          } else {
            item.CheckState = false
          }
        })
      }
    },
    methods: {
      // 表格切换选中
      handleSelectionChange () {
      },
      // 保存企业/系统字典表
      handleClickSaveCustomTable () {
        this.setObj.Ext.LimitOpt = []
        this.setObj.Ext.DefaultOpt = []
        this.tableData.forEach(item => {
          if (item.State) {
            this.setObj.Ext.LimitOpt.push(item.ChildItemCode)
          }
          if (item.CheckState) {
            this.setObj.Ext.DefaultOpt.push(item.ChildItemCode)
          }
        })
        this.setObj.Ext.Opt = []
        if (!this.isMul && this.setObj.Ext.DefaultOpt.length > 1) return this.$message.warning('此控件默认选中有且只能选中1个')
        this.$emit('cancel')
      },
      // 取消
      hanldeClickCancelCustomTable () {
        this.$emit('cancel')
      }
    },
    watch: {
      setObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:setObj', newValue)
        },
        deep: true
      }
    },
    components: {
      SaveFooter
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dialogBatchSet
    .batch-set-container
      display flex
      .el-card
        flex 1
        .tags /deep/
          display flex
          flex-direction column
          width 150px
          .el-tag
            margin-bottom 6px
          .el-tag--info
            background-color: #ffffff
</style>
