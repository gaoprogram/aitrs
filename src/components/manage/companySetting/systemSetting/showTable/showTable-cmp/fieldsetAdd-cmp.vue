<!--
  User: gaol
  Date: 2019/11/20
  功能：【企业用户 字段选择器】 组件
-->

<style lang="stylus" rel="stylesheet/stylus">
>>>.el-loading-mask
    top 0 !important
.fieldSelectCmp
    padding 10px 20px
    box-sizing border-box
    .containerBox
        height calc(100vh - 200px)
        // overflow auto
        .rightContent
            width calc(100% - 500px)
            padding  5px 
            margin-left 10px
            box-sizing border-box
            overflow auto
            .contentBox
                .item
                    .delete:hover 
                        color red   
                        transform rotate(90deg) 
                        transition transform .5s
</style>

<template>
    <div class="fieldSelectCmp">
       <!--搜索框-start-->
       <!-- <div class="searchBox">
            <span style="display: inline-block; width: 300px">
              <el-input placeholder="用户名" v-model="searchUserTit"></el-input>
            </span>
           <el-button type="primary" @click.native="handlerSearchRole">搜索</el-button>
       </div> -->
       <!--搜索框--end-->


        <div class="clearfix filterBox marginT10 marginB10">
            <!-- <el-checkbox 
                v-model="isFreeze" 
                :checked="isFreeze" 
                @change="handlerFreeze">
                冻结
            </el-checkbox> -->
            <el-button 
                style="float: right"
                v-show="alreadyChecked.length"
                type="primary" 
                size="mini" 
                @click.native="batchDelete">
                批量删除
            </el-button>
        </div>            
            
        <div class="containerBox u-f u-f-jsb">
            <!---左边--->
            <div class="leftContent u-f-g1">
                <field-select-tree-cmp
                    ref="userTree"
                    :obj="obj"
                    @treeNodeClick="treeNodeClick"
                    @fieldNodeClick="fieldNodeClick"
                ></field-select-tree-cmp>
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
                        :key="item.value_add"
                        style="margin: 5px"
                        class="animated fadeIn">
                        <div 
                            class="item" 
                            style="position: relative"
                        >
                            <el-tag
                                closable
                                type="primary"
                                @close="handlerDelete(item)">
                                {{item.label_add}}
                            </el-tag>                            
                        </div>
                    </span>
                </div>
            </div>      
        </div>   

        <div style="margin-top:-20px">
            <saver-footer 
                :saveBtnIsShow="alreadyChecked.length>0"
                @save="saveAdd" 
                @cancel="cancelAdd"

            ></saver-footer>
        </div>        
    </div> 
</template>

<script>
import SaverFooter from '@/base/Save-footer/index'
import fieldSelectTreeCmp from './fieldSelectTree-cmp'
export default {
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }        
    },
    components: {
        SaverFooter,
        fieldSelectTreeCmp
    },
    data(){
        return {
            isFreeze: false,
            searchUserTit: '',
            alreadyChecked: [],  // 已经选择的 用户
            currentClickObj: {},  // 当前被点击的树节点对象
            currentClickFieldObj: {},  // 当前被点击的 用户树节点对象
        }
    },
    watch: {

    },
    methods: {
        _changeAlreadyCheckedData(obj, checked){
            debugger
            if(checked){
                let res = this.alreadyChecked.find((item, key) => {
                    return item.value_add == obj.value_add
                })
                if(res){
                    return 
                }

                this.alreadyChecked.push(this.currentClickFieldObj)
            }else {
                // 取消勾选
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.value_add != obj.value_add
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
        batchDelete(){
            debugger
            this.alreadyChecked = []

            // 将树形结构中对应的 节点 取消勾选
            this.$bus.$emit("setCheckedNodes", [])
        },
        saveAdd(){
            debugger
            if(!this.alreadyChecked.length){
                this.$message.warning("未选择字段类型的数据")
                return
            }
            this.$emit("emitSaveField", this.alreadyChecked)
        },
        cancelAdd(){
            debugger
            this.$emit("emitCancelField")
        },
        _getAlreadyCheckedData(obj, checked){
            // if(data.Teams && data.Teams.length){
            //     data.Teams.forEach((item, key) => {
            //         IsSelectItem
            //     })
            // }
            if(checked){
                // 勾选
                let res = this.alreadyChecked.find((item, key) => {
                    return item.value_add == obj.value_add
                })
                if(res){
                    return 
                }

                this.alreadyChecked.push(this.currentClickFieldObj)
            }else {
                // 取消勾选
                this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                    return item.value_add != obj.value_add
                })             
            }            
        },
        // 树 非字段节点被点击
        treeNodeClick(data, checked){
            debugger
            this.currentClickObj = data
            // this._getAlreadyCheckedData(data, checked)
        },
        // 树 字段节点被点击
        fieldNodeClick(data,checked){
            debugger
            this.currentClickFieldObj = data
            this._changeAlreadyCheckedData(data, checked)
        },
        handlerDelete(obj){
            debugger
            this.alreadyChecked = this.alreadyChecked.filter((item, key) => {
                return item.value_add != obj.value_add
            })

            // 将树形结构中对应的 节点 取消勾选
            this.$bus.$emit("setCheckedNodes", this.alreadyChecked)
            // this.$refs.tree.setCheckedKeys([obj])
        },

    }
}
</script>
