
<!--
  User: gaol
  Date: 2019/10/14
  功能： 版本-模块版本设置组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

<template>
    <div class="versionSet-cmp">
        版本设置

        <div class="top clearfix marginB10">
            <el-button 
            style="float:right"
            type="primary" 
            size="mini">新增</el-button>
        </div>
        <!----组织---start-->
        <div v-if="currentSetStr === 'org'">
            <el-table
                :data="tableData"
                style="width: 100%"
                border
            >
                <el-table-column
                    prop="versionType"
                    label="版本类型"
                >
                    
                </el-table-column>

                <el-table-column
                    prop="rakeRate"
                    label="月标准价"
                >

                </el-table-column>         

                <el-table-column
                    prop="peopleRate"
                    label="月人均价"
                >

                </el-table-column>                      


                <el-table-column
                    prop="tip"
                    label="描述"
                >

                </el-table-column> 

                <el-table-column
                    prop="status"
                    label="状态"
                >

                </el-table-column>                 


                <el-table-column
                    prop="creatTime"
                    label="创建日期"
                >

                </el-table-column>  

                <el-table-column
                    prop="refreshTime"
                    label="更新日期"
                >

                </el-table-column>  


                <el-table-column
                    label="操作"
                    width="300"
                >
                    <template slot-scope>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">启用</el-button>
                        <el-button type="text">停用</el-button>
                        <el-button type="text">价格折扣</el-button>
                        <el-button type="text">权限</el-button>
                    </template>
                </el-table-column> 
            </el-table>
        </div>
        <!----组织---end-->


    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
        currentSetStr: {
            type: String,
            default: ''
        },
        tableData: {
            type: Array,
            default: () => {
                return [
                    {
                        versionType: '初级版',
                        rakeRate: '1-500人，2000',
                        peopleRate: '1-500人，200',
                        tip: '描述内容',
                        status: '停用',
                        creatTime: '2019-09-09',
                        refreshTime: '2019-08-08'
                    },
                    {
                        versionType: '中级版',
                        rakeRate: '1-500人，2500',
                        peopleRate: '1-500人，300',
                        tip: '描述内容',
                        status: '启用',
                        creatTime: '2019-09-09',
                        refreshTime: '2019-08-08'
                    }                    
                ]
            }
        }   
    }
  }
</script>

