<!--
  User: gaol
  Date: 2019/8/06
  功能：计算公式  controletype 为 16 
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
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
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="isShowField">
    <!-- obj：{{obj}} -->

    <div 
      class="filedContentWrap u-f-ac u-f-jst"
    >
      <div class="titWrap u-f-ac" v-show="isTitle">
        <span 
          class="tit ellipsis2"
          :style="fieldLabelStyle"
        >
        {{isTitle ? obj.DisplayName : ''}}
        <icon-svg 
          class="fieldRequiredIcon"
          v-show="!isShowing && obj.Require"
          :icon-class="RequiredSvg"
        ></icon-svg>   
        <el-tooltip 
          v-if="obj.Description"
          :content="obj.Description">
          <i class="el-icon-info"></i>
        </el-tooltip>                
        </span>
      </div>

      <div 
        class="fieldValueWrap u-f0" 
        v-if="!isShowing"
      >
        <el-input 
          v-model="obj.CalculateRule" 
          type="textarea" 
          disabled 
          style="width: 198px" 
          :autosize="{minRows: 2, maxRows: 5}" 
        ></el-input>
        <el-button 
          size="small" 
          type="primary" 
          :disabled="obj.Readonly || !isHasAddOrEditAuth()"          
          @click.native="dialogVisible = true"
        >配置</el-button>        
      </div>
      
      <div 
        class="fieldValueWrap showValue line-bottom u-f0" 
        v-else
      >
        <span> {{obj.CalculateRule}} = {{obj.FieldValue || '无'}}</span>
      </div> 




      <!---计算公式配置弹框dialog-----start-->
      <el-dialog
        title="计算公式配置"
        :append-to-body="true"
        :show-close="false"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!---计算公式配置弹框dialog-----end-->             
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel, validateViewAuth } from '@/utils/validate'
  import iconSvg from '@/base/Icon-svg/index'
  export default {
    props: {
      // 是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },
      obj: {
        type: Object,
        default: {}
      },
      tableObj: {
        type: Object,
        default: () => {
          return {}
        }
      }, 
      setObj: {
        type: Object,
        default: () => {
          return {}
        }
      },          
      prop: {
        type: String,
        default: ''
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      // 是否是直接显示 还是 新增或者编辑 这个决定了 此字段组件 在不同视图场景下的正确权限显示
      viewType: {
        type: String,
        default: ''   // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
      },      
    },
    component: {
      iconSvg
    },
    data () {
      return {
        resAuth: {
          "scanViewEncry": 0,  // 查看视图是否加密   1 和 0 区分
          "addorEditViewEdit": 1,  // 新增/编辑视图是否可编辑   1 和 0 区分
          "scanViewShow": 1,  // 查看视图是否可见   1 和 0 区分
          "editViewShow": 1,  // 编辑视图是否可见   1 和 0 区分
          "addViewShow": 1,  // 新增视图是否   1 和 0 区分          
        },         
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',
        rules: {
          required: false
        },        
        dialogVisible: false, // 配置计算公式弹框显示/隐藏
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
      // 是否显示字段 
      isShowField(){
        // {
        //   "scanViewEncry": str.split("")[4],  // 查看视图是否加密   1 和 0 区分
        //   "addorEditViewEdit": str.split("")[3],  // 新增/编辑视图是否可编辑   1 和 0 区分
        //   "scanViewShow": str.split("")[2],  // 查看视图是否可见   1 和 0 区分
        //   "editViewShow": str.split("")[1],  // 编辑视图是否可见   1 和 0 区分
        //   "addViewShow": str.split("")[0],  // 新增视图是否   1 和 0 区分
        // }

        // '' 和View-TM 直接显示   新增：Add-TM  编辑：Edit-TM 删除：Del-TM  查看：View-TM  表的话就是Add-SH，Edit-SH，Del-SH，View-SH
        switch(this.viewType){
          case 'View-TM':  //查看页面 
          case 'View-SH':
          case  '3001':
            this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
            return true
          case  'Add-TM':  // 新增页面
          case  'Add-SH':  
          case  '3002':
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          case  'Edit-TM': // 编辑页面
          case  'Edit-SH': 
          case  '3003': 
          case  '3005': 
            if(this.obj.Vr) {
              // 视图的 显示编辑权限
              this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))
              // debugger
              // alert(222222)
              return this.resAuth.addViewShow == 1 ? true: false
            } 
          default:
            this.resAuth = Object.assign(this.resAuth, validateViewAuth(this.obj.Vr, this.obj))            
            // 默认情况下 都显示字段
            return true
        }
      }, 
      // 是否加密显示字段
      isPassWordField(){
        return this.resAuth().scanViewEncry == 1 ? true: false
      },
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
    beforeDestroy () {
      // 销毁
    },
    methods: {
      // 新增/编辑页面 是否有权限编辑
      isHasAddOrEditAuth(){
        return this.resAuth.addorEditViewEdit == 1 ? true : false
      },
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


