<!--
  User: xxxxxxx
  Date: 2017/11/16
  功能：表格
-->

<template>
  <div class="table-content">
    <el-table :data="list"
              ref="multipleTable"
              border
              style="width: 100%;"
              @selection-change="handleSelectionChange"
              @row-click="rowClick"
              @row-dblclick="handlerowDblclick"
    >
      <el-table-column
        type="selection"
        fixed="left"
        width="55"
      >
      </el-table-column>

      <template v-for="(item, index) in typeList">

        <el-table-column
          :key="index"
          align="center"
          :prop="item.DataIndex"
          :label="item.ColName"
          v-if="item.Child.length === 0"
        >
          <template slot-scope="scope">
            <span @click="clickA()">{{ scope.row[item.DataIndex] }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="item.ColName" class-name="th-1" v-if="item.Child.length > 0">

          <template v-for="(childItem, childIndex) in item.Child">
            <el-table-column align="center" :prop="childItem.DataIndex" :label="childItem.ColName" :key="childIndex">
              <template slot-scope="scope">
                <span @click="clickA()">{{ scope.row[childItem.DataIndex] }}</span>
              </template>
            </el-table-column>
          </template>

        </el-table-column>

      </template>

      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="personalInfo(scope.row)"
          >查看
          </el-button>

        </template>
      </el-table-column>

    </el-table>
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

  </div>
</template>

<script type="text/ecmascript-6">
  import { getEmpWageReportList, runEmpReport } from '@/api/salary'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 260
      }
    },
    data () {
      return {
        typeList: [],
        list: [],
        total: null,
        listQuery: {
          PageIndex: 1,
          PageSize: 10
        },
        ruleForm: {},
        fileContent: [],
        titleText: '公告详情',
        dialogVisible: false,
        isModifyDialog: false,
        noticeCode: '',
        promptText: '',
        status: 0,
        feedbackContent: {
          content: ''
        },
        feedbackPublish: {
          isPublish: false
        },
        isPublish: [
          {
            name: '是',
            value: true
          },
          {
            name: '否',
            value: false
          }
        ],
        rules: {
          content: [
            { required: true, message: '请输入反馈内容', trigger: 'blur' },
            { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      if (this.$route.query.reportCode && this.$route.query.schemeCode) {
        this.listQuery = Object.assign(this.listQuery, {'ReportCode': this.$route.query.reportCode})
        this._getEmpWageReportList()
      }
    },
    activated () {
      if (this.$route.query.reportCode && this.$route.query.schemeCode) {
        this.listQuery = Object.assign(this.listQuery, {'ReportCode': this.$route.query.reportCode})
        this._getEmpWageReportList()
      }
    },
    computed: {
      ...mapGetters([
        'userType',
        'userCode',
        'name',
        'loading'
      ])
    },
    methods: {
      clickA () {
        console.log('sssssssss')
      },
      _getEmpWageReportList (item, salaryArchive) {
        this.selectSalaryArchive = salaryArchive
        if (item) {
          this.listQuery = Object.assign({}, item)
          this.listQuery.EmpType = JSON.stringify(this.listQuery.EmpType)
        }
        getEmpWageReportList(this.listQuery).then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeList = res.data.Data.ColModel
            this.list = JSON.parse(res.data.Data.Data)
            this.total = res.data.DataCount
          } else {
            Message.error('普通月发薪加载失败，请重试！')
          }
          this.falseLoading()
        }).catch(() => {
          this.falseLoading()
          Message.error('普通月发薪加载失败，请重试！')
        })
      },
      handleFilter () {
        this.listQuery.PageIndex = 1
        this._getEmpWageReportList()
      },
      handleSizeChange (val) {
        this.listQuery.PageSize = val
        this._getEmpWageReportList()
      },
      handleCurrentChange (val) {
        this.listQuery.PageIndex = val
        this._getEmpWageReportList()
      },
      handleSelectionChange (val) {
        this.empIds = val.map(item => {
          return item.EmployeeId
        })
      },
      handlerowDblclick (row, event) {
        this.$router.push({
          path: '/salary/salaryCommonMonth/salaryCMPInfo',
          query: {
            'salaryArchive': this.selectSalaryArchive,
            'empId': row.EmployeeId,
            'name': row.EmployeeName,
            'empNum': row.EmployeeNumber
          }
        })
      },
      someComputed () {
        if (!this.empIds) {
          Message.error('请先选择一条或多条数据！')
          return
        }
        runEmpReport(this.listQuery.ReportCode, JSON.stringify(this.empIds)).then(res => {
          if (res.data.State === REQ_OK) {
            this._getEmpWageReportList()
          } else {
            Message.error('逐条计算失败，请重试！')
          }
        }).catch(() => {
          Message.error('逐条计算失败，请重试！')
        })
      },
      personalInfo (item) {
        this.$router.push({
          path: '/salary/salaryCommonMonth/salaryCMPInfo',
          query: {
            'salaryArchive': this.selectSalaryArchive,
            'empId': item.EmployeeId,
            'name': item.EmployeeName,
            'empNum': item.EmployeeNumber
          }
        })
      },
      rowClick (row) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      },
      trueLoading () {
        this.$store.dispatch('setLoadingState', true)
      },
      falseLoading () {
        this.$store.dispatch('setLoadingState', false)
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-table--border .has-gutter th:nth-last-of-type(2)
    border-right: 1px solid #e6ebf5!important
  .pagination-container
    margin-top: 20px
</style>
