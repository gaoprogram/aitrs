<!--
  User: gaol
  Date: 2019/10/08
  功能：多行输入框    controlType 为  2  
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .textarea-input-rule
    .el-textarea__inner
      max-height 200px!important
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules">
    <!-- obj：{{obj}} -->
    <div 
      class="filedContentWrap u-f-ac u-f-jst"
    >
      <div class="titWrap u-f-ac" v-show="isTitle">
        <span 
          class="tit ellipsis2"
          :style="fieldLabelStyle"
        >
        {{isTitle ? obj.DisplayName : ''}}
        <icon-svg 
          class="fieldRequiredIcon"
          v-show="!isShowing && obj.Require"
          :icon-class="RequiredSvg"
        ></icon-svg>           
        </span>
        <el-tooltip 
          v-if="obj.Tips"
          :content="obj.Tips">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>

      <el-input
        v-if="!isShowing"
        clearable
        class="textarea-input-rule fieldValueWrap u-f0"
        type="textarea"
        v-model="obj.FieldValue"
        :disabled="obj.Readonly"
        placeholder="请输入"
        :maxlength="obj.Max"
        :autosize="{ minRows: 1, maxRows: 4}"
      >
      </el-input>
      <div 
        class="fieldValueWrap showValue line-bottom u-f0" 
        v-else
      >
        <span class="ellipsis2">{{obj.FieldValue}}</span>
      </div>        
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
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
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
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
    component: {
      iconSvg
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.Require && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.DisplayName + '不能为空'))
        } else if (this.obj.FieldValue && this.obj.FieldValue.length > 3000) {
          callback(new Error('长度不能大于3000字符'))
        } 
        else if (this.obj.validate === '邮箱' && !validatEmail(this.obj.FieldValue)) {
          callback(new Error('邮箱格式不正确'))
        } else if (this.obj.validate === '手机' && !validatMobilePhone(this.obj.FieldValue)) {
          callback(new Error('手机格式不正确'))
        } else if (this.obj.validate === '电话' && !validatTel(this.obj.FieldValue)) {
          callback(new Error('电话格式不正确'))
        }
         else {
          callback()
        }
      }
      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',        
        rules: {
          required: this.obj.Require,
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


