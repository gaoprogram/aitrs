<!--
  User: gaol
  Date: 2019/11/14
  功能：平台系统设置——用户管理-公司信息 
-->
<style lang="stylus" ref="stylesheet/stylus" scope>
.item
    width 48%
    .el-form-item
        display flex
        justify-content flex-start
        .el-form-item__content
            flex-grow 1
            margin-left 0 !important
            .el-select
                width 100%
            .el-date-editor
                width 100%
</style>
<template>
    <div class="infoBox">
        <!-- formObj: {{formObj}} -->
        <el-card class="box-card">
            <div slot="header" class="clearfix" style="padding: 5px 0; text-align:center">
                <h3>企业相关信息</h3>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>            
            <el-form ref="formObj" :model="formObj" label-width="120px">
                <div class="u-f u-f-wrap">
                    <div class="item">
                        <el-form-item label="企业编码" prop="CompanyCode">
                            <el-input 
                                disabled
                                v-model="formObj.CompanyCode"
                                placeholder="请输入企业编码"></el-input>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <el-form-item label="企业名称" prop="CompanyNameCn">
                            <el-input 
                                disabled
                                v-model="formObj.CompanyNameCn"
                                placeholder="请输入企业名称"></el-input>
                        </el-form-item>
                    </div>   
                    <!-- ProvinceList: {{ProvinceList}}    -->
                    <!-- formObj.Province: {{formObj.Province}} -->
                    <div class="item">
                        <el-form-item label="省" prop="Province">
                            <el-select 
                                disabled
                                clearable 
                                v-model="formObj.Province"
                            >
                                <el-option 
                                    v-for="(province, key) in ProvinceList"
                                    :key="key"
                                    :label="province.Name"
                                    :value="province.Id"
                                    >
                                </el-option>
                            </el-select>
                            <!-- <el-input placeholder="请选择省"></el-input> -->
                        </el-form-item>
                    </div>   
                    <div class="item">
                        <el-form-item label="市" prop="City">
                            <el-select disabled clearable v-model="formObj.City">
                                <el-option 
                                    v-for="(city, key) in CityList"
                                    :key="key"
                                    :label="city.Name"
                                    :value="city.Id"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>   
                    <div class="item">
                        <el-form-item label="区/县" prop="Area">
                            <el-select disabled clearable v-model="formObj.Area">
                                <el-option 
                                    v-for="(area, key) in AreaList"
                                    :key="key"
                                    :label="area.Name"
                                    :value="area.Id"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>                                   
                    <div class="item">
                        <el-form-item label="企业传真" prop="Fax">
                            <el-input 
                                disabled
                                v-model="formObj.Fax"
                                placeholder="请输入企业传真"></el-input>
                        </el-form-item>
                    </div>   
                    <div class="item">
                        <el-form-item label="企业邮箱" prop="Email">
                            <el-input 
                                disabled
                                v-model="formObj.Email"
                                placeholder="请输入企业邮箱"></el-input>
                        </el-form-item>
                    </div>    

                    <div class="item">
                        <el-form-item label="企业执照" prop="IDNumber">
                            <el-input 
                                disabled
                                v-model="formObj.IDNumber"
                                placeholder="请输入企业执照"></el-input>
                        </el-form-item>
                    </div>     

                    <div class="item">
                        <el-form-item label="企业电话" prop="LinkPhone">
                            <el-input 
                                disabled
                                v-model="formObj.LinkPhone"
                                placeholder="请输入企业电话"></el-input>
                        </el-form-item>
                    </div> 

                    <div class="item">
                        <el-form-item label="企业联系人" prop="LinkMan">
                            <el-input 
                                disabled
                                v-model="formObj.LinkMan"
                                placeholder="请输入企业联系人"></el-input>
                        </el-form-item>
                    </div>     

                    <div class="item">
                        <el-form-item label="企业备注" prop="Description">
                            <el-input 
                                disabled
                                type="textarea"
                                v-model="formObj.Description"
                                placeholder="企业备注"></el-input>
                        </el-form-item>
                    </div>   

                    <div class="item">
                        <el-form-item label="企业级别" prop="CompanyLevel">
                            <el-input 
                                disabled
                                v-model="formObj.CompanyLevel"
                                placeholder="企业级别"></el-input>
                        </el-form-item>
                    </div>    

                    <div class="item">
                        <el-form-item label="企业性质" prop="NatureType">
                            <el-input 
                                disabled
                                v-model="formObj.NatureType"
                                placeholder="企业性质"></el-input>
                        </el-form-item>
                    </div>     

                    <div class="item">
                        <el-form-item label="企业人员规模" prop="CompanyScope">
                            <el-input 
                                disabled
                                v-model="formObj.CompanyScope"
                                placeholder="企业人员规模"></el-input>
                        </el-form-item>
                    </div>     

                    <div class="item">
                        <el-form-item label="所属行业" prop="BusinessType">
                            <el-input 
                                disabled
                                v-model="formObj.BusinessType"
                                placeholder="所属行业"></el-input>
                        </el-form-item>
                    </div>   

                    <div class="item">
                        <el-form-item label="公司类别" prop="CompanyType">
                            <el-input 
                                disabled
                                v-model="formObj.CompanyType"
                                placeholder="公司类别"></el-input>
                        </el-form-item>
                    </div>     

                    <div class="item">
                        <el-form-item label="创建时间" prop="Created">
                            <!-- formObj.Created: {{formObj.Created}} -->
                            <el-date-picker
                                disabled
                                v-model="formObj.Created"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>                        
                        </el-form-item>
                    </div>                                                                                                                                                    
                </div>
            </el-form>
        </el-card>

        <!-- <save-footer @save="save" @cancel="cancel"></save-footer> -->
    </div>
