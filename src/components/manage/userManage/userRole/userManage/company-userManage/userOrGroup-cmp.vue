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

        <!-- userOrGroupData: {{userOrGroupData}} -->
        <div class="contentWrap" v-loading = "loading">
            <div style="text-align: right">
                <el-button 
                    @click.native="handlerAdd"
                    type="primary" 
                    size="mini">
                    <i class="el-icon el-icon-plus"></i>
                    新增用户组/用户
                </el-button>
            </div>
            <div class="u-f-ac marginT10">
                <div class="tit" style="width: 80px">包含用户组</div>
                <div class="userBox u-f-ac u-f-wrap">
                    <el-tag
                        size="small"
                        v-for="(userGroup, index) in userOrGroupData.UserGroup"
                        :key="userGroup.UserGroupId"
                        closable
                        type="primary"
                        @close="handlerDeleteUserGroup(userGroup,index)">
                        {{userGroup.Name}}
                    </el-tag>
                </div>
            </div>
            <div class="u-f-ac marginT10">
                <div class="tit" style="width: 80px">包含用户</div>
                <div class="userBox u-f-ac u-f-wrap">
                    <el-tag
                        size="small"
                        v-for="(user, index) in userOrGroupData.User"
                        :key="user.UserId"
                        closable
                        type="primary"
                        @close="handlerDeleteUser(user,index)">
                        {{user.Name}}
                    </el-tag>
                </div>
            </div>            
        </div>   

        <div class="addUserOrGroupBox" v-if="showAddUserOrGroup">
            <el-dialog
                title="新增用户/用户组"
                width="30%"
                :visible.sync="showAddUserOrGroup"
                append-to-body
                :close-on-click-modal="false"
            >
                <add-userorgroup-cmp
                    :currentCode="obj.RoleId"
                    @closeDialog="closeDialog"
                    @emitAddToUserOrGroup="emitAddToUserOrGroup"
                    @emitCancelAdd="emitCancelAdd"
                    :isRoleManagePage = 'true'
                ></add-userorgroup-cmp>
            </el-dialog>
        </div> 
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import AddUserorgroupCmp from '@/base/Manage-common-cmp/addToUsergroup-cmp/addToUsergroupWrap-cmp'
    import {
        compRoleUserGMgt,
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
            AddUserorgroupCmp
        },
        data(){
            return {
                loading: false, 
                showAddUserOrGroup: false,
                userOrGroupData: {
                    UserGroup: [],
                    User: []
                }
            }
        },
        computed: {

        },
        created(){
            this._getComTables()
        },
        methods: {
            _getComTables(){
                this._compRoleUserGMgt()
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
                this.$confirm(`确定要删除[${obj.Name}]用户吗`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText:'取消'
                }).then(res => {
                    this.userOrGroupData.User.splice(index,1)
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
            // 删除用户组
            handlerDeleteUserGroup(obj, index){
                debugger
                let deleteArr = []
                deleteArr.push(obj)                
                this.$confirm(`确定要删除[${obj.Name}]用户组吗`,"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText:'取消'
                }).then(res => {
                    this.userOrGroupData.UserGroup.splice(index,1)
                    this._batchDelComUserRole(deleteArr)
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            _compRoleUserGMgt(){
                this.loading = true
                compRoleUserGMgt(this.obj.RoleId).then(res => {
                    debugger
                    this.loading = false
                  if(res && res.data.State === REQ_OK){
                      this.userOrGroupData = res.data.Data
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
        }
    }
</script>

