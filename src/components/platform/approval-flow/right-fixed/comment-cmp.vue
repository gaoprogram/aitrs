<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：评论
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <el-input v-model="value" placeholder="请输入内容" type="textarea"></el-input>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_addComment()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    addComment
  } from '@/api/approve'
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
      // 评论--ok
      _addComment () {
        this.loading = true
        addComment(this.flow.WorkId, this.value).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$emit('success')
            this.$message.success('评论成功')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('评论失败')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      }
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
