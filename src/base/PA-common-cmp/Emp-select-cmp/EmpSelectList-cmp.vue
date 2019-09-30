<!--
  User: gaol
  Date: 2019/9/30
  功能： 员工人员选择器组件
--->

<style lang="stylus" rel="stylesheet/stylus" scoped>
.empSelectList-cmp
    .selectedEmpList
        display flex
        justify-content flex-start
        align-items center
        align-content center
        flex-direction row
        flex-wrap wrap
        .item
            position relative
            padding 10px
            box-sizing border-box
            border-radius 5px
            background-color #F4F4F5
            margin 3px
            .name
                font-size 12px
                color #909399
            .icon
                position absolute
                top -5px
                right -5px
                font-size 14px
                &:hover
                    cursor pointer
                    color red
                    transform rotate(-180deg)
                    transition all .5s

</style>

<template>
    <div class="empSelectList-cmp">
        <el-button type="text" @click.native="clickSelectEmpBtn">选择人员</el-button>
        <ul class="selectedEmpList">
            <li 
                class="item"
                v-for="(item,index) in empList" 
                :key="index"
            >
                <span class="name">
                    {{item.Name}} [{{item.EmpId}}]
                </span>
                <i class="icon el-icon-close" @click="deleteEmp(index)"></i>
            </li>
        </ul>

        <!---引入员工选择器组件--start-->
        <div class="empSelectCmp" v-if="showEmpSelectCmp">
            <el-dialog
                title="员工选择"
                :visible.sync="showEmpSelectCmp"
                append-to-body
                width="80%"
            >
                <emp-select-cmp 
                    v-if="showEmpSelectCmp"
                    @saveEmp="saveEmp" 
                    @cacelEmp="cancelEmp">
                </emp-select-cmp>
            </el-dialog>
        </div>
        <!----引入员工选择器组件----end--->
    </div>
</template>

<script>
    import EmpSelectCmp from './EmpSelect-cmp'
    export default {
        props: {
            // empList: {
            //     type: Array,
            //     default: () => {
            //         return []
            //     }
            // }
        },
        components: {
            EmpSelectCmp
        },
        data(){
            return {
                showEmpSelectCmp: false, // 控制 员工选择器组件的显示/隐藏
                // 已选员工列表
                empList: [
                    {
                        Name: "张三",
                        EmpId: 1001,
                    },
                    {
                        Name: "李四",
                        EmpId: 1002,
                    },
                    {
                        Name: "王五",
                        EmpId: 1003,
                    },
                                        {
                        Name: "小名",
                        EmpId: 1004,
                    }                                        
                ],  
            }
        },
        methods:{
            // 删除员工
            deleteEmp(idx){
                this.$confirm("确定要删除此员工吗?","提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 确定删除

                }).catch(() => {
                    //取消删除
                    this.$message({
                        type: "info",
                        message: "您已成功取消删除"
                    })
                })
            },
            // 点击选择员工btn
            clickSelectEmpBtn(){
                this.showEmpSelectCmp = true
            },
            // 确定选取员工
            saveEmp() {

            },
            // 取消选取员工
            cancelEmp(data){

            }

        }
    }
</script>

