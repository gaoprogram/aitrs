<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量编辑员工
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="batchJoinJob-cmp">
    批量编辑员工页面
   
    <!---引入选择员工组件---start-->
    <div class="selectEmpBox">
        <emp-select-list-cmp></emp-select-list-cmp>
    </div>
    <!---引入选择员工组件----end-->

    <el-button type="text" @click.native="clickSetTemplate">设置批量修改模板</el-button>
    <div class="downTemplateBox">
        <el-button type="info" sizi="mini">下载导入模板</el-button>
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
            :visible.sync="showSetEmpTemplate"
            append-to-body
        >
            <batch-set-emp-template-cmp></batch-set-emp-template-cmp>
        </el-dialog>
    </div>
    <!---引入设置模板组件---start-->
  </div>
</template>

<script type="text/ecmascript-6">
    import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
    import BatchSetEmpTemplateCmp from './BatchSetEmpTemplate-cmp'
    import EmpSelectListCmp from '@/base/PA-common-cmp/Emp-select-cmp/EmpSelectList-cmp'
    export default {
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
            }
        },
        created() {
            debugger
        },
        methods: {
            clickSetTemplate(){
                this.showSetEmpTemplate = true
            }
        }
    }
</script>
