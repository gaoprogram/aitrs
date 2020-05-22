<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：计算公式右边的配置
-->

<template>
  <div class="base-set-input">
    <div class="item">
      <span class="title">字段名称：</span>
      <el-input v-model="setObj.FieldName" placeholder="最多8个字"></el-input>
    </div>
    <div class="item">
      字段类型：自动计算列
    </div>

    <div class="item marginL10">
      <span>字体颜色：</span>
        <span class="u-f-ac">
          <span>{{setObj.Attribute.Color}}</span>
          <el-color-picker 
            v-model="setObj.Attribute.Color" 
            size="mini"
          ></el-color-picker>        
        </span>
    </div>
    <div class="item marginL10">
      <span>字体大小：</span>
        <el-input 
          type="number"
          placeholder="字体大小,单位px" 
          v-model="setObj.Attribute.Size"
        ></el-input>        
    </div> 

    <!--引用字段属性 基础组件----start--------->
    <template>
      <default-attribute-cmp :setObj.sync="setObj"></default-attribute-cmp>
    </template>
    <!--引用字段属性 基础组件-------end--->

    <div class="item">
      <span class="title">计算公式：</span>
      <div>
        <el-input v-model="setObj.CalculateRule" type="textarea" disabled style="width: 198px" :autosize="{minRows: 2, maxRows: 5}" ></el-input>
        <el-button size="small" type="primary" @click.native="dialogFormVisible = true">配置</el-button>
      </div>
    </div>
    <div class="item">
      <span class="title">是否必填：</span>
      <el-switch
        v-model="setObj.Required"
        active-color="#3B8BE3"
        inactive-color="#cccccc"
      >
      </el-switch>
    </div>
    <div class="item">
      <span class="title">是否隐藏：</span>
      <el-switch
        v-model="setObj.Hidden"
        active-color="#3B8BE3"
        inactive-color="#cccccc"
      >
      </el-switch>
    </div>

    <!---计算公式配置弹框dialog-----start-->
    <el-dialog
      title="计算公式配置"
      :append-to-body="true"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="700px"
      custom-class="dialog-calculate"
    >
      <div class="content-container">
        <div class="left-container">
          <el-card>
            <div class="title">
              数字控件
            </div>
            <div style="height: 400px">
              <el-scrollbar style="height: 100%" :native="false">
                <div style="width: 100px">
                  <div 
                    v-for="(item, key) in numFieldList"
                    :key="key">
                    <div style="margin-bottom: 10px" @click="handleNumFieldOrMark(item.FieldName)">
                      <el-tag style="width: 100%;text-align: center">{{item.FieldName}}</el-tag>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </el-card>
        </div>
        <div class="mid-container">
          <el-input v-model="setObj.CalculateRule" type="textarea" :autosize="{minRows: 10, maxRows: 20}" disabled></el-input>
        </div>
        <div class="right-container">
          <el-card>
            <div class="title">
              计算符号
            </div>
            <div style="height: 400px">
              <el-scrollbar style="height: 100%" :native="false">
                <div style="width: 100px">
                  <div 
                    v-for="(item, key) in calculateMark"
                    :key="key">
                    <div style="margin-bottom: 10px" @click="handleNumFieldOrMark(item)">
                      <el-tag style="width: 100%;text-align: center">{{item}}</el-tag>
                    </div>
                  </div>
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
    </el-dialog>
    <!---计算公式配置弹框dialog-----end-->

  </div>
</template>

<script type="text/ecmascript-6">
  import DefaultAttributeCmp from './default-attribute-cmp'
  export default {
    props: {
      setObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      tableObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      DefaultAttributeCmp
    },
    data () {
      return {
        dialogFormVisible: false,
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
    created () {
      // 获取数字和金额控件
      if (this.tableObj.Fields && this.tableObj.Fields.length) {
        this.tableObj.Fields.forEach(i => {
          if (i.ControlType === '3' || i.ControlType === '4') {
            this.numFieldList.push(i)
          }
        })
      }
      if (this.tableObj.Teams && this.tableObj.Teams.length) {
        this.tableObj.Teams.forEach(i => {
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
          this.setObj.CalculateRule = ''
          return
        }
        if (item === '退格') {
          this.setObj.CalculateRule = this.setObj.CalculateRule.substring(0, this.setObj.CalculateRule.length - 1)
          return
        }
        if (item !== '+' && item !== '-' && item !== '*' && item !== '/' && item !== '(' && item !== ')') {
          item = `[${item}]`
        }
        this.setObj.CalculateRule += item
      }
    },
    watch: {
      // tableObj: {
      //   handler (newValue, oldValue) {
      //     // 获取数字和金额控件
      //     if (newValue.Fields && newValue.Fields.length) {
      //       newValue.Fields.forEach(i => {
      //         if (i.ControlType === '3' || i.ControlType === '4') {
      //           this.numFieldList.push(i)
      //         }
      //       })
      //     }
      //     if (newValue.Teams && newValue.Teams.length) {
      //       newValue.Teams.forEach(i => {
      //         if (i.Fields && i.Fields.length) {
      //           i.Fields.forEach(item => {
      //             if (i.ControlType === '3' || i.ControlType === '4') {
      //               this.numFieldList.push(i)
      //             }
      //           })
      //         }
      //       })
      //     }
      //   },
      //   immediate: true,
      //   deep: true
      // },
      setObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          console.log(newValue)
          this.$emit('update:setObj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .base-set-input /deep/
    .item
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc

  .dialog-calculate
    .el-dialog__body
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
