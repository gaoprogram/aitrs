<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：薪酬对比分析表
-->

<template>
  <div class="salary-contrast-table mg-30">
    <div class="btn-tab">
      <el-button @click="setCheckedNode()" style="margin-bottom: 10px;">
        选择组织
      </el-button>

      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <span style="margin-left: 20px">发薪表1：</span>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <span style="margin-left: 10px">发薪表2：</span>
      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <span style="margin-left: 10px">差异额：</span>
      <el-input style="width: 100px" class="filter-item" placeholder="差异大于" v-model="listQuery.title">
      </el-input>
      <span>-</span>
      <el-input style="width: 100px" class="filter-item" placeholder="差异小于" v-model="listQuery.title">
      </el-input>

      <el-button class="filter-item" type="primary" icon="el-icon-search" style="margin-bottom: 10px;">对比</el-button>

    </div>

    <div class="btn-tab right-btn-item" style="margin-bottom: 10px;">
      <el-button @click="handleDownload()" class="right-btn" type="primary">
        导出
      </el-button>
    </div>

    <el-table :data="list"
              border
              highlight-current-row
              show-summary
    >

      <el-table-column label="员工号" fixed align="center" prop="Name">
      </el-table-column>

      <el-table-column label="姓名" align="center" prop="TypeName">
      </el-table-column>

      <el-table-column label="纳税类型" align="center" prop="AttributeName">
      </el-table-column>

      <el-table-column label="收入合计1" align="center" prop="Status">
      </el-table-column>

      <el-table-column label="收入合计2" align="center" prop="PayMethodName">
      </el-table-column>

      <el-table-column label="收入差异" align="center" prop="Name">
      </el-table-column>

      <el-table-column label="扣减合计1" align="center" prop="TypeName">
      </el-table-column>

      <el-table-column label="扣减合计2" align="center" prop="AttributeName">
      </el-table-column>

      <el-table-column label="扣减差异" align="center" prop="Status">
      </el-table-column>

      <el-table-column label="应纳税所得额1" align="center" prop="PayMethodName">
      </el-table-column>

      <el-table-column label="应纳税所得额2" align="center" prop="PayMethodName">
      </el-table-column>

      <el-table-column label="应纳税所得额差异" align="center" prop="PayMethodName">
      </el-table-column>

      <el-table-column label="实发1" align="center" prop="PayMethodName">
      </el-table-column>

      <el-table-column label="实发2" align="center" prop="PayMethodName">
      </el-table-column>

      <el-table-column label="实发差异" align="center" prop="PayMethodName">
      </el-table-column>

      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        list: [],
        total: null,
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          sort: 0
        },
        sortOptions: [
          { label: '全部公告', key: 0 },
          { label: '已发布公告', key: 2 },
          { label: '未发布公告', key: 1 }
        ]
      }
    },
    methods: {
      handleFilter () {
      },
      handleDownload () {
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-month-report
    .btn-tab
      display inline-block
    .right-btn-item
      float right
  .salary-contrast-table::after
    clear-float()
</style>
