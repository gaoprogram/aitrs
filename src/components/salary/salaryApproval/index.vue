<!--
  User: xxxxxxx
  Date: 2018/1/15
  功能：薪资审批
-->

<template>
  <div class="salary-approval mg-30">
    <div class="btn-tab">
      <el-select style="width: 120px"
                 class="filter-item"
                 v-model="listQuery.SchemeCode"
                 placeholder="薪资方案"
      >
        <el-option v-for="item in archiveList" :key="item.Code" :label="item.Name" :value="item.Code">
        </el-option>
      </el-select>

      <el-select style="width: 120px"
                 class="filter-item"
                 v-model="listQuery.OnYear"
                 placeholder="选择年份"
      >
        <el-option v-for="item in years" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>

      <el-button class="filter-item handleButton" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

    </div>

    <div class="btn-tab right-btn-item">
      <el-button @click="" class="right-btn">
        报表
      </el-button>
    </div>

    <el-table :data="list"
              border
              highlight-current-row
              show-summary
    >

      <el-table-column label="月报名称" align="center" prop="ReportName">
      </el-table-column>

      <el-table-column label="所属月份" align="center" prop="OnYearMonth">
      </el-table-column>

      <el-table-column label="批次" align="center" prop="FlowId">
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
          <el-button
            type="text"
            size="small"
            @click="showDetail(scope.row)"
          >
            查看
          </el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.State === 2"
            @click="approval(scope.row)"
          >
            审批
          </el-button>
          <el-button
            type="text"
            size="small"
            v-if="scope.row.State === 3"
            @click="handleState(scope.row.ReportCode, -1)"
          >
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

    <el-dialog title="薪资审批"
               :visible.sync="approvalVisible"
               class="dialog-item"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
    >

      <div style="margin-bottom: 20px">
        <span style="margin-right: 10px">审批结果：</span>
        <el-select style="width: 120px"
                   class="filter-item"
                   v-model="approvalObj.State"
                   placeholder="请选择"
        >
          <el-option v-for="item in approvalState" :key="item.code" :label="item.value" :value="item.code">
          </el-option>
        </el-select>
      </div>

      <div>
        <span style="display: inline-block;margin-bottom: 10px">审批建议：</span>
        <el-input
          type="textarea"
          placeholder="请输入审批建议内容"
          v-model="approvalObj.Remark"
          style="display: inline-block"
        >
        </el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="approvalVisible = false">取消</el-button>
          <el-button type="primary" @click="saveApprovalObj">保存</el-button>
        </div>
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
        <div v-for="item in remarkList" :key="item.Id" class="text item">
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
  import { getSalaryList, getCommitWageReportList, approvalReport, process, getRemarkList } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        list: [],
        archiveList: [],
        total: null,
        listQuery: {
          PageIndex: 1,
          PageSize: 10,
          SchemeCode: '',
          OnYear: parseInt(new Date().getFullYear())
        },
        approvalVisible: false,
        remarkVisible: false,
        remarkList: [],
        approvalObj: {
          State: '',
          Remark: '',
          ReportCode: ''
        },
        approvalState: [
          {
            value: '退回',
            code: '0'
          },
          {
            value: '通过',
            code: '1'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'loading'
      ]),
      changeLoading () {
        return this.$store.dispatch('setLoadingState', true)
      },
      years () {
        let years = []
        let myDate = new Date()
        let year = parseInt(myDate.getFullYear())
        years.push(year)
        for (let i = 0; i < 4; i++) {
          year--
          years.push(year)
        }
        return years
      }
    },
    created () {
      this._getSalaryList()
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
      _getCommitWageReportList () {
        getCommitWageReportList(this.listQuery).then(res => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
          } else {
            Message.error('薪资审批列表获取失败，请刷新页面重试！')
          }
        })
      },
      _approvalReport () {
        approvalReport(this.approvalObj).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('薪资审批操作成功！')
            this.approvalVisible = false
            this._getCommitWageReportList()
          } else {
            Message.error('薪资审批操作失败，请重试！')
          }
        })
      },
      _process (code, state) {
        process(code, state).then(res => {
          if (res.data.State === REQ_OK) {
            Message.success('操作成功！')
            this._getCommitWageReportList()
          } else {
            Message.error('撤回失败，请重试！')
          }
        }).catch(() => {
          Message.error('撤回失败，请重试！')
        })
      },
      approval (item) {
        this.approvalObj.ReportCode = item.ReportCode
        this.approvalVisible = true
      },
      showDetail (item) {
        this.$router.push({
          path: '/salary/salaryCommonMonth',
          query: {
            'reportCode': item.ReportCode,
            'schemeCode': item.SchemeCode,
            'detail': true
          }
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
      saveApprovalObj () {
        this._approvalReport()
      },
      handleState (code, state) {
        this._process(code, state)
      },
      handleFilter () {
        if (!this.listQuery.SchemeCode) {
          Message.error('请先选择薪资方案！')
          return
        }
        this._getCommitWageReportList()
      },
      handleDownload () {
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .salary-approval
    .btn-tab
      margin-bottom 10px
      display inline-block
    .right-btn-item
      float right
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
  .salary-approval::after
    clear-float()
</style>
