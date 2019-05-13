<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--公告预览
-->

<template>
  <div class="noticeDetailEnd">
    <el-dialog :title="titleText" :visible.sync="isDialogNotice" center fullscreen :showClose="false" style="min-width: 1000px;">
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
              <span v-html="noticeTypeFilter(ruleForm.NoticeTypeCode)"></span>
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
          <el-col :span="24" style="padding-right: 20px">
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
          <el-col :span="12" style="padding-right: 20px" v-if="ruleForm.Attachments">
            <el-form-item label="附件：">
              <a class="file-item" download :href="configFileUrl + item.Url" v-for="item in ruleForm.Attachments" v-show="checkImgType(item.Attribute)">{{item.Name}}</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, FILE_URL } from '@/api/config'
  import { getNoticeType, getNoticeDetail } from '@/api/notice'
  import { Message } from 'element-ui'

  export default {
    props: {
    },
    data () {
      return {
        ruleForm: {},
        titleText: '公告详情',
        typeNameList: [],
        isDialogNotice: true,
        name: ''
      }
    },
    created () {
      this._getNoticeType()
      this._getNoticeDetail()
    },
    computed: {
      configFileUrl () {
        return FILE_URL
      }
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
      _getNoticeDetail () {
        getNoticeDetail(this.$route.query.code).then((res) => {
          if (res.data.State === REQ_OK) {
            this.ruleForm = res.data.Data
          } else {
            Message.error('公告详情加载失败，请重试！')
          }
        }).catch(() => {
          Message.error('公告详情加载失败，请重试！')
        })
      },
      closePreNotice () {
        this.isDialogNotice = false
      },
      noticeTypeFilter (code) {
        let str = ''
        console.log(code, this.typeNameList)
        if (code && this.typeNameList) {
          for (let i = 0; i < this.typeNameList.length; i++) {
            if (this.typeNameList[i].Code === code) {
              str = this.typeNameList[i].TypeName
            }
          }
        }
        return str
      },
      checkImgType (attr) {
        if (/\.(jpg|gif|jpeg|png)+$/.test(attr)) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/css/mixin.styl"
  .noticeDetailEnd
    .file-item
      display block
      &:hover
        color #62a2e9
    .el-dialog__header
      width: 960px
      margin 0 auto
    .el-dialog__body
      width: 960px
      margin: 0 auto
      box-shadow()
      margin-bottom: 50px
    .el-form-item__content
      padding-right 20px
    .el-form-item
      margin-bottom: 0px!important
    .ql-editor
      padding-left 0
</style>
