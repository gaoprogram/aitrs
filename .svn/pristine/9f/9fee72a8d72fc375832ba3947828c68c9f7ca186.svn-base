<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--历史公告
-->

<template>
  <div class="history-notice">
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               center
               fullscreen
               :showClose="false"
               style="min-width: 1000px;"
    >
      <el-table :data="list" border style="width: 100%">
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
            <span class="link-type" @click="_historyDetail(scope.row)">{{scope.row.Title}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="Remarks" label="公告备注">
          <template slot-scope="scope">
            <span>{{ scope.row.Remarks || '无'}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100" align="center" prop="Status" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.Status | stateFilter }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.Operation }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="Operator" width="120" label="操作人">
        </el-table-column>

        <el-table-column align="center" width="200" prop="PublishTime" label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.OperationTime | replaceTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-dialog>
    <preview-notice :titleText="titleText" :ruleForm="ruleForm" ref="preNotice" :typeName="typeNameList"></preview-notice>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getNoticeType, historyNotice, historyDetail } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import PreviewNotice from '@/components/notice/end/previewNotice'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'

  export default {
    props: {
    },
    data () {
      return {
        title: '公告操作历史',
        typeNameList: [],
        list: [],
        total: null,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        ruleForm: {},
        titleText: '公告详情',
        dialogVisible: true,
        promptText: '',
        status: 0
      }
    },
    created () {
      this._getHistoryNotice()
    },
    computed: {
      ...mapGetters([
        'loading',
        'alreadyUploadFile'
      ])
    },
    methods: {
      _getNoticeType () {
        getNoticeType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeNameList = res.data.Data
          } else {
            Message.error('历史详情加载失败，请重试！')
          }
        }).catch(() => {
          Message.error('历史详情加载失败，请重试！')
        })
      },
      _getHistoryNotice () {
        this.$store.dispatch('setLoadingState', true)
        historyNotice(this.$route.query.code, this.listQuery.limit, this.listQuery.page).then((res) => {
          if (res.data.State === REQ_OK) {
            this.list = res.data.Data
            this.total = res.data.Total
          } else {
            Message.error('公告历史操作加载失败，请重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          Message.error('公告历史操作加载失败，请重试！')
        })
      },
      handleFilter () {
        this.listQuery.page = 1
        this._getHistoryNotice()
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        this._getHistoryNotice()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this._getHistoryNotice()
      },
      _historyDetail (item) {
        this.$store.dispatch('setLoadingState', true)
        this.$store.dispatch('emptyAlreadyUploadFile')
        this._getNoticeType()
        historyDetail(item.NoticeCode, item.Id).then((res) => {
          if (res.data.State === REQ_OK) {
            this.ruleForm = res.data.Data
            this.$store.dispatch('setAlreadyUploadFile', this.ruleForm.Attachments)
            this.$refs.preNotice.showPreNotice()
          } else {
            Message.error('历史详情加载失败，请重试！')
          }
          this.$store.dispatch('setLoadingState', false)
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          Message.error('历史详情加载失败，请重试！')
        })
      }
    },
    components: {
      PreviewNotice
    }
  }
</script>

<style>
</style>
