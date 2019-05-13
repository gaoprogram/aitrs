<!--
  User: xxxxxxx
  Date: 2018/5/7
  功能：规则
-->

<template>
  <div class="rule-container">
    <div class="item-row">
      <span class="text">加班：</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click.native.prevent="addRow()">新增</el-button>
    </div>
    <div class="item-row">
      <span class="text">调休：</span>
      <el-select class="filter-item"
                 v-model="offSelected"
                 style="width: 200px"
      >
        <el-option v-for="item in 4" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="item-row">
      <span class="text">出差：</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click.native.prevent="addRow()">新增</el-button>
    </div>
    <div class="item-row">
      <span class="text">公出：</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click.native.prevent="addRow()">新增</el-button>
    </div>
    <div class="item-row">
      <span class="text">补签：</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click.native.prevent="addRow()">新增</el-button>
    </div>
    <div class="item-row">
      <span class="text">假期种类：</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click.native.prevent="addRow()">新增</el-button>
      <span style="margin-left: 20px">*选择之后可拖动排序</span>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <el-dialog
      title="假期种类（多选）"
      :visible.sync="selectHolidayVisible"
      width="600px"
      class="holiday-dialog"
      append-to-body
      :show-close="false"
      center
    >
      <div class="holiday-container">
        <ul class="holiday-list">
          <li>
            <el-checkbox v-model="yearHoliday">年假</el-checkbox>
          </li>
          <li>
            <el-checkbox v-model="yearHoliday">年假</el-checkbox>
          </li>
          <li>
            <el-checkbox v-model="yearHoliday">年假</el-checkbox>
          </li>
          <li>
            <el-checkbox v-model="yearHoliday">年假</el-checkbox>
          </li>
          <li>
            <el-checkbox v-model="yearHoliday">年假</el-checkbox>
          </li>
          <li>
            <el-checkbox v-model="yearHoliday">年假</el-checkbox>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectHolidayVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectHolidayVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        offSelected: '',
        selectHolidayVisible: false,
        yearHoliday: false
      }
    },
    methods: {
      addRow () {
        // 新增加班
        this.selectHolidayVisible = true
      },
      save () {
        // 保存
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rule-container
    .item-row
      margin-bottom 20px
      .text
        display inline-block
        width 100px;
        margin-right 20px
        text-align right
  .holiday-dialog
    .holiday-list
      display:flex;
      flex-wrap:wrap;
      width:100%;
      li
        display:flex;
        width:25%;
        padding 10px 0
        align-items:center;
        flex-direction:column;

</style>
