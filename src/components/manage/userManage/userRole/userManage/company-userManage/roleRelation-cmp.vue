<!--
  User: gaol
  Date: 2019/11/28
  功能：平台系统设置——用户角色-角色管理  角色关系 组件 【企业】
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.roleRelationCmp
    padding 0 0 20px 0
    .item
        font-size 0
        .roleTit
            display inline-block
            width 70px
            height 20px
            font-weight bold
            line-height 20px
            font-size 14px
            color #606266
        .roleValue
            display inline-block
            font-size 12px
            margin-left 10px
</style>

<template>
    <div class="roleRelationCmp animated fadeIn" v-loading = "loading">
        <!-- obj: {{obj}} -->
        <div class="item">
            <span class="roleTit">角色名:</span>
            <span class="roleValue">{{obj.RoleName}}</span>
        </div>
        <div class="item">
            <span class="roleTit">角色类型:</span>
            <span class="roleValue" v-if="obj.RoleType == 2">企业自定义角色</span>
            <span class="roleValue" v-if="obj.RoleType == 1">系统角色</span>
        </div>        
        <div class="item">
            <span class="roleTit">角色编号:</span>
            <span class="roleValue">{{obj.RoleId}}</span>
        </div>    

        <div class="tableBox">
            <!-- roleOptions: {{roleOptions}}
            ---
            tableData: {{tableData}} -->
            <div style="text-align:right" class="marginB10">
                <el-button
                    type="primary"
                    size="mini"
                    @click.native="handlerAdd"
                >
                    新增
                </el-button>
                <el-button
                    :disabled="!multipleSelection.length"
                    type="primary"
                    size="mini"
                    @click.native="handlerBatchDelete"
                >
                    批量删除
                </el-button>                
            </div>
            <el-table
                border
                :data="tableData"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >

                </el-table-column>
                <el-table-column
                    label="角色"
                    prop="RightRoleName"
                >
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isEditing">
                            {{scope.row.RightRoleName}}
                        </span>

                        <div class="block" v-else>
                            <!-- <span class="demonstration">单选选择任意一级选项</span> -->
                            <el-cascader
                                v-model="scope.row.RightRoleId"
                                :options="roleOptions"
                                :props="{ checkStrictly: false }"
                                :show-all-levels="false"
                                clearable>
                            </el-cascader>
                        </div>                        
                        <!-- <el-select 
                            v-else
                            placeholder="请选择角色">
                            <el-option
                                v-for="(role, index) in roleOptions"
                                :key="index"
                                label="role.RightRoleId"
                            >
                            </el-option>
                        </el-select> -->
                    </template>
                </el-table-column>

                <el-table-column
                    label="关系"
                    prop="RelationType"
                >
                    <template slot-scope="scope">
                        <span 
                            v-if="!scope.row.isEditing">
                            <el-button 
                                size="mini"
                                type="text" 
                                v-if="scope.row.RelationType == 1">
                                依赖
                            </el-button>
                            <el-button 
                                size="mini"
                                type="text" 
                                v-if="scope.row.RelationType == 2">
                                互斥
                            </el-button>                            
                        </span>

                        <el-select 
                            v-else
                            v-model="scope.row.RelationType"
                            placeholder="请选择关系">
                            <el-option value="1" label="依赖"></el-option>
                            <el-option value="2" label="互斥"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <span v-if="!scope.row.isEditing">
                            <el-button 
                                type="primary" 
                                size="mini"
                                @click.native="handlerEdit(scope.row)">
                                编辑
                            </el-button>
                            <el-button 
                                type="danger" 
                                size="mini"
                                @click.native="handlerDelete(scope.row)">
                                删除
                            </el-button>   
                        </span>    

                        <span v-else>
                            <el-button
                                type="primary"
                                size="mini"
                                @click.native="handlerCancel(scope.row,scope.$index)"
                            >
                                取消
                            </el-button>
                           <el-button
                                type="primary"
                                size="mini"
                                @click.native="handlerSave(scope.row)"
                            >
                                保存
                            </el-button>                            
                        </span>                 
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
    </div>
</template>

