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
          <span class="name w-210">申请单位：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.Unit"
          >
            <el-option  v-for="item in Unit" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">最小单位：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.Min"
          >
            <el-option v-for="item in Min" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">工时计算：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.CalOpt"
          >
            <el-option v-for="item in getWorkTimeEqual" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">日折算：</span>
          1日 = <el-input type="text" v-model="ruleObj.DayConvert" class="input" style="width:100px;" ></el-input> 小时
        </div>
        <div class="item-row">
          <span class="name w-210">上下午分割点：</span>
          <el-time-picker
            style="width: 217px"
            format="HH:mm"
            v-model="ruleObj.DayCut"
            value-format="HH:mm"
            placeholder="时间点">
          </el-time-picker>
        </div>

        <div class="item-row">
          <span class="name w-210">是否限定申请额度：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.LimitOpt"
                     clearable
                     multiple
          >
            <el-option v-for="item in LimitOpt" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
          <span v-if="ruleObj.LimitOpt.toString().indexOf('1') !== -1" style="margin-left: 10px">
            每次
            <el-input type="text" v-model="ruleObj.EachTime" class="input" style="width:100px;">
            </el-input>
            小时
          </span>
          <span v-if="ruleObj.LimitOpt.toString().indexOf('2') !== -1" style="margin-left: 10px">
            每月
            <el-input type="text" v-model="ruleObj.EachMonth" class="input" style="width:100px;">
            </el-input>
            小时
          </span>
        </div>
        <div class="item-row" v-if="ruleObj.LimitOpt.toString().indexOf('1') !== -1 || ruleObj.LimitOpt.toString().indexOf('2') !== -1">
          <span class="name w-210">可超出额度申请：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.AllowOverflow"
          >
            <el-option v-for="item in AllowOverflow" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">申请天数计算：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.APDayType"
          >
            <el-option v-for="item in getADType" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提示</span>
          </div>
          <div class="text item">
            一个考勤组只能挂一个规则，如果一旦更新保存，则新保存的规则将覆盖原数据。
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
    getWorkTimeEqual,
    getAUnit,
    getLimitOpt,
    getADType,
    getBusinessTripRule,
    addBusinessTripRule,
    getGroupList
  } from '@/api/attendance'
  import { getEmpType } from '@/api/salary'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    data () {
      return {
        title: '新增出差规则',
        ruleObj: {
          Id: 0,
          RuleCode: '',
          RuleName: '',
          Group: [],
          EmpType: [],
          Description: '',
          Unit: '',
          Min: '',
          CalOpt: '',
          DayConvert: '',
          DayCut: '12:00',
          LimitOpt: '',
          EachTime: '',
          EachMonth: '',
          AllowOverflow: '',
          APDayType: ''
        },
        ruleName: '',
        attendanceRelation: '',
        allowSwitch: false,
        Group: [],
        getEmpType: [],
        Unit: [],
        Min: [
          {
            value: 0.5,
            code: 0.5
          },
          {
            value: 1,
            code: 1
          }
        ],
        LimitOpt: [],
        getWorkTimeEqual: [],
        getADType: [],
        AllowOverflow: [
          {
            value: '是',
            code: 1
          },
          {
            value: '否',
            code: 0
          }
        ]
      }
    },
    created () {
      try {
        this._getGroupList()
        this._getWorkTimeEqual()
        this._getADType()
        this._getEmpType()
        this._getAUnit()
        this._getLimitOpt()
        if (this.$route.query.ruleCode) {
          this.title = '编辑出差规则'
          this._getBusinessTripRule()
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
      async _getWorkTimeEqual () {
        // 工时计算方式
        await getWorkTimeEqual().then(res => {
          if (res.data.State === REQ_OK) {
            this.getWorkTimeEqual = res.data.Data
          } else {
            Message.error('工时计算方式获取失败！')
          }
        }).catch(() => {
          Message.error('工时计算方式获取失败！')
        })
      },
      async _getADType () {
        // 加班补偿方式
        await getADType().then(res => {
          if (res.data.State === REQ_OK) {
            this.getADType = res.data.Data
          } else {
            Message.error('申请天数计算方式获取失败！')
          }
        }).catch(() => {
          Message.error('申请天数计算方式获取失败！')
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
      async _getAUnit () {
        // 申请单位
        await getAUnit().then(res => {
          if (res.data.State === REQ_OK) {
            this.Unit = res.data.Data
          } else {
            Message.error('申请单位获取失败！')
          }
        }).catch(() => {
          Message.error('申请单位获取失败！')
        })
      },
      async _getLimitOpt () {
        // 申请限定条件
        await getLimitOpt().then(res => {
          if (res.data.State === REQ_OK) {
            this.LimitOpt = res.data.Data
          } else {
            Message.error('申请限定条件获取失败！')
          }
        }).catch(() => {
          Message.error('申请限定条件获取失败！')
        })
      },
      async _getBusinessTripRule () {
        // 获取调休规则
        await getBusinessTripRule(this.$route.query.ruleCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.ruleObj = res.data.Data
            this.ruleObj.DayCut = this.utilTimeHHmm(new Date(this.replaceTime(this.ruleObj.DayCut)))
          } else {
            Message.error('出差规则详情获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('出差规则详情获取失败，请刷新重试！')
        })
      },
      async _addBusinessTripRule () {
        // 保存调休规则
        if (this.ruleObj.Priority === 2) {
          this.ruleObj.PSort = this.PSort
        }
        await addBusinessTripRule(this.$route.query.configCode, JSON.stringify(this.ruleObj)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('出差规则保存成功！')
            this.$router.back()
          } else {
            Message.error('出差规则保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('出差规则保存失败，请重试！')
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
        this._addBusinessTripRule()
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      },
      utilTimeHHmm (time) {
        if (time) {
          var h = time.getHours()
          h = h < 10 ? ('0' + h) : h
          var m = time.getMinutes()
          m = m < 10 ? ('0' + m) : m
          return `${h}:${m}`
        }
        return `00:00`
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
