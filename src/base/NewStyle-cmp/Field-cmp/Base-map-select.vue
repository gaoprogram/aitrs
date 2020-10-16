<!--
  User: xxxxxxx
  Date: 2019/10/08
  功能：地点  controlType 22
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'common-fieldcmp-style.styl'
  .base-input-container
    display: flex;
    align-items: center;
    width: 300px;
    font-size: 0;
    text-align: right;
    .title
      display inline-block
      width 100px
      font-size 14px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .el-input
      width 200px
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden"
  >
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
        </span>
        <el-tooltip 
          v-if="obj.Tips"
          :content="obj.Tips">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div> 

      <el-input disabled style="width: 250px" size="mini" v-model="obj.FieldValue.LocationName" placeholder="请选择地点"></el-input>
      <el-button 
        type="primary" 
        class="selecetMapBtn marginL5" 
        size="small" 
        icon="el-icon-plus" 
        @click.native="showMap = true"></el-button>
      <!--引用百度地图的组件---start-->
      <map-cmp v-if="showMap" @cancelLocation="showMap = false" @saveLocaltion="handleSaveLocaltion" :obj="obj.FieldValue"></map-cmp>
      <!--引用百度地图的组件---end-->
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import MapCmp from './dialog-map'
  export default {
    props: {
      //是否需要校验
      isNeedCheck: {
        type: Boolean,
        default: false
      },      
      prop: {
        type: String,
        default: ''
      },
      obj: {
        type: Object,
        default: {}
      },
      // 是否直接显示控件的值, 默认false
      isShowing: {
        type: Boolean,
        default: false
      },         
      isTitle: {
        type: Boolean,
        default: true
      }
    },
    components: {
      MapCmp
    },    
    data () {
      let validatePass = (rule, value, callback) => {
        if(!this.isNeedCheck){
          callback()
          return
        }
        
        if (this.obj.Require && (!this.obj.FieldValue.LocationName)) {
          callback(new Error('请选择' + this.obj.DisplayName))
        } else {
          callback()
        } 
      }
      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',        
        rules: {
          required: this.obj.Require,
          type: 'array',
          validator: validatePass,
          trigger: ['change']
        },
        showMap: false
      }
    },
    created () {
    },
    methods: {
      handleSaveLocaltion (localtion) {
        console.log(localtion)
        this.showMap = false
        this.obj.FieldValue = localtion
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

