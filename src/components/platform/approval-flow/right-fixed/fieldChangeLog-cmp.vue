<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示表单变更日志
-->

<template>
  <div class="fieldChangeLog-container" v-loading="loading">
    这是 显示 表单变更日志 的 页面
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    cc
  } from '@/api/approve'
  export default {
    props: {
      rightContentCurrentStr: {
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
    min-height 400px
</style>
