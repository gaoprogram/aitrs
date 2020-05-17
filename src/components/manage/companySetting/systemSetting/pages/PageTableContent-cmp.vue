<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--显示页面 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.menuContentSet-cmp
    padding 0 20px
    box-sizing border-box
    .searchTop
        margin 5px 0 10px 0
    .item-container
        margin-top 5px
        display inline-block
        >>>.el-input
            display inline-block !important
            // width 200px
    .tableContainerWrap
        .contentTop
            text-align right
            margin-bottom 10px
>>>.el-dialog
    .el-dialog__body
        .el-form
            .item-container
                .tit
                    display inline-block
                    min-width 50px
                .el-form-item
                    display inline-block
                    width 300px

</style>

<template>
    <div class="menuContentSet-cmp">
        <!-- currentTreeNodeObj： {{currentTreeNodeObj}}
        -----
        queryObj.moduleCode:{{queryObj.moduleCode}} -->
        <!--搜索部分--start-->
        <div class="searchTopBox">
            <search-tools-cmp 
                :currentPcode="currentPcode" 
                :currentKeyName="currentKeyName"
                :currentTreeNodeObj="currentTreeNodeObj"
                @emitRefreshTable="emitRefreshTable">
            </search-tools-cmp>
        </div>        
        <!---搜索部分---end-->

        <!-- queryObj.sysType: {{queryObj.sysType}} -->
        <!---tab标签--->
        <!-- <el-tabs 
            v-model="queryObj.sysType" 
            class="marginT10"
            type="card" 
            @tab-click="handleClickTab"
        >
            <el-tab-pane label="系统页面" name="1"></el-tab-pane>
            <el-tab-pane label="企业页面" name="2"></el-tab-pane>
        </el-tabs>    -->

        <!-- queryObj: {{queryObj}} -->
        <div class="contentTop clearfix marginB10">
            <el-checkbox
                style="float: left;margin-top:10px"
                @change="handlerSelectBtn"
            >
                停用
            </el-checkbox>    

            <el-button 
                style="float: right"
                type="primary" 
                size="mini" 
                @click.native="handlerAdd"
            >新增</el-button>
            <!-- <el-button type="primary" size="mini" @click.native="handlerSort">排序</el-button> --> 
        </div>

        <!--table表格区--start-->
        <!-- currentTableData： {{currentTableData}} -->
        <div class="tableContainerWrap">
            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    border 
                    empty-text=" "
                    max-height="500"
                    :data="currentTableData"
                >
                    <el-table-column
                        label="页面名"
                        prop="Title"
                        sortable
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        label="页面码"
                        prop="PageCode"
                        width="200"
                        sortable
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        label="URL"
                        prop="PageUrl"
                        width="200"
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        label="模块"
                        prop="ModuleName"
                        sortable
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <!-- <el-table-column
                        label="版本"
                        prop="VersionRange"
                    >
                    </el-table-column>    -->

                    <el-table-column
                        label="系统配置"
                        prop="SysType"
                        sortable
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            <span 
                                style="color: #409EFF"
                                v-if="scope.row.SysType == 1">
                                是
                            </span>
                            <span 
                                style="color: #67C23A"
                                v-if="scope.row.SysType == 2">
                                否
                            </span>                            
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="描述"
                        prop="Description"
                        show-overflow-tooltip
                    >
                    </el-table-column>                        

                    <el-table-column
                        label="状态"
                        prop="State"
                        sortable
                        width="80"
                        show-overflow-tooltip
                     >
                        <template slot-scope="scope">
                            <!-- scope.row.State: {{scope.row.State}} -->
                            <span v-if="scope.row.State ==1">
                                启用
                            </span>
                            <span v-if="scope.row.State ==0">
                                停用
                            </span>                            
                        </template>
                    </el-table-column>  

                    <el-table-column
                        label="操作"
                        width="150"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerEdit(scope.row, scope.$index)">
                                编辑
                            </el-button>
                            <el-button
                                v-show="scope.row.State == 0"
                                type="text"
                                size="mini"
                                @click.native="handlerUseing(scope.row, 1)"
                            >
                                启用
                            </el-button>
                            <el-button
                                v-show="scope.row.State == 1"
                                type="text"
                                size="mini"
                                @click.native="handlerUseing(scope.row, 0)"
                            >
                                停用
                            </el-button>
                            <el-button 
                                v-if="scope.row.SysType == 2"                            
                                type="text" 
                                size="mini"
                                @click.native="handlerDelete(scope.row, scope.$index)">
                            删除
                            </el-button>
                        </template>
                    </el-table-column>                                                                                                                                 
                </el-table>

                <!--分页部分-->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryObj.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="queryObj.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryObj.total">
                </el-pagination>                
            </div>
        </div>        
        <!--table表格区---end--->

        <!--编辑/新增弹框--start-->
        <!-- <div 
            class="commonDialog" 
            v-if="showEditDialog"> -->
            <!-- <el-dialog
                :title="dialogTit"
                :visible.sync="showEditDialog"
                append-to-body
                width="30%"
                :close-on-click-modal="false"
            > -->
            <atris-drawer-cmp
                v-if="showEditDialog"
                :tit="dialogTit"    
                :dialog.sync="showEditDialog"        
                @emitClickSureBtn="saveDialog"
            >            
                <!-- currentRow: {{currentRow}} -->
                <!-- pageData: {{pageData}} -->
                <el-form 
                    ref="dialogForm" 
                    slot="container-slot"
                    :model="currentRow" 
                    :rules="dialogObjRules" 
                    label-width="120px">
                    <div class="item-container">
                        <el-form-item
                            label="页面名称"
                            prop="Title"
                        >
                            <el-input 
                                style="width:300px"
                                v-model='currentRow.Title' 
                                placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>  

                    <div class="item-container">
                        <el-form-item
                            label="页面码"
                            prop="PageCode"
                        >
                            <!-- <el-input 
                                :disabled="addOrEditFlag==1"
                                v-model='currentRow.PageCode' 
                                placeholder="请输入"
                            ></el-input> -->
                            <el-button 
                                v-if="addOrEditFlag == 0"
                                type="text" 
                                size="mini"
                            >系统自动生成</el-button>
                            <el-button 
                                v-if="addOrEditFlag == 1"
                                type="text" 
                                size="mini"
                            >{{currentRow.PageCode}}</el-button>                            
                        </el-form-item>
                    </div>       

                    <div class="item-container">
                        <el-form-item
                            label="URL"
                            prop="PageUrl"
                        >
                            <el-input 
                                style="width:300px"
                                :disabled="addOrEditFlag==1 && currentRow.SysType == 1"
                                v-model='currentRow.PageUrl' 
                                placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>        

                    <div class="item-container">
                        <el-form-item
                            label="模块名称"
                            prop="ModuleName"
                        >
                            <!-- <el-input v-model='currentRow.ModuleName' placeholder="请输入"></el-input> -->
                            <!-- moduleNameOption: {{moduleNameOption}} -->
                            <el-select 
                                style="width:300px"
                                :disabled="addOrEditFlag==1 && currentRow.SysType == 1"
                                v-model='currentRow.ModuleCode'>
                                <el-option
                                    v-for="(item, key) in moduleNameOption"
                                    :key="key"
                                    :label="item.ModuleName"
                                    :value="item.ModuleCode"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>    

                    <!-- pageData: {{pageData}} -->
                    <!-- ----
                    currentRow.MenuCode: {{currentRow.MenuCode}} -->
                    <div class="item-container">
                        <el-form-item label="对应菜单" prop="MenuCode">
                            <el-cascader
                                style="width:300px"
                                filterable
                                clearable
                                :show-all-levels="false"
                                :change-on-select="true"
                                :disabled="addOrEditFlag==1 && currentRow.SysType == 1"
                                expand-trigger="hover"
                                :options="pageData"
                                v-model="currentRow.MenuCode"
                                @change="handleChange">
                            </el-cascader>     
                        </el-form-item>
                    </div>                    

                    <div class="item-container">
                        <el-form-item
                            label="描述"
                            prop="Description"
                        >
                            <el-input 
                                style="width:300px"
                                type="textarea" 
                                v-model='currentRow.Description' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>      

                    <div class="item-container">
                        <el-form-item
                            label="状态"
                            prop="State"
                        >
                           <el-switch 
                            v-model="currentRow.State"
                            inactive-value="0"
                            active-value="1"
                           >

                           </el-switch>
                        </el-form-item>
                    </div>  

                </el-form>

                <!-- <save-footer 
                    style="margin-top: -20px"
                    @save="saveDialog" @cancel="cancelDialog"></save-footer>
            </el-dialog> -->
            </atris-drawer-cmp>
        <!-- </div> -->
        <!---编辑/新增弹框-end-->

        <!--排序dialog--start-->
        <div class="sortDailog" v-if="showSortDialog">
            <!-- <el-dialog
                title="排序"
                width="30%"
                append-to-body
                v-loading = 'sortDialogLoading'
                :visible.sync="showSortDialog"
            >
                <sort-item-cmp 
                    :data="currentTableData" 
                    @saveSort="saveSort" 
                    @cancelSort="cancelSort">
                </sort-item-cmp>
            </el-dialog> -->
        </div>
        <!--排序dialog--end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import SearchToolsCmp from './searchTools-cmp'
  import SortItemCmp from './SortItem-cmp'
  import  { REQ_OK } from '@/api/config'
  import { 
    ComPageList,
    deleteComPage,
    // sortSysMenu,
    ComPageSelector,
    SaveComPage,
    SetComPageState,
    GetModuleList,
    ComMenuTree
  }from '@/api/systemManage'
  export default {
    props:{
        currentTreeNodeObj:{
            type: Object,
            default: () => {
                return {}
            }
        },
        // 左边树组件选中的当前菜单
        currentPcode: {
            type: String,
            default: ''
        },
        currentKeyName: {
            type: String,
            default: ''
        },
        // pageData: {
        //     type: Array,
        //     default: () => {
        //         return []
        //     }
        // }
    },
    components: {
        SearchToolsCmp,
        SortItemCmp,
        SaveFooter
    },
    watch: {
        'currentTreeNodeObj.MenuCode':{
            handler(newValue, oldValue){
                this.queryObj.menuCode = newValue || 'all'
                this.queryObj.moduleCode = this.currentTreeNodeObj.ModuleCode
            },
            // immediate: true
        },
        // currentKeyName:{
        //     handler(newValue, oldValue){
        //         this.queryObj.key = newValue
        //     },
        //     immediate: true
        // },
        'currentTreeNodeObj.ModuleCode': {
            handler(newValue, oldValue){
                this.queryObj.moduleCode = newValue
                this.queryObj.menuCode = this.currentTreeNodeObj.MenuCode || 'all'
            },            
        },
        'currentRow.ModuleCode': {
            handler(newValue, oldValue){
                // 触发 对应菜单进行重新获取数据
                this.ComMenuTree(newValue)
            },
            immediate: true
        }
    },
    data(){
      return {
        loading: false, // 加载loading
        pageOptions: [], // 页面下拉数据源
        sortDialogLoading: false, // 排序dialog 弹框的 loading
        showEditDialog: false, // 控制编辑/新增弹框的显示/隐藏
        showSortDialog: false, // 控制 排序弹框的显示/隐藏
        addOrEditFlag: 0, // 0 表示新增  1 表示 编辑
        dialogTit:'菜单信息',
        currentRow: {
            Id: 0,
            Title: '',  // 页面名
            PageCode: '',  // 页面码,
            MenuCode: 'all',
            PageUrl: '',  // 页面Url
            ModuleName: '', // 模块名称
            ModuleCode: '', // 模块码
            VersionRange: '', // 版本许可范围   
            Description: '', // 描述
            State: '1'
        },  // 当前的row
        currentRowRules: {

        },
        currentTableData: [],  // 右边table表格的数据
        moduleNameOption:[], // 模块名称下拉源数据
        pageData: [], // 对应菜单数据源
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            key: '',  // 关键词
            state: 1, 
            sysType: '-1', // 1 系统 2 企业  -1 全部
            menuCode: '', 
            moduleCode: '',  // 模块    
        },
        dialogObjRules: {
            Title: [{required: true, trigger: 'blur', message: '请输入名称'}],
            // PageCode: [{required: true, trigger: ['blur'], message: '请输入页面码'}],
            PageUrl: [{required: true, trigger: ['blur'], message: '请输入页面url'}],
            ModuleCode: [{required: true, trigger: ['blur'], message: '请输入模块名称'}],
            // Description: [{required: true, trigger: ['blur'], message: '请输入描述'}]
        }
      }
    },
    created(){

    },
    beforeDestroy(){
    },
    methods: {
        getCommTables(){
            this._ComPageList()
        },
        // 启用/停用 筛选
        handlerSelectBtn(value){
            debugger
            if(value){
                this.queryObj.state = 0
                this.queryObj.pageNum = 1
            }else {
                this.queryObj.state = 1
                this.queryObj.pageNum = 1
            }
                this.getCommTables()        
        },   
        // 切换tab
        handleClickTab(tab){
            debugger
            this.getCommTables(this.queryObj.state)
        }, 
        handleChange(value) {
            console.log(value);
        },        
        _handlerData(data){
            if(data && data.length){
            let newData = data.map((item, key) => {
                item.children = []
                if(item.Pages && item.Pages.length){
                // this._handlerData(item.Pages)
                item.children = item.Pages.map(val => {
                    return {
                        value: val.PageCode,
                        label: val.Title
                    }
                })
                }
                return {
                    value: item.ModuleCode,
                    label: item.ModuleName,
                    children: item.children
                }
            })
            return newData
            }
        },
        // 获取搜索条件中的页面下拉源
        _ComPageSelector(){
            ComPageSelector().then(res => {
            if(res && res.data.State === REQ_OK){
                // this.pageOptions = res.data.Data
                // 处理数据
                this.pageOptions = this._handlerData(res.data.Data)
                // this.total = res.data.Total
            }else {
                this.$message.error(`获取页面搜索下拉源数据失败,${res.data.Error}`)
            }
            })
        },               
        // 获取 表格数据
        _ComPageList(){
            debugger
            this.loading = true
            ComPageList(this.queryObj).then(res => {
                this.loading = false
                debugger
            if(res && res.data.State === REQ_OK){
                this.currentTableData = res.data.Data 
                this.queryObj.total = res.data.Total           
            }else {
                this.$message.error(`获取系统菜单列表数据失败,${res.data.Error}`)
            }
            }).catch(() => {
                this.$message.warning("获取系统菜单列表数据出错了")
            })
        },
        emitRefreshTable(obj){
            debugger
            Object.assign(this.queryObj, obj)
            this._ComPageList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._ComPageList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._ComPageList()
        }, 
        // 获取模块下拉源数据   
        GetModuleList(){
            GetModuleList(65553).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.moduleNameOption = res.data.Data
                }else {
                    this.$message.error(`获取模块名称下拉源数据失败,${res.data.Error}`)
                }
            })
        },  
        _changeData(data ){
            debugger
            if(data && data.length){
            data.forEach((item, key) => {
                this.$set(item, 'id', item.Id)
                this.$set(item, 'label', item.Title)
                this.$set(item, 'value', item.MenuCode)
                if(item.Children && item.Children.length){
                this.$set(item, 'children', item.Children)
                }
                this.$set(item, 'MenuCode', item.MenuCode)
                this.$set(item, 'Id', item.Id)
                this.$set(item, 'PCode', item.PCode)
                this.$set(item, 'SortId', item.SortId)
                this.$set(item, 'Icon', item.Icon)
                this.$set(item, 'IsSys', item.IsSys)
                this.$set(item, 'IsCom', item.IsCom)
                this.$set(item, 'IsPerson', item.IsPerson)
                this.$set(item, 'IsPC', item.IsPC)
                this.$set(item, 'IsMobile', item.IsMobile)
                this.$set(item, 'Description', item.Description)
                this.$set(item, 'State', item.State)
                this.$set(item, 'Deleted', item.Deleted)
                this.$set(item, 'Created', item.Created)
                this.$set(item, 'UpdateBy', item.UpdateBy)
                this.$set(item, 'Updated', item.Updated)
                this.$set(item, 'Children', item.Children)
                this.$set(item, 'ModuleName', item.ModuleName)
                this.$set(item, 'PageName', item.PageName)
                if(item.Children && item.Children.length){
                this._changeData(item.Children)
                }
            })
            }
        },        
        // 获取 对应菜单 下拉数据源
        ComMenuTree(moduleCode){
            debugger
            ComMenuTree('', moduleCode).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.pageData = res.data.Data
                    this._changeData(this.pageData)
                }else {
                    this.$message.error(`获取对应菜单下拉源数据失败,${res.data.Error}`)
                }
            })            
        },
        // 启用/停用 
        _SetComPageState(data, type){
            this.loading = true
            let text = type == 0 ? '停用':'启用'
            SetComPageState(JSON.stringify([data]),type, data.SysType).then(res => {
                this.loadingg = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success(`${text}成功`)
                    this.getCommTables()
                }else {
                    this.$message.error(`${text}失败,${res.data.Error}`)
                }
            })
        },
        handlerUseing(row, type){
            //debugger
            this.currentRow = JSON.parse(JSON.stringify(row))
            this.currentRow.State += ''
            let text = type == 0 ? '停用':'启用'
            this.$confirm(`确定要${text}${this.currentRow.Title}吗?`, "提示", {
                confirmButtonText: '确定',
                cancelButtonText: "取消"
            }).then(res => {
                this._SetComPageState(this.currentRow, type)
            }).catch(() => {
                this.$message.info(`${text}已取消`)
            })
        },
        // 编辑
        handlerEdit(row, index) {
            debugger
            this.GetModuleList()
            this.addOrEditFlag = 1
            this.dialogTit ="编辑"
            this.showEditDialog = true
            row.IsPC += ''
            row.IsMobile += ''
            row.IsSys = row.IsSys == 1 ? '1': '0'
            this.currentRow = JSON.parse(JSON.stringify(row))
            this.currentRow.State += ''            
        },
        //新增
        handlerAdd(){
            debugger
            this.GetModuleList()
            this.addOrEditFlag = 0
            this.dialogTit ="新增"
            Object.assign(this.currentRow, {
                // Id: 0,
                // Title: '',  // 页面名
                // PageCode: '',  // 页面码
                // PageUrl: '',  // 页面Url
                // ModuleName: '', // 模块名称
                // VersionRange: '', // 版本许可范围   
                // Description: '', // 描述       
                Created: "/Date(1577808000000)/",
                Description: "",
                Id: 0,
                // ModuleCode: "",
                sysType: '2',  // 1是系统 2 是企业 -1 全部
                ModuleName: "",
                MenuCode: 'all',
                PageCode: "",
                PageUrl: "",
                State: '1',
                Title: "",
                UpdateBy: "",
                Updated: "/Date(1577808000000)/",
                VersionCodes: null,
                VersionRange: "",               
            })
            this.showEditDialog = true
        },
        // 排序
        handlerSort(){
            debugger
            this.showSortDialog = true
        },
        // 搜索
        clickSearchBtn(){
            this._ComPageList()
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                key: '',  // 关键词
                state: 1,
                menuCode: '',
                moduleCode: '',  // 模块          
            })
            this._ComPageList()
        },
        // 删除列表
        _deleteComPage(){
            debugger
            this.loading = true
            deleteComPage(this.currentRow.Id, this.currentRow.MenuCode).then(res => {
                debugger
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._ComPageList()
                }else {
                    this.$message.error(`删除失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("删除出错了")
            })
        },
        // 删除
        handlerDelete(row, index){
            debugger
            this.currentRow = JSON.parse(JSON.stringify(row))
            this.$confirm(`确定要删除"${row.Title}"吗？`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._deleteComPage()
            }).catch(() =>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        },
        // 删除前的回调
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 上传前
        handlePreview(file) {
            console.log(file);
        },
        // 过滤
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        _sortSysMenu(data){
            this.sortDialogLoading = true
            sortSysMenu(JSON.stringify(data)).then(res => {
                this.sortDialogLoading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success('排序保存成功')
                    this._ComPageList()
                }else {
                    this.$message.error(`保存排序失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning('保存排序出错了')
            })
        },
        saveSort(data){
            if(data && data.length){
                data.forEach((item, key) => {
                    item.SortId = key
                })
            }
            // this._sortSysMenu(data)
        },  
        cancelSort(){
            this.showSortDialog = false
        },
        // 判断是 数组
        isArray(data){
          return  Object.prototype.toString.apply(data) === '[object Array]'
        },
        _SaveComPage(data){
            debugger
            if(data.MenuCode && this.isArray(data.MenuCode)){
                if(data.MenuCode.length){
                    data.MenuCode = data.MenuCode[data.MenuCode.length-1]
                    // this.queryObj.menuCode = data.MenuCode 
                }else {
                    data.MenuCode = ''
                    // this.queryObj.menuCode = ''
                }
            }else {
                this.queryObj.menuCode = ''
            }
            SaveComPage(JSON.stringify(data), this.queryObj.menuCode).then(res => {
                if(res && res.data.State ===REQ_OK ){
                    this.$message.success("保存成功")
                    this.showEditDialog = false
                    this._ComPageList()
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存出错了")
            })
        },
        saveDialog(){
            this.$refs.dialogForm.validate(valid => {
                if(valid){
                    // 验证通过
                    if(this.addOrEditFlag === 1){
                        // 编辑
                    }else if(this.addOrEditFlag === 0){
                        //新增
                    }
                    this._SaveComPage(this.currentRow)
                }else {

                }
            })
        },
        cancelDialog(){
            this.showEditDialog = false
        },
    },
  }
</script>


