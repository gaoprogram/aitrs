<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示相关流程
-->

<template>
  <div :class="['relatedProcess-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    这是 显示 相关流程的 页面  nodeId: {{nodeId}}
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
      }, 
      nodeId: {
        type: [String,Number],
        default: ''
      }     
    },
    data () {
      return {

      }
    },
    components: {
 
    },    
    created () {
      // 获取相关流程
      this._showRelatedFlow()
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .relatedProcess-container
    min-height 350px
  
</style>
