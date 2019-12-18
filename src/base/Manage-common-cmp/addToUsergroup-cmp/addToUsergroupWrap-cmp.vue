<!--
  User: gaol
  Date: 2019/11/20
  功能：添加到用户组 弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.addToUserGroupCmp
    padding 10px 20px
    .userBox
        .tit 
            display inline-block
            color #606266
            width 44px
        .userShowBox
            display inline-block
            width 300px
            min-height 40px
            line-height 40px
            border 1px solid #DCDFE6
    .userGroupBox
        .tit 
            display inline-block
            color #606266
            width 44px
        .userGroupShowBox
            dispay inline-block
            width 300px 
            min-height 40px
            line-height 40px
            border 1px solid #DCDFE6

</style>

<template>
    <div class="addToUserGroupCmp">
        <!--添加到用户btn---->
        <div class="userBox u-f-ac">
            <span 
                class="tit"
            >
            用户
            </span>
            <!-- userDataArr: {{userDataArr}} -->
            <span class="userShowBox">            
                <span class="u-f-ac u-f-wrap">
                    <el-tag
                        v-for="(user, index) in userDataArr"
                        :key="index"
                        style="margin:5px"
                    >
                    {{user.UserGroupName}}
                    </el-tag>                    
                </span>
            </span>
            <el-button 
                class="marginL5"
                type="primary" 
                icon="el-icon-plus"
                size="mini"
                @click.native="handlerAddUser"
            ></el-button>
        </div>

        <!-- <div>
            <span>用户</span>
            <el-button type="primary" icon="el-icon-plus"></el-button>
        </div> -->

        <!-- userDataArr： {{userDataArr}}
        ----
        userGroupDataArr: {{userGroupDataArr}} -->
        <!--添加到用户组btn----->
        <div class="userGroupBox marginT10 u-f-ac">
            <span 
                class="tit">
                用户组
            </span>
            <span 
                class="userGroupShowBox">
                <span 
                    class="item"
                >
                    <span class="u-f-ac u-f-wrap">
                        <el-tag
                            v-for="(user, index) in userGroupDataArr"
                            :key="user.UserGroupCode"
                            style="margin:5px"
                        >
                        {{user.UserGroupName}}
                        </el-tag>                    
                    </span>                
                </span>
            </span>            
            <el-button 
                class="marginL5"
                type="primary" 
                icon="el-icon-plus"
                size="mini"
                @click.native="handlerAddUserGroup"
            >
            </el-button>
        </div> 
        
        <!--用户组选择器--start-->
        <transition name="el-zoom-in-center">
            <div class="userGroupDialogBox animated fadeIn" v-show="showUserGroup">
                <el-dialog
                    title="用户组选择器"
                    width="50%"
                    :visible.sync="showUserGroup"
                    append-to-body
                    :close-on-click-modal="false"
                >
                    <!--引入用户组设置组件-start-->

                    <!--此处要根据此时用户是否是企业用户还是 系统用户进行调用不同的用户组设置组件---->
                    <div v-if="isCompanyOrSystemUser">
                        <company-user-group-select-cmp 
                            :currentCode="currentCode"
                            @saveSelectUserGroupDialog="saveSelectUserGroupDialog"
                            @cancelSelectUserGroupDialog="cancelSelectUserGroupDialog"
                            @emitAddUserGroup="emitAddUserGroup">
                        </company-user-group-select-cmp>                    
                    </div>
                    <div v-else>
                        <system-user-group-select-cmp
                            :currentCode="currentCode"
                            @saveSelectUserGroupDialog="saveSelectUserGroupDialog"
                            @cancelSelectUserGroupDialog="cancelSelectUserGroupDialog"
                            @emitAddUserGroup="emitAddUserGroup">
                        </system-user-group-select-cmp>                    
                    </div>
                    <!--引入用户组设置组件-end-->                    
                </el-dialog>
            </div>
        </transition>
        <!--用户组选择器--end-->


        <!--用户选择器--start-->
        <transition name="el-zoom-in-top">
            <div class="userDialogBox animated fadeIn" v-show="showUser">
                <el-dialog
                    title="用户选择器"
                    width="50%"
                    :visible.sync="showUser"
                    append-to-body
                    :close-on-click-modal="false"
                >
                    <!--引入用户设置组件--start-->
                    <!--此处要根据此时用户是否是企业用户还是 系统用户进行调用不同的用户设置组件---->
                    <div v-if="isCompanyOrSystemUser">
                        <company-user-select-cmp
                            :currentCode="currentCode"   
                            @emitAddUser="emitAddUser"
                            @emitCancelUser="emitCancelUser"
                        ></company-user-select-cmp>                    
                    </div>
                    <div v-else>
                        <system-user-select-cmp
                            :currentCode="currentCode"
                            @emitAddUser="emitAddUser"
                            @emitCancelUser="emitCancelUser"
                        ></system-user-select-cmp>                    
                    </div>
                    <!--引入用户设置组件-end-->
                </el-dialog>
            </div>
        </transition>
        <!--用户选择器--end-->        

        <div>
            <saver-footer @save="save" @cancel="cancel"></saver-footer>
        </div>
    </div> 
