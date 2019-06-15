<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：拒绝
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <aitrs-editor
      ref="aitrsEditor"
      @editor="changeContent"
      :content="value"
      :isShowImg=false
      placeholder="请输入处理意见"
    >
    </aitrs-editor>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_refuse()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    refuse
  } from '@/api/approve'
  import AitrsEditor from '@/base/editor/aitrs-editor'
  export default {
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      flow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        value: '',
        loading: false
      }
    },
    methods: {
      // 拒绝
      _refuse () {
        this.loading = true
        refuse(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.value).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.dialogVisible = false
            this.$message.success('操作成功')
            this.$emit('success')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('操作失败')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      },
      changeContent (val) {
        this.value = val
      }
    },
    components: {
      AitrsEditor
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-component-container
    .footer
      display block
      margin-top 20px
      text-align center
</style>
