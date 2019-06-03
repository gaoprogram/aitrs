<!--
  User: xxxxxxx
  Date: 2019/5/22
  功能：单选radio 规则验证
-->

<template>
  <el-form-item
    :class='obj.FieldCode'
    :label="isTitle ? obj.FieldName : ''"
    :prop="orderProp"
    :rules="rules"
    v-show="!obj.Hidden && obj.FieldCode !='TeamLeaderConfirmRole'"
  >
    <div class="radioBox" style="width: 300px;">

      <!-- {{obj.FieldCode}}
      {{obj.FieldValue}}
      {{groupRuleIsShow}} -->
      <!-- radio:{{dataSource}} -->
      <el-radio-group
        v-model="obj.FieldValue.parentIds"
        @change="changeRadioValue(obj.FieldValue.parentIds)"
      >
        <el-radio 
          class="item-rule__radio"
          v-for="source in dataSource"
          :key="source.Code"
          :label="source.Code"
        >{{source.Name}}</el-radio>
        <!-- {{source.Name}} -->
      </el-radio-group>
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
        dataSource: [],
        groupRuleIsShow: false// 组长规则的显示与隐藏
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {
        this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
        // 如果 this.obj.FieldCode == "TodolistModel" 且 this.obj.FieldValue.parentIds == 4(多人规则中的value值为4)
        if (this.obj && this.obj.FieldCode === 'TodolistModel') {
          if (this.obj.FieldValue.parentIds == 4) {
            document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'block'
          } else {
            document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'none'
          }
        }
      })
    },
    methods: {
      // 获取字典表数据源数据
      _getDicByKey (appCode, moduleCode, dicType, dicCode) {
        getDicByKey(appCode, moduleCode, dicType, dicCode).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.dataSource = res.data.Data
          }
        })
      },
      // radio value 值改变
      changeRadioValue (val) {
        console.log(val)
        //  触发 父组件 process-set 中 动态设置显示/隐藏  “提交到指定节点”  和 “用户指定操作者” 这两个动态的表单组件
        this.$emit('autoFlowSet', val, this.obj)
        debugger
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
      },
      'obj.FieldValue.parentIds': {
        handler (newValue, oldValue) {
          if (this.obj.FieldCode && this.obj.FieldCode == 'TodolistModel') {
            // 多人处理规则的 radio组时
            if (this.obj.FieldValue.parentIds == 4) {
              // 选择了 多人处理规则 radio 中的 “协作组长” 选项时，下面的 "组长规则"才会出现
              console.log(document.querySelectorAll("div[class~='TodolistModel']"))
              // document.querySelectorAll("div[class~='TodolistModel']")[0].style.display="none"
              document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'block'
            } else {
              document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'none'
            }
          }
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
