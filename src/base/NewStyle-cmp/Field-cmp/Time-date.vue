<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：时分选择   controlType  9
-->
<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
    <el-tooltip 
      v-if="obj.Config.Tips"
      :content="obj.Config.Tips">
      <i class="el-icon-info"></i>
    </el-tooltip>

    <el-time-select
      size="mini"
      style="width: 300px;"
      class="time-select"
      v-model="obj.FieldValue"
      :picker-options="{
        start: '00:00',
        step: obj.Config.TimeBreak,
        end: '24:00'
      }"
      placeholder="选择时分">
    </el-time-select>
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
          trigger: ['change', 'blur']
        }
      }
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  .time-date-container
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
      text-overflow: ellipsis
    .time-select
      width 200px!important
</style>
