<!--
  User: xxxxxxx
  Date: 2019/2/18
  功能：流程流转公共搜索组件
-->

<template>
  <div class="search-container">
    <div class="item-container">
      关键词：
      <!-- queryObj：{{queryObj}} -->
      <el-input v-model="queryObj.key" placeholder="标题/流程编号/审批人" size="small" clearable></el-input>
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
      <!-- approvalNo: {{approvalNo}} -->
      审批名：
      <el-select v-model="queryObj.CompanyApprovalId" placeholder="请选择" clearable size="small">
        <el-option
          v-for="item in approvalNo"
          :key="item.CompanyApprovalId"
          :label="item.Name"
          :value="item.CompanyApprovalId">
        </el-option>
      </el-select>
    </div>

    <div class="item-container">
      紧急程度：
      <el-select v-model="queryObj.emergencyLevel" placeholder="请选择" clearable size="small">
        <el-option
          v-for="item in energencyLevelSource"
          :key="item.Code"
          :label="item.Name"
          :value="item.Code">
        </el-option>
      </el-select>
    </div>    

    <div class="item-container" style="margin-bottom: 0;vertical-align: top;">
      <!-- currentType: {{currentType}} -->
      
      <div class="v-mid">
        <span>{{isCopyWithMe? '抄送人': '申请人'}}</span>

        <el-select v-if="isTodo || isOntheWay || isMyFollow" v-model="currentType" size="small">
          <el-option
            style="width: 100px"
            v-for="(item, index) in starterType"
            :key="item.code"
            :label="item.value"
            :value="item.code">
          </el-option>
        </el-select>

        <el-select v-if="isMyStart || isMyDeal" v-model="currentType" size="small">
          <el-option
            style="width: 100px"
            v-for="(item, index) in starterType"
            :key="item.code"
            :label="item.value"
            :disabled="isMyStartFn(index)"
            :value="item.code">
          </el-option>
          </el-select>

        <el-select v-if="isCopyWithMe" v-model="currentType" size="small">
          <el-option
            style="width: 100px"
            v-for="(item, index) in starterType"
            :key="item.code"
            :label="item.value"
            :disabled="isMyStartFn(index)"
            :value="item.code">
          </el-option>
        </el-select>
      </div>

      <!---选择组织或者人员的添加器---start-->
      <div class="v-mid">
        <company-structure-cmp
          :isTitle="false"
          title="选择人员"
          :tabType="[currentType]"
          :selectedList="currentData"
          @upData="updata"
        ></company-structure-cmp>
      </div>
      <!---选择组织或者人员的添加器---start-->
      
    </div>

    <div class="item-container">
      申请时间：
      <el-input style="width: 100px" v-model="queryObj.days" type="number" size="small"></el-input> 天内
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
      <el-tooltip v-if="!isHideExport" class="item" effect="dark" content="可先选择条件，再导出" placement="bottom">
        <el-button type="primary" @click="_exportFlowSelectAll()" size="small">导出</el-button>
      </el-tooltip>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getBusinessAreaList,
    companyTableList
  } from '@/api/approve'
  import { getDicByKey} from '@/api/permission'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  export default {
    props: {
      isTodo: {
        type: Boolean,
        default: false
      },
      isOntheWay: {
        type: Boolean,
        default: false
      },
      isMyStart: {
        type: Boolean,
        default: false
      },      
      isMyFollow: {
        type: Boolean,
        default: false
      },
      isMyDeal: {
        type: Boolean,
        default: false
      },
      isCopyWithMe: {
        type: Boolean,
        default: false
      },
      catgrory: {
        type: String,
        default: ''
      },
      isHideExport: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        queryObj: {
          key: '',
          no: '',
          CompanyApprovalId: '',  
          businessAreaCode: '', 
          flowSortNo: '',
          rec: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          sta: -1,
          wfSta: -1,
          businessAreaCode: '',
          emergencyLevel: ''  
        },
        dateRange: [],
        starterType: [
          {
            value: '组织',
            code: 'zuzhi'
          },
          {
            value: '人员',
            code: 'renyuan'
          }
        ],
        currentData: [],    // 已经选择的列表集合
        flowSortNo: [],  
        currentType: '',    // 人员 、 组织、 岗位的类型
        approvalNoArr: [],  // 审批名list 的总数居
        approvalNo: [],   // 审批名list 数据的备份
        energencyLevelSource: []  // 紧急程度的list 数据集合
      }
    },
    computed: {
    },
    watch: {
      currentType: {
        handler (newVal, oldVal) {
          debugger
          if(this.isMyStart || this.isMyDeal ){
            return 'zuzhi'
          }else if( this.isCopyWithMe ){
            return 'renyuan'
          }else {
            // if(this.isTodo || this.isOntheWay || this.isMyFollow){
              return 'zuzhi'
            // }
          }        
        },
        deep: true
      }
    },
    created () {
      debugger
      this._getBusinessTypeList() 
      this._getFlowList()
      this._getDicByKey()
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
      // 获取 紧急程度 字典表数据源数据
      _getDicByKey () {
        getDicByKey('WorkFlow', 'WorkFlow', 'CUS', 'EmergencyLevel').then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.energencyLevelSource = res.data.Data
          }else {
            this.$message({
              type: 'error',
              message: '紧急程度list集合数据获取失败,请重试'
            })
          }
        })
      },
      // 判断是否是我发起的  或者是  我处理的，如果是，则不能切换 
      isMyStartFn (index) {
        // debugger
        if (index === 1 && (this.isMyStart || this.isMyDeal)) {
          // 流程关联中的 我发起的 和 我处理的
          return true
        } else if (this.isCopyWithMe && index == 0) {
          debugger
          // 流程关联中的 抄送给我的
          return true
        }else {
          return false
        }
      },
      // 选择数据更新
      updata (val) {
        if (val.length > 1) return this.$message.info('每次只能选择一个')
        if (this.currentType === 'zuzhi') {
          if (val.length) {
            this.currentData = val.map(item => {
              return {
                Id: item.NodeId,
                Name: item.Name
              }
            })
            debugger
            this.queryObj.starter = val[0].NodeId
          } else {
            this.currentData = []
            this.queryObj.starter = ''
          }
        }
        if (this.currentType === 'renyuan') {
          if (val.length) {
            this.currentData = val.map(item => {
              return {
                Id: item.EmpId,
                Name: item.EmpName
              }
            })
            this.queryObj.starter = val[0].EmpId
          } else {
            this.currentData = []
            this.queryObj.starter = ''
          }
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
      // 搜索
      handleSearch () {
        if( this.isCopyWithMe ){
          this.queryObj.rec = this.queryObj.starter
          this.queryObj.starter = ''
        }        
        console.log(this.queryObj)
        debugger
        this.$emit('handleSearch', this.queryObj)
      },
      // 导出
      _exportFlowSelectAll () {
        this.$emit('exportFlowSelectAll')
      },
      // 重置
      handleReset () {
        debugger
        this.queryObj = {
          key: '',
          no: '',
          businessAreaCode: '',
          CompanyApprovalId: '',
          flowSortNo: '',
          rec: '',
          starter: '',
          days: '',
          begin: '',
          end: '',
          emergencyLevel: ''
        }
        this.dateRange = []
        this.currentData = []
        this.$emit('handleReset', this.queryObj)
      },
      changeDateRange () {
        if (this.dateRange) {
          this.queryObj.begin = this.dateRange[0]
          this.queryObj.end = this.dateRange[1]
        } else {
          this.queryObj.begin = ''
          this.queryObj.end = ''
        }
      }
    },
    components: {
      CompanyStructureCmp
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-container
    // margin-bottom 20px
    .item-container
      display inline-block
      margin-right 10px;
      margin-bottom 10px
      .el-input
        width 200px
      .v-mid
        display inline-block
        vertical-align top
        .el-select
          .el-input
            width 100px
    .search-btn-container
      display inline-block
      margin-bottom 10px
</style>
