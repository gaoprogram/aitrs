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
    <div class="searchBox marginB10">
      <search-tool-cmp @clickSearchBtn="clickSearchBtn"></search-tool-cmp>
    </div>

    <div class="customerVersion">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClickTabs">
        <el-tab-pane label="激活" name="first"></el-tab-pane>        
        <el-tab-pane label="冻结" name="second"></el-tab-pane>
        <el-tab-pane label="全部" name="third"></el-tab-pane>
      </el-tabs>

      <div class="topBox clearfix marginB5">
        <el-button 
          style="float:right;margin-left: 10px"
          type="primary" 
          size="mini"
          @click.native="handlerAdd"
          >新增</el-button>
        <el-button 
          style="float:right"
          type="primary" 
          size="mini"
          @click.native="handlerExport"
        >导出</el-button>
      </div>


      <div :class="['tableBox', tableData.length<=0? 'not_found':'']" v-loading="loading">
          <!-- tableData: {{tableData}} -->
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
            <template slot-scope="scope">
              <span v-if="scope.row.State == 1">
                激活
              </span>
              <span v-if="scope.row.State == 0">
                冻结
              </span>              
            </template>
          </el-table-column>                                                

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button 
                type="text" 
                size="mini" 
                @click.native="handlerEdit(scope.row)"
              >编辑</el-button>
              <el-button 
                v-if="scope.row.State == 0"
                type="text" 
                size="mini" 
                @click.native="handlerActive(scope.row, 1)"
              >
                激活
              </el-button>
              <el-button 
                v-if="scope.row.State == 1"
                type="text" 
                size="mini" 
                @click.native="handlerActive(scope.row, 0)"
              >
                冻结
              </el-button>              
              <!-- <el-button 
                type="text" 
                size="mini" 
                @click.native="hanlderVertion(scope.row)"
              >版本</el-button> -->
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

    <!--编辑/新增弹框-start-->
    <div class="dialogBox" v-if="showDialog">
      <el-dialog
          :title="dialogTit"
          width="60%"
          :visible.sync="showDialog"
          append-to-body
          :close-on-click-modal="false"
      >
          <company-info-dialog-cmp
              :obj="currentRowObj"
              :isAddOrEdit="isAddOrEdit"
              @saveSuccess="saveSuccess"
              @cancelSave="cancelSave"
          ></company-info-dialog-cmp>
      </el-dialog>
    </div>     
    <!----编辑/新增弹框--end-->   
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import { 
    CompInfoList,
    SetSysCompanyState
  } from '@/api/systemManage'
  import CompanyInfoDialogCmp from './CompanyInfoDialog-cmp'
  import SearchToolCmp from './searchTool-cmp'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      CompanyInfoDialogCmp,
      SearchToolCmp
    },
    data(){
      return {
        loading: false,
        activeName: 'first',
        currentTabIndex: 0,
        tableData: [],
        total: 0,
        queryObj: {
          key: '', //关键词
          City: '', //城市id
          businessType: '', // 行业
          companyScope:'', // 人员规模
          natureType: '', // 企业性质
          startDate: '', //开始日期
          endDate: '', // 结束日期
          state: -1, // 状态，0冻结 1激活 默认-1全部
          pageSize: 10,
          pageNum: 1,
        },
        showDialog: false,  
        dialogTit: '', 
        isAddOrEdit: false, //新增 还是 编辑 false 是编辑  true 是新增
        currentRowObj: {}, 
      }
    },
    watch:{

    },
    computed: {
      ...mapGetters([
        'companyCode'
      ])
    },
    created(){
      this._getComTables()
    },
    methods: {
      _getComTables(){
        this.getCompanyInfo()
      },
      getCompanyInfo(){
        debugger
        this.loading = true
        CompInfoList(this.queryObj).then(res => {
          this.loading = false
          if(res && res.data.State === REQ_OK){
              this.tableData = res.data.Data
              this.total = res.data.DataCount
          }else {
              this.$message.error(`获取企业信息失败,${res.data.Error}`)
          }
        }).catch(() => {

        })
      },
      // 搜索
      clickSearchBtn(data){
        Object.assign(this.queryObj, data)
        this._getComTables()
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
        debugger
        this.currentTabIndex = tab.index*1
        if(this.currentTabIndex == 0){
          this.queryObj.state = 0
          this._getComTables()
        }else if(this.currentTabIndex == 1){
          this.queryObj.state = 1
          this._getComTables()
        }else if(this.currentTabIndex == 2){
          this.queryObj.state = -1
          this._getComTables()
        }        
      },
      // 点击 企业名称
      clickCompanyName(row, column, cell, event){
        debugger
      },
      // 编辑
      handlerEdit(row){
        this.currentRowObj = row
        this.dialogTit = '编辑'
        this.isAddOrEdit = false
        this.showDialog = true
      },
      // 新增
      handlerAdd(){
        this.dialogTit = "新增" 
        this.isAddOrEdit = true
        this.showDialog = true
      },
      _SetSysCompanyState(data, type){
        let text = type == 1? '激活':'冻结'
        SetSysCompanyState(JSON.stringify(data), type).then(res => {
          if(res && res.data.State === REQ_OK){
            this.$message.success(`${text}成功`)
            this._getComTables()
          }else {
            this.$message.error(`${text}失败,${res.data.Error}`)
          }
        })
      },
      // 激活/冻结
      handlerActive(row, type){
        let text = type == 1? '激活':'冻结'
        this.currentRowObj = row
        this.$confirm(`确定要${text}吗？`,"提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this._SetSysCompanyState([this.currentRowObj],type)
        }).catch(() => {
          this.$message.info(`${text}已取消`)
        })
      },
      // 导出
      handlerExport(){
        let {
          key,
          City,
          businessType,
          companyScope,
          natureType,
          startDate,
          endDate,
          state
        } = this.queryObj
        let url = `${BASE_URL}/SystemManage?Method=ExportCompInfoList&TokenId=&CompanyCode=${this.companyCode}&key=${key}&City=${City}&businessType=${businessType}&companyScope=${companyScope}&natureType=${natureType}&startDate=${startDate}&endDate=${endDate}&state=${state}`
        window.open(url)    
      },
      // 版本
      handlerVertion(row){
        this.currentRowObj = row
      },
      saveSuccess(data){
        debugger
        this.showDialog = false
        this._getComTables()
      },
      cancelSave(){
        debugger
        this.showDialog = false
      }
    },
  }
</script>



