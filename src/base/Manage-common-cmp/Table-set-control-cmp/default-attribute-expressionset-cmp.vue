<!--
  User: gaol
  Date: 2019/7/23
  功能：table-config页面中 右边组件设置区域的 默认属性设置项 点击 公式 btn 后的弹框设置基础组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.default-attributeExpressionSet-cmp
  .content-container
    display flex
    .left-container /deep/
      flex 0 0 150px
      margin 2px
      .title
        padding 5px 10px
        background-color rgba(135, 141, 153, .1)
        margin-bottom 10px
        border-radius 5px
        text-align: center
      .el-scrollbar
        .el-scrollbar__wrap
          overflow-x hidden
    .mid-container
      flex 1
      margin 2px
    .right-container /deep/
      flex 0 0 100px
      margin 2px
      .title
        padding 5px 10px
        background-color rgba(135, 141, 153, .1)
        margin-bottom 10px
        border-radius 5px
        text-align: center
      .el-scrollbar
        .el-scrollbar__wrap
          overflow-x hidden
          .el-tag
            font-size 18px
</style>

<template>
  <div class="default-attributeExpressionSet-cmp">
    <!---计算公式配置-----start-->
      <div class="content-container">
        <div class="left-container">
          <el-card>
            <div class="title">
              数字控件
            </div>
            <div style="height: 400px">
              <el-scrollbar style="height: 100%" :native="false">
                <div style="width: 100px">
                  <template v-for="item in numFieldList">
                    <div style="margin-bottom: 10px" @click="handleNumFieldOrMark(item.FieldName)">
                      <el-tag style="width: 100%;text-align: center">{{item.FieldName}}</el-tag>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </el-card>
        </div>
        <div class="mid-container">
          <el-input  type="textarea" :autosize="{minRows: 10, maxRows: 20}" disabled></el-input>
        </div>
        <div class="right-container">
          <el-card>
            <div class="title">
              计算符号
            </div>
            <div style="height: 400px">
              <el-scrollbar style="height: 100%" :native="false">
                <div style="width: 100px">
                  <template v-for="item in calculateMark">
                    <div style="margin-bottom: 10px" @click="handleNumFieldOrMark(item)">
                      <el-tag style="width: 100%;text-align: center">{{item}}</el-tag>
                    </div>
                  </template>
                </div>
              </el-scrollbar>
            </div>
          </el-card>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    <!---计算公式配置-----end-->            
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicCollection } from '@/api/permission'
  import { getParentDic, getDicWithConfig } from '@/api/common-dic'

  import { mapGetters } from 'vuex'
  export default {
    props: {
      expressionAttrSetObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      expessionTableObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {

    },      
    data () {
      return {
        calculateMark: [
          '+',
          '-',
          '*',
          '/',
          '(',
          ')',
          '清空',
          '退格'
        ],
        numFieldList: []
      }
    },
    computed: {
      ...mapGetters([
        'currentFieldStore',
        'currentFieldsStore'
      ]),
    },
    watch: {
      expressionAttrSetObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:expressionAttrSetObj', newValue)
        },
        deep: true
      }
    },  
    created () {
      // 获取数字和金额控件
      if (this.expessionTableObj.Fields && this.expessionTableObj.Fields.length) {
        this.expessionTableObj.Fields.forEach(i => {
          if (i.ControlType === '3' || i.ControlType === '4') {
            this.numFieldList.push(i)
          }
        })
      }
      if (this.expessionTableObj.Teams && this.expessionTableObj.Teams.length) {
        this.expessionTableObj.Teams.forEach(i => {
          if (i.Fields && i.Fields.length) {
            i.Fields.forEach(item => {
              if (item.ControlType === '3' || item.ControlType === '4') {
                this.numFieldList.push(item)
              }
            })
          }
        })
      }
    },
    methods: {
      // 点击数字或符号控件
      handleNumFieldOrMark (item) {
        if (item === '清空') {
          // this.expressionAttrSetObj.CalculateRule = ''
          return
        }
        if (item === '退格') {
          // this.expressionAttrSetObj.CalculateRule = this.expressionAttrSetObj.CalculateRule.substring(0, this.expressionAttrSetObj.CalculateRule.length - 1)
          return
        }
        if (item !== '+' && item !== '-' && item !== '*' && item !== '/' && item !== '(' && item !== ')') {
          item = `[${item}]`
        }
        // this.expressionAttrSetObj.CalculateRule += item
      }
    }
  }
</script>

