<!--
  User: gaol
  Date: 2019/8/7
  功能：条目
-->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.fieldForm
    .el-form-item
        margin-bottom 0px !important
    .topBox
        padding 0px 20px 20px 20px !important
        box-sizing border-box
.entry
  padding 0 20px
  box-sizing border-box
.cust-addcard
    .el-dialog__body
        min-height 200px
.entrySetWrap
  >>>.el-dialog__body
    height calc(100vh - 80px)
    .tableSet
      height 100%
</style>
<template>
    <div class="entry" v-loading = "fullLoading">
        <!-- obj: {{obj}} -->
        <!-- <div class="tabBox">
            <el-tabs v-model="activeTabs" type="card" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            </el-tabs>            
        </div> -->

        <!--搜索部分--start-->
        <search-tools-cmp
            propSearchContentId="entrySearchId"
        >
            <div slot="handlerBtnWrap">              
                <el-checkbox
                    v-model="queryObj.state"
                    :true-label="0"
                    :false-label="1"                    
                >
                    停用
                </el-checkbox>
                <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="handlerAddField"
                >添加字段</el-button>
                <el-button 
                    :disabled="!multipleSelection.length"
                    v-if="queryObj.state == 0"
                    type="primary" 
                    size="mini"
                    @click.native="handlerBatchStopOrUsing"
                >批量启用</el-button>
                <el-button 
                    :disabled="!multipleSelection.length"
                    v-if="queryObj.state ==1"
                    type="primary" 
                    size="mini"
                    @click.native="handlerBatchStopOrUsing"
                >批量停用</el-button>
                <!-- <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="handlerSort"
                >字段排序</el-button> -->
            </div>

            <div slot="moreSearch" class="moreSearch u-f-jst u-f-wrap">
                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">关键词:</span>
                    <el-input 
                        clearable
                        size="small"
                        class="searchCmp"              
                        style="width: 200px"
                    >
                    </el-input>              
                </div>    

                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">控件类型:</span>            
                    <el-select 
                        clearable
                        size="small"
                        class="searchCmp"
                        style="width: 200px"
                    >
                        <!-- <el-option
                            v-for="(item, key) in moduleSource"
                            :key="key"
                            :label="item.ModuleName"
                            :value="item.ModuleCode"
                        >
                        </el-option> -->
                    </el-select>
                </div>
                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">数据类型:</span>     
                    <el-select 
                        clearable
                        size="small"
                        style="width: 200px"
                        class="searchCmp"              
                    >
                        <!-- <el-option
                            v-for="(item, key) in moduleSource"
                            :key="key"
                            :label="item.ModuleName"
                            :value="item.ModuleCode"
                        >
                        </el-option> -->
                    </el-select>  
                </div>     

                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">数据源类型:</span>  
                    <el-select 
                        clearable
                        size="small"
                        style="width: 200px"
                        class="searchCmp"              
                    >
                        <!-- <el-option
                            v-for="(item, key) in moduleSource"
                            :key="key"
                            :label="item.ModuleName"
                            :value="item.ModuleCode"
                        >
                        </el-option> -->
                    </el-select>   
                </div>   
                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">索引:</span>  
                    <el-select 
                        clearable
                        size="small"
                        style="width: 200px"
                        class="searchCmp"              
                    >
                        <!-- <el-option
                            v-for="(item, key) in moduleSource"
                            :key="key"
                            :label="item.ModuleName"
                            :value="item.ModuleCode"
                        >
                        </el-option> -->
                    </el-select> 
                </div>                         
                    
                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">唯一性:</span>  
                    <el-select 
                        clearable
                        size="small"
                        style="width: 200px"
                        class="searchCmp"              
                    >
                        <!-- <el-option
                            v-for="(item, key) in moduleSource"
                            :key="key"
                            :label="item.ModuleName"
                            :value="item.ModuleCode"
                        >
                        </el-option> -->
                    </el-select>   
                </div>               
                
                <div class="searchItem u-f-jst u-f-ac margin5">
                    <span class="searchTit">必填:</span>  
                    <el-select 
                        clearable
                        size="small"
                        style="width: 200px"
                        class="searchCmp"              
                    >
                        <!-- <el-option
                            v-for="(item, key) in moduleSource"
                            :key="key"
                            :label="item.ModuleName"
                            :value="item.ModuleCode"
                        >
                        </el-option> -->
                    </el-select>    
                </div>          
                
                <div class="searchBtnWrap u-f-ajc">
                    <el-button 
                        type="primary" 
                        size="small"
                        class="u-f-g0 u-f-s0"
                        @click.native="handlerSearch"
                    >搜索</el-button>
                    <el-button 
                        type="primary" 
                        size="small"
                        class="u-f-g0 u-f-s0"
                        @click.native="handlerReset"
                    >重置</el-button>
                </div>                                   
            </div>
        </search-tools-cmp> 
        <!---搜索部分---end-->

        <!-- tableData: {{tableData}} -->

        <common-table-cmp
            ref="entry_commonTableCmp"
            :tableHeadData="tableHeadData"
            :tableHandlerData="tableHandlerData"
            :tableData = "tableData"
            :queryObj.sync = "queryObj"
            :baseKey="baseKey"
            :stopOrUsingTitKey="stopOrUsingTitKey"            
            :multipleSelection.sync="multipleSelection"
            @refreshTableData = "refreshTableData"        
            @commonTableEmitHandler="commonTableEmitHandler"
        >
        </common-table-cmp>   

     
        <!--新增字段start--->
        <div class="addFieldBox" v-if="showAddField">
            <el-dialog
                title="新增字段"
                fullscreen
                :visible.sync="showAddField"
                append-to-body
                class="cust-addcard"
                :close-on-click-modal="false"
            >
                <fieldset-add-cmp
                    :isEditOrAdd="isAddOrEidtField"
                    :propState="''+queryObj.state"
                    :obj="obj"
                    @closeAddDialog="closeAddDialog"
                    @addFieldSuccess="addFieldSuccess"
                >
                </fieldset-add-cmp>
                <!-- <fieldset-edit-cmp
                    :isEditOrAdd="isAddOrEidtField"
                ></fieldset-edit-cmp> -->
            </el-dialog>
        </div>
        <!--新增字段end-->

        <!--编辑字段start--->
        <div class="editFieldBox" v-if="showEidtField">
            <el-dialog
                title="编辑字段"
                fullscreen
                :visible.sync="showEidtField"
                append-to-body
                :close-on-click-modal="false"
            >
                <!-- obj: {{obj}} -->
                <el-form class="fieldForm">
                    <div class="topBox">
                        <el-form-item label="表名">
                            <el-button type="text">
                                {{obj.TeamName}}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="项码">
                            <el-button type="text">
                                {{obj.TeamCode}}
                            </el-button>
                        </el-form-item>
                        <el-form-item label="属性">
                            <el-button type="text" v-if="obj.IsSys == 0">
                                自定义
                            </el-button>
                            <el-button type="text" v-if="obj.IsSys == 1">
                                系统
                            </el-button>                        
                        </el-form-item>  
                        <el-form-item label="系统名">
                            <el-button type="text">
                                {{obj.SysName}}
                            </el-button>
                        </el-form-item>  
                    </div>

                    <!--引入编辑字段/添加字段的组件start--->
                    <fieldset-edit-cmp
                        ref="fieldSetEditCmp"
                        :isEditOrAdd="isAddOrEidtField"
                        :obj="currentEditRowObj"
                        :objAdd="obj"
                        @saveFieldForm="saveFieldForm"
                    ></fieldset-edit-cmp>
                    <!--引入编辑字段/添加字段的组件end--->
                    
                    <div class="formFooterBox" style="margin-top: -20px">
                        <save-footer 
                            @save="saveForm" 
                            @cancel="cancelForm"
                        ></save-footer>
                    </div>
                </el-form>
            </el-dialog>
        </div>
        <!--编辑字段end-->    

        <!--字段排序start--->
        <div class="fieldSortBox" v-if="showSortField">
            <!-- <el-dialog
                title="字段排序"
                width="50%"
                :visible.sync="showSortField"
                append-to-body
                :close-on-click-modal="false"
            > -->
            <atris-drawer-cmp
                v-if="showSortField"
                tit="字段排序"    
                :dialog.sync="showSortField"    
                :showFooterBox="false"    
            >                
                <field-sort-cmp
                    slot="container-slot"
                    :propState="queryObj.state"
                    :obj="obj"
                    @emitSaveFieldSort="emitSaveFieldSort"
                    @emitCancelFieldSort="emitCancelFieldSort"                    
                ></field-sort-cmp>
            <!-- </el-dialog> -->
            </atris-drawer-cmp>
        </div>
        <!--字段排序end-->       

        <!---分组条目设置弹框start---->
        <el-dialog
            title="分组条目设置"
            append-to-body
            fullscreen
            :close-on-click-modal="false"
            v-if="showEntrySet"
            :visible.sync="showEntrySet"
            class="entrySetWrap"
            :destroy-on-close="true"
        >
            <div slot="title" class="header-title">
                <div class="u-f-jsb u-f-ajc topTitleNav">
                    <span class="title-age">分组条目设置</span>
                    <div class="u-f-ajc">
                        <el-button 
                            v-if="showLeftSectionCmp"
                            type="info" 
                            size="mini"
                            @click.native="batchAddSysFields"
                        >
                            批量添加系统字段
                        </el-button>
                        <save-footer 
                            saveBtnSize="mini"
                            :isCancel="false"
                            @save="saveEntrySet"
                            @cancel="cancelEntrySet"
                        ></save-footer>
                    </div>
                </div>
            </div>

            <entry-set-cmp
                ref="entrySetCmp"
                :objP.sync="obj"
                class="tableSet"
                :showLeftSectionCmp="showLeftSectionCmp"
                :showTopNav="false"
            ></entry-set-cmp>
        </el-dialog>            
        <!---分组条目设置弹框end---->        
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
      REQ_OK
   } from '@/api/config'
   import FieldsetEditCmp from './fieldsetEdit-cmp'
   import FieldsetAddCmp from './fieldsetAdd-cmp'
   import FieldSortCmp from './fieldSort-cmp'
   import EntrySetCmp from './entrySet/entry-set-cmp'
   import SearchToolsCmp from '@/base/NewStyle-cmp/common-cmp/searchTool-cmp'
   import SaveFooter from '@/base/Save-footer/index'
   import CommonTableCmp from '@/base/NewStyle-cmp/common-cmp/tableCommon-cmp/tableCommon-cmp'
   import { CommonInterfaceMixin } from '@/utils/CommonInterfaceMixin'
   import {
       getEntryList,
   } from '@/api/systemManage'
  export default {
    mixins: [CommonInterfaceMixin],
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        SearchToolsCmp, 
        CommonTableCmp,
        EntrySetCmp,       
        FieldsetEditCmp,
        FieldsetAddCmp,
        FieldSortCmp,
        SaveFooter
    },
    data(){
      return {
        fullLoading: false, 
        loading: false, // loading 状态
        baseKey: 'plat_configsys_hr_team_control',
        stopOrUsingTitKey: 'conname', 
        // isStop: false, 
        showLeftSectionCmp: true,
        showAddField: false, // 添加字段
        showEntrySet: false, // 分组条目设置
        showEidtField: false, // 编辑字段
        isAddOrEidtField: 0, // 0 编辑 1 新增
        showSortField: false, // 字段排序
        multipleSelection: [],
        currentRowObj: {},
        currentEditRowObj: {},
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            state: 1  //状态，0停用 默认1启用
        },
        tableHeadData: [
          {
            label: '物理表',
            property: 'relateb',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },
          {
            label: '编号',
            property: 'concode',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },    
          {
            label: '名称',
            property: 'conname',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          }, 
          {
            label: '控件类型',
            property: 'controltype',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },    
          {
            label: '数据类型',
            property: 'datatype',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '显示宽度',
            property: 'length',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },  
          {
            label: '显示千分位',
            property: 'digit',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },     
          {
            label: '显示大写',
            property: 'digit',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          }, 
          {
            label: '显示颜色',
            property: 'digit',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '选择器显示',
            property: 'digit',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '自定义的值',
            property: 'convalue',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },   
          {
            label: '时间刻度',
            property: 'convalue',
            showOverFlowTooltip: true,
            sortable: true,
            width: '',
            lock: false
          },                                                                                                   
        ],
        tableHandlerData: [
          {
            no: 1,
            code: 'entrySet',
            tit: '设置',
            baseKey:'plat_configsys_hr_team_control',
            stopOrUsingTitKey: 'conname'
          },
          {
            no: 2,
            code: 'stop',
            tit: '停用',
            baseKey:'plat_configsys_hr_team_control',
            stopOrUsingTitKey: 'conname'
          },
          {
            no: 3,
            code: 'using',
            tit: '启用',
            baseKey:'plat_configsys_hr_team_control',
            stopOrUsingTitKey: 'conname'
          },                   
        ],
        tableData: []
      }
    },
    watch: {

    },
    created(){
        this._getCommTables()
    },
    methods: {
        _getCommTables(){
            let params = {
                state: this.queryObj.state,
                metacode: this.obj.metacode
            }
            this.$nextTick(() => {
                this.$refs["entry_commonTableCmp"].showLoading()
                getEntryList(params).then(res => {
                    this.$refs["entry_commonTableCmp"].hideLoading()
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data.records
                        this.queryObj.total = res.data.Data.total
                    }
                }) 
            })
        },
        refreshTableData(){
            this._getCommTables()
        },
        commonTableEmitHandler(btn, row){
            let code = btn.code || ''
            switch(code){
                case 'entrySet':  // 条目设置按钮
                    this.showLeftSectionCmp = false
                    this.showEntrySet = true              
                break
                case 'stop':
                case 'using':
                break
            } 
        }, 
        // 批量添加系统字段
        batchAddSysFields(){
            this.$debounce(this.$refs.entrySetCmp.$refs.middleCmpRef.batchAddSysFields())
        },
        saveEntrySet(){
            debugger
            // let resHtml = document.getElementById('middleCmpRef').innerHTML
            // test(document.getElementById('middleCmpRef').innerHTML)
            // this.loading = true
            // 触发 right 组件中的保存方法
            this.$debounce(this.$refs.entrySetCmp.$refs.rightCmpRef.saveControlAttributes())
        },
        cancelEntrySet(){

        },                  
        // 添加字段
        handlerAddField(){
            this.isAddOrEidtField = 1
            // this.currentEditRowObj = {...row}  
            this.showLeftSectionCmp = true          
            // this.showAddField = true
            this.showEntrySet = true
        },
        // 编辑字段
        handlerEditField(row){
            debugger
            this.isAddOrEidtField = 0
            this.currentEditRowObj = {...row}
            // 给初始值（字体颜色、字体大小 文本类型等）
            try {
                if(!this.currentEditRowObj.Attribute.Size){
                    this.currentEditRowObj.Attribute.Size = 16
                }

                if(!this.currentEditRowObj.Attribute.Color){
                    this.currentEditRowObj.Attribute.Color = '#606266'
                }
                
                // 文本类型 默认“普通文本”
                if(!this.currentEditRowObj.TextType){
                    this.currentEditRowObj.TextType = '0'
                }else {
                    this.currentEditRowObj.TextType += ''
                }

                // 默认属性
                if(!this.currentEditRowObj.Display){
                    this.currentEditRowObj.Display = '1'
                }else {
                    this.currentEditRowObj.Display += ''
                }
            } catch (error) {
                console.log(error)
            }
            
            this.showEidtField = true
        },
        _DeleteComField(fieldCode, teamCode){
            this.loading = true
           DeleteComField(fieldCode, teamCode).then(res => {
               this.loading = false
               if(res && res.data.State === REQ_OK){
                   this.$message.success("删除成功")
                   this._getCommTables()
               }else {
                 this.$message.error(`删除失败,${res.data.Error}`)
               }
           }) 
        },
        handlerSort(){
            this.showSortField = true
        },
        // 保存
        saveForm(){
            this.$refs.fieldSetEditCmp.submit()
        },
        _SaveFieldList(data){
            this.fullLoading = true
            SaveFieldList(JSON.stringify(data), this.obj.TeamCode).then(res => {
                this.fullLoading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.closeDialog()
                    this._getCommTables()
                }else {
                    this.$message.error(`保存失败，${res.data.Error}`)
                }
            })
        },
        saveFieldForm(obj){
            debugger
            this._SaveFieldList([obj])
        },
        closeDialog(){
            if(this.isAddOrEidtField == 0){
                // 编辑
                this.showEidtField = false
            }else {
                // 新增
                this.showAddField = false
            }            
        },
        // 保存分组字段排序
        handleSaveGroupSort (arr) {
            arr.forEach((item,key) => {
                item.SortId = key+1
            })                
            SaveFieldList(JSON.stringify(arr), this.obj.TeamCode, '').then(res => {
                if (res.data.State === REQ_OK) {
                    this.$message.success('保存分组排序成功')
                    this.showSortField = false
                    this._getCommTables()
                } else {
                    this.$message.error(`保存分组排序失败,${res.data.Error}`)
                }
            })
        },        
        emitSaveFieldSort(arr){
            debugger
            this.handleSaveGroupSort(arr)
        },
        emitCancelFieldSort(){
            this.showSortField = false
        },        
        //取消保存
        cancelForm(){
            this.closeDialog()
        },
        closeAddDialog(){
            this.showAddField = false
        },
        addFieldSuccess(){
            this._getCommTables()
        },
    }
  }
</script>

