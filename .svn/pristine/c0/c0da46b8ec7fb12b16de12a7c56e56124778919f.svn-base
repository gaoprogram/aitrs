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
          <span class="name">规则名称：</span>
          <el-input type="text" v-model="ruleObj.RuleName" class="input" style="width:217px;"></el-input>
        </div>
        <div class="item-row">
          <span class="name">适用考勤组：</span>
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
          <span class="name font-bold">工作日加班</span>
        </div>
        <div class="item-row">
          <span class="name">允许加班：</span>
          <el-switch
            v-model="ruleObj.WorkDayFlag"
            active-text="允许"
            inactive-text="不允许"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </div>
        <div class="item-row">
          <span class="name">加班方式计算：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.WorkDayMethod"
          >
            <el-option v-for="item in getCalMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">补偿方式：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.WorkDayEqualize"
                     multiple
          >
            <el-option v-for="item in getEqualizeMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">加班调休比：</span>
          工作日加班数 : 调休小时数 = 1 :
          <el-input type="text" v-model="ruleObj.WorkDayRation" class="input" style="width:100px;"></el-input>
        </div>
        <span class="cut-line"></span>
        <div class="item-row">
          <span class="name font-bold">休息日加班</span>
        </div>
        <div class="item-row">
          <span class="name">允许加班：</span>
          <el-switch
            v-model="ruleObj.RestDayFlag"
            active-text="允许"
            inactive-text="不允许"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </div>
        <div class="item-row">
          <span class="name">加班方式计算：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.RestDayMethod"
          >
            <el-option v-for="item in getCalMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">补偿方式：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.RestDayEqualize"
                     multiple
          >
            <el-option v-for="item in getEqualizeMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">加班调休比：</span>
          工作日加班数 : 调休小时数 = 1 :
          <el-input type="text" v-model="ruleObj.RestDayRation" class="input" style="width:100px;"></el-input>
        </div>
        <span class="cut-line"></span>
        <div class="item-row">
          <span class="name font-bold">法定假日加班</span>
        </div>
        <div class="item-row">
          <span class="name">允许加班：</span>
          <el-switch
            v-model="ruleObj.LegalHolidayFlag"
            active-text="允许"
            inactive-text="不允许"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </div>
        <div class="item-row">
          <span class="name">加班方式计算：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.LegalHolidayMethod"
          >
            <el-option v-for="item in getCalMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">补偿方式：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.LegalHolidayEqualize"
                     multiple
          >
            <el-option v-for="item in getEqualizeMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">加班调休比：</span>
          工作日加班数 : 调休小时数 = 1 :
          <el-input type="text" v-model="ruleObj.LegalHolidayRation" class="input" style="width:100px;"></el-input>
        </div>
        <span class="cut-line"></span>
        <div class="item-row">
          <span class="name font-bold">公司假日加班</span>
        </div>
        <div class="item-row">
          <span class="name">允许加班：</span>
          <el-switch
            v-model="ruleObj.OfficeHolidayFlag"
            active-text="允许"
            inactive-text="不允许"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </div>
        <div class="item-row">
          <span class="name">加班方式计算：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.OfficeHolidayMethod"
          >
            <el-option v-for="item in getCalMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">补偿方式：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.OfficeHolidayEqualize"
                     multiple
          >
            <el-option v-for="item in getEqualizeMethod" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name">加班调休比：</span>
          工作日加班数 : 调休小时数 = 1 :
          <el-input type="text" v-model="ruleObj.OfficeHolidayRation" class="input" style="width:100px;"></el-input>
        </div>
        <span class="cut-line"></span>
        <div class="item-row">
          <span class="name w-210" style="vertical-align: top">申请说明：</span>
          <el-input type="textarea" v-model="ruleObj.Description" class="input" style="width:300px;"
                    placeholder="请按公司规定上传相应说明或者证明">
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
          <span class="name w-210">每个自然月转调休最大累计小时：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.EnableMax"
                     style="width: 100px"
          >
            <el-option v-for="item in EnableMax" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
          <span v-if="ruleObj.EnableMax === 1">
            <el-input type="text" v-model="ruleObj.MaxPerMonth" class="input" style="width:100px;">
            </el-input>
            小时
          </span>
        </div>
        <div class="item-row">
          <span class="name w-210">申请单位：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.Unit"
                     style="width: 100px"
          >
            <el-option  v-for="item in Unit" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">最小单位：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.Min"
                     style="width: 100px"
          >
            <el-option v-for="item in Min" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
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
        <div class="item-row" v-if="ruleObj.LimitOpt === 2 || ruleObj.LimitOpt === 3">
          <span class="name w-210">可超出额度申请：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.AllowOverflow"
                     style="width: 100px"
          >
            <el-option v-for="item in AllowOverflow" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="item-row">
          <span class="name w-210">生成调休额度有效期至：</span>
          <el-select class="filter-item"
                     v-model="ruleObj.ExpireOpt"
          >
            <el-option v-for="item in ExpireOpt" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
          <span v-show="ruleObj.ExpireOpt === 2">
            <el-input type="text" v-model="ruleObj.ExpireDays" class="input" style="width:100px;">
            </el-input>
            天
          </span>
          <span v-show="ruleObj.ExpireOpt === 3">
            <el-select class="filter-item"
                       v-model="ruleObj.ExpireYear"
            >
              <el-option v-for="item in ExpireYear" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="ruleObj.ExpireDate"
              type="date"
              value-format="MM-dd"
              format="MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </span>
        </div>
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
    getCalMethod,
    getEqualizeMethod,
    getAUnit,
    getLimitOpt,
    getExpireOpt,
    getOverTimeRule,
    addOverTimeRule,
    getGroupList
  } from '@/api/attendance'
  import { getEmpType } from '@/api/salary'
  import { Message } from 'element-ui'
  import { REQ_OK } from '@/api/config'
  export default {
    data () {
      return {
        title: '新增加班规则',
        ruleObj: {
          Id: 0,
          RuleCode: '',
          RuleName: '',
          Group: [],
          EmpType: [],
          WorkDayFlag: '',
          WorkDayMethod: '',
          WorkDayEqualize: '',
          WorkDayRation: '',
          RestDayFlag: '',
          RestDayMethod: '',
          RestDayEqualize: '',
          RestDayRation: '',
          LegalHolidayFlag: '',
          LegalHolidayMethod: '',
          LegalHolidayEqualize: '',
          LegalHolidayRation: '',
          OfficeHolidayFlag: '',
          OfficeHolidayMethod: '',
          OfficeHolidayEqualize: '',
          OfficeHolidayRation: '',
          Description: '',
          EnableMax: '',
          MaxPerMonth: '',
          Unit: '',
          Min: '',
          LimitOpt: '',
          EachTime: '',
          EachMonth: '',
          AllowOverflow: '',
          ExpireOpt: '',
          ExpireDays: '',
          ExpireYear: '',
          ExpireDate: ''
        },
        ruleName: '',
        attendanceRelation: '',
        allowSwitch: false,
        Group: [],
        getCalMethod: [],
        getEqualizeMethod: [],
        getEmpType: [],
        EnableMax: [
          {
            value: '是',
            code: 1
          },
          {
            value: '否',
            code: 0
          }
        ],
        Unit: [],
        Min: [
          {
            value: 0.1,
            code: 0.1
          },
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
        AllowOverflow: [
          {
            value: '是',
            code: 1
          },
          {
            value: '否',
            code: 0
          }
        ],
        ExpireOpt: [
          {
            value: '不失效可累计',
            code: 1
          },
          {
            value: '指定天数后失效',
            code: 2
          },
          {
            value: '指定日期后失效',
            code: 3
          }
        ],
        ExpireYear: [
          {
            value: '当年',
            code: 0
          },
          {
            value: '次年',
            code: 1
          }
        ]
      }
    },
    created () {
      this._getGroupList()
      this._getCalMethod()
      this._getEqualizeMethod()
      this._getEmpType()
      this._getAUnit()
      this._getLimitOpt()
      if (this.$route.query.ruleCode) {
        this.title = '编辑加班规则'
        this._getOverTimeRule()
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
      async _getCalMethod () {
        // 加班计算方式
        await getCalMethod().then(res => {
          if (res.data.State === REQ_OK) {
            this.getCalMethod = res.data.Data
          } else {
            Message.error('加班计算方式获取失败！')
          }
        }).catch(() => {
          Message.error('加班计算方式获取失败！')
        })
      },
      async _getEqualizeMethod () {
        // 加班补偿方式
        await getEqualizeMethod().then(res => {
          if (res.data.State === REQ_OK) {
            this.getEqualizeMethod = res.data.Data
          } else {
            Message.error('加班补偿方式获取失败！')
          }
        }).catch(() => {
          Message.error('加班补偿方式获取失败！')
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
      async _getExpireOpt () {
        // 调休过期限定条件
        await getExpireOpt().then(res => {
        })
      },
      async _getOverTimeRule () {
        // 获取加班规则
        await getOverTimeRule(this.$route.query.ruleCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.ruleObj = res.data.Data
            this.ruleObj.ExpireDate = new Date(this.replaceTime(this.ruleObj.ExpireDate))
          } else {
            Message.error('加班规则详情获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('加班规则详情获取失败，请刷新重试！')
        })
      },
      async _addOverTimeRule () {
        // 保存加班规则
        await addOverTimeRule(this.$route.query.configCode, JSON.stringify(this.ruleObj)).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('加班规则保存成功！')
            this.$router.back()
          } else {
            Message.error('加班规则保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('加班规则保存失败，请重试！')
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
        this._addOverTimeRule()
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
          width 210px
      .cut-line
        display inline-block
        width 100%
        margin: 0 0 20px 0
        border-bottom 1px solid $color-border
</style>
