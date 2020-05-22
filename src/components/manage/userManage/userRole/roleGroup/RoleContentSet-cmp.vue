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
                <el-button 
                    type="primary" 
                    size="mini" 
                    @click.native="addToGroup">添加到角色组</el-button>
                <el-button 
                    :disabled="multipleSelection.length<=0"
                    type="primary" 
                    size="mini" 
                    @click.native="handlerDelete">
                    批量移除
                </el-button>
                <!-- <el-button type="primary" size="mini" @click.native="handlerAdd">新增</el-button> -->
                <!-- <el-button v-if="currentTableData.length" type="primary" size="mini" @click.native="handlerSort">排序</el-button> -->
            </div>

            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    border 
                    empty-text=" "
                    :data="currentTableData"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>

                    <el-table-column
                        label="角色名"
                        prop="AccountName"
                    >
                    </el-table-column>


                    <el-table-column
                        label="状态"
                        prop="State"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.State == 0">
                                冻结
                            </span>
                            <span v-if="scope.row.State == 1">
                                激活
                            </span>                            
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="更新人"
                        prop="UpdateBy"
                    >
                    </el-table-column>

                    <el-table-column
                        label="更新日期"
                        prop="Updated"
                    >
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.Updated | replaceTime}}
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
        
        <!---添加到角色组弹框-start-->
        <div class="addToRoleGroupBox" v-if="showAddToRoleGroup">
            <el-dialog
                title="添加到角色组"
                width="30%"
                :visible.sync="showAddToRoleGroup"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-to-rolegroup-cmp @closeDialog="closeAddToRoleGroupDialog"></add-to-rolegroup-cmp>
            </el-dialog>
        </div>
        <!---添加到角色组弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import SearchToolsCmp from './searchTools-cmp'
  import SortItemCmp from './SortItem-cmp'
  import AddToRolegroupCmp from '@/base/Manage-common-cmp/addToRolegroup-cmp/addToRolegroupWrap-cmp'
  import  { REQ_OK } from '@/api/config'
  import { 
    getSysUserList,
    batchDelSysRoleGroupRole,
    setSysUserToGroup,
    saveSysMenu,
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
        SaveFooter,
        AddToRolegroupCmp
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
        multipleSelection: [], // 全选
        showAddToRoleGroup: false,  // 添加到角色组弹框显示/隐藏
        currentRow: {
            Id: '',
            CompanyCode: '', //企业编号
            UserGroupCode: true,   //角色组编号
            UserGroupName: '', // 角色组名称
            Description: '',  // 描述说明
            Deleted: '',  // 删除标记 0未删 1已删
            Created: '', // 创建时间
            UpdateBy: '', // 更新人
            Updated: '' // 更新时间
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
        // this._getSysUserList()
    },
    methods: {
        // 全选/取消全选
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        // 获取 表格数据
        _getSysUserList(){
            debugger
            this.loading = true
            getSysUserList(this.queryObj).then(res => {
            this.loading = false
            if(res && res.data.State === REQ_OK){
                this.currentTableData = res.data.Data 
                this.queryObj.total = res.data.DataCount           
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
            this._getSysUserList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getSysUserList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getSysUserList()
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
        _setSysUserToGroup(userGroupCode, strJson){
            debugger
            setSysUserToGroup().then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success("添加到组成功")
                }else {
                    this.$message.error(`添加到组失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("添加到组失败")
            })
        },
        closeAddToRoleGroupDialog(){
            this.showAddToRoleGroup = false
        },
        // 添加到角色组
        addToGroup(){
            // this.$confirm("确定要添加到组吗？","提示", {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消'
            // }).then(() => {
            //     this.showAddToRoleGroup = true
            //     // this._setSysUserToGroup()
            // }).catch(() => {
            //     this.$message.info("已取消")
            // })

            this.showAddToRoleGroup = true
        },
        //新增
        handlerAdd(){
            this.addOrEditFlag = 0
            Object.assign(this.currentRow, {
                Id: '',
                CompanyCode: '', //企业编号
                UserGroupCode: true,   //角色组编号
                UserGroupName: '', // 角色组名称
                Description: '',  // 描述说明
                Deleted: '',  // 删除标记 0未删 1已删
                Created: '', // 创建时间
                UpdateBy: '', // 更新人
                Updated: '' // 更新时间        
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
            this._getSysUserList()
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
            this._getSysUserList()
        },
        // 删除列表
        _batchDelSysRoleGroupRole(){
            this.loading = true
            batchDelSysRoleGroupRole(JSON.stringify(this.currentRow)).then(res => {
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._getSysUserList()
                }else {
                    this.$message.error(`删除失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("删除出错了")
            })
        },
        // 移除
        handlerDelete(row, index){
            this.currentRow = row
            this.$confirm("确定要移除吗？","提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._batchDelSysRoleGroupRole()
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
                    this._getSysUserList()
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
                    this._getSysUserList()
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


