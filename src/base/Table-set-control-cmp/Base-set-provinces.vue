<!--
  User: gaol
  Date: 2020/04/26
  功能：省市区 controlType 27
-->

<template>
  <el-form
    :model="setObj"
    :rules="setObjRules"
    :ref="setObj.FieldCode"
  >
    <div class="base-set-input">
      <div class="item">
        <!-- <span class="title">字段名称：</span> -->
        <el-form-item 
          prop="FieldName" 
          label="字段名称：">
          <el-input 
            v-model="setObj.FieldName" 
            placeholder="最多8个字"></el-input>
        </el-form-item>        
      </div>
      <div class="item marginL10">
        字段类型：省市区
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
        <!-- <span class="title">是否显示区：</span> -->
        <el-form-item 
          prop="Ext.HasChildren" 
          label="是否显示区：">
          <el-switch
            v-model="setObj.Ext.HasChildren"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>
      </div>

      <div class="item">
        <!-- <span class="title">是否竖直显示：</span> -->
        <el-form-item 
          prop="Ext.Vertical" 
          label="是否竖直显示：">
          <el-switch
            v-model="setObj.Ext.Vertical"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>
      </div>      

      <div class="item">
        <!-- <span class="title">是否必填：</span> -->
        <el-form-item 
          prop="Required" 
          label="是否必填：">
          <el-switch
            style="width:calc(100% - 100px)"
            v-model="setObj.Required"
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
          label="是否隐藏：">
          <el-switch
            v-model="setObj.Hidden"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>
      </div>

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
      return {
        setObjRules: {
        //   FieldName:[{required: true, validator: validFieldName, trigger:['change','blur']}],
        //   // Required: [{required: true, validator: validRequired, trigger:['change','blur']}],
        //   Attribute: {
        //     Size: [{required: true, validator: validSize, trigger:['change','blur']}]
        //   }
        }        
      }
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
    .item
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc
      & >>> .el-select
        width 100%!important
      .el-form-item
        margin-bottom 0 !important        
</style>
