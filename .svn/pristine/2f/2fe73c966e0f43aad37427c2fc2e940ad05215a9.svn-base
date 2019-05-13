<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：数字输入框
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <el-input clearable style="width: 300px" v-model="obj.FieldValue" size="mini" type="number" :placeholder="obj.Tips ||　'请输入'"></el-input>
    <span class="unit">{{obj.Unit === '1' ? '' : obj.Unit}}</span>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatMoney } from '@/utils/validate'
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
        if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.FieldName + '不能为空'))
        } else if (this.obj.Required && !validatMoney(this.obj.FieldValue, this.obj.Attribute.Digit)) {
          callback(new Error(`格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
        } else {
          callback()
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
