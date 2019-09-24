<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <el-date-picker
      size="mini"
      style="width: 300px"
      v-model="obj.FieldValue"
      :type="obj.Format || 'date'"
      value-format="timestamp"
      :format="initDate"
      :placeholder="obj.Tips || '选择日期'">
    </el-date-picker>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
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
        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
              callback(new Error('请选择' + this.obj.FieldName))
            } else {
              callback()
            }         
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: ['change', 'blur']
        }
      }
    },
    computed: {
      initDate () {
        switch (this.obj.Format) {
          case 'week':
            return 'yyyy 第 WW 周'
          default:
            return ''
        }
      }
    },
    created () {
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
  .base-date-container
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
