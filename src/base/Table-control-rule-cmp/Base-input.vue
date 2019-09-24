<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：单行输入框验证
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <i 
      class="el-icon-warning-outline" 
      v-show="obj.FieldCode==='HelpUrl'"
      title="注网址需加上http">
    </i>
    <el-input clearable style="width: 300px" size="mini" v-model="obj.FieldValue" :placeholder="obj.Tips ||　'请输入'"></el-input>
    
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'

  export default {
    props: {
      sid: {
        type: Number,
        default: 0
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
        debugger
        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else if (this.obj.Required && this.obj.FieldValue && this.obj.FieldValue.length > 20) {
              callback(new Error('长度不能大于20字符'))
            } else if (this.obj.Required && this.obj.TextType === '1' && !validatEmail(this.obj.FieldValue)) {
              callback(this.obj.Required && new Error('邮箱格式不正确'))
            } else if (this.obj.Required && this.obj.TextType === '2' && !validatMobilePhone(this.obj.FieldValue)) {
              callback(new Error('手机格式不正确'))
            } else if (this.obj.Required && this.obj.TextType === '3' && !validatTel(this.obj.FieldValue)) {
              callback(new Error('电话格式不正确'))
            } else {
              callback()
            }
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else if (this.obj.Required && this.obj.FieldValue && this.obj.FieldValue.length > 20) {
            callback(new Error('长度不能大于20字符'))
          } else if (this.obj.Required && this.obj.TextType === '1' && !validatEmail(this.obj.FieldValue)) {
            callback(this.obj.Required && new Error('邮箱格式不正确'))
          } else if (this.obj.Required && this.obj.TextType === '2' && !validatMobilePhone(this.obj.FieldValue)) {
            callback(new Error('手机格式不正确'))
          } else if (this.obj.Required && this.obj.TextType === '3' && !validatTel(this.obj.FieldValue)) {
            callback(new Error('电话格式不正确'))
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: 'blur'
        }
      }
    },
    created () {
    },
    methods: {},
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
</style>
