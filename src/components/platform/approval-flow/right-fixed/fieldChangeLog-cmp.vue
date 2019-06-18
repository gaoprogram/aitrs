<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示表单变更日志
-->

<template>
  <div :class="['fieldChangeLog-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    这是 显示 表单变更日志 的 页面
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    cc
  } from '@/api/approve'
  import { flowCommonFnRightFixed } from '@/utils/mixin'
  export default {
    mixins: [flowCommonFnRightFixed],
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      }      
    },
    data () {
      return {
        doc: '',
        loading: false,
        empList: [],
        emps: [],
        depts: [],
        stations: []
      }
    },
    components: {
    },    
    created () {
      //获取表单变更日志
      this._showFormChangeLog()      
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .fieldChangeLog-container
    min-height 350px
</style>
