<!--
  User: gaol
  Date: 2019/6/17
  功能： 显示相关附件
-->

<template>
  <div :class="['appendix-container', !mixinsDataRes.length? 'not_found': '']" v-loading="containerLoading">
    <!-- 这是 显示附件 的页面   -->
    <!-- $attrs: {{$attrs}} -->
    <!-- rightContentCurrentStr: {{rightContentCurrentStr}} -->
    <!-- mixinsDataRes: {{mixinsDataRes}} -->
    <!-- form: {{form}} -->
    <el-table
      :data="mixinsDataRes"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      empty-text=" ">
      <el-table-column
        prop="Name"
        label="资源名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        label="创建人"
        sortable
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.UserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        sortable
        label="创建日期"
        width="250">
        <template slot-scope="scope">
          <span>{{scope.row.CreateTime | replaceTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- scope.row.UserNo: {{scope.row.UserNo}}   ---userCode: {{userCode}} -->
          <el-button v-if="scope.row.UserNo == userCode" sizi="mini" type="text" :disabled="!form.FunctionRole.AttachmentCanDelete"  @click="_deleteAppendix(scope.row)">删除</el-button>
          <a :href="scope.row.Url" target="_blank"><el-button sizi="mini" type="text" @click="downAppendix(scope.row)">下载</el-button></a>
        </template>
      </el-table-column>      
    </el-table>    
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
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {

      }
    },
    components: {
 
    },    
    created () {
      // 获取相关附件
      this._showAttachment() 
      // this.$bus.$on('refreshAttachment',() => {
      //   this._showAttachment()
      // })     
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },   
    watch:{
      form: {
        handler (newValue, oldValue) {
            debugger
            if(newValue){
              // form 表单变化后 需要重新获取 相关附件
              this._showAttachment() 
            }
        },
        deep: true
      }    
    }, 
    methods: {    
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      // 查看相关附件
      downAppendix(obj){
        // 查看下载附件
        debugger
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .appendix-container
    min-height 200px
    >>>.el-table::before
        height 0 !important
</style>
