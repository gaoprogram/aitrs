<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--角色组
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
                @emitRefreshTable="emitRefreshTable">
            </search-tools-cmp>
        </div>        
        <!---搜索部分---end-->
        <!-- currentTreeNodeObj：{{currentTreeNodeObj}} -->
        <!--table表格区--start-->
        <div class="tableContainerWrap">
            <!-- currentTableData： {{currentTableData}} -->
            <div class="contentTop">
                <el-button 
                    type="primary" 
                    size="mini"
                    @click.native="addToGroup">添加到角色组</el-button>
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

            <div :class="['tableList',currentTableData.length<=0? 'not_found':'']" v-loading = "loading">
                <el-table
                    style="width:100%"
                    max-height="500px"
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
                        prop="RoleName"
                        sortable
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        label="编号"
                        prop="RoleId"
                        width="150"
                        sortable
                        show-overflow-tooltip
                    >
                    </el-table-column>  

                    <el-table-column
                        label="角色类型"
                        prop="RoleType"
                        sortable
                        show-overflow-tooltip                        
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.RoleType == 1"> 
                                系统角色
                            </span>
                            <span v-if="scope.row.RoleType == 2"> 
                                企业自定义角色
                            </span>                            
                        </template>                    
                    </el-table-column>

                    <el-table-column
                        label="角色级别"
                        prop="RoleLevel"
                        sortable
                        show-overflow-tooltip                        
                    >
                        <template slot-scope="scope">
                            <!-- scope.row.RoleLevel： {{scope.row.RoleLevel}} -->
                            <span v-if="scope.row.RoleLevel == 1"> 
                                总部
                            </span>
                            <span v-if="scope.row.RoleLevel == 2"> 
                                分部
                            </span>      
                            <span v-if="scope.row.RoleLevel == 3"> 
                                部门
                            </span>                                                    
                        </template>
                    </el-table-column>                    

                    <!-- <el-table-column
                        label="最大授权人数"
                        prop="MaxAuthNum"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.MaxAuthNum == 0">
                                无限制
                            </span>
                            <span v-else>{{scope.row.MaxAuthNum}}</span>
                        </template>
                    </el-table-column>   -->

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
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.State == 0">
                                停用
                            </span>
                            <span v-if="scope.row.State == 1">
                                启用
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
                                @click.native="handlerEdit(scope.row, scope.$index)"
                            >
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
                            prop="RoleName"
                        >
                            <el-input v-model='currentRow.RoleName' placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>

                    <div class="item-container">
                        <el-form-item
                            label="角色类型"
                            prop="RoleType"
                        >
                            <!-- <el-switch
                                v-model="currentRow.IsSys"
                                active-value="1"
                                inactive-value="0"                               
                            ></el-switch> -->
                            <!-- <template slot-scope="scope">
                                scope: {{scope}}
                                <span v-if="currentRow.IsSys == 1">
                                    企业自定义角色
                                </span>
                                <span v-if="currentRow.IsSys == 0">
                                    系统角色
                                </span>  
                            </template> -->
                            <!-- currentRow.RoleType {{currentRow.RoleType}} -->
                            <el-button type="text" size="mini" v-if="currentRow.RoleType ==1">系统角色</el-button>
                            <el-button type="text" size="mini" v-if="currentRow.RoleType ==2">企业自定义角色</el-button>
                        </el-form-item>
                    </div> 

                    <div class="item-container">
                        <!-- roleOptions: {{roleOptions}} -->
                        <el-form-item label="所属角色组" prop="RoleGroupCode">
                           <el-select v-model="currentRow.RoleGroupCode">
                               <el-option 
                                v-for="(item, index) in roleOptions"
                                :key="index"
                                :label="item.RoleGroupName"
                                :value="item.RoleGroupCode"
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
                            <el-input v-model='currentRow.Description' placeholder="请输入"></el-input>
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
        
        <!---添加到角色组弹框-start-->
        <div class="addToRoleGroupBox" v-if="showAddToRoleGroup">
            <el-dialog
                title="添加到角色组"
                width="30%"
                :visible.sync="showAddToRoleGroup"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-to-rolegroup-cmp 
                    :roleShow = "true"
                    :roleGroupShow="true"
                    @emitAddToUserOrGroup="emitAddToUserOrGroup"
                    @closeDialog = 'closeAddToRoleGroupDialog'
                    :currentCode = 'queryObj.roleGroupCode'
                    :propGroupObjArr="[currentTreeNodeObj]"
                ></add-to-rolegroup-cmp>
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
    getCompRoleList,
    batchDelComRoleGroup,
    getCompRoleGroupTree,
    setCompUserToGroup,
    saveComRoleGroup,
  }from '@/api/systemManage'
  export default {
    props:{
        // 左边点击的树节点传过来的
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
        roleOptions: [],  // 角色组选择器下拉源
        showSortDialog: false, // 控制 排序弹框的显示/隐藏
        addOrEditFlag: 0, // 0 表示新增  1 表示 编辑
        multipleSelection: [], // 全选
        showAddToRoleGroup: false,  // 添加到角色组弹框显示/隐藏
        currentRow: {
            Id: '',
            CompanyCode: '', //企业编号
            RoleId: '',   //角色组编号
            RoleName: '', // 角色组名称
            Description: '',  // 描述说明
            RoleType: '',  // 角色类型
            RoleLevel: '', // 角色级别
            MaxAuthNum: '', // 最大授权人数  0 不受限制
            State:  "1"// 状态  1 启用        
        },  // 当前的row
        currentTableData: [],  // 右边table表格的数据
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            key: '',
            roleGroupCode: '',
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
            RoleName: [{required: true, trigger: 'blur', message: '请输入名称'}],
            // range: [{required: true, trigger: ['change'], message: '请选择范围'}],
            RoleGroupCode:[{required: true, trigger: 'change', message: '请选择角色组名'}],
            RoleId: [{required: true, trigger: ['change'], message: '请选择所属角色组'}],
            // Description: [{required: true, trigger: ['blur'], message: '请填写备注'}]
        }
      }
    },
    created(){
        // 获取table表格数据
        // this._getCompRoleList()
        this.$nextTick(() => {
            this.$bus.$on("currentMenuObj", (obj) => {
                debugger
                this.queryObj.roleGroupCode = obj.RoleGroupCode
                this._getCompRoleList()
            })
        })
    },
    beforeDestroy(){
        this.$bus.$off("currentMenuObj")
    },
    methods: {
        _getComTables(){
            this._getCompRoleList()
        },
        // 全选/取消全选
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        emitAddToUserOrGroup(roleGroupCode){
            // 重新定位 树  和 刷新列表
            this.queryObj.roleGroupCode = roleGroupCode
            this.$bus.$emit("resetTreeActive", roleGroupCode)
            this._getComTables()
        },           
        // 获取 表格数据
        _getCompRoleList(){
            debugger
            this.loading = true
            getCompRoleList(this.queryObj.roleGroupCode, this.queryObj.permissionId, this.queryObj.key).then(res => {
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
            this._getCompRoleList()
        },
        // 分页--每页多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getCompRoleList()
        },
        // 分页--当前页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getCompRoleList()
        },   
        // 获取角色组所属下拉源
        _getRoleGroupOption(){
            debugger
            getCompRoleGroupTree(1,'', 'true').then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.roleOptions = res.data.Data
                }else {
                    this.$message.error(`获取角色组所属下拉源数据失败,${res.data.Error}`)
                }
            })
        },     
        // 编辑
        handlerEdit(row, index) {
            debugger
            this.addOrEditFlag = 1
            if(row.State == 1){
                row.State = '1'
            }else if(row.State == 0){
                row.State = '0'
            }else {
                row.State = '1'
            }

            this._getRoleGroupOption()
            this.showEditDialog = true

            this.currentRow = row
        },
        _setCompUserToGroup(roleGroupCode, strJson){
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
        // 添加到角色组
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
                Id: 0,
                CompanyCode: '', //企业编号
                RoleId: '',   //角色组编号
                RoleName: '', // 角色组名称
                Description: '',  // 描述说明
                RoleType: '',  // 角色类型
                RoleLevel: '', // 角色级别
                MaxAuthNum: '', // 最大授权人数  0 不受限制
                State: "1" // 状态  1 启用        
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
            this._getCompRoleList()
        },
        // 重置
        clickResetBtn(){
            Object.assign(this.queryObj, {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                key: '',
                roleGroupCode: '',
                permissionId: ''             
            })
            this._getCompRoleList()
        },
        // 删除列表
        _batchDelComRoleGroup(data){
            this.loading = true
            batchDelComRoleGroup(JSON.stringify(data)).then(res => {
                debugger
                this.loading = false
                if(res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._getCompRoleList()
                }else {
                    this.$message.error(`删除失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("删除出错了")
            })
        },
        // 移除
        handlerDelete(row, index){
            debugger
            this.currentRow = row
            this.$confirm(`确定要移除"${row.RoleName}"吗？`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._batchDelComRoleGroup([this.currentRow])
            }).catch(() =>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
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
                        str += item.RoleName + ','
                    }else {
                        str += item.RoleName
                    }
                })
            }
            this.$confirm(`确定要移除"${str}"吗？`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(()=>{
                this._batchDelComRoleGroup(this.multipleSelection)
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
                    this._getCompRoleList()
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
        _saveComRoleGroup(data){
            debugger
            saveComRoleGroup(JSON.stringify(data)).then(res => {
                if(res && res.data.State ===REQ_OK ){
                    this.$message.success("保存成功")
                    this.showEditDialog = false
                    this._getCompRoleList()
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
                    this._saveComRoleGroup(this.currentRow)
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


