<!--
  User: xxxxxxx
  Date: 2018/5/10
  功能：xxxxxx
-->

<template>
  <div class="overtime-receipt-container mg-30">
    <div class="header-container">

      <el-radio-group v-model="tabPosition">
        <el-radio-button label="leave">加班单</el-radio-button>
      </el-radio-group>

      <div class="btn-tab right-btn-item" style="display: inline-block">

        <el-button @click="edit()" class="left-btn">
          新增
        </el-button>

        <el-button @click="edit()" class="left-btn">
          忽略
        </el-button>

        <el-button @click="edit()" class="left-btn">
          导入
        </el-button>

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
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="员工状态">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>员工类型：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="员工类型">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>状态：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="员工类型">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>来源：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="员工类型">
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
        <span>申请时间：</span>
        <el-date-picker
          v-model="entryDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <div class="filter-btn">
        <span>发生日期：</span>
        <el-date-picker
          v-model="entryDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <div class="filter-btn">
        <span>加班类型：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>补偿方式：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>异常说明：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
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
          label="员工"
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
          label="组织"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="岗位"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班类型"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="系统算加班时间"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="系统算加班时长"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="审批单加班时间"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="审批单加班时长"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="补偿方式"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="来源"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="状态"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="申请时间"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班时段1签到"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班时段1签退"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班时段2签到"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班时段2签退"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班时段3签到"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="加班时段3签退"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="异常说明"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="调休比"
        >
        </el-table-column>

        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
            >
              忽略
            </el-button>

          </template>
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

  .overtime-receipt-container
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
