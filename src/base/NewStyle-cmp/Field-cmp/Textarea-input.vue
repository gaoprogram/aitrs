<!--
  User: gaol
  Date: 2019/10/08
  功能：多行输入框    controlType 为  2  
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .textarea-input-rule
    .el-textarea__inner
      max-height 200px!important
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="isShowField">
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
          <el-tooltip 
            v-if="obj.Description"
            :content="obj.Description">
            <i class="el-icon-info"></i>
          </el-tooltip>                  
        </span>
      </div>

      <div v-if="!isShowing" class="fieldValueWrap u-f0">      
        <el-input
          v-if="!isShowing"
          clearable
          class="textarea-input-rule fieldValue"
          v-model="obj.FieldValue"
          :disabled="obj.Readonly || !isHasAddOrEditAuth()" 
          :type="isPassWordField? 'password':'textarea'"  
          :placeholder="obj.ActRemind || '请输入'"
          :maxlength="obj.Max"
          :autosize="{ minRows: 1, maxRows: 4}"
        >
        </el-input>
      </div>

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
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
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
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },       
      prop: {
        type: String,
        default: ''
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      // 是否是直接显示 还是 新增或者编辑  这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },         
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
        
        if (this.obj.Require && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.DisplayName + '不能为空'))
        } else if (this.obj.FieldValue && this.obj.FieldValue.length > 3000) {
          callback(new Error('长度不能大于3000字符'))
        } 
        else if (this.obj.ValidData === '邮箱' && !validatEmail(this.obj.FieldValue)) {
          callback(new Error('邮箱格式不正确'))
        } else if (this.obj.ValidData === '手机' && !validatMobilePhone(this.obj.FieldValue)) {
          callback(new Error('手机格式不正确'))
        } else if (this.obj.ValidData === '电话' && !validatTel(this.obj.FieldValue)) {
          callback(new Error('电话格式不正确'))
        }
         else {
          callback()
        }
      }
      return {
        resAuth: {
          "scanViewEncry": 0,  // 查看视图是否加密   1 和 0 区分
          "addorEditViewEdit": 1,  // 新增/编辑视图是否可编辑   1 和 0 区分
          "scanViewShow": 1,  // 查看视图是否可见   1 和 0 区分
          "editViewShow": 1,  // 编辑视图是否可见   1 和 0 区分
          "addViewShow": 1,  // 新增视图是否   1 和 0 区分          
        },        
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',        
        rules: {
          required: this.obj.Require,
          validator: validatePass,
          trigger: 'blur'
        }
      }
    },
    computed: {
      // 是否显示字段
      isShowField(){
        // {
        //   "scanViewEncry": str.split("")[4],  // 查看视图是否加密   1 和 0 区分
        //   "addorEditViewEdit": str.split("")[3],  // 新增/编辑视图是否可编辑   1 和 0 区分
        //   "scanViewShow": str.split("")[2],  // 查看视图是否可见   1 和 0 区分
        //   "editViewShow": str.split("")[1],  // 编辑视图是否可见   1 和 0 区分
        //   "addViewShow": str.split("")[0],  // 新增视图是否   1 和 0 区分
        // }

        // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
        switch(this.viewType){
          case 'View-TM':  //查看页面 
          case 'View-SH':
          case  '3001':
            this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
            return true
          case  'Add-TM':  // 新增页面
          case  'Add-SH':  
          case  '3002':
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          case  'Edit-TM': // 编辑页面
          case  'Edit-SH': 
          case  '3003': 
          case  '3005': 
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
              // debugger
              // alert(222222)
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          default:
            this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
            // 默认情况下 都显示字段
            return true
        }
      }, 
      // 是否加密显示字段
      isPassWordField(){
        return this.resAuth.scanViewEncry == 1 ? true: false
      }
    },    
    created () {
    },
    methods: {
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },       
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


