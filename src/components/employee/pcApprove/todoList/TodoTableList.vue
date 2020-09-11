<!--
  User: gaol
  Date: 2019/10/20
  功能：员工-电脑审批-待办事宜 table组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div :class="['todoList', tableData.length<=0? 'not_found':'']">
        tableData:{{tableData}}        
        <el-table
            border
            style="width:100%"
            empty-text=" "
            :data="tableData"
        >
            <el-table-column
                prop="EmpId"
                label="员工id"
            >
            </el-table-column>

            <el-table-column
                prop="EmpNo"
                label="员工编号"
            >
            </el-table-column>

            <el-table-column
                prop="EmpId"
                label="员工id"
            >
            </el-table-column>

            <el-table-column
                prop="EmpName"
                label="员工姓名"
            >
            </el-table-column>

            <el-table-column
                prop="State"
                label="状态"
            >
            </el-table-column>

            <el-table-column
                prop="StateName"
                label="状态名"
            >
            </el-table-column>    

            <el-table-column
                prop="CreateDate"
                label="创建时间"
            >    
                <template slot-scope="scope">
                    <span>
                        {{scope.CreateDate | replaceTime }}
                    </span>
                </template>
            </el-table-column>                                                        
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import {

    } from '@/api/employee'
    import {
       getTodoList 
    } from '@/api/employee'
    export default {
        data(){
            return {
                loading: false,
                tableData: [],   
            }
        },
        created(){
            this._getTodoList()
        },
        methods: {
            //获取 待办事宜list
            _getTodoList(){
                getTodoList().then(res => {
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
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
