<!--
  User: gaol
  Date: 2019/6/13
  功能：金额输入框  controlType 为 4   金额输入框控件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
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

      <div 
        v-if="!isShowing"
        class="fieldValueWrap u-f0">
        <el-input 
          clearable 
          class="fieldValue"
          :disabled="obj.Readonly || !isHasAddOrEditAuth()"          
          v-model="obj.FieldValue" 
          size="mini" 
          :type="isPassWordField? 'password':'number'"
          :placeholder="obj.ActRemind ||　'请输入'"
          @input="moneyChange">
        </el-input>
        <div 
          style="line-height: 20px" 
          v-if="this.obj.AutoCapital"
        >{{changeToChinese}}</div>
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
  import { validatEmail, validatMobilePhone, validatTel, validatMoney, validateViewAuth } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
  import ArabiaToChinese from '@/utils/arabiaToChinese'
  import { REQ_OK } from '@/api/config'
  import { newStyleGetDicByKey } from '@/api/dic'
  const APP_CODE = 'SYS' // 业务领域
  const MODULE_CODE_PA = 'PA' // 模块类型-PA
  const DIC_TYPE_PA = 'PA' // 字典类型 -PA
  const DIC_CODE_CURRENCY = 'Currency' // Currency--币种
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
      },           
      changeUnit () {
        let unit = this.unitList.filter(i => {
          return i.Code === this.obj.Unit
        })
        if (unit && unit.length) {
          return unit[0].Name
        }
      },
      changeToChinese () {
        return ArabiaToChinese(this.obj.FieldValue)
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ) {
          callback()
          return
        }

        if (this.obj.Require && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
          callback(new Error(this.obj.DisplayName + '不能为空'))
        } else if (this.obj.Require && !validatMoney(this.obj.FieldValue, this.obj.Digit)) {
          callback(new Error(`金额格式输入不正确，且小数点后最多${this.obj.Digit}位`))
        } else {
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
          trigger: ['blur', 'change']
        },
        unitList: []
      }
    },
    created () {
      // console.log(this.obj)
      this._getUnit()
    },
    methods: {
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },            
      _getUnit () {
        newStyleGetDicByKey(this.obj.Dstype, this.obj.DataSource).then(res => {
          if (res.data.State === REQ_OK) {
            this.unitList = res.data.Data
          }
        })
      },
      // 发起页面中明细表行 中的金额输入框输入值变化后，触发 改行 计算公式(/table-control-rule-cmp/base=calculate.vue)中的值变化
      moneyChange () {
        // this.$bus.$emit('moneyChange', this.trObj, this.tdIndex)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      },
      'obj.TableCode': {
        handler (newValue, oldValue) {
          this._getUnit()
        },
        deep: true
      }
    }
  }
</script>

