<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量入职
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<template>
  <div class="batchJoinJob-cmp">
    <p>可对待入职人员执行到岗,重新入职到岗操作,需按待入职列表中的员工号填写员工号；如执行直接入职操作，员工号预留为空，系统将自动生成员工号。</p>
    <el-button type="text" @click.native="clickSetTemplate">设置批量入职到岗模板</el-button>
    <!-- showSetEmpTemplate: {{showSetEmpTemplate}} -->
    <!--引入设置模板组件---start--->
    <div v-if="showSetEmpTemplate">
      <el-dialog 
        class="animated fadeIn"
        title="批量入职到岗"
        width="60%"
        :visible.sync="showSetEmpTemplate"
        :close-on-click-modal="false"
        append-to-body
      >
        <batch-set-emp-template-cmp 
          :templateDataSource="templateDataSource"
        ></batch-set-emp-template-cmp>
      </el-dialog>
    </div>
    <!---引入设置模板组件---start-->

    <div class="marginB10">
      <el-select 
        v-model="downLoadTemplateCode" 
        style="width: 200px"
        clearable 
        size="small"
        placeholder="请选择需要下载的模板">
          <el-option
          v-for="( item, key ) in templateDataSource"
          :key="item.TemplateCode"
          :label="item.TemplateName"
          :value="item.TemplateCode"
          >
          </el-option>
      </el-select>    

      <el-button 
        type="info" 
        size="small" 
        :disabled="!downLoadTemplateCode"
        @click.native="_downLoadTemplate"
      >下载导入模板</el-button>
    </div>

    <!--引入上传附件组件----start--->
    <div class="pa-uploadFile" v-if="downLoadTemplateCode">
        <upload-file></upload-file>
    </div>
    <!--引入上传附件组件-----end--->
  </div>
</template>

<script type="text/ecmascript-6">
import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
import BatchSetEmpTemplateCmp from './BatchSetEmpTemplate-cmp'
import { mapGetters } from 'vuex'
import { REQ_OK } from '@/api/config'
import { PaBatchHandlerMixin } from '@/utils/PA-mixins'
import {
  getTemplateDataSourceList
} from '@/api/employee'
export default {
  mixins: [ PaBatchHandlerMixin ],
  components: {
    UploadFile,
    BatchSetEmpTemplateCmp
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
      downLoadTemplateCode: '', // 下载模板的templateCode
      templateDataSource: [], // 入职模板的数据源
    }
  },
  created() {
    debugger
    // 将批量设置模板的 页面码 存入store中(执行mixin中的方法))
    this.setCurrentTemplatePageCode("PAIO_NewEmp")
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
        this._saveBatchJoinJobTemplate(data, templateCode)
    })
    // 批量入职  执行
    this.$bus.$on("handlerExcuteTemplate", (data, templateCode) => {
        debugger
        this._saveBatchJoinJobTemplate(data, templateCode)
    })       
  },
  beforeDestroy(){
    this.$bus.$off("handlerCancelTemplate")
    this.$bus.$off("handlerSaveTemplate")
    this.$bus.$off("handlerExcuteTemplate")     
  },
  computed: {
    ...mapGetters(['currentTemplatePageCode'])
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
        this.$message.warning("获取入职模板数据出错了")
      })
    },
    // 设置批量到岗模板
    clickSetTemplate(){
      this.showSetEmpTemplate = true
    },
  }
}
</script>
