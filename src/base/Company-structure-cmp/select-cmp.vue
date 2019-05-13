<!--
  User: xxxxxxx
  Date: 2018/11/9
  功能：选择通用组件
-->

<template>
  <div class="common-select-emp-container">
    <div class="dic-select el-select">
      <span v-if="isTitle">{{title}}：</span>
      <div class="div-selected">
        <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectedList" :key="item.Id">
          <span class="el-select__tags-text">{{ item.Name }}</span>
          <!--<i class="el-tag__close el-icon-close" @click="delOrgItem(base-info, item)"></i>-->
        </span>
      </div>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="setCheckedNode()"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    
    <company-structure-cmp
      v-if="showCompanyStructureCmp"
      :tabType="tabType"
      v-on="$listeners"
    ></company-structure-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import CompanyStructureCmp from '@/base/Company-structure-cmp/dialog-common'
  export default {
    props: {
      isTitle: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '选择'
      },
      selectedList: {
        type: Array,
        default: () => {
          return []
        }
      },
      tabType: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        showCompanyStructureCmp: false,
        checkedOrgTree: [],
        defaultCheckedKeys: []
      }
    },
    created () {
      this.$bus.$on('closeStructureCmp', () => {
        this.showCompanyStructureCmp = false
      })
    },
    methods: {
      setCheckedNode () {
        this.$emit('select')
        this.showCompanyStructureCmp = true
      },
      handleSaveOrg (orgList) {
        if (orgList.length) {
          this.selectedList = []
          orgList.forEach(item => {
            this.selectedList.push({
              Id: item.NodeId,
              Name: item.Name
            })
          })
        }
      },
      reciveData (val) {
        this.$emit('upData')
      }
    },
    components: {
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dic-select
    margin-bottom 10px
    font-size 14px
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .div-selected
      display: inline-block
      line-height: normal
      max-width: 298px
      min-width: 298px
      min-height 28px
      border: 1px solid #d8dce5
      border-radius: 4px
      vertical-align: top
      margin-right: 5px;
</style>
