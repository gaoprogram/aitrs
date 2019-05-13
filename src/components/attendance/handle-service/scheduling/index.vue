<!--
  User: xxxxxxx
  Date: 2018/5/9
  功能：xxxxxx
-->

<template>
  <div class="scheduling-container mg-30">
    <div class="header-container">
      <el-radio-group v-model="tabPosition">
        <el-radio-button label="table">排班表</el-radio-button>
        <el-radio-button label="count">排班统计</el-radio-button>
      </el-radio-group>

      <div class="btn-tab right-btn-item" style="display: inline-block">
        <el-button @click="add()" class="left-btn" type="primary">
          批量排班
        </el-button>

        <el-button @click="edit()" class="left-btn">
          高级排班
        </el-button>

        <el-button @click="edit()" class="left-btn">
          修改
        </el-button>

        <el-button @click="edit()" class="left-btn">
          员工排序
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
        <span>员工工号：</span>
        <el-select style="width: 120px"
                   class="filter-item"
                   v-model="selectRule"
                   placeholder="员工工号"
        >
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
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
        <span>考勤组：</span>
        <el-select class="filter-item empType" multiple v-model="empStatus" style="width: 120px" placeholder="考勤组">
          <el-option v-for="item in 10" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>

      <div class="filter-btn">
        <span>入职时间：</span>
        <el-date-picker
          v-model="entryDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>

      <div class="filter-btn">
        <span>排班期间：</span>
        <el-date-picker
          v-model="schedulingTime"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </div>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter" style="margin-bottom: 10px;">搜索</el-button>
    </div>
    <div class="desc-text">
      *调班情况。出勤时建议使用加班申请调休，休息时使用冲抵调休
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tabPosition: 'table',
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
  .scheduling-container
    .header-container
      margin-bottom 40px
      .right-btn-item
        float right
        .left-btn
          margin-left 0!important
    .btn-tab
      .filter-btn
        display inline-block
        margin-right 20px
        margin-bottom 20px
    .desc-text
      margin-bottom 20px
      color #cccccc
</style>
