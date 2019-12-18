<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业角色组选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.cust_tooltip
    border none !important
.roleGroupSelectCmp
    padding 10px 20px
    .containerBox
        .leftContent
            // width 50%
            min-width 50%
            .searchBox
            .filterBox
            .roleGroupContent
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
                        min-height 100px
                        overflow auto
                        transition all .5s   
                    .itemBox
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
    <div class="roleGroupSelectCmp">
        <div class="containerBox">
            <!--搜索框-start-->
            <div class="searchBox">
                <span style="display:inline-block; width: 300px">
                    <el-input 
                        clearable
                        placeholder="角色组名"
                        v-model="searchTit"
                    >
                    </el-input>
                </span>
                <el-button 
                    type="primary" 
                    size="mini"
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
               
            <!-- roleGroupData： {{roleGroupData}} -->
            <div class="u-f u-f-jsb">
                <!---左边--->
                <div class="leftContent">
                    <div class="roleGroupContent">
                        <div :class="['group', roleGroupIsOpen ? 'selected': '']">
                            <span class="group_name" 
                                @click="clickRoleGroup"
                            >
                                <i :class="roleGroupIsOpen ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                                角色组
                            </span>

                            <div class="itemBox u-f u-f-ac u-f-wrap">
                                <div class="group_item u-f0"
                                    v-for="(item, index) in roleGroupData"
                                    :key="item.RoleGroupCode"
                                >

                                    <!-- <el-checkbox-group 
                                        v-model="alreadyChecked"
                                        :max="1"> -->
                                        <el-checkbox 
                                            v-model="item.Checked"
                                            :checked="item.Checked"
                                            @change.native="handlerSelected(item, index)">
                                            {{item.RoleGroupName}}
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
                            :key="item.RoleGroupCode"
                            style="margin: 5px"
                            class="animated fadeIn">
                            <div 
                                class="item" 
                                style="position: relative"
                            >
                                <!-- <el-checkbox 
                                    size="mini"
                                    border>
                                    {{item.RoleGroupName}}
                                </el-checkbox> -->

                                <el-tag 
                                    size="medium" 
                                    closable
                                    @close="handlerDelete(item)">
                                    {{item.RoleGroupName}}
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
    getSelectCompRoleG, // 获取企业角色组数据
    compRoleToGroup,  //保存
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
            roleGroupIsOpen: true, 
            noGropupIsOpen: false,
            filterText: '', // 搜索关键词
            isFreeze: false,
            roleGroupData: [], 
            searchTit: '',
            alreadyChecked: [],
            checkedRole: [],
        }
    },
    created(){
        this._getSelectCompRoleG()
    },
    watch(){
   
    },
    methods: {
        clickRoleGroup(){
            this.roleGroupIsOpen = !this.roleGroupIsOpen
        },
        clickNoGroup(){
            this.noGropupIsOpen = !this.noGropupIsOpen
        },
        //保存 角色组
        _compRoleToGroup(){
            debugger
            compRoleToGroup(this.currentCode,JSON.stringify(this.alreadyChecked)).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存企业角色组成功")
                    this.$emit("saveSelectRoleGroupDialog")
                }else {
                    this.$message.error(`保存企业角色组失败,${res.data.Error}`)
                }
            })
        },
        // 获取企业角色组数据
        _getSelectCompRoleG(roleGroupName, state = 1){
            debugger
            getSelectCompRoleG(this.searchTit, state).then(res => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.roleGroupData = res.data.Data
                    this.roleGroupData.forEach((item, key) => {
                        this.$set(item, 'Checked', false)
                    })
                }else {
                  this.$message.error(`获取企业角色组数据失败,${res.data.Error}`)  
                }
            }).catch(() => {
                this.$message.warning("获取企业角色组数据出错了")
            })
        },
        // 搜索
        handlerSearch(){
            this.isFreeze = false
            this._getSelectCompRoleG()
        },
        // 勾选 / 取消勾选
        handlerSelected(obj, idx){
            debugger
            // obj.Checked = !obj.Checked
            debugger
            if( obj.Checked ){
                let res = this.alreadyChecked.find((item, key) => {
                    return item.RoleGroupCode == obj.RoleGroupCode
                })

                if(!res){
                    this.alreadyChecked.push(obj)
                }
            }else {
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.RoleGroupCode != obj.RoleGroupCode
                })
            }
        },
        // 单个删除已选角色组
        handlerDelete(obj){
            debugger
            // this.$confirm("确定要删除已选的","提示",{

            // })
            this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                return item.RoleGroupCode != obj.RoleGroupCode
            })

            this.roleGroupData.forEach((item, key) => {
                if(item.RoleGroupCode == obj.RoleGroupCode){
                    item.Checked = !item.Checked
                }
            })
        },
        // 批量删除 已选角色组
        batchDelete(){
            debugger
            if(this.alreadyChecked.length){
                let length = this.alreadyChecked.length
                this.alreadyChecked.splice(0, length)
                this.roleGroupData.forEach((item, key) => {
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
                this.roleGroupData.forEach((item, key) => {
                    item.Checked = !item.Checked
                })                
            }
            if(this.isFreeze){
                this._getSelectCompRoleG(this.searchTit, 0)
            }else {
                this._getSelectCompRoleG(this.searchTit, 1)
            }
        },
        // 确定添加
        saveAdd(){
            this.$emit("emitAddRoleGroup", this.alreadyChecked)
            // this._compRoleToGroup()
            // this.$emit("saveSelectRoleGroupDialog", this.alreadyChecked)
        },
        // 取消添加
        cancelAdd(){
            this.$emit("cancelSelectRoleGroupDialog")
        }
    }
}
</script>
