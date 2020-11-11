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
            border-radius 5px
            box-sizing border-box
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
            border-radius 5px
            box-sizing border-box            

</style>

<template>
    <div class="addToUserGroupCmp">
        <!--添加到用户btn---->
        <div class="userBox u-f-ac" v-if="propShowUser">
            <span 
                class="tit marginR5"
            >
            用户
            </span>
            <!-- userDataArr: {{userDataArr}} -->
            <span class="userShowBox">            
                <span class="u-f-ac u-f-wrap">
                    <el-tag
                        v-for="(user, index) in userDataArr"
                        closable
                        :key="index"
                        style="margin:5px"
                        @close="handlerUserClose(user)"
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
        ----  -->
        <!-- userGroupDataArr: {{userGroupDataArr}}  -->
        <!--添加到用户组btn----->
        <div class="userGroupBox marginT10 u-f-ac" v-if="propShowUserGroup">
            <span 
                class="tit marginR5">
                用户组
            </span>
            <span 
                class="userGroupShowBox">
                <span 
                    class="item"
                >
                    <span class="u-f-ac u-f-wrap">
                        <el-tag
                            closable
                            v-if="user.UserGroupCode"
                            v-for="(user, index) in userGroupDataArr"
                            :key="user.UserGroupCode"
                            style="margin:5px"
                            @close="handlerUserGroupClose(user)"
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
        
        <!-- propGroupObjArr: {{propGroupObjArr}} -->
        <!--用户组选择器--start-->
        <transition name="el-zoom-in-center">
            <div class="userGroupDialogBox animated fadeIn" v-show="showUserGroup">
                <el-dialog
                    title="用户组选择器"
                    fullscreen
                    :visible.sync="showUserGroup"
                    append-to-body
                    :close-on-click-modal="false"
                >
                    <!--引入用户组设置组件-start-->

                    <!--此处要根据此时用户是否是企业用户还是 系统用户进行调用不同的用户组设置组件---->
                    <div v-if="isCompanyOrSystemUser">
                        <company-user-group-select-cmp 
                            ref="companyUserGroupSelectCmp"
                            :currentCode="currentCode"
                            @saveSelectUserGroupDialog="saveSelectUserGroupDialog"
                            @cancelSelectUserGroupDialog="cancelSelectUserGroupDialog"
                            @emitAddUserGroup="emitAddUserGroup">
                        </company-user-group-select-cmp>                    
                    </div>
                    <div v-else>
                        <system-user-group-select-cmp
                            ref="companyUserGroupSelectCmp"
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
                    fullscreen
                    :visible.sync="showUser"
                    append-to-body
                    :close-on-click-modal="false"
                >
                    <!--引入用户设置组件--start-->
                    <!--此处要根据此时用户是否是企业用户还是 系统用户进行调用不同的用户设置组件---->
                    <div v-if="isCompanyOrSystemUser">
                        <company-user-select-cmp
                            ref="companyUserSelectCmp"
                            :currentCode="currentCode"   
                            @emitAddUser="emitAddUser"
                            @emitCancelUser="emitCancelUser"
                        ></company-user-select-cmp>                    
                    </div>
                    <div v-else>
                        <system-user-select-cmp
                            ref="companyUserSelectCmp"
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
        propGroupObjArr:{
            type: Array,
            default: () => {
                return []
            }
        },
        // 用户组code
        currentCode: {
            type: String,
            default: ''
        },
        // 是否是 用户管理中的 添加  用户/用户组 组件调用的
        isRoleManagePage: {
            type: Boolean,
            default: false
        },
        // 是否显示 添加用户
        propShowUser: {
            type: Boolean,
            default: true
        },
        // 是否显示 添加用户组
        propShowUserGroup: {
            type: Boolean,
            default: true
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
            userGroupDataArr: this.propGroupObjArr,  // 选择的 用户组数组对象
            userOrGroupData: {
                UserGroup: [],
                User: []
            },
            currentSelectUserGroupCode: this.currentCode
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
            CompUserToGroup(this.currentSelectUserGroupCode,JSON.stringify(this.userDataArr)).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.$emit("closeDialog")
                    this.$emit("emitAddToUserOrGroup", this.currentSelectUserGroupCode)
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存失败")
            })
        },  
        handlerUserGroupClose(obj){
            debugger
            // this.$refs['companyUserGroupSelectCmp'].handlerDelete(obj)
            // this.userGroupDataArr = []
            this.userGroupDataArr = this.userGroupDataArr.filter((item, key) => {
                return item.UserGroupCode != obj.UserGroupCode
            })
            // 触发 userGroup 组件中 删除对饮的勾选项
            this.$refs.companyUserGroupSelectCmp.emitSetCheckedUserGroupNodes(this.userGroupDataArr, obj)                 
        },   
        // 删除用户
        handlerUserClose(obj){
            // this.$refs['companyUserSelectCmp'].handlerDelete(obj)
            // this.userDataArr = []
            this.userDataArr = this.userDataArr.filter((item, key) => {
                return item.UserGroupCode != obj.UserGroupCode
            })
            // 触发 userSelect组件中 删除对应的勾选选项
            this.$refs.companyUserSelectCmp.emitSetCheckedUserNodes(this.userDataArr)            
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
        // 用户和用户组 一起保存
        _batchAddComUserRole(){
            debugger
            this.userOrGroupData.User = this.userDataArr
            this.userOrGroupData.UserGroup = this.userGroupDataArr
            batchAddComUserRole(this.currentSelectUserGroupCode, JSON.stringify(this.userOrGroupData)).then(res => {
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
                if(this.userGroupDataArr.length<=0 ){
                    // 用户组没有值 则不允许添加
                    this.$message({
                        type: 'warnning',
                        message: '请选择一个用户组后添加'
                    })
                }else {
                    debugger
                    if(this.userGroupDataArr.length>1){
                        // 用户组选择的大于1个
                        this.$message({
                            type: 'warnning',
                            message: '一次仅可选择一个用户组'
                        })                         
                    }else {
                        // 仅有一个用户组
                        if(this.userGroupDataArr[0].UserGroupCode){
                            this._CompUserToGroup()
                        }
                    }
                }                            
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
            if(data && data.length){
                this.currentSelectUserGroupCode = data[0].UserGroupCode                
                this.userGroupDataArr = data
                this.userGroupDataArr.forEach((item, key) => {
                    this.$set(item, 'UserId', item.UserGroupCode)
                })               
                this.closeUserGroupDialog()
            }else {
                this.currentSelectRoleGroupCode = this.currentCode
            }    
        },
        emitCancelUser(){
            this.closeUserDialog()
        }

    }
}
</script>
