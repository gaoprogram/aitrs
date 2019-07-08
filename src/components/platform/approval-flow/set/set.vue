<!--
  User: gaol
  Date: 2019/7/8
  功能：审批流——设置页面
-->

<template>
    <div class="set">
        这是设置页面
    </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    todolist,
    batchSend,
    batchRefuse
  } from '@/api/approve'
//   import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
//   import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
//   import SearchCmp from '../search-cmp/search-cmp'
//   import AitrsEditor from '@/base/editor/aitrs-editor'
  import { flowCommonFn } from '@/utils/mixin'

  export default {
    // 引用的mixin中的 flowCommonFn 方法进行 查看，取消挂起，获取form 表单数据等
    // mixins: [flowCommonFn],
    components: {
    //   SearchCmp,
    //   tabRouter,
    //   rightFixed,
    //   AitrsEditor
    },
    data () {
      return {
       
      }
    },
    created () {

    },
    methods: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/css/mixin.styl"

</style>