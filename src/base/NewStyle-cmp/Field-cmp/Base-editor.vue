<!--
  User: gaol
  Date: 2019/10/08
  功能：编辑器   ControlType:  23
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 0 !important;
    .ql-bold {
      width: 24px !important;
    }
    .ql-header {
      height: 100% !important;
    }
  }
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    >
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
      <!-- obj: {{obj}} -->
      <aitrs-editor
        v-if="!obj.Hidden"
        ref="aitrsEditor"
        @editor="changeContent"
        :content="obj.FieldValue"
        :isShowImg="isShowImg"
        :placeholder="obj.Tips"
        :obj.sync="obj"
        class="fieldValueWrap u-f0"
      >
      </aitrs-editor>      
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'  
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
      prop: {
        type: String,
        default: ''
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },        
      isTitle: {
        type: Boolean,
        default: true
      },
    },
    components: {
      AitrsEditor,
      iconSvg
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if (this.obj.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.DisplayName + '不能为空'))
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
          trigger: 'change'
        },
        isShowImg: false,
      }
    },
    computed: {
      showEdit () {
        return !this.obj.Hidden 
      }
    },
    created () {
      console.log('新建')
      // setTimeout(() => {
      //   this.showEdit = !this.obj.Hidden 
      // }, 1000)
    },
    methods: {
      changeContent (val) {
        this.obj.FieldValue = val
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

