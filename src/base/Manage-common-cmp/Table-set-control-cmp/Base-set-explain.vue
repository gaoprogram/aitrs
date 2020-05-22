<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：设置说明弹窗 controlType 24
-->

<template>
  <el-form
    :model="setObj"
    :rules="setObjRules"
    :ref="setObj.FieldCode"
  >
    <!-- setObj: {{setObj}} -->
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
        字段类型：说明
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
      <div class="item marginL10">
        <span class="title">字段设置：</span>
        <el-button type="primary" size="small" @click.native="dialogEditor = true">编辑</el-button>
      </div>
      <!--引用字段属性 基础组件----start--------->
      <template>
        <default-attribute-cmp :setObj.sync="setObj"></default-attribute-cmp>
      </template>
      <!--引用字段属性 基础组件-------end--->       

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

      <div class="explainBox" v-if="dialogEditor">
        <el-dialog
          title="说明"
          :visible.sync="dialogEditor"
          width="800px"
          :show-close="false"
          :append-to-body="true"
          :close-on-click-modal="false"
          center
        >
          <aitrs-editor
            ref="aitrsEditor"
            @editor="changeContent"
            :obj="setObj"
            :flowContent="setObj.DefaultValue"
            :isShowImg=false
            :placeholder="setObj.Description"
          >
          </aitrs-editor>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEditor = false">取 消</el-button>
            <el-button type="primary" @click="dialogEditor = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import DefaultAttributeCmp from './default-attribute-cmp'
  export default {
    props: {
      setObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      textTypeList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: {
      AitrsEditor,
      DefaultAttributeCmp
    },     
    watch: {
      setObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          console.log('editor', newValue, oldValue)
          this.$emit('update:setObj', newValue)
        },
        deep: true
      }
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
      return {
        dialogEditor: false,
        setObjRules: {
          FieldName:[{required: true, validator: validFieldName, trigger:['change','blur']}],
          // Required: [{required: true, validator: validRequired, trigger:['change','blur']}],
          Attribute: {
            // Size: [{required: true, validator: validSize, trigger:['change','blur']}]
          }
        }          
      }
    },
    methods: {
      changeContent (val) {
        this.setObj.DefaultValue = val
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .base-set-input
    .item /deep/
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc
      .el-select
        width 100%!important
      .el-form-item
        margin-bottom 0 !important      
</style>
