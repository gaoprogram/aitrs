<!--
  User: gaol
  Date: 2019/6/13
  功能：金额输入框  controlType 为 4   金额输入框控件
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <span>{{changeUnit}}</span>
    <el-input 
      clearable 
      style="width: 250px" 
      v-model="obj.FieldValue" 
      type="number" size="mini" 
      :placeholder="obj.Tips ||　'请输入'"
      @input="moneyChange">
    </el-input>
    <div style="line-height: 20px" v-if="this.obj.Attribute.AutoCapital">{{changeToChinese}}</div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatMoney } from '@/utils/validate'
  import ArabiaToChinese from '@/utils/arabiaToChinese'
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  const APP_CODE = 'SYS' // 业务领域
  const MODULE_CODE_PA = 'PA' // 模块类型-PA
  const DIC_TYPE_PA = 'PA' // 字典类型 -PA
  const DIC_CODE_CURRENCY = 'Currency' // Currency--币种
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
      },
      trObj: {
        type: Array,
        default: () => {
          return []
        }
      },
      tdIndex: {
        type: [String,Number],
        default: ''
      },
      trIndex: {
        type: [String, Number],
        default: ''
      }            
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
        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else if (this.obj.Required && !validatMoney(this.obj.FieldValue, this.obj.Attribute.Digit)) {
              callback(new Error(`金额格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
            } else {
              callback()
            } 
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else if (this.obj.Required && !validatMoney(this.obj.FieldValue, this.obj.Attribute.Digit)) {
            callback(new Error(`金额格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
