<!--
  User: gaol
  Date: 2019/10/20
  功能：员工-电脑审批-待办事宜
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="todoList">
        待办事宜
        tabCatList:{{tabCatList}}

        <el-tabs v-model="activeTabName" @tab-click="handleClickTab">
            <el-tab-pane 
                :label="item.Name" 
                :name="item.Code"
                v-for="(item, index) in tabCatList"
                :key="item.Code"
            >
                {{item.Name}}
            </el-tab-pane>
        </el-tabs>   


        
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import {
       getTodoCatList 
    } from '@/api/employee'
    export default {
        data(){
            return {
                loading: false,
                tabCatList: [],   
            }
        },
        created(){
            this._getTodoCatList()
        },
        methods: {
            //获取 待办事宜list
            _getTodoCatList(){
                getTodoCatList().then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.tabCatList = res.data.Data
                    }else {
                        this.$message({
                            type: 'error',
                            message: `获取待办事宜数据失败,${res.data.Error}`
                        })
                    }
                })
            }
        }
    }
</script>
