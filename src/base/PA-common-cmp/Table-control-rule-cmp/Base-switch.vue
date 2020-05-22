<!--
  User: gaol
  Date: 2019/6/5
  功能：switch开关     规则验证   controltype  11
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >

  <!-- obj.FieldValue： {{obj.FieldValue}} -->
  <!-- obj: {{obj}} -->
    <el-switch
      v-model="obj.FieldValue"
      active-color="#3B8BE3"
      inactive-color="#cccccc"
      active-value="1"
      inactive-value="0">
    </el-switch>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      //是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },      
      prop: {
        type: String,
        default: ''
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: false
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }

        if (this.obj.Config.Required) {
          callback()
        } else {
          callback()
        } 
      }
      return {
        rules: {
          required: this.obj.Config.Required,
          validator: validatePass,
          trigger: ['change']
        }
      }
    },
    created () {

    },
    methods: {
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          debugger
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .base-switch-container
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
>>>.el-form-item__label
      width 160px !important
</style>
