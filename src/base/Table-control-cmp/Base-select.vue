<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：单选下拉框设置部分的基础组件
-->

<template>
  <div class="base-select-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <el-select
      v-model="obj.DefaultValue"
      :placeholder="obj.Tips ||　'请选择'"
    >
      <el-option
        v-for="item in data"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
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
        selectValue: [],
        data: []
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
  .base-select-container
    display: flex;
    align-items: center;
    width 300px
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-select
      width 200px
</style>
