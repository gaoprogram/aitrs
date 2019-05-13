<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：单选
-->

<template>
  <el-form-item
    :label="isTitle ? obj.FieldName : ''"
    :prop="orderProp"
    :rules="rules"
    v-if="!obj.Hidden"
  >
    <div class="radioBox" style="width: 300px;">
      <el-radio
        class="item-rule__radio"
        v-model="obj.FieldValue.parentIds"
        v-for="source in dataSource"
        :key="source.Code"
        :label="source.Code"
      >
        {{source.Name}}
      </el-radio>
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
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
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        if (this.obj.Required && (!this.obj.FieldValue.parentIds)) {
          callback(new Error('请选择' + this.obj.FieldName))
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
        dataSource: []
      }
    },
    created () {
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
