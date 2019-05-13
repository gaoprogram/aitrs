<!--
  User: xxxxxxx
  Date: 2018/5/2
  功能：详情
-->

<template>
  <div class="detail-container mg-30">
    <el-dialog :title="title"
               :visible="true"
               :show-close="false"
               :modal="false"
               center
               fullscreen
               :modal-append-to-body="false"
               style="min-width: 1000px"
    >
      <div class="content">
        <div class="header-container">
          <div class="item">
            <span>班次名称：</span>
            <el-input type="text" v-model="strJson.ScheduleName" class="input"></el-input>
          </div>
          <div class="item">
            <span>班次简称：</span>
            <el-input type="text" v-model="strJson.ShortName" class="input"></el-input>
          </div>
          <div class="item">
            <span>状态：</span>
            <el-switch
              v-model="state"
              active-text="启用"
              inactive-text="停用">
            </el-switch>
          </div>
        </div>
        <div class="contant-container">
          <div class="contant-header" style="margin-bottom: 20px">
            <span style="margin-right: 10px">班次时段：</span>
            <el-radio-group v-model="tabPosition" @change="handlerTab" size="small">
              <el-radio-button label="1" :disabled="one">1次上下班</el-radio-button>
              <el-radio-button label="2" :disabled="two">2次上下班</el-radio-button>
              <el-radio-button label="3" :disabled="three">3次上下班</el-radio-button>
              <el-radio-button label="4" :disabled="four">4次上下班</el-radio-button>
            </el-radio-group>
          </div>
          <div class="contant-table">
            <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
                 style="width: 100%;"
            >
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
                  <colgroup>
                    <col name="el-table_1_column_12" width="6%">
                    <col name="el-table_1_column_13" width="12%">
                    <col name="el-table_1_column_14" width="10%">
                    <col name="el-table_1_column_15" width="10%">
                    <col name="el-table_1_column_16" width="10%">
                    <col name="el-table_1_column_17" width="12%">
                    <col name="el-table_1_column_18" width="10%">
                    <col name="el-table_1_column_19" width="10%">
                    <col name="el-table_1_column_20" width="10%">
                    <col name="el-table_1_column_21" width="10%">
                    <col name="gutter" width="">
                  </colgroup>
                  <thead class="has-gutter">
                  <tr class="">
                    <th colspan="1" rowspan="1" class="el-table_1_column_12 is-center is-leaf">
                      <div class="cell">时段</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_13 is-center is-leaf">
                      <div class="cell">上班时间</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_14 is-center is-leaf">
                      <div class="cell">最早签到时间（分钟）</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_15 is-center is-leaf">
                      <div class="cell">计入迟到起始值（分钟）</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_16 is-center is-leaf">
                      <div class="cell">计入旷工起始值（分钟）</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_17 is-center is-leaf">
                      <div class="cell">下班时间</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_18 is-center is-leaf">
                      <div class="cell">最晚签退时间（分钟）</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_19 is-center is-leaf">
                      <div class="cell">计入早退起始值（分钟）</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_20 is-center is-leaf">
                      <div class="cell">计入旷工起始值（分钟）</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_1_column_21 is-center is-leaf">
                      <div class="cell">操作</div>
                    </th>
                    <th class="gutter" style="width: 0px;"></th>
                  </tr>
                  </thead>
                </table>
              </div>
              <div class="el-table__body-wrapper is-scroll-left demo-ruleForm">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                  <colgroup>
                    <col name="el-table_1_column_12" width="6%">
                    <col name="el-table_1_column_13" width="12%">
                    <col name="el-table_1_column_14" width="10%">
                    <col name="el-table_1_column_15" width="10%">
                    <col name="el-table_1_column_16" width="10%">
                    <col name="el-table_1_column_17" width="12%">
                    <col name="el-table_1_column_18" width="10%">
                    <col name="el-table_1_column_19" width="10%">
                    <col name="el-table_1_column_20" width="10%">
                    <col name="el-table_1_column_21" width="10%">
                  </colgroup>
                  <tbody>
                  <tr class="el-table__row">
                    <td class="el-table_1_column_12 is-center">
                      <div class="cell"></div>
                    </td>
                    <td class="el-table_1_column_13 is-center">
                      <div class="cell">
                      </div>
                    </td>
                    <td class="el-table_1_column_14 is-center">
                      <div class="cell">
                        <el-input class="operator-input"
                                  type="number"
                                  v-model="restEarlyValue"
                                  @change="inputRestEarlyValue"
                                  min="0"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_15 is-center">
                      <div class="cell">
                        <el-input class="operator-input"
                                  type="number"
                                  v-model="restLateValue"
                                  @change="inputRestLateValue"
                                  min="0"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_16 is-center">
                      <div class="cell">
                        <el-input class="operator-input"
                                  type="number"
                                  v-model="restAbsentForCheckInValue"
                                  @change="inputRestAbsentForCheckInValue"
                                  min="0"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_17 is-center">
                      <div class="cell">
                      </div>
                    </td>
                    <td class="el-table_1_column_18 is-center">
                      <div class="cell">
                        <el-input class="operator-input"
                                  type="number"
                                  v-model="restPastValue"
                                  @change="inputRestPastValue"
                                  min="0"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_19 is-center">
                      <div class="cell">
                        <el-input class="operator-input"
                                  type="number"
                                  v-model="restLeaveValue"
                                  @change="inputRestLeaveValue"
                                  min="0"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_20 is-center">
                      <div class="cell">
                        <el-input class="operator-input"
                                  type="number"
                                  v-model="restAbsentForCheckOutValue"
                                  @change="inputRestAbsentForCheckOutValue"
                                  min="0"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_21 is-center">
                      <div class="cell">
                      </div>
                    </td>
                  </tr>
                  <tr class="el-table__row"
                      v-for="(item, index) in strJson.TimeSlot"
                      :key="index"
                  >
                    <td class="el-table_1_column_12 is-center">
                      <div class="cell" v-html="index + 1"></div>
                    </td>
                    <td class="el-table_1_column_13 is-center">
                      <div class="cell">
                        <el-select class="filter-item"
                                   size="mini"
                                   v-model="item.CheckInDay"
                                   style="width: 97px;margin-bottom: 5px"
                        >
                          <el-option v-for="item in threeDaySelect" :key="item.code" :label="item.value" :value="item.code">
                          </el-option>
                        </el-select>
                        <el-time-picker
                          style="width: 97px"
                          size="mini"
                          format="HH:mm"
                          v-model="item.CheckInTime"
                          value-format="HH:mm"
                          placeholder="时间点">
                        </el-time-picker>
                      </div>
                    </td>
                    <td class="el-table_1_column_14 is-center">
                      <div class="cell el-form-item">
                        <el-input class="operator-input el-form-item" type="number" v-model="item.Early" min="0" @blur="handleBlur($event)">
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_15 is-center">
                      <div class="cell">
                        <el-input
                          class="operator-input el-form-item"
                          type="number"
                          v-model="item.Late" min="0" @blur="handleBlur($event)"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_16 is-center">
                      <div class="cell">
                        <el-input class="operator-input el-form-item"
                                  type="number"
                                  v-model="item.AbsentForCheckIn"
                                  min="0"
                                  @blur="handleBlur($event)"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_17 is-center">
                      <div class="cell">
                        <el-select class="filter-item"
                                   size="mini"
                                   v-model="item.CheckOutDay"
                                   style="width: 97px;margin-bottom: 5px"
                        >
                          <el-option v-for="item in threeDaySelect" :key="item.code" :label="item.value" :value="item.code">
                          </el-option>
                        </el-select>
                        <el-time-picker
                          style="width: 97px;"
                          size="mini"
                          v-model="item.CheckOutTime"
                          format="HH:mm"
                          value-format="HH:mm"
                          :picker-options="{
                            selectableRange: endTime(item.CheckInDay, item.CheckOutDay, item.CheckInTime)
                          }"
                          placeholder="时间点">
                        </el-time-picker>
                      </div>
                    </td>
                    <td class="el-table_1_column_18 is-center">
                      <div class="cell">
                        <el-input class="operator-input el-form-item"
                                  type="number" v-model="item.Past" min="0"
                                  @blur="handleBlur($event)"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_19 is-center">
                      <div class="cell">
                        <el-input class="operator-input el-form-item"
                                  type="number" v-model="item.Leave" min="0"
                                  @blur="handleBlur($event)"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_20 is-center">
                      <div class="cell">
                        <el-input class="operator-input el-form-item"
                                  type="number" v-model="item.AbsentForCheckOut" min="0"
                                  @blur="handleBlur($event)"
                        >
                        </el-input>
                      </div>
                    </td>
                    <td class="el-table_1_column_21 is-center">
                      <div class="cell">
                        <!--<el-button-->
                          <!--type="text"-->
                          <!--size="small"-->
                          <!--@click="handleSave(item)"-->
                        <!--&gt;-->
                          <!--保存-->
                        <!--</el-button>-->

                        <el-button
                          type="text"
                          size="small"
                          @click="deleteOne(item, index)"
                          :disabled="strJson.TimeSlot.length === 1 ? true : false"
                        >删除
                        </el-button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div><span style="color: red;">*</span>&nbsp;{{ promptText }}</div>
            <el-tooltip class="item"
                        effect="dark"
                        content="新增一次上下班"
                        placement="bottom"
            >
              <el-button type="primary"
                         size="small"
                         @click.native.prevent="addRow()"
                         style="margin-top: 10px;margin-bottom: 20px;"
              >
                <i class="el-icon-plus"></i>
              </el-button>
            </el-tooltip>
            <div v-if="strJson.TimeSlot.length === 1">
              <div class="rest-item" style="display: inline-block;margin-right: 20px">
                <span>休息开始：</span>
                <el-select class="filter-item"
                           size="mini"
                           v-model="strJson.BreakStartDay"
                           style="width: 100px;margin-bottom: 5px"
                >
                  <el-option v-for="item in threeDaySelect" :key="item.code" :label="item.value" :value="item.code">
                  </el-option>
                </el-select>
                <el-time-picker
                  style="width: 100px"
                  size="mini"
                  v-model="strJson.BreakStartTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="时间点">
                </el-time-picker>
              </div>
              <div class="rest-item" style="display: inline-block">
                <span>休息结束：</span>
                <el-select class="filter-item"
                           size="mini"
                           v-model="strJson.BreakEndDay"
                           style="width: 100px;margin-bottom: 5px"
                >
                  <el-option v-for="item in threeDaySelect" :key="item.code" :label="item.value" :value="item.code">
                  </el-option>
                </el-select>
                <el-time-picker
                  style="width: 100px"
                  size="mini"
                  v-model="strJson.BreakEndTime"
                  format="HH:mm"
                  :picker-options="{
                    selectableRange: endTime(strJson.BreakStartDay, strJson.BreakEndDay, strJson.BreakStartTime)
                  }"
                  value-format="HH:mm"
                  placeholder="时间点">
                </el-time-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-unneeded-ternary,no-constant-condition */

  import { REQ_OK } from '@/api/config'
  import { addScheduleConfig, getScheduleConfig, deleteScheduleTimeSlot } from '@/api/attendance'
  import { Message, MessageBox } from 'element-ui'
  export default {
    data () {
      return {
        title: '新增班次',
        name: '',
        state: false,
        tabPosition: '1',
        restDayValue: 0,
        one: false,
        two: false,
        three: false,
        four: false,
        strJson: {
          ScheduleCode: '',
          ScheduleName: '',
          ShortName: '',
          State: false,
          TimeSlot: [
            {
              Id: 0,
              CheckInDay: 0,
              CheckInTime: '00:00',
              Early: '',
              Late: '',
              AbsentForCheckIn: '',
              CheckOutDay: 0,
              CheckOutTime: '00:00',
              Past: '',
              Leave: '',
              AbsentForCheckOut: ''
            }
          ],
          BreakStartDay: '',
          BreakStartTime: '',
          BreakEndDay: '',
          BreakEndTime: ''
        },
        defaultWorkTime: {
          Id: 0,
          CheckInDay: 0,
          CheckInTime: '00:00',
          Early: '',
          Late: '',
          AbsentForCheckIn: '',
          CheckOutDay: 0,
          CheckOutTime: '00:00',
          Past: '',
          Leave: '',
          AbsentForCheckOut: ''
        },
        checkInDaySelect: [
          {
            value: '前日',
            code: -1
          },
          {
            value: '当日',
            code: 0
          }
        ],
        checkOutDaySelect: [
          {
            value: '当日',
            code: 0
          },
          {
            value: '次日',
            code: 1
          }
        ],
        threeDaySelect: [
          {
            value: '前日',
            code: -1
          },
          {
            value: '当日',
            code: 0
          },
          {
            value: '次日',
            code: 1
          }
        ],
        restEarlyValue: '',
        restLateValue: '',
        restAbsentForCheckInValue: '',
        restPastValue: '',
        restLeaveValue: '',
        restAbsentForCheckOutValue: '',
        disabledSave: false,
        promptText: '每个时段的下班时间必须在上班时间之后，每新增的时段日期和天数必须在上一个时段之后'
      }
    },
    created () {
      if (this.$route.query.scheduleCode) {
        this.title = '编辑班次设置'
        this._getScheduleConfig()
      }
    },
    computed: {
    },
    methods: {
      endTime (startDay, endDay, time) {
        if (time) {
          if (endDay - startDay === 0) {
            if (time instanceof Object) {
              var h = time.getHours()
              h = h < 10 ? ('0' + h) : h
              var m = time.getMinutes()
              m = m < 10 ? ('0' + m) : m
              var s = time.getSeconds()
              s = s < 10 ? ('0' + s) : s
              return `${h}:${m}:${s} - 23:59:59`
            } else {
              return `${time}:00 - 23:59:59`
            }
          } else if (endDay - startDay < 0) {
            return `00:00:00 - 00:00:00`
          } else if (endDay - startDay > 0) {
            return `00:00:00 - 23:59:59`
          }
        } else {
          return `00:00:00 - 23:59:59`
        }
      },
      _getScheduleConfig () {
        getScheduleConfig(this.$route.query.scheduleCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.strJson = res.data.Data
            this.state = this.strJson.State === 1 ? true : false
            this.strJson.TimeSlot.forEach(item => {
              item.CheckInTime = this.utilTimeHHmm(new Date(this.replaceTime(item.CheckInTime)))
              item.CheckOutTime = this.utilTimeHHmm(new Date(this.replaceTime(item.CheckOutTime)))
            })
            this.defaultTab(this.strJson.TimeSlot.length)
            if (this.strJson.BreakStartTime) {
              this.strJson.BreakStartTime = this.utilTimeHHmm(new Date(this.replaceTime(this.strJson.BreakStartTime)))
            }
            if (this.strJson.BreakEndTime) {
              this.strJson.BreakEndTime = this.utilTimeHHmm(new Date(this.replaceTime(this.strJson.BreakEndTime)))
            }
          } else {
            Message.error('班次详情加载失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('班次详情加载失败，请刷新页面重试！')
        })
      },
      defaultTab (length) {
        // 编辑页面进来改变tab值
        switch (length) {
          case 1:
            this.tabPosition = 1
            break
          case 2:
            this.one = true
            this.tabPosition = 2
            break
          case 3:
            this.one = true
            this.two = true
            this.tabPosition = 3
            break
          case 4:
            this.one = true
            this.two = true
            this.three = true
            this.tabPosition = 4
            break
          default:
            break
        }
      },
      handlerTab () {
        // 班次时段tab切换
        switch (this.tabPosition) {
          case '1':
            break
          case '2':
            this.one = true
            this.strJson.TimeSlot.push({...this.defaultWorkTime})
            break
          case '3':
            if (this.one) {
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
            } else {
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
            }
            this.one = true
            this.two = true
            break
          case '4':
            if (this.two) {
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
            } else if (this.one) {
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
            } else {
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
              this.strJson.TimeSlot.push({...this.defaultWorkTime})
            }
            this.one = true
            this.two = true
            this.three = true
            break
          default:
            break
        }
      },
      inputRestEarlyValue () {
        this.strJson.TimeSlot.forEach(item => {
          item.Early = this.restEarlyValue
        })
      },
      inputRestLateValue () {
        this.strJson.TimeSlot.forEach(item => {
          item.Late = this.restLateValue
        })
      },
      inputRestAbsentForCheckInValue () {
        this.strJson.TimeSlot.forEach(item => {
          item.AbsentForCheckIn = this.restAbsentForCheckInValue
        })
      },
      inputRestPastValue () {
        this.strJson.TimeSlot.forEach(item => {
          item.Past = this.restPastValue
        })
      },
      inputRestLeaveValue () {
        this.strJson.TimeSlot.forEach(item => {
          item.Leave = this.restLeaveValue
        })
      },
      inputRestAbsentForCheckOutValue () {
        this.strJson.TimeSlot.forEach(item => {
          item.AbsentForCheckOut = this.restAbsentForCheckOutValue
        })
      },
      handleBlur (e) {
        // input验证
        if (e.target.value) {
          e.target.parentNode.classList.remove('is-error')
          e.target.parentNode.classList.add('is-success')
        } else {
          e.target.parentNode.classList.remove('is-success')
          e.target.parentNode.classList.add('is-error')
        }
      },
      handleSave () {
        // 保存
        if (this.isSave()) {
          this.strJson.State = this.state ? 1 : 0
          addScheduleConfig(JSON.stringify(this.strJson)).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('保存成功')
              this.$router.replace({
                path: '/attendance/baseConfig/daySet'
              })
            } else {
              Message.error('保存失败')
            }
          }).catch(() => {
            Message.error('保存失败')
          })
        }
      },
      deleteOne (item, index) {
        // 删除当前一行
        MessageBox.confirm('确定删除此条设置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          console.log(item)
          deleteScheduleTimeSlot(this.$route.query.scheduleCode, item.Id).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('删除成功！')
              this._getScheduleConfig()
            } else {
              Message.error('删除失败，请重试！')
            }
          })
        }).catch(() => {
        })
      },
      addRow () {
        // 新增一次上下班
        if (this.three) {
          this.four = true
        } else if (this.two) {
          this.three = true
          this.tabPosition = '4'
        } else if (this.one) {
          this.two = true
          this.tabPosition = '3'
        } else {
          this.one = true
          this.tabPosition = '2'
        }
        this.strJson.TimeSlot.push({...this.defaultWorkTime})
      },
      isSave () {
        // 保存的时候验证
        this.arr = true
        if (!this.strJson.ScheduleName) {
          Message.error('班次名称不能为空！')
          return false
        } else if (!this.strJson.ShortName) {
          Message.error('班次简称不能为空！')
          return false
        } else {
          this.strJson.TimeSlot.forEach(item => {
            if (!item.Early || !item.Late || !item.AbsentForCheckIn || !item.AbsentForCheckOut || !item.Leave || !item.Past) {
              Message.error('时段输入框都不能为空！')
              this.arr = false
            }
          })
        }
        for (let i = 0; i < this.strJson.TimeSlot.length - 1; i++) {
          if (this.strJson.TimeSlot[i].CheckOutDay < this.strJson.TimeSlot[i].CheckInDay) {
            Message.error('同一个时段下班日期必须和上班日期是同一天或者第二天')
            this.arr = false
            break
          }
          if (this.strJson.TimeSlot[i + 1].CheckInDay < this.strJson.TimeSlot[i].CheckOutDay) {
            Message.error('后一个时段上班日期必须在上一个的下班日期之后')
            this.arr = false
            break
          }
          if (this.strJson.TimeSlot[i + 1].CheckInDay <= this.strJson.TimeSlot[i].CheckOutDay && this.strJson.TimeSlot[i + 1].CheckInTime.toString() < this.strJson.TimeSlot[i].CheckOutTime.toString()) {
            Message.error('后一个时段上班时间必须在上一个的下班日期之后')
            this.arr = false
            break
          }
        }
        if (this.arr) {
          return true
        } else {
          return false
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
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      }
    },
    watch: {
      strJson: {
        handler (curVal, oldVal) {
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .detail-container
    .content
      width 1000px
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
    .el-form-item
      margin-bottom 0
</style>
