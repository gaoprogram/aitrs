<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：数字输入框  controletype 为 3
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
        v-model="obj.FieldValue" 
        size="mini" 
        type="number" 
        :placeholder="obj.Tips ||　'请输入'"
        @change="numChange">
      </el-input>
      <div 
        class="fieldValueWrap showValue line-bottom u-f0" 
        v-else
      >
        <span class="ellipsis2">{{obj.FieldValue}}</span>
      </div>    
    <!-- <span class="unit">{{obj.Unit === '1' ? '' : obj.Unit}}</span> -->
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validatMoney } from '@/utils/validate'
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
      },
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
        } else if (this.obj.Require && !validatMoney(this.obj.FieldValue, this.obj.Attribute.Digit)) {
          callback(new Error(`格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
        } else {
          callback()
        }
      }
      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',         
        rules: {
          required: this.obj.Require,
          fieldLabelStyle: 'color: #000000;width: 100px',
          validator: validatePass,
          trigger: 'blur'
        }
      }
    },
    created () {
    },
    methods: {
      // 发起页面中，数字输入变化后，需要触发一个事件 到时 计算公式(/table-control-rule-cmp/base=calculate.vue)的组件需要相应来自动计算值
      numChange(){
        // this.$bus.$emit('numChange',this.trObj, this.tdIndex)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
          // 发起页面中，数字输入变化后，需要触发一个事件 到时 计算公式(/table-control-rule-cmp/base=calculate.vue)的组件需要相应来自动计算值
          try{
            this.$bus.$emit('numChange',this.trObj, this.tdIndex)
          }catch(error){

          }
        },
        deep: true
      }
    }
  }
</script>

