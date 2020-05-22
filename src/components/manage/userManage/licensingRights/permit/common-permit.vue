<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  许可权限组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.permitRightsSetCmp
    padding 0 20px 
</style>

<template>
    <div class="permitRightsSetCmp">

        <!--企业-start--> 
        <div
            class="companyPermitRightsSet"
            v-if="isCompanyOrSystemUser"
        >
            <company-permit-cmp></company-permit-cmp>
        </div>
        <!--企业--end--->

        <!--系统--start-->
        <div
            class="companyPermitRightsSet"
            v-if="!isCompanyOrSystemUser"
        >
            <system-permit-cmp></system-permit-cmp>
        </div>     
        <!--系统--end-->   
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import { mapGetters } from 'vuex'
    import CompanyPermitCmp from './company-permit/permit'
    import SystemPermitCmp from './system-permit/permit'
    import { 
        // compRolePermitList,
        // batchDelSecurityTypeGroup
    } from '@/api/systemManage'
    export default {
        props: {

        },
        components: {
            CompanyPermitCmp,
            SystemPermitCmp,
        },
        data(){
            return {

            }
        },
        created(){

        },
        computed: {
            ...mapGetters([
                'isCompanyOrSystemUser'
            ])
        },
        methods: {

        }
    }
</script>

