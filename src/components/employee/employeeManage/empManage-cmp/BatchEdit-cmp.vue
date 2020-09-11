<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量编辑员工
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.batchEdit-cmp
    padding 20px !important
    max-height 400px
    overflow auto
    box-sizing border-box
</style>
<template>
  <div class="batchEdit-cmp">
    <!---引入选择员工组件---start-->
    <div class="selectEmpBox">
        <emp-select-list-cmp
            :tabType="['renyuan']"  
            :selectedList="selectedList"        
            @upData="upData"        
        ></emp-select-list-cmp>
    </div>
    <!---引入选择员工组件----end-->

    <el-button 
        type="text" 
        @click.native="clickSetTemplate"
    >设置批量修改模板</el-button>

    <div class="downTemplateBox" v-show="showExportOrImprtBtn">
      <p 
        class="template marginB5"
        style="color:red; font-size: 14px"
      >
        选择的模板templateCode:{{currentTemplateCode}}
      </p>

      <el-button 
        type="primary" 
        sizi="mini"
        @click.native="_downLoadTemplate"
      >下载导入模板</el-button>       
    </div>

    <!--引入上传附件组件----start--->
    <div class="pa-uploadFile marginT10" v-show="showExportOrImprtBtn">
        <upload-file :OP="isEditOrAddImport"></upload-file>
    </div>
    <!--引入上传附件组件-----end--->

    <!--引入设置模板组件---start--->
    <div v-if="showSetEmpTemplate">
        <el-dialog
            title="设置模板"
            fullscreen
            :visible.sync="showSetEmpTemplate"
            append-to-body
        >
            <batch-set-emp-template-cmp
                @saveTemplate="saveTemplate"
            ></batch-set-emp-template-cmp>
        </el-dialog>
    </div>
    <!---引入设置模板组件---start-->
  </div>
</template>

<script type="text/ecmascript-6">
    import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
    import BatchSetEmpTemplateCmp from './BatchSetEmpTemplate-cmp'
    import EmpSelectListCmp from '@/base/Company-structure-cmp/select-cmp'
    import { 
        REQ_OK, 
        BASE_URL, 
        templagePCode_batchEdit
    } from '@/api/config'
    import { PaBatchHandlerMixin } from '@/utils/PA-mixins'
    import { mapGetters } from 'vuex'
    export default {
        mixins: [PaBatchHandlerMixin],
        components: {
            UploadFile,
            BatchSetEmpTemplateCmp,
            EmpSelectListCmp
        },
        props: {

        },
        data(){
            return {
                showSetEmpTemplate: false, //控制 设置模板的显示/隐藏
                selectedList: [],  // 已经选择的人员
                isEditOrAddImport: 'Edit',  // OP  导入类型,New表示入职，Edit表示编辑
            }
        },
        computed: {
            // ...mapGetters([
            //     'companyCode',
            //     'currentTemplatePageCode'                
            // ])
        },
        created() {
            debugger
            // this.setCurrentTemplatePageCode("PAIO_EditEmp")
            this.setCurrentTemplatePageCode(templagePCode_batchEdit)            

            this.$store.dispatch('setCurrentTemplateCode','')    
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
                this._saveTemplate(data, templateCode)
            })               
        },
        beforeDestroy(){
            this.$bus.$off("handlerCancelTemplate")
            this.$bus.$off("handlerSaveTemplate")
            this.$bus.$off("handlerExcuteTemplate")     
        },        
        methods: {   

        }
    }
</script>
