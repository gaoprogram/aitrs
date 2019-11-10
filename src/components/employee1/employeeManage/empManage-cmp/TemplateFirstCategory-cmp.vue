<!--
  User: gaol
  Date: 2019/11/5
  功能： 设置批量到岗模板中的 一级分类组件
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>
             
</style>
<template>
  <div class="templateFirstCat-cmp" v-loading= 'loading'>
      <!-- firstCatList: {{firstCatList}} -->
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
      pageCode: {{pageCode}} -->
      <!-- secondCatAllData: {{secondCatAllData}} -->
    <el-tabs v-model="activeCatCode" @tab-click="handleClickCat">
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
                    :secondCatAllData="secondCatAllData"
                    :templateAllData="configsData"
                    :finalData="item.Child"
                    :templateCode= "templateCode"
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
      getDefaultTemplateConfig,  // 获取指定一级下面的 所有二级分类及字段数据
      getTemplateConfigInfo, // 获取已经勾选配置的二级分类及字段数据
    } from '@/api/employee'
  export default {
    props: {
        firstCatList: {
            type: Array,
            default: () => {
                return []
            }
        },
        pageCode:{
            type: [String, Number],
            default: ''
        },
        templateCode: {
            type: [String, Number],
            default: ''
        },
    },
    components:{
      SaveFooter,
      TemplateSecondCatCmp
    },
    watch: {
        firstCatList:{
            handler(newValue, oldValue){
                if(newValue && newValue.length){
                    debugger
                    this.activeCatCode = newValue[this.currentTabIdx].TeamCode
                    // 获取该一级分类下的 二级分类和字段
                    // this._getDefaultTemplateConfig()
                }
            }
        },
        templateCode: {
            handler(newValue, oldValue){
                if( newValue ) {
                    // 获取该模板的所有配置信息
                    this._getTemplateConfigInfo(newValue)
                }
            }
        },
    },
    data(){
        return {
          loading: false,
          activeCatCode: '', // 当前选中的一级分类TEAM code
          secondCatAllData: [],   // 当前第一分类下的 二级分类及分组数据
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
            // this._getDefaultTemplateConfig()
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
        // 获取指定一级类目下的 二级分类和字段
        _getDefaultTemplateConfig(PageCode, TeamCode){
            debugger
            this.loading = true
            getDefaultTemplateConfig(this.pageCode, this.activeCatCode).then(res => {
                debugger
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.secondCatAllData = res.data.Data
                    // 处理数据
                    if(this.secondCatAllData.length){

                        this.changeData(this.secondCatAllData)   
                    }
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
    }
  }
</script>
