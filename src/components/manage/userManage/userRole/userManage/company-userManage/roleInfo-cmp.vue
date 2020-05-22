<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  角色信息 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-form
    max-height 400px
    overflow auto
</style>

<template>
    <div class="roleInfoCmp animated fadeIn">
        <!-- obj: {{obj}}
        ----
        roleInfoForm: {{roleInfoForm}} -->
        <el-form ref="roleForm" label-width="120px" :model="roleInfoForm" :rules="roleInfoRules">
            <el-form-item label="角色名" prop="RoleName">
                <el-input 
                    v-model="roleInfoForm.RoleName"
                    style="width:300px"
                    placeholder="请填写角色名"
                    >
                </el-input>
            </el-form-item>
            <el-form-item label="角色编号">
                <el-button type="text">系统生成</el-button>
            </el-form-item>
            <el-form-item label="状态" prop="State">
                <el-switch 
                    v-model="roleInfoForm.State"
                    active-value="1" 
                    inactive-value="0">
                </el-switch> 
            </el-form-item>
            <el-form-item label="角色类型" prop="RoleType">
                <el-select v-model="roleInfoForm.RoleType">
                    <el-option value="1" label="系统角色"></el-option>
                    <el-option value="2" label="企业自定义角色"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="角色级别" prop="RoleLevel">
                <el-select v-model="roleInfoForm.RoleLevel">
                    <el-option value="1" label="总部"></el-option>
                    <el-option value="2" label="分部"></el-option>
                    <el-option value="3" label="部门"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="最大授权人数" prop="MaxAuthNum">
                <el-input
                    type="number"
                    v-model="roleInfoForm.MaxAuthNum"
                    placeholder="请填写最大授权人数"
                    style="width: 300px"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="版本控制" prop="VersionRange">
                <el-select v-model="roleInfoForm.VersionRange">                  
                    <el-option
                        value="1"
                        label="初级版"
                    ></el-option>
                    <el-option
                        value="2"
                        label="中级版"
                    ></el-option>
                    <el-option
                        value="3"
                        label="高级版"
                    ></el-option>
                    <el-option
                        value="4"
                        label="白金版"
                    ></el-option>                                                            
                </el-select>
            </el-form-item>     

            <el-form-item label="说明" prop="Description">
                <el-input 
                    v-model="roleInfoForm.Description"
                    style="width: 300px"
                    type="textarea" 
                    autosize>
                </el-input>
            </el-form-item>       
        </el-form>

        <div class="footer">
            <save-footer @save="save" @cancel="cancel"></save-footer>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { REQ_OK } from '@/api/config'
    import { 
        saveComRole,
        getComRole 
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
            SaveFooter
        },
        data(){
            return {
                loading: false, 
                roleInfoForm: {
                    UserName:this.obj.UserName,
                    Id:this.obj.Id,
                    CompanyCode:this.obj.CompanyCode,
                    RoleId:this.obj.RoleId,
                    RoleName:this.obj.RoleName,
                    RoleType:'' + this.obj.RoleType,
                    RoleLevel:'' + this.obj.RoleLevel,
                    MaxAuthNum: '' + this.obj.MaxAuthNum,
                    Description:this.obj.Description,
                    State: '' + this.obj.State,
                    VersionRange: this.obj.VersionRange ? (this.obj.VersionRange + '') : '1'
                },
                roleInfoRules: {
                    RoleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
                    RoleType: [{required: true, message: '请选择角色类型', trigger: ['blur','change']}],
                    RoleLevel: [{required: true, message: '请选择角色级别', trigger: 'blur'}],
                    MaxAuthNum: [{required: true, message: '请输入最大授权人数', trigger: 'blur'}],
                    VersionRange: [{required: true, message: '请选择版本', trigger: 'blur'}],
                    Description: [{required: true, message: '请输入备注', trigger: 'blur'}],
                }
            }
        },
        created(){
            // this._getComRole()
        },
        computed: {

        },
        methods: {
            _getComRole(){
                this.loading = true
                getComRole(this.obj.Id, this.obj.RoleType).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.roleInfoForm = res.data.Data
                    }else {
                        this.$message.error(`获取角色信息失败,${res.data.Error}`)
                    }
                })
            },
            _saveComRole(){
                debugger
                this.loading = true
                saveComRole(JSON.stringify(this.roleInfoForm)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("保存成功")
                        this.$emit("roleInfoSaveSuccess")
                    }else {
                        this.$message.error(`保存失败,${res.data.Error}`)
                    }
                })
            },
            save(){
                this.$refs.roleForm.validate(valid => {
                    if(valid){
                        this._saveComRole()
                    }else {

                    }
                })
            },
            cancel(){
                this.$bus.$emit("closeDialog")
            }
        }
    }
</script>

