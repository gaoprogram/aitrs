<!--
  User: gaol
  Date: 2019/10/08
  功能：时间区间  controlType 为 8 
-->
<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
    <el-date-picker
      size="mini"
      v-model="obj.FieldValue"
      type="daterange"
      value-format="timestamp"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
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
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.Config.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          // callback(new Error(this.obj.FieldName + '不能为空'))
          callback()
        } else {
          callback()
        }  
      }
      return {
        rules: {
          required: this.obj.Config.Required,
          validator: validatePass,
          trigger: 'blur'
        }
      }
    },
    created () {
      // if (this.obj.FieldValue && this.obj.FieldValue.length) {
      //   this.obj.FieldValue = this.obj.FieldValue.map(i => {
      //     return this.replaceTime(i)
      //   })
      // }
    },
    methods: {
      replaceTime (time) {
        let endTime = time.replace('/Date(', '')
        endTime = endTime.replace(')/', '')
        return parseInt(endTime)
      }
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

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
