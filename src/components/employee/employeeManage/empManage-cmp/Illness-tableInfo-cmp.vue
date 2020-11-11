<!--
  User: gaol
  Date: 2019/8/9
  功能： 在职员工页面的  [大病] 的 table 表格的数据展示
-->

<style lang="stylus" rel="stylesheet/stylus" scoped>

   
</style>
<template>
  <div class="illness-tableInfo-cmp" v-if="tableList && tableList.length">
      <!-- tableList: {{tableList}} -->
        <!--大病--start--->
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
        <!--大病--end--->

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
