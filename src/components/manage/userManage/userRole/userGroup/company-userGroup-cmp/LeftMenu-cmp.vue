<!--
  User: gaol
  Date: 2019/11/15
  功能：平台系统设置——用户用户--用户组【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-submenu.is-opened
    .el-submenu__title
        border-radius 5px
        // background-color rgba(144,147,153,0.2)
>>>.el-submenu__icon-arrow
    display none
.leftMenu-cmp
    height 100%
    padding 0 20px
    box-sizing border-box
    .groupWrap
        height calc(100% - 100px) 
        min-height 200px
        overflow auto
</style>

<template>
    <div class="leftMenu-cmp animated fadeIn">
        <div class="searchBox u-f-ac">
            <el-input 
                placeholder="用户组" 
                clearable
                v-model="searchTit"
                @keyup.native="searchUserGroup">
            </el-input>
            <!-- <div class="searchBtn marginL10">
                <el-button type="primary" @click.native="searchUserGroup">搜索</el-button>
            </div> -->
        </div>

        <div class="addBox u-f u-f-jsb u-f-ac marginT10">
            <el-checkbox v-model="isStopUsing">停用</el-checkbox>
            <el-button 
                type="text" 
                size="mini"
                @click.native="addNewUserGroup"
            >新增用户组
            </el-button>
        </div>

        <div :class="['groupWrap','animated', 'fadeIn', userGroupData.length<=0? 'not_found': '']" v-loading="loading">
            <!-- defaultMenuKey: {{defaultMenuKey}}
            -- -->
            <!-- userGroupData： {{userGroupData}} -->
            <el-menu       
                :unique-opened="true"  
                @select="selectMenu"
                @open="openMenu"
                @close="closeMenu"
            >
                <el-submenu 
                    :style="item.UserGroupCode == defaultMenuKey? 'background-color: rgba(183,183,185,.3)':''"
                    v-for="(item, index) in userGroupData"
                    :key="index"
                    :index="'' + index"
                >
                    <div slot="title" class="titleBox u-f u-f-jsb">
                        <span class="tit" v-if="!item.isEditing">{{item.UserGroupName}}</span>
                        <span class="tit" v-if="item.isEditing">
                            <el-input 
                                ref="item.UserGroupCode"
                                v-model="item.EditName" 
                                placeholder="请输入修改的名称"
                            >{{item.EditName}}</el-input>
                        </span>

                        <div class="u-f-ac marginR20">
                             <!-- item: {{item}} -->
                            <span>
                                <el-button 
                                    v-show="!item.isEditing"
                                    style="width: 40px; height: 20px;padding: 0"
                                    type="primary" 
                                    size="mini" 
                                    class="edit" 
                                    @click.native.stop="handlerEdit(item)">
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
                                    style="width: 40px; height: 20px;padding: 0"
                                    size="mini" 
                                    v-if="item.State == 1"
                                    @click.native.stop="stopUsing(item,index, 0)"
                                >停用</el-button>
                                <el-button 
                                    type="warning" 
                                    size="mini" 
                                    style="width: 40px; height: 20px;padding: 0"
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
                        :index="''+ userItem.UserGroupCode"
                    >
                        <!-- <el-checkbox-group v-model="userCheckList">
                            <el-checkbox :label="userItem">{{userItem.UserGroupName}}</el-checkbox>
                        </el-checkbox-group> -->
                        {{userItem.UserGroupName}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>

        <!--新增/编辑 用户组-start-->
        <div class="newGroupBox animated fadeIn" v-if="showNewGroupDialog">
            <el-dialog
                :title="dialogTit"
                width="30%"
                :visible.sync="showNewGroupDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <!-- isEditingObj: {{isEditingObj}} -->
                <el-form 
                    ref="newGroupObjForm"
                    :model="newGroupObj" 
                    :rules="newGroupObjRules" 
                    label-width="120px">
                    <el-form-item 
                        prop="UserGroupName"
                        label="用户组名称"
                        class="item">
                        <el-input 
                            style="width: 200px"
                            placeholder="请填写用户组名称" 
                            v-model="newGroupObj.UserGroupName">
                        </el-input>
                    </el-form-item>
                    <el-form-item 
                        label="用户组编号" 
                        class="item">
                        <span>系统生成</span>
                    </el-form-item>    
                    <el-form-item 
                        prop="Description"
                        label="描述" 
                        class="item">
                        <el-input 
                            style="width: 200px"
                            type="textarea"
                            v-model="newGroupObj.Description" 
                            autosize
                            :rows="2"
                            placeholder="请输入描述">
                        </el-input>
                    </el-form-item>  
                    <el-form-item 
                        label="状态"
                        prop="State"
                        class="item">
                        <el-switch
                            v-model="newGroupObj.State"
                            active-value="1"
                            inactive-value="0">
                        </el-switch>
                    </el-form-item>                      
                </el-form>                           
                <save-footer @save="save" @cancel="cancel"></save-footer>
            </el-dialog>
        </div>        
        <!--新增/编辑 用户组-end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import  { REQ_OK } from '@/api/config'
  import { 
    getCompUserGroupTree,
    saveComUserGroup,
    SetComUserGroupState
  }from '@/api/systemManage'
  import { mapGetters } from 'vuex';
  export default {
    props:{

    },
    components: {
        SaveFooter
    },
    data(){
      let validName = (valid, rules, callback) => {
        if( !this.newGroupObj.UserGroupName ){
            callback(new Error("名称未填写"))
        }else {
            let res = this.userGroupData.find((item, index) => {
                if(item.Id != this.isEditingObj.Id){
                    return item.UserGroupName === this.newGroupObj.UserGroupName
                }
            })

            if(res){
                // this.$message.warning("名称重复,请重新修改")
                callback(new Error("名称重复,请重新修改"))
            }else {
                callback()
            }
        } 
      }
      return {
        loading: false, 
        searchTit: '',
        isStopUsing: false, 
        userGroupState: 1, // -1 全部 1 是启用 0 停用
        userGroupData: [], 
        showNewGroupDialog: false,
        isEditOrAddNewGroup: '', // 1 代表新增  2 代表 编辑
        isEditingObj: {},
        newGroupObj: {
            Id: 0,
            CompanyCode: '',
            UserGroupCode: '',
            UserGroupName: '',
            State: "1",
            Description: '',
            UpdateBy:'',
            Updated: new Date().toLocaleDateString(),
            ParentCode: '',
            Users: []
        },
        newGroupObjRules: {
            UserGroupName: [{required: true, validator: validName, trigger: 'blur'}],
            Description: [{required: true, message: "请输入描述", trigger: 'blur'}],
        },
        userCheckList: [],
        currentMenuObj: '',
        defaultMenuKey: ''
      }
    },
    watch: {
        isStopUsing: {
            handler(newValue, oldValue) {
                if(newValue){
                    // 勾选停用
                    this.userGroupState = 0
                    this._getCompUserGroupTree(this.userGroupState)
                }else {
                    // 取消勾选停用
                    this.userGroupState = 1
                    this._getCompUserGroupTree(this.userGroupState)
                }
            }
        },
        searchTit: {
            handler(newValue, oldValue){
                if(!newValue){
                    this._getCompUserGroupTree(this.userGroupState)
                }
            }
        },
        'currentMenuObj.UserGroupCode':{
            handler(newValue, oldValue){
                debugger
                this.defaultMenuKey = newValue
                this.$emit("treeNodeClick", this.currentMenuObj)                
                this.$bus.$emit("currentMenuObj", this.currentMenuObj)
            }
        }

    },
    created(){
        debugger
        this._getCompUserGroupTree(this.userGroupState)
        this.$bus.$on("resetTreeActive", (userGroupCode) => {
            this.userGroupData.forEach((item,key) => {
                if(item.UserGroupCode === userGroupCode){
                    this.defaultMenuKey = userGroupCode
                }
            })
        })
    },
    computed: {
        ...mapGetters(['isCompanyOrSystemUser'])
    },
    methods: {
        //获取 用户组数据
        _getCompUserGroupTree(state){
            debugger
            this.loading = true
            getCompUserGroupTree(this.searchTit, this.userGroupState).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    // 初始化数据
                    let resData = this.initData(res.data.Data)
                    this.userGroupData = resData
                }else {
                    this.$message({
                        type: 'error',
                        message: `获取用户组数据失败,${res.data.Error}`
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'warning',
                    message: '获取用户组数据失败'
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
                })
            }else {
                data = []
            }
            return data
        },
        selectMenu(index, indexPath){
            debugger
            this.defaultMenuKey = index
            let num = index * 1
            this.currentMenuObj = this.userGroupData[num]
            // this.$bus.$emit("currentMenuObj", this.currentMenuObj)
        },
        openMenu(index, indexPath){
            debugger
            this.defaultMenuKey = index            
            let num = index * 1
            this.currentMenuObj = this.userGroupData[num]
            // this.$bus.$emit("currentMenuObj", this.currentMenuObj)
        },
        closeMenu(index){
            debugger
            this.defaultMenuKey = index            
            let num = index * 1
            this.currentMenuObj = this.userGroupData[num]
            // this.$bus.$emit("currentMenuObj", this.currentMenuObj)
        },
        _handlerData(){
            debugger
            this.userGroupData = this.userGroupData.filter((item, key) => {
                return item.UserGroupName.indexOf(this.searchTit) != -1
            })
        },
        // 搜索用户组
        searchUserGroup(){
            if(!this.searchTit){
                // this.$message.warning("请先输入用户组名称")
                this._getCompUserGroupTree()
                return
            }
            this._handlerData()
        },

        // 添加新用户组
        addNewUserGroup(){
            this.isEditOrAddNewGroup = 1  
            this.dialogTit = '新增用户组'          
            this.newGroupObj = {
                Id: 0,
                CompanyCode: '',
                UserGroupCode: '',
                UserGroupName: '',
                State: "1",
                Description: '',
                UpdateBy:'',
                Updated: new Date().toLocaleDateString(),
                ParentCode: '',
                Users: []                
            }
            this.showNewGroupDialog = true
        },
        handlerFocus(obj){
            debugger
        },
        // 编辑 组名称
        handlerEdit(obj){
            debugger
            // obj.isEditing = true
            this.isEditingObj = obj
            this.isEditOrAddNewGroup = 2
            this.dialogTit = '编辑用户组' 
            this.newGroupObj = Object.assign(this.newGroupObj, obj)
            this.newGroupObj.State += ''
            this.showNewGroupDialog = true
        },
        // 


        // 确定修改 组名称
        handlerEditGroupName(obj, idx){
            debugger
            if(obj.EidtName){
                // 判断组名称不能重复
                let res = this.userGroupData.find((item, index) => {
                    return item.UserGroupName === obj.EidtName
                })

                if(res){
                    this.$message.warning("名称重复,请重新修改")
                    return
                }
                // 调取修改组名称的接口
                debugger
                this.newGroupObj = obj
                this.newGroupObj.UserGroupName = obj.UserGroupName
                this._saveComUserGroup()
            }else {
                this.$message.warning("名称不能为空")
            }
        },
        _SetComUserGroupState(Id,type){
            let text = type === 1 ? '启用': '停用'
            SetComUserGroupState(Id, type).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success(`${text}成功`)
                    this._getCompUserGroupTree()
                }else {
                    this.$message.error(`${text}失败,${res.data.Error}`)
                }
            })
        },
        //启用
        startUsing(obj, idx, type){
            this.$confirm(`确定启用[${obj.UserGroupName}]吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // 调用启用的接口
                this._SetComUserGroupState(obj.Id, type)
            }).catch(() => {
                this.$message.info("启用已取消")
            })
        },
        // 停用
        stopUsing(obj, idx, type){
            this.$confirm(`确定停用[${obj.UserGroupName}]吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // 调用停用的接口
                this._SetComUserGroupState(obj.Id, type)
            }).catch(() => {
                this.$message.info("停用已取消")
            })
        },

        // 新增用户组
        _saveComUserGroup(){
            debugger

            // this.newGroupObj.Deleted = 0
            // this.newGroupObj.Created = `/Date(${new Date().getTime()})/`
            // this.newGroupObj.Updated = `/Date(${new Date().getTime()})/`

            saveComUserGroup(JSON.stringify(this.newGroupObj)).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.showNewGroupDialog = false
                    this._getCompUserGroupTree()
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存失败")
            })
        },
        // 新增用户组保存
        save(){
            // if( !this.newGroupObj.UserGroupName ){
            //     this.$message.warning("名称为空,请重新填写")
            //     return
            // }

            // if( !this.newGroupObj.Description ){
            //     this.$message.warning("描述为空,请重新填写")
            //     return
            // }

            this.$refs.newGroupObjForm.validate(valid => {
                if(valid){
                    // 调取新增用户组的 接口
                    if(this.newGroupObj.State =='0'){
                        this.newGroupObj.State = 0
                    }else if(this.newGroupObj.State == '1'){
                        this.newGroupObj.State = 1
                    }

                    if(this.isEditOrAddNewGroup == 1){
                        // 新增保存
                        this.newGroupObj.Id = 0

                        this._saveComUserGroup()
                    }else if(this.isEditOrAddNewGroup == 2){
                        // 编辑保存
                        this._saveComUserGroup()
                    }
                }else {

                }
            })            
        },
        // 取消新增用户组
        cancel(){
            this.showNewGroupDialog = false
        }
    }
}
</script>


