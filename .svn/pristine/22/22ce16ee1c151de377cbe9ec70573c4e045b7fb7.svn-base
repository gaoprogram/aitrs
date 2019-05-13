<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：多选下拉框
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="orderProp"
    :rules="rules"
    v-if="!isHidden"
  >
    <el-select
      v-if="obj.DataSource === 'GetNodeList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      multiple
      clearable
      size="mini"
    >
      <el-option
        v-for="item in dataSource"
        :key="item.NodeId"
        :label="item.Name"
        :value="item.NodeId">
      </el-option>
    </el-select>
    <el-select
      v-if="obj.DSType !== 'Local' && obj.DataSource !== 'GetNodeList'"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 300px"
      multiple
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
    <el-select
      v-if="obj.DSType === 'Local'"
      @change="changeParent"
      v-model="obj.FieldValue.parentIds"
      :placeholder="obj.Tips ||　'请选择'"
      style="width: 145px"
      multiple
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
      multiple
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
  import { getNodeList } from '@/api/approve'

  export default {
    props: {
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
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (this.obj.DSType === 'Local') {
          if (this.obj.Required && !this.obj.FieldValue.parentIds.length) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else if (this.obj.MaxLength > 0 && (this.obj.FieldValue.parentIds.length + this.obj.FieldValue.childIds.length) > this.obj.MaxLength) {
            callback(new Error(`${this.obj.FieldName}的字典项和字典项子类最多选择${this.obj.MaxLength}个`))
          } else {
            callback()
          }
        } else if (this.obj.DSType === 'SYS' || this.obj.DSType === 'CUS') {
          if (this.obj.Required && this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
            callback(new Error(this.obj.FieldName + '不能为空'))
          } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.parentIds.length > this.obj.MaxLength) {
            callback(new Error(`${this.obj.FieldName}最多选择${this.obj.MaxLength}个`))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          validator: validatePass,
          trigger: ['change']
        },
        dataSource: [],
        childSource: [],
        currentSource: [],
        isHidden: false
      }
    },
    created () {
      this.isHidden = this.obj.Hidden
      if (!this.obj.FieldValue.parentIds) {
        this.obj.FieldValue.parentIds = []
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
        // 如果是自定义字典表，取opt里面数据
        if (this.obj.DSType === 'Local') {
          // 如果范围不包含，那就return
          if (!this.obj.Ext.LimitOpt.length) return
          // 遍历范围里面的值，放进数据源
          this.obj.Ext.LimitOpt.forEach(item => {
            this.obj.Ext.Opt.forEach(i => {
              if (item === i.Code) {
                this.dataSource.push(i)
              }
            })
          })
          // 判断是否有默认选中
          if (this.obj.Ext.DefaultOpt.length) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt
            this.changeParent()
          }
        } else {
          if (this.obj.FieldValue.parentIds && !this.obj.FieldValue.parentIds.length) {
            this.obj.FieldValue.parentIds = this.obj.Ext.DefaultOpt
          }
          getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
            if (res.data.State === REQ_OK) {
              if (res.data.Data.length) {
                if (this.obj.Ext.LimitOpt && this.obj.Ext.LimitOpt.length) {
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
      _getNodeList () {
        getNodeList('', this.flowId).then(res => {
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      },
      // 改变父下拉框值
      changeParent () {
        this.childSource = []
        this.obj.FieldValue.childIds = []
        if (this.obj.FieldValue.parentIds && this.obj.FieldValue.parentIds.length) {
          if (this.obj.DSType === 'Local') {
            this.obj.FieldValue.parentIds.forEach(i => {
              this.obj.Ext.Opt.forEach(item => {
                if (item.Code === i) {
                  if (item.Child && item.Child.length) {
                    this.childSource.push(...item.Child)
                  }
                }
              })
            })
          }
        }
      },
      // 节点关联
      changeHidden () {
        if (this.obj.DataSource === 'GetNodeList') {
          this.currentFields.forEach(item => {
            if (item.FieldCode === 'CancelRole' && this.obj.FieldCode === 'NodeCancels') {
              if (item.FieldValue.parentIds === '3') {
                this.isHidden = false
              } else {
                this.isHidden = true
              }
            } else if (item.FieldCode === 'ReturnRole' && this.obj.FieldCode === 'ReturnNodes') {
              if (item.FieldValue.parentIds === '3') {
                this.isHidden = false
              } else {
                this.isHidden = true
              }
            }
          })
        }
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
      'obj.TableCode': {
        handler (newValue, oldValue) {
          this.isHidden = this.obj.Hidden
          if (!this.obj.FieldValue.parentIds) {
            this.obj.FieldValue.parentIds = []
          }
          this.changeHidden()
          this.$nextTick(() => {
            if (this.obj.DataSource === 'GetNodeList') {
              this._getNodeList()
              return
            }
            this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
          })
        },
        deep: true
      },
      currentFields: {
        handler (newValue, oldValue) {
          if (this.obj.DSType !== 'Local' && this.dataSource.length && this.obj.Depend && this.obj.DataSource !== 'GetNodeList') {
            this.currentFields.forEach(item => {
              if (this.obj.Depend === item.FieldCode) {
                let value = item.FieldValue.parentIds
                if (typeof (value) === 'string') {
                  this.currentSource = this.dataSource.filter(i => {
                    return i.PCode === value
                  })
                } else if (Array.isArray(value) && value.length) {
                  this.currentSource = this.dataSource.filter(i => {
                    return value.includes(i.PCode)
                  })
                } else {
                  this.currentSource = []
                }
              }
            })
          }
          this.changeHidden()
        },
        deep: true
      }
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
