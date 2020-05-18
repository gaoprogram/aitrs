<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  用户/组 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.userOrGroupCmp
    padding 0 0 20px 0
    .item
        font-size 0
        .roleTit
            display inline-block
            width 70px
            height 20px
            font-weight bold
            line-height 20px
            font-size 14px
            color #606266
        .roleValue
            display inline-block
            font-size 12px
            margin-left 10px


.userBox
    width 300px
    min-height 40px
    border 1px solid #DCDFE6
    border-radius 5px
    margin-left 10px 
    padding 10px
    box-sizing border-box
    >>>.el-tag 
        margin 5px

</style>

<template>
    <div class="userOrGroupCmp animated fadeIn">
        <!-- obj: {{obj}} -->
        <div class="item">
            <span class="roleTit">角色名:</span>
            <span class="roleValue">{{obj.RoleName}}</span>
        </div>
        <div class="item">
            <span class="roleTit">角色类型:</span>
            <span class="roleValue" v-if="obj.RoleType == 2">企业自定义角色</span>
            <span class="roleValue" v-if="obj.RoleType == 1">系统角色</span>
        </div>        
        <div class="item">
            <span class="roleTit">角色编号:</span>
            <span class="roleValue">{{obj.RoleId}}</span>
        </div>  

        <div class="searchBox u-f-ac marginB10 marginT10">
            <el-input 
                v-model="queryObj.key"
                style="width:300px" 
                clearable
                placeholder="名称、编号" 
                size="small"
            ></el-input>
            <el-button 
                type="primary" 
                class="marginL10" 
                size="mini" 
                @click.native="handlerSearch"
            >搜索</el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerReset">重置</el-button>
        </div>

        <div class="tabBox marginB10">
            <el-tabs 
                v-model="activeTab" 
                type="card" 
                @tab-click="handleClick">
                <el-tab-pane label="用户" name="user">
                    <el-button 
                        v-atris-sysManageScan="{'styleBlock':'inline-block'}"
                        :disabled="multipleSelection.length<=0"
                        style="float:right"
                        type="primary" 
                        size="mini"
                        @click.native="handlerBatchDelete"
                    >批量删除</el-button> 
                    <el-button 
                        v-atris-sysManageScan="{'styleBlock':'inline-block'}"
                        style="float:right;margin-right: 10px"
                        type="primary" 
                        size="mini"
                        @click.native="handlerAddUserBtn"
                    >新增用户</el-button>                                       
                </el-tab-pane>
                <el-tab-pane label="用户组" name="userGroup">
                    <el-button 
                        v-atris-sysManageScan="{'styleBlock':'inline-block'}"
                        :disabled="multipleSelection.length<=0"
                        style="float:right"                    
                        type="primary" 
                        size="mini"
                        @click.native="handlerBatchDelete"
                    >批量删除</el-button>  

                    <el-button 
                        v-atris-sysManageScan="{'styleBlock':'inline-block'}"
                        style="float:right;margin-right:10px"
                        type="primary" 
                        size="mini"
                        @click.native="handlerAddUserGroupBtn"
                    >新增用户组</el-button>                   
                </el-tab-pane>
            </el-tabs>
        </div>
        <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading="loading">
            <!-- tableData: {{tableData}} -->
            <el-table
                border
                max-height="360"
                empty-text=" "
                :data="tableData"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >

                </el-table-column>

                <el-table-column
                    label="名称"
                    prop="UserGroupName"
                    sortable
                    show-overflow-tooltip
                >

                </el-table-column>

                <el-table-column
                    label="编号"
                    prop="UserGroupCode"
                    show-overflow-tooltip
                    sortable
                >

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
                    sortable
                    show-overflow-tooltip
                >

                </el-table-column>   

                <el-table-column
                    v-if="!companyRoleScanFlag"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button 
                            v-atris-sysManageScan="{'styleBlock':'inline-block'}"                        
                            @click.native="handlerDelete(scope.row)"
                            type="text" 
                            size="mini">
                            移除
                        </el-button>                    
                    </template>
                </el-table-column>                                                                 
            </el-table>
            <!--分页部分--start--->
            <div class="pagination-container">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="queryObj.pageNum"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="queryObj.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryObj.total">
                </el-pagination>
            </div>
            <!---分页部分--end--->  
        </div>

        <!--新增用户组-->
        <div class="addUserGroup" v-if="showAddUserGroup">
            <el-dialog
                title="新增用户组"
                fullscreen
                :visible.sync="showAddUserGroup"
                append-to-body
                :close-on-click-modal="false"
            >
                <!-- <add-userorgroup-cmp
                    :currentCode="obj.RoleId"
                    @closeDialog="closeDialog"
                    @emitAddToUserOrGroup="emitAddToUserOrGroup"
                    @emitCancelAdd="emitCancelAdd"
                    :isRoleManagePage = 'true'
                ></add-userorgroup-cmp> -->

                <company-user-group-select-cmp 
                    :currentCode="obj.RoleId"
                    :multipleFlag="true"
                    @emitAddUserGroup="emitAddUserGroup"
                    @cancelSelectUserGroupDialog="cancelSelectUserGroupDialog">
                </company-user-group-select-cmp>                    
            </el-dialog>
        </div> 

        <!--新增用户-->
        <div class="addUser" v-if="showAddUser">
            <el-dialog
                title="新增用户"
                fullscreen
                :visible.sync="showAddUser"
                append-to-body
                :close-on-click-modal="false"
            >
                <company-user-select-cmp 
                    :currentCode="obj.RoleId"
                    @emitAddUser="emitAddUser"
                    @emitCancelUser="emitCancelUser">
                </company-user-select-cmp>                    
            </el-dialog>
        </div> 

        <!-- <div>
            <save-footer @save="saveUserAndGroup" @cancel="cancelUserAndGroup"></save-footer>
        </div> -->
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import AddUserorgroupCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/addToUsergroupWrap-cmp'
    import CompanyUserGroupSelectCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/company_userGroupSelect-cmp'
    import CompanyUserSelectCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/company_userSelect-cmp'
    import { mapGetters } from 'vuex'
    import {
        compRoleUserGMgt,
        batchAddComUserRole,
        batchDelComUserRole
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            strFlag: {
                type: String,
                default: 'roleInfo'
            }
        },
        components: {
            SaveFooter,
            AddUserorgroupCmp,
            CompanyUserGroupSelectCmp,
            CompanyUserSelectCmp
        },
        data(){
            return {
                loading: false, 
                activeTab: 'user',
                tableData: [],
                showAddUserOrGroup: false,
                showAddUserGroup: false, 
                showAddUser: false, 
                multipleSelection: [],
                userOrGroupData: {
                    UserGroup: [],
                    User: []
                },
                queryObj: {
                    roleId: this.obj.RoleId,
                    userType: 1, // 1用户 2 用户组
                    key: '',
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                }
            }
        },
        computed: {
            ...mapGetters([
                'companyRoleScanFlag'
            ])
        },
        watch: {
            // activeTab: {
            //     handler(newValue, oldValue){
            //         if(newValue === 'user'){
                        
            //         }else if(newValue === 'userGroup'){
            //         }
            //     },
            //     immediate: true
            // }
        },
        created(){
            this._getComTables()
        },
        methods: {
            _getComTables(){
                this._compRoleUserGMgt()
            },
            handleClick(tab, index){
                debugger
                this.activeTab = tab.name
                if(this.activeTab === 'user'){
                    this.queryObj.userType = 1
                }else if(this.activeTab === 'userGroup'){
                    this.queryObj.userType = 2
                }
                this._getComTables()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },            
            // 分页--一页展示多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getPaContrctTable()
            },
            // 分页--上一页，下一页
            handleCurrentChange (val) {
                this.queryObj.pageNum = val
                this._getPaContrctTable()
            },  
            // 搜索
            handlerSearch(){
                debugger
                this._getComTables()
            },
            //重置
            handlerReset(){
                Object.assign(this.queryObj, {
                    key: '',
                })
                this._getComTables()
            },
            // 移除
            handlerDelete(obj){
                debugger
                if(this.activeTab === 'user'){
                    this.handlerDeleteUser(obj)
                }else if(this.activeTab === 'userGroup'){
                    this.handlerDeleteUserGroup(obj)
                }
            },            
            // 新增用户/用户组
            handlerAdd(){
                this.showAddUserOrGroup = true
            },
            // 删除用户
            handlerDeleteUser(obj,index){
                debugger
                let deleteArr = []
                deleteArr.push(obj)                  
                this.$confirm(`确定要删除用户"${obj.UserGroupName}"吗?`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText:'取消'
                }).then(res => {
                    // this.userOrGroupData.User.splice(index,1)
                    this._batchDelComUserRole(deleteArr)                    
                }).catch(() => {
                    this.$message.info("删除已取消")
                })                
            },
            _batchDelComUserRole(data){
                this.loading = true              
                batchDelComUserRole(JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除失败,${res.data.Error}`)
                    }
                })
            },
            // 批量删除
            handlerBatchDelete(){
                let str = ''
                if(this.multipleSelection && this.multipleSelection.length){
                    let length = this.multipleSelection.length
                    this.multipleSelection.forEach((item, key) => {
                        if(key != (length-1)){
                            str += item.UserGroupName + ','
                        }else {
                            str += item.UserGroupName
                        }
                    })
                }
                this.$confirm(`确定要批量删除"${str}"吗？`, "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this._batchDelComUserRole(this.multipleSelection)
                }).catch(() => {
                    this.$message.info(`批量删除已取消`)
                })
            },
            // 删除用户组
            handlerDeleteUserGroup(obj, index){
                debugger
                let deleteArr = []
                deleteArr.push(obj)
                this.$confirm(`确定要删除"${obj.UserGroupName}"用户组吗?`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText:'取消'
                }).then(res => {
                    // this.userOrGroupData.UserGroup.splice(index,1)
                    this._batchDelComUserRole(deleteArr)
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            _compRoleUserGMgt(roleId, userType, Key, pageSize, pageNum){
                debugger
                this.loading = true
                compRoleUserGMgt(this.queryObj.roleId, this.queryObj.userType, this.queryObj.key, this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
                    debugger
                    this.loading = false
                  if(res && res.data.State === REQ_OK){
                    //   this.userOrGroupData = res.data.Data
                      this.tableData = res.data.Data
                      this.queryObj.total = res.data.Total
                  }else {
                      this.$message.error(`获取用户/用户组数据失败,${res.data.Error}`)
                  }
                })
            },
            closeDialog(){
                this.showAddUserOrGroup = false
            },
            // 添加成功
            emitAddToUserOrGroup(){
                this._getComTables()
            },
            // 添加取消
            emitCancelAdd(){
                // this.showAddUserOrGroup = false
            },
            // 点击 添加用户组的btn
            handlerAddUserGroupBtn(){
                debugger
                this.showAddUserGroup = true
            },
            // 点击 添加 用户 的btn
            handlerAddUserBtn(){
                debugger
                this.showAddUser = true
            },
            // 添加用户组保存
            saveSelectUserGroupDialog(){
                debugger
            },
            // 添加用户组取消
            cancelSelectUserGroupDialog(){
                debugger
                this.showAddUserGroup = false
            },
            // 用户和用户组 一起保存
            _batchAddComUserRole(){
                debugger
                // this.userOrGroupData.User = this.userDataArr
                // this.userOrGroupData.UserGroup = this.userGroupDataArr
                this.loading = true
                batchAddComUserRole(this.obj.RoleId, JSON.stringify(this.userOrGroupData)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("添加到用户/用户组成功")
                        // this.$emit("emitAddToUserOrGroup")
                        if(this.activeTab === 'user'){
                            this.showAddUser = false
                        }else if(this.activeTab ==='userGroup'){
                            this.showAddUserGroup = false
                        }
                        this._getComTables()
                    }else {
                        this.$message.error(`添加到用户/用户组失败,${res.data.Error}`)
                    }
                })
            },
            _changeUserGroupData(data){
                if(data && data.length){
                    // data = data.map((item, key) => {
                    //     return {
                    //         IsUser: item.IsUser,
                    //         UserGroupCode: item.UserGroupCode,
                    //         UserGroupId: item.Id,
                    //         Name:  item.UserGroupName
                    //     }
                    // })
                    data.forEach((item, key) => {
                        this.$set(item, 'UserGroupId', item.Id)
                        this.$set(item, 'Name', item.UserGroupName)
                    })
                }
            },
            emitAddUserGroup(data){
                debugger
                // this.userOrGroupData.UserGroup = data
                // 处理数据
                this._changeUserGroupData(data)
                this.userOrGroupData.UserGroup = [].concat(data)
                this._batchAddComUserRole()
            },
            cancelSelectUserGroupDialog(){
                this.showAddUserGroup = false
            },
            emitAddUser(data){
                debugger
                this._changeUserGroupData(data)
                this.userOrGroupData.User = [].concat(data)
                this._batchAddComUserRole()
            },
            emitCancelUser(){
                debugger
                this.showAddUser = false
            },
            saveUserAndGroup(){
                // this._batchAddComUserRole()
            },
            cancelUserAndGroup(){

            },
        }
    }
</script>

