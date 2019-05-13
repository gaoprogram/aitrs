<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：单行输入框
-->

<template>
  <div class="base-input-container">
    <el-form-item :label="title" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <el-input v-model="obj.DefaultValue" :placeholder="obj.Tips ||　'请输入'" @blur="changeValue"></el-input>
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
        default: '单行输入框'
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
      changeValue () {
        console.log(this.obj)
        // this.$emit('commonValue', Object.assign({}, this.obj, { EndValue: this.selectValue }, { Sid: this.sid }))
      }
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
