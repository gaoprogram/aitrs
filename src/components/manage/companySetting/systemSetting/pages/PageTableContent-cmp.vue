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
            width 200px
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

        <!--table表格区--start-->
        <!-- currentTableData： {{currentTableData}} -->
        <div class="tableContainerWrap">
            <div class="contentTop">
                <el-button type="primary" size="mini" @click.native="handlerAdd">新增</el-button>
                <!-- <el-button type="primary" size="mini" @click.native="handlerSort">排序</el-button> -->
            </div>

            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    border 
                    empty-text=" "
                    max-height="400"
                    :data="currentTableData"
                >
                    <el-table-column
                        label="页面名"
                        prop="Title"
                    >
                    </el-table-column>

                    <el-table-column
                        label="页面码"
                        prop="PageCode"
                    >
                    </el-table-column>

                    <el-table-column
                        label="URL"
                        prop="PageUrl"
                    >
                    </el-table-column>

                    <el-table-column
                        label="模块"
                        prop="ModuleName"
                    >
                    </el-table-column>

                    <el-table-column
                        label="版本"
                        prop="VersionRange"
                    >
                    </el-table-column>   

                    <el-table-column
                        label="描述"
                        prop="Description"
                    >
                    </el-table-column>    

                    <el-table-column
                        label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerEdit(scope.row, scope.$index)">
                                编辑
                            </el-button>
                            <el-button 
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
        <div class="commonDialog" v-if="showEditDialog">
            <el-dialog
                title="菜单信息"
                :visible.sync="showEditDialog"
                append-to-body
                width="30%"
                :close-on-click-modal="false"
            >
                <!-- currentRow: {{currentRow}} -->
                <el-form ref="dialogForm" :model="currentRow" :rules="dialogObjRules" label-width="120px">
                    <div class="item-container">
                        <el-form-item
                            label="页面名称"
                            prop="Title"
                        >
                            <el-input v-model='currentRow.Title' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>  

                    <div class="item-container">
                        <el-form-item
                            label="页面码"
                            prop="PageCode"
                        >
                            <el-input v-model='currentRow.PageCode' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>       

                    <div class="item-container">
                        <el-form-item
                            label="URL"
                            prop="PageUrl"
                        >
                            <el-input v-model='currentRow.PageUrl' placeholder="请输入"></el-input>
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
                                v-model='currentRow.ModuleName'>
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

                    <div class="item-container">
                        <el-form-item
                            label="描述"
                            prop="Description"
                        >
                            <el-input type="textarea" v-model='currentRow.Description' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>                                                                             


                </el-form>

                <save-footer @save="saveDialog" @cancel="cancelDialog"></save-footer>
            </el-dialog>
        </div>
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
    getSysPageList,
    deleteSysPage,
    // sortSysMenu,
    saveSysPage,
    getProductModuleVerMgt
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
        }
    },
    components: {
        SearchToolsCmp,
        SortItemCmp,
        SaveFooter
    },
    watch: {
        'currentTreeNodeObj.MenuCode':{
            handler(newValue, oldValue){
                this.queryObj.menuCode = newValue
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
                this.queryObj.menuCode = this.currentTreeNodeObj.MenuCode
            },            
        }
    },
    data(){
      return {
        loading: false, // 加载loading
        sortDialogLoading: false, // 排序dialog 弹框的 loading
        showEditDialog: false, // 控制编辑/新增弹框的显示/隐藏
        showSortDialog: false, // 控制 排序弹框的显示/隐藏
        addOrEditFlag: 0, // 0 表示新增  1 表示 编辑
        currentRow: {
            Id: 0,
            Title: '',  // 页面名
            PageCode: '',  // 页面码
            PageUrl: '',  // 页面Url
            ModuleName: '', // 模块名称
            VersionRange: '', // 版本许可范围   
            Description: '', // 描述
        },  // 当前的row
        currentTableData: [],  // 右边table表格的数据
        moduleNameOption:[], // 模块名称下拉源数据
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            key: '',  // 关键词
            state: 1, 
            menuCode: '', 
            moduleCode: '',  // 模块    
        },
        dialogObjRules: {
            Title: [{required: true, trigger: 'blur', message: '请输入名称'}],
            PageCode: [{required: true, trigger: ['blur'], message: '请输入页面码'}],
            PageUrl: [{required: true, trigger: ['blur'], message: '请输入页面url'}],
            ModuleName: [{required: true, trigger: ['blur'], message: '请输入模块名称'}],
            Description: [{required: true, trigger: ['blur'], message: '请输入描述'}]
        }
      }
    },
    created(){
        // 获取table表格数据
        // this._getSysPageList()
    },
    methods: {
        getCommTables(){
            this._getSysPageList()
        },
        // 获取 表格数据
        _getSysPageList(){
            debugger
            this.loading = true
            getSysPageList(this.queryObj).then(res => {
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
            this._getSysPageList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getSysPageList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getSysPageList()
        },    
        getProductModuleVerMgt(){
            getProductModuleVerMgt(65553).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.moduleNameOption = res.data.Data
                }else {
                    this.$message.error(`获取模块名称下拉源数据失败,${res.data.Error}`)
                }
            })
        },    
        // 编辑
        handlerEdit(row, index) {
            debugger
            this.getProductModuleVerMgt()
            this.addOrEditFlag = 1
            this.showEditDialog = true
            row.IsPC += ''
            row.IsMobile += ''
            row.IsSys = row.IsSys == 1 ? '1': '0'
            this.currentRow = row
        },
        //新增
        handlerAdd(){
            this.addOrEditFlag = 0
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
                ModuleCode: "",
                ModuleName: "",
                PageCode: "",
                PageUrl: "",
                State: 1,
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
            this._getSysPageList()
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
            this._getSysPageList()
        },
        // 删除列表
        _deleteSysPage(){
            this.loading = true
            deleteSysPage(this.currentRow.Id).then(res => {
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._getSysPageList()
                }else {
                    this.$message.error(`删除失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("删除出错了")
            })
        },
        // 删除
        handlerDelete(row, index){
            this.currentRow = row
            this.$confirm("确定要删除吗？","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._deleteSysPage()
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
                    this._getSysPageList()
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
        _saveSysPage(data){
            debugger
            saveSysPage(JSON.stringify(data)).then(res => {
                if(res && res.data.State ===REQ_OK ){
                    this.$message.success("保存成功")
                    this.showEditDialog = false
                    this._getSysPageList()
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
                    this._saveSysPage(this.currentRow)
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


