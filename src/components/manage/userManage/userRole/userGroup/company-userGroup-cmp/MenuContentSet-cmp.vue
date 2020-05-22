<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色——用户组
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
            <!-- currentTableData： {{currentTableData}} -->
            <!-- currentPcode: {{currentPcode}} -->
            <div class="contentTop">
                <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="addToGroup">添加到用户组</el-button>
                <el-button 
                    :disabled="multipleSelection.length<=0"
                    type="primary" 
                    size="mini"
                    @click.native="handlerBatchDelete">
                    批量移除
                </el-button>
                <!-- <el-button type="primary" size="mini" @click.native="handlerAdd">新增</el-button> -->
                <!-- <el-button v-if="currentTableData.length" type="primary" size="mini" @click.native="handlerSort">排序</el-button> -->
            </div>

            <!-- currentTableData： {{currentTableData}} -->
            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    max-height="500"
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
                        label="用户名"
                        prop="UserName"
                        show-overflow-tooltip
                        sortable
                    >
                    </el-table-column>

                    <el-table-column
                        label="用户编号"
                        prop="UserId"
                        show-overflow-tooltip
                        sortable                        
                    >
                    </el-table-column>   

                    <el-table-column
                        label="状态"
                        prop="State"
                        show-overflow-tooltip
                        sortable                        
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
                        show-overflow-tooltip
                        sortable                        
                    >
                    </el-table-column>

                    <el-table-column
                        label="更新日期"
                        prop="Updated"
                        show-overflow-tooltip
                        sortable                        
                    >
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.Updated}}
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
                            </el-button>   -->

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
                            label="用户组名"
                            prop="AccountName"
                        >
                            <el-input v-model='currentRow.AccountName' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>

                    <div class="item-container">
                        <el-form-item
                            label="用户组编号"
                            prop="EmpId"
                        >
                            <!-- <el-switch
                                v-model="currentRow.IsSys"
                                active-color="#13ce66"
                                inactive-color="#ff4949"                                
                            ></el-switch> -->
                            <el-button type="text" size="mini">系统生成</el-button>
                        </el-form-item>
                    </div>

                    <!-- <div class="item-container">
                        <el-form-item
                            label="描述"
                            prop="Description"
                        >
                            <el-input v-model='currentRow.Description' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>    -->

                    <!-- userOptions: {{userOptions}} -->
                    <!-- <div class="item-container">
                        <el-form-item label="所属用户组">
                           <el-select v-model="currentRow.UserGroupCode">
                               <el-option 
                                v-for="(item, index) in userOptions"
                                :key="index"
                                :label="item.UserGroupName"
                                :value="item.UserGroupCode"
                                >
                               </el-option>
                           </el-select> 
                        </el-form-item>
                    </div>       -->


                    <div class="item-container">
                        <el-form-item
                            label="描述"
                            prop="Description"
                        >
                            <el-input
                                v-model="currentRow.Description"
                                type="textarea"                           
                            ></el-input>
                        </el-form-item>
                    </div> 

                    <div class="item-container">
                        <el-form-item
                            label="状态"
                            prop="State"
                        >
                            <el-switch
                                v-model="currentRow.State"
                                active-value="1"
                                inactive-value="0"                                
                            ></el-switch>
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
        
        <!-- currentTreeNodeObj: {{currentTreeNodeObj}} -->
        <!---添加到用户组弹框-start-->
        <div class="addToRoleGroupBox" 
            v-if="showAddToRoleGroup"
        >
            <el-dialog
                title="添加到用户组"
                width="30%"
                :visible.sync="showAddToRoleGroup"
                append-to-body
                :close-on-click-modal="false"
            >
                
                <add-to-usergroup-cmp 
                    @emitAddToUserOrGroup="emitAddToUserOrGroup"
                    @closeDialog = 'closeAddToRoleGroupDialog'
                    :currentCode = 'queryObj.userGroupCode'
                    :propGroupObjArr="[currentTreeNodeObj]"
                ></add-to-usergroup-cmp>
            </el-dialog>
        </div>
        <!---添加到用户组弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
