<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：月份选择
-->

<template>
  <div class="month-select-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <el-select
      v-model="obj.DefaultValue"
      :placeholder="obj.Tips || '选择日期'"
    >
      <el-option
        v-for="item in data"
        :key="item.code"
        :label="item.value"
        :value="item.code">
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
        data: [
          {
            value: '一月',
            code: 1
          },
          {
            value: '二月',
            code: 2
          },
          {
            value: '三月',
            code: 3
          },
          {
            value: '四月',
            code: 4
          },
          {
            value: '五月',
            code: 5
          },
          {
            value: '六月',
            code: 6
          },
          {
            value: '七月',
            code: 7
          },
          {
            value: '八月',
            code: 8
          },
          {
            value: '九月',
            code: 9
          },
          {
            value: '十月',
            code: 10
          },
          {
            value: '十一月',
            code: 11
          },
          {
            value: '十二月',
            code: 12
          }
        ]
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
  .month-select-container
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
