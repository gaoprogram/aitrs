<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：设置金额输入框 controlType 4
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
          label="字段名称："
          label-width="100px">
          <el-input 
            v-model="setObj.FieldName" 
            placeholder="最多8个字"></el-input>
        </el-form-item>        
      </div>
      <div class="item marginL10">
        字段类型：金额
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
        <!-- <span class="title">币种：</span> -->
        <el-form-item label-width="100px" label="币种：" prop="Unit">
          <el-select
            v-model="setObj.Unit"
          >
            <el-option
              v-for="item in currencyList"
              :key="item.Code"
              :label="item.Name"
              :value="item.Code">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <!-- <span class="demonstration">小数位数（0-4）</span> -->
        <el-form-item 
          label-width="130px"
          label="小数位数（0-4）:" 
          prop="Attribute.Digit">
          <el-slider
            style="width: 200px;margin-left: 12px;"
            v-model="setObj.Attribute.Digit"
            :step="1"
            :max="4"
            show-stops>
          </el-slider>
        </el-form-item>
      </div>

      <div class="item">
        <!-- <span class="title">是否显示千分位：</span> -->
        <el-form-item 
          label="是否显示千分位：" 
          prop="Attribute.ThousandBit">
          <el-switch
            v-model="setObj.Attribute.ThousandBit"
            active-value="1"
            inactive-value="0"
            active-color="#3B8BE3"
            inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>
      </div>
      
      <div class="item">
        <!-- <span class="title">是否显示大写：</span> -->
        <el-form-item 
          label="是否显示大写：" 
          prop="Attribute.AutoCapital">
          <el-switch
            v-model="setObj.Attribute.AutoCapital"
            active-value="1"
            inactive-value="0"
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
      currencyList: {
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

      let validUnit = (rule, value, callback) => {
        debugger
        if(this.setObj.Unit){
          callback()
        }else {
          callback(new Error(`币种为空`))
          // callback()
        }
      }      

      let validDigit = (rule, value, callback) => {
        debugger
        if(this.setObj.Attribute.Digit){
          callback()
        }else {
          // callback(new Error(`小数位为空`))
          callback()
        }
      }      
      return {
        setObjRules: {
          FieldName:[{required: true, validator: validFieldName, trigger:['change','blur']}],
          Unit: [{required: true, validator: validUnit, trigger:['change','blur']}],
          Attribute: {
            // Size: [{required: true, validator: validSize, trigger:['change','blur']}],
            Digit:[{required: true, validator: validDigit, trigger:['change','blur']}]
          }
        }        
      }
    },
    created () {
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
      .el-form-item
        margin-bottom 0 !important        
</style>
