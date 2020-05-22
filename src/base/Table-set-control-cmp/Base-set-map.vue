<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：设置地点
-->

<template>
  <div class="base-set-input">
    <div class="item">
      <span class="title">字段名称：</span>
      <el-input v-model="setObj.FieldName" placeholder="最多8个字"></el-input>
    </div>
    <div class="item">
      字段类型：地点
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
      }
    },
    components: {
      DefaultAttributeCmp
    },
    data () {
      return {
      }
    },
    watch: {
      setObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:setObj', newValue)
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .base-set-input
    .item
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc
      & >>> .el-select
        width 100%!important
</style>
