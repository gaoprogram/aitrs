<!--
  User: gaol
  Date: 2019/5/20
  功能：多选下拉框 统一验证 组件  currentRuleComponent： controtype 为 6  
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "common-fieldcmp-style.styl";
  .common-select-container
    display: flex;
    align-items: center;
    width 300px
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-select
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

        <div v-if="!isShowing">
          <el-select
            v-model="obj.FieldValue"
            :placeholder="obj.Tips ||　'请选择'"
            multiple
            clearable
            size="mini"
            class="fieldValueWrap u-f0"
          >
            <el-option
              v-for="(item,key) in dataSource"
              :key="key"
              :label="item.Name"
              :value="''+item.Code">
            </el-option>      
          </el-select>
          <!--注意： 上面的：value的值的写法是转换为了 字符串，因为 v-model 中的 obj.FieldValue为字符串--->

          <!----多选下拉框一级下拉框--start--->
          <el-select
            v-if="obj.Dstype === 'Local'"
            @change="changeParent(1)"
            v-model="obj.FieldValue"
            :placeholder="obj.Tips ||　'请选择'"
            style="width: 145px"
            multiple
            size="mini"
          >
            <el-option
              v-for="(item,key) in dataSource"
              :key="key"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
          <!----多选下拉框一级下拉框--start--->


          <!----多选下拉框二级下拉框--start--->
          <el-select
            v-if="obj.Dstype === 'Local'"
            v-model="obj.FieldValue"
            :placeholder="obj.Tips ||　'请选择'"
            style="width: 150px"
            multiple
            size="mini"
          >
            <el-option
              v-for="(item, idx) in childSource"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
          <!----多选下拉框二级下拉框--end--->
        </div>
      </div>
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import iconSvg from '@/base/Icon-svg/index'
  import { getDicByKey } from '@/api/permission'
  import { getNodeList } from '@/api/approve'
  import { mapGetters } from 'vuex'
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
      sid: {
        type: Number,
        default: 0
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
      flowId: {
        type: [Number, String],
        default: 0
      },
      nodeId: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      // ...mapGetters([
      //   'nodeObjStore'
      // ])
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if(!this.isNeedCheck){
          callback()
          return
        }

        if (this.obj.Require && !this.obj.FieldValue.length) {
          callback(new Error(this.obj.DisplayName + '不能为空'))
        // } else if (this.obj.MaxLength > 0 && (this.obj.FieldValue.parentIds.length + this.obj.FieldValue.childIds.length) > this.obj.MaxLength) {
        } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.length > this.obj.MaxLength) {
          callback(new Error(`${this.obj.DisplayName}的字典项和字典项子类最多选择${this.obj.MaxLength}个`))
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
          trigger: ['change']
        },
        dataSource: [],  
        childSource: [],  // 二级数据源
        currentSource: [],
        isHidden: false,  // 控制该 组件是否显示
        getNodeListSelectClass: '' // 可退回的节点 ReturnNodes  可撤回的节点 NodeCancels时给此组件加一个class值
      }
    },
    created () {
      debugger
      this.isHidden = this.obj.Hidden
      if (this.obj.FieldValue && !this.obj.FieldValue.length) {
        this.obj.FieldValue = []
      }else if(this.obj.FieldValue.length){
        // 获取二级下拉源
        // this.changeParent()
      }
      // this.changeHidden()
    },
    mounted () {
      this.$nextTick(() => {
        if (this.obj.DataSource === 'GetNodeList') {
          this._getNodeList()
          return
        }
        this._getDicByKey('SyS', 'SYS', this.obj.Dstype, this.obj.DataSource)
      })
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        // 先重置数据源
        this.dataSource = []
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.Dstype === 'Local') {
          // 如果范围不包含，那就return
          if (!this.obj.ext.LimitOpt.length) return
          // 遍历范围里面的值，放进数据源
          this.obj.ext.LimitOpt.forEach(item => {
            this.obj.ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })

          // 判断是否有默认选中
          if (this.obj.ext.DefaultOpt.length ) {
            this.obj.FieldValue = this.obj.ext.DefaultOpt
          }

          // 获取二级 数据源   取消了二级下拉框
          // this.changeParent()
        } else {
          // 非 自定义字典表
          if (this.obj.FieldValue && !this.obj.FieldValue.length) {
            this.obj.FieldValue = this.obj.ext.DefaultOpt
          }
          getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
            console.log("----二级下拉框获取的dataSource-----", res)
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                if (this.obj.ext.LimitOpt && this.obj.ext.LimitOpt.length) {
                  this.obj.ext.LimitOpt.forEach(item => {
                    res.data.Data.forEach(i => {
                      if (item === i.Code) {
                        this.dataSource.push(i)
                      }
                    })
                  })
                } else {
                  debugger
                  this.dataSource = res.data.Data
                }
                if (!this.dataSource.length) return
                if (this.obj.Depend) {
                  this.currentFields.forEach(currentField => {
                    if (this.obj.Depend === currentField.FieldCode) {
                      let value = currentField.FieldValue.parentIds
                      if (typeof (value) === 'string') {
                        this.currentSource = this.dataSource.filter(item => {
                          return item.PCode === value
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = []
                      } else if (Array.isArray(value) && value.length) {
                        this.currentSource = this.dataSource.filter(item => {
                          return value.includes(item.PCode)
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = []
                      } else {
                        this.obj.FieldValue.parentIds = []
                        this.currentSource = []
                      }
                    }
                  })
                } else {
                  this.currentSource = [...this.dataSource]
                }
              }
            }
          })
        }
      },

      // 改变父下拉框值(第一级下拉框)
      changeParent ( type ) {
        // type 值为 表示 是初始进入时 还是 手动改动了 第一级 后触发的二级的改变
        debugger
        this.childSource = []
        if( type === 1){
          // 手动修改的第一级
          this.obj.FieldValue.childIds = []
        }
        if (this.obj.FieldValue.parentIds && this.obj.FieldValue.parentIds.length) {
          if (this.obj.Dstype === 'Local') {
            this.obj.FieldValue.parentIds.forEach(i => {
              this.obj.ext.Opt.forEach(item => {
                if (item.Code === i) {
                  if (item.Child && item.Child.length) {
                    this.childSource.push(...item.Child)
                  }
                }
              })
            })
          }
        }
        // console.log("打印二级下拉框数据源this.childSource",this.childSource)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          if (!this.obj.FieldValue) {
            this.obj.FieldValue = []
          }
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      },
    }
  }
</script>

