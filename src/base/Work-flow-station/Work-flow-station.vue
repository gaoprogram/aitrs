<!--
  User: xxxxxxx
  Date: 2018/11/23
  功能：审批流选择岗位组件
-->

<template>
  <div class="common-select-emp-container">
    <div class="dic-select el-select" style="display: block">
      <span>{{title}}：</span>
      <div class="div-selected">
        <span class="el-tag el-tag--info el-tag--small" v-for="(item, index) in selectedPosList" :key="item.PositionId">
          <span class="el-select__tags-text">{{ item.PositionName }}</span>
          <!--<i class="el-tag__close el-icon-close" @click="delOrgItem(base-info, item)"></i>-->
        </span>
      </div>
      <el-button type="primary"
                 @click.native.prevent="addStation()"
      >
        <i class="el-icon-plus"></i>
      </el-button>
    </div>

    <div v-if="posVisible">
      <select-station
        @cancelPosition="posVisible = false"
        :title="title"
        @surePosition="childSurePos"></select-station>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SelectStation from './Select-station'
  export default {
    props: {
      title: {
        type: String,
        default: '选择岗位'
      },
      selectedPosList: {
        type: Array,
        default: () => {
          return []
        }
      },
      stationType: {
        type: String,
        default: '2'
      }
    },
    data () {
      return {
        posVisible: false
      }
    },
    methods: {
      addStation () {
        this.posVisible = true
      },
      childSurePos (poslist) {
        // 选择岗位确认
        this.$emit('surePos', poslist)
        this.posVisible = false
      }
    },
    components: {
      SelectStation
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
