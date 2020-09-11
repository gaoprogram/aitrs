<!--
  User: gaol
  Date: 2019/8/9
  功能：员工管理--在职员工、 离职员工、 待入职员工 公用的页面组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
>>>.el-loading-mask
  top 0 !important
.commonEmployee
  position relative
  padding 0 30px 
  box-sizing border-box
  .topContainer
    margin-bottom 20px
    .tip
      font-size 14px
  .tabBox
    margin-bottom 20px
  .search-container
    margin-bottom 20px
    .el-button-group
      vertical-align top!important
  .table-content-container
    position absolute
    top 150px
    right 30px
</style>

<template>
  <div class="commonEmployee marginT30 animated fadeIn" v-loading = "loading">
    <!-- commonEmpPage页面----currentPageCode:{{currentPageCode}}
    ----
    currentPageCode: {{currentPageCode}} -->
    <div class="topContainer animated fadeIn">
      <template v-if="getJoinPage">
        <span class="tip">{{totalEmployee}}人在职</span>
        <el-button type="primary" size="mini" @click="joinWaitEmployee">待入职员工</el-button>
        <el-button type="primary" size="mini" @click="joinLeavedEmployee">离职员工</el-button>        
      </template>
      <template v-if="getLeavePage">
        <span class="tip">{{totalEmployee}}人离职</span>
        <el-button type="primary" size="mini" @click="joinWaitEmployee">待入职员工</el-button>
        <el-button type="primary" size="mini" @click="joinJoinedEmployee">在职员工</el-button>        
      </template>   
      <template v-if="getWaitPage">
        <span class="tip">{{totalEmployee}}人待入职</span>
        <el-button type="primary" size="mini" @click="joinJoinedEmployee">在职员工</el-button>
        <el-button type="primary" size="mini" @click="joinLeavedEmployee">离职员工</el-button>        
      </template>       
      <!-- <template v-if="getContractPage">
        <span class="tip">{{totalEmployee}}人待入职</span>
        <el-button type="primary" size="mini" @click="joinJoinedEmployee">在职员工</el-button>
        <el-button type="primary" size="mini" @click="joinLeavedEmployee">离职员工</el-button>        
      </template>              -->
    </div>

    <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="table-tab-container">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs> -->

    <!--tab标签----start--->
    <!-- tableList: {{tableList}} -->
    <div class="tabBox">
      <tab-item 
        @selectTabitem = "selectTabitem" 
        :tabList="tableList">
      </tab-item>
    </div>
    <!----tab标签-end-->


    <!-- showSearchCmp: {{showSearchCmp}} -->
    <!---search部分-----start--->
    <div class="search-container">
      <el-input placeholder="请输入员工工号查询" 
        v-model="searchValue" 
        debounce clearable 
        class="input-with-select" 
        style="width: 300px">
        <el-button 
          slot="append" 
          type="primary" 
          icon="el-icon-search"
          @click.native="clickSearchBtn"
        >
        </el-button>
      </el-input>
      <el-button-group>
        <!-- <el-tooltip class="item" effect="dark" content="筛选" placement="bottom">
          <el-button icon="el-icon-share" @click.native="handlerShowSearchcmp"></el-button>
        </el-tooltip> -->
        <el-popover
          placement="right"
          width="400"
          style="margin-left: 5px"
          v-model="showSearchCmp"
          trigger="click">
          <!-- <p>这是一段内容这是一段内容确定删除吗？</p> -->
          <search-tools 
            ref="highSearchCmp"
            :showMoreSearch="showMoreSearchConditions"
            @emitSearchResult="emitSearchResult"  
          >
          </search-tools>          
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click.native="showSearchCmp = false">取消</el-button>
            <el-button type="primary" size="mini" @click.native="clickHighSearchBtn">确定</el-button>
          </div>
          <el-button 
            icon="el-icon-share" 
            slot="reference"
          >高级搜索</el-button>
        </el-popover>           

        <el-tooltip class="item" effect="dark" content="清空" placement="bottom">
          <el-button icon="el-icon-delete" @click.native="handlerReset"></el-button>
        </el-tooltip>
      </el-button-group>     
    </div>
    <!---search部分-----end--->
  
    <!-- <el-button icon="el-icon-share" @click.native="handlerShowSearchcmp">高级搜索</el-button> -->

    <!----搜索弹框组件------start---->
    <!-- <div class="searchWrap" v-if="showSearchCmp">
      <el-dialog 
        :visible.sync="showSearchCmp"
        width="30%">
        <search-tools 
          :showMoreSearch="showMoreSearchConditions"
          @emitSearchResult="emitSearchResult"  
        >
        </search-tools>
      </el-dialog>
    </div> -->
    <!----搜索弹框组件------end---->


    <!--table数据-----start--->
    <div class="tablecontent">
      <!-- currentTableStrIndex: {{currentTableStrIndex}}
      currentTableTableData: {{currentTableTableData}} -->
      <!---通用的table表格组件---start--->  
      <div class="CommonTableInfo">
        <common-table-info 
          ref="commonTableInfoCmp" 
          :propTableData="currentTableTableData"
          @emitGetEmpSuccess = "emitGetEmpSuccess"
          >
        </common-table-info>
      </div>
      <!---通用的table表格组件---end--->                                                                       
    </div>
    <!---table数据---end--->

    <!----更多操作键区域--start--->
    <div class="table-content-container">
      <!--引入更多操作按钮组件---start-->
      <more-handler-btn-cmp 
        :showBatchJoinJob.sync="showBatchJoinJob"
        :showBatchLeaveJob.sync="showBatchLeaveJob"
        :showBatchSwitch.sync="showBatchSwitch"
        :showBatchTurn.sync="showBatchTurn"
        :showBatachDelete.sync="showBatachDelete"
        :showBatchEditEmp.sync="showBatchEditEmp"
        :showBatchAddEmp.sync="showBatchAddEmp"
        :showBatchExportEmp.sync="showBatchExportEmp"
        :showBatchSetEmpTemplate.sync="showBatchSetEmpTemplate"
        :showDirectJoinJob.sync="showDirectJoinJob"
        ></more-handler-btn-cmp>
      <!---引入更多操作按钮组件---end-->
    </div>
    <!----更多操作键区域--end--->

    <!-- <el-button @click="clickBtn">回到顶部</el-button> -->

    <!-----直接添加员工的dialog--start-->
    <div v-if="addEmpCmpVisible">
      <add-emp-cmp 
        class="addEmp" 
        @handleCancelAddEmp="handleCancelAddEmp" 
        v-if="addEmpCmpVisible">
      </add-emp-cmp>
    </div>
    <!-----直接添加员工的dialog--end-->


    <!--直接入职--start-->
    <div class="directJoinJob" v-if="showDirectJoinJob">
      <el-dialog
        title="直接入职"
        width="60%"
        :visible.sync="showDirectJoinJob"
        append-to-body
        :close-on-click-modal="false"
      >
        <direct-join-job-cmp></direct-join-job-cmp>
      </el-dialog>
    </div>
    <!---直接入职----end-->


    <!--批量入职弹框----start-->
    <div class="batchJoinJobBox" v-if="showBatchJoinJob">
      <el-dialog
        title="批量入职"
        :visible.sync="showBatchJoinJob"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-join-job-cmp></batch-join-job-cmp>
      </el-dialog>
    </div>
    <!--批量入职弹框----end-->

    <!--批量离职弹框----start-->
    <div class="batchLeaveJobBox" v-if="showBatchLeaveJob">
      <el-dialog
        title="批量离职"
        :visible.sync="showBatchLeaveJob"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-leave-job-cmp></batch-leave-job-cmp>
      </el-dialog>
    </div>
    <!--批量离职弹框----end-->

    <!--批量转正弹框----start-->
    <div class="batchSwitchBox" v-if="showBatchSwitch">
      <el-dialog
        title="批量转正"
        :visible.sync="showBatchSwitch"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-switch-cmp></batch-switch-cmp>
      </el-dialog>
    </div>
    <!--批量转正弹框----end-->    

    <!--批量调转弹框----start-->
    <div class="batchTurnBox" v-if="showBatchTurn">
      <el-dialog
        title="批量调转"
        :visible.sync="showBatchTurn"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-turn-cmp></batch-turn-cmp>
      </el-dialog>
    </div>
    <!--批量调转弹框----end-->      

    <!--批量删除弹框----start-->
    <div class="batchDelteBox" v-if="showBatachDelete">
      <el-dialog
        title="批量删除"
        :visible.sync="showBatachDelete"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-delete-cmp></batch-delete-cmp>
      </el-dialog>
    </div>
    <!--批量删除弹框----end-->   
    

    <!--批量修改员工弹框----start-->
    <div class="batchEditBox" v-if="showBatchEditEmp">
      <el-dialog
        title="批量修改"
        :visible.sync="showBatchEditEmp"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-edit-cmp></batch-edit-cmp>
      </el-dialog>
    </div>
    <!--批量修改员工弹框----end-->      

    <!--批量新增员工弹框----start-->
    <div class="batchAddBox" v-if="showBatchAddEmp">
      <el-dialog
        title="批量新增"
        :visible.sync="showBatchAddEmp"
        :close-on-click-modal="false"      
        append-to-body
        width="60%"
      >
        <batch-add-cmp></batch-add-cmp>
      </el-dialog>
    </div>
    <!--批量新增员工弹框----end-->     

    <!--批量导出员工弹框----start-->
    <div class="batchExportBox" v-if="showBatchExportEmp">
      <el-dialog
        title="批量导出"
        :visible.sync="showBatchExportEmp"
        :close-on-click-modal="false"
        append-to-body
        width="60%"
      >
        <batch-export-cmp></batch-export-cmp>
      </el-dialog>
    </div>
    <!--批量导出员工弹框----end-->         

    <!--批量设置员工模板弹框----start-->
    <div class="batchSetBox" v-if="showBatchSetEmpTemplate">
      <el-dialog
        title="批量设置员工模板"
        :visible.sync="showBatchSetEmpTemplate"
        :close-on-click-modal="false"      
        append-to-body
        width="60%"
      >
        <batch-set-emp-template-cmp></batch-set-emp-template-cmp>
      </el-dialog>
    </div>
    <!--批量设置员工模板弹框----end-->             

  </div>  
