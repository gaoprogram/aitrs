<!--
  User: xxxxxxx
  Date: 2019/5/8
  功能：表单管理——新增表单 页面
-->

<template>
  <transition name="el-zoom-in-center">
    <el-dialog
      title="表单管理"
      :visible="true"
      fullscreen
      append-to-body
      :before-close="handleClose"
      :close-on-press-escape="false"
    >
      <div class="table-edit-container">
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <!--调用 基本信息的组件-->
            <table-base-info :isFromRelationPage="isFromRelationPage"></table-base-info>
          </el-tab-pane>

          <el-tab-pane label="表单配置" v-if="!isNew">
            <!--调用 基本信息配置的组件-->            
            <table-config></table-config>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </transition>
</template>

<script type="text/ecmascript-6">
  import TableBaseInfo from './table-base-info'
  import TableConfig from './table-config'
  import { flowBaseFn } from '@/utils/mixin'
  export default {
    mixins: [flowBaseFn],
    data () {
      return {
          isFromRelationPage: false // 是否是从流程表单页面跳转过来的
      }
    },
    computed: {
      isNew () {
        return !this.$route.query.tableCode
      }
    },
    watch: {
      $route (to, from) {
        debugger
        if(from.path === '/platform/approvalFlow/flowRule/flowConfig/relationTable'){
          // 从流程配置页面跳转过来的
          this.isFromRelationPage = true
        }
      },      
    },
    methods: {
      handleClose () {
        this.$router.back()
      }
    },
    components: {
      TableBaseInfo,
      TableConfig
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .table-edit-container
    // width 1000px
    margin auto
</style>
