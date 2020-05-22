<!--
  User: gaol
  Date: 2019/11/20
  功能：添加到角色组 弹框组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.addToRoleGroupCmp
    padding 10px 20px
    .roleBox
        .tit 
            display inline-block
            color #606266
            width 44px
        .roleShowBox
            display inline-block
            width 300px
            min-height 40px
            line-height 40px
            border 1px solid #DCDFE6
    .roleGroupBox
        .tit 
            display inline-block
            color #606266
            width 44px
        .roleGroupShowBox
            dispay inline-block
            width 300px 
            min-height 40px
            line-height 40px
            border 1px solid #DCDFE6

</style>

<template>
    <div class="addToRoleGroupCmp">
        <!-- propGroupObjArr: {{propGroupObjArr}} -->
        <!--添加到角色btn---->
        <div class="roleBox u-f-ac" v-if="roleShow">
            <span 
                class="tit"
            >
            角色
            </span>
            <!-- roleDataArr: {{roleDataArr}} -->
            <span class="roleShowBox">            
                <span class="u-f-ac u-f-wrap">
                    <el-tag
                        closable
                        v-for="(role, index) in roleDataArr"
                        :key="index"
                        style="margin:5px"
                        @close="handlerRoleClose(role)" 
                    >
                    {{role.RoleGroupName}}
                    </el-tag>                    
                </span>
            </span>
            <el-button 
                class="marginL5"
                type="primary" 
                icon="el-icon-plus"
                size="mini"
                @click.native="handlerAddRole"
            ></el-button>
        </div>

        <!-- <div>
            <span>角色</span>
            <el-button type="primary" icon="el-icon-plus"></el-button>
        </div> -->

        <!-- roleDataArr： {{roleDataArr}}
        ----
        roleGroupDataArr: {{roleGroupDataArr}} -->
        <!--添加到角色组btn----->
        <div class="roleGroupBox marginT10 u-f-ac" v-if="roleGroupShow">
            <span 
                class="tit">
                角色组
            </span>
            <span 
                class="roleGroupShowBox">
                <span 
                    class="item"
                >
                    <span class="u-f-ac u-f-wrap">
                        <el-tag
                            v-if="role.RoleGroupCode"
                            v-for="(role, index) in roleGroupDataArr"
                            closable
                            :key="index"
                            style="margin:5px"
                            @close="handlerRoleGroupClose(role)"                            
                        >
                        {{role.RoleGroupName}}
                        </el-tag>                    
                    </span>                
                </span>
            </span>            
            <el-button 
                class="marginL5"
                type="primary" 
                icon="el-icon-plus"
                size="mini"
                @click.native="handlerAddRoleGroup"
            >
            </el-button>
        </div> 
        
        <!--角色组选择器--start-->
        <transition name="el-zoom-in-center">
            <div class="roleGroupDialogBox animated fadeIn" v-show="showRoleGroup">
                <el-dialog
                    title="角色组选择器"
                    fullscreen
                    :visible.sync="showRoleGroup"
                    append-to-body
                    :close-on-click-modal="false"
                >
                    <!--引入角色组设置组件-start-->

                    <!--此处要根据此时用户是否是企业用户还是 系统用户进行调用不同的角色组设置组件---->
                    <div v-if="isCompanyOrSystemUser">
                        <company-role-group-select-cmp 
                            ref="companyRoleGroupSelectCmp"
                            :currentCode="currentCode"
                            @saveSelectRoleGroupDialog="saveSelectRoleGroupDialog"
                            @cancelSelectRoleGroupDialog="cancelSelectRoleGroupDialog"
                            @emitAddRoleGroup="emitAddRoleGroup">
                        </company-role-group-select-cmp>                    
                    </div>
                    <div v-else>
                        <system-role-group-select-cmp
                            ref="companyRoleGroupSelectCmp"
                            :currentCode="currentCode"
                            @saveSelectRoleGroupDialog="saveSelectRoleGroupDialog"
                            @cancelSelectRoleGroupDialog="cancelSelectRoleGroupDialog"
                            @emitAddRoleGroup="emitAddRoleGroup">
                        </system-role-group-select-cmp>                    
                    </div>
                    <!--引入角色组设置组件-end-->                    
                </el-dialog>
            </div>
        </transition>
        <!--角色组选择器--end-->


        <!--角色选择器--start-->
        <transition name="el-zoom-in-top">
            <div class="roleDialogBox animated fadeIn" v-show="showRole">
                <el-dialog
                    title="角色选择器"
                    fullscreen
                    :visible.sync="showRole"
                    append-to-body
                    :close-on-click-modal="false"
                >
                    <!--引入角色设置组件--start-->
                    <!--此处要根据此时用户是否是企业用户还是 系统用户进行调用不同的角色设置组件---->
                    <div v-if="isCompanyOrSystemUser">
                        <company-role-select-cmp
                            ref="companyRoleSelectCmp"
                            :currentCode="currentCode"   
                            @emitAddRole="emitAddRole"
                            @emitCancelRole="emitCancelRole"
                        ></company-role-select-cmp>                    
                    </div>
                    <div v-else>
                        <system-role-select-cmp
                            ref="companyRoleSelectCmp"
                            :currentCode="currentCode"
                            @emitAddRole="emitAddRole"
                            @emitCancelRole="emitCancelRole"
                        ></system-role-select-cmp>                    
                    </div>
                    <!--引入角色设置组件-end-->
                </el-dialog>
            </div>
        </transition>
        <!--角色选择器--end-->        

        <div>
            <saver-footer @save="save" @cancel="cancel"></saver-footer>
        </div>
    </div> 
