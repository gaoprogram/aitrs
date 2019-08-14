<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面的 [银行信息] table 表格的数据展示
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       
</style>
<template>
    <div>
        <el-button @click="change">测试按钮</el-button>
        <el-table
                :data="tableData"
                class="tb-edit"
                border
                style="width: 100%">
            <el-table-column  
                        v-for="(item,key) in tableHead" 
                        :key="key"
                        :label="item.label" 
                        :property="item.property"
                        width="180">
                <template slot-scope="scope">
                    <!-- scope: {{scope}} -->
                    <span>scope:{{scope.row[scope.column.property]}}</span>
                    <!-- <span>scope:{{scope.row}}</span>
                    <span>scope:{{scope.column}}</span> -->
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    // import {example1, example2} from './columns';

// 表头1
let example1=[
    {
        label:'姓名',
        property:'name'
    },{
        label:'地址',
        property:'address'
    }
]

// 表头2
let example2=[
    {
        label:'姓名',
        property:'name'
    },{
        label:'地址',
        property:'address'
    },{
        label:'日期',
        property:'date'
    }
]
 
 

    export default {
        name:'ruleTable',
        data() {
            return {
                // 表头
                tableHead:example1,
                // 数据值
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎6666',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎45',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎333',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎222',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            change(){
                this.tableHead = example2;
            }
        }
    }
</script>
