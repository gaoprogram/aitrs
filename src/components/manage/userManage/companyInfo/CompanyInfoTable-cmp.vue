<!--
  User: gaol
  Date: 2019/6/2
  功能：管理--平台系统设置-企业信息table组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
// .companyInfo
//   padding 0 20px
//   box-sizing border-box
</style>

<template>
    <div class="companyInfoCmp">
      <div class="customerVersion">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
          <el-tab-pane label="激活" name="first">激活</el-tab-pane>
          <el-tab-pane label="冻结" name="second">冻结</el-tab-pane>
          <el-tab-pane label="全部" name="third">全部</el-tab-pane>
        </el-tabs>

        <div class="topBox clearfix marginB10">
          <el-button 
            style="float:right;margin-left: 10px"
            type="primary" 
            size="mini"
            @click.native="handlerAdd"
            >新增</el-button>
          <el-button 
            style="float:right"
            type="primary" 
            size="mini">导出</el-button>
        </div>

        <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading="loading">
            tableData: {{tableData}}
          <el-table
            :data="tableData"
            border
            empty-text=" "
            @cell-click="clickCompanyName"
          >

            <el-table-column
              type="selection"
              width="50"
            >
            </el-table-column>

            <el-table-column
              prop="CompanyCode"
              label="企业号"
            >
            </el-table-column>

            <el-table-column
              prop="CompanyNameCn"
              label="企业名称"
            >
            </el-table-column>   

            <el-table-column
              prop="Province"
              label="所属省份"
            >
            </el-table-column>       

            <el-table-column
              prop="City"
              label="所属城市"
            >
            </el-table-column>   

            <el-table-column
              prop="Area"
              label="所属区域"
            >
            </el-table-column>         

            <el-table-column
              prop="Created"
              label="创建日期"
            >
                <template slot-scope="scope">
                    <span>
                        {{  scope.row.Created | replaceTime }}
                    </span>
                </template>
            </el-table-column>  

            <el-table-column
              prop="Updated"
              label="更新日期"
            >
                <template slot-scope="scope">
                    <span>
                        {{  scope.row.Updated | replaceTime }}
                    </span>
                </template>            
            </el-table-column>   

            <el-table-column
              prop="CompanyType"
              label="企业类型"
            >
            </el-table-column>    

            <el-table-column
              prop="BusinessType"
              label="商业类型"
            >
            </el-table-column>    

            <el-table-column
              prop="CompanyLevel"
              label="企业等级"
            >
            </el-table-column>    

            <el-table-column
              prop="NatureType"
              label="企业性质"
            >
            </el-table-column>  

            <el-table-column
              prop="CompanyScope"
              label="企业规模"
            >
            </el-table-column>      

            <el-table-column
              prop="State"
              label="状态"
            >
            </el-table-column>                                                

            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click.native="handlerEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="mini" @click.native="handlerActive(scope.row)">激活</el-button>
                <el-button type="text" size="mini" @click.native="hanlderVertion(scope.row)">版本</el-button>
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
            :total="total">
          </el-pagination>                              
        </div>
      </div>  

      <div class="dialogBox" v-if="showDialog">
        <el-dialog
            :title="dialogTit"
            width="50%"
            :visible.sync="showDialog"
            append-to-body
            :close-on-click-modal="false"
        >
            <company-info-dialog-cmp
                :obj="currentRowObj"
                @saveSuccess="saveSuccess"
                @cancelSave="cancelSave"
            ></company-info-dialog-cmp>
        </el-dialog>
      </div>    
    </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { getSysCompany } from '@/api/systemManage'
  import CompanyInfoDialogCmp from './CompanyInfoDialog-cmp'
export default {
    components: {
        CompanyInfoDialogCmp
    },
    data(){
      return {
        loading: false,
        activeName: 'first',
        tableData: [],
        total: 0,
        queryObj: {
            pageSize: 10,
            pageSize: 1,
            companyNo: '',
        },
        showDialog: false,  
        dialogTit: '', 
      }
    },
    methods: {
        _getComTables(){
            this.getCompanyInfo()
        },
        getCompanyInfo(){
            debugger
            getSysCompany(this.queryObj.companyNo).then(res => {
                if(res && res.data.State === REQ_OK){
                    this.tableData = res.data.Data
                    this.total = res.data.DataCount
                }else {
                    this.$message.error(`获取企业信息失败,${res.data.Error}`)
                }
            }).catch(() => {

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
        // 切换tabs
        handleClickTabs(tab, event){

        },
        // 点击 企业名称
        clickCompanyName(row, column, cell, event){
            debugger
        },
        // 编辑
        handlerEdit(row){
            this.currentRowObj = row
            this.dialogTit = '编辑'
            this.showDialog = true
        },
        // 新增
        handlerAdd(){
            this.dialogTit = "新增"
            this.showDialog = true
        },
        // 激活
        handlerActive(row){
            this.currentRowObj = row
        },
        // 版本
        handlerVertion(row){
            this.currentRowObj = row
        },
        saveSuccess(){
            debugger
        },
        cancelSave(){
            debugger
            this.showDialog = false
        }
    },
}
</script>



