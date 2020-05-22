<!--
  User: gaol
  Date: 2019/5/14
  功能：单选下拉框 的通用 验证组件     currentRuleComponent(obj.ControlType)  obj.ControlType为 5
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
    <!-- obj: {{obj}} -->
    <el-select
      v-model="obj.FieldValue"
      :placeholder="obj.Config.Tips ||　'请选择'"
      filterable
      clearable
      :disabled="false"
      style="width: 300px"
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.ItemName"
        :label="item.ItemName"
        :value="item.ItemCode">
      </el-option>
    </el-select>

  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
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
      orderProp: {
        type: String,
        default: ''
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
      }
    },
    computed: {
      // ...mapGetters([
      //   'nodeObjStore'
      // ])
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
            // callback(new Error(this.obj.FieldName + '所关联的字段范围无数据，请重新配置表单'))
            callback()
          } else if (this.obj.Config.Required && (this.obj.FieldValue === '' || !this.obj.FieldValue)) {
            // 需要校验，并且 this.obj.FieldValue 为空
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else {
            callback()
          }
        }
      }

      return {
        rules: {
          required: this.obj.Config.Required,
          validator: validatePass,
          trigger: ['change', 'blur']
          // type: 'String'
        },
        dataSource: [],     // option 的下拉选项
        childSource: [],
        currentSource: [],
      }
    },
    created () {
      // 获取option 下拉框的数据源
      this._PaGetDicDataSourceList(this.obj.Config.DSType, this.obj.Config.DataSource)
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
      // 获取字典表数据源数据
      _PaGetDicDataSourceList (DicType, DicCode) {
        console.log('dicType', DicType)
        console.log('DicCode', DicCode)
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.Config.DSType === 'Local') {
          // if (!this.obj.Config.Ext.LimitOpt.length) return
          // if (this.obj.Config.Ext.DefaultOpt.length) {
          //   this.obj.FieldValue = this.obj.Config.Ext.DefaultOpt.toString()
          // }
          // this.obj.Config.Ext.LimitOpt.forEach(item => {
          //   this.obj.Config.Ext.Opt.forEach(i => {
          //     if (item === i.Code) {
          //       this.dataSource.push(i)
          //     }
          //   })
          // })
          // 获取二级数据源
          this.changeParent()
        } else {
          // if (!this.obj.FieldValue && this.obj.FieldValue !== 0) {
          //   this.obj.FieldValue = this.obj.Config.Ext.DefaultOpt.toString()
          // }
          // 获取数据字典
          PaGetDicDataSourceList(DicType, DicCode).then(res => {
            debugger
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                // if (this.obj.Config.Ext.LimitOpt.length) {
                //   this.obj.Config.Ext.LimitOpt.forEach(item => {
                //     res.data.Data.forEach(i => {
                //       if (item === i.Code) {
                //         this.dataSource.push(i)
                //       }
                //     })
                //   })
                // } else {
                //   debugger
                  this.dataSource = res.data.Data
                  console.log("this.dataSource", res.data.Data)
                // }

                if (!this.dataSource.length) return

                if (this.obj.Config.Depend) {
                  // 有二级下拉框
                  debugger
                  this.currentFields.forEach(item => {
                    if (this.obj.Config.Depend === item.FieldCode) {
                      let value = item.FieldValue
                      if (typeof (value) === 'string') {
                        this.currentSource = this.dataSource.filter(i => {
                          return i.PCode === value
                        })
                        if (!this.currentSource.length) this.obj.FieldValue = ''
                      } else if (Array.isArray(value) && value.length) {
                        this.currentSource = this.dataSource.filter(i => {
                          return value.includes(i.PCode)
                        })
                        if (!this.currentSource.length) this.obj.FieldValue = ''
                      } else {
                        this.obj.FieldValue = ''
                        this.currentSource = []
                      }
                    }
                  })
                } else {
                  debugger

                  this.currentSource = [...this.dataSource]
                }
              }else {
                // 获取的数据源集合为 []
              }
            }
          })
        }
      },
      // 改变父下拉框值
      changeParent () {
        // this.childSource = []
        // type 值为 表示 是初始进入时 还是 手动改动了 第一级 后触发的二级的改变
        // if (this.obj.Config.Ext.Opt && this.obj.Config.Ext.Opt.length) {
        //   this.obj.Config.Ext.Opt.forEach(item => {
        //     if (item.Code === this.obj.FieldValue) {
        //       if (item.Child.length) {
        //         this.childSource = item.Child
        //       } else {
        //         this.childSource = []
        //       }
        //     }
        //   })
        // }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
