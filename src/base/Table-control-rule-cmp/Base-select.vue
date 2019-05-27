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
    v-if="!obj.Hidden"
  >

    <!---业务领域下拉框选项 start-->
    <el-select
      v-if="obj.DataSource === 'GetBusinessAreaList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      :disabled="false"
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.BusinessAreaCode"
        :label="item.Name"
        :value="item.BusinessAreaCode">
      </el-option>
    </el-select>
    <span style="font-size: 12px;color: #dedede" v-if="obj.DataSource === 'GetBusinessAreaList'">业务领域只可设置一次，不能修改</span>
    <!---业务领域下拉框选项- end-->


    <!--节点设置下的，节点下拉选项框--start-->
    <el-select
      v-if="obj.DataSource !== 'GetBusinessAreaList' && obj.DSType !== 'Local' && obj.DataSource !== 'GetFieldList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in currentSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
    <!--节点设置下的，节点下拉选项框--end-->

    <!--节点设置——流转——支流，“选择启动字段” 下拉选项框--start-->
    <!-- ruleId:{{ruleId}} 
    nodeId: {{nodeId}} -->
    <!-- obj.DataSource： {{obj.DataSource}} -->
    <!-- dataSource: {{dataSource}} -->
    <el-select
      v-if="obj.DataSource === 'GetFieldList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.FieldCode"
        :label="item.FieldName"
        :value="item.FieldName">
      </el-option>
    </el-select>
    <!--节点设置——流转——支流，“选择启动字段” 下拉选项框--end-->    



    <el-select
      v-if="obj.DSType === 'Local'"
      @change="changeParent"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 145px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>


    <el-select
      v-if="obj.DSType === 'Local' && childSource.length"
      v-model="obj.FieldValue.childIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 150px"
      clearable
      size="mini"
    >
      <el-option
        v-for="item in childSource"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>

  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  import { getBusinessAreaList, getNodeList, getFieldList } from '@/api/approve'

  export default {
    props: {
      prop: {
        type: String,
        default: ''
      },
      fieldProp: {
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
        type: [String, Number],
        default: 0
      }
    },
    data () {
      // 验证规则
      let validatePass = (rule, value, callback) => {
        debugger
        if (this.obj.DataSource === 'GetBusinessAreaList') {
          // 如果是 业务领域下拉选项的校验
          if (this.dataSource) {
            if (!this.dataSource.length) {
                // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
              callback(new Error(this.obj.FieldName + '所关联的字段范围无数据，请重新配置表单'))
            } else if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
              // 需要校验，并且 this.obj.FieldValue.parentIds 为空
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else {
              callback()
            }
          }
        } if (this.obj.DataSource === 'GetFieldList') {
          // 节点设置——流转——支流 里面的 “选择启动字段”
          if (this.dataSource) {
            if (!this.dataSource.length) {
                // 业务领域存在 但是 dataSource 为空（获取业务领域接口时，返回的业务领域为空，需要重新配置表单）
              callback(new Error(this.obj.FieldName + '所关联的字段范围无数据，请重新配置表单'))
            } else if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
              // 需要校验，并且 this.obj.FieldValue.parentIds 为空
              callback(new Error(this.obj.FieldName + '不能为空'))
            } else {
              callback()
            }
          }
        } else {
          // 非业务领域的校验
          if (this.obj.Required && (this.obj.FieldValue.parentIds === '' || !this.obj.FieldValue.parentIds)) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else {
            callback()
          }
        }
      }

      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: ['change', 'blur']
          // type: 'String'
        },
        dataSource: [],     // option 的下拉选项
        childSource: [],
        currentSource: [],
        isOneChange: false,  // 控制 流程设置中的 业务领域选取的次数，只能设置一次
        ind: 0
      }
    },
    created () {
      this.$nextTick(() => {
        debugger
        console.log(this.obj.FieldValue.parentIds)

        console.log(!this.obj.FieldValue.parentIds)

        console.log(this.obj.orderProp)
        if (this.obj.DataSource === 'GetBusinessAreaList') {
          if (this.obj.FieldValue.parentIds) {
            // 如果 为真，就只能设置一次
            this.isOneChange = true
          }
          this._getBusinessAreaList()
          return
        }
        if (this.obj.DataSource === 'GetNodeList') {
          this._getNodeList()
          return
        }

        if (this.obj.DataSource === 'GetFieldList') {
          this._getFieldList()
          return
        }

        // if (this.obj.DataSource === 'GetNodeList') {
        //   this._subFlowStartWay()
        //   return
        // }

        debugger
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
      })
    },
    mounted () {
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        console.log('dicType', dicType)
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.DSType === 'Local') {
          if (!this.obj.Ext.LimitOpt.length) return
          if (this.obj.Ext.DefaultOpt.length) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt.toString()
            this.changeParent()
          }
          this.obj.Ext.LimitOpt.forEach(item => {
            this.obj.Ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })
        } else {
          if (!this.obj.FieldValue.parentIds && this.obj.FieldValue.parentIds !== 0) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt.toString()
          }
          // 获取数据字典
          getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
            debugger
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                if (this.obj.Ext.LimitOpt.length) {
                  this.obj.Ext.LimitOpt.forEach(item => {
                    res.data.Data.forEach(i => {
                      if (item === i.Code) {
                        this.dataSource.push(i)
                      }
                    })
                  })
                } else {
                  this.dataSource = res.data.Data
                }
                if (!this.dataSource.length) return

                if (this.obj.Depend) {
                  this.currentFields.forEach(item => {
                    if (this.obj.Depend === item.FieldCode) {
                      let value = item.FieldValue.parentIds
                      if (typeof (value) === 'string') {
                        this.currentSource = this.dataSource.filter(i => {
                          return i.PCode === value
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = ''
                      } else if (Array.isArray(value) && value.length) {
                        this.currentSource = this.dataSource.filter(i => {
                          return value.includes(i.PCode)
                        })
                        if (!this.currentSource.length) this.obj.FieldValue.parentIds = ''
                      } else {
                        this.obj.FieldValue.parentIds = ''
                        this.currentSource = []
                      }
                    }
                  })
                } else {
                  debugger
                  this.currentSource = [...this.dataSource]
                }
              }
            }
          })
        }
      },
      // 获取业务领域集合
      _getBusinessAreaList () {
        getBusinessAreaList().then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      },
      // 获取节点集合
      _getNodeList () {
        getNodeList('', this.flowId).then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      },
      // 获取 启动字段集合
      _getFieldList () {
        debugger
        getFieldList(this.flowId, this.nodeId).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.dataSource = res.data.Data
          }
        })
      },

      // 改变父下拉框值
      changeParent () {
        if (this.obj.Ext.Opt && this.obj.Ext.Opt.length) {
          this.obj.Ext.Opt.forEach(item => {
            if (item.Code === this.obj.FieldValue.parentIds) {
              if (item.Child.length) {
                this.childSource = item.Child
                this.obj.FieldValue.childIds = ''
              } else {
                this.childSource = []
              }
            }
          })
        }
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去，利用的是数据的双向绑定，父组件通过 .sync 向子组件传值，此方法会实现数据的双向绑定
          this.$emit('update:obj', newValue)
        },
        deep: true
      },
      'obj.TableCode': {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (this.obj.DataSource === 'GetBusinessAreaList') {
            if (this.obj.FieldValue.parentIds) {
              this.isOneChange = true
            }
            // 获取业务领域数据
            this._getBusinessAreaList()
            return
          }

          if (this.obj.DataSource === 'GetNodeList') {
            // 获取节点数据
            this._getNodeList()
            return
          }

          // 节点设置——流转——支流 中的 “选择启动字段” 下拉框选项
          if (this.obj.DataSource === 'GetFieldList') {
            // 获取 选择启动字段数据
            this._getFieldList()
          }

          // 获取字典数据
          this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
        },
        deep: true
      },
      currentFields: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (this.obj.DSType !== 'Local' && this.dataSource.length && this.obj.Depend) {
            this.currentFields.forEach(item => {
              if (this.obj.Depend === item.FieldCode) {
                let value = item.FieldValue.parentIds
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
          }
        },
        deep: true
      }
      // 'obj.FieldValue.parentIds': {
      //   handler (newValue, oldValue) {
      //     if (!newValue) {
      //       this.$message({
      //         message: `${this.obj.FieldName}不能为空`,
      //         type: 'warning'
      //       })
      //     }
      //   },
      //   deep: true
      // }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
