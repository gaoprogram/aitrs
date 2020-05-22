<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：计算公式右边的配置   
-->

<template>
  <el-form
    :model="setObj"
    :rules="setObjRules"
    :ref="setObj.FieldCode"
  >

    <!-- tableObj: {{tableObj}} -->
    <div class="base-set-input">
      <div class="item">
        <!-- <span class="title">字段名称：</span> -->
        <el-form-item 
          prop="FieldName" 
          label="字段名称："
          label-width="100px">
          <el-input 
            v-model="setObj.FieldName" 
            placeholder="最多8个字"></el-input>
        </el-form-item>
      </div>
      <div class="item marginL10">
        字段类型：自动计算列
      </div>

      <div class="item">
        <!-- <span class="title">字段描述：</span> -->
        <!-- <el-input v-model="setObj.Tips" placeholder="最多15个字"></el-input> -->
        <el-form-item 
          prop="Tips" 
          label="字段描述："
          label-width="100px">
          <el-input 
            v-model="setObj.Tips" 
            placeholder="最多15个字"></el-input>
        </el-form-item>        
      </div>

      <div class="item marginL10">
        <!-- <span>字体颜色：</span> -->
        <el-form-item label="字体颜色：" prop="Attribute.Color">
          <span class="u-f-ac">
            <span>{{setObj.Attribute.Color}}</span>
            <el-color-picker 
              v-model="setObj.Attribute.Color" 
              size="mini"
            ></el-color-picker>        
          </span>
        </el-form-item>
      </div>
      <div class="item marginL10">
        <!-- <span>字体大小：</span> -->
        <el-form-item 
          label="字体大小："
          label-width="100px" 
          prop="Attribute.Size"
        >
          <el-input 
            type="number"
            placeholder="字体大小,单位px" 
            v-model="setObj.Attribute.Size"
          ></el-input>        
        </el-form-item>
      </div>        

      <!--引用字段属性 基础组件----start--------->
      <template>
        <default-attribute-cmp :setObj.sync="setObj"></default-attribute-cmp>
      </template>
      <!--引用字段属性 基础组件-------end--->

      <div class="item">
        <!-- <span class="title">计算公式：</span> -->
        <div>
          <el-form-item label="计算公式：" label-width="100px" prop="CalculateRule">
            <el-input 
              v-model="setObj.CalculateRule" 
              type="textarea" 
              disabled 
              style="width: 198px" 
              :autosize="{minRows: 2, maxRows: 5}"
            ></el-input>
            <el-button 
              size="small" 
              type="primary" 
              @click.native="dialogFormVisible = true"
            >配置</el-button>
          </el-form-item>
        </div>
      </div>
      <div class="item">
        <!-- <span class="title">是否必填：</span> -->
        <el-form-item 
          prop="Required" 
          label="是否必填：" 
          label-width="100px">
          <el-switch
            style="width:calc(100% - 100px)"
            v-model="setObj.Required"
            active-value="1"
            inactive-value="0"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>
      </div>
      <div class="item">
        <!-- <span class="title">是否隐藏：</span> -->
        <el-form-item 
          prop="Hidden"
          label-width="100px"
          label="是否隐藏：">
          <el-switch
            style="width:calc(100% - 100px)"
            v-model="setObj.Hidden"
            active-value="1"
            inactive-value="0"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>
      </div>

      <!---计算公式配置弹框dialog-----start-->
      <el-dialog
        title="计算公式配置"
        :append-to-body="true"
        :show-close="false"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        fullscreen
        custom-class="dialog-calculate"
      >
        <div class="content-container">
          <div class="left-container">
            <el-card>
              <div class="title">
                数字控件
              </div>
              <!-- tableObj: {{tableObj}}
              ---
              numFieldList:{{numFieldList}} -->
              <div style="height: 400px">
                <el-scrollbar style="height: 100%" :native="false">
                  <div style="width: 100px">
                    <div 
                      v-for="(item,key) in numFieldList"
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
                      v-for="(item,key) in calculateMark"
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
  </el-form>
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
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: {
      DefaultAttributeCmp
    },
    data () {
      let validFieldName = (rule, value, callback) => {
        debugger
        if(this.setObj.FieldName){
          callback()
        }else {
          callback(new Error(`字段名称为空`))
        }
      }    
      
      let validSize = (rule, value, callback) => {
        debugger
        if(this.setObj.Attribute.Size){
          callback()
        }else {
          callback(new Error(`字体大小为空`))
        }
      }  
      let validCalculateRule = (rule, value, callback) => {
        debugger
        if(this.setObj.CalculateRule){
          callback()
        }else {
          callback(new Error(`计算公式未配置`))
        }
      }              
      return {
        dialogFormVisible: false,
        setObjRules: {
          FieldName:[{required: true, validator: validFieldName, trigger:['change','blur']}],
          // Required: [{required: true, validator: validRequired, trigger:['change','blur']}],
          Attribute: {
            // Size: [{required: true, validator: validSize, trigger:['change','blur']}]
          },
          // TextType: [{required: true, validator: validTextType, trigger: ['change','blur']}]
          CalculateRule: [{required: true, validator: validCalculateRule, trigger: ['change','blur']}]
        },        
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
        // numFieldList: []
      }
    },
    computed:{
      numFieldList(){
        // 获取数字和金额控件
        let arr = []
        if (this.tableObj && this.tableObj.length) {
          console.log("-------",this.tableObj)
          this.tableObj.forEach(i => {
            if (i.ControlType === '3' || i.ControlType === '4') {
              arr.push(i)
            }
          })
        }
        return arr
      }
    },
    created () {
      try {
        this.setObj.Required += ''
        this.setObj.Hidden += ''
      } catch (error) {
        
      }      
    },
    methods: {
      // 点击数字或符号控件
      handleNumFieldOrMark (item) {
        debugger
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
        if(!this.setObj.CalculateRule){
          this.setObj.CalculateRule = item
        }else {
          this.setObj.CalculateRule += item
        }
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
      .el-form-item
        margin-bottom 0 !important         

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
