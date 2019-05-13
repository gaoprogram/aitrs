<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：工资条设定
-->

<template>
  <div class="salary-bill-set mg-30">

    <div class="btn-tab">
      <el-select style="width: 120px"
                 class="filter-item"
                 v-model="schemeCode"
                 placeholder="薪资方案"
                 @change="handleFilter"
      >
        <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
        </el-option>
      </el-select>

    </div>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
         style="width: 100%;"
         v-if="GList.length > 0"
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
                <div class="cell">序号</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_1_column_13 is-center is-leaf">
                <div class="cell">工资项名称</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_1_column_14 is-center is-leaf">
                <div class="cell">项目名称</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_1_column_15 is-center is-leaf">
                <div class="cell">当前状态</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_1_column_16 is-center is-leaf">
                <div class="cell">操作</div>
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
            <tr class="el-table__row"
                v-for="item in GList"
                :key="item.TermCode"
                v-dragging="{ item: item, list: GList, group: 'GList' }"
            >
              <td class="el-table_1_column_12 is-center">
                <div class="cell">{{item.SortId}}</div>
              </td>
              <td class="el-table_1_column_13 is-center">
                <div class="cell">{{item.TermName}}</div>
              </td>
              <td class="el-table_1_column_14 is-center">
                <div class="cell">{{item.OperateName}}</div>
              </td>
              <td class="el-table_1_column_15 is-center">
                <div class="cell" v-html="item.ViewState === 1 ? '显示' : '不显示'"></div>
              </td>
              <td class="el-table_1_column_16 is-center">
                <div class="cell">
                  <button data-v-2bda02fe="" type="button" class="el-button el-button--text el-button--small">
                    <span v-html="item.ViewState === 1 ? '不显示' : '显示'" @click="changeIsShow(item)">
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
         style="width: 100%;"
         v-if="DList.length > 0"
    >
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
            <tr class="el-table__row"
                v-for="item in DList"
                :key="item.TermCode"
                v-dragging="{ item: item, list: DList, group: 'DList' }"
            >
              <td class="el-table_1_column_12 is-center ">
                <div class="cell">{{item.SortId}}</div>
              </td>
              <td class="el-table_1_column_13 is-center ">
                <div class="cell">{{item.TermName}}</div>
              </td>
              <td class="el-table_1_column_14 is-center ">
                <div class="cell">{{item.OperateName}}</div>
              </td>
              <td class="el-table_1_column_15 is-center">
                <div class="cell" v-html="item.ViewState === 1 ? '显示' : '不显示'"></div>
              </td>
              <td class="el-table_1_column_16 is-center">
                <div class="cell">
                  <button data-v-2bda02fe="" type="button" class="el-button el-button--text el-button--small">
                    <span v-html="item.ViewState === 1 ? '不显示' : '显示'" @click="changeIsShow(item)">
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition"
         style="width: 100%;"
         v-if="TList.length > 0"
    >
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
          <tr class="el-table__row"
              v-for="item in TList"
              :key="item.TermCode"
              v-dragging="{ item: item, list: TList, group: 'TList' }"
          >
            <td class="el-table_1_column_12 is-center ">
              <div class="cell">{{item.SortId}}</div>
            </td>
            <td class="el-table_1_column_13 is-center ">
              <div class="cell">{{item.TermName}}</div>
            </td>
            <td class="el-table_1_column_14 is-center ">
              <div class="cell">{{item.OperateName}}</div>
            </td>
            <td class="el-table_1_column_15 is-center">
              <div class="cell" v-html="item.ViewState === 1 ? '显示' : '不显示'"></div>
            </td>
            <td class="el-table_1_column_16 is-center">
              <div class="cell">
                <button data-v-2bda02fe="" type="button" class="el-button el-button--text el-button--small">
                    <span v-html="item.ViewState === 1 ? '不显示' : '显示'" @click="changeIsShow(item)">
                    </span>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div slot="footer" class="dialog-footer" v-if="GList.length > 0 || DList.length > 0 || TList.length > 0">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSalaryList, getPayRollList, updatePayRollSort } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        list: [],
        schemeCode: '',
        archiveList: [],
        GList: [],
        DList: [],
        TList: []
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
      this.$dragging.$on('dragged', ({ value }) => {
        console.log(value.item)
        console.log(value.list)
        let obj = {
          G: this.GList,
          D: this.DList,
          T: this.TList
        }
        this.changeSortId(obj)
      })
      this.$dragging.$on('dragend', () => {
      })
    },
    methods: {
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
      _getPayRollList () {
        getPayRollList(this.schemeCode).then(res => {
          if (res.data.State === REQ_OK) {
            this.billObj = res.data.Data
            this.changeSortId(this.billObj)
          } else {
            Message.error('工资条列表加载失败，请重试！')
          }
        }).catch(() => {
          Message.error('工资条列表加载失败，请重试！')
        })
      },
      handleFilter () {
        this._getPayRollList()
      },
      changeIsShow (item) {
        item.ViewState === 1 ? item.ViewState = 0 : item.ViewState = 1
      },
      save () {
        let obj = {
          G: this.GList,
          D: this.DList,
          T: this.TList
        }
        this.changeSortId(obj)
        let strJson = this.list.map(item => {
          return {
            'TermCode': item.TermCode,
            'SortId': item.SortId,
            'ViewState': item.ViewState
          }
        })
        updatePayRollSort(this.schemeCode, JSON.stringify(strJson)).then(res => {
          if (res.data.State === 1) {
            Message.success('保存成功！')
            this._getPayRollList()
          } else {
            Message.error('保存失败，请重试！')
          }
        }).catch(() => {
          Message.error('保存失败，请重试！')
        })
      },
      cancel () {
        this._getPayRollList()
      },
      changeSortId (obj) {
        let gNum = 100
        let dNum = 200
        let tNum = 300
        let g = obj.G
        if (g) {
          this.GList = g.map((item) => {
            gNum++
            item.SortId = gNum
            return item
          })
        }
        let d = obj.D
        if (d) {
          this.DList = d.map((item) => {
            dNum++
            item.SortId = dNum
            return item
          })
        }
        let t = obj.T
        if (t) {
          this.TList = t.map((item) => {
            tNum++
            item.SortId = tNum
            return item
          })
        }
        this.list = [...this.GList, ...this.DList, ...this.TList]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-bill-set
    .btn-tab
      margin-bottom 10px
      display inline-block
</style>
