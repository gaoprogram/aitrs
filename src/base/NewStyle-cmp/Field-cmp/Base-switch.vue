<!--
  User: gaol
  Date: 2019/6/5
  功能：switch开关     规则验证   controltype  11
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
>>>.el-form-item__label
  width 160px !important
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
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden">
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
      <el-switch
        v-if="!isShowing"
        v-model="obj.FieldValue"
        active-color="#3B8BE3"
        inactive-color="#cccccc"
        active-value="1"
        inactive-value="0"
        class="fieldValueWrap u-f0">
      </el-switch>
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
      prop: {
        type: String,
        default: ''
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
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
    component: {
      iconSvg
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }

        if (this.obj.Require) {
          callback()
        } else {
          callback()
        } 
      }
      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',         
        rules: {
          required: this.obj.Require,
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

