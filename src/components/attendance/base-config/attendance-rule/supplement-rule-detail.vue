<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：详情
-->

<template>
  <div class="content">
    <el-dialog :title="title"
               :visible="true"
               :show-close="false"
               :modal="false"
               center
               fullscreen
               custom-class="rule-detail-dialog"
               :modal-append-to-body="false"
               append-to-body
               style="min-width: 1000px"
    >
      <div class="content">
        <div class="item-row">
          <span class="name w-210">规则名称：</span>
          <el-input type="text" v-model="ruleObj.RuleName" class="input" style="width:217px;"></el-input>
        </div>
        <div class="item-row">
          <span class="name w-210">适用考勤组：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.Group"
                     multiple
                     style="width:217px;"
          >
            <el-option v-for="item in Group" :key="item.GroupCode" :label="item.GroupName" :value="item.GroupCode">
            </el-option>
          </el-select>
        </div>

        <span class="cut-line"></span>

        <div class="item-row">
          <span class="name w-210" style="vertical-align: top">申请说明：</span>
          <el-input type="textarea" v-model="ruleObj.Description" class="input" style="width:217px;"
                    placeholder="请按公司规定和剩余额度申请">
          </el-input>
        </div>
        <div class="item-row">
          <span class="name w-210">员工类型：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.EmpType"
                     multiple
          >
            <el-option v-for="item in getEmpType" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">补签上限：</span>
          <el-input type="text" v-model="ruleObj.MaxCount" class="input" style="width:100px;" ></el-input> 次/月
        </div>
        <div class="item-row">
          <span class="name w-210">最后申请日：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.LastDate"
          >
            <el-option v-for="item in 31" :key="item" :label="`每月${item}号`" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210"></span>
          <span>超过该日期不能补签一个月内（上月X+1日到本月X日）的考勤。建议与薪资周期一致</span>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提示</span>
          </div>
          <div class="text item">
            1. 当晚于当月X日时，代表只允许员工在每月X日至月末发起补签申请。<br />
            2. 当早于当月X日时，代表只允许员工在每月月初至X日发起补签申请。<br />
            3. 建议参见薪资期间来填写填写补签最后申请日。确保在薪资期间结束日前提交完毕。<br />
            4. 一个考勤组只能挂一个规则，如果一旦更新保存，则新保存的规则将覆盖原数据。
          </div>
        </el-card>
        <div class="el-dialog__footer" style="text-align: center">
          <span class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script type="text/ecmascript-6">
  import {
    getSupplementRule,
    addSupplementRule,
    getGroupList
  } from '@/api/attendance'
  import { getEmpType } from '@/api/salary'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    data () {
      return {
        title: '新增补签规则',
        ruleObj: {
          Id: 0,
          RuleCode: '',
          RuleName: '',
          Group: [],
          EmpType: [],
          Description: '',
          MaxCount: '',
          LastDate: ''
        },
        ruleName: '',
        attendanceRelation: '',
        allowSwitch: false,
        Group: [],
        getEmpType: []
      }
    },
    created () {
      try {
        this._getGroupList()
        this._getEmpType()
        if (this.$route.query.ruleCode) {
          this.title = '编辑补签规则'
          this._getSupplementRule()
        }
      } catch (e) {
        console.log(e)
      }
    },
    methods: {
      async _getGroupList () {
        await getGroupList().then(res => {
          if (res.data.State === REQ_OK) {
            this.Group = res.data.Data
          } else {
            Message.error('考勤组获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('考勤组获取失败，请刷新重试！')
        })
      },
      async _getEmpType () {
        await getEmpType().then(res => {
          if (res.data.State === REQ_OK) {
            this.getEmpType = res.data.Data
          } else {
            Message.error('员工类型获取失败！')
          }
        }).catch(() => {
          Message.error('员工类型获取失败！')
        })
      },
      async _getSupplementRule () {
        // 获取规则
        await getSupplementRule(this.$route.query.ruleCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.ruleObj = res.data.Data
          } else {
            Message.error('补签规则详情获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('补签规则详情获取失败，请刷新重试！')
        })
      },
      async _addSupplementRule () {
        await addSupplementRule(this.$route.query.configCode, JSON.stringify(this.ruleObj)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('补签规则保存成功！')
            this.$router.back()
          } else {
            Message.error('补签规则保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('补签规则保存失败，请重试！')
        })
      },
      handleEdit () {
        // 编辑
      },
      handleDelete () {
        // 删除
      },
      cancel () {
        // 取消
        this.$router.back()
      },
      save () {
        // 保存
        this._addSupplementRule()
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  @import "~common/css/variable.styl"
  .rule-detail-dialog
    .content
      width 964px
      padding 20px
      box-sizing border-box
      margin 0 auto
      box-shadow()
      .item-row
        margin-bottom 20px
        .name
          display inline-block
          width 100px;
          text-align left
        .font-bold
          font-weight bold
        .w-210
          width 130px
        .psort_dragging
          margin-bottom: 10px;
          font-size: 0;
          width: 217px;
          padding-left: 15px;
          box-sizing: border-box;
          border: 1px solid #d8dce5;
          border-radius: 4px;
          height: 40px;
          line-height: 40px;
          &:hover
            cursor pointer
      .cut-line
        display inline-block
        width 100%
        margin: 0 0 20px 0
        border-bottom 1px solid $color-border
</style>
