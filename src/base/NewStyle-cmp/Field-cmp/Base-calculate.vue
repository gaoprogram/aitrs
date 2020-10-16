<!--
  User: gaol
  Date: 2019/8/06
  功能：计算公式  controletype 为 16 
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "common-fieldcmp-style.styl";
</style>
<template>
  <el-form-item
    :prop="prop"
    :rules="rules"
    v-if="!obj.Hidden">
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
        </span>
        <el-tooltip 
          v-if="obj.Tips"
          :content="obj.Tips">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <!-- trObj: {{trObj}}------ -->
      <!-- {{obj.CalculateRule}}:--{{totalValue}}--------rowIdx:{{rowIdx}}---moneyIdx:{{moneyIdx}} -->
      <!-- {{obj.CalculateRule}}  =   {{totalValue}} -->
      {{obj.CalculateRule}}  =   {{obj.FieldValue || '无'}}
    </div>
  </el-form-item>
</template>

<script type="text/ecmascript-6">
  import { validatEmail, validatMobilePhone, validatTel } from '@/utils/validate'
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
      sid: {
        type: Number,
        default: 0
      },
      obj: {
        type: Object,
        default: {}
      },
      prop: {
        type: String,
        default: ''
      },
      isTitle: {
        type: Boolean,
        default: true
      },
      trObj: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    component: {
      iconSvg
    },
    data () {
      return {
        RequiredSvg: 'Required',
        fieldLabelStyle: 'color: #000000;width: 100px',
        rules: {
          required: false
        },
        totalValue: this.obj.CalculateRule, // 结算的结果值
        rowIdx: '',
        moneyIdx: '',
      }
    },
    created () {
      // 发起页面 中 接收 明细表中 某行的 数字输入框 (Base/table-control-rule-cmp/num-input.vue)或者 金额输入框(Base/table-control-rule-cmp/money-input.vue) 输入值变化后的一个事件
      this.$bus.$on('numChange', (data, tdIdx) => {
        // debugger
        // console.log(this.obj)
        if(data && data.length){
          try{
            if(this.trObj[0].RowNo == data[0].RowNo){
              // window.alert("numChanged",data[0].RowNo)
              this.rowIdx = data[0].RowNo
              if(this.obj.CalculateRule){
                // 存在计算公式
                data = data.filter((item => {
                  // 去除 计算属性的td
                  // return item.ControlType != '16' 
                  // 剔除除  数字输入组件    controltype 为 3  金额输入组件 controletype 为 4 的所有td
                  return item.ControlType == '3' || item.ControlType == '4'                
                }))   
                // 复制一个 this.obj.CalculateRule
                let newObj=this.obj.CalculateRule
                for(var i =0;i<data.length;i++){
                  var attr = data[i].DisplayName
                  var val = data[i].FieldValue
                  debugger
                  console.log("前",newObj)
                  newObj = newObj.replace(attr, val)
                  // newObj = eval("(" + newObj + ")") 
                  console.log("后",newObj)
                  console.log(typeof(newObj))
                }
                try {
                  this.totalValue = eval("(" +  newObj  + ")" )
                } catch (error) {
                  Promise.reject(error)
                }
                this.obj.FieldValue = this.totalValue
                console.log("终", newObj)
              }
            }
          }catch(error){
            console.log(error)
          }
        }
      })

      this.$bus.$on('moneyChange', (data, tdIdx) => {
        // debugger
        // console.log(this.obj)
        if(data && data.length){
          try{
            if(this.trObj[0].RowNo == data[0].RowNo){
              // window.alert("moneyChanged",data[0].RowNo)
              this.moneyIdx = data[0].RowNo
              if(this.obj.CalculateRule){
                // 存在计算公式
                data = data.filter((item => {
                  // 去除 计算属性的td
                  // return item.ControlType != '16' 
                  // 剔除除  数字输入组件    controltype 为 3  金额输入组件 controletype 为 4 的所有td
                  return item.ControlType == '3' || item.ControlType == '4'
                }))
                // 复制一个 this.obj.CalculateRule
                let newObj=this.obj.CalculateRule
                for(var i =0;i<data.length;i++){
                  var attr = data[i].DisplayName
                  var val = data[i].FieldValue
                  debugger
                  console.log("前",newObj)
                  newObj = newObj.replace(attr, val)
                  // newObj = eval("(" + newObj + ")") 
                  console.log("后",newObj)
                  console.log(typeof(newObj))
                }

                try {
                  this.totalValue = eval("(" +  newObj  + ")" )
                } catch (error) {
                  Promise.reject(error)
                }     
                this.obj.FieldValue = this.totalValue
                console.log("终", newObj)
              }            
            }
          }catch(error){
            console.log(error)
          }
        }
      })
    },
    beforeDestroy () {
      // 销毁
      this.$bus.$off('numChange')
      this.$bus.$off('moneyChange')
    },
    methods: {},
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


