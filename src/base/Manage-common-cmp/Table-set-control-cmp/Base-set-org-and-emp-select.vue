<!--
  User: xxxxxxx
  Date: 2018/11/29
  功能：设置公司架构  controlType 21
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
        <el-form-item label="字段名称：" label-width="100px" prop="FieldName">
          <el-input 
            v-model="setObj.FieldName" 
            placeholder="最多8个字"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        字段类型：公司架构
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
        <!-- <span>最小选择个数（0-6）：</span> -->
        <el-form-item 
          label="最小选择个数（0-6）" 
          label-width="160px"
          prop="Min"
        >
          <el-input 
            type="number"
            placeholder="最小选择个数（0-6）" 
            v-model="setObj.Min"
          ></el-input>        
        </el-form-item>
      </div>     

      <div class="item">
        <!-- <span>最大选择个数（0-6）：</span> -->
        <el-form-item 
          label="最大选择个数（0-6）" 
          label-width="160px"
          prop="Max"
        >
          <el-input 
            type="number"
            placeholder="最大选择个数（0-6）" 
            v-model="setObj.Max"
          ></el-input>        
        </el-form-item>
      </div>    

      <div class="item">
        <!-- <span class="demonstration">选择个数（0-6）</span> -->
        <el-form-item 
          label-width="130px"
          label="选择个数（0-6）" 
          prop="MaxLength">
          <el-slider
            style="width: 200px;margin-left: 12px;"
            v-model="setObj.MaxLength"
            :step="1"
            :max="6"
            show-stops>
          </el-slider>
          <span style="font-size: 12px; color: #cccccc;margin-left:-100px"><span style="color: red">* </span>若选择个数为0个，则为可全部选择</span>
        </el-form-item>
      </div>

      <div class="item">
        <!-- <span class="title">是否必填：</span> -->
        <el-form-item 
          prop="Required" 
          label="是否必填：" 
          label-width="100px">
          <el-switch
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
      
      let validMin = (rule, value, callback) => {
        debugger
        if(this.setObj.Min ==='' || this.setObj.Min == null){
          callback(new Error(`最小选择个数为空`))
        }else {
          let target = this.setObj.Min * 1          
          if(typeof target === 'number' && !isNaN(target)){
            if(0<= target && target <= 6){
              callback()
            }else {
              callback(new Error(`最小选择个数不在0-6之间`))
            }
          }else {
            callback(new Error("请输入数字"))
          }
        }
      }   
      
      let validMax = (rule, value, callback) => {
        debugger
        if(this.setObj.Max ==='' || this.setObj.Max == null){
          callback(new Error(`最大选择个数为空`))
        }else {
          let target = this.setObj.Max * 1
          if(typeof target === 'number' && !isNaN(target)){
            if(0<= target && target <= 6){
              callback()
            }else {
              callback(new Error(`最大选择个数不在0-6之间`))
            }
          }else {
            callback(new Error("请输入数字"))
          }
        }
      }         
      return {
        setObjRules: {
          FieldName:[{required: true, validator: validFieldName, trigger:['change','blur']}],
          // Required: [{required: true, validator: validRequired, trigger:['change','blur']}],
          Attribute: {
            // Size: [{required: true, validator: validSize, trigger:['change','blur']}]
          },
          Min: [{required: true, validator: validMin, trigger:['change','blur']}],
          Max: [{required: true, validator: validMax, trigger:['change','blur']}],
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