<script type="text/ecmascript-6">
    import { REQ_OK } from '@/api/config'
    import { mapGetters } from 'vuex'
    import {
        compRoleRelate,
        saveComRoleRelate,
        batchDelComRoleRelate,
        getSelectCompRole
    } from '@/api/systemManage'
    export default {
        props: {
            obj: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            strFlag: {
                type: String,
                default: 'roleInfo'
            }
        },
        data(){
            return {
                loading: false, 
                multipleSelection: [],
                tableData: [],
                currentRowObj: {},
                roleOptions: [],  // 角色下拉框数据源
                queryObj: {
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                },
                isAdding: false, // 正在新增角色
            }
        },
        computed: {
            ...mapGetters([
                'companyCode',
            ])
        },
        created(){
            this._getComTables()
        },
        methods: {
            _getComTables(){
                this._compRoleRelate()
            },
            _initData(data){
                if(data && data.length){
                    data.forEach((item, key) => {
                        // 扩展一个 isEditing字段
                        this.$set(item, 'isEditing', false)
                        item.RelationType = '' + item.RelationType
                    })
                }
            },
            //获取角色关系table数据
            _compRoleRelate(roleId, pageSize, pageNum){
                this.loading = true
                compRoleRelate(this.obj.RoleId,this.queryObj.pageSize,this.queryObj.pageNum).then(res =>{
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.tableData = res.data.Data
                        this.queryObj.total = res.data.Total
                        this._initData(this.tableData)
                    }else {
                        this.$message.error(`获取角色关系列表数据失败,${res.data.Error}`)
                    }
                })
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
            _changeData(data){
                if(data && data.length){
                    data.forEach((item, key) => {
                        item.label = item.RoleGroupName
                        item.value = item.RoleGroupCode
                        if(item.Children && item.Children.length){
                            item.children = item.Children
                        }

                        if(item.Children && item.Children.length){
                            this._changeData(item.Children)
                        }else {
                            delete item.Children
                        }
                    })
                }
                return data
            },           
            // 获取角色下拉框数据源
            _getSelectCompRole(roleName, roleGroupCode, state = 1){
                debugger
                getSelectCompRole(this.obj.RoleName, this.obj.RoleId, 1).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.roleOptions = res.data.Data
                        // 处理option 数据
                        this.roleOptions = this._changeData(this.roleOptions)
                    }else {
                        this.$message.error(`获取角色下拉框数据源失败,${res.data.Error}`)
                    }
                })
            },
            // 编辑
            handlerEdit(row){
                this.currentRowObj = row
                if(row.hasOwnProperty("isEditing")){
                    row.isEditing = true
                }else {
                    this.$set(row, 'isEditing', true)
                }
                this.isAdding = true
                // 获取角色下拉框数据源
                this._getSelectCompRole()
            },
            _batchDelComRoleRelate(data){
                this.loading = true
                batchDelComRoleRelate(JSON.stringify(data)).then(res => {
                    this.loading = false
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("删除成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`删除失败,${res.data.Error}`)
                    }
                }).catch(() => {
                    this.$message.warning("删除失败")
                })
            },
            //删除
            handlerDelete(row){
                this.currentRowObj = row
                this.$confirm("确定要删除吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this._batchDelComRoleRelate([this.currentRowObj])
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            // 批量删除
            handlerBatchDelete(){
                debugger
                if(!this.multipleSelection.length){
                    this.$message.warning("请先选择批量删除的行")
                    return
                }
                this.$confirm("确定要批量删除吗？","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {
                    this._batchDelComRoleRelate(this.tableData)
                }).catch(() => {
                    this.$message.info("删除已取消")
                })
            },
            // 新增
            handlerAdd(){
                debugger
                if(!this.isAdding){
                    this.isAdding = true
                    this._getSelectCompRole()
                    this.tableData.push({
                        Id: 0,
                        CompanyCode: this.companyCode,
                        LeftRoleId: this.obj.RoleId,
                        RelationType:"",
                        RightRoleId:"",
                        isEditing: true,
                        isNewAddLine: true
                    })
                    this.currentRowObj = this.tableData[this.tableData.length-1]
                    debugger
                }else {
                    this.$message.warning("有新增角色未保存,请处理完后再新增")
                }
            },
            // 编辑取消
            handlerCancel(row,index){
                this.currentRowObj = row
                if(row.hasOwnProperty("isEditing")){
                    row.isEditing = false
                }else {
                    this.$set(row, 'isEditing', false)
                }
                if(row.isNewAddLine){
                    this.tableData.splice(index,1)
                }
                this.isAdding = false
            },
            _saveComRoleRelate(){
                debugger
                if(this.currentRowObj.RightRoleId && this.currentRowObj.RightRoleId.length){
                    let length = this.currentRowObj.RightRoleId.length
                    this.currentRowObj.RightRoleId = this.currentRowObj.RightRoleId[length-1]
                }
                
                saveComRoleRelate(JSON.stringify(this.currentRowObj)).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.isAdding = false
                        this.$message.success("保存成功")
                        this._getComTables()
                    }else {
                        this.$message.error(`保存失败,${res.data.Error}`)
                    }
                })
            },
            // 编辑保存
            handlerSave(){
                debugger
                if(!this.currentRowObj.RightRoleId.length || !this.currentRowObj.RelationType){
                    this.$message.warning("角色/关系不能为空,请先选择")
                    return
                }
                this._saveComRoleRelate()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>

