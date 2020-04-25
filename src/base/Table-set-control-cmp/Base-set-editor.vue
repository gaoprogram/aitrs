<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：设置富文本编辑器
-->

<template>
  <div class="base-set-input">
    <div class="item">
      <span class="title">字段名称：</span>
      <el-input v-model="setObj.FieldName" placeholder="最多8个字"></el-input>
    </div>
    <div class="item">
      字段类型：编辑器
    </div>
    <div class="item">
      <span class="title">字段提示：</span>
      <el-input v-model="setObj.Tips" placeholder="最多15个字"></el-input>
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
        placeholder="字体大小,单位px" 
        type="number"
        v-model="setObj.Attribute.Size"
      ></el-input>        
    </div>  
    <!--引用字段属性 基础组件----start--------->
    <template>
      <default-attribute-cmp :setObj.sync="setObj"></default-attribute-cmp>
    </template>
    <!--引用字段属性 基础组件-------end--->

    <div class="item">
      <span class="title">字段设置：</span>
      <el-button type="primary" size="small" @click.native="dialogEditor = true">编辑</el-button>
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
    <el-dialog
      title="编辑器"
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
        :content="setObj.FieldValue"
        :isShowImg=false
        :placeholder="setObj.Tips"
      >
      </aitrs-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditor = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditor = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
    components: {
      AitrsEditor,
      DefaultAttributeCmp
    },        
    data () {
      return {
        dialogEditor: false
      }
    },
    methods: {
      changeContent (val) {
        console.log(val)
        this.setObj.FieldValue = val
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
</style>
