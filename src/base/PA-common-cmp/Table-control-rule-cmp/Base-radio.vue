<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：单选radio 规则验证    controlType 12  
-->

<template>
  <el-form-item
    :class='obj.FieldCode'
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-show="!obj.Config.Hidden"
  >
    <div class="radioBox" style="width: 300px;"> 
      <el-radio-group
        v-model="obj.FieldValue"
        @change="changeRadioValue(obj.FieldValue)"
      >
        <el-radio 
          class="item-rule__radio"
          v-for="source in dataSource"
          :key="source.ItemCode"
          :label="source.ItemName">
          {{source.ItemName}}
        </el-radio>
      </el-radio-group>
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  // import { getDicByKey } from '@/api/permission'
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
      obj: {
        type: Object,
        default: {}
      },
      isTitle: {
        type: Boolean,
        default: true
      },
    },
    data () {
      let validatePass = (rule, value, callback) => {
        debugger
        if( !this.isNeedCheck ){
          callback()
          return
        }

        if (this.obj.Config.Required && !this.obj.FieldValue.parentIds) {
          callback(new Error('请选择' + this.obj.FieldName))
        } else {
          callback()
          // callback(new Error('请选择' + this.obj.FieldName))
        }
      }
      return {
        rules: {
          required: this.obj.Config.Required,
          validator: validatePass,
          trigger: ['change']
        },
        dataSource: [],
      }
    },
    created () {
      this.$nextTick(() => {
        // 获取 radio 的选项
        this._PaGetDicDataSourceList(this.obj.Config.DicType, this.obj.Config.DataSource)
      })
    },
    mounted () {

    },
    methods: {
      // 获取字典表数据源数据
      _PaGetDicDataSourceList (DicType, DicCode) {
        PaGetDicDataSourceList(DicType, DicCode).then(res => {
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
        this.$emit('autoFlowSet', val, this.obj, this.teamCode)
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
