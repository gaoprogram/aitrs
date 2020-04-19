<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  查看权限 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="addPermitCmp">
        <!-- obj: {{obj}} -->
        <div class="btnBox">
            <!-- <el-button type="primary" size="mini">
                基本信息
            </el-button>
            <el-button type="primary" size="mini" style="marginL10">
                配置
            </el-button> -->

            <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
                <el-tab-pane label="基本信息" name="first"></el-tab-pane>
                <el-tab-pane label="配置" name="second"></el-tab-pane>
            </el-tabs>               
        </div>

        <!-- permitForm: {{permitForm}} -->
        <div class="content marginT10" v-show="activeTabName === 'first'">
            <el-form 
                ref="addPermitForm" 
                :model="permitForm" 
                :rules="permitFormRules"
                label-width="120px"> 
                <el-form-item
                    label="许可权限列表名"
                    prop="PermissionPackageName"
                >
                    <el-input 
                        style="width: 300px"
                        v-model="permitForm.PermissionPackageName"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="编号"
                    prop="PermissionPackageCode"
                >
                    <el-button
                        type="text"
                    >{{permitForm.PermissionPackageCode}}</el-button>
                    <span ></span>
                </el-form-item>    

                <el-form-item
                    label="状态"
                    prop="State"
                >
                    <el-switch
                        v-model="permitForm.State"
                        active-value="1"
                        inactive-value="0"
                    >
                    
                    </el-switch>
                </el-form-item>    

                <el-form-item
                    label="描述"
                    prop="Description"
                >
                    <el-input
                        style="width: 300px"
                        type="textarea"
                        v-model="permitForm.Description"
                    >
                    </el-input>
                </el-form-item>                          
            </el-form>

            <div class="footerBox">
                <save-footer @save="save" @cancel="cancel"></save-footer>
            </div>            
        </div>

        <!---配置--->
        <div class="content" v-show="activeTabName === 'second'">
            <permit-set-cmp :obj="obj"></permit-set-cmp>
        </div>
        <!---配置--->

    </div>
</template>

<script type="text/ecmascript-6">
    import { mapGetters } from 'vuex'
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import PermitSetCmp from './permitSet-cmp'
    import { 
        SaveComPermitPSet
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
        },
        components: {
            SaveFooter,
            PermitSetCmp
        },
        data(){
            return {
                loading: false, 
                activeTabName: 'first',
                currentTabIndex: 0,
                permitForm: {
                    "RoleNames": this.obj.RoleNames,
                    "CompanyCode": this.companyCode,
                    "Id": this.obj.Id,
                    "PermissionPackageCode": this.obj.PermissionPackageCode,
                    "PermissionPackageName":'',
                    "Description": this.obj.Description,
                    "State":1                    
                },
                permitFormRules: {
                    PermissionPackageName: [{required: true, message: '请输入权限名称',trigger: ['blur','change']}],
                    Description: [{required: true, message: '请输入描述',trigger: ['blur','change']}],
                }
            }
        },
        created(){
        },
        computed: {
            ...mapGetters([
                'companyCode'
            ])
        },
        watch: {

        },
        methods: {
            _getComTables(){

            },
            // 添加保存许可权
            _SaveComPermitPSet(){
                debugger
                this.loading = true
                SaveComPermitPSet(JSON.stringify(this.permitForm)).then(res => {
                    this.loading = false
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("许可权保存成功")
                        this.$emit("closeScanDialog")
                        this.$emit("editPermitSuccess")
                    }else {
                        this.$message.error(`许可权保存失败,${res.data.Error}`)
                    }
                })
            },
            // 保存
            save(){
                this.$refs.addPermitForm.validate(valid => {
                    if(valid){
                        this._SaveComPermitPSet()
                    }else {

                    }
                })
            },
            // 取消
            cancel(){
                this.$emit("closeScanDialog")
            },
            // 切换tab
            handleTabClick(tab,event){
                debugger
                this.currentTabIndex = tab.index*1
                this.activeTabName = tab.name
            }            
        }
    }
</script>

