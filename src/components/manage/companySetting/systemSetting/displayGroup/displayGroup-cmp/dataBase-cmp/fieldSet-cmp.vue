<!--
  User: gaol
  Date: 2019/8/7
  功能：数据库表——字段设置 组件
-->
<style lang="stylus" ref="stylesheet/stylus" scoped>
.fieldSet
  padding 0 20px
  box-sizing border-box
</style>
<template>
    <div class="fieldSet" >
        <div class="topBox marginB10">
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerAddField"
            >添加字段</el-button>
            <el-button 
                type="primary" 
                size="mini"
                @click.native="handlerBatch(1)"
            >批量启用</el-button>
            <el-button 
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
            <el-table
                border
                max-height="500px"
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
                    prop="dataCode"
                >
                    <template slot-scope="scope">
                    <span>{{scope.row.dataCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="项名"
                    prop="dataName"
                >
                    <template slot-scope="scope">
                    <span>{{scope.row.dataName}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    label="字段属性"
                    prop="status"
                >

                </el-table-column>      

                <el-table-column
                    label="自定义字段名"
                    prop="status"
                >

                </el-table-column>   

                <el-table-column
                    label="系统字段名"
                    prop="status"
                >

                </el-table-column>   

                <el-table-column
                    label="描述"
                    prop="status"
                >

                </el-table-column>        

                <el-table-column
                    label="状态"
                    prop="status"
                >

                </el-table-column>                                  

                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                    <el-button type="text">启用</el-button>
                    <el-button type="text">停用</el-button>
                    <el-button 
                        @click.native="handlerEditField"
                        type="text"
                        >编辑</el-button>
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
                width="50%"
                :visible.sync="showAddField"
                append-to-body
                :close-on-click-modal="false"
            >
                新增字段
            </el-dialog>
        </div>
        <!--新增字段end-->

        <!--编辑字段start--->
        <div class="editFieldBox" v-if="showEidtField">
            <el-dialog
                title="编辑字段"
                width="50%"
                :visible.sync="showEidtField"
                append-to-body
                :close-on-click-modal="false"
            >
                编辑字段
            </el-dialog>
        </div>
        <!--编辑字段end-->    

        <!--字段排序start--->
        <div class="fieldSortBox" v-if="showSortField">
            <el-dialog
                title="字段排序"
                width="50%"
                :visible.sync="showSortField"
                append-to-body
                :close-on-click-modal="false"
            >
                字段排序
            </el-dialog>
        </div>
        <!--字段排序end-->               
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        loading: false, // loading 状态
        showAddField: false, // 添加字段
        showEidtField: false, // 编辑字段
        showSortField: false, // 字段排序
        multipleSelection: [],
        queryObj: {
            pageSize: 10,
            pageNum: 1,
            total: 0
        },
        tableData: [
          {
            dataCode: '234-89htttts',
            dataName: '组织基本信息',
            status: '启用'
          },
          {
            dataCode: 'yyyyy-hhhh',
            dataName: '组织基本信息',
            status: '停用'
          },          
        ]
      }
    },
    methods: {
        _getCommTables(){

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
            this.showAddField = true
        },
        // 编辑字段
        handlerEditField(){
            this.showEidtField = true
        },
        handlerSort(){
            this.showSortField = true
        },
        // 批量启用/停用
        handlerBatch(type){
            if(type==0){
                this.$confirm("","提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(res => {

                }).catch(() => {
                    this.$message.info('已取消')
                })
            }
        }
    }
  }
</script>

