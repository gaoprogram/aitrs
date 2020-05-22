<!--
  User: xxxxxxx
  Date: 2018/10/24
  功能：输入框弹窗
-->

<template>
  <el-dialog
    :title="title"
    :visible="true"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    append-to-body
  >
    <el-input v-model="value" placeholder="请输入内容" type="textarea"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="handleSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        value: ''
      }
    },
    methods: {
      handleSure () {
        this.$emit('DialogInputSure', this.value)
      },
      handleCancel () {
        this.$emit('DialogInputCancel')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
