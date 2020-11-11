<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业用户组选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.cust_tooltip
    border none !important
.roleGroupSelectCmp
    padding 10px 20px
    .containerBox
        .leftContent
            width 50%
            .searchBox
            .filterBox
            .roleGroupContent
                .group  
                    position relative
                    min-height 20px
                    height 0
                    overflow hidden
                    border 1px solid red
                    .group_name
                        color #303133
                        font-size 16px
                        cursor pointer
                        margin 10px 0px
                        &:hover
                            color #409EFF
                    &.selected
                        min-height 100px
                        overflow auto
                        transition all .5s   
                    .itemBox
                        .group_item
                            margin 5px  
                        &:first-child
                            margin-left 20px
        .rightContent
            width 48%
            border 1px solid red
</style>

<template>
    <div class="roleGroupSelectCmp">
        系统用户组选择器组件
        <div class="containerBox">
            <!--搜索框-start-->
            <div class="searchBox">
                    <span style="display:inline-block; width: 300px">
                        <el-input placeholder="用户组名"></el-input>
                    </span>
                    <el-button type="primary" size="mini">搜索</el-button>
            </div>
            <!--搜索框--end-->

            <div class="filterBox marginT10">
                <el-checkbox>冻结</el-checkbox>
            </div>            
               
            <div class="u-f u-f-jsb">
                <!---左边--->
                <div class="leftContent">
                    <div class="roleGroupContent">
                        <div :class="['group', roleGroupIsOpen ? 'selected': '']">
                            <span class="group_name" 
                                @click="clickRoleGroup"
                            >
                                <i :class="roleGroupIsOpen ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                                用户组
                            </span>

                            <div class="itemBox u-f u-f-ac u-f-wrap">
                                <div class="group_item u-f0">
                                    <span>
                                        <el-checkbox>
                                            用户组item1
                                        </el-checkbox>                                    
                                    </span>
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>

                                <div class="group_item u-f0">
                                    <el-checkbox>
                                        用户组item2
                                    </el-checkbox>
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>   
                            </div>                         

                        </div>
                        <div :class="['group', noGropupIsOpen ? 'selected': '']" class="marginT10">
                            <span class="group_name" @click="clickNoGroup">
                                <i :class="noGropupIsOpen ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                                未分组
                            </span>

                            <div class="itemBox u-f u-f-ac u-f-wrap">
                                <div class="group_item u-f0">
                                    <el-checkbox>未分组item1</el-checkbox> 
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>

                                <div class="group_item u-f0">
                                    <el-checkbox>未分组item2</el-checkbox> 
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>

                                <div class="group_item u-f0">
                                    <el-checkbox>未分组item3</el-checkbox> 
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>

                                <div class="group_item u-f0">
                                    <el-checkbox>未分组item4</el-checkbox> 
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>

                                <div class="group_item u-f0">
                                    <el-checkbox>未分组item5</el-checkbox> 
                                    <tooltip-popper-cmp></tooltip-popper-cmp>                                
                                </div>   
                            </div>                                                                                                             
                        </div>
                    </div>
                </div>


                <!--右边--->
                <div class="rightContent">
                    右边
                </div>            
            </div>        
        </div>
    </div> 
</template>

<script>
// import SaverFooter from '@/base/Save-footer/Save-footer'
import TooltipPopperCmp from './tooltip-popper-cmp'
import {
    saveSysRoleGroup
} from  '@/api/systemManage'
export default {
    components: {
        // SaverFooter
        TooltipPopperCmp
    },
    data(){
        return {
            roleGroupIsOpen: false, 
            noGropupIsOpen: false,
        }
    },
    methods: {
        clickRoleGroup(){
            this.roleGroupIsOpen = !this.roleGroupIsOpen
        },
        clickNoGroup(){
            this.noGropupIsOpen = !this.noGropupIsOpen
        },
    }
}
</script>
