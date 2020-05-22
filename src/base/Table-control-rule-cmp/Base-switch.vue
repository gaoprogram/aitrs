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
    v-if="!obj.Hidden"
  >

  <!-- obj.FieldValue： {{obj.FieldValue}}
  ----
  obj: {{obj}} -->
  <!-- prop: {{prop}} -->
    <el-switch
      v-model="obj.FieldValue"
      active-color="#3B8BE3"
      inactive-color="#cccccc">
    </el-switch>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      prop: {
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
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {

        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required) {
              callback()
            } else {
              callback()
            } 
          }else {
            callback()
          }
        }else {
          if (this.obj.Required) {
            callback()
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: ['change']
        }
      }
    },
    created () {
      this.$nextTick(() => {
        // 初始时 默认为否
        if(this.obj.FieldValue){
          this.obj.FieldValue = true
        }else {
          this.obj.FieldValue = false
        }
      })
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
