<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——许可权-许可权  编辑 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.scanCmp
    padding  20px
</style>

<template>
    <div class="scanCmp">
        <div class="btnBox">
            <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
                <el-tab-pane label="基本信息" name="first"></el-tab-pane>
                <el-tab-pane label="配置" name="second"></el-tab-pane>
            </el-tabs>   
        </div>

        <!-- permitForm: {{permitForm}}
        ----
        obj: {{obj}} -->
        <!--基本信息---->
        <div class="content marginT10" v-if="activeTabName === 'first'">
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
                    >系统自动生成</el-button>
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


        <!--配置-->
        <div class="content marginT10" v-if="activeTabName === 'second'">
            <permit-set-cmp ref="setCmp" :obj="obj"></permit-set-cmp>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import { mapGetters } from 'vuex'
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import permitSetCmp from './permitSet-cmp'
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
            permitSetCmp,
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
                    "PermissionPackageCode":'',
                    "PermissionPackageName":'',
                    "Description": this.obj.Description,
                    "State": "" + this.obj.State              
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
                        this.$message.success("保存成功")
                        this.$emit("editPermitSuccess")
                    }else {
                        this.$message.error(`保存失败,${res.data.Error}`)
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

