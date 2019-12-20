<!--
  User: gaol
  Date: 2019/5/14
  功能：保存、取消 按钮组件
-->
<template>
  <div class="el-dialog__footer" style="text-align: center;margin-top: 30px">
    <span class="dialog-footer">
      <span v-show="cancelBtnIsShow">
        <el-button @click="cancel" v-if="isCancel">{{cancelText}}</el-button>
      </span>
      <span v-show="saveBtnIsShow">
        <el-button  v-atris-flowRuleScan="{styleBlock:'inline-block'}" type="primary" @click="save">{{saveText}}</el-button>
      </span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  // 底部保存组件
  export default {
    props: {
      isCancel: {
        type: [Boolean,String],
        default: true
      },
      cancelText: {
        type: String,
        default: '取 消'
      },
      saveText: {
        type: String,
        default: '保 存'
      },
      saveBtnIsShow: {
        type: Boolean,
        default: true
      },
      cancelBtnIsShow: {
        type: Boolean,
        default: true
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
