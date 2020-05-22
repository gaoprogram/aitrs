
<!--
  User: gaol
  Date: 2019/8/7
  功能： 月数等级组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="monthLever-cmp">
        月数等级
        <el-table
            :data="tableData"
            style="width: 100%"
            border
        >
            <el-table-column
                prop="larger"
                label="大于等于月数"
            >
                
            </el-table-column>

            <el-table-column
                prop="smaller"
                label="小于月数"
            >

            </el-table-column>           

            <el-table-column
                label="操作"
            >
                <template slot-scope>
                    <el-button type="text">编辑</el-button>
                    <el-button type="text">增加行</el-button>
                </template>
            </el-table-column> 
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [
                    {
                        larger: 5,
                        smaller: 1
                    },
                    {
                        larger: 10,
                        smaller: 4
                    }                    
                ]
            }
        }   
    }
  }
</script>

