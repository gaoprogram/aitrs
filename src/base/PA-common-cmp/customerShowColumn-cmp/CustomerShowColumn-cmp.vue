<!--
  User: gaol
  Date: 2019/10/06
  功能： 自定义显示列 组件
--->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.customerShowColumn-cmp
    padding 20px 
    box-sizing border-box
    .titBox
        width 100%
        line-height 30px
        padding 10px 0
        box-sizing border-box
        .tit   
            font-size 18px
            color #000000
            font-weight bold 
            padding 0 0 10px 0
            box-sizing border-box
        &:after
            display block
            content ''
            width 100%
            height 0
            border-bottom 1px solid silver
    .box-card-left
    .box-card-right
        .header
        .list
            .rightItem
                .el-menu
                    // display flex
                    // justify-content flex-start
                    // margin 5px 0
                    // line-height 56px
                    .el-menu-item
                        width 100%

</style>

<template>
    <div class="customerShowColumn-cmp" v-loading = 'loading'>
        <div class="titBox">
            <p class="tit">{{title}}</p>
        </div>

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
                                v-for="(item,key) in tableHead" 
                                :key="key"
                                :property="item.property"
                                :fixed="key === 0"
                                >
                                <template slot-scope="scope">
                                    <!-- scope: {{scope}} -->
                                    <span>{{scope.row[scope.column.property]}}</span>
                                    <!-- <span>scope:{{scope.row}}</span>
                                    <span>scope:{{scope.column}}</span> -->
                                </template>                                
                            >

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
                    <div slot="header" class="clearfix header">
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
                        <vuedraggable 
                            class="wrapper" 
                            v-model="tableDataRight"  
                            :options = "{animation:500}"
                        >
                            <transition-group>
                                <div 
                                    class="rightItem"
                                    v-for="(item, index) in tableDataRight" 
                                    :key="index+1"
                                >
                                    <el-menu>
                                        <el-menu-item class="clearfix">
                                            <span><i class="el-icon-menu"></i></span>
                                            <span>{{item.empName}}</span>
                                            <span class="rt">
                                                <template prop="item">
                                                    <el-button type="primary" size="mini" @click.native="handleFreeze">
                                                        冻结
                                                    </el-button>
                                                </template>
                                                <template prop="item">
                                                    <el-button type="warning" size="mini" @click.native="handleDelete">
                                                        移除
                                                    </el-button>
                                                </template>                                                
                                            </span>                                            
                                        </el-menu-item>
                                    </el-menu>

                                </div>
                            </transition-group>              
                        </vuedraggable>
                    </div>
                </el-card>
            </el-col>
            <!---right部分---END-->
        </el-row>   

        <div class="footerBox">
            <save-footer @save="save" @cancel="cancel"></save-footer>
        </div>     
    </div>
</template>

<script>
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import Vuedraggable from 'vuedraggable'
    let example1=[
        // {
        //     label: '工号',
        //     property: 'empNo'
        // },
        {
            label:'姓名',
            property: 'empName'
        },
        // {
        //     label:'地址',
        //     property:'address'
        // }
    ]

    export default {
        props:{
            // 标题
            title:{
                type: String,
                default: '设置表头字段'
            },
            // 表头
            tableHeadProp: {
                type: Array,
                default: () => {
                    return example1
                }
            }          
        },
        components: {
            SaveFooter,
            Vuedraggable
        },
        data(){
            return {
                loading: false, // 控制loading的显示/隐藏
                tableHead: this.tableHeadProp, 
                tableDataLeft: [
                    {
                        // empNo: '1001',
                        empName: '张三',
                        // status: '在职'
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

        },
        methods: { 
            // 勾选左边的数据
            leftSelectionChange(val){
                debugger
                this.leftMultipleSelection = val
                 // 复制数据给右边表格
                this.tableDataRight = this.tableDataRight.concat(JSON.parse(JSON.stringify(this.leftMultipleSelection)))

            },
            // 勾选右边的数据
            rightSelectionChange(val){
                this.rightMultipleSelection = val
            },
            //保存
            save(){

            },
            // 取消
            cancel(){

            },
            // 冻结
            handleFreeze(){
                this.$confirm("确定要冻结吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    // 调接口 进行 冻结操作

                }).catch(() => {
                    // 取消
                    this.$message({
                        type: 'info',
                        message: '取消冻结成功'
                    })
                })
            },
            // 移除
            handleDelete(){
                this.$confirm("确定要移除吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    // 调接口 进行 移除 操作

                }).catch(() => {
                    // 取消
                    this.$message({
                        type: 'info',
                        message: '已取消移除成功'
                    })
                })                
            }
        }
    }
</script>

