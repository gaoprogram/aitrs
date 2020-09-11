<!--
  User: gaol
  Date: 2019/8/9
  功能：基础设置- 显示组表配置 详情
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-card__body
    height 100%
    overflow auto
.singleGroupSetInfo
    height 100%
    .el-card 
        height 100%
        .el-form
            height 500px
            overflow auto
        
</style>
<template>
    <div class="singleGroupSetInfo">
        <!-- obj: {{obj}} -->
        <!-- formObj: {{formObj}} -->
        <el-card class="box-card">  
            <div 
                v-if="obj.TeamCode"
                slot="header" 
                class="clearfix center"
            > 
                <h3>{{obj.TeamName}}</h3>
            </div>                      
            <div v-if="obj.TeamCode">               
                <el-form 
                    ref="formInfo"
                    label-width="120px" 
                    :model="formObj" 
                    :rules="formRules"
                >
                    <el-form-item 
                        label="名称"
                        prop="TeamName"
                    >
                        <el-input 
                            style="width:300px"
                            v-model="formObj.TeamName"
                        >
                        </el-input>
                    </el-form-item>

                    <el-form-item 
                        label="简称"
                        prop="ShortName"
                    >
                        <el-input 
                            style="width:300px"
                            v-model="formObj.ShortName"
                        >
                        </el-input>                    
                    </el-form-item>

                    <el-form-item 
                        label="描述"
                        prop="Description"
                    >
                        <el-input 
                            type="textarea"
                            style="width:300px"
                            v-model="formObj.Description"
                        >
                        </el-input>  
                    </el-form-item> 

                    <el-form-item
                        label="是否多选"
                        prop="Multiple"
                    >
                        <el-switch
                            v-model="formObj.Multiple"
                            active-value="1"
                            inactive-value="0"
                        >
                        </el-switch>
                    </el-form-item>

                    <el-form-item
                        label="是否展开"
                        prop="Collapsed"
                    >
                        <el-switch
                            v-model="formObj.Collapsed"
                            active-value="1"
                            inactive-value="0"
                        >
                        </el-switch>
                    </el-form-item>   

                    <el-form-item
                        label="是否可排序"
                        prop="SortId"
                    >
                        <el-switch
                            v-model="formObj.SortId"
                            active-value="1"
                            inactive-value="0"
                        >
                        </el-switch>
                    </el-form-item>                              
                </el-form>

                <div class="footerBox">
                    <saver-footer
                        :cancelBtnIsShow="false" 
                        @save="saveForm" 
                        @cancel="cancelForm"
                    ></saver-footer>
                </div>             
            </div>
            <div 
                v-else             
                style="height: 100%"
                class="not_found"
            >
            </div>
        </el-card>       
    </div>
</template>
<script>
    import SaverFooter from '@/base/Save-footer/Save-footer'
    import { REQ_OK } from '@/api/config'
    import {
        saveListTreeData
    } from '@/api/employee'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            SaverFooter
        },
        data(){
            return {
                formObj: {

                },
                formRules: {
                    TeamName: [{required: true, message: '请输入名称', trigger: 'blur'}],
                    ShortName: [{required: true, message: '请输入简称', trigger: 'blur'}],
                    Description: [{required: true, message: '请输入描述', trigger: 'blur'}],
                }
            }
        },
        computed: {

        },
        watch: {
            'obj.TeamCode': {
                handler(newValue,oldValue){
                    this.formObj = JSON.parse(JSON.stringify(this.obj))    
                },
                immediate: true
            }
        },
        methods: {
            _saveListTreeData(data){
                saveListTreeData(JSON.stringify(data)).then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.$message.success(`${this.obj.TeamName}的相关信息保存成功`)
                        this.$bus.$emit("emitFieldSuccess")
                    }else {
                        this.$message.error(`${this.obj.TeamName}的相关信息保存失败,${res.data.Error}`)
                    }
                })
            },
            saveForm(){
                this.$refs.formInfo.validate(valid =>{
                    if(valid){
                        this._saveListTreeData(this.formObj)
                    }else {
                        
                    }
                })
            },
            cancelForm(){

            },
        }
    }
</script>