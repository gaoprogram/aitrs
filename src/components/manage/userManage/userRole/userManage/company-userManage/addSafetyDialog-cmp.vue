<!--
  User: gaol
  Date: 2019/11/28
  功能：企业数据安全类型组列表组件 【企业】 【已废弃】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addSafetyCmp
    padding 10px 20px 20px 20px
</style>

<template>
    <div class="addSafetyCmp">
        <!-- tableData: {{tableData}} -->
        <div class="tableData" :class="tableData.length<=0? 'not_found':''" v-loading="loading">
            <el-table
                :data="tableData"
                border
                empty-text=" "
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>

                <el-table-column
                    prop="SecurityTypeGroupName"
                    label="数据安全类型组"
                >

                </el-table-column>

                <el-table-column
                    prop="Types"
                    label="数据安全类型"
                >
                    <template slot-scope="scope">
                        <!-- scope.row.Types: {{scope.row.Types}} -->
                        <div 
                            v-for="(item,key) in (scope.row.Types)"
                            :key="key"
                        >
                            {{item.SecurityTypeName}}
                        </div>
                    </template>
                </el-table-column>     

                <el-table-column
                    prop="Description"
                    label="描述"
                >

                </el-table-column>

                <el-table-column
                    prop="State"
                    label="状态"
                >
                    
                </el-table-column>                        
            </el-table>
        </div>

        <!--分页部分-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryObj.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="queryObj.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import SaveFooter from '@/base/Save-footer/Save-footer'
    import { 
        ComSecurityTypeGroupList,
        BatchAddSecurityTypeGroup
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            SaveFooter
        },
        data(){
            return {
                loading: false,
                tableData: [],
                total: 0,
                multipleSelection: [],
                queryObj: {
                    pageNum:1,
                    pageSize: 10
                }
            }
        },
        created(){
            this._getComTables()
        },
        computed: {

        },
        watch: {

        },
        methods: {
            _getComTables(){
                this._ComSecurityTypeGroupList()
            },
            // 获取table 列表数据
            _ComSecurityTypeGroupList(){
                this.loading = true
                ComSecurityTypeGroupList(this.cu,this.queryObj.pageSize, this.queryObj.pageNum).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.total = res.data.Total
                    }else {
                        this.$message.error(`获取列表数据失败,${res.data.Error}`)
                    }
                })
            },
            BatchAddSecurityTypeGroup(permissionPackageCode, strJson){
                debugger
                this.loading = true
                BatchAddSecurityTypeGroup(this.obj.PermissionPackageCode, JSON.stringify(this.multipleSelection)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("保存安全类型成功")
                        this.$emit("saveTypesInfoSuccess")
                    }else {
                        this.$message.error(`保存安全类型失败,${res.data.Error}`)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },            
            // 分页--每页多少条
            handleSizeChange (val) {
                this.queryObj.pageSize = val
                this._getComTables()
            },
            // 分页--当前页
            handleCurrentChange (val) {
                this.queryObj.pageNum = val
                this._getComTables()
            },
        }
    }
</script>

