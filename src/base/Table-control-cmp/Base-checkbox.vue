<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：多选
-->

<template>
  <div class="base-checkbox-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <el-checkbox-group v-model="obj.DefaultValue">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .base-checkbox-container
    display: flex;
    align-items: center;
    width: 300px;
</style>
