<!--
  User: xxxxxxx
  Date: 2017/11/7
  功能：公告--意见反馈
-->

<template>
  <div class="feedback">
    <el-dialog :title="titleText"
               :visible.sync="isDialogNotice"
               center
               fullscreen
               :showClose="false"
               style="min-width: 1000px;"
    >
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
          <el-col :span="24">
            <el-form-item label="公告内容：">
              <span v-html="ruleForm.Content"></span>
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



        <!--<el-row>-->
          <!--<el-col :span="12" style="padding-right: 20px">-->
            <!--<el-form-item label="附件：">-->
              <!--<span v-for="item in filecontent">{{item.name}}</span>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12" >-->
            <!--<el-form-item label="发布备注：">-->
              <!--<span>{{ruleForm.Remarks}}</span>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <el-row>
          <el-col :span="12" style="padding-right: 20px">
            <el-form-item label="公开反馈：">
              <div class="openFeedback" v-if="openFeed.length">
                <ul class="items">
                  <li class="item" v-for="item in openFeed" :key="item.Id">
                    <span
                      class="name"
                      v-html="item.CreatorName + ' 回复@' + item.TargetName">
                    </span>
                    <span class="time">{{item.CreateTime | replaceTime}}</span>
                    <div class="content">{{item.Content}}</div>

                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入回复内容"
                      v-if="isReply === item.Code"
                      v-model="replyText">
                    </el-input>

                    <el-checkbox v-model="isPublish" v-if="isReply === item.Code">所有人可见</el-checkbox>
                    <div class="btn-item">
                      <el-button type="primary" @click="hideFeedback(item)">隐藏</el-button>
                      <el-button type="primary" @click="reply(item.Code)" v-html="isReply === item.Code ? '收起' : '回复'"></el-button>
                      <!--<el-button type="primary" @click="cancelReply(item)">撤销回复</el-button>-->
                      <el-button type="primary" @click="sendReply(item)" v-if="isReply === item.Code">发送</el-button>
                    </div>
                    <div class="children" v-for="children in item.Children" v-if="item.Children.length">
                      <span
                        class="name"
                        v-html="children.CreatorName + ' 回复@' + children.TargetName">
                      </span>
                      <span class="time">{{children.CreateTime | replaceTime}}</span>
                      <div class="content">{{children.Content}}</div>
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入回复内容"
                        v-if="isReply === children.Code"
                        v-model="replyText">
                      </el-input>
                      <el-checkbox v-model="isPublish" v-if="isReply === children.Code">所有人可见</el-checkbox>
                      <div class="btn-item">
                        <!--<el-button type="primary" @click="reply(children.Code)" v-html="isReply === children.Code ? '收起' : '回复'"></el-button>-->
                        <el-button type="primary" @click="cancelReply(children)">撤销回复</el-button>
                        <!--<el-button type="primary" @click="sendReply(item)" v-if="isReply === children.Code">发送</el-button>-->
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-right: 20px">
            <el-form-item label="私密反馈：">
              <div class="openFeedback" v-if="privateFeed.length">
                <ul class="items">
                  <li class="item" v-for="item in privateFeed" :key="item.Id">
                    <span
                      class="name"
                      v-html="item.CreatorName + ' 回复@' + item.TargetName"
                    >
                    </span>
                    <span class="time">{{item.CreateTime | replaceTime}}</span>
                    <div class="content ">{{item.Content}}</div>
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入回复内容"
                      v-show="isReply === item.Code"
                      v-model="replyText">
                    </el-input>
                    <el-checkbox v-model="isPublish" v-if="isReply === item.Code">所有人可见</el-checkbox>
                    <div class="btn-item">
                      <el-button type="primary" @click="reply(item.Code)" v-html="isReply === item.Code ? '收起' : '回复'"></el-button>
                      <!--<el-button type="primary" @click="cancelReply(item)">撤销回复</el-button>-->
                      <el-button type="primary" @click="sendReply(item)" v-if="isReply === item.Code">发送</el-button>
                    </div>
                    <div class="children" v-for="children in item.Children" v-if="item.Children.length">
                      <span
                        class="name"
                        v-html="children.CreatorName + ' 回复@' + children.TargetName">
                      </span>
                      <span class="time">{{children.CreateTime | replaceTime}}</span>
                      <div>{{children.Content}}</div>
                      <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入回复内容"
                        v-if="isReply === children.Code"
                        v-model="replyText">
                      </el-input>
                      <el-checkbox v-model="isPublish" v-if="isReply === children.Code">所有人可见</el-checkbox>
                      <div class="btn-item">
                        <el-button type="primary" @click="cancelReply(children)">撤销回复</el-button>
                        <!--<el-button type="primary" @click="reply(children.Code)" v-html="isReply === children.Code ? '收起' : '回复'"></el-button>-->
                        <!--<el-button type="primary" @click="sendReply(item)" v-if="isReply === children.Code">发送</el-button>-->
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="closeFeedback()">关 闭</el-button>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getNoticeType, getNoticeDetail, feedback, cancelReply, hideFeedback } from '@/api/notice'
  import { REQ_OK, COMPANY_ADMIN } from '@/api/config'
  import { Message } from 'element-ui'
  import { mapGetters } from 'vuex'

  export default {
    props: {
    },
    data () {
      return {
        typeNameList: [],
        titleText: '反馈处理',
        isDialogNotice: true,
        ruleForm: {},
        privateFeed: [],
        openFeed: [],
        replyText: '',
        isReply: '',
        isPublish: false,
        defaultCode: '00000000-0000-0000-0000-000000000000'
      }
    },
    computed: {
      ...mapGetters([
        'userCode',
        'companyCode',
        'name',
        'userType',
        'loading'
      ])
    },
    created () {
      this._getNoticeType()
    },
    methods: {
      _getNoticeType () {
        this.$store.dispatch('setLoadingState', true)
        getNoticeType().then((res) => {
          if (res.data.State === REQ_OK) {
            this.typeNameList = res.data.Data
            this.getFeedback()
          } else {
            this.$store.dispatch('setLoadingState', false)
            Message.error('公告反馈加载失败，请重试！')
          }
        }).catch(() => {
          this.$store.dispatch('setLoadingState', false)
          Message.error('公告反馈加载失败，请重试！')
        })
      },
      getFeedback () {
        getNoticeDetail(this.$route.query.code).then((res) => {
          if (res.data.State === REQ_OK) {
            this.ruleForm = res.data.Data
            if (res.data.Data.Feedback) {
              this.getFinalFeed(res.data.Data.Feedback)
            } else {
              this.privateFeed = []
              this.openFeed = []
            }
          } else {
            Message.error('公告反馈加载失败，请重试！')
          }
        }).catch(() => {
          Message.error('公告反馈加载失败，请重试！')
        })
        this.$store.dispatch('setLoadingState', false)
      },
      hideFeedback (item) {
        hideFeedback(item.Code).then((res) => {
          if (res.data.State === REQ_OK) {
            Message.success('隐藏反馈成功！')
            this.getFeedback()
          } else {
            Message.error('隐藏反馈失败，请重试！')
          }
        }).catch(() => {
          Message.error('隐藏反馈失败，请重试！')
        })
      },
      reply (code) {
        if (this.isReply === code) {
          this.isReply = ''
        } else {
          this.isReply = code
        }
      },
      sendReply (item) {
        feedback(this.isCompanyAdmin(), item.NoticeCode, this.replyText, this.isPublish, item.Code).then((res) => {
          if (res.data.State === REQ_OK) {
            Message.success('反馈成功！')
            this.replyText = ''
            this.getFeedback()
          } else {
            Message.error('反馈失败，请重试！')
          }
        }).catch(() => {
          Message.error('反馈失败，请重试！')
        })
      },
//      changeFeed () {
//        this.isReply = false
//      },
      cancelReply (item) {
        cancelReply(item.Code).then((res) => {
          if (res.data.State === REQ_OK) {
            Message.success('撤销回复成功！')
            this.getFeedback()
          } else {
            Message.error('撤销回复失败，请重试！')
          }
        }).catch(() => {
          Message.error('撤销回复失败，请重试！')
        })
      },
      noticeTypeFilter (code) {
        let str = ''
        if (code && this.typeNameList) {
          for (let i = 0; i < this.typeNameList.length; i++) {
            if (this.typeNameList[i].Code === code) {
              str = this.typeNameList[i].TypeName
            }
          }
        }
        return str
      },
      getFinalFeed (arr) {
        this.privateFeed = arr.filter(item => {
          return !item.IsPublish
        })
        this.openFeed = arr.filter(item => {
          return item.IsPublish
        })
      },
      isCompanyAdmin () {
        return this.userType === COMPANY_ADMIN
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .feedback
    .el-dialog__header
      width: 960px
      margin 0 auto
    .el-dialog__body
      width: 960px
      margin: 0 auto
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
      margin-bottom: 50px
    .el-form-item__content
      padding-right 20px
    .el-form-item
      margin-bottom: 0px!important
    .btn-item
      margin-top 10px
      button
        padding 6px 10px
        font-size 12px
    .children
      padding 10px 10px 10px 10px
      background #f7f6f6
      border-radius 5px
      margin 5px 0
</style>
