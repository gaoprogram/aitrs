<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量入职组件
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
    <!---引入选择员工组件---start-->
    <!-- <div class="selectEmpBox">
        <emp-select-list-cmp
            :tabType="['renyuan']"  
            :selectedList="selectedList"        
            @upData="upData"        
        ></emp-select-list-cmp>
    </div> -->
    <!---引入选择员工组件----end-->

    <p 
      class="tip marginB10"
      style="color:red; font-size: 14px">
      可对待入职员工执行到岗,重新入职到岗操作,需按待入职列表中的员工号填写员工号;如执行直接入职操作,员工号预留为空,系统将
      自动生成员工号。
    </p>

    <el-button 
      type="text" 
      @click.native="clickSetTemplate"
    >设置批量模板</el-button>

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
        @click.native="_downLoadTemplate"
      >下载导入模板</el-button>
    </div>

    <!--引入上传附件组件----start--->
    <div class="pa-uploadFile marginT10" v-show="currentTemplateCode">
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
// 这里用所有模块 通用的 人员选择器组件
import EmpSelectListCmp from '@/base/Company-structure-cmp/select-cmp'
import { mapGetters } from 'vuex'
import { REQ_OK,templatePCode_batchJoin} from '@/api/config'
import { PaBatchHandlerMixin } from '@/utils/PA-mixins'
import {
  getTemplateDataSourceList
} from '@/api/employee'
export default {
  mixins: [ PaBatchHandlerMixin ],
  components: {
    UploadFile,
    BatchSetEmpTemplateCmp,
    EmpSelectListCmp
  },
  props: {
    showBatchJoinJob_more: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      showSetEmpTemplate: false, // 设置批量到岗模板弹框的显示/隐藏
      selectedList: [],  // 已经选择的人员      
      downLoadTemplateCode: '', // 下载模板的templateCode
      templateDataSource: [], // 入职模板的数据源
      isEditOrAddImport: 'New',  // OP  导入类型,New表示入职，Edit表示编辑
    }
  },
  computed: {
    ...mapGetters([
      // 'companyCode',
      // 'token',
      // 'userCode',
      // 'currentTemplatePageCode',
      // 'currentTemplateCode',
      // 'batchExportOrImportEmpArr'               
    ])    
  },
  created() {
    debugger
    // 将批量设置模板的 页面码 存入store中(执行mixin中的方法))
    // this.setCurrentTemplatePageCode("PAIO_NewEmp")
    this.setCurrentTemplatePageCode(templatePCode_batchJoin)

    this.$store.dispatch('setCurrentTemplateCode','')    
    // 获取批量入职的模板list
    this._getTemplateDataSourceList()

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
  computed: {
    ...mapGetters([
      'currentTemplatePageCode'
    ])
  },
  watch: {
    showBatchJoinJob_more: {
      handler(newVaule, oldValue){
        this.$emit("update:showBatchJoinJob_more", newVaule)
      }
    },
    downLoadTemplateCode: {
      handler(newValue, oldValue){
        this.$store.dispatch("setCurrentTemplateCode", this.downLoadTemplateCode)
      }
    }
  },
  methods: {
    // 获取批量入职的模板list
    _getTemplateDataSourceList(pageCode){
      getTemplateDataSourceList(this.currentTemplatePageCode).then(res => {
        if(res && res.data.State === REQ_OK){
          this.templateDataSource = res.data.Data
        }else {
          this.$message.error(`获取入职模板list数据失败,${res.data.Error}`)
        }
      }).catch(() => {
        // this.$message.warning("获取入职模板数据出错了")
      })
    },
    // 设置批量到岗模板
    clickSetTemplate(){
      this.showSetEmpTemplate = true
    },
  }
}
</script>
