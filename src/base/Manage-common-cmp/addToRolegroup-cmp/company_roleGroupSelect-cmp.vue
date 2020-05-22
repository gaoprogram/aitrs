<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业角色组选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.el-loading-mask
    top 0 !important
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
                    height 10px
                    overflow hidden
                    border 1px solid rgba(0,0,0,.1)
                    border-radius 5px
                    box-sizing border-box
                    .group_name
                        height 20px
                        color #303133
                        font-size 16px
                        cursor pointer
                        margin 10px 0px
                        &:hover
                            color #409EFF
                    &.selected
                        min-height 250px
                        overflow auto
                        transition all .5s   
                    .itemBox
                        .group_item
                            margin 5px 20px 
                        &:first-child
                            margin-left 20px
        .rightContent
            width 48%
            height 250px
            overflow auto
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
                        <div :class="['group', roleGroupIsOpen ? 'selected': '']" v-loading="loading">
                            <span class="group_name" 
                                @click="clickRoleGroup"
                            >
                                <i :class="roleGroupIsOpen ? 'el-icon-arrow-up':'el-icon-arrow-down'"></i>
                                角色组
                            </span>

                            <div :class="['itemBox', 'u-f', 'u-f-ac', 'u-f-wrap',roleGroupData.length<=0?'not_found':'']">
                                <div class="group_item u-f0"
                                    v-for="(item, index) in roleGroupData"
                                    :key="item.RoleGroupCode"
                                >

                                    <!-- <el-checkbox-group 
                                        v-model="alreadyChecked"
                                        :max="1"> -->
                                        <input 
                                            type="checkbox"
                                            :class="item.RoleGroupCode"
                                            :checked="item.checked"
                                            :disabled="item.Disabled"
                                            @change="handlerSelected($event, item, index)">
                                            {{item.RoleGroupName}}
                                        </input>
                                        <el-popover
                                            placement="bottom"
                                            title=""
                                            width="200"
                                            trigger="hover"
                                            :content="item.Description">
                                            <i class="el-icon-question" slot="reference"></i>
                                        </el-popover>                                          
                                    <!-- <tooltip-popper-cmp :tootipTit="item.Description"></tooltip-popper-cmp>                                                                         -->
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
                    <!-- alreadyChecked: {{alreadyChecked}} -->
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
            <saver-footer 
                :saveBtnIsShow="alreadyChecked.length>0"
                @save="saveAdd" 
                @cancel="cancelAdd"></saver-footer>
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
        },

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
        this._getSelectCompRoleG(this.searchTit, 1)
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
                        this.$set(item, 'checked', false)
                        this.$set(item, 'Disabled', false)
                    })
                }else {
                  this.$message.error(`获取企业角色组数据失败,${res.data.Error}`)  
                }
            }).catch(() => {
                // this.$message.warning("获取企业角色组数据出错了")
            })
        },
        // 搜索
        handlerSearch(){
            // this.isFreeze = false
            let type = ''
            if(this.isFreeze){
                type = 0
            }else {
                type = 1
            }
            this._getSelectCompRoleG(this.searchTit,type)
        },
        // 勾选 / 取消勾选
        handlerSelected(e, obj, idx){
            debugger
            if( obj.checked ){
                // 取消 勾选
                this.roleGroupData.forEach((item, key) => {
                    item.Disabled = false
                })                
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.RoleGroupCode != obj.RoleGroupCode
                })
            }else {
                // 勾选
                this.roleGroupData.forEach((item, key) => {
                    if(item.RoleGroupCode != obj.RoleGroupCode){
                        item.Disabled = true
                    }
                })
                this.alreadyChecked.push(obj)
                // console.log(this.alreadyChecked)
            }
            debugger
            obj.checked = !obj.checked
        },
        // 单个删除已选角色组
        handlerDelete(obj){
            debugger
            // this.$confirm("确定要删除已选的","提示",{

            // })
            document.getElementsByClassName(`${obj.RoleGroupCode}`)[0].checked = false
            this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                return item.RoleGroupCode != obj.RoleGroupCode
            })

            this.userGroupData.forEach((item, key) => {
                // if(item.RoleGroupCode == obj.RoleGroupCode){
                    // this.$set(item, 'checked', false)
                    // this.$set(item, 'Disabled', false)
                    item.checked = false
                    item.Disabled = false
                // }
            })
        },
        emitSetCheckedRoleGroupNodes(arr, obj){
            debugger
            try {
                document.getElementsByClassName(`${obj.RoleGroupCode}`)[0].checked = false              
            } catch (error) {
                
            }

            if(arr && arr.length){
                let obj = arr[0]
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.RoleGroupCode != obj.RoleGroupCode
                })  
            }else {
                this.alreadyChecked = []
            }           

        },
        // 批量删除 已选角色组
        batchDelete(){
            debugger
            if(this.alreadyChecked.length){
                let length = this.alreadyChecked.length
                // this.alreadyChecked.splice(0, length)
                // this.roleGroupData.forEach((item, key) => {
                //     item.checked = !item.checked
                // })        
                this.roleGroupData.forEach((item, key) => {
                    // this.$set(item, 'checked', false)
                    // this.$set(item, 'Disabled', false)
                    document.getElementsByClassName(`${item.RoleGroupCode}`)[0].checked = false
                    item.checked = false
                    item.Disabled = false
                })  
                this.alreadyChecked = []      
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
