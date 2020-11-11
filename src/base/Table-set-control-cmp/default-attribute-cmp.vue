<!--
  User: gaol
  Date: 2019/7/23
  功能：table-config页面中 右边组件设置区域的 默认属性设置项（此项属性因为很多设置组件都有此属性,故单独写一个组件）
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .default-attribute-cmp /deep/
    .item
      padding-bottom 15px
      margin-bottom 15px
      border-bottom 1px dashed #cccccc
      .el-select
        width 100%!important
      .relationAttrSetBox
        position relative
        padding-top 5px
        .relativeSetComponet
          position absolute 
          top 0 
          left 0
      .expressionSetBox
        position relative
        padding-top 5px
</style>

<template>
  <div class="default-attribute-cmp">
    <!-- setObj: {{setObj}} -->
    <div class="item">
      <span class="title">默认属性：</span>

      <!--下拉框选项--start--->
      <el-select
        v-model="setObj.Display"
      >
        <el-option
          v-for="item in defaultList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!--下拉框选项--end--->


      <!---数据联动----start-->
      <div class="relationAttrSetBox" v-if="showRelationBtn">
        <el-button type="primary" size="mini" @click.native="showRelationSetComponents = true">数据联动</el-button>
      </div>
      <!---数据联动----end-->

      <!---编辑公式-----start--->
      <div class="expressionSetBox" v-if="showExpressionBtn">
        <el-button type="primary" size="mini" @click.native="showExpressionSetComponents = true">编辑公式</el-button>
      </div>
      <!---编辑公式-----start--->

    </div>


    <!--数据联动dialog-----start--->
    <div class="relativeSetComponet" v-if="showRelationSetComponents">
      <el-dialog 
        title="数据联动设置" 
        append-to-body
        custom-class="setDataRelativeDialog"
        show-close
        width="45%"
        :close-on-click-modal="false"
        :visible.sync="showRelationSetComponents">
          
          <!----引用数据联动基础组件----start--->
          <default-attribute-attrset-cmp :relationAttrSetObj.sync="relationAttrSetObj"></default-attribute-attrset-cmp>
          <!----引用数据联动基础组件----end--->
      </el-dialog>
    </div>
    <!--数据联动dialog-----end--->


    <!---编辑公式dialog----start---->
    <div class="expressionSetComponet" v-if="showExpressionSetComponents">
      <el-dialog 
        title="" 
        append-to-body
        show-close
        width="40%"
        :close-on-click-modal="false"
        :visible.sync="showExpressionSetComponents">
          <!----引用公式设置的基础组件----start--->
          <default-attribute-expressionset-cmp 
              :expressionAttrSetObj.sync="expressionAttrSetObj"
              expessionTableObj="">
          </default-attribute-expressionset-cmp>
          <!----引用公式设置的基础组件----end--->
      </el-dialog>
    </div>    
    <!---编辑公式dialog----end---->
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicCollection } from '@/api/permission'
  import { getParentDic, getDicWithConfig } from '@/api/common-dic'
  import DefaultAttributeAttrsetCmp from './default-attribute-attrset-cmp'
  import DefaultAttributeExpressionsetCmp from './default-attribute-expressionset-cmp'
  import { mapGetters } from 'vuex'
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
      DefaultAttributeAttrsetCmp,
      DefaultAttributeExpressionsetCmp
    },      
    data () {
      return {
        // selectedValue: 0,  
        defaultList: [
          {
            value: 0,
            label: "无"
          },
          {
            value: 1,
            label: "数据联动"
          },
          {
            value: 2,
            label: "公式"
          }
        ],
        showRelationBtn: false,  // 控制数据联动的btn按钮的显示/隐藏
        showExpressionBtn: false,  // 控制 公式的 btn 按钮的显示/隐藏
        showRelationSetComponents: false,  // 控制数据联动设置组件的显示
        showExpressionSetComponents: false,  // 控制公式设置组件的显示
        relationAttrSetObj: {},   // 默认属性中的 传给数据关联设置弹框中要用的对象
        expressionAttrSetObj: {}   // 默认属性中的  传给 公司设置弹框中要用的对象
      }
    },
    computed: {
      ...mapGetters([
        'currentFieldStore',
        'currentFieldsStore'
      ]),
      getDataSourceType () {
        return this.isCustom ? this.dataSourceType : this.dataSourceType2
      }
    },
    watch: {
      setObj: {
        handler (newValue, oldValue) {
          // 每当obj的值改变则发送事件update:obj , 并且把值传过去
          this.$emit('update:setObj', newValue)
        },
        deep: true
      },
      'setObj.Display': {
        handler (newValue, oldValue){
          if(newValue == 0){
            // 显示默认值 需要 隐藏 数据联动 和公式 的btn
            this.showRelationBtn = false
            this.showExpressionBtn = false
          }else if (newValue == 1){
            // 选择的是 数据关联 此时需要显示 "数据联动" 的button
            this.showExpressionBtn = false
            this.showRelationBtn = true
          }else if(newValue == 2){
            // 选择的是 公式  此时需要显示公式 的button
            this.showRelationBtn = false
            this.showExpressionBtn = true
          }
        },
        immediate: true
      }
    },  
    created () {

    },
    methods: {

    }
  }
</script>

