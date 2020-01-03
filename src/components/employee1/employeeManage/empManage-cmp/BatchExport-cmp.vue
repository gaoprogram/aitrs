<!--
  User: gaol
  Date: 2019/8/9
  功能： 批量导出员工
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
    批量导出员工页面
    
    <!---引入选择员工组件---start-->
    <div class="selectEmpBox">
        <emp-select-list-cmp
            :tabType="['renyuan']"  
            :selectedList="selectedList"        
            @upData="upData"
        ></emp-select-list-cmp>
    </div>
    <!---引入选择员工组件----end-->

    <el-button type="text" @click.native="clickSetTemplate">设置批量导出模板</el-button>
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
    // import EmpSelectListCmp from '@/base/PA-common-cmp/Emp-select-cmp/EmpSelectList-cmp'
    import EmpSelectListCmp from '@/base/PA-common-cmp/commonEmp-select-cmp/select-cmp'
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
                selectedList: []  // 已经选择的人员
            }
        },
        created() {
            debugger
        },
        methods: {
            clickSetTemplate(){
                this.showSetEmpTemplate = true
            },
            upData (val) {
                debugger
                if (val.length) {
                let addEmpArr = val.map(item => {
                    return {
                    Id: item.EmpId,
                    Name: item.EmpName
                    }
                })

                this.selectedList = this.selectedList.concat(addEmpArr)
                // 去重
                let newArr = []
                if (this.selectedList && this.selectedList.length) {
                    this.selectedList.forEach((item,key) => {
                    if(item.Id){
                        newArr.push(item.Id)
                    }else {
                        this.selectedList.splice(key,1)
                    }
                    })
                }

                if (newArr.length && newArr.length >= 2) {
                    for (let i = 0; i < newArr.length; i++) {
                    if (newArr.indexOf(newArr[i]) !== i) {
                        newArr.splice(i, 1)
                        this.selectedList.splice(i, 1)
                        --i
                    }
                    }
                }
                } else {
                // this.selectedList = []
                }
                this.$emit('changeEmp', this.prop)
            }
        }
    }
</script>
