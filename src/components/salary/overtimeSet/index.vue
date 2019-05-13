<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：加班款项
-->

<template>
  <div class="salary-overtime-set mg-30">
    <el-card class="box-card">
      <div class="btn-tab">
        <el-select style="width: 120px"
                   class="filter-item"
                   v-model="schemeCode"
                   placeholder="薪资方案"
                   @change="handleSchemeFilter"
        >
          <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>
      <div class="content-container">
        <span class="title">计算规则：请二选一</span>
        <div style="margin-top: 30px">
          <span>基数</span>
          <el-select class="filter-item"
                     multiple
                     v-model="TermList"
                     placeholder="请选择（请先选择薪资方案）"
                     @change="handleRelStructFilter"
                     style="width: 553px;margin-left: 10px"
          >
            <el-option v-for="item in relStructList" :key="item.Code" :label="item.Name" :value="item.Code">
            </el-option>
          </el-select>
        </div>
        <div class="percent-container">
          <el-radio v-model="dataJson.PayRule" :label="1">按薪资项目的%（系统内置项目除外）</el-radio>
          <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
               style="width: 100%;"
          >
            <div class="el-table__header-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
                <colgroup>
                  <col name="el-table_1_column_12" width="20%">
                  <col name="el-table_1_column_13" width="20%">
                  <col name="el-table_1_column_14" width="20%">
                  <col name="el-table_1_column_15" width="20%">
                  <col name="el-table_1_column_16" width="20%">
                  <col name="gutter" width="">
                </colgroup>
                <thead class="has-gutter">
                <tr class="">
                  <th colspan="1" rowspan="1" class="el-table_1_column_12 is-center is-leaf">
                    <div class="cell">薪资项目</div>
                  </th>
                  <th colspan="1" rowspan="1" class="el-table_1_column_13 is-center is-leaf">
                    <div class="cell">工作日加班费（%）</div>
                  </th>
                  <th colspan="1" rowspan="1" class="el-table_1_column_14 is-center is-leaf">
                    <div class="cell">休息日加班费（%）</div>
                  </th>
                  <th colspan="1" rowspan="1" class="el-table_1_column_15 is-center is-leaf">
                    <div class="cell">法定节假日加班费（%）</div>
                  </th>
                  <th colspan="1" rowspan="1" class="el-table_1_column_16 is-center is-leaf">
                    <div class="cell">公司假加班费（%）</div>
                  </th>
                  <th class="gutter" style="width: 0px;"></th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="el-table__body-wrapper is-scroll-left">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_1_column_12" width="20%">
                  <col name="el-table_1_column_13" width="20%">
                  <col name="el-table_1_column_14" width="20%">
                  <col name="el-table_1_column_15" width="20%">
                  <col name="el-table_1_column_16" width="20%">
                </colgroup>

                <tbody>
                <tr class="el-table__row">
                  <td class="el-table_1_column_12 is-center">
                    <div class="cell"></div>
                  </td>
                  <td class="el-table_1_column_13 is-center">
                    <div class="cell">
                      <el-input style="width: 100px"
                                class="operator-input"
                                type="number"
                                v-model="workDayValue"
                                @change="inputWorkDayValue"
                      >
                      </el-input>
                    </div>
                  </td>
                  <td class="el-table_1_column_14 is-center">
                    <div class="cell">
                      <el-input style="width: 100px"
                                class="operator-input"
                                type="number"
                                v-model="restDayValue"
                                @change="inputRestDayValue"
                      >
                      </el-input>
                    </div>
                  </td>
                  <td class="el-table_1_column_13 is-center">
                    <div class="cell">
                      <el-input style="width: 100px"
                                class="operator-input"
                                type="number"
                                v-model="legalHolidayValue"
                                @change="inputLegalHolidayValue"
                      >
                      </el-input>
                    </div>
                  </td>
                  <td class="el-table_1_column_14 is-center">
                    <div class="cell">
                      <el-input style="width: 100px"
                                class="operator-input"
                                type="number"
                                v-model="privateHolidayValue"
                                @change="inputPrivateHolidayValue"
                      >
                      </el-input>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row"
                    v-for="item in dataJson.PercentItemList"
                    :key="item.Code"
                >
                  <td class="el-table_1_column_12 is-center">
                    <div class="cell">{{item.Name}}</div>
                  </td>
                  <td class="el-table_1_column_13 is-center">
                    <div class="cell">
                      <el-input style="width: 100px" class="operator-input" type="number" v-model="item.WorkDay">
                      </el-input>
                    </div>
                  </td>
                  <td class="el-table_1_column_14 is-center">
                    <div class="cell">
                      <el-input style="width: 100px" class="operator-input" type="number" v-model="item.RestDay">
                      </el-input>
                    </div>
                  </td>
                  <td class="el-table_1_column_13 is-center">
                    <div class="cell">
                      <el-input style="width: 100px" class="operator-input" type="number" v-model="item.LegalHoliday">
                      </el-input>
                    </div>
                  </td>
                  <td class="el-table_1_column_14 is-center">
                    <div class="cell">
                      <el-input style="width: 100px" class="operator-input" type="number" v-model="item.PrivateHoliday">
                      </el-input>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="regular-container">
          <el-radio v-model="dataJson.PayRule" :label="2">每小时按固定金额</el-radio>
          <div>
            <ul v-for="(item, index) in dataJson.FixedItemList" :key="index">
              <li class="item">
                <span class="text">工作日加班费</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="item.WorkDay">
                </el-input>
              </li>
              <li class="item">
                <span class="text">休息日加班费</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="item.RestDay">
                </el-input>
              </li>
              <li class="item">
                <span class="text">节假日加班费</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="item.LegalHoliday">
                </el-input>
              </li>
              <li class="item">
                <span class="text">公司假加班费</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="item.PrivateHoliday">
                </el-input>
              </li>
            </ul>
          </div>
        </div>
        <div class="subsidy-container">
          <span class="title-desc">加班补贴 （小时数最多可输入小数点后一位）</span>
          <ul>
            <li class="item">
              <span class="title">工作日加班：</span>
              <div class="data">
                <el-time-picker
                  style="width: 120px"
                  v-model="dataJson.Allowance.WorkDay_Hour"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="时间点">
                </el-time-picker>
                <span>点后享受一次，</span>
                <el-input style="width: 100px"
                          class="operator-input"
                          type="number"
                          v-model="dataJson.Allowance.WorkDay_Amount"
                >
                </el-input>
                <span>元每次</span>
              </div>
            </li>
            <li class="item">
              <span class="title">休息日加班：</span>
              <div class="data">
                <span>每</span>
                <el-input style="width: 100px" @change="validatNumDotOneValue" class="operator-input" type="number" v-model="dataJson.Allowance.RestDay_Hour">
                </el-input>
                <span>小时享受一次，</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="dataJson.Allowance.RestDay_Amount">
                </el-input>
                <span>元每次</span>
              </div>
            </li>
            <li class="item">
              <span class="title">节假日加班：</span>
              <div class="data">
                <span>每</span>
                <el-input style="width: 100px" @change="validatNumDotOneValue" class="operator-input" type="number" v-model="dataJson.Allowance.LegalHoliday_Hour">
                </el-input>
                <span>小时享受一次，</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="dataJson.Allowance.LegalHoliday_Amount">
                </el-input>
                <span>元每次</span>
              </div>
            </li>
            <li class="item">
              <span class="title">公司假日加班：</span>
              <div class="data">
                <span>每</span>
                <el-input style="width: 100px" @change="validatNumDotOneValue" class="operator-input" type="number" v-model="dataJson.Allowance.PrivateHoliday_Hour">
                </el-input>
                <span>小时享受一次，</span>
                <el-input style="width: 100px" class="operator-input" type="number" v-model="dataJson.Allowance.PrivateHoliday_Amount">
                </el-input>
                <span>元每次</span>
              </div>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save" :disabled="TermList.length > 0 && isValidat ? false : true">保存</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getOverTime,
    getSalaryList,
    getRelStructList,
    saveOverTime
  } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message, MessageBox } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { replaceTimeNoY } from '@/filters/index'
  import { validatNumDotOne } from '@/utils/validate'

  export default {
    data () {
      return {
        list: [],
        schemeCode: '',
        activeName: '',
        TermList: [],
        relStructList: [],
        archiveList: [],
        workDayValue: '',
        restDayValue: '',
        legalHolidayValue: '',
        privateHolidayValue: '',
        dataJson: {
          'PayRule': 1,
          'TermList': [],
          'PercentItemList': [],
          'FixedItemList': [
            {
              'WorkDay': '',
              'RestDay': '',
              'LegalHoliday': '',
              'PrivateHoliday': ''
            }
          ],
          'Allowance': {
            'WorkDay_Hour': '',
            'WorkDay_Amount': '',
            'RestDay_Hour': '',
            'RestDay_Amount': '',
            'LegalHoliday_Hour': '',
            'LegalHoliday_Amount': '',
            'PrivateHoliday_Hour': '',
            'PrivateHoliday_Amount': ''
          }
        },
        status: false,
        isValidat: true
      }
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    },
    created () {
      this._getSalaryList()
    },
    mounted () {
    },
    methods: {
      changeTimeType (time) {
        return replaceTimeNoY(time)
      },
      _getSalaryList () {
        getSalaryList().then(res => {
          if (res.data.State === REQ_OK) {
            this.archiveList = res.data.Data
          } else {
            Message.error('薪资方案列表获取失败，请刷新页面重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          Message.error('薪资方案列表获取失败，请刷新页面重试！')
        })
      },
      _getOverTime () {
        getOverTime(this.schemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.dataJson = res.data.Data.Function
            let arr = this.dataJson.TermList
            this.TermList = []
            if (arr.length > 0) {
              arr.forEach(item => {
                this.TermList.push(item.Code)
              })
            }
            if (this.dataJson.FixedItemList.length === 0) {
              this.dataJson.FixedItemList.push(
                {
                  'WorkDay': '',
                  'RestDay': '',
                  'LegalHoliday': '',
                  'PrivateHoliday': ''
                })
            }
            this.dataJson.Allowance.WorkDay_Hour = this.changeTimeType(this.dataJson.Allowance.WorkDay_Hour)
          } else {
            Message.error('加班款项获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('加班款项获取失败，请刷新页面重试！')
        })
      },
      _getRelStructList () {
        getRelStructList(this.schemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.relStructList = res.data.Data
          } else {
            Message.error('基数列表获取失败，请刷新页面重试！')
          }
        }).catch(() => {
          Message.error('基数列表获取失败，请刷新页面重试！')
        })
      },
      handleSchemeFilter () {
        this._getRelStructList()
        this._getOverTime()
      },
      handleRelStructFilter () {
        this.changePercentItemList()
      },
      inputWorkDayValue () {
        this.dataJson.PercentItemList.forEach(item => {
          item.WorkDay = this.workDayValue
        })
      },
      inputRestDayValue () {
        this.dataJson.PercentItemList.forEach(item => {
          item.RestDay = this.restDayValue
        })
      },
      inputLegalHolidayValue () {
        this.dataJson.PercentItemList.forEach(item => {
          item.LegalHoliday = this.legalHolidayValue
        })
      },
      inputPrivateHolidayValue () {
        this.dataJson.PercentItemList.forEach(item => {
          item.PrivateHoliday = this.privateHolidayValue
        })
      },
      validatNumDotOneValue (val) {
        let bool = validatNumDotOne(val)
        if (!bool) {
          this.isValidat = false
          Message.error('请重新输入，小时数最多可输入小数点后一位')
        } else {
          this.isValidat = true
        }
      },
      changePercentItemList () {
        let arr = []
        if (this.TermList.length > 0) {
          this.TermList.forEach(item => {
            let res = this.relStructList.filter(i => {
              return item === i.Code
            })
            arr.push(res[0])
          })
        }
        this.dataJson.TermList = arr
        let newPercentItemList = []
        arr.forEach(item => {
          let hasArr = this.dataJson.PercentItemList.filter(i => {
            return i.Code === item.Code
          })
          if (hasArr.length > 0) {
            newPercentItemList.push(hasArr[0])
          } else {
            let obj = {
              'Code': item.Code,
              'Name': item.Name,
              'WorkDay': '',
              'RestDay': '',
              'LegalHoliday': '',
              'PrivateHoliday': ''
            }
            newPercentItemList.push(obj)
          }
        })
        this.dataJson.PercentItemList = newPercentItemList
      },
      save () {
        MessageBox.confirm('确定保存吗?保存之后，之前的设定将无法恢复。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          saveOverTime(this.schemeCode, JSON.stringify(this.dataJson)).then(res => {
            if (res.data.State === REQ_OK) {
              Message.success('保存成功！')
              this._getOverTime()
            } else {
              Message.error('保存失败，请重试！')
            }
          }).catch(() => {
            Message.error('保存失败，请重试！')
          })
        })
      },
      errorMsg (text) {
        Message.error(text)
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-overtime-set
    width 1000px
    margin 0 auto
    .el-card
      margin-top 30px
      .content-container
        margin-top 30px
        .percent-container
          margin-top 20px
          .el-radio
            margin-bottom 10px
        .regular-container
          margin-top 50px
          .el-radio
            margin-bottom 10px
          ul
            display flex
            .item
              flex 1
              text-align center
              .text
                margin-right 10px
                font-size 14px
        .subsidy-container
          margin-top 50px
          padding 20px
          border 1px solid #d8dce5
          border-radius 10px
          .title-desc
            display inline-block
            margin-bottom 20px
            font-weight bold
          .item
            display flex
            margin-bottom 10px
            .title
              display flex
              flex 0 0 150px;
              align-items center
              justify-content: center
              font-size 14px
            .data
              flex 1
              font-size 14px

</style>
