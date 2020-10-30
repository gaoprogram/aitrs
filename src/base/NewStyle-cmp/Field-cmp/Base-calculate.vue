<!--
  User: gaol
  Date: 2019/8/06
  功能：计算公式  controletype 为 16 
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
      <!-- trObj: {{trObj}}------ -->
      <!-- {{obj.CalculateRule}}:--{{totalValue}}--------rowIdx:{{rowIdx}}---moneyIdx:{{moneyIdx}} -->
      <!-- {{obj.CalculateRule}}  =   {{totalValue}} -->
      {{obj.CalculateRule}}  =   {{obj.FieldValue || '无'}}
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
  export default {
    props: {
      // 是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },      
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
      },
      trObj: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    component: {
      iconSvg
    },
    data () {
      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',
        rules: {
          required: false
        },
        totalValue: this.obj.CalculateRule, // 结算的结果值
        rowIdx: '',
        moneyIdx: '',
      }
    },
    created () {
    },
    beforeDestroy () {
      // 销毁
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


