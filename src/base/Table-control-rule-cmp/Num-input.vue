<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：数字输入框  controletype 为 3
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <!-- trObj: {{trObj}} -->
    <!-- {{trObj[0].RowNo}} -->
    <el-input 
      clearable style="width: 300px" 
      v-model="obj.FieldValue" 
      size="mini" type="number" 
      :placeholder="obj.Tips ||　'请输入'"
      @change="numChange">
    </el-input>
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
    data () {
      let validatePass = (rule, value, callback) => {
        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else if (this.obj.Required && !validatMoney(this.obj.FieldValue, this.obj.Attribute.Digit)) {
              callback(new Error(`格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
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
            callback(new Error(`格式输入不正确，且小数点后最多${this.obj.Attribute.Digit}位`))
          } else {
            callback()
          }
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