</template>

<script>
import SaverFooter from '@/base/Save-footer/Save-footer'
import CompanyUserGroupSelectCmp from './company_userGroupSelect-cmp'
import SystemUserGroupSelectCmp from './system_userGroupSelect-cmp'
import CompanyUserSelectCmp from './company_userSelect-cmp'
import SystemUserSelectCmp from './system_userSelect-cmp'
import { mapGetters } from 'vuex'
import { REQ_OK } from '@/api/config'
import {
    CompUserToGroup,  // 用户组 页面中的 添加保存
    batchAddComUserRole,  // 角色管理页面中的 添加用户/组 保存
} from '@/api/systemManage'
export default {
    props: {
        currentCode: {
            type: String,
            default: ''
        },
        // 是否是 用户管理中的 添加  用户/用户组 组件调用的
        isRoleManagePage: {
            type: Boolean,
            default: false
        }
    },
    components: {
        SaverFooter,
        CompanyUserGroupSelectCmp,
        SystemUserGroupSelectCmp,
        CompanyUserSelectCmp,
        SystemUserSelectCmp
    },
    data(){
        return {
            showUser: false,
            showUserGroup: false,
            userDataArr: [],  // 所选择的 用户 对象
            userGroupDataArr: []  // 选择的 用户组数组对象
        }
    },
    computed: {
        ...mapGetters([
            'isCompanyOrSystemUser'
        ])
    },
    created(){
        this.$bus.$on("", ()=> {

        })

        this.$bus.$on("", () => {

        })
    },
    beforeDestroy(){
        this.$bus.$off("")
        this.$bus.$off("")
    },
    methods: {
        //保存 用户组
        _CompUserToGroup(userGroupCode, strJson){
            debugger
            CompUserToGroup(this.currentCode,JSON.stringify(this.userDataArr)).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.$emit("closeDialog")
                    this.$emit("emitAddToUserOrGroup")
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存失败")
            })
        },        
        //添加用户
        handlerAddUser(){
            this.showUser = true
        },
        // 添加用户组
        handlerAddUserGroup(){
            this.showUserGroup = true
        },
        // 取消用户组弹框
        closeUserGroupDialog(){
            this.showUserGroup = false
            // this.$emit("closeDialog")
        },
        // 取消用户弹框
        closeUserDialog(){
            this.showUser = false
        },
        // 保存 用户组
        saveSelectUserGroupDialog(){
            this.closeUserGroupDialog()
        },
        // 取消用户组
        cancelSelectUserGroupDialog(){
            debugger
            if(this.isCompanyOrSystemUser){
                this.closeUserGroupDialog()
            }else {
                this.closeUserGroupDialog()
            }
        },
        _batchAddComUserRole(){
            debugger
            batchAddComUserRole(this.currentCode, JSON.stringify(this.userDataArr)).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success("添加到用户/用户组成功")
                    this.$emit("emitAddToUserOrGroup")
                }else {
                    this.$message.error(`添加到用户/用户组失败,${res.data.Error}`)
                }
            })
        },
        save(){
            debugger
            if(!this.userDataArr.length){
                this.$message.warning("请先选择用户")
                return
            }
            if(!this.isRoleManagePage){              
                // 用户组 页面中 调用的此组件                 
                this._CompUserToGroup()
            }else {
                // 角色管理页面中的  添加 用户/用户组 页面 调用的此组件
                this.$confirm("确定要添加到用户/组吗", "提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {                   
                    this._batchAddComUserRole()
                }).catch(() => {
                    this.$message.info("已取消添加到用户/组")
                    // this.$emit("emitCancelAdd")
                })
            }

        },
        cancel(){
            this.$emit("closeDialog")
        },
        emitAddUser(data){
            debugger
            this.userDataArr = data
            this.userDataArr.forEach((item, key) => {
                this.$set(item, 'UserId', item.UserGroupCode)
            })               
            this.closeUserDialog()
        },
        emitAddUserGroup(data){
            debugger          
            this.userGroupDataArr = data
            this.userDataArr.forEach((item, key) => {
                this.$set(item, 'UserId', item.UserGroupCode)
            })               
            this.closeUserGroupDialog()
        },
        emitCancelUser(){
            this.closeUserDialog()
        }

    }
}
</script>
