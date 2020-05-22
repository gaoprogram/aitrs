<!--
  User: xxxxxxx
  Date: 2018/5/10
  功能：xxxxxx
-->

<template>
  <div class="overtime-count-container mg-30">
    <div class="header-container">

      <el-radio-group v-model="tabPosition">
        <el-radio-button label="leave">工时月报</el-radio-button>
      </el-radio-group>

      <div class="btn-tab right-btn-item" style="display: inline-block">

        <el-button @click="edit()" class="left-btn">
          导出
        </el-button>
      </div>
    </div>

    <div class="btn-tab">
      <div class="filter-btn">
        <span>关键词：</span>
        <el-input style="width: 120px"
                  class="filter-item"
                  v-model="keyWord"
                  placeholder="关键词">
        </el-input>
      </div>

      <div class="filter-btn">
        <span>员工状态：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>员工类型：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>考勤组：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>考勤期间：</span>
        <el-date-picker
          style="width: 120px"
          v-model="schedulingTime"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </div>

      <div class="filter-btn">
        <span>日历：</span>
        <el-date-picker
          v-model="entryDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom: 10px;">搜索</el-button>
    </div>

    <div class="table-container">
      <el-table :data="list" border style="width: 100%;">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          align="center"
          prop="EmpNumber"
          label="员工号"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="EmpName"
          label="姓名"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="OrgName"
          label="加班总工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班（次）"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班计费总工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="工作日加班（次）"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="工作日加班工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="工作日加班无补偿工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="工作日加班转调休工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="工作日加班计费工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="休息日加班（次）"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="休息日加班工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="休息日加班无补偿工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="休息日加班转调休工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="休息日加班计费工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="法定假日加班（次）"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="法定假日加班工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="法定假日加班无补偿工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="法定假日加班转调休工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="法定假日加班计费工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="公司假加班（次）"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="公司假加班工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="公司假加班无补偿工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="公司假加班转调休工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="公司假加班计费工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="记入调休总工时"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="剩余调休工时"
        >
        </el-table-column>

      </el-table>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.PageIndex"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listQuery.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tabPosition: 'leave',
        keyWord: '',
        selectRule: '',
        empStatus: '',
        entryDate: '',
        schedulingTime: '',
        list: [],
        listQuery: {
          PageIndex: 1,
          PageSize: 10
        }
      }
    },
    methods: {
      add () {
        // 新增
      },
      edit () {
        // 修改
      },
      handleFilter () {
        // 更多
      },
      handleSizeChange (val) {
        // 每页显示
        this.listQuery.PageSize = val
      },
      handleCurrentChange (val) {
        // 翻页
        this.listQuery.PageIndex = val
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"

  .overtime-count-container
    .header-container
      margin-bottom 40px
      &::after
        clear-float()
      .right-btn-item
        float right
        .left-btn
          margin-left 0!important
    .btn-tab
      .filter-btn
        display inline-block
        margin-right 20px
        margin-bottom 20px
</style>
