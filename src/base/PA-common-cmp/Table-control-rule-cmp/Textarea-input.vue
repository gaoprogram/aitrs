<!--
  User: gaol
  Date: 2019/10/08
  功能：多行输入框    controlType 为  2  
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
    <el-tooltip 
      v-if="obj.Config.Tips"
      :content="obj.Config.Tips">
      <i class="el-icon-info"></i>
    </el-tooltip>

    <el-input
      clearable
      class="textarea-input-rule"
      type="textarea"
      v-model="obj.FieldValue"
      placeholder="请输入"
      style="width: 300px"
      maxlength="3000"
      :autosize="{ minRows: 1, maxRows: obj.Config.MaxLength}"
    >
    </el-input>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
  export default {
    props: {
      //是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },      
      obj: {
        type: Object,
        default: {}
      },
      prop: {
        type: String,
        default: ''
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.Config.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.FieldName + '不能为空'))
        } else if (this.obj.FieldValue && this.obj.FieldValue.length > 3000) {
          callback(new Error('长度不能大于3000字符'))
        } else if (this.obj.TextType === '1' && !validatEmail(this.obj.FieldValue)) {
          callback(new Error('邮箱格式不正确'))
        } else if (this.obj.TextType === '2' && !validatMobilePhone(this.obj.FieldValue)) {
          callback(new Error('手机格式不正确'))
        } else if (this.obj.TextType === '3' && !validatTel(this.obj.FieldValue)) {
          callback(new Error('电话格式不正确'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          required: this.obj.Config.Required,
          validator: validatePass,
          trigger: 'blur'
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
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .textarea-input-rule
    .el-textarea__inner
      max-height 200px!important
</style>
