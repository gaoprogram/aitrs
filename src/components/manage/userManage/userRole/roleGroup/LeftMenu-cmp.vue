<!--
  User: gaol
  Date: 2019/11/15
  功能：平台系统设置——用户角色--角色组树形组件[系统]
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.leftMenu-cmp
    padding 0 20px
    box-sizing border-box
    .groupWrap
        min-height 200px

</style>

<template>
    <div class="leftMenu-cmp animated fadeIn">
        <div class="searchBox u-f-ac">
            <el-input 
                placeholder="角色组" 
                clearable
                v-model="searchTit">
            </el-input>
            <div class="searchBtn marginL10">
                <el-button 
                    type="primary" 
                    size="mini" 
                    @click="searchUserGroup"
                >搜索</el-button>
            </div>
        </div>

        <div class="addBox u-f u-f-jsb u-f-ac marginT10">
            <el-checkbox v-model="isStopUsing">停用</el-checkbox>
            <el-button 
                type="text" 
                size="mini"
                @click.native="addNewUserGroup"
            >新增角色组
            </el-button>
        </div>

        <div :class="['groupWrap','animated', 'fadeIn', roleGroupData.length<=0? 'not_found': '']" v-loading="loading">
            <!-- roleGroupData： {{roleGroupData}} -->
            <el-menu>
                <el-submenu 
                    v-for="(item, index) in roleGroupData"
                    :key="index"
                    :index="'' + item.Id"
                >
                    <div slot="title" class="titleBox u-f u-f-jsb">
                        <span class="tit" v-if="!item.isEditing">{{item.UserGroupName}}</span>
                        <span class="tit" v-if="item.isEditing">
                            <el-input v-model="item.EditName" placeholder="请输入修改的名称">{{item.EditName}}</el-input>
                        </span>

                        <div class="u-f-ac marginR20">
                            <span>
                                <el-button 
                                    v-show="!item.isEditing"
                                    type="primary" 
                                    size="mini" 
                                    class="edit" 
                                    @click.native.stop="handlerClickEditBtn(item, index)">
                                    编辑
                                </el-button>

                                <el-button 
                                    v-show="item.isEditing"
                                    type="text" 
                                    size="mini" 
                                    class="edit" 
                                    @click.native.stop="handlerEditGroupName(item, index)">
                                    确定
                                </el-button>
                                <el-button 
                                    v-show="item.isEditing"
                                    type="text" 
                                    size="mini" 
                                    class="edit" 
                                    @click.native.stop="item.isEditing=false">
                                    取消
                                </el-button>                                                        
                            </span>

                            <span class="marginL5">
                                <el-button 
                                    type="danger" 
                                    size="mini" 
                                    v-if="item.State == 1"
                                    @click.native.stop="stopUsing(item,index, 0)"
                                >停用</el-button>
                                <el-button 
                                    type="warning" 
                                    size="mini" 
                                    v-if="item.State == 0"
                                    @click.native.stop="startUsing(item,index, 1)"
                                >启用</el-button>
                            </span>
                        </div>                        
                    </div>


                    <!-- userCheckList: {{userCheckList}} -->
                    <el-menu-item 
                        v-if="item.Users.length"
                        v-for="(userItem, key) in item.Users"
                        :key="key"
                        :index="''+ userItem.UserId"
                    >
                        <el-checkbox-group v-model="userCheckList">
                            <el-checkbox :label="userItem">{{userItem.AccountName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>

        <!--新增角色组弹框-start-->
        <div class="newGroupBox animated fadeIn" v-if="showNewGroupDialog">
            <el-dialog
                title="新增角色组"
                width="30%"
                :visible.sync="showNewGroupDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <div class="item u-f-ac marginB20">
                    <span class="tit u-f0 marginR10" 
                        style="width:100px;font-weight:bold;text-align:right">角色组名:</span>
                    <el-input 
                        placeholder="请填写角色组名称" 
                        v-model="newGroupObj.UserGroupName">
                    </el-input>
                </div>
                <div class="item u-f-ac marginB20">
                    <span class="tit u-f0 marginR10" 
                        style="width:100px;font-weight:bold;text-align:right">角色组编号:</span>
                    <span>系统生成</span>
                </div>

                <div class="item u-f-ac marginB20">
                    <span class="tit u-f0 marginR10" 
                        style="width:100px;font-weight:bold;text-align:right">描述:</span>
                    <el-input 
                        type="textarea"
                        v-model="newGroupObj.Description" 
                        autosize
                        :rows="2"
                        placeholder="请输入描述">
                    </el-input>
                </div>     

                <div class="item u-f-ac marginB10">
                    <span class="tit u-f0 marginR10" 
                    style="width:100px;font-weight:bold;text-align:right">状态:</span>
                    <el-switch
                        v-model="newGroupObj.State"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </div>                           

                <save-footer @save="save" @cancel="cancel"></save-footer>
            </el-dialog>
        </div>
        <!--新增角色组弹框-end-->        
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import  { REQ_OK } from '@/api/config'
  import { 
    getSysRoleGroupTree,
    saveSysRoleGroup,
    setSysRoleGroupState
  }from '@/api/systemManage'
  export default {
    props:{

    },
    components: {
        SaveFooter
    },
    data(){
      return {
        loading: false, 
        searchTit: '',
        isStopUsing: false, 
        roleGroupData: [], 
        showNewGroupDialog: false,
        newGroupObj: {
            Id: '',
            UserGroupCode: '',
            UserGroupName: '',
            State: '',
            Description: '',
            Deleted: '',
            Created:'',
            UpdateBy: '',
            Updated: ''
        },
        userCheckList: [],
        state: 1,
      }
    },
    watch: {
        isStopUsing: {
            handler(newValue, oldValue) {
                debugger
                if(newValue){
                    this.state = 0
                    this._getSysRoleGroupTree(0)
                }else {
                    this.state = 1
                    this._getSysRoleGroupTree(1)
                }
            }
        },
        searchTit: {
            handler(newValue, oldValue){
                if(!newValue){
                    this._getSysRoleGroupTree(this.state)
                }
            }
        }

    },
    created(){
        // this._getSysRoleGroupTree(1)
    },
    methods: {
        //获取 角色组数据
        _getSysRoleGroupTree(State){
            this.loading = true
            getSysRoleGroupTree(State, this.searchTit).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    // 初始化数据
                    let resData = this.initData(res.data.Data)
                    this.roleGroupData = resData
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取角色组数据失败,${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '获取角色组数据失败'
                })
            })
        },
        //初始化数据
        initData(data){
            debugger
            if(data && data.length){
                data.forEach((item, key) => {
                    this.$set(item, "isEditing", false)
                    this.$set(item, "EditName", '')
                    item.Users = [
                        {AccountName:"张三",UserId:1},
                        {AccountName:"李四",UserId:2},
                        {AccountName:"王五",UserId:3},
                        {AccountName:"小明",UserId:4}
                    ]
                })
            }else {
                data = []
            }
            return data
        },
        _handlerData(){
            debugger
            this.roleGroupData = this.roleGroupData.filter((item, key) => {
                return item.UserGroupName.indexOf(this.searchTit) != -1
            })
        },
        // 搜索角色组
        searchUserGroup(){
            if(!this.searchTit){
                // this.$message.warning("请先输入角色组名称")
                this._getSysRoleGroupTree(this.state)
                return
            }
            this._handlerData()
        },

        // 添加新角色组
        addNewUserGroup(){
            this.showNewGroupDialog = true
        },
        // 点击 编辑 组名称 btn
        handlerClickEditBtn(obj, idx){
            debugger
            // obj.isEditing= true

            this.showNewGroupDialog = true

        },
        // 确定修改 组名称
        handlerEditGroupName(obj, idx){
            debugger
            if(obj.EditName){
                // 判断组名称不能重复
                let res = this.roleGroupData.find((item, index) => {
                    return item.UserGroupName === obj.EditName
                })

                if(res){
                    this.$message.warning("名称重复,请重新修改")
                    return
                }
                // 调取修改组名称的接口
                
            }else {
                this.$message.warning("名称不能为空")
            }
        },
        _setSysRoleGroupState(Id,type){
            let text = type === 1 ? '启用': '停用'
            setSysRoleGroupState(Id, type).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success(`${text}成功`)
                    this._getSysRoleGroupTree(this.state)
                }else {
                    this.$message.error(`${text}失败,${res.data.Error}`)
                }
            })
        },
        //启用
        startUsing(obj, idx, type){
            debugger
            this.$confirm(`确定启用[${obj.UserGroupName}]吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // 调用启用的接口
                this._setSysRoleGroupState(obj.Id, type)
            }).catch(() => {
                this.$message.info("启用已取消")
            })
        },
        // 停用
        stopUsing(obj, idx, type){
            debugger
            this.$confirm(`确定停用[${obj.UserGroupName}]吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // 调用停用的接口
                this._setSysRoleGroupState(obj.Id, type)
            }).catch(() => {
                this.$message.info("停用已取消")
            })
        },
        _saveSysRoleGroup(){
            saveSysRoleGroup(JSON.stringify(this.newGroupObj)).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.showNewGroupDialog = false
                    this._getSysRoleGroupTree(this.state)
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存失败")
            })
        },
        // 新增角色组保存
        save(){
            if( !this.newGroupObj.UserGroupName ){
                this.$message.warning("名称为空,请重新填写")
                return
            }

            if( !this.newGroupObj.Description ){
                this.$message.warning("描述为空,请重新填写")
                return
            }

            let res = this.roleGroupData.find((item, index) => {
                return item.UserGroupName === this.newGroupObj.UserGroupName
            })

            if(res){
                this.$message.warning("名称重复,请重新修改")
                return
            }  
            
            // 调取新增角色组的 接口
            this._saveSysRoleGroup()
        },
        // 取消新增角色组
        cancel(){
            this.showNewGroupDialog = false
        }
    }
}
</script>