//   import MenuTreeCmp from '@/base/Manage-common-cmp/MenuTree-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import SearchToolsCmp from './searchTools-cmp'
  import SortItemCmp from './SortItem-cmp'
  import AddToUsergroupCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/addToUsergroupWrap-cmp'
  import  { REQ_OK } from '@/api/config'
  import { 
    getCompUserList,
    BatchDelComUserFromGroup,
    getCompUserGroupTree,
    setCompUserToGroup,
    saveComUserGroup,
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
        AddToUsergroupCmp
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
        userOptions: [],  // 用户组选择器下拉源
        showSortDialog: false, // 控制 排序弹框的显示/隐藏
        addOrEditFlag: 0, // 0 表示新增  1 表示 编辑
        multipleSelection: [], // 全选
        showAddToRoleGroup: false,  // 添加到用户组弹框显示/隐藏
        currentRow: {
            Id: '',
            CompanyCode: '', //企业编号
            UserId: '',   //用户组编号
            UserName: '', // 用户组名称
            Description: '',  // 描述说明
            UserType: '',  // 角色类型
            UserLevel: '', // 角色级别
            MaxAuthNum: '', // 最大授权人数  0 不受限制
            State: '' // 状态  1 启用        
        },  // 当前的row
        currentTableData: [],  // 右边table表格的数据
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            key: '',
            userGroupCode: '',
            permissionId:''
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
            AccountName: [{required: true, trigger: 'blur', message: '请输入名称'}],
            // EmpId: [{required: true, trigger: 'blur', message: '请输入用户编号'}],
            // range: [{required: true, trigger: ['change'], message: '请选择范围'}],
            UserGroupCode: [{required: true, trigger: ['change'], message: '请选择所属用户组'}],
            Description: [{required: true, trigger: ['blur'], message: '请填写备注'}]
        }
      }
    },
    created(){
        // 获取table表格数据
        // this._getCompUserList()
        this.$nextTick(() => {
            this.$bus.$on("currentMenuObj", (obj) => {
                this.queryObj.userGroupCode = obj.UserGroupCode
                this._getCompUserList()
            })
        })
    },
    beforeDestroy(){
        this.$bus.$off("currentMenuObj")
    },
    methods: {
        _getComTables(){
            this._getCompUserList()
        },
        // 全选/取消全选
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        emitAddToUserOrGroup(userGroupCode){
            // 重新定位 树  和 刷新列表
            this.queryObj.userGroupCode = userGroupCode
            this.$bus.$emit("resetTreeActive", userGroupCode)
            this._getComTables()
        },      
        // 获取 表格数据
        _getCompUserList(userGroupCode, Key){
            debugger
            this.loading = true
            getCompUserList(this.queryObj.userGroupCode, this.queryObj.key, this.queryObj.permissionId).then(res => {
                debugger
                this.loading = false
            if(res && res.data.State === REQ_OK){
                this.currentTableData = res.data.Data 
                this.queryObj.total = res.data.Total           
            }else {
                this.$message.error(`获取企业菜单列表数据失败,${res.data.Error}`)
            }
            }).catch(() => {
                // this.$message.warning("获取企业菜单列表数据出错了")
            })
        },
        emitRefreshTable(obj){
            debugger
            Object.assign(this.queryObj, obj)
            this._getCompUserList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getCompUserList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getCompUserList()
        },   
        // 获取用户组所属下拉源
        _getUserGroupOption(){
            debugger
            getCompUserGroupTree('', -1).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.userOptions = res.data.Data
                }else {
                    this.$message.error(`获取用户组所属下拉源数据失败,${res.data.Error}`)
                }
            })
        },     
        // 编辑
        handlerEdit(row, index) {
            debugger
            this.addOrEditFlag = 1
            // 获取用户组所属
            this._getUserGroupOption()
            this.showEditDialog = true

            this.currentRow = row
            this.currentRow.State = "" + this.currentRow.State
        },
        _setCompUserToGroup(userGroupCode, strJson){
            debugger
            setCompUserToGroup().then(res => {
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
        // 添加到用户组
        addToGroup(){
            // this.$confirm("确定要添加到组吗？","提示", {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消'
            // }).then(() => {
            //     this.showAddToRoleGroup = true
            //     // this._setCompUserToGroup()
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
                UserId: '',   //用户组编号
                UserName: '', // 用户组名称
                Description: '',  // 描述说明
                UserType: '',  // 角色类型
                UserLevel: '', // 角色级别
                MaxAuthNum: '', // 最大授权人数  0 不受限制
                State: '' // 状态  1 启用        
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
            this._getCompUserList()
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                key: '',
                userGroupCode: '',
                permissionId: ''             
            })
            this._getCompUserList()
        },
        // 删除列表
        _BatchDelComUserFromGroup(data){
            this.loading = true
            BatchDelComUserFromGroup(JSON.stringify(data)).then(res => {
                debugger
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._getCompUserList()
                }else {
                    this.$message.error(`删除失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("删除出错了")
            })
        },
        // 批量移除
        handlerBatchDelete(){
            debugger
            let str = ''
            let length = this.multipleSelection.length
            if(length){
                this.multipleSelection.forEach((item, key) => {
                    if(key != length-1){
                        str += item.AccountName + ','
                    }else {
                        str += item.AccountName
                    }
                })
            }
            this.$confirm(`确定要移除"${str}"吗？`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._BatchDelComUserFromGroup(this.multipleSelection)
            }).catch(() =>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })            
        },
        // 移除
        handlerDelete(row, index){
            debugger
            this.currentRow = row
            this.$confirm(`确定要移除"${row.AccountName}"吗？`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._BatchDelComUserFromGroup([this.currentRow])
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
                    this._getCompUserList()
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
        _saveComUserGroup(data){
            debugger
            saveComUserGroup(JSON.stringify(data)).then(res => {
                if(res && res.data.State ===REQ_OK ){
                    this.$message.success("保存成功")
                    this.showEditDialog = false
                    this._getCompUserList()
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
                    this._saveComUserGroup(this.currentRow)
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


