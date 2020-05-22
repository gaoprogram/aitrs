<!--
  User: gaol
  Date: 2019/5/29
  功能：人员，组织，岗位，角色，职务，角色组，组织类别等的 通用选择器组件
-->

<template>
  <el-dialog
    title="公司架构"
    :visible.sync="dialogCommon"
    :show-close="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="80%"
    class="company-dialog"
  >
    <el-radio-group v-model="selectTypeTab" style="margin-bottom: 20px;" size="mini">
      <el-radio-button :disabled="!type.disabled" :label="type.label" v-for="type in nativeTabType" :key="type.label">{{type.name}}</el-radio-button>
    </el-radio-group>

    <div class="mainContentBox">
      <org-cmp v-show="selectTypeTab === 'zuzhi'" v-on="$listeners"></org-cmp>
      <emp-cmp v-show="selectTypeTab === 'renyuan'" :nextStepAccepterEmpArr="nextStepAccepterEmpArr" v-on="$listeners"></emp-cmp>
      <position-cmp v-show="selectTypeTab === 'gangwei'" v-on="$listeners"></position-cmp>
    </div>

    
    <!--<save-footer-->
      <!--:isCancel="false"-->
      <!--saveText="关闭"-->
      <!--@save="handleClickClose">-->
    <!--</save-footer>-->
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import OrgCmp from './org-cmp'
  import EmpCmp from './emp-cmp'
  import PositionCmp from './position-cmp'
  export default {
    props: {
      // 例如： tabType：["gangwei","zuzhi","renyuan"]
      tabType: {
        type: Array,
        default: () => {
          return []
        }
      },
      nextStepAccepterEmpArr: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        dialogCommon: true,
        selectTypeTab: 'zuzhi',
        nativeTabType: [
          {
            label: 'zuzhi',
            name: '组织',
            disabled: false
          },
          {
            label: 'renyuan',
            name: '人员',
            disabled: false
          },
          {
            label: 'gangwei',
            name: '岗位',
            disabled: false
          },
          {
            label: 'jiaose',
            name: '角色',
            disabled: false
          },
          {
            label: 'zhiwu',
            name: '职务',
            disabled: false
          },
          {
            label: 'jiaosezu',
            name: '角色组',
            disabled: false
          },
          {
            label: 'zhiwuleibie',
            name: '组织类别',
            disabled: false
          }
        ]
      }
    },
    components: {
      SaveFooter,
      OrgCmp,
      EmpCmp,
      PositionCmp
    },
    created () {
      if (this.tabType.length) {
        this.tabType.forEach(item => {
          this.nativeTabType.forEach(tab => {
            if (item === tab.label) {
              tab.disabled = true
            }
          })
        })
        this.selectTypeTab = this.tabType[0]
      } else {
        this.nativeTabType.forEach(tab => {
          tab.disabled = true
        })
      }
    },
    methods: {
      // handleSaveOrg (arr) {
      //   this.$emit('handleSaveOrg', arr)
      // }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .company-dialog
    width 80%
    min-width 920px
    max-height 100% 
    margin auto
    .el-dialog
      margin 0 !important
      width 100% !important
      max-height 90% !important
      top 30px
      >>>.el-dialog__body
        padding  10px 20px !important
</style>
