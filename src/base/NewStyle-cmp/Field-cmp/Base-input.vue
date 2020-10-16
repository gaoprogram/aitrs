<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：pa单行输入框验证 PAcurrentComponent 中 controltype 为 1
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden">
    <!-- obj：{{obj}} -->
    <!-- prop: {{prop}} -->
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
        v-model="obj.FieldValue"
        clearable 
        size="mini" 
        placeholder="请输入"
        class="fieldValueWrap u-f0">
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
      prop: {
        type: String,
        default: ''
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
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
        debugger
        if( !this.isNeedCheck ){
          callback()
          return
        }

        console.log("this.obj.Require----", this.obj.Require)
        console.log("this.obj.FieldValue-----",this.obj.FieldValue)

        if (this.obj.Require && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.DisplayName + '不能为空'))
        } 
        // else if (this.obj.Require && this.obj.FieldValue && this.obj.FieldValue.length > 20) {
        //   callback(new Error('长度不能大于20字符'))
        // } else if (this.obj.Require && this.obj.TextType === '1' && !validatEmail(this.obj.FieldValue)) {
        //   callback(this.obj.Require && new Error('邮箱格式不正确'))
        // } else if (this.obj.Require && this.obj.TextType === '2' && !validatMobilePhone(this.obj.FieldValue)) {
        //   callback(new Error('手机格式不正确'))
        // } else if (this.obj.Require && this.obj.TextType === '3' && !validatTel(this.obj.FieldValue)) {
        //   callback(new Error('电话格式不正确'))
        // } 
        else {
          callback()
        }
      }

      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',
        rules: {
          required: true,
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

