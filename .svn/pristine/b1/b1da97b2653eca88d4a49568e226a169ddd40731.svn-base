<!--
  User: xxxxxxx
  Date: 2018/5/9
  功能：xxxxxx
-->

<template>
  <div class="attendance-archives-container mg-30">
    <div class="btn-tab">
      <el-input style="width: 200px"
                class="filter-item"
                v-model="keyWord"
                placeholder="关键词">
      </el-input>

      <el-select style="width: 120px"
                 class="filter-item"
                 v-model="selectRule"
                 placeholder="考勤规则"
      >
        <el-option v-for="item in 10" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="员工状态">
        <el-option v-for="item in 10" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom: 10px;">搜索</el-button>

      <div class="btn-tab right-btn-item" style="margin-bottom: 10px;">
        <el-button @click="add()" class="left-btn" type="primary">
          新增
        </el-button>

        <el-button @click="edit()" class="left-btn">
          修改
        </el-button>

        <el-dropdown class="left-btn" @command="handleCommand">
          <el-button>
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="import">导入</el-dropdown-item>
            <el-dropdown-item command="export">导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
          label="所属组织"
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
          label="生效日期"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="考勤规则"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="考勤卡号"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="SchemeName"
          label="是否参与考勤"
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
        keyWord: '',
        selectRule: '',
        empStatus: '',
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
      handleCommand () {
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
  .attendance-archives-container
    .left-btn
      margin-left 0!important
  @media screen and (min-width: 1200px) {
    .attendance-archives-container .right-btn-item {
      float: right
    }
  }
</style>
