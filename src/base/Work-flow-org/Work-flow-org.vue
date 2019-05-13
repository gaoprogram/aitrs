<!--
  User: xxxxxxx
  Date: 2018/11/23
  功能：审批流选择组织组件
-->

<template>
  <div class="common-select-org-container">
    <div class="dic-select el-select" style="display: block">
      <span>{{title}}：</span>
      <div class="div-selected">
        <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectedOrgList" :key="item.value">
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

    <div v-if="orgVisible">
      <select-org
        title="选择组织"
        @cancelOrg="orgVisible = false"
        @sureOrg="childSureOrg"
        :defaultCheckedKeys="defaultCheckedKeys"
      ></select-org>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SelectOrg from './Select-org'
  export default {
    props: {
      title: {
        type: String,
        default: '选择'
      },
      selectedOrgList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        orgVisible: false,
        orgDefaultProps: [],
        // selectedOrgList: [],
        defaultCheckedKeys: []
      }
    },
    methods: {
      // 点击+按钮
      setCheckedNode () {
        this.defaultCheckedKeys = []
        this.selectedOrgList.forEach(item => {
          this.defaultCheckedKeys.push(item.value)
        })
        this.orgVisible = true
      },
      delOrgItem (index, item) {
        // 删除组织
        this.selectedOrgList.splice(index, 1)
        let nodeId = item.nodeId
        if (nodeId) {
          this.selectedOrgList = this.selectedOrgList.filter(i => {
            return nodeId.indexOf(i.value) === -1
          })
        }
      },
      childSureOrg (orglist) {
        // 选择组织确认
        this.$emit('sureOrg', orglist)
        // this.selectedOrgList = orglist
        this.orgVisible = false
      }
    },
    watch: {
      // 'propsSelectedOrgList': {
      //   handler (newName, oldName) {
      //     this.selectedOrgList = newName
      //   },
      //   deep: true
      // }
    },
    components: {
      SelectOrg
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

