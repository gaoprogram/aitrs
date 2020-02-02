<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量导出员工
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.batchExport-cmp
    padding 20px !important
    max-height 400px
    overflow auto
    box-sizing border-box
</style>
<template>
  <div class="batchExport-cmp">
    <!---引入选择员工组件---start-->
    <!-- selectedList: {{selectedList}} -->
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
    >选择批量导出模板</el-button>

    <div class="downTemplateBox" v-show="currentTemplateCode">
        <p 
            class="template marginB5"
            style="color:red; font-size: 14px"
        >
            选择的模板templateCode:{{currentTemplateCode}}
        </p>  

        <el-button 
            type="primary" 
            sizi="mini"
            @click.native="handlerBatchExportByTemplate"
        >导出</el-button>
    </div>

    <!--引入上传附件组件----start--->
    <!-- <div class="pa-uploadFile marginT10">
        <upload-file></upload-file>
    </div> -->
    <!--引入上传附件组件-----end--->

    <!--引入设置模板组件---start--->
    <div v-if="showSetEmpTemplate">
        <el-dialog
            title="选择模板"
            fullscreen
            :visible.sync="showSetEmpTemplate"
            append-to-body
            :close-on-click-modal="false"
        >
            <batch-set-emp-template-cmp
                @saveTemplate="saveTemplate"
            ></batch-set-emp-template-cmp>
        </el-dialog>
    </div>
    <!---引入设置模板组件---start-->

    <!-- <div class="exportBtnBox">
        <el-button
            type="primary"
            size="mini"
            @click.native="handlerBatchExportByTemplate"
        >
            导出
        </el-button>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
    import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
    import BatchSetEmpTemplateCmp from './BatchSetEmpTemplate-cmp'
    import EmpSelectListCmp from '@/base/Company-structure-cmp/select-cmp' 
    import { 
        REQ_OK, 
        BASE_URL, 
        templagePCode_batchExport
    } from '@/api/config'
    import { mapGetters } from 'vuex'
    import { PaBatchHandlerMixin } from '@/utils/PA-mixins'
    export default {
        mixins: [ PaBatchHandlerMixin ],
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
                isEditOrAddImport: 'New',  // OP  导入类型,New表示入职，Edit表示编辑
            }
        },
        computed: {
            // ...mapGetters([
            //     'companyCode',
            //     'currentTemplatePageCode'
            // ]),            
        },
        created() {
            debugger
            // this.setCurrentTemplatePageCode("PAIO_ExportEmp")
            this.setCurrentTemplatePageCode(templagePCode_batchExport)

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
            // 根据模板 进行批量导出
            // handlerBatchExportByTemplate(){
            //     //@param {*} TemplateCode 模板编号
            //     //@param {}  ModuleCode  模块号，默认PA
            //     debugger
            //     let EmpIds = ''
            //     let TemplateCode = this.currentTemplatePageCode
            //     let token = this.token['Admin-Token']
            //     let url = `${BASE_URL}/API/PAIO?Method=ExportEmpDataByTemplate&TokenId=${token}&CompanyCode=${this.companyCode}&ModuleCode=PA&TemplateCode=${TemplateCode}&EmpIds=${EmpIds}`
            //     window.open(url)                     
            // }
        }
    }
</script>
