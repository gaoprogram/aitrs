<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--权限引用列表组件
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
        <!-- currentTreeNodeObj: {{currentTreeNodeObj}}
        -----
        currentCheckedPermissionObj: {{currentCheckedPermissionObj}} -->
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
            <!-- currentTableData： {{currentTableData}} -->
            <div class="contentTop">
                <el-checkbox
                    v-show="currentPcode"
                    style="float: left"
                    v-model="isStoping"
                >
                    停用
                </el-checkbox>
                <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="handlerAdd"
                    v-show="currentPcode"
                >添加许可权</el-button>
                <!-- <el-button type="primary" @click.native="handlerAdd">添加到许可权</el-button> -->
                <el-button 
                    :disabled="!multipleSelection.length" 
                    type="primary" 
                    size="mini" 
                    @click.native="handlerBathDelete"
                >
                    批量移除
                </el-button>
                <!-- <el-button 
                    type="primary"
                    size="mini" 
                    @click.native="handlerScanLog"
                >日志</el-button> -->
            </div>

            <!-- currentCheckedPermissionObj: {{currentCheckedPermissionObj}} -->
            <!-- currentTableData: {{currentTableData}} -->
            <!-- multipleSelection： {{multipleSelection}} -->
            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    border 
                    empty-text=" "
                    max-height="450"
                    :data="currentTableData"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>

                    <el-table-column
                        label="许可权名"
                        show-overflow-tooltip
                        prop="PermissionPackageName"
                        sortable
                    >
                    </el-table-column>

                    <el-table-column
                        label="许可权编号"
                        show-overflow-tooltip
                        prop="PermissionPackageCode"
                        sortable
                    >
                    </el-table-column>

                    <el-table-column
                        label="引用的角色"
                        prop="RoleNames"
                        sortable
                        show-overflow-tooltip
                    >
                    </el-table-column>    
                    <el-table-column
                        label="描述"
                        width="120"
                        show-overflow-tooltip
                        prop="Description"
                    >
                    </el-table-column>                

                    <el-table-column
                        label="状态"
                        sortable
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
                            <!-- <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerEdit(scope.row, scope.$index)">
                                编辑
                            </el-button> -->
                            <el-button 
                                type="text" 
                                size="mini"
                                @click.native="handlerDelete(scope.row, scope.$index)">
                                移除
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

        <!--编辑弹框--start-->
        <div class="commonDialog" v-if="showEditDialog">
            <el-dialog
                title="添加许可权"
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
                                active-color="#13ce66"
                                inactive-color="#ff4949"                                
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
                    <div class="item-container">
                        <!-- <span class="tit">图标</span> -->
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
                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                            </el-upload>                            
                        </el-form-item>
                    </div>                                                                                                                       
                </el-form>

                <save-footer @save="saveDialog" @cancel="cancelDialog"></save-footer>
            </el-dialog>
        </div>
        <!---编辑弹框-end-->

        <!--添加到许可权弹框--start-->
        <div class="addToPermitDialog" v-if="showDialogAddToPermit">
            <!-- <el-dialog
                title=""
                :visible.sync="showDialogAddToPermit"
                append-to-body
                width="40%"
                :close-on-click-modal="false"
            >
                <div style="height: 400px;overflow: auto">
                    <add-to-permit-cmp 
                        ref="addToPermitCmp"
                        :currentPcode="currentPcode"
                    ></add-to-permit-cmp>
                </div>
                <save-footer @save="saveDialog" @cancel="cancelDialog"></save-footer>
            </el-dialog> -->

            <el-dialog
                title="添加许可权"
                fullscreen
                :visible.sync="showDialogAddToPermit"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-permit-list-cmp 
                    ref="addPermitCmp"
                    :isAuthrityPage="true"
                    :roleId ='queryObj.permissionId'
                    @closeAddDialog="closeAddDialog"
                    @addPermitSuccess="addPermitSuccess"
                ></add-permit-list-cmp>
            </el-dialog>            
        </div>
        <!---添加到许可权弹框-end-->        

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
  import AddPermitListCmp from '@/components/manage/userManage/userRole/roleManage/company-roleManage/roleManage-cmp/permitList-cmp'  
  import  { REQ_OK } from '@/api/config'
  import { 
    CompPermitPMgtList,
    BatchDelFromComPermissionPackage,
    sortSysMenu,
    AddComRolePermission
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
        // 左边树组件中选取的 权限 
        currentCheckedPermissionObj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        SearchToolsCmp,
        SortItemCmp,
        AddPermitListCmp,
        SaveFooter
    },
    watch: {
        currentPcode:{
            handler(newValue, oldValue){
                this.queryObj.pcode = newValue
            },
            immediate: true
        },
        // currentKeyName:{
        //     handler(newValue, oldValue){
        //         this.queryObj.key = newValue
        //     },
        //     immediate: true
        // },
        'currentCheckedPermissionObj.Code': {
            handler(newValue, oldValue){
                debugger
                // if(newValue){
                    this.queryObj.permissionId = newValue
                    this._CompPermitPMgtList()
                // }
            }
        },
        isStoping: {
            handler(newValue, oldValue){
                if(newValue){
                    // 勾选停用
                    this.queryObj.state = 0
                    this.queryObj.pageNum = 1
                    this._getComTables()
                }else {
                    // 取消勾选停用
                    this.queryObj.state = 1
                    this.queryObj.pageNum = 1
                    this._getComTables()
                }
            }
        }
    },
    data(){
      return {
        loading: false, // 加载loading
        isStoping: false, //  停用筛选
        sortDialogLoading: false, // 排序dialog 弹框的 loading
        showEditDialog: false, // 控制编辑弹框的显示/隐藏
        showSortDialog: false, // 控制 排序弹框的显示/隐藏
        showDialogAddToPermit: false, // 控制 添加到许可权弹框的显示/隐藏
        addOrEditFlag: 0, // 0 表示新增  1 表示 编辑
        multipleSelection: [], // 全选
        currentRow: {
            Id: 0,
            Title: '',
            IsSys: true,
            IsPC: '',
            IsMobile: '',
            Description: '',
            Icon: ''
        },  // 当前的row
        currentTableData: [],  // 右边table表格的数据
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            key: '',
            // roleGroupCode: '',  // 角色组code 
            permissionId: '',  // 权限id
            state: 1, // 状态 -1 全部 1 启用 0 禁用
            sysType: -1, // 1 系统 2 企业
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
        // this._CompPermitPMgtList()
    },
    methods: {
        _getComTables(){
            this._CompPermitPMgtList()
        },
        // 全选/取消全选
        handleSelectionChange(val){
            this.multipleSelection = val
        },        
        // 获取 表格数据
        _CompPermitPMgtList(){
            debugger
            this.loading = true
            // 系统用户时
            // let newObj = {
            //     key: this.queryObj.key,                
            //     roleGroupCode: this.queryObj.roleGroupCode
            // }

            // 企业用户时

            debugger
            CompPermitPMgtList(this.queryObj.key, this.queryObj.state, this.queryObj.sysType, this.queryObj.pageSize, this.queryObj.pageNum, this.queryObj.permissionId).then(res => {
            debugger
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.currentTableData = res.data.Data 
                this.queryObj.total = res.data.Total           
            }else {
                this.$message.error(`获取系统菜单列表数据失败,${res.data.Error}`)
            }
            }).catch(() => {
            // this.$message.warning("获取系统菜单列表数据出错了")
            })
        },
        emitRefreshTable(obj){
            debugger
            Object.assign(this.queryObj, obj)
            this._CompPermitPMgtList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._CompPermitPMgtList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._CompPermitPMgtList()
        },
        closeAddDialog(){
            this.showDialogAddToPermit = false
        },
        addPermitSuccess(){
            this._getComTables()
            this.showDialogAddToPermit = false
        },                
        // 编辑
        handlerEdit(row, index) {
            debugger
            this.addOrEditFlag = 1
            this.showEditDialog = true
            row.IsPC += ''
            row.IsMobile += ''
            row.IsSys = row.IsSys === 1 ? 'true': 'false'
            this.currentRow = row
        },
        //新增
        handlerAdd(){
            this.addOrEditFlag = 0
            Object.assign(this.currentRow, {
                Id: '',
                Title: '',
                IsSys: '',
                IsPC: '',
                IsMobile: '',
                Description: '',
                Icon: ''            
            })
            // this.showEditDialog = true
            this.showDialogAddToPermit = true
        },
        // 查看日志
        handlerScanLog(){

        },
        //批量移除
        handlerBathDelete(row){
            debugger
            let str = ''
            let length = this.multipleSelection.length
            if(this.multipleSelection && this.multipleSelection.length){
                this.multipleSelection.forEach((item, key) => {
                    if(key != length-1){
                        str += item.PermissionPackageName + ','
                    }else {
                        str += item.PermissionPackageName
                    }
                })
            }
            this.$confirm(`确定要批量移除"${str}"吗?`,"提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(() => {
                this._BatchDelFromComPermissionPackage(this.multipleSelection)
            }).catch(() => {
                this.$message.info("批量移除已取消")
            })
        },
        // 排序
        handlerSort(){
            debugger
            this.showSortDialog = true
        },
        // 搜索
        clickSearchBtn(){
            this._CompPermitPMgtList()
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                key: '',
                // roleGroupCode: '',
                permissionId: '',
                state: 1,
                sysType: -1,          
            })
            this._CompPermitPMgtList()
        },
        // 删除列表
        _BatchDelFromComPermissionPackage(data){
            debugger
            this.loading = true
            BatchDelFromComPermissionPackage(this.queryObj.permissionId, JSON.stringify(data)).then(res => {
                debugger
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._CompPermitPMgtList()
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
            this.currentRow = row
            this.$confirm(`确定要删除"${row.PermissionPackageName}"吗？`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._BatchDelFromComPermissionPackage([this.currentRow])
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
                    this._CompPermitPMgtList()
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
        _AddComRolePermission(data){
            debugger
            AddComRolePermission(this.currentPcode,JSON.stringify(data)).then(res => {
                if(res && res.data.State ===REQ_OK ){
                    this.$message.success("保存成功")
                    this.showEditDialog = false
                    this._CompPermitPMgtList()
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
                    this._AddComRolePermission(this.currentRow)
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


