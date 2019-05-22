<!--
  User: xxxxxxx
  Date: 2019/1/3
  功能：xxxxxx
-->

<template>
  <el-dialog
    title="公司架构"
    :visible.sync="dialogCommon"
    top="10vh"
    :show-close="false"
    :append-to-body="true"
    :close-on-click-modal="false"
    custom-class="company-dialog"
  >
    <el-radio-group v-model="selectTypeTab" style="margin-bottom: 20px;" size="mini">
      <el-radio-button :disabled="!type.disabled" :label="type.label" v-for="type in nativeTabType" :key="type.label">{{type.name}}</el-radio-button>
    </el-radio-group>

    <org-cmp v-show="selectTypeTab === 'zuzhi'" v-on="$listeners"></org-cmp>

    <emp-cmp v-show="selectTypeTab === 'renyuan'" v-on="$listeners"></emp-cmp>
    
    <position-cmp v-show="selectTypeTab === 'gangwei'" v-on="$listeners"></position-cmp>
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
      tabType: {
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
    },
    components: {
      SaveFooter,
      OrgCmp,
      EmpCmp,
      PositionCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .company-dialog
    width 70%
    min-width 920px
    max-height 80%
</style>
