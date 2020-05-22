<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--公告预览
-->

<template>
  <div class="preview-notice">
    <el-dialog :title="titleText" :visible.sync="isDialogNotice" center style="min-width: 1000px;">
      <el-form class="small-space" label-position="left" ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告标题：" class="postInfo-container-item">
              <span>{{ruleForm.Title}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告类型：" class="postInfo-container-item">
              <span>{{ noticeTypeFilter(ruleForm.NoticeTypeCode) }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重要级别：" class="postInfo-container-item">
              <span>{{ruleForm.Level | levelFilter}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生效日期：" class="postInfo-container-item">
              <span>{{ruleForm.Start | replaceTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效日期：" class="postInfo-container-item">
              <span>{{ruleForm.Finish | replaceTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发布人：">
              <span>{{ruleForm.Publisher}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布部门：">
              <span>{{ruleForm.PublishDepartment}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="公告内容：">
              <div v-html="ruleForm.Content" class="ql-editor"></div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="发布备注：">
              <span>{{ruleForm.Remarks}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" style="padding-right: 20px" v-if="alreadyUploadFile">
            <el-form-item label="附件：">
              <a class="file-item" download :href="configFileUrl + item.Url" v-for="item in alreadyUploadFile" v-show="checkImgType(item.Attribute)">{{item.Name}}</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePreNotice()">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { FILE_URL } from '@/api/config'
  import { mapGetters } from 'vuex'
  export default {
    props: {
      ruleForm: {
        type: Object,
        default: {
          Attachments: '',
          Status: '草稿',
          NoticeTypeCode: '',
          Level: '',
          Title: '',
          Range: 0,
          Finish: null,
          Start: null,
          EnableFeedback: true,
          FeedbackIsPublic: true,
          Publisher: '自己',
          PublishDepartment: '自己',
          Content: '',
          Remarks: '',
          IsTop: false
        }
      },
      titleText: {
        type: String,
        default: '公告预览'
      },
      typeName: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        isDialogNotice: false,
        name: ''
      }
    },
    computed: {
      configFileUrl () {
        return FILE_URL
      },
      ...mapGetters([
        'alreadyUploadFile'
      ])
    },
    methods: {
      showPreNotice () {
        this.isDialogNotice = true
      },
      closePreNotice () {
        this.isDialogNotice = false
      },
      noticeTypeFilter (code) {
        let str = ''
        if (code && this.typeName) {
          for (let i = 0; i < this.typeName.length; i++) {
            if (this.typeName[i].Code === code) {
              str = this.typeName[i].TypeName
            }
          }
        }
        return str
      },
      checkImgType (attr) {
        // if (/\.(jpg|gif|jpeg)+$/.test(attr)) {
        //   return false
        // } else {
        //   return true
        // }
        return true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .preview-notice
    .file-item
      display block
      &:hover
        color #62a2e9
    .el-form-item__content
       padding-right 20px
    .el-form-item
       margin-bottom: 0px!important
    .ql-editor
      padding-left 0
</style>
