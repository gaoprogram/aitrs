<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：xxxxxx
-->

<template>
  <div class="day-set-container mg-30">
    <div class="explain-text">
      班次更新之后次日开始生效
    </div>
    <div class="btn-container">
      <el-button :disabled="multipleSelection.length > 0 ? false : true" @click="handlerBatchStop()" class="left-btn" style="margin-left: 10px">
        批量停用
      </el-button>
      <el-button @click="handlerDays()" class="left-btn" type="primary">
        新增班次
      </el-button>
    </div>
    <div class="contant-container">
      <div class="table-container">
        <el-table :data="list" border style="width: 100%;" @selection-change="handleSelectionChange">

          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            align="center"
            prop="IsSys"
            label="类别"
          >
            <template slot-scope="scope">
              <span @click="clickA()">{{ scope.row.IsSys | classType }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="ScheduleName"
            label="班次名称"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="ShortName"
            label="班次简称"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="TotalWorkTime"
            label="本班次总工时"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.TotalWorkTimeLabel }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="OnWorkLabel"
            label="考勤时间"
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.OnWorkLabel" :key="index" style="display: block">{{ item }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="State"
            label="状态"
          >
            <template slot-scope="scope">
              <span v-html="scope.row.State === 1 ? '启用' : '停用'"></span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="SchemeName"
            label="修改时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.Modified | replaceTime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row)"
              >
                编辑
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handleState(scope.row)"
                v-html="scope.row.State === 1 ? '停用' : '启用'"
              >
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="deleteOne(scope.row)"
              >删除
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getScheduleConfigList, updateScheduleConfigState, deleteScheduleConfig } from '@/api/attendance'
  import { REQ_OK } from '@/api/config'
  import { Message, MessageBox } from 'element-ui'
  export default {
    data () {
      return {
        stopChecked: false,
        list: [],
        total: null,
        listQuery: {
          PageIndex: 1,
          PageSize: 10
        },
        multipleSelection: []
      }
    },
    created () {
      this.$store.dispatch('setLoadingState', true)
      this._getScheduleConfigList()
    },
    methods: {
      clickA () {
        console.log('颠颠地那')
      },
      _getScheduleConfigList () {
        // 获取班次列表
        getScheduleConfigList(this.listQuery).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
            this.$store.dispatch('setLoadingState', false)
          } else {
            this.$store.dispatch('setLoadingState', false)
            Message.error('班次设置列表获取失败，请刷新重试！')
          }
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          Message.error('班次设置列表获取失败，请刷新重试！')
        })
      },
      handlerDays () {
        // 新增班次
        this.$router.push({
          path: '/attendance/baseConfig/daySet/addDay'
        })
      },
      handleEdit (item) {
        // 编辑
        this.$router.push({
          path: '/attendance/baseConfig/daySet/editDay',
          query: {
            scheduleCode: item.ScheduleCode
          }
        })
      },
      handlerBatchStop () {
        // 批量停用
        let arr = this.multipleSelection.map(item => {
          return item.ScheduleCode
        })
        updateScheduleConfigState(JSON.stringify(arr), 0).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改班次状态成功！')
            this._getScheduleConfigList()
          } else {
            Message.error('更改班次状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改班次状态失败，请重试！')
        })
      },
      handleSelectionChange (val) {
        // 多选
        this.multipleSelection = val
      },
      handleState (item) {
        // 单行数据改变状态
        updateScheduleConfigState(item.ScheduleCode, item.State === 1 ? 0 : 1).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改班次状态成功！')
            this._getScheduleConfigList()
          } else {
            Message.error('更改班次状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改班次状态失败，请重试！')
        })
      },
      deleteOne (item) {
        // 删除此行
        MessageBox.confirm('确定删除此班次设置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          deleteScheduleConfig(item.ScheduleCode).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('删除成功！')
              this._getScheduleConfigList()
            } else {
              Message.error('删除失败，请重试！')
            }
          })
        }).catch(() => {
        })
      },
      handleSizeChange (val) {
        // 每页显示
        this.listQuery.PageSize = val
      },
      handleCurrentChange (val) {
        // 翻页
        this.listQuery.PageIndex = val
      }
    },
    activated () {
      this._getScheduleConfigList()
      this.$store.dispatch('setLoadingState', true)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .day-set-container
    .btn-container
      margin-bottom 10px
      &::after
        clear-float()
      button
        float right
</style>
