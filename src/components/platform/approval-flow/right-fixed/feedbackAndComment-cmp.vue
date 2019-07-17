<!--
  User: gaol
  Date: 2019/6/17
  功能： right-fixed 详情中 的反馈区域组件
-->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .feedbackTit
        color #000000
        font-size 14px
        font-weight bold
        margin-bottom 10px
    .feedbackWrap
        width 100%
        margin-bottom 10px
        >>>.feedbackInput
            width 80%
            vertical-align middle
            >>>.feedbackBtn
                width 50px
    .comment-container
        min-height 50px
        .comment-item
            padding-left 15px
            padding-bottom 15px
            margin-bottom 15px
            font-size 16px
            color #999999
            border-bottom 1px solid #dedede
            .desc
              margin-bottom 10px
              font-size 14px
              i
                margin-left 15px
                &:hover
                  cursor pointer
                  color red
            .content
              font-size 14px
</style>
<template>
    <div id="feedBackComponents">
        <!-- form: {{form.FunctionRole.AllowComment}} -->
        <div class="feedbackTit">评论区</div>
        <div class="feedbackWrap" v-loading="feedbackLoading" v-if="form.FunctionRole.AllowComment">
            <el-input
                class="feedbackInput"
                type="textarea"
                autosize
                placeholder="请输入评论内容"
                v-model="feedbackContent"
                @blur="">
            </el-input>
            <el-button type="primary" plain class="feedbackBtn" size="medium" @click="handlerFeedback">发送</el-button>
        </div>
        <!-- form.Comments： {{form.Comments}} -->
        
        <div :class="['comment-container', !commnets.length? 'not_found': '']" v-loading="containerLoading">
            <div class="comment-item" v-for="comment in commnets">
                <!-- comment.Creator == userCode : {{comment.Creator == userCode}} -->
                <div class="desc">
                    {{comment.CreatorName}}
                    <span style="display: inline-block;width: 50px"></span>
                    {{comment.CreateTime | replaceTime}}
                    <i class="el-icon-delete" v-if="comment.Creator == userCode" @click="_deleteComment(comment)"></i>
                </div>
                <div class="content">评论：{{comment.Content}}</div>
            </div>    
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    addComment,
    deleteComment,
    showFeedback
  } from '@/api/approve'
  import { flowCommonFnRightFixed } from '@/utils/mixin'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [flowCommonFnRightFixed],
    props: {
      rightContentCurrentStr: {
        type: String,
        default: ''
      },
      workId: {
        type: String,
        default: ''
      },
      form: {
          type: Object,
          default: () => {
              return {}
          }
      }  
    },
    data () {
      return {
        feedbackLoading: false,  // 反馈发送后的loading
        containerLoading: false, // 评论内容区域内容的 loading
        feedbackContent: '',  // 反馈的内容
        commnets: []  // 评论的列表
      }
    },
    components: {
    },       
    computed: {
        ...mapGetters({
           userCode: 'userCode'
        })
    }, 
    watch: {
        form: {
            handler (newValue, oldValue) {
                debugger
                if(newValue){
                    // form 表单变化后 需要重新获取 评论内容
                    this._getComments()
                }
            },
            deep: true
        }
    },
    created () {
        // 获取 评论list
        this._getComments()
    },
    beforeDestroy () {
      // 组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    },    
    methods: {
        // 评论成功后刷新评论区
        _getComments () {
            this.containerLoading = true
            showFeedback(this.form.Flow.WorkId).then((res) => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.commnets = res.data.Data
                    this.containerLoading = false
                }else {
                    this.$message.error("评论内容获取失败err,请刷新后重试")
                }
            }).catch(() => {
                this.$message.error("评论内容获取失败err,请刷新后重试")
            })
        },
        // 填写评论后提交
        _addComment () {
            this.containerLoading = true
            addComment(this.form.Flow.WorkId, this.feedbackContent).then(res => {
            this.containerLoading = false
            if (res.data.State === REQ_OK) {
                // this.$emit('success')
                this.$message.success('评论成功')
                // 评论成功后重新获取评论列表
                this._getComments()
            } else {
                this.$message.error(res.data.Error)
            }
            }).catch(() => {
            this.containerLoading = false
            this.$message.error('评论失败')
            })
        },
        _deleteComment (comment) {
            debugger
            this.$confirm('确定要删除此评论内容吗?','提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'                
            }).then(() => {
                debugger
                deleteComment(this.form.Flow.WorkId,comment.Id).then(res => {
                    debugger
                    if(res && res.data.State === REQ_OK){
                        this.$message.success("评论删除成功")
                        // 评论成功后 调用刷新评论的接口
                        this._getComments()
                    }else {
                        this.$message.error("评论删除失败err,请刷新后重试")
                    }
                }).catch(() => {
                    debugger
                    this.$message.error("评论删除失败err, 请刷新后重试")
                })     
            }).catch(() => {
                debugger
                this.$message({
                    type: 'info',
                    message: '已成功取消删除此评论'
                });                 
            })
        },
        // 点击了反馈的 发送button
        handlerFeedback () {
            if(this.feedbackContent) {
                this._addComment()
            }else {
                this.$message.warning("请填写反馈内容后提交发送!")
            }
        }, 
        // 删除评论
    
        handleCancel () {
            this.$emit('DialogCancel')
        }      
    }
  }
</script>

