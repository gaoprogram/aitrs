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
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.UserName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateTime"
        sortable
        label="创建日期">
        <template slot-scope="scope">
          <span>{{scope.row.CreateTime | replaceTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button sizi="mini" type="text" :disabled="!form.FunctionRole.AttachmentCanDelete"  @click="deleteAppendix(scope.row)">删除</el-button>
        </template>
      </el-table-column>      
    </el-table>    
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    cc,
    DeleteAttachment
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
      _deleteAppendix(item) {
        debugger
        this.containerLoading = true   
        // WorkId 为数字，有的会非常大 超出了 js 的数字范围 所以将其转化为 字符串类型
        let WorkId = item.WorkId || "" 
        WorkId = WorkId.toString()
        console.log(typeof WorkId)           
        DeleteAttachment(item.AttachmentId, WorkId, item.NodeId, item.FieldCode, item.TableCode).then((res) => {
          debugger    
          this.containerLoading = false   
          if (res.data.State === REQ_OK) {
            // let arr = (list, item) => {
            //   let newArr = arr.filter((i) => {
            //     return i.AttachmentId !== item.AttachmentId
            //   })
            //   return newArr
            // }
            debugger
            // this.$store.dispatch('addFlowAlreadyUploadFile', arr)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 删除成功后 刷新列表
            this._showAttachment()
          } else {
            this.$message({
              type: 'error',
              message: `删除失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      },
      // 删除附件
      deleteAppendix(obj) {
        debugger
        this.$confirm("确定要删除此附件吗?","提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          // store 中进行删除
          // this.$store.dispatch("delFlowAlreadyUploadFile", obj)
          this._deleteAppendix(obj)
        }).catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
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
