<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量导出中  添加 模板组件 
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.addNewTemplate-cmp
    .templateNameBox
        padding 0 20px
        box-sizing border-box  
</style>
<template>
  <div class="addNewTemplate-cmp" v-loading="loading">
      <!-- pageCode: {{pageCode}}
      templateCode: {{templateCode}}
      isAddNewTemplate: {{isAddNewTemplate}} -->
      <!-- newTemplateName： {{newTemplateName}} -->
    <div class="templateNameBox">
        <span class="tit">模块名称:</span>
        <el-input
            v-model="newTemplateName"
            style="width:300px"
            placeholder="请输入模板名称"
        ></el-input>
    </div>

    <template-first-category-cmp 
        :pageCode = "pageCode"
        :templateCode ="templateCode"
        :isAddNewTemplate="isAddNewTemplate"
        @saveTemplate="saveTemplate"
        @cancelTemplate="cancelTemplate"
    ></template-first-category-cmp>
  </div>
</template>

<script type="text/ecmascript-6">
  import TemplateFirstCategoryCmp from './TemplateFirstCategory-cmp'
  import { PaBatchHandlerMixin } from '@/utils/PA-mixins'
  export default {
    mixins: [ PaBatchHandlerMixin ],
    props: {
        isAddNewTemplate: {
            type: Boolean,
            default: true
        },
        templateCode: {
            type: [String, Number],
            default: ''
        },
        pageCode: {
            type: [String, Number],
            default: ''
        },
        showAddNewTemplateDailog: {
            type: Boolean,
            default: true
        }
    },
    components: {
        TemplateFirstCategoryCmp
    },
    data(){
        return {
            loading: false,
            newTemplateName: '', // addNewTemplate-cmp 组件中 新增模板 的名称  
            showExportOrImprtBtn: false, // 控制 批量入职batchJoinJob-cmp 、 批量修改batchEdit-cmp 、 批量导出batchExpor-cmp 组件 中的 导出/导入按钮的显示/隐藏
            showSetEmpTemplate: false, //控制 设置模板的显示/隐藏
            showDailog: this.showAddNewTemplateDailog
        }
    },
    created() {
        debugger
        // 批量入职取消
        this.$bus.$on("handlerCancelTemplate", () => {
            debugger
            this.showSetEmpTemplate = false
        })
        // 批量入职 保存
        this.$bus.$on("handlerSaveTemplate", (data, templateCode) => {
            debugger
            this._saveTemplate(data, templateCode)
        })
        // 批量入职  执行
        this.$bus.$on("handlerExcuteTemplate", (data, templateCode) => {
            debugger
            this.handlerBatchExportByTemplate(data, templateCode)
        }) 
    },
    beforeDestroy(){
        this.$bus.$off("handlerCancelTemplate")
        this.$bus.$off("handlerSaveTemplate")
        this.$bus.$off("handlerExcuteTemplate") 
    },   
    watch: {
        showDailog:{
            handler(newValue, oldValue){
                this.$emit("update: showAddNewTemplateDailog", newValue)
            }
        }
    }, 
    methods: {

    }
  }
</script>
