<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：同意提交弹窗组件
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <aitrs-editor
      ref="aitrsEditor"
      @editor="changeContent"
      :content="value"
      :isShowImg=false
      placeholder="请输入提交意见"
    >
    </aitrs-editor>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="handleSure()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    send
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
        value: '', // 编辑器中的 提交 内容
        loading: false
      }
    },
    created () {
      console.log(this.form)
    },
    methods: {
      // 提交
      _send () {
        return send(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.value)
      },
      // 确定同意
      handleSure () {
        this.loading = true
        Promise.all([
          this._send()
        ]).then(([workResp]) => {
          this.loading = false
          if (workResp.data.State === REQ_OK) {
            this.$message.success('提交成功')
            this.$emit('success')
          } else {
            this.$message.error(workResp.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('提交失败，请重试')
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
