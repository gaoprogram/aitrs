<!--
  User: xxxxxxx
  Date: 2017/11/16
  功能：表格
-->

<template>
  <div class="table-content">
    <el-table :data="list" border style="width: 100%;">
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
          <span class="link-type" @click="showNoticeDetail(scope.row)">{{scope.row.Title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="NoticeRange" label="公告范围">
      </el-table-column>

      <el-table-column width="90" align="center" prop="EnableFeedback" label="允许反馈">
        <template slot-scope="scope">
          <span>{{ scope.row.EnableFeedback ? '是' : '否' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" sortable prop="Start" label="生效日期">
        <template slot-scope="scope">
          <span>{{ scope.row.Start | replaceTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="Finish" label="失效日期">
        <template slot-scope="scope">
          <span>{{ scope.row.Finish | replaceTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" prop="Status" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.Status | stateFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="Publisher" width="110" label="发布人">
      </el-table-column>

      <el-table-column align="center" prop="PublishDepartment" width="150" label="发布部门">
      </el-table-column>

      <el-table-column align="center" sortable prop="PublishTime" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.PublishTime | replaceTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" :width="width" fixed="right" v-if="isAdmin">
        <template slot-scope="scope">
          <el-button @click="updateIsTop(scope.row)" type="text" size="small" v-html="scope.row.IsTop ? '取消置顶' : '置顶'"></el-button>

          <el-button
            type="text"
            size="small"
            v-if="isModify"
            :disabled="scope.row.Status === 2"
            @click="modifyNotice(scope.row)"
          >编辑
          </el-button>

          <el-button
            type="text"
            size="small"
            v-if="isModify"
            v-html="scope.row.Status !== 2 ? '发布' : '撤回'"
            @click="sendOrRetract(scope.row, scope.row.Code, scope.row.Status)"
          ></el-button>

          <el-button
            type="text"
            size="small"
            @click="showFeedBack(scope.row)"
            :disabled="!isCompanyAdmin"
          >反馈</el-button>

          <el-button type="text" size="small" v-if="isModify" @click="showHistory(scope.row)">历史</el-button>
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

    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" center>
      <span>{{ promptText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureRetract()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="公告反馈" :visible.sync="isModifyDialog">
      <el-form class="small-space" label-position="left" label-width="100px" ref="feedbackContent" :model="feedbackContent" :rules="rules">
        <el-form-item label="反馈内容：" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入反馈内容"
            v-model="feedbackContent.content">
          </el-input>
        </el-form-item>
        <el-form-item label="是否公开：" class="postInfo-container-item">
          <el-radio-group v-model="feedbackPublish.isPublish">
            <el-radio v-for="item in isPublish" :key="item.value" :label="item.value">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isModifyDialog = false">取 消</el-button>
        <el-button type="primary" @click="addFeedback">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getNoticeList, retractNotice, publishNotice, feedback, updateIsTop } from '@/api/notice'
  import { REQ_OK, COMPANY_ADMIN } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'
  const RETRACT = 0
  const SEND = 1
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
        listQuery: {
          page: 1,
          limit: 10,
          title: '',
          sort: ''
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
      this._getNoticeList()
    },
    computed: {
      ...mapGetters([
        'userType',
        'userCode',
        'name',
        'loading'
      ]),
      isCompanyAdmin () {
        return this.userType === COMPANY_ADMIN
      }
    },
    methods: {
      _getNoticeList (item) {
        if (item) {
          this.listQuery = Object.assign({}, item)
        }
        getNoticeList(this.type, this.listQuery.limit, this.listQuery.page, this.listQuery.title, this.listQuery.sort, this.isAdmin).then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeList = res.data.Data.NoticeTypes
            this.list = res.data.Data.Notices
            this.total = res.data.Total
          } else {
            Message.error('加载失败！')
          }
          this.falseLoading()
        }).catch(() => {
          this.falseLoading()
          Message.error('加载失败！')
        })
      },
      updateIsTop (item) {
        updateIsTop(item.Code, !item.IsTop).then((res) => {
          if (res.data.State === REQ_OK) {
            Message.success('操作成功！')
            this._getNoticeList()
          } else {
            Message.error('操作失败！')
          }
        }).catch(() => {
          Message.error('操作失败！')
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
      showNoticeDetail (item) {
        if (this.isAdmin) {
          this.$router.push({path: '/notice/noticeManage/noticeDetailEnd', query: { code: item.Code }})
        } else {
          this.$router.push({path: '/notice/base-info/noticeDetailFront', query: { code: item.Code }})
        }
      },
      modifyNotice (item) {
        this.$router.push({path: '/notice/noticeManage/modifyNotice', query: { code: item.Code }})
      },
      showFeedBack (item) {
        this.$router.push({path: '/notice/noticeManage/feedback', query: { code: item.Code }})
      },
      showHistory (item) {
        this.$router.push({path: '/notice/noticeManage/historyNotice', query: { code: item.Code }})
      },
      sendOrRetract (item, code, status) {
        if (status === 2) {
          this.dialogVisible = true
          this.noticeCode = code
          this.status = 0
          this.ruleForm = Object.assign({}, item)
          this.promptText = '撤回后，员工将无法再看到该公告。是否确定执行该操作？'
        } else {
          this.dialogVisible = true
          this.noticeCode = code
          this.status = 1
          this.ruleForm = Object.assign({}, item)
          this.ruleForm.Start = new Date(this.replaceTime(this.ruleForm.Start))
          this.ruleForm.Finish = new Date(this.replaceTime(this.ruleForm.Finish))
          this.ruleForm.PublishTime = null
          this.promptText = '确认发布此公告吗？'
        }
      },
      sureRetract () {
        this.dialogVisible = false
        this.trueLoading()
        if (this.status === RETRACT) {
          retractNotice(this.noticeCode, this.name, this.userCode).then((res) => {
            if (res.data.State === REQ_OK) {
              Message.success('撤回公告成功！')
              this._getNoticeList()
            } else {
              Message.error('撤回公告失败，请重试！')
            }
          }).catch(() => {
            Message.error('撤回公告失败，请重试！')
          })
        } else if (this.status === SEND) {
          publishNotice(this.ruleForm, this.name, this.userCode).then((res) => {
            if (res.data.State === REQ_OK) {
              this._getNoticeList()
              Message.success('恭喜你，公告发布成功！')
            } else {
              Message.error('很遗憾，公告发布失败，请重试!')
            }
          }).catch(() => {
            Message.error('很遗憾，公告发布失败，请重试!')
          })
        }
        this.falseLoading()
      },
      addFeedback () {
        this.$refs.feedbackContent.validate((valid) => {
          if (valid) {
            feedback(this.ruleForm.Code, this.feedbackContent.content, this.feedbackPublish.isPublish).then((res) => {
              if (res.data.State === REQ_OK) {
                this.isModifyDialog = false
                this.feedbackContent.content = ''
                this.$refs.feedbackContent.resetFields()
                Message.success('反馈成功！')
              } else {
                this.isModifyDialog = false
                Message.error('反馈失败！')
              }
            }).catch(() => {
              this.isModifyDialog = false
              Message.error('反馈失败！')
            })
          }
        })
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
  .pagination-container
    margin-top: 20px
</style>
