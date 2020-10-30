<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：单选radio 规则验证    controlType 12  
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .el-scrollbar /deep/
    .el-scrollbar__wrap
      overflow-x hidden
      .item-rule__radio
        margin-left 0!important
        margin-right 30px
  .el-form-item__content
    .radioBox
      display inline-flex
      flex-wrap wrap
      line-height 40px
      justify-content flex-start
      .el-radio
        padding 5px 5px
        box-sizing border-box
        margin-left 0 !important
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    :v-show="isShowField">
    obj：{{obj}}
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


      <el-radio-group
        v-model="obj.FieldValue"
        @change="changeRadioValue(obj.FieldValue)"
        class="fieldValueWrap u-f0"
      >
        <el-radio 
          class="item-rule__radio margin5"
          v-for="source in dataSource"
          :key="source.Code"
          :disabled="obj.Readonly || isHasAddOrEditAuth"
          :label="source.Name">
          {{source.Name}}
        </el-radio>
      </el-radio-group>
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'  
  // import { getDicByKey } from '@/api/permission'
  import { PaGetDicDataSourceList } from '@/api/dic'
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
      },
      // 是否是直接显示 还是 新增或者编辑  这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },       
    },
    data () {
      let validatePass = (rule, value, callback) => {
        debugger
        if( !this.isNeedCheck ){
          callback()
          return
        }

        if (this.obj.Require && !this.obj.FieldValue) {
          callback(new Error('请选择' + this.obj.DisplayName))
        } else {
          callback()
          // callback(new Error('请选择' + this.obj.DisplayName))
        }
      }
      return {
        resAuth: {
          "scanViewEncry": 0,  // 查看视图是否加密   1 和 0 区分
          "addorEditViewEdit": 1,  // 新增/编辑视图是否可编辑   1 和 0 区分
          "scanViewShow": 1,  // 查看视图是否可见   1 和 0 区分
          "editViewShow": 1,  // 编辑视图是否可见   1 和 0 区分
          "addViewShow": 1,  // 新增视图是否   1 和 0 区分          
        }, // 
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000; width: 100px',
        rules: {
          required: this.obj.Require,
          validator: validatePass,
          trigger: ['change']
        },
        dataSource: [],
      }
    },
    created () {
      this.$nextTick(() => {
        // 获取 radio 的选项
        this._PaGetDicDataSourceList( this.obj.DSType, this.obj.DataSource )
      })
    },
    mounted () {

    },
    methods: {
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
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },
      // 获取字典表数据源数据
      _PaGetDicDataSourceList (DicType, DicCode) {
        PaGetDicDataSourceList(DicType, DicCode).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.dataSource = res.data.Data
          }
        })
      },
      // radio value 值改变
      changeRadioValue (val) {
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

