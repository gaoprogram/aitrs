<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--企业角色 通用页面
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>

</style>
<template>
    <div class="roleManageCommon animated fadeIn">
        <div v-if="isCompanyOrSystemUser">
            <company-role-manage-cmp></company-role-manage-cmp>
        </div>
        <div v-else>
           
        </div>        
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import CompanyRoleManageCmp from './company-roleManage/roleManage'
export default {
    components: {
        CompanyRoleManageCmp
    },
    data(){
        return {

        }
    },
    created(){

    },
    computed:{
        ...mapGetters([
            'isCompanyOrSystemUser'
        ])
    },
    methods: {

    }
}
</script>
