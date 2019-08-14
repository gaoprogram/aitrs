<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面的 [银行信息] table 表格的数据展示
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

       

</style>
<template>
  <div class="bank-tableInfo-cmp" v-if="tableList && tableList.length" v-loading="loading">
      <!-- tabList: {{tabList}} -->
        <!--在职记录--start--->
        <template >
            <el-table
                :data="tableList"
                height="250"
                border
                style="width: 100%">
                
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table> 
        </template>  
        <!--在职记录--end--->

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
        tableList: {
            type: Array,
            default: () => {
                return [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ]
            }
        }
    },
    data(){
        return {
            loading: false
        }
    },
    created() {
        debugger
        console.log(this.tableList)
    },
    methods: {

    }
  }
</script>
