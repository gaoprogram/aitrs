<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：设置多选下拉框
-->

<template>
  <div class="base-set-input">
    <div class="item">
      <span class="title">字段名称：</span>
      <el-input v-model="setObj.FieldName" placeholder="最多8个字"></el-input>
    </div>
    <div class="item">
      字段类型：多选下拉框
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

    <!--数据源 基础组件--start--->
    <data-source-cmp :setObj.sync="setObj" :moduleList="moduleList" :isCustom="true" :isMul="true"></data-source-cmp>
    <!--数据源 基础组件--end--->

    <div class="item">
      <span class="demonstration">选择个数（0-6）</span>
      <el-slider
        style="width: 200px;margin-left: 12px;"
        v-model="setObj.MaxLength"
        :step="1"
        :max="6"
        show-stops>
      </el-slider>
      <span style="font-size: 12px; color: #cccccc"><span style="color: red">* </span>若选择个数为0个，则为可全部选择</span>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import DataSourceCmp from './data-source-cmp'
  import DefaultAttributeCmp from './default-attribute-cmp'
  export default {
    props: {
      setObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
      moduleList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: {
      DataSourceCmp,
      DefaultAttributeCmp
    },    
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
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
    .item /deep/
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc
      .el-select
        width 100%!important
</style>
