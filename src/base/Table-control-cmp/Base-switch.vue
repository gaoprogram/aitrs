<!--
  User: gaol
  Date: 2019/6/5
  功能：switch开关        
-->

<template>
  <div class="base-input-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
      <!-- obj.DefaultValue: {{obj.DefaultValue}} -->
    <el-switch
      v-model="obj.DefaultValue"
      active-color="#3B8BE3"
      inactive-color="#cccccc">
    </el-switch>
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
  .base-input-container
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
