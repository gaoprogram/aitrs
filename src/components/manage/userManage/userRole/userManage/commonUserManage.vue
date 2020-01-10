<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--用户管理通用页面
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>

</style>
<template>
    <div class="userManageCommon animated fadeIn">
        <div v-if="isCompanyOrSystemUser">
            <company-user-manage-cmp></company-user-manage-cmp>
        </div>
        <div v-else>
            系统
        </div>        
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import CompanyUserManageCmp from './company-userManage/userManage'
export default {
    components: {
        CompanyUserManageCmp
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
