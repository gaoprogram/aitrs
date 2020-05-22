<!--
  User: xxxxxxx
  Date: 2018/4/12
  功能：迟到设定，早退设定组件
-->

<template>
  <div class="tabset-component">
    <div class="header-container">
      <span class="titleText">{{titleText}}</span>
      <span class="desc">考勤周期内累计分钟数，累计次数</span>
      <el-switch
        v-model="nativeStatus"
        active-text="启用"
        inactive-text="停用"
        @change="handleChangeStatus"
        style="margin-bottom: 5px;margin-left: 30px"
      >
      </el-switch>
    </div>

    <div class="content-container">
      <div class="title">
        <span class="">基数</span>
        <el-select class="filter-item"
                   multiple
                   v-model="TermList"
                   placeholder="请选择（请先选择薪资方案）"
                   @change="handleRelStructFilter"
                   style="width: 600px;margin-left: 10px"
        >
          <el-option v-for="item in relStructList" :key="item.Code" :label="item.Name" :value="item.Code">
          </el-option>
        </el-select>
      </div>
      <div class="set-container">
        <ul class="set-ul">
          <template v-for="(durationItem, durationIndex) in dataJson.LogicFunction">
            <li class="set-li">
              <div class="left">
                <div class="content">
                  <el-tooltip class="item" effect="dark" content="删除此时间段设定" placement="bottom">
                    <i class="el-icon-circle-close-outline" @click="delDurationRow(durationIndex)"></i>
                  </el-tooltip>
                  <el-select class="filter-item"
                             v-model="durationItem.Operator"
                             style="width: 70px"
                  >
                    <el-option v-for="item in operatorList" :key="item.code" :label="item.value" :value="item.code">
                    </el-option>
                  </el-select>
                  <el-input style="width: 100px" class="operator-input" type="number" v-model="durationItem.Threshold">
                  </el-input>
                  <span>分钟</span>
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
                      <el-input style="width: 100px" class="operator-input" type="number" v-model="countItem.Threshold">
                      </el-input>
                      <span>次，</span>
                      <el-select class="filter-item"
                                 v-model="countItem.StandardUnit"
                                 style="width: 110px"
                      >
                        <el-option v-for="item in standardUnitList" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                      </el-select>
                      <el-input style="width: 100px" class="operator-input" type="number" v-model="countItem.StandardValue">
                      </el-input>
                      <span v-html="countItem.StandardUnit === '固定金额' ? '元' : '%'"></span>
                      <el-tooltip class="item" effect="dark" content="删除此列" placement="bottom">
                        <i class="el-icon-circle-close-outline" @click="delCountRow(durationItem.Id, countIndex)"></i>
                      </el-tooltip>
                    </li>
                    <el-tooltip class="item"
                                effect="dark"
                                content="新增次数"
                                placement="bottom"
                                v-if="countIndex === durationItem.SubFunction.length-1"
                    >
                      <i class="el-icon-circle-plus-outline" @click="addCountRow(durationItem.Id)"></i>
                    </el-tooltip>
                    <!--<el-button v-if="countIndex === durationItem.SubFunction.length-1"-->
                               <!--type="primary"-->
                               <!--size="small"-->
                               <!--@click.native.prevent="addCountRow(durationItem.Id)"-->
                    <!--&gt;-->
                      <!--<i class="el-icon-plus"></i>-->
                    <!--</el-button>-->
                  </template>
                </ul>
              </div>
            </li>
            <el-tooltip class="item"
                        effect="dark"
                        content="新增时间段设定"
                        placement="bottom"
                        v-if="durationIndex === dataJson.LogicFunction.length - 1"
            >
              <el-button type="primary"
                         size="small"
                         @click.native.prevent="addDurationRow()"
                         style="margin-top: 10px"
              >
                <i class="el-icon-plus"></i>
              </el-button>
            </el-tooltip>
          </template>
        </ul>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <!--<el-button @click="cancel">取消</el-button>-->
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
      status: {
        type: Boolean,
        default: false
      },
      setObj: {
        type: Object,
        default: {
        }
      }
    },
    data: function () {
      return {
        TermList: [],
        nativeStatus: false,
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
        standardUnitList: [
          {
            value: '固定金额'
          },
          {
            value: '基数的%'
          }
        ],
        dataJson: {
          'A_Type': '',
          'TermList': [],
          'LogicFunction': [
            {
              'Id': 1,
              'ParamName': 'duration',
              'Operator': '>',
              'Threshold': '',
              'Unit': '分钟',
              'StandardValue': '',
              'StandardUnit': '',
              'SubFunction': [
                {
                  'Id': 1,
                  'ParamName': 'count',
                  'Operator': '>',
                  'Threshold': '',
                  'Unit': '次',
                  'StandardValue': '',
                  'StandardUnit': '固定金额'
                }
              ]
            }
          ]
        },
        defaultDurationObj: {
          'Id': 1,
          'ParamName': 'duration',
          'Operator': '>',
          'Threshold': '',
          'Unit': '分钟',
          'StandardValue': '',
          'StandardUnit': '',
          'SubFunction': [
            {
              'Id': 1,
              'ParamName': 'count',
              'Operator': '>',
              'Threshold': '',
              'Unit': '次',
              'StandardValue': '',
              'StandardUnit': '固定金额'
            }
          ]
        },
        defaultCountObj: {
          'Id': 1,
          'ParamName': 'count',
          'Operator': '>',
          'Threshold': '',
          'Unit': '次',
          'StandardValue': '',
          'StandardUnit': '固定金额'
        }
      }
    },
    methods: {
      handleRelStructFilter () {
      },
      handleChangeStatus () {
        this.$emit('changeStatus', this.nativeStatus)
      },
      returnStatus () {
        this.nativeStatus = !this.nativeStatus
      },
      addDurationRow () {
        this.defaultDurationObj.Id = this.dataJson.LogicFunction[this.dataJson.LogicFunction.length - 1].Id + 1
        this.dataJson.LogicFunction.push({...this.defaultDurationObj})
      },
      delDurationRow (index) {
        this.dataJson.LogicFunction.splice(index, 1)
        let id = 1
        this.dataJson.LogicFunction.forEach(i => {
          i.Id = id++
        })
      },
      addCountRow (durationId) {
        this.dataJson.LogicFunction.forEach(item => {
          if (item.Id === durationId) {
            this.defaultCountObj.Id = item.SubFunction[item.SubFunction.length - 1].Id + 1
            item.SubFunction.push({...this.defaultCountObj})
          }
        })
      },
      delCountRow (durationId, countIndex) {
        this.dataJson.LogicFunction.forEach(item => {
          if (item.Id === durationId) {
            item.SubFunction.splice(countIndex, 1)
            let id = 1
            item.SubFunction.forEach(i => {
              i.Id = id++
            })
          }
        })
      },
      save () {
        if (this.TermList.length > 0) {
          let arr = this.TermList.map(item => {
            return {
              'Code': item,
              'Name': ''
            }
          })
          this.dataJson.TermList = arr
          this.$emit('checkWorkSave', this.dataJson)
        } else {
          this.$emit('errorMsg', '请选择基数！')
        }
      },
      cancel () {
      }
    },
    watch: {
      'setObj': {
        handler (newval, oldval) {
          let arr = newval.TermList
          if (arr.length > 0) {
            this.dataJson = newval
            if (this.TermList.length > 0) {
              this.TermList = []
            }
            arr.forEach(item => {
              this.TermList.push(item.Code)
            })
          }
        }
      },
      'status': {
        handler (newval, oldval) {
          this.nativeStatus = newval
        }
      },
      deep: true
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tabset-component
    .header-container
      margin-top 20px
      margin-bottom 20px
      font-weight 600
      .desc
        margin-left: 30px
        color #999999
    .content-container
      .set-container
        margin-top: 20px;
        border: 1px solid #dedede;
        padding: 20px;
        .set-ul
          .set-li
            display flex
            padding: 20px 0;
            border-bottom: 1px solid #dedede
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
            border-bottom: 0
</style>
