<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：薪资月报
-->

<template>
  <div class="salary-month-report mg-30">
    <div class="btn-tab">
      <el-select style="width: 120px"
                 class="filter-item"
                 v-model="listQuery.SchemeCode"
                 placeholder="薪资方案"
      >
        <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
        </el-option>
      </el-select>

      <el-date-picker
        v-model="listQuery.OnYear"
        align="right"
        type="year"
        @change="changeYear"
        value-format="yyyy"
        placeholder="选择有效年份">
      </el-date-picker>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

    </div>

    <div class="btn-tab right-btn-item" style="margin-bottom: 20px;">
      <el-button @click="addSalaryOut()" class="right-btn" type="primary">
        增加薪资发放
      </el-button>

      <el-button @click="handleDownload()" class="right-btn">
        报表
      </el-button>
    </div>

    <el-table :data="list"
              border
              highlight-current-row
              show-summary
              style="width: 100%"
    >

      <el-table-column label="名称" align="center" prop="ReportName">
      </el-table-column>

      <el-table-column label="所属月份" align="center" prop="OnYearMonth">
      </el-table-column>

      <el-table-column label="发放批次" align="center" prop="FlowId">
      </el-table-column>

      <el-table-column label="人数" align="center" prop="Total">
      </el-table-column>

      <el-table-column label="收入合计" align="center" prop="GT">
      </el-table-column>

      <el-table-column label="扣减合计" align="center" prop="PT">
      </el-table-column>

      <el-table-column label="应纳税所得额" align="center" prop="GTT">
      </el-table-column>

      <el-table-column label="应纳税额" align="center" prop="TAX">
      </el-table-column>

      <el-table-column label="实发合计" align="center" prop="RT">
      </el-table-column>

      <el-table-column label="确定" align="center" prop="Ensure">
      </el-table-column>

      <el-table-column label="疑问" align="center" prop="Doubt">
      </el-table-column>

      <el-table-column label="状态" align="center" prop="StateName">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small"
                     @click="handleState(scope.row, 'detail')"
                     v-if="scope.row.State === 2 || scope.row.State === 3 ||
                     scope.row.State === 4 || scope.row.State === 5"
          >
            查看
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row, 'dispose')" v-if="scope.row.State === 0 || scope.row.State === 1 || scope.row.State === 6">
            处理
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row.ReportCode, -2)" v-if="scope.row.State === 0 || scope.row.State === 1">
            删除
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row.ReportCode, 2)" v-if="scope.row.State === 1">
            归档
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row.ReportCode, 3)" v-if="scope.row.State === 3">
            发送
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row.ReportCode, 4)" v-if="scope.row.State === 4">
            解封
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row.ReportCode, 5)" v-if="scope.row.State === 4 || scope.row.State === 6">
            提交审批
          </el-button>

          <el-button type="text" size="small" @click="handleState(scope.row.ReportCode, -1)" v-if="scope.row.State === 5">
            撤回
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="showRemark(scope.row)"
          >
            查看备注
          </el-button>
        </template>
      </el-table-column>

      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.PageIndex"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listQuery.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </el-table>

    <el-dialog title="新增薪资发放"
               :visible.sync="addVisible"
               class="dialog-item"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :modal-append-to-body="false"
    >

      <el-date-picker
        style="width: 450px"
        v-model="rangDate"
        type="daterange"
        @change="rangdate()"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>

      <el-input style="margin-top: 10px;width: 450px"
                class="filter-item"
                v-model="obj.Name"
                placeholder="名称">
      </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSalaryOut">保存</el-button>
      </div>

    </el-dialog>

    <el-dialog title="备注列表"
               :visible.sync="remarkVisible"
               class="dialog-item"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               width="600px"
    >

      <el-card class="box-card">
        <div v-for="item in remarkList" :key="item.Id" class="text item" v-dragging="{ item: item, list: remarkList, group: 'color' }">
          <div class="remark-title">
            <span class="name"><b>审批人：</b>{{item.UserName}}</span>
            <span class="state"><b>月报状态：</b>{{item.StateName}}</span>
            <span class="time">{{item.CreateDateString}}</span>
          </div>
          <p class="remark-content" v-html="item.Remark === '' ? '暂无备注' : item.Remark"></p>
        </div>
      </el-card>

      <div slot="footer" class="dialog-footer">
        <el-button @click="remarkVisible = false">关闭</el-button>
      </div>

    </el-dialog>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSalaryList, getWageReportList, addOneReport, process, getRemarkList } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        list: [],
        archiveList: [],
        rangDate: '',
        total: null,
        listQuery: {
          SchemeCode: '',
          OnYear: new Date().getFullYear().toString(),
          PageIndex: 1,
          PageSize: 10
        },
        addVisible: false,
        remarkVisible: false,
        remarkList: [],
        obj: {
          Name: '',
          BeginDate: null,
          EndDate: null
        }
      }
    },
    created () {
      this._getSalaryList()
      this._getWageReportList()
      this.$store.dispatch('setLoadingState', true)
    },
    mounted () {
      this.$dragging.$on('dragged', ({ value }) => {
        console.log(value.item)
        console.log(value.list)
      })
      this.$dragging.$on('dragend', () => {

      })
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    },
    methods: {
      _getSalaryList () {
        getSalaryList().then(res => {
          if (res.data.State === REQ_OK) {
            this.archiveList = res.data.Data
          } else {
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
        })
      },
      _getWageReportList () {
        getWageReportList(this.listQuery).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
          } else {
          }
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
        })
      },
      changeYear () {
        console.log(this.OnYear)
      },
      handleFilter () {
        if (!this.listQuery.SchemeCode) {
          Message.error('请选择薪资方案')
          return
        }
        if (!this.listQuery.OnYear) {
          Message.error('请选择有效年份')
          return
        }
        this._getWageReportList()
      },
      addSalaryOut () {
        this.addVisible = true
      },
      handleDownload () {
        
      },
      saveSalaryOut () {
        if (!this.listQuery.SchemeCode) {
          return Message.error('请选择薪资方案')
        }
        if (!this.obj.BeginDate) {
          return Message.error('请选择开始时间')
        }
        if (!this.obj.EndDate) {
          return Message.error('请选择结束时间')
        }
        if (!this.obj.Name) {
          return Message.error('请选择输入名称')
        }
        this.obj.SchemeCode = this.listQuery.SchemeCode
        addOneReport(this.obj).then(res => {
          if (res.data.State === REQ_OK) {
            this.addVisible = false
            this._getWageReportList()
          } else {
          }
        })
      },
      rangdate () {
        let [ begin, end ] = this.rangDate
        this.obj.BeginDate = begin
        this.obj.EndDate = end
      },
      handleState (code, state) {
        switch (state) {
          case 'dispose':
            this.$router.push({
              path: '/salary/salaryCommonMonth',
              query: {
                'reportCode': code.ReportCode,
                'schemeCode': code.SchemeCode,
                'dispose': true
              }
            })
            break
          case 'detail':
            this.$router.push({
              path: '/salary/salaryCommonMonth',
              query: {
                'reportCode': code.ReportCode,
                'schemeCode': code.SchemeCode,
                'detail': true
              }
            })
            break
          case 4:
            this.$confirm('确定对薪资方案-薪资名称-薪资月（批次）执行解封吗？解封后您可对薪资数据进行修改。', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._process(code, state)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
            break
          case 5:
            this.$prompt('请输入备注', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPlaceholder: '备注',
              inputType: 'textarea'
            }).then(({ value }) => {
              this._process(code, state, value)
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '提交失败，请重试'
              })
            })
            break
          default:
            this._process(code, state)
        }
      },
      _process (code, state, remark) {
        process(code, state, remark).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('操作成功！')
            this._getWageReportList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.Error
            })
          }
        }).catch(() => {
          Message.error('操作失败，请重试！')
        })
      },
      showRemark (item) {
        getRemarkList(item.ReportCode).then(res => {
          if (res.data.State === REQ_OK) {
            if (res.data.Data.length > 0) {
              this.remarkList = res.data.Data
              this.remarkVisible = true
            } else {
              Message.info('暂无备注！')
            }
          } else {
            Message.error('备注列表获取失败，请重试！')
          }
        }).catch(() => {
          Message.error('备注列表获取失败，请重试！')
        })
      },
      handleSizeChange (val) {
        this.listQuery.PageSize = val
      },
      handleCurrentChange (val) {
        this.listQuery.PageIndex = val
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .salary-month-report
    position relative
    .btn-tab
      margin-bottom 20px
      display inline-block
    .right-btn-item
      float right
    .dialog-item
      .el-dialog
        width 500px
        .box-card
          .item
            padding-top 10px
            padding-bottom 10px
            border-bottom-1px()
            .remark-title
              .name, .state
                display inline-block
                width 150px
                margin-right 20px
  .salary-month-report::after
    clear-float()
</style>
