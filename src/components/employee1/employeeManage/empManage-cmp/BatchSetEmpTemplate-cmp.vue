<!--
  User: gaol
  Date: 2019/9/30
  功能： 设置批量员工模板(
      设置批量入职到岗模板  设置批量修改员工模板  设置批量导出员工模板 设置批量待入职员工模板 设置批量员工离职模板)      
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.batchSetTemplate-cmp
    padding 20px !important 
    box-sizing border-box
    
</style>
<template>
  <div class="batchSetTemplate-cmp" v-loading="loading">
    <!---选择模板select部分--start-->
    <div class="templateBox">
        <el-button type="text">选择员工模板:</el-button>
        <!-- templateDataSource: {{templateDataSource}} -->
        <el-select 
            :disabled="loading"
            v-model="currentTemplateObj.TemplateCode" 
            clearable 
            filterable
            placeholder="请选择">
            <el-option
                v-for="( item, key ) in templateDataSource"
                :key="item.TemplateCode"
                :label="item.TemplateName"
                :value="item.TemplateCode"
            >
            </el-option>
        </el-select>   

        <!-- currentTemplateObj.TemplateCode: {{currentTemplateObj.TemplateCode}}
        !!currentTemplateObj.TemplateCode:{{!!currentTemplateObj.TemplateCode}} -->
        <!-- currentTemplateCode: {{currentTemplateCode}} -->
        <el-button 
            :disabled="!!currentTemplateCode"
            type="primary" 
            icon="el-icon-plus"
            size="mini"
            @click.native="addNewExportTemplate"
        >新增模板</el-button>     
    </div>
    <!--选择模板select部分----end--->

    <!---container部分---start-->
    <div class="container">
        <!-- currentTemplateObj.PageCode: {{currentTemplateObj.PageCode}}
        ----
        currentTemplateObj.TemplateCode: {{currentTemplateObj.TemplateCode}} -->
        <!-- ------ -->
        <!-- ---currentTemplatePageCode: {{currentTemplatePageCode}} -->
        <template-first-category-cmp 
            :pageCode = "currentTemplatePageCode"
            :templateCode ="currentTemplateObj.TemplateCode"
            @saveTemplate="saveTemplate"
        ></template-first-category-cmp>
    </div>
    <!--container部分--end--->

    <!--新增模板弹框--start--->
    <div class="addNewTemplateBox" v-if="showAddNewTemplateDailog">
        <el-dialog
            width="70%"
            :visible.sync="showAddNewTemplateDailog"
            append-to-body
            :close-on-click-modal="false"
        >
            <add-new-template-cmp
                :pageCode = "currentTemplatePageCode"
                templateCode =""
                :isAddNewTemplate="isAddNewTemplate"                
                :showAddNewTemplateDailog.sync="showAddNewTemplateDailog"
                @saveTemplate="saveTemplate"
            ></add-new-template-cmp>        
        </el-dialog>
    </div>
    <!--新增模板弹框---end-->
  </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import TemplateFirstCategoryCmp from './TemplateFirstCategory-cmp'
    import AddNewTemplateCmp from './addNewTemplate-cmp'
    import { REQ_OK } from '@/api/config'
    import { 
        getFirstCategory,
        getTemplateDataSourceList 
    } from "@/api/employee"
    import { mapGetters } from 'vuex'
    export default {
        components: {
            SaveFooter,
            TemplateFirstCategoryCmp,
            AddNewTemplateCmp
        },
        props: {
            // 模板下拉选项数据源
            // templateDataSource: {
            //     type: Array,
            //     default: () => {
            //         return []
            //     }
            // }
        },
        data(){
            return {
                loading: false,  
                currentTemplateObj: {
                    Id: '',
                    CompanyCode: '', 
                    PageCode: '', // 当前选择的 模板的pageCode
                    TemplateCode: '',
                    TemplateName: '', 
                },
                firstCatList: [],  // 一级分类集合
                templateDataSource: [], // 入职模板的数据源
                isAddNewTemplate: false,  // 新增模板的标识
                showAddNewTemplateDailog: false,  // 新增模板 弹框显示 /隐藏
            }
        },
        created() {
            debugger
            this.currentTemplateObj =  {
                Id: '',
                CompanyCode: '', 
                PageCode: '', // 当前选择的 模板的pageCode
                TemplateCode: '',
                TemplateName: '', 
            }
            // 获取批量入职的模板list
            this._getTemplateDataSourceList()            
        },
        computed: {
            ...mapGetters([
                'companyCode',
                'token',
                'userCode',
                'currentTemplatePageCode',
                'currentTemplateCode',
                'batchExportOrImportEmpArr'
            ])
        },
        watch: {
            'currentTemplateObj.TemplateCode': {
                handler(newValue, oldValue){
                    // 存入store 中
                    this.$store.dispatch("setCurrentTemplateCode", this.currentTemplateObj.TemplateCode)
                }
            }
        },
        methods: {
            // 获取批量入职的模板list
            _getTemplateDataSourceList(pageCode){
                this.loading = true
                getTemplateDataSourceList(this.currentTemplatePageCode).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                    this.templateDataSource = res.data.Data
                    }else {
                    this.$message.error(`获取入职模板list数据失败,${res.data.Error}`)
                    }
                }).catch(() => {
                    // this.$message.warning("获取入职模板数据出错了")
                })
            },            
            // 获取一级分类
            _getFirstCategory(){
                debugger
                this.loading = true
               getFirstCategory(this.currentTemplatePageCode).then(res => {
                   this.loading = false
                   if(res && res.data.State === REQ_OK){
                       this.firstCatList = res.data.Data
                   }else {
                       this.$message.error(`获取一级分类数据失败,${res.data.Error}`)
                   }
               }).catch(() => {
                //    this.$message.warning("获取一级分类数据出错了")
               })
            },
            // 新增 导出模板
            addNewExportTemplate(){
                debugger
                this.isAddNewTemplate = true
                this.showAddNewTemplateDailog = true
            },
            saveTemplate( data, TemplateCode ){
                debugger
                this.$emit("saveTemplate", data, TemplateCode)
            },
        }
    }
</script>
