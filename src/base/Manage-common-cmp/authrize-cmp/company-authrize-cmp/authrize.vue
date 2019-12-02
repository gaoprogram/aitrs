<!--
  User: gaol
  Date: 2019/11/20
  功能：用户管理中的 用户授权 组件【企业】
-->

<style lang="stylus" rel="stylesheet/stylus">

</style>

<template>
    <div class="userAuthrizeBox animated fadeIn">
        <!-- obj: {{obj}} -->
        <div class="userName">
            <h3>用户名:</h3>
            <span>{{obj.userName}}</span>
        </div>
        <!-- <div class="authrizeRole">
            <h3>授权角色</h3>
        </div> -->

        <!-- tableData: {{tableData}} -->
        <div :class="['tableBox',tableData.length<=0?'not_found':'']" v-loading="loading">
            <div class="marginB10">
                <el-button type="text" styl="color: #0000000">授权角色</el-button>
                <el-button 
                    class="rt"
                    type="primary" 
                    size="mini" 
                    @click.native="handlerAddRole">
                    <i class="el-icon el-icon-plus"></i>
                    角色
                </el-button>
            </div>
            <el-table
                border
                empty-text=" "
            >
                <el-table-column
                    label="角色名"
                >

                </el-table-column>

                <el-table-column
                    label="描述"
                >
                
                </el-table-column>

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click.native="handlerScan(scope.row)">
                            查看
                        </el-button>
                        <el-button type="text" size="mini" @click.native="handlerDelete(scope.row)">
                            删除
                        </el-button>                        
                    </template>
                </el-table-column>
            </el-table>

            <!--分页部分-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryObj.pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="queryObj.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryObj.total">
            </el-pagination>

        </div>

        <div class="addRoleBox" v-if="showAddRoleDialog">
            <el-dialog
                title="添加角色"
                width="40%"
                append-to-body
                :close-on-click-modal="false"
                :visible.sync="showAddRoleDialog"
            >
                <company-role-cmp 
                    @emitAddRole="emitAddRole"
                    @emitCancelRole="emitCancelRole"
                ></company-role-cmp>
            </el-dialog>
        </div>

        <div class="footerBox">
            <saver-footer 
                :saveBtnIsShow="false"
                cancelText="关闭"
                @save="save" 
                @cancel="cancel"
                ></saver-footer>
        </div>
    </div>
</template>

<script>
import SaverFooter from '@/base/Save-footer/Save-footer'
import CompanyRoleCmp from '@/base/Manage-common-cmp/addToRolegroup-cmp/company_roleSelect-cmp'
import { mapGetters } from 'vuex'
import { REQ_OK } from '@/api/config'
import {
    comUserRoleList,
    deleteComUserRole,
    comUserAddRole,
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
        SaverFooter,
        CompanyRoleCmp
    },
    data(){
        return {
            loading: false,
            tableData: [],
            showAddRoleDialog: false, 
            queryObj: {
                pageSize: 10,
                pageNum: 1,
                total: 0
            }
        }
    },
    computed: {
        ...mapGetters([
            'isCompanyOrSystemUser'
        ])
    },
    created(){
        this.$bus.$on("", ()=> {

        })

        this.$bus.$on("", () => {

        })

        this._getComTables()
    },
    beforeDestroy(){
        this.$bus.$off("")
        this.$bus.$off("")
    },
    methods: {
        _getComTables(){
            this._comUserRoleList()
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
        // 添加角色
        handlerAddRole(){
            this.showAddRoleDialog = true
        },     
        _comUserRoleList(){
            debugger
            this.loading = true
            comUserRoleList(JSON.stringify(this.obj)).then(res => {
                debugger
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.tableData = res.data.Data
                    this.queryObj.total = res.data.Total
                }else {
                    this.$message.error(`获取授权列表数据失败,${res.data.Error}`)
                }
            })
        },
        // 查看
        handlerScan(){

        },
        _deleteComUserRole(){
            this.loading = true
            deleteComUserRole().then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success("删除成功")
                    this._getComTables()
                }else {
                    this.$message.error(`删除失败,${res.data.Error}`)
                }
            })
        },
        // 删除
        handlerDelete(row){
            this.currentRowObj = row
            this.$confirm("确定要删除吗？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._deleteComUserRole()
            }).catch(() => {
                this.$message.info("删除已取消")
            })
        },
        // 添加
        _comUserAddRole(data){
            debugger
            this.loading = true
            comUserAddRole(JSON.stringify(data), JSON.stringify(this.obj)).then(res => {
                this.loading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this._getComTables()
                    this.showAddRoleDialog = false
                }else {
                    this.$message.error(`保存失败,${res.data.Error}`)
                }
            })            
        },
        // 确定
        save(){
            // this._comUserAddRole()
        },
        // 取消
        cancel(){
            this.$emit("closeAuthrizeDialog")
        },
        // 取消添加 角色
        emitCancelRole(){
            this.showAddRoleDialog = false
        },
        //确定添加角色
        emitAddRole(data){
            this.$confirm("确定要添加角色吗？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._comUserAddRole(data)
            }).catch(() => {
                this.$message.info("已取消")
            })
        },
    }
}
</script>
