<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：考勤组
-->

<template>
  <div class="attendance-team-container mg-30">
    <div class="btn-container" style="margin-bottom: 10px">
      <el-button @click="handlerAddTeam()" class="left-btn" type="primary" style="margin-left: 10px">
        新增考勤组
      </el-button>

      <el-button @click="handlerEditTeam()" class="left-btn" type="primary">
        复制考勤组
      </el-button>
    </div>
    <div class="contant-container">
      <div class="table-container">
        <el-table :data="list" border style="width: 100%;">

          <el-table-column
            align="center"
            label="名称"
          >
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.row.Code">{{ scope.row.GroupName }}</el-radio>
            </template>
          </el-table-column>

          <!--<el-table-column-->
            <!--align="center"-->
            <!--prop="EmpNumber"-->
            <!--label="打卡方式"-->
          <!--&gt;-->
          <!--</el-table-column>-->

          <el-table-column
            align="center"
            prop="StateName"
            label="状态"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="OrgRangeLabel"
            label="适用部门（初始化）"
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
                @click="handlerEditTeam(scope.row)"
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
  import { REQ_OK } from '@/api/config'
  import { getGroupList } from '@/api/attendance'
  import { Message } from 'element-ui'
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
        radio: ''
      }
    },
    created () {
      this.$store.dispatch('setLoadingState', true)
      this._getGroupList()
    },
    methods: {
      _getGroupList () {
        getGroupList(this.listQuery).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
            this.$store.dispatch('setLoadingState', false)
          } else {
            this.$store.dispatch('setLoadingState', false)
            Message.error('考勤组列表获取失败，请刷新重试！')
          }
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          Message.error('考勤组列表获取失败，请刷新重试！')
        })
      },
      handlerAddTeam () {
        // 新增班次
        this.$router.push({
          path: '/attendance/baseConfig/attendanceTeam/addAttendanceTeam'
        })
      },
      handlerEditTeam (item) {
        // 编辑
        this.$router.push({
          path: '/attendance/baseConfig/attendanceTeam/editAttendanceTeam',
          query: {
            groupCode: item.GroupCode
          }
        })
      },
      handleState () {
        // 单行数据改变状态
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
  .attendance-team-container
    .btn-container
      &::after
        clear-float()
      button
        float right
</style>
