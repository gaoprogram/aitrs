<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：公司内联系人 19
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .flex-div
    display flex
    align-items: center
    min-height 40px
    .div-selected
      display: inline-block
      margin-right 5px
      line-height: normal
      width: 300px
      min-height 28px
      border: 1px solid #d8dce5
      border-radius: 4px
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
        </span>
        <el-tooltip 
          v-if="obj.Tips"
          :content="obj.Tips">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>

      <company-structure-cmp
        v-if="!isShowing"
        :isTitle="false"
        title="抄送人员"
        :tabType="['renyuan']"
        :selectedList="obj.FieldValue"
        @upData="updata"
      ></company-structure-cmp>
      <div 
        class="fieldValueWrap showValue line-bottom u-f0" 
        v-else
      >
        <span
          v-for="(item, key) in obj.FieldValue" 
          :key="key"
          style="margin-right:10px"
        >
          {{item.Name}}
        </span>
      </div>         
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
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
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      // 是否是直接显示 还是 新增或者编辑 这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },        
    },
    components: {
      CompanyStructureCmp,
      iconSvg
    },    
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && !this.obj.FieldValue.length) {
              callback(new Error('请选择' + this.obj.DisplayName))
            } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.length > this.obj.MaxLength) {
              callback(new Error(`${this.obj.DisplayName}最多选择${this.obj.MaxLength}个`))
            } else {
              callback()
            }        
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && !this.obj.FieldValue.length) {
            callback(new Error('请选择' + this.obj.DisplayName))
          } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.length > this.obj.MaxLength) {
            callback(new Error(`${this.obj.DisplayName}最多选择${this.obj.MaxLength}个`))
          } else {
            callback()
          }
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
          type: 'array',
          validator: validatePass,
          trigger: 'change'
        },
        empVisible: false,
        checkedOrgTree: [],
        defaultCheckedKeys: []
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
          case 'View-TM':
          case 'View-SH':
            return true
          case  'Add-TM':  // 新增页面
          case  'Add-SH':  
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr))
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          case  '': // 编辑页面
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr))
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          default:
            // 默认情况下 都显示字段
            return true
        }
      },      
    },    
    created () {
      if (!this.obj.FieldValue) {
        this.obj.FieldValue = []
      }
    },
    mounted () {
    },
    methods: {
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      }, 
      updata (val) {
        debugger
        if (val.length) {
          let addEmpArr = val.map(item => {
            return {
              Id: item.EmpId,
              Name: item.EmpName
            }
          })

          this.obj.FieldValue = this.obj.FieldValue.concat(addEmpArr)
          // 去重
          let newArr = []
          if (this.obj.FieldValue && this.obj.FieldValue.length) {
            this.obj.FieldValue.forEach((item,key) => {
              if(item.Id){
                newArr.push(item.Id)
              }else {
                this.obj.FieldValue.splice(key,1)
              }
            })
          }

          if (newArr.length && newArr.length >= 2) {
            for (let i = 0; i < newArr.length; i++) {
              if (newArr.indexOf(newArr[i]) !== i) {
                newArr.splice(i, 1)
                this.obj.FieldValue.splice(i, 1)
                --i
              }
            }
          }
        } else {
          // this.obj.FieldValue = []
        }
        this.$emit('changeEmp', this.prop)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (!this.obj.FieldValue) {
            this.obj.FieldValue = []
          }
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    }
  }
</script>

