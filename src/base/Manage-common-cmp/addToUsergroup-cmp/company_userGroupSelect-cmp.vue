<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业用户组选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.cust_tooltip
    border none !important
.userGroupSelectCmp
    padding 10px 20px
    .containerBox
        .leftContent
            // width 50%
            min-width 50%
            .searchBox
            .filterBox
            .userGroupContent
                .group  
                    position relative
                    min-height 35px
                    padding 10px 20px
                    height 0
                    overflow hidden
                    border 1px solid rgba(0,0,0,.1)
                    border-radius 5px
                    box-sizing border-box
                    .group_name
                        color #303133
                        font-size 16px
                        cursor pointer
                        margin 10px 0px
                        &:hover
                            color #409EFF
                    &.selected
                        min-height 200px
                        overflow auto
                        transition all .5s   
                    .itemBox
                        height 100%
                        overflow auto
                        .group_item
                            margin 5px 20px 
                        &:first-child
                            margin-left 20px
        .rightContent
            width 48%
            padding 10px 20px
            margin-left 10px
            box-sizing border-box
            border-radius 5px
            border 1px solid rgba(0,0,0,.1)
            .item
                .delete:hover
                    color red
                    transform rotate(-90deg)
                    transition all .3s


</style>


<template>
    <div class="userGroupSelectCmp">
        <div class="containerBox">
            <!--搜索框-start-->
            <div class="searchBox">
                    <span style="display:inline-block; width: 300px">
                        <el-input 
                            clearable
                            placeholder="用户组名"
                            v-model="searchTit"
                        >
                        </el-input>
                    </span>
                    <el-button 
                        type="primary" 
                        size="small"
                        @click.native="handlerSearch"
                    >
                        搜索
                    </el-button>
            </div>
            <!--搜索框--end-->

            <div class="filterBox marginT10 marginB10 u-f-ac u-f-jsb">
                <el-checkbox 
                    v-model="isFreeze" 
                    :checked="isFreeze" 
                    @change="handlerFreeze">
                    冻结
                </el-checkbox>
                <el-button 
                    v-show="alreadyChecked.length"
                    type="primary" 
                    size="mini" 
                    @click.native="batchDelete">
                    批量删除
                </el-button>
            </div>            
               
            <!-- userGroupData： {{userGroupData}} -->
            <div class="u-f u-f-jsb">
                <!---左边--->
                <div class="leftContent">
                    <div class="userGroupContent">
                        <div :class="['group', userGroupIsOpen ? 'selected': '']">
                            <span class="group_name" 
                                @click="clickUserGroup"
                            >
                                <i :class="userGroupIsOpen ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                                用户组
                            </span>

                            <!-- userGroupData: {{userGroupData}} -->
                            <div class="itemBox u-f u-f-ac u-f-wrap">
                                <div class="group_item u-f0"
                                    v-for="(item, index) in userGroupData"
                                    :key="item.UserGroupCode"
                                >

                                    <!-- <el-checkbox-group 
                                        v-model="alreadyChecked"
                                        :max="1"> -->
                                        <el-checkbox 
                                            v-model="item.Checked"
                                            :checked="item.Checked"
                                            @change.native="handlerSelected(item, index)">
                                            {{item.UserGroupName}}
                                        </el-checkbox>
                                    <tooltip-popper-cmp :tootipTit="item.Description"></tooltip-popper-cmp>                                                                        
                                    <!-- </el-checkbox-group>      -->
                                                               
                                </div>   
                            </div>                         

                        </div>
                    </div>
                </div>


                <!--右边--->
                <div class="rightContent" v-show="alreadyChecked.length">
                    <!-- <div class="batchDelete" style="text-align: right" v-if="alreadyChecked.length">
                        <el-button type="primary" size="mini" @click.native="batchDelete">批量删除</el-button>
                    </div> -->
                    <div class="contentBox u-f-ac u-f-wrap">
                        <span 
                            v-for="(item, index) in alreadyChecked"
                            :key="item.UserGroupCode"
                            style="margin: 5px"
                            class="animated fadeIn">
                            <div 
                                class="item" 
                                style="position: relative"
                            >
                                <!-- <el-checkbox 
                                    size="mini"
                                    border>
                                    {{item.UserGroupName}}
                                </el-checkbox> -->
                                <el-tag  
                                    size="medium" 
                                    closable
                                    @close="handlerDelete(item)"
                                >
                                    {{item.UserGroupName}}
                                </el-tag>

                                <!-- <span 
                                    class="delete"
                                    style="position:absolute;
                                    top:-5px;
                                    right:-5px;
                                    cursor: pointer;
                                    font-size:15px;"
                                    @click="handlerDelete(item)">
                                    <i class="el-icon-close"></i>
                                </span> -->
                            </div>

                        </span>
                    </div>
                </div>      


            </div>        
        </div>

        <div>
            <saver-footer @save="saveAdd" @cancel="cancelAdd"></saver-footer>
        </div>
    </div> 
