<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业角色 选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
.roleSelectCmp
    padding 10px 20px
    .containerBox
        max-height 400px
        overflow auto
        .rightContent
            width calc(100% - 300px)
            padding  5px 
            box-sizing border-box
            .contentBox
                .item
                    .delete:hover 
                        color red   
                        transform rotate(90deg) 
                        transition transform .5s
</style>

<template>
    <div class="roleSelectCmp">
       <!--搜索框-start-->
       <div class="searchBox">
            <!-- <span style="display: inline-block; width: 300px">
              <el-input placeholder="角色名" v-model="searchRoleTit"></el-input>
            </span>
           <el-button type="primary" @click.native="handlerSearchRole">搜索</el-button> -->

            <el-input
                clearable
                placeholder="输入角色名进行过滤"
                v-model="filterText">
            </el-input>           
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
        <div class="containerBox u-f u-f-jsb">
            <!---左边--->
            <div class="leftContent">
                <company-role-select-tree
                    ref="roleTree"
                    :currentCode="currentCode"
                    @treeNodeClick="treeNodeClick"
                    @roleNodeClick="roleNodeClick"
                ></company-role-select-tree>
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
                            <el-button
                                type="primary"
                                size="mini"
                            >
                            {{item.RoleGroupName}}
                            </el-button>

                            <span 
                                class="delete"
                                style="position:absolute;
                                top:-5px;
                                right:-5px;
                                cursor: pointer;
                                font-size:15px;"
                                @click="handlerDelete(item)">
                                <i class="el-icon-close"></i>
                            </span>
                        </div>

                    </span>
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
import CompanyRoleSelectTree from './company_roleSelectTree-cmp'
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
        CompanyRoleSelectTree
    },
    data(){
        return {
            loading: false,
            isFreeze: false,
            filterText: '',  // 搜索关键词
            searchRoleTit: '',
            alreadyChecked: [],  // 已经选择的 角色
            currentClickObj: {},  // 当前被点击的树节点对象
            currentClickRoleObj: {},  // 当前被点击的 角色树节点对象
        }
    },
    watch: {
        // 'currentClickRoleObj.RoleGroupCode': {
        //     handler(newValue, oldValue){
        //         debugger
        //         if(newValue){
        //             this._changeAlreadyCheckedData(newValue)
        //         }
        //     }
        // }
        filterText(val) {
            this.$refs.roleTree.$refs.tree.filter(val);
        }
    },
    methods: {
        _changeAlreadyCheckedData(obj, checked){
            debugger
            if(checked){
                let res = this.alreadyChecked.find((item, key) => {
                    return item.RoleGroupCode == obj.RoleGroupCode
                })
                if(res){
                    return 
                }

                this.alreadyChecked.push(this.currentClickRoleObj)
            }else {
                // 取消勾选
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.RoleGroupCode != obj.RoleGroupCode
                })             
            }
        },
        // 搜索
        handlerSearchRole(){
            this.$refs.roleTree._getSelectCompRole(this.searchRoleTit, '', 1)
        },
        // 冻结
        handlerFreeze(){
            debugger
           
        },
        batchDelete(){
            debugger
            this.alreadyChecked = []

            // 将树形结构中对应的 节点 取消勾选
            this.$bus.$emit("setCheckedNodes", [])
        },
        saveAdd(){
            // 
            this.$emit("emitAddRole", this.alreadyChecked)
        },
        cancelAdd(){
            this.$emit("emitCancelRole")
        },
        // 
        // 树节点被点击
        treeNodeClick(data, checked){
            debugger
            this.currentClickObj = data
            if(this.currentCode.Children){
                if(checked){

                }
            }
        },
        // 角色树节点被点击
        roleNodeClick(data,checked){
            debugger
            this.currentClickRoleObj = data
            this._changeAlreadyCheckedData(data, checked)
        },
        handlerDelete(obj){
            debugger
            this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                return item.RoleGroupCode != obj.RoleGroupCode
            })

            // 将树形结构中对应的 节点 取消勾选
            this.$bus.$emit("setCheckedNodes", this.alreadyChecked)
            // this.$refs.tree.setCheckedKeys([obj])
        },

    }
}
</script>
