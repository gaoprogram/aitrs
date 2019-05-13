<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--新增公告
-->

<template>
  <div class="modify-notice">
    <el-dialog :title="title"
               :visible.sync="isDialogNotice"
               :before-close="cancelNotice"
               center
               fullscreen
               style="min-width: 1000px;"
    >
      <el-form class="small-space" label-position="left" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告状态：" label-width="100px">
              <span>{{ruleForm.Status | stateFilter}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告范围：" prop="Range">
              <el-radio-group v-model="ruleForm.Range">
                <el-radio v-for="item in range" :key="item.value" :label="item.value">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题：" class="postInfo-container-item" prop="Title">
              <el-input v-model="ruleForm.Title" placeholder="请输入公告标题" style="width: 80%!important;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否置顶：" class="postInfo-container-item">
              <el-radio-group v-model="ruleForm.IsTop">
                <el-radio v-for="item in isTop" :key="item.value" :label="item.value">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告类型：" class="postInfo-container-item" prop="NoticeTypeCode">
              <el-select class="filter-item" v-model="ruleForm.NoticeTypeCode" placeholder="请选择">
                <el-option v-for="item in typeNameList" :key="item.Code" :label="item.TypeName" :value="item.Code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重要级别：" class="postInfo-container-item" prop="Level">
              <el-select class="filter-item" v-model="ruleForm.Level" placeholder="请选择">
                <el-option v-for="item in level" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效日期：" class="postInfo-container-item" prop="Start">
              <el-date-picker
                v-model="ruleForm.Start"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                @change="logTimeChange"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效日期：" class="postInfo-container-item" prop="Finish">
              <el-date-picker
                v-model="ruleForm.Finish"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                :picker-options="pickerOptions1"
                @change="logTimeChange"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="反馈许可：">
              <el-radio-group v-model="ruleForm.EnableFeedback">
                <el-radio v-for="item in enableFeedback" :key="item.value" :label="item.value">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="反馈信息：">
              <el-radio-group v-model="ruleForm.FeedbackIsPublic">
                <el-radio v-for="item in feedbackIsPublic" :disabled="!ruleForm.EnableFeedback" :key="item.value" :label="item.value">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布人：">
              <span>{{ruleForm.Publisher || name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布部门：">
              <span>{{ruleForm.PublishDepartment || name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="公告内容：" prop="Content">
          <aitrs-editor :noticeCode="ruleForm.Code" @editor="editorContent" ref="aitrsEditor" :content="ruleForm.Content"></aitrs-editor>
        </el-form-item>
        <el-row>
          <el-col :span="12" style="padding-right: 20px">
            <el-form-item label="附件：">
              <upload-file ref="uploadTemplate" :noticeCode="ruleForm.Code" @fileChange="fileChange" :propsFile="ruleForm.Attachments"></upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="发布备注：">
              <el-input type="textarea" v-model="ruleForm.Remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_saveNotice()">保 存</el-button>
        <el-button type="primary" @click="_preNotice()">预 览</el-button>
        <el-button
          type="primary"
          @click="send()"
        >重新发布
        </el-button>
        <el-button @click="cancelNotice()">取 消</el-button>
      </div>
    </el-dialog>
    <preview-notice title="公告预览" :ruleForm="ruleForm" ref="preNotice" :typeName="typeNameList"></preview-notice>
  </div>
</template>

<script type="text/ecmascript-6">
  import AitrsEditor from '@/base/editor/aitrs-editor'
  import { saveNotice, publishNotice, getNoticeDetail, getNoticeType } from '@/api/notice'
  import { REQ_OK } from '@/api/config'
  import { Message, MessageBox } from 'element-ui'
  import UploadFile from '@/base/uploadFile/uploadFile'
  import PreviewNotice from '@/components/notice/end/previewNotice'
  import { mapGetters } from 'vuex'

  export default {
    props: {

    },
    data () {
      return {
        ruleForm: {
          Code: '',
          Status: 1,
          NoticeTypeCode: '',
          Level: '',
          Title: '',
          Range: 0,
          Finish: null,
          Start: null,
          EnableFeedback: true,
          FeedbackIsPublic: true,
          Publisher: '',
          PublisherCode: '',
          PublishDepartment: '',
          PublishDepartmentCode: '',
          Operator: '',
          OperatorCode: '',
          Content: '',
          Remarks: '',
          IsTop: false,
          Attachments: []
        },
        title: '编辑公告',
        typeNameList: [],
        dialogCode: 0,
        dialogText: '',
        filecontent: [],
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() < (Date.now() - 3600 * 1000 * 24)
          }
        },
        isTop: [
          {
            name: '是',
            value: true
          },
          {
            name: '否',
            value: false
          }
        ],
        enableFeedback: [
          {
            name: '是',
            value: true
          },
          {
            name: '否',
            value: false
          }
        ],
        feedbackIsPublic: [
          {
            name: '保密',
            value: false
          },
          {
            name: '公开',
            value: true
          }
        ],
        range: [
          {
            name: '全部员工',
            value: 0
          },
          {
            name: '部分员工',
            value: 1
          }
        ],
        level: [
          {
            name: '重要',
            value: 1
          },
          {
            name: '紧急',
            value: 2
          },
          {
            name: '普通',
            value: 4
          }
        ],
        rules: {
          Title: [
            { required: true, message: '请输入公告标题', trigger: 'blur' },
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
          ],
          Start: [
            { type: 'date', required: true, message: '请选择公告生效日期', trigger: 'change' }
          ],
          Finish: [
            { type: 'date', required: true, message: '请选择公告失效日期', trigger: 'change' }
          ],
          NoticeTypeCode: [
            { required: true, message: '请选择公告类型', trigger: 'change' }
          ],
          Level: [
            { type: 'number', required: true, message: '请选择重要级别', trigger: 'change' }
          ],
          Content: [
            { required: true, message: '请输入公告内容', trigger: 'blur' }
          ]
        },
        isDialogNotice: true,
        dialogVisible: false
      }
    },
    created () {
      this._getNoticeType()
      this.modifyNotice()
      this.trueLoading()
    },
    computed: {
      ...mapGetters([
        'userCode',
        'companyCode',
        'name',
        'alreadyUploadFile',
        'loading'
      ])
    },
    mounted () {
    },
    methods: {
      _getNoticeType () {
        getNoticeType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeNameList = res.data.Data
          } else {
            Message.error('公告类型获取失败，请刷新重试！')
          }
        }).catch(() => {
          Message.error('公告类型获取失败，请刷新重试！')
        })
      },
      modifyNotice () {
        getNoticeDetail(this.$route.query.code).then((res) => {
          if (res.data.State === REQ_OK) {
            this.ruleForm = res.data.Data
            this.ruleForm.Start = new Date(this.replaceTime(this.ruleForm.Start))
            this.ruleForm.Finish = new Date(this.replaceTime(this.ruleForm.Finish))
            this.falseLoading()
          } else {
            Message.error('公告编辑加载失败，请重试！')
            this.falseLoading()
          }
        }).catch(() => {
          Message.error('公告编辑加载失败，请重试！')
          this.falseLoading()
        })
      },
      _saveNotice () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.trueLoading()
            this.publisher()
            this.publishDepartment()
            this.operator()
            saveNotice(this.ruleForm).then((res) => {
              if (res.data.State === REQ_OK) {
                this.fullscreenLoading = false
                Message.success('恭喜你，公告保存成功！')
                this.$router.push({path: '/notice/noticeManage'})
              } else {
                this.falseLoading()
                Message.error('公告保存失败，请重试!')
              }
            }).catch(() => {
              this.falseLoading()
              Message.error('公告保存失败，请重试!')
            })
          }
        })
      },
      _sendNotice () {
        this.trueLoading()
        this.publisher()
        this.publishDepartment()
        this.operator()
        publishNotice(this.ruleForm).then((res) => {
          if (res.data.State === REQ_OK) {
            this.$router.push({path: '/notice/noticeManage'})
            Message.success('恭喜你，公告发布成功！')
          } else {
            this.falseLoading()
            Message.error(`很遗憾，${res.data.Error}，公告发布失败，请重试!`)
          }
        }).catch(() => {
          this.falseLoading()
          Message.error('很遗憾，请求超时，公告发布失败，请重试!')
        })
      },
      _preNotice () {
        this.$refs.preNotice.showPreNotice()
      },
      send () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            MessageBox.confirm('执行此操作,您之前已发布的此公告将被更新发布,确定重新发布吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this._sendNotice()
            }).catch(() => {
            })
          }
        })
      },
      cancelNotice () {
        MessageBox.confirm('还未保存公告，是否确认离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$store.dispatch('emptyAlreadyUploadFile')
          this.$router.push({path: '/notice/noticeManage'})
        }).catch(() => {
        })
      },
      editorContent (item) {
        this.ruleForm.Content = item
      },
      fileChange (item) {
//        this.ruleForm.Attachments = this.alreadyUploadFile
      },
      logTimeChange (val) {
//        console.log(val)
      },
      publisher () {
        if (!this.ruleForm.PublisherCode) {
          this.ruleForm.Publisher = this.name
          this.ruleForm.PublisherCode = this.userCode
        }
      },
      publishDepartment () {
        if (!this.ruleForm.PublishDepartmentCode) {
          this.ruleForm.PublishDepartment = this.name
          this.ruleForm.PublishDepartmentCode = this.userCode
        }
      },
      operator () {
        this.ruleForm.Operator = this.name
        this.ruleForm.OperatorCode = this.userCode
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
    watch: {
      'ruleForm.Attachments': {
        handler (newValue, oldValue) {
          this.$store.dispatch('setAlreadyUploadFile', this.ruleForm.Attachments)
        },
        deep: true
      }
    },
    components: {
      AitrsEditor,
      UploadFile,
      PreviewNotice
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-form--label-left
    .el-form-item__label
      text-align: right
</style>
