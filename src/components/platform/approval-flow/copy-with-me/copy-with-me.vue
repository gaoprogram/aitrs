<!--
  User: xxxxxxx
  Date: 2018/10/16
  功能：抄送我的
-->

<template>
  <div class="todo-container mglr-30">
    <div class="left-container" :class="{'isRight': showRight}">
      <tab-router></tab-router>
      <div class="search-container">
        <div class="item-container">
          关键词：
          <el-input v-model="queryObj.key" placeholder="请输入关键词" size="small"></el-input>
        </div>

        <div class="item-container">
          业务领域：
          <!-- businessAreaCode:{{queryObj.businessAreaCode}} -->
          <!-- flowSortNo: {{flowSortNo}} -->
          <el-select v-model="queryObj.businessAreaCode" placeholder="请选择" clearable size="small" @change="changeBusinessType()">
            <el-option
              v-for="item in flowSortNo"
              :key="item.BusinessAreaCode"
              :label="item.Name"
              :value="item.BusinessAreaCode">
            </el-option>
          </el-select>
        </div>      

        <div class="item-container">
          审批名：
          <el-select v-model="queryObj.CompanyApprovalId" placeholder="请选择" clearable  size="small">
            <el-option
              v-for="item in approvalNo"
              :key="item.CompanyApprovalId"
              :label="item.Name"
              :value="item.CompanyApprovalId">
            </el-option>
          </el-select>
        </div>
        <div class="item-container" style="margin-bottom: 0;vertical-align: top;">
          <div style="display: inline-block;height: 32px;line-height: 32px;vertical-align: top">
            抄送人员：
          </div>
          <company-structure-cmp
            style="display: inline-block"
            :isTitle="false"
            title="选择人员"
            :tabType="['renyuan']"
            :selectedList="currentData"
            @upData="updata"
          ></company-structure-cmp>
        </div>
        <div class="item-container">
          送达时间：
          <el-input style="width: 100px" v-model="queryObj.days" type="number" size="small"></el-input>
          天内
          <el-date-picker
            size="small"
            @change="changeDateRange()"
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="search-btn-container">
          <el-button type="primary" @click="handleSearch()" size="small">搜索</el-button>
          <el-button type="primary" @click="handleReset()" size="small">重置</el-button>
          <el-tooltip class="item" effect="dark" content="可先选择条件，再导出" placement="bottom">
            <el-button 
              @click="_exportFlowSelectAll()" 
              type="primary"
              size="mini">
            导出</el-button>
          </el-tooltip>
        </div>
      </div>
      <div class="table-container">
        <div class="tool-btn-container">
          <el-button @click="_exportFlowSelect()" :disabled="!multipleSelection.length">导出</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <!-- <el-badge :value="tableArr.length || 0" class="item">
          </el-badge> -->
          <el-tab-pane label="未读" name="first"></el-tab-pane>
          <el-tab-pane label="已读" name="second"></el-tab-pane>
          <el-tab-pane label="全部" name="third"></el-tab-pane>
        </el-tabs>
        <div class="table" v-loading="loading">
          <el-table
            ref="multipleTable"
            border
            height="500"
            :data="tableArr"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              fixed="left"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="FlowName"
              label="流程名"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="Title"
              label="标题"
            >
              <template slot-scope="scope">
                <!-- <el-badge is-dot class="item"> -->
                  <!-- <el-button class="share-button" icon="" style="padding:5px" :type="_EmergencyLevelColor(scope.row.EmergencyLevel)" size="mini" v-text="_EmergencyLevel(scope.row.EmergencyLevel)"></el-button> -->
                <!-- </el-badge>   -->
                <el-tooltip effect="dark" :content="scope.row.Title">
                  <span>{{scope.row.Title}}</span>                  
                </el-tooltip>           
              </template>                    
            </el-table-column>
            <el-table-column
              prop="NodeName"
              label="抄送的节点"
              width="120"
              sortable>
            </el-table-column>           
            <el-table-column
              prop="RecName"
              label="抄送人员"
              width="120"
              sortable>
            </el-table-column>
            <el-table-column
              prop="RDT"
              label="送达时间"
              sortable
              width="150"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.RDT | replaceTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleShowDetail({currentFlow:scope.row, typeStr:'copyWithMe'}, scope.$index, 'copy')"
                >查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="queryObj.pageNum"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="queryObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showRight">
      <right-fixed
        ref="rightFixed"
        @closeRight="closeRight"
        :form="currentForm"
        :loadingProp.sync="rightLoading"
        :ccPk="ccPk"
        :versionId="versionId"
        @refreshForm="refreshForm"
        @next="next"
        @prev="prev"
      ></right-fixed>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    getCcList,
    getBusinessAreaList,
    companyTableList
  } from '@/api/approve'
  import tabRouter from '@/components/platform/approval-flow/tab-router/tab-router'
  import rightFixed from '@/components/platform/approval-flow/right-fixed/right-fixed'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  import { flowCommonFn } from '@/utils/mixin'

  export default {
    mixins: [flowCommonFn],
    data () {
      return {
        keyWord: '',
        activeName: 'third',
        queryObj: {
          key: '',
          no: '',
          flowSortNo: '',
          CompanyApprovalId: '',
          businessAreaCode: '',
          rec: '',
          days: '',
          begin: '',
          end: '',
          sta: -1,
          pageSize: 10,
          pageNum: 1
        },
        flowSortNo: [],
        dateRange: [],
        tableArr: [],
        total: 0,
        currentData: [],

        approvalNoArr: [],  // 审批名list 的总数据
        approvalNo: []   // 审批名list 数据的备份
      }
    },
    created () {
      this._getBusinessTypeList()
      this._getFlowList()
      // 接收 rightfixed 中改变节点后，从新调用getform后，将结果返回来 改变 currentform值
      this.$bus.$on('rightFixedFormChange', (data) => {
        debugger
        console.log("rightFixedFormChange 触发成功")
        if(data){
          debugger
          this.currentform = data
        }
      })         
    },
    beforeDestroy(){
      // 销毁eventBus
      this.$bus.$off('rightFixedFormChange')
    },    
    methods: {
      // 业务类型字典表
      _getBusinessTypeList () {
        getBusinessAreaList().then(res => {
          debugger
          if (res.data.State === REQ_OK) {
            this.flowSortNo = res.data.Data
          }
        })
      },      
      // 审批类型字典表
      _getFlowList () {
        companyTableList().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.approvalNoArr = []
            if( res.data.Data.length){
              res.data.Data.forEach(item =>{
                this.approvalNoArr = this.approvalNoArr.concat(item.CompanyApprovals)
              })
              this.approvalNo = JSON.parse(JSON.stringify(this.approvalNoArr))
              // console.log(this.approvalNo)
            }else {
              debugger
              this.approvalNoArr = []
              this.approvalNo = []
            }
          }
        })
      },      
      // 抄送我的
      _getFlowTable () {
        this.loading = true
        getCcList(this.queryObj).then(res => {
          if (res.data.State === REQ_OK) {
            this.tableArr = res.data.Data
            this.total = res.data.Total
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: '抄送我的列表获取失败，请重试！'
            })
            this.loading = false
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '抄送我的列表获取失败，请重试！'
          })
          this.loading = false
        })
      },
      // 切换表格类型
      handleTabClick (tab, event) {
        // 需要将right-fixed 关闭，否则 从 挂起或者任务池类目 点击了查看btn了后，再切换到其他类目下查看 right-fixed 不会重新渲染
        this.showRight = false        
        switch (this.activeName) {
          case 'first':
            this.queryObj = Object.assign(this.queryObj, {sta: 0})
            this._getFlowTable()
            return
          case 'second':
            this.queryObj = Object.assign(this.queryObj, {sta: 1})
            this._getFlowTable()
            return
          case 'third':
            this.queryObj = Object.assign(this.queryObj, {sta: -1})
            this._getFlowTable()
        }
      },
      // 改变搜索的业务领域
      changeBusinessType () {

        debugger

        // this.queryObj.businessAreaCode
        // CompanyTableList
        this.queryObj.CompanyApprovalId = ''
        if(!this.queryObj.businessAreaCode) {
          this.approvalNo = JSON.parse(JSON.stringify(this.approvalNoArr))    
          return       
        }

        if( this.approvalNoArr && this.approvalNoArr.length ){
          this.approvalNo = this.approvalNoArr.filter(item => {
            return item.BusinessAreaCode == this.queryObj.businessAreaCode 
          })
        }

        console.log("--------->",this.approvalNo)
      },      
      // 导出全部
      _exportFlowSelectAll () {
        let url = `${BASE_URL}/WorkFlow?Method=ExportCcList&TokenId=&CompanyCode=${this.companyCode}&no=${this.queryObj.no}&key=${this.queryObj.key}&rec=${this.queryObj.rec}&days=${this.queryObj.days}&begin=${this.queryObj.begin}&end=${this.queryObj.end}&sta=${this.queryObj.sta}&userId=${this.userCode}`
        window.open(url)
      },
      // 导出选中
      _exportFlowSelect () {
        let MyPKs = []
        this.multipleSelection.forEach(item => {
          MyPKs.push(item.MyPK)
        })
        MyPKs = JSON.stringify(MyPKs)
        let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedCc&TokenId=&CompanyCode=${this.companyCode}&myPks=${MyPKs}&userId=${this.userCode}`
        window.open(url)
      },
      // 重置
      handleReset () {
        this.queryObj = Object.assign(this.queryObj, {
          key: '',  // 关键词
          no: '',   
          businessAreaCode: '',
          CompanyApprovalId: '',
          flowSortNo: '',
          rec: '',
          days: '',
          begin: '',
          end: '',
          emergencyLevel: ''})
        this.currentData = []
        this.dateRange = []
        this._getFlowTable()
      },
      changeDateRange () {
        if (this.dateRange) {
          this.queryObj.begin = this.dateRange[0]
          this.queryObj.end = this.dateRange[1]
        } else {
          this.queryObj.begin = ''
          this.queryObj.end = ''
        }
      },
      // 选择数据更新
      updata (val) {
        if (val.length > 1) return this.$message.info('每次只能选择一个')
        if (val.length) {
          this.currentData = val.map(item => {
            return {
              Id: item.EmpId,
              Name: item.EmpName
            }
          })
          this.queryObj.rec = val[0].EmpId
        } else {
          this.currentData = []
          this.queryObj.rec = ''
        }
      }
    },
    components: {
      tabRouter,
      rightFixed,
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .todo-container
    .left-container
      .search-container
        margin-bottom 20px
        .item-container
          display inline-block
          margin-right 10px;
          margin-bottom 10px
          .el-input
            width 200px
        .search-btn-container
          display inline-block
          margin-bottom 10px
      .table-container
        overflow hidden
        >>>.el-tabs
          position relative
          .el-tabs__content
            position absolute
            top 0
            left 20px
        .tool-btn-container
          text-align right
      &.isRight
        margin-right 700px
        transition: margin-right 0.2s ease-out
</style>

