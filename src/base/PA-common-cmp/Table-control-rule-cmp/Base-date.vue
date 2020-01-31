<!--
  User: gaol
  Date: 2019/10/08
  功能：日期  controlType  7
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
  <!-- obj: {{obj}} -->
  <!-- obj.FieldValue: {{obj.FieldValue}}
  ---- -->
  <!-- obj.Config.Attribute: {{obj.Config.Attribute}} -->
    <el-tooltip 
      v-if="obj.Config.Tips"
      :content="obj.Config.Tips"
      effect="dark">
      <i class="el-icon-info"></i>
    </el-tooltip>

    <el-date-picker
      size="mini"
      style="width: 300px"
      v-model="obj.FieldValue"
      type="date"
      :format="initDate"
      value-format="timestamp"
      placeholder="选择日期">
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

        if (this.obj.Config.Required && this.obj.FieldValue && !this.obj.FieldValue) {
          callback(new Error('请选择' + this.obj.FieldName))
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
    computed: {
      // 将时间转化为 时间戳的格式
      initDate () {
        // switch (this.obj.Config.Attribute) {
        //   case 'yyyy-MM-dd':
        //     return 'date'
        //   default:
        //     return ''
        // }
      }
    },
    created () {
      this.$nextTick(() => {
        // 将时间转化给 时间戳格式
        if(this.obj.FieldValue){
          var date = new Date(this.obj.FieldValue);
          // 有三种方式获取
          this.obj.FieldValue = date.getTime();
          // var time2 = date.valueOf();
          // var time3 = Date.parse(date);
          // console.log(time1);//1398250549123
          // console.log(time2);//1398250549123
          // console.log(time3);//1398250549000    
        }   

        if(this.obj.Config.Attribute){
          switch(this.obj.Config.Attribute){
            case 'yyyy-MM-dd':
              return 'date'
            default:
              return 'date'
          }
        }
      })
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
