<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：时分选择
-->
<template>
    <div class="time-date-container">
      <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
      <el-time-select
        v-model="obj.DefaultValue"
        :picker-options="{
          start: '00:00',
          step: obj.TimeBreak,
          end: '24:00'
        }"
        :placeholder="obj.Tips || '选择时分'">
      </el-time-select>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
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
    computed: {
      currentType () {
        return ''
      }
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  .time-date-container
    display: flex;
    align-items: center;
    width: 300px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-date-editor
      width 200px
</style>
