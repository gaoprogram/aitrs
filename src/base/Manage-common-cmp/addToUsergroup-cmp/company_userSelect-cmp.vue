<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业用户 选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
>>>.el-loading-mask
    top 0 !important
.roleSelectCmp
    padding 10px 20px
    box-sizing border-box
    .containerBox
        max-height 380px
        overflow auto
        .rightContent
            width calc(100% - 500px)
            padding  5px 
            margin-left 10px
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
       <!-- <div class="searchBox">
            <span style="display: inline-block; width: 300px">
              <el-input placeholder="用户名" v-model="searchUserTit"></el-input>
            </span>
           <el-button type="primary" @click.native="handlerSearchRole">搜索</el-button>
       </div> -->
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
            <div class="leftContent u-f1">
                <company-user-select-tree
                    ref="userTree"
                    :currentCode="currentCode"
                    @treeNodeClick="treeNodeClick"
                    @userNodeClick="userNodeClick"
                ></company-user-select-tree>
            </div>


            <!-- alreadyChecked: {{alreadyChecked}} -->
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
                            <!-- <el-button
                                type="primary"
                                size="mini"
                            >
                            {{item.UserGroupName}}
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
                            </span> -->
                            <el-tag
                                closable
                                type="primary"
                                @close="handlerDelete(item)">
                                {{item.UserGroupName}}
                            </el-tag>                            
                        </div>
                    </span>
                </div>
            </div>      
        </div>   

        <div class="animate fadeIn" style="margin-top:-20px">
            <saver-footer 
                :saveBtnIsShow="alreadyChecked.length>0"
                @save="saveAdd"
                @cancel="cancelAdd"></saver-footer>
        </div>        
    </div> 
</template>

<script>
import SaverFooter from '@/base/Save-footer/Save-footer'
import CompanyUserSelectTree from './company_userSelectTree-cmp'
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
        CompanyUserSelectTree
    },
    data(){
        return {
            isFreeze: false,
            searchUserTit: '',
            alreadyChecked: [],  // 已经选择的 用户
            currentClickObj: {},  // 当前被点击的树节点对象
            currentClickUserObj: {},  // 当前被点击的 用户树节点对象
        }
    },
    watch: {
        // 'currentClickUserObj.UserGroupCode': {
        //     handler(newValue, oldValue){
        //         debugger
        //         if(newValue){
        //             this._changeAlreadyCheckedData(newValue)
        //         }
        //     }
        // }
    },
    methods: {
        _changeAlreadyCheckedData(obj, checked){
            debugger
            if(checked){
                let res = this.alreadyChecked.find((item, key) => {
                    return item.UserGroupCode == obj.UserGroupCode
                })
                if(res){
                    return 
                }

                this.alreadyChecked.push(this.currentClickUserObj)
            }else {
                // 取消勾选
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.UserGroupCode != obj.UserGroupCode
                })             
            }
        },
        // 搜索
        handlerSearchRole(){
            this.$refs.userTree._getSelectCompUser()
        },
        handlerFreeze(){
            let type = ''
            if(this.isFreeze){
                type = 'false'
            }else {
                type = 'true'
            }
            this.$refs.userTree._getSelectCompUser('', type)
        },
        // 批量删除用户
        batchDelete(){
            debugger
            this.alreadyChecked = []

            // 将树形结构中对应的 节点 取消勾选
            this.$bus.$emit("setUserCheckedNodes", [])
        },
        saveAdd(){
            debugger
            this.$emit("emitAddUser", this.alreadyChecked)
        },
        cancelAdd(){
            debugger
            this.$emit("emitCancelUser")
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
        // 用户树节点被点击
        userNodeClick(data,checked){
            debugger
            this.currentClickUserObj = data
            this._changeAlreadyCheckedData(data, checked)
        },
        // 单个删除已选用户
        handlerDelete(obj){
            debugger
            this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                return item.UserGroupCode != obj.UserGroupCode
            })

            // 将树形结构中对应的 节点 取消勾选
            this.$bus.$emit("setUserCheckedNodes", this.alreadyChecked)
            // this.$refs.tree.setCheckedKeys([obj])
        },
        emitSetCheckedUserNodes(arr){
            this.$bus.$emit("setUserCheckedNodes", arr)            
        }
    }
}
</script>
