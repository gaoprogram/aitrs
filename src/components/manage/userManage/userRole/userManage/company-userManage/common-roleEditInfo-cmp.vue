<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理 编辑信息组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="roleEditInfoCmp">
        <!-- activeTabName: {{activeTabName}} -->
        <el-tabs 
            v-model="activeTabName" 
            type="card" 
            @tab-click="handleClickTabs">
            <el-tab-pane label="角色信息" name="roleInfo">
            </el-tab-pane>
            <el-tab-pane label="许可权" name="permitRights">
            </el-tab-pane>
            <el-tab-pane label="显示数据" name="showData">
            </el-tab-pane>
            <el-tab-pane label="用户/组" name="userOrGroup">
            </el-tab-pane>
            <el-tab-pane label="角色关系" name="roleRelation">
            </el-tab-pane>            
        </el-tabs>

        <div class="contentBox animated fadeIn">
            <div v-show="activeTabName === 'roleInfo'">
                <role-info-cmp
                    :obj="obj"
                    :strFlag="strFlag" 
                    @roleInfoSaveSuccess="roleInfoSaveSuccess"             
                ></role-info-cmp>
            </div>

            <div v-show="activeTabName === 'permitRights'">
                <permit-rights-cmp
                    :obj="obj"
                    :strFlag="strFlag"                
                ></permit-rights-cmp>
            </div>

            <div v-show="activeTabName === 'showData'">
                <show-data-cmp
                    :obj="obj"
                    :strFlag="strFlag"                
                ></show-data-cmp>
            </div>  

            <div v-show="activeTabName === 'userOrGroup'">
                <user-or-group-cmp
                    :obj="obj"
                    :strFlag="strFlag"
                ></user-or-group-cmp>
            </div>   

            <div v-show="activeTabName === 'roleRelation'">
                <role-relation-cmp
                    :obj="obj"
                    :strFlag="strFlag"
                ></role-relation-cmp>
            </div>              
        </div>                      
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import RoleInfoCmp from './roleInfo-cmp'
    import PermitRightsCmp from './permitRights-cmp'
    import ShowDataCmp from './showData-cmp'
    import UserOrGroupCmp from './userOrGroup-cmp'
    import RoleRelationCmp from './roleRelation-cmp'
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
           RoleInfoCmp,
           PermitRightsCmp,
           ShowDataCmp,
           UserOrGroupCmp,
           RoleRelationCmp
        },
        data(){
            return {
                loading: false, 
                activeTabName: ''
            }
        },
        watch: {
            strFlag: {
                handler(newValue,oldValue){
                    this.activeTabName = newValue
                },
                immediate: true
            }
        },
        methods: {
            //切换tab
            handleClickTabs(tab, event){
                debugger
            },
            roleInfoSaveSuccess(){
                this.$emit("roleInfoSaveSuccess")
            },
        }
    }
</script>

