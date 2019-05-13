<template>
  <div class="el-dialog__footer" style="text-align: center;margin-top: 30px">
    <span class="dialog-footer">
      <el-button @click="cancel" v-if="isCancel">{{cancelText}}</el-button>
      <el-button type="primary" @click="save">{{saveText}}</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  // 底部保存组件
  export default {
    props: {
      isCancel: {
        type: Boolean,
        default: true
      },
      cancelText: {
        type: String,
        default: '取 消'
      },
      saveText: {
        type: String,
        default: '保 存'
      }
    },
    methods: {
      save () {
        this.$emit('save')
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
