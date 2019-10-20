<!--
  User: gaol
  Date: 2019/9/30
  功能： 员工人员选择器
--->

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="empSelect-cmp">
        <el-row :gutter="12">
            <!--left部分---start--->
            <el-col :span="12">
                <el-card 
                    class="box-card-left"
                    shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>员工列表</span>
                        <el-button style="float: right; padding: 3px 0" type="text">共{{tableDataLeft.length}}人</el-button>
                    </div>                    
                    <div class="list">
                        <el-table
                            ref="leftTable"
                            :data="tableDataLeft"
                            @selection-change="leftSelectionChange"
                            style="width: 100%">

                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>

                            <el-table-column
                                prop="empName"
                                label="姓名"
                                width="180">
                            </el-table-column>

                            <el-table-column
                                prop="empNo"
                                label="工号"
                                width="180">
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="状态">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <!---left部分---end-->

            <!---right部分---START-->
            <el-col :span="12">
                <el-card
                    class="box-card-right" 
                    shadow="hover"
                >
                    <div slot="header" class="clearfix">
                        <span>已选员工列表</span>
                        <el-button style="float: right; padding: 3px 0" type="text">已选{{tableDataRight.length}}人</el-button>
                        <el-button 
                            style="float: right;margin-right:10px" 
                            type="primary" 
                            size="mini" 
                            icon="el-icon-delete"
                            @click.native="rightDetach"
                        >
                        移除已选
                        </el-button>
                    </div>                    
                    <div class="list">
                        <el-table
                            ref="rightTable"
                            :data="tableDataRight"
                            @selection-change="rightSelectionChange"                            
                            style="width: 100%">

                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>

                            <el-table-column
                                prop="empName"
                                label="姓名"
                                width="180">
                            </el-table-column>

                            <el-table-column
                                prop="empNo"
                                label="工号"
                                width="180">
                            </el-table-column>

                            <el-table-column
                                prop="status"
                                label="状态">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <!---right部分---END-->
        </el-row>   

        <div class="footerBox">
            <save-footer @save="saveEmp" @cancel="cancelEmp"></save-footer>
        </div>     
    </div>
</template>

<script>
    import SaveFooter from '@/base/Save-footer/Save-footer'
    export default {
        components: {
            SaveFooter
        },
        data(){
            return {
                tableDataLeft: [
                    {
                        empNo: '1001',
                        empName: '张三',
                        status: '在职'
                    }, 
                    {
                        empNo: '1002',
                        empName: '李四',
                        status: '待入职'
                    }, 
                    {
                        empNo: '1003',
                        empName: '王五',
                        status: '在职'
                    }, 
                    {
                        empNo: '1004',
                        empName: '小明',
                        status: '离职'
                    }
                ],
                tableDataRight: [],  // 右边部分的数据集合
                leftMultipleSelection: [],  // 左边已经选取的数据集合
                rightMultipleSelection: [],  // 右边已经选取的数据集合
            }
        },
        watch: {
            leftMultipleSelection: {
                handler(newValue, oldValue){
                    debugger
                    // this.rightMultipleSelection = newValue
                }
            }
        },
        methods: { 
            leftSelectionChange(val){
                debugger
                this.leftMultipleSelection = val
                // 复制数据给右边表格
                this.tableDataRight = this.tableDataRight.concat(JSON.parse(JSON.stringify(this.leftMultipleSelection)))
                // 处理左边数据 
                this.tableDataLeft.forEach((item,index, arr) => {
                    this.leftMultipleSelection.forEach((val,i) => {
                        if(item.empNo === val.empNo){
                            arr.splice(index,1)
                        }
                    })
                })
                console.log(this.tableDataRight)
            },
            rightSelectionChange(val){
                this.rightMultipleSelection = val
            },
            // 右边table移除已选数据
            rightDetach() {
                if(!this.rightMultipleSelection.length){
                    this.$message({
                        type: 'warning',
                        message: '未选择要移除的数据'
                    })
                    return 
                }

                this.tableDataLeft = this.tableDataLeft.concat(JSON.parse(JSON.stringify(this.rightMultipleSelection)))

                // 处理右边table的数据
                this.tableDataRight.forEach((item,index, arr) => {
                    this.rightMultipleSelection.forEach((val,i) => {
                        if(item.empNo === val.empNo){
                            arr.splice(index,1)
                        }
                    })
                })
            },
            // 保存
            saveEmp() {

            },
            // 取消保存
            cancelEmp() {
                
            }
        }
    }
</script>