</template>

<script type="text/ecmascript-6">
  import { 
    REQ_OK, 
    PA_PAGECODE_JOINEDEMPLOYEE, 
    PA_PAGECODE_WAITEDEMPLOYEE,
    PA_PAGECODE_LEAVEDEMPLOYEE,
    PA_PAGECODE_CONTRACTMANAGE
  } from '@/api/config'
  import { 
    getPageList,
    getTableList 
  } from '@/api/employee'
  // import CommonInput from '@/base/Common-input/Common-input'
  // import CommonSelect from '@/base/Common-select/Common-select'

  import CommonTableInfo from '@/components/employee/employeeManage/empManage-cmp/Common-tableInfo-cmp'
  import TabItem from '@/components/employee/employeeManage/empManage-cmp/TabInfo-cmp'
  import JobRecord from '@/components/employee/employeeManage/empManage-cmp/JobRecord-tableInfo-cmp'
  import Contract from '@/components/employee/employeeManage/empManage-cmp/Contract-tableInfo-cmp'
  import ChildrenEducation from '@/components/employee/employeeManage/empManage-cmp/ChildrenEducation-tableInfo-cmp'
  import ContinueEducation from '@/components/employee/employeeManage/empManage-cmp/ContinueEducation-tableInfo-cmp'
  import Family from '@/components/employee/employeeManage/empManage-cmp/Family-tableInfo-cmp'
  import HomeLoans from '@/components/employee/employeeManage/empManage-cmp/HomeLoans-tableInfo-cmp'
  import HomeRent from '@/components/employee/employeeManage/empManage-cmp/HomeRent-tableInfo-cmp'
  import Illness from '@/components/employee/employeeManage/empManage-cmp/Illness-tableInfo-cmp'
  import SupportOlder from '@/components/employee/employeeManage/empManage-cmp/SupportOlder-tableInfo-cmp'
  import Bank from '@/components/employee/employeeManage/empManage-cmp/Bank-tableInfo-cmp'
  import SearchTools from '@/components/employee/employeeManage/empManage-cmp/SearchTools-cmp'
  import DirectJoinJobCmp from '@/components/employee/employeeManage/empManage-cmp/DirectJoinJob-cmp'
  
  import BatchJoinJobCmp from '@/components/employee/employeeManage/empManage-cmp/BatchJoinJob-cmp'
  import BatchLeaveJobCmp from '@/components/employee/employeeManage/empManage-cmp/BatchLeaveJob-cmp'
  import BatchSwitchCmp from '@/components/employee/employeeManage/empManage-cmp/BatchSwitch-cmp'
  import BatchTurnCmp from '@/components/employee/employeeManage/empManage-cmp/BatchTurn-cmp'
  import BatchDeleteCmp from '@/components/employee/employeeManage/empManage-cmp/BatchDelete-cmp'
  import BatchEditCmp from '@/components/employee/employeeManage/empManage-cmp/BatchEdit-cmp'
  import BatchAddCmp from '@/components/employee/employeeManage/empManage-cmp/BatchAdd-cmp'
  import BatchExportCmp from '@/components/employee/employeeManage/empManage-cmp/BatchExport-cmp'
  import BatchSetEmpTemplateCmp from '@/components/employee/employeeManage/empManage-cmp/BatchSetEmpTemplate-cmp'
  import MoreHandlerBtnCmp from '@/components/employee/employeeManage/empManage-cmp/MoreHandlerBtn-cmp'

  import { scrollAnimation } from '@/utils/scrollAnimation.js'


  import { PaEmployeeManageMixin } from '@/utils/PA-mixins.js'

  import { mapGetters } from 'vuex'

  export default {
    mixins: [ PaEmployeeManageMixin ],
    components: {
      CommonTableInfo,
      AddEmpCmp,
      TabItem,
      JobRecord,
      Contract,
      ChildrenEducation,
      ContinueEducation,
      Family,
      HomeLoans,
      HomeRent,
      Illness,
      SupportOlder,
      Bank,
      SearchTools,
      BatchJoinJobCmp,
      DirectJoinJobCmp,
      BatchLeaveJobCmp,
      BatchSwitchCmp,
      BatchTurnCmp,
      BatchDeleteCmp,
      BatchEditCmp,
      BatchAddCmp,
      BatchExportCmp,
      BatchSetEmpTemplateCmp,
      MoreHandlerBtnCmp
    },
    data () {
      return {
        joined_page: PA_PAGECODE_JOINEDEMPLOYEE,
        waited_page: PA_PAGECODE_WAITEDEMPLOYEE,
        leaved_page: PA_PAGECODE_LEAVEDEMPLOYEE,
        contract_page: PA_PAGECODE_CONTRACTMANAGE,
        tabList: [],
        addEmpCmpVisible: false,
        activeName: 'second',
        tableCode: 'PAR80001',
        filterParam: {},
        queryObj: {
          PageIndex: 1,
          PageSize: 10
        },
        currentTableTableData: {},  // 当前table表格
        currentTableStrIndex: 0,  // 当前table表格数据的index值
        showMoreSearchConditions: [
          {
            label: "字段1",
            value: "one",
          },
          {
            label: "字段2",
            value: "two",
          }
        ], // 搜索组件中的更多搜索条件
      }
    },
    created () {
      debugger     
      // this.$nextTick(() => {
        // 获取 员工总数
        this.getEmployeeNum(this.currentPageCode)
        // 获取 员工的分类
        this.getTableList(this.currentPageCode)
      // })   
    },
    beforeDestroy(){
     
    },
    computed: {
      ...mapGetters([
        'currentPageCode'
      ]),
      getJoinPage(){
        if(this.currentPageCode === this.joined_page){
          return true
        }else {
          return false
        }
      },
      getLeavePage(){
        if(this.currentPageCode === this.leaved_page){
          return true
        }else {
          return false
        }
      },
      getWaitPage(){
        if(this.currentPageCode === this.waited_page){
          return true
        }else {
          return false
        }
      },
      getContractPage(){
        if(this.currentPageCode === this.contract_page){
          return true
        }else {
          return false
        }        
      }            
    },
    watch: {

    },
    methods: {
      clickBtn(){
      //获取当前document的上滚长度
      const currentY = document.documentElement.scrollTop || document.body.scrollTop
        scrollAnimation(currentY, 0)         
      },
      // 获取员工的分类
      getTableList(pageCode){
        getTableList(this.currentPageCode).then(res => {
          debugger
          if(res && res.data.State === REQ_OK){
            this.tableList = res.data.Data
            this.currentTableTableData = res.data.Data[0]
          }else {
            this.$message({
              type: 'error',
              message: `获取员工tableList失败,${res.data.Error}`
            })
          }
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: `获取员工tableList出错`              
          })
        })
      },      
      // 根据列表Code和查询条件获取数据
      _getPageList () {
        getPageList(this.tableCode, this.filterParam, this.queryObj.PageIndex, this.queryObj.PageSize).then(res => {
          if (res.data.State === REQ_OK) {

          }
        })
      },
      // 点击待入职员工
      joinWaitEmployee () {
        this.$router.push({path:'/employee/employeeManage/waitEmployee'})
      },
      // 点击入职员工
      joinJoinedEmployee () {
        this.$router.push({path: '/employee/employeeManage/joinedEmployee'})
      },
      // 点击 离职员工
      joinLeavedEmployee () {
        this.$router.push({path:'/employee/employeeManage/leavedEmployee'})
      },
      // 新增员工
      handleAddEmp () {
        this.addEmpCmpVisible = true
      },
      handleCancelAddEmp () {
        this.addEmpCmpVisible = false
      },
      handleClick (tab, event) {
        // console.log(tab, event)
      },
      // 切换 tabitem 标签btn 
      selectTabitem (index, obj) {
        debugger
        this.currentTableStrIndex = index
        this.currentTableTableData = obj
      },
      // 点击 删选显示搜索组件
      handlerShowSearchcmp() {
        debugger
        this.showSearchCmp = true
      }
    }
  }
</script>

