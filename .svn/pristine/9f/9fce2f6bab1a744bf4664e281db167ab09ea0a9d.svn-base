<!--
  User: xxxxxxx
  Date: 2018/11/27
  功能：金额输入框
-->

<template>
  <div class="money-input-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <el-input v-model="obj.DefaultValue" :placeholder="obj.Tips ||　'请选择'"></el-input>
    <span class="unit">{{changeUnit}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/permission'
  const APP_CODE = 'SYS' // 业务领域
  const MODULE_CODE_PA = 'PA' // 模块类型-PA
  const DIC_TYPE_PA = 'PA' // 字典类型 -PA
  const DIC_CODE_CURRENCY = 'Currency' // Currency--币种
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: true
      },
      title: {
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
      }
    },
    computed: {
      changeUnit () {
        let unit = this.unitList.filter(i => {
          return i.Code === this.obj.Unit
        })
        if (unit && unit.length) {
          return unit[0].Name
        }
      }
    },
    data () {
      return {
        selectValue: '',
        unitList: []
      }
    },
    created () {
      this._getUnit()
    },
    methods: {
      _getUnit () {
        getDicByKey(APP_CODE, MODULE_CODE_PA, DIC_TYPE_PA, DIC_CODE_CURRENCY).then(res => {
          if (res.data.State === REQ_OK) {
            this.unitList = res.data.Data
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .money-input-container
    display: flex;
    align-items: center;
    width: 350px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .unit
      font-size 12px
    .el-input
      width 200px
</style>
