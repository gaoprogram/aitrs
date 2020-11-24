<!--
  User: gaol
  Date: 2019/5/14
  功能：多选下拉框 的通用 验证组件     currentRuleComponent(obj.ControlType)  obj.ControlType为 6
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  >>>.el-form-item__error {
    left: 100px;
  }
  >>>.el-form-item__content {
    .filedContentWrap {
      .titWrap {
        margin-right: 5px !important;
      }
    }
  }
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="isShowField"
  >
    <!-- obj: {{obj}} -->
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
            v-show="!isShowing && obj.Required"
            :icon-class="RequiredSvg"
          ></icon-svg>     
          <el-tooltip 
            v-if="obj.Description"
            :content="obj.Description">
            <i class="el-icon-info"></i>
          </el-tooltip>              
        </span>

      </div>  

      <!-- dataSource: {{dataSource}} -->
      <!-- obj.FieldValue: {{obj.FieldValue}} -->
      <div v-if="!isShowing" class="fieldValueWrap u-f0">
        <el-cascader
          class="fieldValue"
          v-if="!isShowing"
          :placeholder="obj.ActRemind ||　'请选择'"
          :options="dataSource"
          v-model="obj.FieldValue"
          :props="{
            'children': 'Children',
            'label':'Name',
            'value': 'Code',
            'multiple': true
          }"
          clearable
          :collapse-tags="false"
          filterable
          size="mini"
        >
          <template slot-scope="{ node, data }">
            <span class="u-f-ac">
              {{ data.Name }}
              <el-tooltip 
                v-if="data.Description"
                class="item" 
                effect="dark" 
                :content="data.Description" 
                placement="top-start"
              >
                <i class="el-icon-info" style="margin-left:5px"></i>
              </el-tooltip>
            </span> 
          </template>
        </el-cascader>

        <div         
          v-if="obj.Readonly || !isHasAddOrEditAuth()"
          class="shade"
        >
        </div>          
      </div>

      <div 
        class="fieldValueWrap showValue line-bottom u-f0" 
        v-else
      >
        <span 
          class="ellipsis2"
          v-for="(item, key) in obj.FieldValue"
          :key="key"
        >
          {{item.Name}}
        </span>
      </div>             
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { newStyleGetDicByKey } from '@/api/dic'
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
      orderProp: {
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
        default: () => {
          return {}
        }
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      currentFields: {
        typr: Array,
        default: () => {
          return []
        }
      }, 
      // 是否是直接显示 还是 新增或者编辑  这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },                
    },
    computed: {
      // ...mapGetters([
      //   'nodeObjStore'
      // ])
    },
    component: {
      iconSvg
    },
    data () {
      // 验证规则
      let validatePass = (rule, value, callback) => {
        debugger
        if( !this.isNeedCheck ){
          callback()
          return
        }
        
        // 下拉选项的校验
        if (this.dataSource) {
          if (!this.dataSource.length) {
              // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
            // callback(new Error(this.obj.DisplayName + '所关联的字段范围无数据，请重新配置表单'))
            callback()
          } else if (this.obj.Require && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
            // 需要校验，并且 this.obj.FieldValue 为空
            callback(new Error(this.obj.DisplayName + '不能为空'))
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
        }, //         
        RequiredSvg: 'Require',
        fieldLabelStyle: 'color: #000000;width: 100px',
        rules: {
          required: this.obj.Require,
          required: true,
          validator: validatePass,
          trigger: ['change', 'blur']
        },
        dataSource: [],     // option 的下拉选项
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
      // 获取option 下拉框的数据源
      this._newStyleGetDicByKey(this.obj.Dstype, this.obj.DataSource)
    },
    mounted () {
      debugger     
    },
    beforeDestroy() {
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去，利用的是数据的双向绑定，父组件通过 .sync 向子组件传值，此方法会实现数据的双向绑定
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    },
    methods: {  
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },     
      _changeData(data){
        if(data && data.length){
          data.forEach(item => {
            if(item.hasOwnProperty("Children")){
              if(!item.Children.length){
                delete item.Children
              }else {
                this._changeData(item.Children)
              }
            }
          });
        }
      }, 
      // 获取字典表数据源数据
      _newStyleGetDicByKey (DicType, DicCode) {
        debugger
        console.log('dicType', DicType)
        console.log('DicCode', DicCode)

        // 获取数据字典
        newStyleGetDicByKey(DicType, DicCode).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            if (res.data.Data.length) {
                this.dataSource = res.data.Data
                console.log( "this.dataSource", res.data.Data )
              if (!this.dataSource.length) return

              // 处理数据 
              this._changeData(this.dataSource)
            }else {
              // 获取的数据源集合为 []
            }
          }
        })
      }
    }
  }
</script>

