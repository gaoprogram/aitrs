<!--
  User: xxxxxxx
  Date: 2018/10/11
  功能：下拉选择
-->

<template>
  <div class="common_select-container">
    <span v-if="showTitle" class="title" :title="title">{{title}}：</span>
    <el-select
      v-model="selectValue"
      :multiple="isMultiple"
      @change="changValue"
    >
      <el-option
        v-for="item in data"
        :key="item.Code"
        :label="item.Name"
        :value="item.Code">
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary */

  import { REQ_OK } from '@/api/config'
  import { getDicByKey } from '@/api/employee'
  export default {
    props: {
      showTitle: {
        type: Boolean,
        default: false
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
    data () {
      return {
        selectValue: [],
        data: []
      }
    },
    created () {
    },
    computed: {
      isMultiple () {
        // return false
        return this.obj.ControlType === '9' ? true : false
      }
    },
    mounted () {
      this._getDicByKey()
    },
    methods: {
      // 根据ModuleCode和DataSource获取所属字段的填充字典项
      _getDicByKey () {
        if (this.obj.ModuleCode && this.obj.DataSource) {
          getDicByKey(this.obj.ModuleCode, this.obj.DataSource).then(res => {
            if (res.data.State === REQ_OK) {
              this.data = res.data.Data
            } else {
              this.data = []
            }
          }).catch(() => {
            this.data = []
          })
        }
      },
      changValue () {
        this.$emit('commonValue', Object.assign({}, this.obj, { EndValue: this.selectValue }, { Sid: this.sid }))
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .common_select-container
    display inline-block
    width 300px
    margin-right 5px
    margin-bottom 5px
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
