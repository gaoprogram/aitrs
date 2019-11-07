<!--
  User: gaol
  Date: 2019/9/30
  功能： 设置批量员工模板(
      设置批量入职到岗模板  设置批量修改员工模板  设置批量导出员工模板 设置批量待入职员工模板 设置批量员工离职模板)      
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="batchSetTemplate-cmp" v-loading="loading">
    <!---选择模板select部分--start-->
    <div class="templateBox">
        <el-button type="text">选择员工模板:</el-button>
        <!-- templateDataSource: {{templateDataSource}} -->
        <el-select v-model="currentTemplateObj.TemplateCode" clearable placeholder="请选择">
            <el-option
            v-for="( item, key ) in templateDataSource"
            :key="item.TemplateCode"
            :label="item.TemplateName"
            :value="item.TemplateCode"
            >
            </el-option>
        </el-select>        
    </div>
    <!--选择模板select部分----end--->

    <!---container部分---start-->
    <div class="container">
        <!-- currentTemplateObj.PageCode: {{currentTemplateObj.PageCode}}
        ----
        currentTemplateObj.TemplateCode: {{currentTemplateObj.TemplateCode}} -->
        <!-- ------ -->
        <!-- firstCatList: {{firstCatList}} -->
        <!-- ---currentTemplatePageCode: {{currentTemplatePageCode}} -->
        <template-first-category-cmp 
            :firstCatList="firstCatList"
            :pageCode = "currentTemplatePageCode"
            :templateCode ="currentTemplateObj.TemplateCode"
        ></template-first-category-cmp>
    </div>
    <!--container部分--end--->

  </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import TemplateFirstCategoryCmp from './TemplateFirstCategory-cmp'
    import { REQ_OK } from '@/api/config'
    import { getFirstCategory } from "@/api/employee"
    import { mapGetters } from 'vuex'
    export default {
        components: {
            SaveFooter,
            TemplateFirstCategoryCmp
        },
        props: {
            // 模板下拉选项数据源
            templateDataSource: {
                type: Array,
                default: () => {
                    return []
                }
            }
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
            }
        },
        created() {
            debugger
        },
        computed: {
            ...mapGetters(['currentTemplatePageCode'])
        },
        watch: {
            'currentTemplateObj.TemplateCode': {
                handler(newValue, oldValue){
                    // 调取接口获取 分类信息
                    if(newValue){
                        this._getFirstCategory()
                    }else {
                        this.firstCatList = []
                    }
                }
            }
        },
        methods: {
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
                   this.$message.warning("获取一级分类数据出错了")
               })
            },
            // 模板改变
            changeTemplate(obj){
                debugger
            }
        }
    }
</script>
