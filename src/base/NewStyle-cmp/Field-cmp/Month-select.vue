<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：月份选择  controltype 为 10
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .month-select-container
    display: flex;
    align-items: center;
    width 300px
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-select
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
      <el-select  
        v-if="!isShowing"
        v-model="obj.FieldValue"
        clearable
        class="fieldValueWrap u-f0"
        size="mini"
        placeholder="选择日期"
      >
        <el-option
          v-for="item in data"
          :key="item.code"
          :label="item.value"
          :value="item.code">
        </el-option>
      </el-select>
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
      orderProp: {
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
        
        if (this.obj.Require && (!this.obj.FieldValue.length)) {
          callback(new Error('请选择' + this.obj.DisplayName))
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
        },
        data: [
          {
            value: '一月',
            code: '1'
          },
          {
            value: '二月',
            code: '2'
          },
          {
            value: '三月',
            code: '3'
          },
          {
            value: '四月',
            code: '4'
          },
          {
            value: '五月',
            code: '5'
          },
          {
            value: '六月',
            code: '6'
          },
          {
            value: '七月',
            code: '7'
          },
          {
            value: '八月',
            code: '8'
          },
          {
            value: '九月',
            code: '9'
          },
          {
            value: '十月',
            code: '10'
          },
          {
            value: '十一月',
            code: '11'
          },
          {
            value: '十二月',
            code: '12'
          }
        ]
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

