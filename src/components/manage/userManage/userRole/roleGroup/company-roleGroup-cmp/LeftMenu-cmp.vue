<!--
  User: gaol
  Date: 2019/11/15
  功能：平台系统设置——用户角色--角色组【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-submenu.is-opened
    .el-submenu__title
        // background-color rgba(144,147,153,0.2)
.leftMenu-cmp
    height 100%
    padding 0 20px
    box-sizing border-box
    .groupWrap
        min-height 200px
        height calc(100% - 100px)
        overflow auto

</style>

<template>
    <div class="leftMenu-cmp animated fadeIn">
        <div class="searchBox u-f-ac">
            <el-input 
                placeholder="角色组" 
                clearable
                v-model="searchTit"
                @keyup.native="searchUserGroup">
            </el-input>
            <!-- <div class="searchBtn marginL10">
                <el-button type="primary" @click="searchUserGroup">搜索</el-button>
            </div> -->
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
            <el-menu       
                :unique-opened="true"              
                @select="selectMenu"
                @open="openMenu"
                @close="closeMenu"
            >
                <el-submenu 
                    :style="item.RoleGroupCode == defaultMenuKey? 'background-color: rgba(183,183,185,.3)':''"                
                    v-for="(item, index) in roleGroupData"
                    :key="index"
                    :index="'' + index"
                >
                    <div slot="title" class="titleBox u-f u-f-jsb">
                        <span class="tit" v-if="!item.isEditing">{{item.RoleGroupName}}</span>
                        <span class="tit" v-if="item.isEditing">
                            <el-input 
                                ref="item.RoleGroupCode"
                                v-model="item.EditName" 
                                placeholder="请输入修改的名称"
                            >{{item.EditName}}</el-input>
                        </span>

                        <div class="u-f-ac marginR20">
                            <span>
                                <el-button 
                                    v-show="!item.isEditing"
                                    style="width: 40px;height:20px;padding: 0"                                    
                                    type="primary" 
                                    size="mini" 
                                    class="edit" 
                                    @click.native.stop="handlerClickEditBtn(item)">
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
                                    style="width: 40px;height:20px;padding: 0"
                                    type="danger" 
                                    size="mini" 
                                    v-if="item.State == 1"
                                    @click.native.stop="stopUsing(item,index, 0)"
                                >停用</el-button>
                                <el-button 
                                    style="width: 40px;height:20px;padding: 0"                                
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
                        v-if="item.Children.length"
                        v-for="(roleItem, key) in item.Children"
                        :key="key"
                        :index="''+ roleItem.RoleGroupCode"
                    >
                        <!-- <el-checkbox-group v-model="userCheckList">
                            <el-checkbox :label="roleItem">{{userItem.RoleGroupName}}</el-checkbox>
                        </el-checkbox-group> -->
                        {{roleItem.RoleGroupName}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>

        <!---新增/编辑 组名称弹框--start-->
        <div class="newGroupBox animated fadeIn" v-if="showNewGroupDialog">
            <el-dialog
                :title="editOrAddTit"
                width="30%"
                :visible.sync="showNewGroupDialog"
                append-to-body
                :close-on-click-modal="false"
            >
                <el-form ref="formGroup" :model="newGroupObj" :rules="newGroupObjRules" label-width="90px">
                    <el-form-item label="角色组名" prop="RoleGroupName">
                        <el-input 
                            placeholder="请填写角色组名称" 
                            v-model="newGroupObj.RoleGroupName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="角色组编号">
                        <el-button  
                           type="text">
                           系统生成
                        </el-button>
                    </el-form-item>
                    <el-form-item label="描述" prop="Description">
                        <el-input 
                            type="textarea"
                            v-model="newGroupObj.Description" 
                            autosize
                            :rows="2"
                            placeholder="请输入描述">
                        </el-input>
                    </el-form-item>       
                    <el-form-item label="状态" prop="State">
                        <el-switch
                            v-model="newGroupObj.State"
                            active-value="1"
                            inactive-value="0">
                        </el-switch>
                    </el-form-item>                                     

                    <!-- <div class="item u-f-ac marginB20">
                        <span class="tit u-f0 marginR10" 
                            style="width:100px;font-weight:bold;text-align:right">角色组名:</span>
                        <el-input 
                            placeholder="请填写角色组名称" 
                            v-model="newGroupObj.RoleGroupName">
                        </el-input>
                    </div> -->
                    <!-- <div class="item u-f-ac marginB20">
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
                    </div>      -->

                    <!-- newGroupObj： {{newGroupObj}} -->
                    <!-- <div class="item u-f-ac marginB10">
                        <span class="tit u-f0 marginR10" 
                        style="width:100px;font-weight:bold;text-align:right">状态:</span>
                        <el-switch
                            v-model="newGroupObj.State"
                            active-value="1"
                            inactive-value="0">
                        </el-switch>
                    </div>                  -->
                </el-form>          

                <save-footer @save="save" @cancel="cancel"></save-footer>
            </el-dialog>
        </div>
        <!---新增/编辑 组名称弹框-end-->
    </div>
</template>

<script type="text/ecmascript-6">
  import SaveFooter from '@/base/Save-footer/Save-footer'
  import  { REQ_OK } from '@/api/config'
  import { 
    getCompRoleGroupTree,
    saveComRoleGroup,
    setComRoleGroupState
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
        if( !this.newGroupObj.RoleGroupName ){
            callback(new Error("名称未填写"))
        }else {
            let res = this.roleGroupData.find((item, index) => {
                if(item.Id != this.isEditingObj.Id){
                    return item.RoleGroupName === this.newGroupObj.RoleGroupName
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
        roleGroupData: [], 
        roleGroupState: 1, // -1 全部 1 启用 0 停用
        showNewGroupDialog: false, // 新增/编辑 组名称的弹框
        isEditOrAddGroup: '',  // 1 是 编辑 2 是新增
        isEditingObj: {},
        newGroupObj: {
            Id: 0,
            CompanyCode: '',
            RoleGroupCode: '',
            RoleGroupName: '',
            State: "1",
            Description: '',
            ParentCode: '',
            Children: []
        },
        newGroupObjRules: {
            RoleGroupName: [{required: true,validator: validName, trigger: 'blur'}],
            Description: [{required: true,message: '请填写描述内容', trigger: 'blur'}]
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
                    //勾选了之后 状态 传 0  -1 代表全部， 1代表启用 0 代表停用
                    this.roleGroupState = 0
                    this._getCompRoleGroupTree( 0, this.searchTit)
                }else {
                    this.roleGroupState = 1
                    this._getCompRoleGroupTree(1, this.searchTit)
                }
            }
        },
        searchTit: {
            handler(newValue, oldValue){
                if(!newValue){
                    this._getCompRoleGroupTree(this.roleGroupState, this.searchTit)
                }
            }
        },
        'currentMenuObj.RoleGroupCode':{
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
        this._getCompRoleGroupTree(1, this.searchTit)
        this.$bus.$on("resetTreeActive", (roleGroupCode) => {
            this.roleGroupData.forEach((item,key) => {
                if(item.RoleGroupCode === roleGroupCode){
                    this.defaultMenuKey = roleGroupCode
                }
            })
        })        
    },
    computed: {
        ...mapGetters(['isCompanyOrSystemUser'])
    },
    methods: {
        //获取 角色组数据
        _getCompRoleGroupTree(State){
            debugger
            this.loading = true
            getCompRoleGroupTree(this.roleGroupState, this.searchTit).then(res => {
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
            this.currentMenuObj = this.roleGroupData[num]
            // this.$bus.$emit("currentMenuCode", this.currentMenuCode)
        },
        openMenu(index, indexPath){
            debugger
            this.defaultMenuKey = index
            let num = index * 1
            this.currentMenuObj = this.roleGroupData[num]
            // this.$bus.$emit("currentMenuCode", this.currentMenuCode)
        },
        closeMenu(index){
            debugger
            this.defaultMenuKey = index
            let num = index * 1
            this.currentMenuObj = this.roleGroupData[num]
            // this.$bus.$emit("currentMenuCode", this.currentMenuCode)
        },
        _handlerData(){
            debugger
            this.roleGroupData = this.roleGroupData.filter((item, key) => {
                return item.RoleGroupName.indexOf(this.searchTit) != -1
            })
        },
        // 搜索角色组
        searchUserGroup(){
            if(!this.searchTit){
                // this.$message.warning("请先输入角色组名称")
                this._getCompRoleGroupTree(this.roleGroupState)
                return
            }
            this._handlerData()
        },

        // 添加新角色组
        addNewUserGroup(){
            this.isEditOrAddGroup = 2
            this.editOrAddTit = `新增角色组`
            this.showNewGroupDialog = true  
            Object.assign(this.newGroupObj, {
                Id: 0,
                CompanyCode: '',
                RoleGroupCode: '',
                RoleGroupName: '',
                State: "1",
                Description: '',
                ParentCode: '',
                Children: []                
            })                      
        },
        handlerFocus(obj){
            debugger
        },     
        //点击 编辑 组名称 btn
        handlerClickEditBtn(obj){
            debugger
            // obj.isEditing = true
            this.isEditOrAddGroup = 1
            this.isEditingObj = obj
            this.editOrAddTit = `编辑"${obj.RoleGroupName}"`
            this.newGroupObj = JSON.parse(JSON.stringify(obj))
            if(this.newGroupObj.State == 1){
                this.newGroupObj.State = "1"
            }else {
                this.newGroupObj.State = "0"
            }
            this.showNewGroupDialog = true
        },

        // 确定修改 组名称
        handlerEditGroupName(obj, idx){
            debugger
            if(obj.EditName){
                // 判断组名称不能重复
                let res = this.roleGroupData.find((item, index) => {
                    return item.RoleGroupName === obj.EditName
                })

                if(res){
                    this.$message.warning("名称重复,请重新修改")
                    return
                }

                // 调取修改组名称的接口
                debugger
                obj.RoleGroupName = obj.EditName
                this.newGroupObj = obj
                this._saveComRoleGroup(1)
            }else {
                this.$message.warning("名称不能为空")
            }
        },
        _setComRoleGroupState(Id,type){
            let text = type == 1 ? '启用': '停用'
            setComRoleGroupState(Id, type).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.$message.success(`${text}成功`)
                    if(type == 1) {
                        this._getCompRoleGroupTree(1)
                    }else {
                        this._getCompRoleGroupTree(0)
                    }
                }else {
                    this.$message.error(`${text}失败,${res.data.Error}`)
                }
            })
        },
        //启用
        startUsing(obj, idx, type){
            this.$confirm(`确定启用[${obj.RoleGroupName}]吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // 调用启用的接口
                this._setComRoleGroupState(obj.Id, type)
            }).catch(() => {
                this.$message.info("启用已取消")
            })
        },
        // 停用
        stopUsing(obj, idx, type){
            this.$confirm(`确定停用[${obj.RoleGroupName}]吗?`,"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // 调用停用的接口
                this._setComRoleGroupState(obj.Id, type)
            }).catch(() => {
                this.$message.info("停用已取消")
            })
        },

        // 新增角色组
        _saveComRoleGroup(type){
            debugger
            
            // this.newGroupObj.Deleted = 0
            // this.newGroupObj.Created = `/Date(${new Date().getTime()})/`
            // this.newGroupObj.Updated = `/Date(${new Date().getTime()})/`
            saveComRoleGroup(JSON.stringify(this.newGroupObj)).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.showNewGroupDialog = false
                    if(type == 1){
                        // 编辑
                    }else if(type == 2){
                        // 新增
                        Object.assign(this.newGroupObj, {
                            Id: 0,
                            CompanyCode: '',
                            RoleGroupCode: '',
                            RoleGroupName: '',
                            State: "1",
                            Description: '',
                            ParentCode: '',
                            Children: []                        
                        })
                    }
                    this._getCompRoleGroupTree(this.roleGroupState)
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            }).catch(() => {
                this.$message.warning("保存失败")
            })
        },
        // 新增/编辑 角色组保存
        save(){
            // if( !this.newGroupObj.RoleGroupName ){
            //     this.$message.warning("名称为空,请重新填写")
            //     return
            // }

            // if( !this.newGroupObj.Description ){
            //     this.$message.warning("描述为空,请重新填写")
            //     return
            // }

            this.$refs.formGroup.validate(valid => {
                if(valid){
                // 调取新增角色组的 接口
                    if(this.newGroupObj.State =='0'){
                        this.newGroupObj.State = 0
                    }else if(this.newGroupObj.State == '1'){
                        this.newGroupObj.State = 1
                    }

                    if(this.isEditOrAddGroup == 1){
                        // 编辑
                        this._saveComRoleGroup(1)
                    }else if(this.isEditOrAddGroup == 2){
                        // 新增
                        this.newGroupObj.Id = 0
                        this._saveComRoleGroup(2)
                    }
                }else {

                }
            }) 
        },
        // 取消新增角色组
        cancel(){
            this.showNewGroupDialog = false
        }
    }
}
</script>


