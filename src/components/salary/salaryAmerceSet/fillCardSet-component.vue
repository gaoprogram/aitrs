<!--
  User: xxxxxxx
  Date: 2018/4/12
  功能：补卡扣款
-->

<template>
  <div class="fill-card-set-component">
    <div class="header-container">
      <span class="titleText">{{titleText}}</span>
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
        <div class="desc-container">
          <span class="times-item">补卡次数</span>
          <span class="method-item">扣款方式</span>
          <span class="value-item">扣款</span>
        </div>
        <ul class="times-ul">
          <template v-for="(countItem, countIndex) in dataJson.LogicFunction">
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
                <i class="el-icon-circle-close-outline" @click="delCountRow(countIndex)"></i>
              </el-tooltip>
            </li>
          </template>
        </ul>
        <el-tooltip class="plus-icon"
                    effect="dark"
                    content="新增次数"
                    placement="bottom"
        >
          <i class="el-icon-circle-plus-outline" @click="addCountRow()"></i>
        </el-tooltip>
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
              'StandardUnit': ''
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
          'StandardUnit': ''
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
      addCountRow () {
        this.defaultDurationObj.Id = this.dataJson.LogicFunction[this.dataJson.LogicFunction.length - 1].Id + 1
        this.dataJson.LogicFunction.push({...this.defaultDurationObj})
      },
      delCountRow (index) {
        this.dataJson.LogicFunction.splice(index, 1)
        let id = 1
        this.dataJson.LogicFunction.forEach(i => {
          i.Id = id++
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
          } else {
            this.TermList = []
            this.dataJson = {
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
            }
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
  .fill-card-set-component
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
        text-align center
        .desc-container
          margin-bottom: 20px
          .times-item
            margin-left: -30px
          .method-item
            margin-left 105px
          .value-item
            margin-left: 55px
        .times-ul
          text-align center
          .times-li
            margin-bottom 10px
          .el-icon-circle-close-outline
            margin-left: 20px
            cursor pointer
            color #dedede
            &:hover
              color #666666
        .plus-icon
          margin-right: 475px;
          margin-top: 10px
        .el-icon-circle-plus-outline
          cursor pointer
          color #dedede
          &:hover
            color #666666
</style>
