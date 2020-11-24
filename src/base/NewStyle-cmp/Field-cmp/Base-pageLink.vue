<!--
  User: xxxxxxx
  Date: 2020/11/17
  功能：页面跳转字段控件    controletype 为 30
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
          <el-tooltip 
            v-if="obj.Description"
            :content="obj.Description">
            <i class="el-icon-info"></i>
          </el-tooltip>                
        </span>
      </div>

      <div v-if="!isShowing" class="fieldValueWrap u-f0">
        <!-- <icon-svg 
          class="fieldRequiredIcon"
          :icon-class="obj.FieldValue"
        ></icon-svg>           -->
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-s-promotion"
          @click.native="handlerClickLinkPageBtn(obj)"
        >
          跳转到{{obj.Link}}页面
        </el-button>
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f0" 
        v-else
      >
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-s-promotion"
          @click.native="handlerClickLinkPageBtn(obj)"          
          :disabled="obj.Readonly || !isHasAddOrEditAuth()"
        >
          跳转到{{obj.Link}}页面
        </el-button>
      </div>         
    </div>


    <!----link跳转的弹框----->
    <div class="linkDialogWrap" v-if="showLinkDialog">
      <el-dialog
        title="页面跳转的弹框"
        append-to-body
        :close-on-click-modal="false"
        fullscreen
        :visible.sync="showLinkDialog"
      >
        
        <!-- <field-link-detail
          :comData="obj"
        >
        </field-link-detail>       -->
        大家观看的
      </el-dialog>
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  // import FieldLinkDetail from '@/base/NewStyle-cmp/Field-cmp/Base-fieldLink-detail'
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
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
      iconSvg,
      // FieldLinkDetail
    },  
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          callback()
          return
        }
  
        if (this.obj.Require && !this.obj.FieldValue.length) {
          callback(new Error('请选择' + this.obj.DisplayName))
        } else if (this.obj.Max > 0 && this.obj.FieldValue.length > this.obj.Max) {
          callback(new Error(`${this.obj.DisplayName}最多选择${this.obj.Max}个`))
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
          type: 'array',
          validator: validatePass,
          trigger: 'change'
        },
        showLinkDialog: false
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
    },    
    created () {
      // this.$set(this.obj, 'CombineType', '0030303')
      // this.$set(this.obj, 'MetaCode', 'CPPJobRecord')
      // this.$set(this.obj, 'IsShow', false)
      // this.$set(this.obj, 'MetaAttr', {} )
      // this.obj.MetaAttr.LogicMetaCode = 'CPPJobRecord'
      // this.obj.MetaAttr.CAR = ''
      // this.obj.MetaAttr.CombineType = '0030303'
      // this.obj.MetaAttr.ShortName = '在职记录'
    },
    mounted () {
    },
    methods: {
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },
      // 页面跳转link
      handlerClickLinkPageBtn(obj){
        debugger
        // this.showLinkDialog = true
        let linkPage = obj.Link 
        let linkPath = `/${linkPage}`
        console.log("linkBtn按钮上的Link：", linkPage)
        this.$router.push({
            path: linkPath,
            query: {}
        })
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

