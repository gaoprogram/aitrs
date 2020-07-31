<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：公司组织  controlType 20
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <company-structure-cmp
      :isTitle="false"
      title="抄送人员"
      :tabType="['zuzhi']"
      :selectedList="obj.FieldValue"
      @upData="updata"
    ></company-structure-cmp>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
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
          callback()
          return
        }

        if( this.obj.Role ){
          // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
          if( this.obj.Role === 2){
            // role 1 是只读  2 是读写 4 是隐藏
            if (this.obj.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
              callback(new Error('请选择' + this.obj.FieldName))
            } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.length > this.obj.MaxLength) {
              callback(new Error(`${this.obj.FieldName}最多选择${this.obj.MaxLength}个`))
            } else {
              callback()
            } 
          }else {
            callback()
          }
        }else {
          if (this.obj.Required && this.obj.FieldValue && !this.obj.FieldValue.length) {
            callback(new Error('请选择' + this.obj.FieldName))
          } else if (this.obj.MaxLength > 0 && this.obj.FieldValue.length > this.obj.MaxLength) {
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
        orgVisible: false,
        orgDefaultProps: [],
        defaultCheckedKeys: []
      }
    },
    created () {
      if (!this.obj.FieldValue) {
        this.obj.FieldValue = []
      }
    },
    methods: {
      updata (val) {
        if (val.length) {
          this.obj.FieldValue = val.map(item => {
            return {
              Id: item.NodeId,
              Name: item.Name
            }
          })
        } else {
          this.obj.FieldValue = []
        }
        this.$emit('changeEmp', this.prop)
      }
    },
    watch: {
      obj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          if (!this.obj.FieldValue) {
            this.obj.FieldValue = []
          }
          this.$emit('update:obj', newValue)
        },
        deep: true
      }
    },
    components: {
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
