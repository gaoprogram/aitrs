<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量入职
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="batchJoinJob-cmp">
    批量入职页面
    <h1>批量入职到岗</h1>
    <p>可对待入职人员执行到岗,重新入职到岗操作,需按待入职列表中的员工号填写员工号；如执行直接入职操作，员工号预留为空，系统将自动生成员工号。</p>
    <el-button type="text">设置批量入职到岗模板</el-button>
    <el-button type="info" sizi="mini">下载导入模板</el-button>

    <!--引入上传附件组件----start--->
    <div class="pa-uploadFile">
        <upload-file></upload-file>
    </div>
    <!--引入上传附件组件-----end--->
  </div>
</template>

<script type="text/ecmascript-6">
    import UploadFile from '@/base/PA-common-cmp/pa-Upload/uploadFile' 
    export default {
        components: {
            UploadFile
        },
        props: {

        },
        data(){
            return {

            }
        },
        created() {
            debugger
        },
        methods: {

        }
    }
</script>
