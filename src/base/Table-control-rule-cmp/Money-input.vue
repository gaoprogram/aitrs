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
    <el-input clearable style="width: 250px" v-model="obj.FieldValue" type="number" size="mini" :placeholder="obj.Tips ||　'请输入'"></el-input>
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
        if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.FieldName + '不能为空'))
        } else if (this.obj.Required && !validatMoney(this.obj.FieldValue, this.obj.Attribute.Digit)) {
          callback(new Error(`金额格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
        } else {
          callback()
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: 'blur'
        },
        unitList: []
      }
    },
    created () {
      console.log(this.obj)
      this._getUnit()
    },
    methods: {
      _getUnit () {
        getDicByKey(APP_CODE, MODULE_CODE_PA, DIC_TYPE_PA, DIC_CODE_CURRENCY).then(res => {
          if (res.data.State === REQ_OK) {
            this.unitList = res.data.Data
          }
        })
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
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
