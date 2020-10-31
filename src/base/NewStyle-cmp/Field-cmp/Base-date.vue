<!--
  User: gaol
  Date: 2019/10/08
  功能：日期  controlType  7
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
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

      <el-date-picker
        v-if="!isShowing"
        size="mini"
        style="width: 300px"
        v-model="obj.FieldValue"
        type="date"
        :format="initDate"
        class="fieldValueWrap u-f0"
        value-format="timestamp"
        placeholder="选择日期">
      </el-date-picker>
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
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
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
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
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
    component: {
      iconSvg
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }

        if (this.obj.Require && this.obj.FieldValue && !this.obj.FieldValue) {
          callback(new Error('请选择' + this.obj.DisplayName))
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

        if(this.obj.Attribute){
          switch(this.obj.Attribute){
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

