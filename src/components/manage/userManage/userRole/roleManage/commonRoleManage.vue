<!--
  User: gaol
  Date: 2019/8/7
  功能：平台系统设置——用户角色--【用户角色】和 【企业角色】公用的 企业端通用页面
-->

<style lang="stylus" rel="stylesheet/syylus" scoped>

</style>
<template>
    <div class="roleManageCommon animated fadeIn">
        <div
            v-atris-authrity="{
            page: 'page1',
            name: 'com1',
            parent: 'page1',
            eleStyle: 8,
            displayStyle: 'block'
            }"            
        >
            <company-role-manage-cmp></company-role-manage-cmp>   
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
        //设置当前的权限页面
        this.$store.dispatch("setAuthorityPageCode","page1")         
    },
    computed:{

    },
    methods: {

    }
}
</script>
