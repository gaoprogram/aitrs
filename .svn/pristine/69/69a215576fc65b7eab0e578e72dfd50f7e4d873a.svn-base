<!--
  User: xxxxxxx
  Date: 2017/11/16
  功能：表格
-->

<template>
  <div class="table-content">
    <el-table :data="list" border style="width: 100%" v-loading="listLoading">
      <el-table-column
        align="center"
        prop="TypeName"
        label="公告类型"
        fixed
        width="80"
      >
      </el-table-column>

      <el-table-column align="center" prop="Title" label="公告标题">
        <template slot-scope="scope">
          <span class="link-type" @click="showReceipt(scope.row)">{{scope.row.Title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="NoticeRange" label="公告范围">
      </el-table-column>

      <el-table-column align="center" prop="ReadNum" label="已阅数">
      </el-table-column>

      <el-table-column align="center" prop="NotReadNum" label="未阅数">
      </el-table-column>

      <el-table-column align="center" prop="Publisher" label="发布人">
      </el-table-column>

      <el-table-column align="center" prop="PublishDepartment" label="发布部门">
      </el-table-column>

      <el-table-column align="center" sortable prop="PublishTime" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.PublishTime | replaceTime }}</span>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>


    <el-dialog title="公告已阅人数/未阅人数" :visible.sync="dialogVisible" width="50%" style="min-width: 500px" center>
      <pie-chart :initData="initData"
                 @getNotRead="getNotRead"
                 @getRead="getRead"
      ></pie-chart>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog class="readDetail" :title="titleReadAndNotRead" :visible.sync="dialogReadAndNotRead" min-width="730px" center>
      <el-table :data="numDetail" border style="width: 100%" v-loading="listLoading">
        <el-table-column
          align="center"
          prop="UserName"
          label="人员姓名"
          fixed
        >
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @size-change="readHandleSizeChange"
          @current-change="readHandleCurrentChange"
          :current-page.sync="readAndNotreadlistQuery.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="readAndNotreadlistQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="readAndNotreadTotal">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getNoticeList, getReadReceiptUser, getNotReadReceiptUser } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import { Message } from 'element-ui'
  import PieChart from '@/base/echarts/pieChart'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      isModify: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 260
      },
      isAdmin: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        typeList: [],
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          sort: ''
        },
        ruleForm: {},
        dialogVisible: false,
        dialogReadAndNotRead: false,
        titleReadAndNotRead: '',
        readNum: 0,
        notReadNum: 0,
        numDetail: [],
        readAndNotreadTotal: 0,
        readAndNotreadlistQuery: {
          page: 1,
          limit: 10,
          title: '',
          sort: ''
        },
        initData: [
          { value: 0, name: '已阅', code: '1' },
          { value: 0, name: '未阅', code: '0' }
        ],
        isRead: false
      }
    },
    created () {
      this._getNoticeList()
    },
    computed: {
      ...mapGetters([
        'userType',
        'userCode',
        'name'
      ])
    },
    methods: {
      _getNoticeList (item) {
        if (item) {
          this.listQuery = Object.assign({}, item)
        }
        this.listLoading = true
        getNoticeList(this.type, this.listQuery.limit, this.listQuery.page, this.listQuery.title, this.listQuery.sort, this.isAdmin).then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeList = res.data.Data.NoticeTypes
            this.list = res.data.Data.Notices
            this.total = res.data.Total
            this.listLoading = false
          } else {
            Message.error('加载失败！')
          }
        }).catch(() => {
          Message.error('加载失败！')
        })
      },
      handleFilter () {
        this.listQuery.page = 1
        this._getNoticeList()
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        this._getNoticeList()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this._getNoticeList()
      },
      readHandleSizeChange (val) {
        this.readAndNotreadlistQuery.limit = val
        if (this.isRead) {
          this.getRead()
        } else {
          this.getNotRead()
        }
      },
      readHandleCurrentChange (val) {
        this.readAndNotreadlistQuery.page = val
        if (this.isRead) {
          this.getRead()
        } else {
          this.getNotRead()
        }
      },
      showReceipt (item) {
        this.initData[0].value = item.ReadNum
        this.initData[1].value = item.NotReadNum
        this.ruleForm = item
        this.dialogVisible = true
      },
      getRead () {
        this.isRead = true
        getReadReceiptUser(this.ruleForm.Code, this.readAndNotreadlistQuery.limit, this.readAndNotreadlistQuery.page).then((res) => {
          if (res.data.State === REQ_OK) {
            this.numDetail = res.data.Data
            this.readAndNotreadTotal = res.data.Total
            this.titleReadAndNotRead = '已阅人数详情'
            this.dialogReadAndNotRead = true
          } else {
            Message.error('加载失败！')
          }
        })
      },
      getNotRead () {
        this.isRead = false
        getNotReadReceiptUser(this.ruleForm.Code, this.readAndNotreadlistQuery.limit, this.readAndNotreadlistQuery.page).then((res) => {
          if (res.data.State === REQ_OK) {
            this.numDetail = res.data.Data
            this.readAndNotreadTotal = res.data.Total
            this.titleReadAndNotRead = '未阅人数详情'
            this.dialogReadAndNotRead = true
          } else {
            Message.error('加载失败！')
          }
        })
      },
      replaceTime (time) {
        if (time) {
          let endTime = time.replace('/Date(', '')
          endTime = endTime.replace(')/', '')
          return parseInt(endTime)
        }
      }
    },
    components: {
      PieChart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pagination-container
    margin-top: 20px
  .readDetail
    .el-dialog--center
      min-width 730px!important
</style>
