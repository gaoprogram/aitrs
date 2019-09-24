<!--
  User: xxxxxxx
  Date: 2019/5/22
  功能：单选radio 规则验证    controlType 12  
-->

<template>
  <el-form-item
    :class='obj.FieldCode'
    :label="isTitle ? obj.FieldName : ''"
    :prop="prop"
    :rules="rules"
    v-show="!obj.Hidden && obj.FieldCode !='TeamLeaderConfirmRole'"
  >
    <div class="radioBox" style="width: 300px;"> 
       <!-- obj.FieldValue.parentIds: {{obj.FieldValue.parentIds}} -->
       <!-- +++++ -->
       <!-- obj.Required: {{obj.Required}} -->
      <!-- this.obj.FieldCode: {{obj.FieldCode}} -->
      <!--obj.Required: {{obj.Required}} -->
      <!-- obj：{{obj}} -->
      <!-- {{obj.FieldCode}}-->
      <!-- {{obj.FieldValue}} -->
      <!-- {{groupRuleIsShow}}  -->
      <!-- radio:{{dataSource}} -->
      <!-- obj.DataSource： {{obj.DataSource}} -->
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
      },
      currentFields: {
        type: Array,
        default: () => {
          return []
        }
      },
      teamCode: {
        type: String,
        default: ''
      }
    },
    data () {
      let validatePass = (rule, value, callback) => {
        debugger
        if (this.obj && this.obj.DataSource === 'DealWay') {
          // 流程设置 中 流转异常优先级1  和  流转异常优先级 2 中的  处理方式的 验证
          if (this.obj.Required && (!this.obj.FieldValue.parentIds || this.obj.FieldValue.parentIds === '0')) {
            callback(new Error('请选择' + this.obj.FieldName))
          } else {
            callback()
            // callback(new Error('请选择' + this.obj.FieldName))
          }
        } else {

          if( this.obj.Role ){
            // 流转中 发起 、待办中的 表单字段 分组字段 明细表字段中的 字段权限
            if( this.obj.Role === 2){
              // role 1 是只读  2 是读写 4 是隐藏
              if (this.obj.Required && !this.obj.FieldValue.parentIds) {
                callback(new Error('请选择' + this.obj.FieldName))
              } else {
                callback()
                // callback(new Error('请选择' + this.obj.FieldName))
              }
            }else {
              callback()
            }
          }else {
            if (this.obj.Required && !this.obj.FieldValue.parentIds) {
              callback(new Error('请选择' + this.obj.FieldName))
            } else {
              callback()
              // callback(new Error('请选择' + this.obj.FieldName))
            }
          }     
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
        try {
          if (this.obj && this.obj.FieldCode === 'TodolistModel') {
            if (this.obj.FieldValue.parentIds === '4') {
              document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'block'
            } else {
              document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'none'
            }
          } 
        } catch (error) {
          
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
      },
      'obj.TableCode': {
        handler (newValue, oldValue) {
          this._getDicByKey(this.obj.ModuleCode, this.obj.ModuleCode, this.obj.DSType, this.obj.DataSource)
        },
        deep: true
      },
      'obj.FieldValue.parentIds': {
        handler (newValue, oldValue) {
          if (this.obj.FieldCode && this.obj.FieldCode === 'TodolistModel') {
            // 多人处理规则的 radio组时
            if (this.obj.FieldValue.parentIds === '4') {
              // 选择了 多人处理规则 radio 中的 “协作组长” 选项时，下面的 "组长规则"才会出现
              console.log(document.querySelectorAll("div[class~='TodolistModel']"))
              // document.querySelectorAll("div[class~='TodolistModel']")[0].style.display="none"
              document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'block'
            } else {
              document.querySelectorAll("div[class~='TeamLeaderConfirmRole']")[0].style.display = 'none'
            }
          } else if (this.obj.FieldCode === 'DealWay') {
            // 流转异常规则里面的  “处理方式”
              // this.obj.FieldValue.patentIds 变化后
            this.$emit('autoFlowSet', this.obj.FieldValue.parentIds, this.obj, this.teamCode)
          }
        },
        deep: true,
        immediate: true    // 首次进入时 也会监听
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
