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
      <el-select v-model="queryObj.businessAreaCode" placeholder="请选择" clearable size="small" @change="handleSearch()">
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
      <el-select v-model="queryObj.no" placeholder="请选择" clearable size="small">
        <el-option
          v-for="item in approvalNo"
          :key="item.No"
          :label="item.Name"
          :value="item.No">
        </el-option>
      </el-select>
    </div>

    <div class="item-container" style="margin-bottom: 0;vertical-align: top;">
      
      <div class="v-mid">
        申请人：
        <el-select v-model="currentType" size="small">
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
      <el-tooltip class="item" effect="dark" content="可先选择条件，再导出" placement="bottom">
        <el-button type="primary" @click="_exportFlowSelectAll()" size="small">导出</el-button>
      </el-tooltip>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    getBusinessAreaList,
    getFlowList
  } from '@/api/approve'
  import CompanyStructureCmp from '@/base/Company-structure-cmp/select-cmp'
  export default {
    props: {
      isMyStart: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        queryObj: {
          key: '',
          no: '',
          flowSortNo: '',
          starter: '',
          days: '',
          begin: '',
          end: ''
        },
        dateRange: [],
        currentType: 'zuzhi',
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
        currentData: [],
        flowSortNo: [],
        approvalNo: []
      }
    },
    created () {
      debugger
      this._getBusinessTypeList()
      this._getFlowList()
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
        getFlowList().then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.approvalNo = res.data.Data
          }
        })
      },
      // 判断是否是我发起的，如果是，则不能切换
      isMyStartFn (index) {
        if (index === 1 && this.isMyStart) {
          return true
        } else {
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
      // 搜索
      handleSearch () {
        this.$emit('handleSearch', this.queryObj)
      },
      // 导出
      _exportFlowSelectAll () {
        this.$emit('exportFlowSelectAll')
      },
      // 重置
      handleReset () {
        this.queryObj = {
          queryObj: {
            key: '',
            no: '',
            flowSortNo: '',
            starter: '',
            days: '',
            begin: '',
            end: ''
          }
        }
        this.dateRange = []
        this.currentData = []
        this.$emit('handleReset')
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
