<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：多选  controlType  13
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="orderProp"
    :rules="rules"
    v-if="!obj.Config.Hidden"
  >
    <div style="width: 300px">
      <el-checkbox-group v-model="obj.FieldValue.parentIds" style="width: 300px">
        <el-checkbox
          class="item-rule__checkbox"
          v-for="source in dataSource"
          :key="source.Code"
          :label="source.Code"
          @change="changeCheck"
        >
          {{source.Name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import {REQ_OK} from '@/api/config'
  import {getDicByKey} from '@/api/permission'

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
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if( !this.isNeedCheck ){
          // 不需要校验的话
          callback()
          return 
        }

        if(this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2 ){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && (!this.obj.FieldValue.parentIds || !this.obj.FieldValue.parentIds.length)) {
              callback(new Error(`请选择${this.obj.FieldName}`))
            } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.parentIds.length > this.obj.MaxLength) {
              callback(new Error(`${this.obj.FieldName}最多选择${this.obj.MaxLength}个`))
            } else {
              callback()
            }            
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && (!this.obj.FieldValue.parentIds || !this.obj.FieldValue.parentIds.length)) {
            callback(new Error(`请选择${this.obj.FieldName}`))
          } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.parentIds.length > this.obj.MaxLength) {
            callback(new Error(`${this.obj.FieldName}最多选择${this.obj.MaxLength}个`))
          } else {
            callback()
          }
        }
      }
      return {
        rules: {
          required: this.obj.Required,
          type: 'array',
          validator: validatePass,
          trigger: 'change'
        },
        dataSource: []
      }
    },
    computed: {},
    created () {
      if (!this.obj.FieldValue.parentIds) {
        this.obj.FieldValue.parentIds = []
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
      })
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.dataSource = res.data.Data
          }
        })
      },
      changeCheck (e) {
        // e.preventDefault()
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
          this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .item-rule__checkbox
    margin-left 0 !important
    margin-right 30px
</style>