</template>

<script>
import SaverFooter from '@/base/Save-footer/Save-footer'
import CompanyRoleGroupSelectCmp from './company_roleGroupSelect-cmp'
import SystemRoleGroupSelectCmp from './system_roleGroupSelect-cmp'
import CompanyRoleSelectCmp from './company_roleSelect-cmp'
import SystemRoleSelectCmp from './system_roleSelect-cmp'
import { mapGetters } from 'vuex'
import { REQ_OK } from '@/api/config'
import {
    compRoleToGroup  // 保存
} from '@/api/systemManage'
export default {
    props: {
        propGroupObjArr:{
            type: Array,
            default: () => {
                return []
            }
        },        
        currentCode: {
            type: String,
            default: ''
        },
        roleShow: {
            type: Boolean,
            default: true
        },
        roleGroupShow: {
            type: Boolean,
            default: true
        }
    },
    components: {
        SaverFooter,
        CompanyRoleGroupSelectCmp,
        SystemRoleGroupSelectCmp,
        CompanyRoleSelectCmp,
        SystemRoleSelectCmp
    },
    data(){
        return {
            showRole: false,
            showRoleGroup: false,
            roleDataArr: [],  // 所选择的 角色 对象
            roleGroupDataArr: [],  // 选择的 角色组数组对象
            currentSelectRoleGroupCode: this.currentCode
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
        if(this.propGroupObjArr[0].RoleGroupCode){
            this.roleGroupDataArr = this.propGroupObjArr
        }else {
            this.roleDataArr = []
        }
    },
    beforeDestroy(){
        this.$bus.$off("")
        this.$bus.$off("")
    },
    methods: {
        //保存 角色组
        _compRoleToGroup(){
            debugger
            compRoleToGroup(this.currentSelectRoleGroupCode,JSON.stringify(this.roleDataArr)).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.$emit("emitAddToUserOrGroup", this.currentSelectRoleGroupCode)
                    this.$emit("closeDialog")
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存失败")
            })
        }, 
        // 删除角色组 
        handlerRoleGroupClose(obj){
            debugger
            // this.$refs['companyRoleGroupSelectCmp'].handlerDelete(obj)
            // this.roleGroupDataArr = []
            this.roleGroupDataArr = this.roleGroupDataArr.filter((item, key) => {
                return item.RoleGroupCode != obj.RoleGroupCode
            }) 
            // 触发 roleGroup 组件中 删除对饮的勾选项
            this.$refs.companyRoleGroupSelectCmp.emitSetCheckedRoleGroupNodes(this.roleGroupDataArr, obj)     
        },   
        // 删除角色
        handlerRoleClose(obj){
            debugger
            // this.$refs['companyRoleSelectCmp'].handlerDelete(obj)
            // this.roleDataArr = []
            this.roleDataArr = this.roleDataArr.filter((item, key) => {
                return item.RoleGroupCode != obj.RoleGroupCode
            })
            // 触发 roleSelect组件中 删除对应的勾选选项
            this.$refs.companyRoleSelectCmp.emitSetCheckedRoleNodes(this.roleDataArr)
        },   
        //添加角色
        handlerAddRole(){
            this.showRole = true
        },
        // 添加角色组
        handlerAddRoleGroup(){
            this.showRoleGroup = true
        },
        // 取消角色组弹框
        closeRoleGroupDialog(){
            this.showRoleGroup = false
            // this.$emit("closeDialog")
        },
        // 取消角色弹框
        closeRoleDialog(){
            this.showRole = false
        },
        // 保存 角色组
        saveSelectRoleGroupDialog(){
            this.closeRoleGroupDialog()
        },
        // 取消角色组
        cancelSelectRoleGroupDialog(){
            debugger
            if(this.isCompanyOrSystemUser){
                this.closeRoleGroupDialog()
            }else {
                this.closeRoleGroupDialog()
            }
        },
        save(){
            debugger
            if(!this.roleDataArr.length){
                this.$message.warning("请先选择角色")
                return
            }
            if(this.roleGroupDataArr.length<=0 ){
                // 用户组没有值 则不允许添加
                this.$message({
                    type: 'warnning',
                    message: '请选择一个角色组后添加'
                })
            }else {
                debugger
                if(this.roleGroupDataArr.length>1){
                    // 用户组选择的大于1个
                    this.$message({
                        type: 'warnning',
                        message: '一次仅可选择一个角色组'
                    })                         
                }else {
                    // 仅有一个用户组
                    if(this.roleGroupDataArr[0].RoleGroupCode){
                        this._compRoleToGroup()
                    }
                }
            }                                       
        },
        cancel(){
            this.$emit("closeDialog")
        },
        emitAddRole(data){
            debugger
            data.forEach((item, key) => {
                this.$set(item, "RoleId", item.RoleGroupCode)
            })
            this.roleDataArr = data
            this.closeRoleDialog()
        },
        emitAddRoleGroup(data){
            debugger
            if(data && data.length){
                this.currentSelectRoleGroupCode = data[0].RoleGroupCode
                data.forEach((item, key) => {
                    this.$set(item, "RoleId", item.RoleGroupCode)
                })            
                this.roleGroupDataArr = data
                this.closeRoleGroupDialog()
            }else {
                this.currentSelectRoleGroupCode = this.currentCode
            }
        },
        emitCancelRole(){
            this.closeRoleDialog()
        }

    }
}
</script>
