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
        .relativeSetComponet
          position absolute 
          top 0 
          left 0
</style>

<template>
  <div class="default-attribute-cmp">
    <div class="item">
      <span class="title">默认属性：</span>
      <el-select
        v-model="selectedValue"
      >
        <el-option
          v-for="item in defaultList"
          :key="item.code"
          :label="item.value"
          :value="item.code">
        </el-option>
      </el-select>

      <div class="relationAttrSetBox" v-if="showRelationBtn">
        <el-button type="primary" size="small" @click.native="showRelationSetComponents = true">数据联动</el-button>

        <div class="relativeSetComponet" v-if="showRelationSetComponents">
          <el-dialog 
            title="" 
            append-to-body
            show-close
            width="40%"
            :close-on-click-modal="false"
            :visible.sync="showRelationSetComponents">
              
              <!----引用数据联动基础组件----start--->
              <default-attribute-attrset-cmp :relationAttrSetObj.sync="relationAttrSetObj"></default-attribute-attrset-cmp>
              <!----引用数据联动基础组件----end--->
          </el-dialog>
        </div>
      </div>
    </div>


    
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getDicCollection } from '@/api/permission'
  import { getParentDic, getDicWithConfig } from '@/api/common-dic'
  import DefaultAttributeAttrsetCmp from './default-attribute-attrset-cmp'
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
      DefaultAttributeAttrsetCmp
    },      
    data () {
      return {
        selectedValue: 0,  
        defaultList: [
          {
            code: 0,
            value: "无"
          },
          {
            code: 1,
            value: "数据联动"
          }
        ],
        showRelationBtn: false,  // 控制数据联动的btn按钮的显示/隐藏
        showRelationSetComponents: false,  // 控制数据联动设置组件的显示
        relationAttrSetObj: {}   // 默认属性中的 传给关联属性设置弹框中要用的对象
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
      selectedValue: {
        handler (newValue, oldValue){
          if(newValue === 1){
            // 选择的是 数据关联 此时需要显示 "数据联动" 的button
            this.showRelationBtn = true
          }else {
            this.showRelationBtn = false
          }
        }
      }
    },  
    created () {

    },
    methods: {

    }
  }
</script>

