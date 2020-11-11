<!--
  User: xxxxxxx
  Date: 2018/11/23
  功能：审批流选择人员组件
-->

<template>
  <div class="common-select-emp-container">
    <div class="dic-select el-select u-f-jst" style="display: block">
      <span>{{title}}：</span>
      <div class="div-selected u-f0">
        <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectedEmpList" :key="item.value">
          <span class="el-select__tags-text">{{ item.label }}</span>
          <!--<i class="el-tag__close el-icon-close" @click="delOrgItem(base-info, item)"></i>-->
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="setCheckedNode()"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>

    <select-emp
      :empVisible.sync="empVisible"
      @cancelEmp="empVisible = false"
      :propsCheckedOrgTree="checkedOrgTree"
      :propsDefaultCheckedKeys="defaultCheckedKeys"
      @sureEmp="childSureEmp">
    </select-emp>
  </div>
</template>

<script type="text/ecmascript-6">
  import SelectEmp from './Select-emp'
  export default {
    props: {
      title: {
        type: String,
        default: '选择'
      },
      selectedEmpList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        empVisible: false,
        checkedOrgTree: [],
        defaultCheckedKeys: []
      }
    },
    methods: {
      setCheckedNode () {
        this.defaultCheckedKeys = []
        if (this.selectedEmpList.length) {
          this.selectedEmpList.forEach(item => {
            this.defaultCheckedKeys.push(item.nodeId)
          })
          this.checkedOrgTree = [...this.selectedEmpList]
        }
        this.empVisible = true
      },
      childSureEmp (empList) {
        this.$emit('sureEmp', empList)
        this.empVisible = false
      }
    },
    components: {
      SelectEmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dic-select
    margin-bottom 10px
    font-size 14px
    .div-selected
      display: inline-block
      line-height: normal
      max-width: 282px
      min-width: 282px
      min-height 38px
      border: 1px solid #d8dce5
      border-radius: 4px
      vertical-align: top
</style>