</template>

<script type="text/ecmascript-6">
import SaveFooter from '@/base/Save-footer/Save-footer'
import { REQ_OK } from '@/api/config'
import { mapGetters } from 'vuex'
import {
    GetAreaList,
    GetSysCompany,
    SaveSysCompany
} from '@/api/systemManage'
export default {
    props: {
    },
    components: {
        SaveFooter
    },
    data(){
        return {
            formObj: {

            },
            formObjRules: {
                CompanyCode: [{required: true, message: '请填写企业编号', trigger: ['blur','change']}],
                CompanyNameCn: [{required: true, message: '请填写企业名称', trigger: ['blur','change']}],
                Fax: [{required: true, message: '请填写企业传真', trigger: ['blur','change']}],
                Email: [{required: true, message: '请填写企业邮箱', trigger: ['blur','change']}],
                IDNumber: [{required: true, message: '请填写企业执照', trigger: ['blur','change']}],
                LinkPhone: [{required: true, message: '请填写企业电话', trigger: ['blur','change']}],
                LinkMan: [{required: true, message: '请填写企业联系人', trigger: ['blur','change']}],
                Description: [{required: true, message: '请填写企业备注', trigger: ['blur','change']}],
                CompanyLevel: [{required: true, message: '请填写企业级别', trigger: ['blur','change']}],
                NatureType: [{required: true, message: '请填写企业性质', trigger: ['blur','change']}],
                CompanyScope: [{required: true, message: '请填写企业人员规模', trigger: ['blur','change']}],
                BusinessType: [{required: true, message: '请填写企业所属行业', trigger: ['blur','change']}],
                CompanyType:[{required: true, message: '请填写公司类别', trigger: ['blur','change']}],
                Province:[{required: true, message: '请选择省', trigger: ['blur','change']}],
                City:[{required: true, message: '请选择市', trigger: ['blur','change']}],
                Area:[{required: true, message: '请选择区/县', trigger: ['blur','change']}],
            },
            ProvinceList: [], 
            CityList: [],
            AreaList: [],
        }
    },    
    computed: {
        ...mapGetters([
            'companyCode',
            'token',
            'userCode',
        ])
    },
    watch: {
        'formObj.Province': {
            handler(newValue, oldValue){
                debugger
                // 清空 市  区 
                this.formObj.City = ''
                this.formObj.Area = ''                
                this._GetAreaList(newValue).then(res => {
                    this.CityList = res
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        'formObj.City':{
            handler(newValue, oldValue){
                this.formObj.Area = ''                  
                this._GetAreaList(newValue).then(res => {
                    this.AreaList = res
                }).catch(error => {
                    console.log(error)
                })
            }            
        }
    },
    created(){
        // 获取本企业相关信息
        this._GetSysCompany()
        // 获取省
        this._GetAreaList('').then(res => {
            this.ProvinceList = res
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        // 获取本企业相关信息
        _GetSysCompany(){
            this.loading = true
            GetSysCompany(this.companyCode).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.formObj = res.data.Data
                }else {
                    this.$message.error(`获取企业相关信息失败,${res.data.Error}`)
                }
            })
        },
        // 获取省市
        _GetAreaList(ParentId){
            return new Promise((resolve, reject) => {
                GetAreaList(this.companyCode, this.token, this.userCode, ParentId).then(res => {
                    if(res && res.data.State === REQ_OK){
                        resolve (res.data.Data)
                    }else {
                        this.$message.error(`获取省市区数据源失败,${res.data.Error}`)
                        reject(`获取省市区数据源失败,${res.data.Error}`)
                    }
                })
            })
        },
        _SaveSysCompany(){
            SaveSysCompany(JSON.stringify(this.formObj)).then(res => {
                if(res && res.data.State == REQ_OK){
                    this.$message.success(`保存成功`) 
                    this.$emit("saveSuccess", this.formObj)
                }else {
                    this.$message(`保存失败,${res.data.Error}`)
                }
            })
        },
        initData(data){
            debugger
            console.log(data.Created)
            let newData = (data.Created).slice(6,-2)
            console.log(newData)
            let newDate = new Date(newData*1)
            var year=newDate.getFullYear(); 
            var month=newDate.getMonth()+1; 
            var date=newDate.getDate(); 
            var hour=newDate.getHours(); 
            var minute=newDate.getMinutes(); 
            var second=newDate.getSeconds(); 
            // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;         
            data.Created = year+"-"+month+"-"+date
        },
        // 保存
        save(){
            this.$refs.formObj.validate(valid => {
                if(valid){
                    this._SaveSysCompany()
                }else {

                }
            })
        },
        //取消保存
        cancel(){
            this.$emit("cancelSave")
        }
    }
}
</script>