<!--
  User: gaol
  Date: 2019/6/13
  功能：金额输入框  controlType 为 4   金额输入框控件
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
      <div 
        v-if="!isShowing"
        class="fieldValueWrap u-f0">
        <el-input 
          clearable 
          style="width: 220px" 
          v-model="obj.FieldValue" 
          type="number" size="mini" 
          :placeholder="obj.Tips ||　'请输入'"
          @input="moneyChange">
        </el-input>
        <div 
          style="line-height: 20px" 
          v-if="this.obj.Attribute.AutoCapital"
        >{{changeToChinese}}</div>
      </div>
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
  import { validatEmail, validatMobilePhone, validatTel, validatMoney } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
  import ArabiaToChinese from '@/utils/arabiaToChinese'
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  const APP_CODE = 'SYS' // 业务领域
  const MODULE_CODE_PA = 'PA' // 模块类型-PA
  const DIC_TYPE_PA = 'PA' // 字典类型 -PA
  const DIC_CODE_CURRENCY = 'Currency' // Currency--币种
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
    computed: {
      changeUnit () {
        let unit = this.unitList.filter(i => {
          return i.Code === this.obj.Unit
        })
        if (unit && unit.length) {
          return unit[0].Name
        }
      },
      changeToChinese () {
        return ArabiaToChinese(this.obj.FieldValue)
      }
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
          callback(new Error(`金额格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
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
          trigger: ['blur', 'change']
        },
        unitList: []
      }
    },
    created () {
      // console.log(this.obj)
      this._getUnit()
    },
    methods: {
      _getUnit () {
        getDicByKey(APP_CODE, MODULE_CODE_PA, DIC_TYPE_PA, DIC_CODE_CURRENCY).then(res => {
          if (res.data.State === REQ_OK) {
            this.unitList = res.data.Data
          }
        })
      },
      // 发起页面中明细表行 中的金额输入框输入值变化后，触发 改行 计算公式(/table-control-rule-cmp/base=calculate.vue)中的值变化
      moneyChange () {
        // this.$bus.$emit('moneyChange', this.trObj, this.tdIndex)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)

          // 发起页面中明细表行 中的金额输入框输入值变化后，触发 改行 计算公式(/table-control-rule-cmp/base=calculate.vue)中的值变化
          this.$bus.$emit('moneyChange', this.trObj, this.tdIndex)
        },
        deep: true
      },
      'obj.TableCode': {
        handler (newValue, oldValue) {
          this._getUnit()
        },
        deep: true
      }
    }
  }
</script>

