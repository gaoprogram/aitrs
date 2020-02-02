<!--
  User: gaol
  Date: 2019/9/30
  功能： 批量批量添加员工 组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.batchJoinJob-cmp
  padding 20px !important
  max-height 400px
  overflow auto
  box-sizing border-box
</style>
<template>
  <div class="batchJoinJob-cmp">
    批量添加
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

    <div class="downTemplateBox">
      <p 
        class="template marginB5"
        style="color:red; font-size: 14px"
      >
        选择的模板templateCode:{{currentTemplateCode}}
      </p>

      <el-button 
        type="info" 
        sizi="mini"
      >
      下载导入模板
      </el-button>
    </div>

    <!--引入上传附件组件----start--->
    <div class="pa-uploadFile marginT10">
        <upload-file></upload-file>
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
  // 这里用所有模块 通用的 人员选择器组件
  import EmpSelectListCmp from '@/base/Company-structure-cmp/select-cmp'
  import { 
    REQ_OK, 
    BASE_URL, 
    templatePCode_batchJoin
  } from '@/api/config'
  import { PaBatchHandlerMixin } from '@/utils/PA-mixins'
  import { mapGetters } from 'vuex'    
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
      //   'companyCode',
      //   'currentTemplatePageCode',
      //   'token',
      // 'currentTemplateCode'          
      // ])
    },
    created() {
      debugger
      // this.setCurrentTemplatePageCode("PAIO_NewEmp")
      this.setCurrentTemplatePageCode(templatePCode_batchJoin)            
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
        //@param {*} TemplateCode 模板编号
        //@param {}  ModuleCode  模块号，默认PA
        // debugger
        // let EmpIds = ''
        // let TemplateCode = this.currentTemplateCode
        // let token = this.token['Admin-Token']
        // let url = `${BASE_URL}/API/PAIO?Method=ExportEmpDataByTemplate&TokenId=${token}&CompanyCode=${this.companyCode}&ModuleCode=PA&TemplateCode=${TemplateCode}&EmpIds=${EmpIds}`
        // window.open(url)                     
      // }
    }
  }
</script>
