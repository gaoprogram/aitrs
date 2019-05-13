<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：详情
-->

<template>
  <div class="detail-container mg-30">
    <el-dialog :title="title"
               :visible="true"
               :show-close="true"
               :modal="false"
               center
               fullscreen
               :modal-append-to-body="false"
               style="min-width: 1000px"
               @close="handleClose"
    >
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="基础设置" name="first">
            <base-set :strJson="strJson"></base-set>
          </el-tab-pane>
          <el-tab-pane label="考勤类型" name="second">
            <attendance-type :parentJson="strJson"></attendance-type>
          </el-tab-pane>
          <el-tab-pane label="打卡" name="third">
            <clock></clock>
          </el-tab-pane>
          <el-tab-pane label="规则" name="fourth">
            <rule></rule>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary */

  import { REQ_OK } from '@/api/config'
  import { getGroup } from '@/api/attendance'
  import { Message } from 'element-ui'
  import BaseSet from '@/components/attendance/base-config/attendance-team/base-set'
  import AttendanceType from '@/components/attendance/base-config/attendance-team/attendance-type'
  import Clock from '@/components/attendance/base-config/attendance-team/clock'
  import Rule from '@/components/attendance/base-config/attendance-team/rule'
  export default {
    data () {
      return {
        title: '新增考勤组',
        activeName: 'first',
        strJson: {}
      }
    },
    created () {
      if (this.$route.query.groupCode) {
        this.title = '编辑考勤组'
        this._getGroup()
      }
    },
    methods: {
      _getGroup () {
        getGroup(this.$route.query.groupCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.strJson = res.data.Data
          } else {
            Message.error('考勤组详情获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('考勤组详情获取失败，请刷新页面重试！')
        })
      },
      handleTabClick () {
        // tab切换
      },
      // 右上角关闭按钮
      handleClose () {
        this.$router.back()
      }
    },
    components: {
      BaseSet,
      AttendanceType,
      Clock,
      Rule
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .detail-container
    .content
      width 964px
      padding 20px
      box-sizing border-box
      margin 0 auto
      box-shadow()
      .header-container
        margin-bottom 20px
        .item
          display inline-block
          margin-right 20px
          span
            display inline-block
            margin-right 10px
          .input
            width 200px
</style>