</template>

<script>
import SaverFooter from '@/base/Save-footer/Save-footer'
import TooltipPopperCmp from './tooltip-popper-cmp'
import { REQ_OK } from '@/api/config'
import { 
    getSelectCompUserG, // 获取企业用户组数据
    CompUserToGroup,  //保存
} from '@/api/systemManage'
export default {
    props: {
        currentCode: {
            type: String,
            default: () => {
                return ''
            }
        }
    },
    components: {
        SaverFooter,
        TooltipPopperCmp
    },
    data(){
        return {
            loading: false,
            userGroupIsOpen: true, 
            noGropupIsOpen: false,
            isFreeze: false,
            userGroupData: [], 
            searchTit: '',
            alreadyChecked: [],
            checkedUser: [],
        }
    },
    created(){
        this._getSelectCompUserG()
    },
    methods: {
        clickUserGroup(){
            this.userGroupIsOpen = !this.userGroupIsOpen
        },
        clickNoGroup(){
            this.noGropupIsOpen = !this.noGropupIsOpen
        },
        //保存 用户组
        _CompUserToGroup(){
            debugger
            CompUserToGroup(this.currentCode,JSON.stringify(this.alreadyChecked)).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存企业用户组成功")
                    this.$emit("saveSelectRoleGroupDialog")
                }else {
                    this.$message.error(`保存企业用户组失败,${res.data.Error}`)
                }
            })
        },
        // 获取企业用户组数据
        _getSelectCompUserG(userGroupName, state = 1){
            debugger
            getSelectCompUserG(this.searchTit, state).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.userGroupData = res.data.Data
                    this.userGroupData.forEach((item, key) => {
                        this.$set(item, 'Checked', false)
                    })
                }else {
                  this.$message.error(`获取企业用户组数据失败,${res.data.Error}`)  
                }
            }).catch(() => {
                this.$message.warning("获取企业用户组数据出错了")
            })
        },
        // 搜索
        handlerSearch(){
            this.isFreeze = false
            this._getSelectCompUserG()
        },
        // 勾选 / 取消勾选
        handlerSelected(obj, idx){
            debugger
            // obj.Checked = !obj.Checked
            debugger
            if( obj.Checked ){
                let res = this.alreadyChecked.find((item, key) => {
                    return item.UserGroupCode == obj.UserGroupCode
                })

                if(!res){
                    this.alreadyChecked.push(obj)
                }
            }else {
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.UserGroupCode != obj.UserGroupCode
                })
            }
        },
        // 单个删除已选用户组
        handlerDelete(obj){
            debugger
            // this.$confirm("确定要删除已选的","提示",{

            // })
            this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                return item.UserGroupCode != obj.UserGroupCode
            })

            this.userGroupData.forEach((item, key) => {
                if(item.UserGroupCode == obj.UserGroupCode){
                    item.Checked = !item.Checked
                }
            })
        },
        // 批量删除 已选用户组
        batchDelete(){
            debugger
            if(this.alreadyChecked.length){
                let length = this.alreadyChecked.length
                this.alreadyChecked.splice(0, length)
                this.userGroupData.forEach((item, key) => {
                    item.Checked = !item.Checked
                })                
            }
        },
        // 冻结
        handlerFreeze(){
            debugger
            if(this.alreadyChecked.length){
                let length = this.alreadyChecked.length
                this.alreadyChecked.splice(0, length)
                this.userGroupData.forEach((item, key) => {
                    item.Checked = !item.Checked
                })                
            }
            if(this.isFreeze){
                this._getSelectCompUserG(this.searchTit, 0)
            }else {
                this._getSelectCompUserG(this.searchTit, 1)
            }
        },
        // 确定添加
        saveAdd(){
            this.$emit("emitAddUserGroup", this.alreadyChecked)
            // this._CompUserToGroup()
            // this.$emit("saveSelectRoleGroupDialog", this.alreadyChecked)
        },
        // 取消添加
        cancelAdd(){
            this.$emit("cancelSelectUserGroupDialog")
        }
    }
}
</script>
