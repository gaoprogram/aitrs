<!--
  User: xxxxxxx
  Date: 2018/4/12
  功能：迟到设定，早退设定组件
-->

<template>
  <div class="tabset-component">
    <div class="content-container">
      <div class="title">
        <span class="">扣除方式</span>
        <el-select class="filter-item"
                   v-model="dataJson.D_Type"
                   placeholder="请选择"
                   @change="handleDType"
                   style="width: 150px;margin-left: 10px"
        >
          <el-option v-for="item in dTypeList" :key="item.code" :label="item.value" :value="item.code">
          </el-option>
        </el-select>
        <el-select class="filter-item"
                   v-model="dataJson.TimeUnit"
                   placeholder="请选择"
                   @change="handleTimeUnit"
                   style="width: 90px;"
        >
          <el-option v-for="item in timeUnitList" :key="item.code" :label="item.value" :value="item.code">
          </el-option>
        </el-select>
        <span class="" style="margin-left: 30px">基数</span>
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
      <div class="set-container" v-if="TermList.length > 0 && dataJson.TimeUnit">
        <div>
          <span class="">基准方式</span>
          <el-select class="filter-item"
                     v-model="dataJson.StandardRule"
                     placeholder="请选择"
                     @change="handleStandardRule"
                     style="width: 200px;margin-left: 10px"
          >
            <el-option v-for="item in standardRule" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 20px">
          <ul v-if="isOnlyRule">
            <li v-for="item in dataJson.TermCfgList" :key="item.Code" style="margin-bottom: 10px">
              <span style="display: inline-block;width: 130px">{{item.Name}}：</span>
              <el-input style="width: 150px" class="operator-input" type="number" v-model="item.Value">
              </el-input>
              <span>{{item.Unit}}</span>
            </li>
          </ul>
          <div v-if="!isOnlyRule" style="padding: 20px;border: 1px solid #cccccc;border-radius: 10px">
            <span class="">维度</span>
            <el-select class="filter-item"
                       v-model="dataJson.MatrixRule"
                       placeholder="请选择"
                       @change="handleMatrixRule"
                       style="width: 200px;margin-left: 10px"
            >
              <el-option v-for="item in matrixRule" :key="item.code" :label="item.value" :value="item.code">
              </el-option>
            </el-select>
            <span
              style="color: red;font-size: 14px;margin-left: 20px;"
              v-if="dataJson.MatrixRule === 2"
            >
              注：当维度为“本企业工龄”时，下面输入框内只能输入整数
            </span>
            <ul class="set-ul" style="padding: 20px;margin-top: 20px;border: 1px solid #cccccc;border-radius: 10px">
              <div style="margin-left: 363px;margin-bottom: 20px">
                <span style="margin-right: 10px;font-size: 14px">统一输入</span>
                <el-input style="width: 100px" @change="inputThreshold" class="operator-input" type="number" v-model="ThresholdValue">
                </el-input>
                <el-input style="width: 100px;margin-left: 30px" @change="inputStandard" class="operator-input" type="number" v-model="StandardValue">
                </el-input>
              </div>
              <template v-for="durationItem in dataJson.LogicFunction">
                <li class="set-li">
                  <div class="left">
                    <div class="content">
                      {{durationItem.ParamName}}
                    </div>
                  </div>
                  <div class="right">
                    <ul class="times-ul">
                      <template v-for="(countItem, countIndex) in durationItem.SubFunction">
                        <li class="times-li">
                          <el-select class="filter-item"
                                     v-model="countItem.Operator"
                                     style="width: 70px"
                          >
                            <el-option v-for="item in operatorList" :key="item.code" :label="item.value" :value="item.code">
                            </el-option>
                          </el-select>
                          <el-input style="width: 100px" class="operator-input" type="number" @change="validatValue" v-model="countItem.Threshold">
                          </el-input>
                          <el-input style="width: 100px;margin-left: 30px" class="operator-input" @change="validatValue" type="number" v-model="countItem.StandardValue">
                          </el-input>
                          <span>{{countItem.StandardUnit}}</span>
                          <el-tooltip v-if="durationItem.SubFunction.length > 1" class="item" effect="dark" content="删除此列" placement="bottom">
                            <i class="el-icon-circle-close-outline" @click="delCountRow(durationItem.ParamCode, countIndex)"></i>
                          </el-tooltip>
                          <i class="el-icon-circle-close-outline" style="opacity: 0" v-if="durationItem.SubFunction.length < 2" @click="delCountRow(durationItem.ParamCode, countIndex)"></i>
                        </li>
                        <el-tooltip class="item"
                                    effect="dark"
                                    content="新增"
                                    placement="bottom"
                                    v-if="countIndex === durationItem.SubFunction.length-1"
                        >
                          <i class="el-icon-circle-plus-outline" @click="addCountRow(durationItem.ParamCode)"></i>
                        </el-tooltip>
                      </template>
                    </ul>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <!--<el-button @click="cancel">取消</el-button>-->
      <el-button type="primary" @click="save" :disabled="TermList.length > 0 && dataJson.TimeUnit ? false : true">保存</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { validatPositiveNum } from '@/utils/validate'
  import { Message } from 'element-ui'
  export default {
    props: {
      titleText: {
        type: String,
        default: '迟到扣款'
      },
      relStructList: {
        type: Array,
        default: () => {
          return []
        }
      },
      setObj: {
        type: Object,
        default: {
        }
      }
    },
    data: function () {
      return {
        isDisabled: true,
        TermList: [],
        operatorList: [
          {
            value: '>',
            code: 'GT'
          },
          {
            value: '<',
            code: 'LT'
          },
          {
            value: '=',
            code: 'EQ'
          },
          {
            value: '>=',
            code: 'GTE'
          },
          {
            value: '<=',
            code: 'LTE'
          },
          {
            value: '<>',
            code: 'NEQ'
          }
        ],
        dTypeList: [
          {
            value: '扣除固定金额',
            code: 2
          },
          {
            value: '按基数的%',
            code: 1
          }
        ],
        timeUnitList: [
          {
            value: '小时',
            code: 'HOUR'
          },
          {
            value: '天',
            code: 'DAY'
          }
        ],
        standardRule: [
          {
            value: '单一标准',
            code: 1
          },
          {
            value: '按程度阶梯式扣款',
            code: 2
          }
        ],
        matrixRule: [
          {
            value: '请假周期累计额',
            code: 1
          },
          {
            value: '本企业工龄',
            code: 2
          }
        ],
        TermCfgList: [],
        isOnlyRule: true,
        ThresholdValue: '',
        StandardValue: '',
        dataJson: {
          'A_Type': '',
          'D_Type': 1,
          'TimeUnit': 'DAY',
          'StandardRule': 1,
          'TermList': [],
          'TermCfgList': [],
          'MatrixRule': 1,
          'LogicFunction': [
            {
              'ParamName': '',
              'ParamCode': '',
              'SubFunction': [
                {
                  'Id': 1,
                  'Operator': '>',
                  'Threshold': '',
                  'StandardValue': '',
                  'StandardUnit': ''
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      handleDType () {
        this.changeUnit()

        this.changeTermCfgList()
      },
      handleTimeUnit () {
        this.changeUnit()
        this.changeTermCfgList()
      },
      handleRelStructFilter () {
        this.changeTermCfgList()
      },
      handleStandardRule () {
        if (this.dataJson.StandardRule === 1) {
          this.isOnlyRule = true
        } else {
          this.isOnlyRule = false
        }
      },
      handleMatrixRule () {
      },
      changeTermCfgList () {
        let arr = []
        if (this.TermList.length > 0) {
          this.TermList.forEach(item => {
            let res = this.relStructList.filter(i => {
              return item === i.Code
            })
            arr.push(res[0])
          })
        }
        if (this.dataJson.TermCfgList.length > 0) {
          let newTermCfgList = []
          arr.forEach(item => {
            let hasArr = this.dataJson.TermCfgList.filter(i => {
              return i.Code === item.Code
            })
            if (hasArr.length > 0) {
              newTermCfgList.push(hasArr[0])
            } else {
              item.Unit = this.unit
              newTermCfgList.push(item)
            }
          })
          this.dataJson.TermCfgList = newTermCfgList
        } else {
          this.dataJson.TermCfgList = arr.map(item => {
            item.Unit = this.unit
            return item
          })
        }
        let newLogicFunction = []
        arr.forEach(item => {
          let hasArr = this.dataJson.LogicFunction.filter(i => {
            return i.ParamCode === item.Code
          })
          if (hasArr.length > 0) {
            newLogicFunction.push(hasArr[0])
          } else {
            let obj = {
              'ParamName': item.Name,
              'ParamCode': item.Code,
              'SubFunction': [
                {
                  'Id': 1,
                  'Operator': '>',
                  'Threshold': '',
                  'StandardValue': '',
                  'StandardUnit': this.unit
                }
              ]
            }
            newLogicFunction.push(obj)
          }
        })
        this.dataJson.LogicFunction = newLogicFunction
      },
      changeUnit () {
        if (this.dataJson.D_Type === 1 && this.dataJson.TimeUnit === 'HOUR') {
          this.unit = '% / 小时'
        } else if (this.dataJson.D_Type === 1 && this.dataJson.TimeUnit === 'DAY') {
          this.unit = '% / 天'
        } else if (this.dataJson.D_Type === 2 && this.dataJson.TimeUnit === 'HOUR') {
          this.unit = '元 / 小时'
        } else if (this.dataJson.D_Type === 2 && this.dataJson.TimeUnit === 'DAY') {
          this.unit = '元 / 天'
        }
        this.dataJson.TermCfgList.forEach(item => {
          item.Unit = this.unit
        })
        this.dataJson.LogicFunction.forEach(item => {
          item.SubFunction.forEach(i => {
            i.StandardUnit = this.unit
          })
        })
      },
      inputThreshold (val) {
        if (this.dataJson.MatrixRule === 2) {
          let bool = validatPositiveNum(val)
          if (!bool) {
            Message.error('当维度为‘本企业工龄’时，输入值必须为整数')
            return false
          }
        }
        this.dataJson.LogicFunction.forEach(item => {
          item.SubFunction.forEach(i => {
            i.Threshold = this.ThresholdValue
          })
        })
      },
      inputStandard (val) {
        if (this.dataJson.MatrixRule === 2) {
          let bool = validatPositiveNum(val)
          if (!bool) {
            Message.error('当维度为‘本企业工龄’时，输入值必须为整数')
            return false
          }
        }
        this.dataJson.LogicFunction.forEach(item => {
          item.SubFunction.forEach(i => {
            i.StandardValue = this.StandardValue
          })
        })
      },
      validatValue (val) {
        if (this.dataJson.MatrixRule === 2) {
          let bool = validatPositiveNum(val)
          if (!bool) {
            Message.error('当维度为‘本企业工龄’时，输入值必须为整数')
            return false
          }
        }
      },
      addCountRow (ParamCode) {
        let defaultCountObj = {
          'Id': 1,
          'Operator': '>',
          'Threshold': '',
          'StandardValue': '',
          'StandardUnit': this.unit
        }
        this.dataJson.LogicFunction.forEach(item => {
          if (item.ParamCode === ParamCode) {
            defaultCountObj.Id = item.SubFunction[item.SubFunction.length - 1].Id + 1
            item.SubFunction.push({...defaultCountObj})
          }
        })
      },
      delCountRow (ParamCode, countIndex) {
        this.dataJson.LogicFunction.forEach(item => {
          if (item.ParamCode === ParamCode) {
            item.SubFunction.splice(countIndex, 1)
            let id = 1
            item.SubFunction.forEach(i => {
              i.Id = id++
            })
          }
        })
      },
      save () {
        let arr = this.TermList.map(item => {
          return {
            'Code': item,
            'Name': ''
          }
        })
        this.dataJson.TermList = arr
        this.$emit('save', this.dataJson)
      },
      cancel () {
      }
    },
    watch: {
      'setObj': {
        handler (newval, oldval) {
          this.dataJson = newval
          let arr = newval.TermList
          this.TermList = []
          if (arr.length > 0) {
            arr.forEach(item => {
              this.TermList.push(item.Code)
            })
            this.unit = this.dataJson.TermCfgList[0].Unit
          }
          this.handleStandardRule()
        }
      },
      deep: true
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tabset-component
    .content-container
      .set-container
        margin-top: 20px;
        border: 1px solid #dedede;
        padding: 20px;
        .set-ul
          .set-li
            display flex
            padding: 20px 0;
            border-top: 1px solid #dedede
            .left
              display flex
              align-items: center;
              justify-content: center;
              flex 0 0 300px
              border-right 1px solid #dedede
              .content
                display inline-block
                .el-icon-circle-close-outline
                  margin-right: 20px
                  cursor pointer
                  color #dedede
                  &:hover
                    color #666666
            .right
              display flex
              align-items: center;
              justify-content: center;
              flex: 1
              .times-li
                margin-bottom 10px
              .el-icon-circle-close-outline
                margin-left: 20px
                cursor pointer
                color #dedede
                &:hover
                  color #666666
              .el-icon-circle-plus-outline
                cursor pointer
                color #dedede
                &:hover
                  color #666666
              .times-li:last-child
                margin-bottom 0
          .set-li:last-child
            border-bottom: 1px solid #dedede
</style>
