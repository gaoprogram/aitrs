<template>
    <div class="base-date-container">
      <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
      <el-date-picker
        v-model="obj.DefaultValue"
        type="date"
        :placeholder="obj.Tips || '选择日期'">
      </el-date-picker>
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
  .base-date-container
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
    .el-input
      width 200px
</style>
