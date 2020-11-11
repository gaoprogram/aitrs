<!--
  User: gaol
  Date: 2019/11/5
  功能： 设置批量到岗模板中的 一级分类组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.templateFirstCat-cmp
    padding 20px 
    box-sizing border-box            
</style>
<template>
  <div  
    v-show="templateCode || isAddNewTemplate"
    class="templateFirstCat-cmp animated fadeIn" 
    v-loading= 'loading'>
    <!-- activeCatCode: {{activeCatCode}} -->
    <!-- 
    ----
    secondCatData: {{secondCatData}}
    -----
    alreadyConfigs: {{alreadyConfigs}}
    ----
    -->
    <!-- templateCode: {{templateCode}} 
    ---
    pageCode: {{pageCode}}
    --
    isAddNewTemplate: {{isAddNewTemplate}}
    ---
    configsData: {{configsData}} -->
    <!-- defaultAllData: {{defaultAllData}}
    ----
    configsData: {{configsData}} -->
    <el-tabs 
        v-model="activeCatCode" 
        @tab-click="handleClickCat">
        <el-tab-pane 
            v-for="(item,key) in configsData"
            :key="key"
            :label="item.TeamName"
            :name="item.TeamCode"
        >
        <!-- {{item.TeamName}} -->
        <!-- finalData: {{finalData}} -->
            <div class="secondCatBox">
                <template-second-cat-cmp
                    :defaultAllData="defaultAllData"
                    :templateAllData="configsData"
                    :finalData="item.Child"
                    :templateCode= "templateCode"
                    :isAddNewTemplate="isAddNewTemplate"
                    @handlerSaveTemplate="handlerSaveTemplate"
                    @handlerCancelTemplate="handlerCancelTemplate"
                ></template-second-cat-cmp>
            </div>
        </el-tab-pane>
    </el-tabs>   
  </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import TemplateSecondCatCmp from './TemplateSecondCat-cmp'
  import { REQ_OK } from '@/api/config'
  import { 
      GetDefaultTemplateByPageCode,  // 获取默认模板配置相关信息
      getTemplateConfigInfo, // 获取 自定义模板配置相关信息
    } from '@/api/employee'
  export default {
    props: {
        pageCode:{
            type: [String, Number],
            default: ''
        },
        templateCode: {
            type: [String, Number],
            default: ''
        },
        // 是否是新增
        isAddNewTemplate: {
            type: Boolean,
            default: false
        }
    },
    components:{
      SaveFooter,
      TemplateSecondCatCmp
    },
    watch: {
        templateCode: {
            handler(newValue, oldValue){
                if( newValue ) {
                    debugger
                    this.showSetTemplate = true
                    // 获取该模板的所有自定义配置信息数据
                    this._getTemplateConfigInfo(newValue)
                }else {
                    this._cleanTemplateConfigData()
                }
            }
        },
        isAddNewTemplate: {
            handler (newValue, oldValue) {
                debugger
                if( newValue ) {
                    // 是新增 模板
                    this._GetDefaultTemplateByPageCode()
                }
            },
            immediate: true
        }
    },
    data(){
        return {
          loading: false,
          showSetTemplate: false, // 控制设置模板部分显示/隐藏
          activeCatCode: '', // 当前选中的一级分类TEAM code
          defaultAllData: [],   // 默认的所有全量的数据
          configsData: [], // 该模板下的所有配置数据信息
          finalData: [],  // 最终的数据
          currentTabIdx: 0, // 当前一级分类的索引值
        }
    },
    created() {
        debugger
        
    },
    methods: {
        // 切换分类
        handleClickCat(tab, $event){
            debugger
            this.currentTabIdx = tab.index*1
            this.activeCatCode = tab.name
        },
        _cleanTemplateConfigData(){
            this.showSetTemplate = false
        },
        changeData(data){
            debugger
            data.forEach((item, key) => {
                if( !item.hasOwnProperty("isIndeterminate") ){
                    this.$set(item, 'isIndeterminate', false)
                }

                if( !item.hasOwnProperty("checkAll") ){
                    this.$set(item, 'checkAll', true)
                }

                if( !item.hasOwnProperty("checkedFields") ){
                    this.$set(item, 'checkedFields', [].concat(item.Fields))
                }                             
            })  
            // console.log("处理后的 data", data)      
            debugger  
        },
        // 获取 默认所有的全量配置数据 
        _GetDefaultTemplateByPageCode(PageCode){
            debugger
            // this.loading = true
            GetDefaultTemplateByPageCode(this.pageCode).then(res => {
                debugger
                // this.loading = false
                if(res && res.data.State === REQ_OK) {
                    this.defaultAllData = res.data.Data
                    // 处理数据
                    if(this.defaultAllData.length){

                        this.changeData(this.defaultAllData)   
                    }
                    
                    // 将默认的所有数据 赋值给 configsData
                    this.configsData = [].concat(res.data.Data)
                    this.activeCatCode = res.data.Data[this.currentTabIdx].TeamCode                    
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取指定分类下的二级分类及字段失败,${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '获取指定分类下的二级分类及字段出错了'
                })
            })
        },
        
        // 获取该模板的所有配置信息（一级分类，已经各个分类下面的所有字段配置信息）
        _getTemplateConfigInfo(){
            getTemplateConfigInfo(this.templateCode, this.pageCode).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.configsData = [].concat(res.data.Data)
                    this.activeCatCode = res.data.Data[this.currentTabIdx].TeamCode
                }else {
                    this.$message.error(`获取该模板已勾选配置信息失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning('获取该模板已勾选配置信息出错了')
            })
        },
        handlerSaveTemplate(data, templateCode){
            this.$emit("saveTemplate", data, templateCode)
        },
        handlerCancelTemplate(){
            this.$emit("cancelTemplate")
        }
    }
  }
</script>
