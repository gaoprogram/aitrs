<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——系统配置--菜单管理
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
>>>.el-table__body-wrapper
    height 500px
    overflow auto
>>>.el-loading-mask
    background-color rgba(0,0,0,0.01) !important
</style>

<template>
    <div class="menuContentSet-cmp">

        <!--搜索部分--start-->
        <div class="searchTopBox">
            <search-tools-cmp 
                :currentPcode="currentPcode" 
                :currentKeyName="currentKeyName"
                @emitRefreshTable="emitRefreshTable">
            </search-tools-cmp>
        </div>        
        <!---搜索部分---end-->

        <!--table表格区--start-->
        <div class="tableContainerWrap">
            <div class="contentTop">
                <el-button type="primary" size="mini" @click.native="handlerAdd">新增</el-button>
                <el-button v-if="currentTableData.length" type="primary" size="mini" @click.native="handlerSort">排序</el-button>
            </div>

            <!-- currentTableData： {{currentTableData}}             -->
            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    max-height="600"
                    border 
                    empty-text=" "
                    :data="currentTableData"
                >
                    <!-- <el-table-column
                        label="图标"
                        prop="Icon"
                    >
                    </el-table-column> -->

                    <el-table-column
                        label="菜单名"
                        prop="Title"
                    >
                    </el-table-column>


                    <el-table-column
                        label="菜单码"
                        prop="MenuCode"
                    >
                    </el-table-column>

                    <el-table-column
                        label="页面名-版本"
                        prop="PageName"
                    >
                    </el-table-column>

                    <el-table-column
                        label="模块"
                        prop="ModuleName"
                    >
                    </el-table-column>

                    <el-table-column
                        label="系统"
                        prop="IsSys"
                        sortable
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.IsSys == 1">
                                系统
                            </span>
                            <span v-if="scope.row.IsSys == 0">
                                企业自定义
                            </span>                            
                        </template>
                    </el-table-column>   

                    <el-table-column
                        label="公司"
                        prop="IsCom"
                        sortable
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.IsCom == 1">
                                是
                            </span>
                            <span v-if="scope.row.IsCom == 0">
                                否
                            </span>                            
                        </template>                     
                    </el-table-column>    

                    <el-table-column
                        label="个人"
                        prop="IsPerson"
                        sortable
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.IsPerson == 1">
                                是
                            </span>
                            <span v-if="scope.row.IsPerson == 0">
                                否
                            </span>                            
                        </template>                       
                    </el-table-column>     

                    <el-table-column
                        label="PC"
                        prop="IsPC"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.IsPC == 1">
                                是
                            </span>
                            <span v-if="scope.row.IsPC == 0">
                                否
                            </span>                            
                        </template>                    
                    </el-table-column>        

                    <el-table-column
                        label="移动端"
                        prop="IsMobile"
                        sortable
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.IsMobile == 1">
                                是
                            </span>
                            <span v-if="scope.row.IsMobile == 0">
                                否
                            </span>                            
                        </template>                         
                    </el-table-column>   

                    <el-table-column
                        label="备注"
                        prop="Description"
                    >
                    </el-table-column>   

                    <el-table-column
                        label="状态"
                        prop="State"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.State == 1">
                                启用
                            </span>
                            <span v-if="scope.row.State == 0">
                                停用
                            </span>                            
                        </template>
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
                                v-show="scope.row.State == 1"
                                type="text" 
                                size="mini"
                                @click.native="handlerStopUsing(scope.row, 0)">
                                停用
                            </el-button>     
                            <el-button
                                v-show="scope.row.State == 0"
                                type="text" 
                                size="mini"
                                @click.native="handlerStartUsing(scope.row, 1)">
                                启用
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
                        <!-- <span class="tit">名称</span> -->
                        <el-form-item
                            label="名称"
                            prop="Title"
                        >
                            <el-input v-model='currentRow.Title' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>

                    <div class="item-container">
                        <el-form-item
                            label="系统生成"
                            prop="IsSys"
                        >
                            <el-switch
                                v-model="currentRow.IsSys"
                                active-value="1"
                                inactive-value="0"                                
                            ></el-switch>
                        </el-form-item>
                    </div>

                    <!-- <div class="item-container">
                        <el-form-item
                            label="适用范围"
                            prop="range"
                        >
                            <el-select v-model='currentRow.range' multiselectable>
                                <el-option
                                    label="网站可见"
                                    value="0"
                                ></el-option>
                                <el-option
                                    label="移动端可见"
                                    value="1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div> -->

                    <div class="item-container">
                        <el-form-item 
                            label="pc端显示"
                            prop="IsPC"
                        >
                            <el-select v-model='currentRow.IsPC'>
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="item-container">
                        <el-form-item 
                            label="移动端显示"
                            prop="IsMobile"
                        >
                            <el-select v-model='currentRow.IsMobile'>
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="item-container">
                        <el-form-item
                            label="备注"
                            prop="Description"
                        >
                            <el-input v-model='currentRow.Description' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>  

                    <!-- <div class="item-container">
                        <el-form-item label="图标" prop="Icon">
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>                            
                        </el-form-item>
                    </div>                                                                                                                        -->
                </el-form>

                <save-footer @save="saveDialog" @cancel="cancelDialog"></save-footer>
            </el-dialog>
        </div>
        <!---编辑/新增弹框-end-->

        <!--排序dialog--start-->
        <div class="sortDailog" v-if="showSortDialog">
            <el-dialog
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
            </el-dialog>
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
    getSysMenuList,
    deleteSysMenu,
    SetSysMenuState,
    sortSysMenu,
    saveSysMenu
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
        currentPcode:{
            handler(newValue, oldValue){
                this.queryObj.pcode = newValue
            },
            immediate: true
        },
        currentKeyName:{
            handler(newValue, oldValue){
                this.queryObj.key = newValue
            },
            immediate: true
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
            Title: '',
            IsSys: '1',
            IsPC: '1',
            IsMobile: '0',
            Description: '',
            Icon: ''
        },  // 当前的row
        currentTableData: [],  // 右边table表格的数据
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            key: '',
            scope: '',
            isPc: '',
            isMobile: '',
            state:'',
            pcode: '' 
        },
        fileList: [
                // {   name: 'food.jpeg', 
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }, 
                // {
                //     name: 'food2.jpeg', 
                //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                // }
            ],
        dialogObjRules: {
            Title: [{required: true, trigger: 'blur', message: '请输入名称'}],
            // range: [{required: true, trigger: ['change'], message: '请选择范围'}],
            IsPC: [{required: true, trigger: ['change'], message: '请选择是否pc可见'}],
            IsMobile: [{required: true, trigger: ['change'], message: '请选择是否移动端可见'}],
            Description: [{required: true, trigger: ['blur'], message: '请填写备注'}]
        }
      }
    },
    created(){
        // 获取table表格数据
        // this._getSysMenuList()
    },
    methods: {
        // 获取 表格数据
        _getSysMenuList(){
            debugger
            this.loading = true
            getSysMenuList(this.queryObj).then(res => {
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.currentTableData = res.data.Data 
                this.queryObj.total = res.data.DataCount           
            }else {
                this.$message.error(`获取系统菜单列表数据失败,${res.data.Error}`)
            }
            }).catch(() => {
            //  this.$message.warning("获取系统菜单列表数据出错了")
            })
        },
        emitRefreshTable(obj){
            debugger
            Object.assign(this.queryObj, obj)
            this._getSysMenuList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getSysMenuList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getSysMenuList()
        },        
        // 编辑
        handlerEdit(row, index) {
            debugger
            this.addOrEditFlag = 1
            this.showEditDialog = true
            row.IsPC += ''
            row.IsMobile += ''
            row.IsSys = row.IsSys == 1 ? '1' : '0'
            this.currentRow = JSON.parse(JSON.stringify(row))
        },
        _SetSysMenuState(data, type){
            let text = type == 1? '启用':'停用'
            SetSysMenuState(JSON.stringify(data), type).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success(`${text}成功`)
                    this._getSysMenuList()
                }else {
                    this.$message.error(`${text}失败,${res.data.Error}`)
                }
            })
        },
        // 启用
        handlerStartUsing(row, type){
            this.currentRow = row
            this.$confirm("确定要启用吗？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetSysMenuState([this.currentRow], 1)
            }).catch(() => {
                this.$message.info(`启用已取消`)
            })
        },
        // 停用
        handlerStopUsing(row, type){
            this.currentRow = row
            this.$confirm("确定要停用吗？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetSysMenuState([this.currentRow], 0)
            }).catch(() => {
                this.$message.info(`停用已取消`)
            })
        },
        //新增
        handlerAdd(){
            this.addOrEditFlag = 0
            Object.assign(this.currentRow, {
                Id: 0,
                Title: '',
                IsSys: '1',
                IsPC: '1',
                IsMobile: '0',
                Description: '',
                Icon: ''        
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
            this._getSysMenuList()
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                key: '',
                scope: '',
                isPc: '',
                isMobile: '',
                state:''                
            })
            this._getSysMenuList()
        },
        // 删除列表
        _deleteSysMenu(){
            this.loading = true
            deleteSysMenu(this.currentRow.Id).then(res => {
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._getSysMenuList()
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
                this._deleteSysMenu()
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
                    this._getSysMenuList()
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
            this._sortSysMenu(data)
        },  
        cancelSort(){
            this.showSortDialog = false
        },
        _saveSysMenu(data){
            debugger
            saveSysMenu(JSON.stringify(data)).then(res => {
                if(res && res.data.State ===REQ_OK ){
                    this.$message.success("保存成功")
                    this.showEditDialog = false
                    this._getSysMenuList()
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
                    this._saveSysMenu(this.currentRow)
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


