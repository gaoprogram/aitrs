<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：单选
-->

<template>
  <div class="radio-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <div>
      <el-radio v-model="obj.DefaultValue" label="1">备选1</el-radio>
      <el-radio v-model="obj.DefaultValue" label="2">备选2</el-radio>
    </div>
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
        selectValue: ''
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
          console.log('bbb', newValue, oldValue)
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .radio-container
    display: flex;
    align-items: center;
    width: 300px;
</style>
