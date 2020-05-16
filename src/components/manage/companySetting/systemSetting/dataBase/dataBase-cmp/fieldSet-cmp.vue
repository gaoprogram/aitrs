<!--
  User: gaol
  Date: 2019/8/7
  功能：数据库表——字段设置 组件
-->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.fieldForm
    .el-form-item
        margin-bottom 0px !important
    .topBox
        padding 0px 20px 20px 20px !important
        box-sizing border-box
.fieldSet
  padding 0 20px
  box-sizing border-box
.cust-addcard
    .el-dialog__body
        min-height 200px
</style>
<template>
    <div class="fieldSet" v-loading = "fullLoading">
        <!-- obj: {{obj}} -->
        <!-- <div class="tabBox">
            <el-tabs v-model="activeTabs" type="card" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            </el-tabs>            
        </div> -->
        <div class="topBox marginB10 clearfix" style="text-align:right">
            <el-checkbox
                style="float: left"
                v-model="isStop"
            >
                停用
            </el-checkbox>
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerAddField"
            >添加字段</el-button>
            <el-button 
                :disabled="!multipleSelection.length"
                v-if="isStop"
                type="primary" 
                size="mini"
                @click.native="handlerBatch(1)"
            >批量启用</el-button>
            <el-button 
                :disabled="!multipleSelection.length"
                v-if="!isStop"
                type="primary" 
                size="mini"
                @click.native="handlerBatch(0)"
            >批量停用</el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerSort"
            >字段排序</el-button>
        </div>
        <div 
            :class="['tableBox', tableData.length<=0? 'not_found':'']"
            v-loading="loading"
        >
            <!-- tableData: {{tableData}} -->
            <el-table
                border
                max-height="600px"
                :data="tableData"
                empty-text=" "
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="50"
                >
                </el-table-column>

                <el-table-column
                    label="项码"
                    sortable
                    show-overflow-tooltip
                    prop="FieldCode"
                >
                    <template slot-scope="scope">
                    <span>{{scope.row.FieldCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="项名"
                    show-overflow-tooltip
                    sortable
                    prop="FieldName"
                >
                    <template slot-scope="scope">
                    <span>{{scope.row.FieldName}}</span>
                    </template>
                </el-table-column>  

                <el-table-column
                    label="自定义字段名"
                    prop="FieldName"
                    show-overflow-tooltip
                    sortable
                >

                </el-table-column>   

                <el-table-column
                    label="系统字段名"
                    prop="SysName"
                    show-overflow-tooltip
                    sortable
                >

                </el-table-column>   

                <el-table-column
                    label="系统配置"
                    prop="IsSys"
                    show-overflow-tooltip
                    sortable
                >
                    <template slot-scope="scope">
                        <span style="color: #67C23A" v-if="scope.row.IsSys == 0">
                            否
                        </span>
                        <span style="color: #409EFF" v-if="scope.row.IsSys == 1">
                            是
                        </span>                        
                    </template>
                </el-table-column>    


                <el-table-column
                    label="描述"
                    prop="Tips"
                    show-overflow-tooltip
                >

                </el-table-column>        

                <el-table-column
                    label="状态"
                    prop="State"
                    sortable
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.State == 0">
                            停用
                        </span>
                        <span v-if="scope.row.State == 1">
                            启用
                        </span>                        
                    </template>
                </el-table-column>                                  

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button 
                            v-if="scope.row.State == 0"
                            type="text"
                            size="mini"
                            @click.native="handlerUseing(scope.row, 1)"
                        >启用</el-button>
                        <el-button 
                            v-if="scope.row.State == 1"
                            type="text"
                            size="mini"
                            @click.native="handlerUseing(scope.row, 0)"
                        >停用</el-button>
                        <!-- <el-button 
                            @click.native="handlerEditField(scope.row)"
                            type="text"
                            size="mini"
                        >编辑</el-button>
                        <el-button 
                            @click.native="handlerDeleteField(scope.row)"
                            type="text"
                            size="mini"
                        >删除</el-button>                             -->
                    </template>
                </el-table-column>   
            </el-table>
            <!--分页部分--start--->
            <div class="pagination-container">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="queryObj.pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="queryObj.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryObj.total">
                </el-pagination>
            </div>
            <!---分页部分--end--->   
        </div>
     
        <!--新增字段start--->
        <div class="addFieldBox" v-if="showAddField">
            <el-dialog
                title="新增字段"
                fullscreen
                :visible.sync="showAddField"
                append-to-body
                class="cust-addcard"
                :close-on-click-modal="false"
            >
                <fieldset-add-cmp
                    ref="fieldSetAddCmp"
                    :obj="obj"
                    @emitSaveField="emitSaveField"
                    @emitCancelField="emitCancelField"
                >
                </fieldset-add-cmp>
            </el-dialog>
        </div>
        <!--新增字段end-->   

        <!--字段排序start--->
        <div class="fieldSortBox" v-if="showSortField">
            <!-- <el-dialog
                title="字段排序"
                width="50%"
                :visible.sync="showSortField"
                append-to-body
                :close-on-click-modal="false"
            > -->
            <atris-drawer-cmp
                v-if="showSortField"
                tit="字段排序"    
                :dialog.sync="showSortField"    
                :showFooterBox="false"    
            >              
                <field-sort-cmp
                    slot="container-slot"
                    :propState="queryObj.state"
                    :obj="obj"
                    @emitSaveFieldSort="emitSaveFieldSort"
                    @emitCancelFieldSort="emitCancelFieldSort"
                ></field-sort-cmp>
            <!-- </el-dialog> -->
            </atris-drawer-cmp>
        </div>
        <!--字段排序end-->               
    </div>
</template>

<script type="text/ecmascript-6">
  import { 
      REQ_OK
   } from '@/api/config'
   import FieldsetAddCmp from './fieldsetAdd-cmp'
   import FieldSortCmp from './fieldSort-cmp'
   import SaveFooter from '@/base/Save-footer/Save-footer'
   import {
       CompFieldList,
       SelectCompField,
       AddComTableField,
       SetComTableFieldState,
       SaveFieldList,
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
        FieldsetAddCmp,
        FieldSortCmp,
        SaveFooter
    },
    data(){
      return {
        fullLoading: false, 
        loading: false, // loading 状态
        isStop: false, 
        showAddField: false, // 添加字段
        showEidtField: false, // 编辑字段
        isAddOrEidtField: 0, // 0 编辑 1 新增
        showSortField: false, // 字段排序
        multipleSelection: [],
        currentRowObj: {},
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
            state: 1  //状态，0停用 默认1启用
        },
        tableData: []
      }
    },
    watch: {
        isStop:{
            handler(newValue, oldValue){
                if(newValue){
                    this.queryObj.state = 0
                    this.queryObj.pageNum = 1
                }else {
                    this.queryObj.state = 1
                    this.queryObj.pageNum = 1
                }
                this._getCommTables()
            }
        }
    },
    created(){
        this._getCommTables('' , this.obj.TableCode, this.queryObj.state, this.queryObj.pageSize, this.queryObj.pageNum)
    },
    methods: {
        _getCommTables(){
            this._CompFieldList('' , this.obj.TableCode, this.queryObj.state, this.queryObj.pageSize, this.queryObj.pageNum)
        },
        // 列表获取数据
        _CompFieldList(teamCode, tableCode, state, pageSize, pageNum){
            this.loading = true
            CompFieldList('', tableCode, state, pageSize, pageNum).then(res => {
               this.loading = false
               if(res && res.data.State === REQ_OK){
                   this.tableData = res.data.Data
                   this.queryObj.total = res.data.Total
               }else {
                   this.$message.error(`获取列表数据失败,${res.data.Error}`)
               }
            }) 
        },
        handleSelectionChange(val){
            this.multipleSelection = val
        },
        // 分页--一页展示多少条
        handleSizeChange (val) {
            this.queryObj.pageSize = val
            this._getCommTables()
        },
        // 分页--上一页，下一页
        handleCurrentChange (val) {
            this.queryObj.pageNum = val
            this._getCommTables()
        },            
        // 添加字段
        handlerAddField(){
            this.isAddOrEidtField = 1
            // this.currentEditRowObj = {...row}            
            this.showAddField = true
        },
        // 编辑字段
        handlerEditField(row){
            debugger
            this.isAddOrEidtField = 0
            this.currentEditRowObj = {...row}
            this.showEidtField = true
        },
        _DeleteComField(fieldCode, teamCode){
            this.loading = true
           DeleteComField(fieldCode, teamCode).then(res => {
               this.loading = false
               if(res && res.data.State === REQ_OK){
                   this.$message.success("删除成功")
                   this._getCommTables()
               }else {
                 this.$message.error(`删除失败,${res.data.Error}`)
               }
           }) 
        },
        // 删除字段
        handlerDeleteField(row){
            debugger
            this.currentRowObj = {...row}
            this.$confirm(`确认要删除"${row.FieldName}"吗？`,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._DeleteComField(this.currentRowObj.FieldCode, this.currentRowObj.TeamCode)
            }).catch(() => {
                this.$message.info(`删除已取消`)
            })
        },
        // 排序
        handlerSort(){
            this.showSortField = true
        },
        //设置状态
        _SetComTableFieldState(state, data, tableCode){
            let text = state == 0? '停用':'启用'
            SetComTableFieldState(state, JSON.stringify(data),this.obj.TableCode).then(res => {
               this.loading = false
               if(res && res.data.State === REQ_OK){
                   this.$message.success(`${text}成功`)
                   this._getCommTables()
               }else {
                   this.$message.error(`获取列表数据失败,${res.data.Error}`)
               }
            })             
        },
        // 启用/停用
        handlerUseing(row, type){
            debugger
            this.currentRowObj = row
            let text = type == 0 ? '停用':'启用'
            this.$confirm(`确认要${text}"${row.FieldName}"吗？`,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetComTableFieldState(type, [this.currentRowObj])
            }).catch(() => {
                this.$message.info(`${text}已取消`)
            })
        },
        // 批量启用/停用
        handlerBatch(type){
            let text = type == 0 ? '批量停用':'批量启用'
            let str = ''
            if(this.multipleSelection.length){
                this.multipleSelection.forEach((item, key) => {
                    if(key != (this.multipleSelection.length-1)){
                        str += item.FieldName + ','
                    }else {
                        str += item.FieldName
                    }
                })
            }
            this.$confirm(`确认要${text}"${str}"吗？`,'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this._SetComTableFieldState(type, this.multipleSelection)
            }).catch(() => {
                this.$message.info(`${text}已取消`)
            })
        },
        // 字段选择器添加字段保存
        _AddComTableField(data){
            debugger
            this.fullLoading = true
            AddComTableField(this.obj.TableCode, JSON.stringify(data)).then(res => {
                debugger
                this.fullLoading = false
                if(res && res.data.State === REQ_OK){
                    this.$message.success("保存成功")
                    this.closeDialog()
                    this._getCommTables()
                }else {
                    this.$message.error(`保存失败，${res.data.Error}`)
                }
            })
        },
        emitSaveField(obj){
            debugger
            this._AddComTableField(obj)
        },
        emitCancelField(){
            this.closeDialog()
        },
        // 保存数据库字段排序
        handleSaveGroupSort (arr) {
            debugger
            arr.forEach((item,key) => {
                item.SortId = key+1
            })            
            SaveFieldList(JSON.stringify(arr), '', this.obj.TableCode).then(res => {
                if (res.data.State === REQ_OK) {
                    this.$message.success('保存分组排序成功')
                    this.showSortField = false
                    this._getCommTables()
                } else {
                    this.$message.error(`保存分组排序失败,${res.data.Error}`)
                }
            })
        },     
        emitSaveFieldSort(arr){
            debugger
            this.handleSaveGroupSort(arr)
        },
        emitCancelFieldSort(){
            this.showSortField = false
        },
        closeDialog(){
            if(this.isAddOrEidtField == 0){
                // 编辑
                this.showEidtField = false
            }else {
                // 新增
                this.showAddField = false
            }            
        },
        closeAddDialog(){
            this.showAddField = false
        },
        addFieldSuccess(){
            this._getCommTables()
        },
    }
  }
</script>

