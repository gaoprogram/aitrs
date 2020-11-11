<!--
  User: gaol
  Date: 2019/11/20
  功能：用户管理中的 查看授权角色弹框 【企业】
-->

<style lang="stylus" rel="stylesheet/stylus">
.scanRoleBox
    padding 20px
    .el-form-item
        margin-bottom 5px !important
</style>

<template>
    <div class="scanRoleBox animated fadeIn">
        <!-- obj: {{obj}}
        ----
        scanForm: {{scanForm}}
        ---
        companyCode; {{companyCode}} -->
        <el-form :model="scanForm" label-width="120">
            <el-form-item 
                label="企业编号"
                prop="CompanyCode">
                <el-button type="text">
                    {{scanForm.CompanyCode}}
                </el-button>
            </el-form-item>
            <el-form-item 
                label="角色id"
                prop="RoleId">
                <el-button type="text">
                    {{scanForm.RoleId}}
                </el-button>                
            </el-form-item>

            <el-form-item 
                label="角色名称"
                prop="RoleName">
                <el-button type="text">
                    {{scanForm.RoleName}}
                </el-button>                    
            </el-form-item>

            <el-form-item 
                label="角色类型"
                prop="RoleType">
                <el-button type="text" v-if="scanForm.RoleType == 1">
                    系统角色
                </el-button>     
                <el-button type="text" v-if="scanForm.RoleType == 2">
                    企业自定义角色
                </el-button>                                              
            </el-form-item>

            <el-form-item 
                label="角色级别"
                prop="RoleLevel">
                <el-button v-if="scanForm.RoleLevel == 1" type="text">
                    总部
                </el-button>     
                <el-button v-if="scanForm.RoleLevel == 2" type="text">
                    分部
                </el-button>  
                <el-button v-if="scanForm.RoleLevel == 3" type="text">
                    部门
                </el-button>                                         
            </el-form-item>

            <el-form-item 
                label="最大授权人数"
                prop="MaxAuthNum">
                <el-button type="text">
                    {{scanForm.MaxAuthNum}}
                </el-button>                   
            </el-form-item>

            <el-form-item 
                label="描述"
                prop="Description">
                <el-button type="text">
                    {{scanForm.Description}}
                </el-button>                      
            </el-form-item>    

            <el-form-item 
                label="状态"
                prop="State">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scanForm.State == 1">
                        启用
                    </el-button>
                    <el-button type="text" v-if="scanForm.State == 0">
                        停用
                    </el-button>                    
                </template>
            </el-form-item>                                                                      
        </el-form>
    </div>
</template>

<script>
import SaverFooter from '@/base/Save-footer/Save-footer'
import { mapGetters } from 'vuex'
import { REQ_OK } from '@/api/config'
import {

} from '@/api/systemManage'
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
        SaverFooter,
    },
    data(){
        return {
            loading: false,
            scanForm: JSON.parse(JSON.stringify(this.obj))
        }
    },
    computed: {
        ...mapGetters([
            'isCompanyOrSystemUser',
            'companyCode'
        ])
    },
    created(){

    },
    beforeDestroy(){

    },
    methods: {

    }
}
</script>
