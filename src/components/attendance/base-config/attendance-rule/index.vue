<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：出勤规则
-->

<template>
  <div class="attendance-rule-container mg-30">
    <div class="btn-container">
      <el-button :disabled="multipleSelection.length > 0 ? false : true" @click="handlerBatchStop()" class="left-btn" style="margin-left: 10px">
        批量停用
      </el-button>
      <!-- <el-button @click="handlerAddDays()" class="left-btn" type="primary">
        新增假期
      </el-button>-->
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
            prop="ConfigName"
            label="名称"
          >
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
            prop="IsSys"
            label="系统默认"
          >
            <template slot-scope="scope">
              <span v-html="scope.row.IsSys === 1 ? '是' : '否'"></span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="SheetName"
            label="申请单"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="Modifier"
            label="修改人"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="Modified"
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
                规则
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="handleState(scope.row)"
                v-html="scope.row.State === 1 ? '停用' : '启用'"
              >
              </el-button>

            </template>
          </el-table-column>

        </el-table>
        <!--<div class="pagination-container">-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page.sync="listQuery.PageIndex"-->
            <!--:page-sizes="[10, 20, 30, 50]"-->
            <!--:page-size="listQuery.PageSize"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="total">-->
          <!--</el-pagination>-->
        <!--</div>-->
      </div>
    </div>
    <el-dialog
      title="新增假期"
      :visible.sync="addHolidayVisible"
      width="500px"
      class="add-holiday-dialog"
      append-to-body
      :show-close="false"
      :close-on-click-modal="false"
      center
    >
      <div class="holiday-container">
        <div class="item">
          <span class="title">休假名称：</span>
          <el-input type="text" v-model="holidayName" class="holidayName" maxlength="15" style="width:300px"></el-input>
        </div>
        <div class="item">
          <span class="title">状态：</span>
          <el-switch
            v-model="holidayStatus"
            active-text="开启"
            inactive-text="关闭">
          </el-switch>
        </div>
        <div class="item">
          <span class="title" style="vertical-align: top">备注：</span>
          <el-input type="textarea" v-model="holidayRemark" class="holidayName" maxlength="100"
                    style="width:300px"></el-input>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addHolidayVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHolidayVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getARList, changeARState } from '@/api/attendance'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'

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
        addHolidayVisible: false,
        holidayName: '',
        holidayStatus: true,
        holidayRemark: '',
        multipleSelection: []
      }
    },
    created () {
      this._getARList()
    },
    methods: {
      _getARList () {
        getARList(this.listQuery).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
          } else {
            Message.error('出勤规则列表获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('出勤规则列表获取失败，请刷新重试！')
        })
      },
      _changeARState (code, state) {
        changeARState(code, state).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改出勤规则状态成功！')
            this._getARList()
          } else {
            Message.error('更改出勤规则状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改出勤规则状态失败，请重试！')
        })
      },
      handlerAddDays () {
        // 新增假期
        // this.addHolidayVisible = true
        // this.$router.push({
        //   path: '/attendance/baseConfig/attendanceRule/attendanceRuleTable'
        // })
      },
      handleEdit (item) {
        // 编辑
        switch (item.SheetCode) {
          case 'OverTime':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/overtimeRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          case 'DaysOff':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/offdayRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          case 'BusinessTrip':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/businessRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          case 'PublicTrip':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/publicRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          case 'Supplement':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/supplementRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          case 'Appeal':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/appealRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          case 'Leave':
            this.$router.push({
              path: '/attendance/baseConfig/attendanceRule/leaveRule',
              query: {
                configCode: item.ConfigCode
              }
            })
            break
          default:
            break
        }
      },
      handleState (item) {
        // 单行数据改变状态
        this._changeARState(item.ConfigCode, item.State === 1 ? 0 : 1)
      },
      handlerBatchStop () {
        // 批量停用
        let arr = this.multipleSelection.map(item => {
          return item.ConfigCode
        })
        this._changeARState(JSON.stringify(arr), 0)
        changeARState(JSON.stringify(arr), 0).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('更改出勤规则状态成功！')
            this._getARList()
          } else {
            Message.error('更改出勤规则状态失败，请重试！')
          }
        }).catch(() => {
          Message.error('更改出勤规则状态失败，请重试！')
        })
      },
      handleSelectionChange (val) {
        // 多选
        this.multipleSelection = val
      },
      deleteOne () {
        // 删除此行

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
  .attendance-rule-container
    .btn-container
      margin-bottom 10px
      &::after
        clear-float()
      button
        float right

  .add-holiday-dialog
    .holiday-container
      .item
        margin-bottom 20px
        .title
          display inline-block
          width 100px
          text-align right
</style>
