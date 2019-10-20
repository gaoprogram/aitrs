<!--
  User: gaol
  Date: 2019/5/20
  功能：多选下拉框 统一验证 组件  currentRuleComponent： controtype 为 6 
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="orderProp"
    :rules="rules"
    v-if="!isHidden">
    <el-select
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      multiple
      clearable
      size="mini"
    >

      <el-option
        v-for="(item,key) in dataSource"
        :key="item.ItemCode + item.ItemName + key"
        :label="item.ItemName"
        :value="''+item.ItemCode">
      </el-option>      
    </el-select>
    <!--注意： 上面的：value的值的写法是转换为了 字符串，因为 v-model 中的 obj.FieldValue.parentIds为字符串--->

    <!----多选下拉框一级下拉框--start--->
    <el-select
      v-if="obj.DSType === 'Local'"
      @change="changeParent(1)"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Config.Tips ||　'请选择'"
      style="width: 145px"
      multiple
      size="mini"
    >
      <el-option
        v-for="(item,key) in dataSource"
        :key="item.Code + item.Name + key"
        :label="item.Name"
        :value="''+ item.Code">
      </el-option>
    </el-select>
    <!----多选下拉框一级下拉框--start--->


    <!----多选下拉框二级下拉框--start--->
    <el-select
      v-if="obj.DSType === 'Local'"
      v-model="obj.FieldValue.childIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 150px"
      multiple
      size="mini"
    >
      <el-option
        v-for="(item,key) in childSource"
        :key="item.Code + item.Name + key"
        :label="item.Name"
        :value="''+ item.Code">
      </el-option>
    </el-select>
    <!----多选下拉框二级下拉框--end--->

  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
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

        if (this.obj.Config.Required && !this.obj.FieldValue.parentIds.length) {
          callback(new Error(this.obj.FieldName + '不能为空'))
        // } else if (this.obj.Config.MaxLength > 0 && (this.obj.FieldValue.parentIds.length + this.obj.FieldValue.childIds.length) > this.obj.Config.MaxLength) {
        } else if (this.obj.Config.MaxLength > 0 && this.obj.FieldValue.childIds.length > this.obj.Config.MaxLength) {
          callback(new Error(`${this.obj.FieldName}的字典项和字典项子类最多选择${this.obj.Config.MaxLength}个`))
        } else {
          callback()
        }
      }
      return {
        rules: {
          required: this.obj.Config.Required,
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
      if (this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
        this.obj.FieldValue.parentIds = []
      }else if(this.obj.FieldValue.parentIds.length){
        // 获取二级下拉源
        // this.changeParent()
      }
      this.changeHidden()
    },
    mounted () {
      this.$nextTick(() => {
        if (this.obj.DataSource === 'GetNodeList') {
          this._getNodeList()
          return
        }
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
      })
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        // 先重置数据源
        this.dataSource = []
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.DSType === 'Local') {
          // 如果范围不包含，那就return
          if (!this.obj.Config.Ext.LimitOpt.length) return
          // 遍历范围里面的值，放进数据源
          this.obj.Config.Ext.LimitOpt.forEach(item => {
            this.obj.Config.Ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })

          // 判断是否有默认选中
          if (this.obj.Config.Ext.DefaultOpt.length ) {
            this.obj.FieldValue.parentIds = this.obj.Config.Ext.DefaultOpt
          }

          // 获取二级 数据源
          this.changeParent()
        } else {
          // 非 自定义字典表
          if (this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
            this.obj.FieldValue.parentIds = this.obj.Config.Ext.DefaultOpt
          }
          getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                if (this.obj.Config.Ext.LimitOpt && this.obj.Config.Ext.LimitOpt.length) {
                  this.obj.Config.Ext.LimitOpt.forEach(item => {
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
          if (this.obj.DSType === 'Local') {
            this.obj.FieldValue.parentIds.forEach(i => {
              this.obj.Config.Ext.Opt.forEach(item => {
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
          if (!this.obj.FieldValue.parentIds) {
            this.obj.FieldValue.parentIds = []
          }
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:obj', newValue)
        },
        deep: true
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
