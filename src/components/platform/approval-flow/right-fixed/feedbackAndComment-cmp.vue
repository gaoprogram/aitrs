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
                .num 
                    color #808080
                    font-weight bold
                .name   
                    color #075DB3
                    font-size 14px
                .time
                    color #808080
                .icon
                    margin-left 15px
                    .deleteIcon
                        &:hover
                            cursor pointer
                            color red
            .contentBox
                color #494949
                font-size 14px
                .tit
                    font-weight bold
                .quote
                    margin 10px
                    color #909399
                .content 
                    line-height 20px
            .quoteBox
                .quote
                    float right
                    color #075DB3
                    font-size 14px
                    &:hover
                        cursor pointer
                        color red
                        text-decoration underline
        .quoteArea
            .quoteSentBox
                padding 10px
                >>>.quoteSendBtn
                    color #00000
                        &:hover
                            color #ffffff

    >>>.el-loading-mask
      top 0 !important


</style>
<template>
    <div id="feedBackComponents" v-if="form.FunctionRole.AllowComment">
        <!-- form: {{form.FunctionRole.AllowComment}} -->
        <div class="feedbackTit">评论区</div>
        <div class="feedbackWrap">
            <el-input
                class="feedbackInput"
                type="textarea"
                autosize
                placeholder="请输入评论内容"
                v-model="feedbackContent"
                @focus="feedbackInputFocus">
            </el-input>
            <el-button type="primary" plain class="feedbackBtn" size="medium" @click="handlerFeedback">发送</el-button>
        </div>
        <!-- form.Comments： {{form.Comments}} -->
        
        <div id="globalLoading-area1" :class="['comment-container', !commnets.length? 'not_found': '']">
            <div class="comment-item" v-for="(comment,index) in commnets">
                <!-- comment.Creator == userCode : {{comment.Creator == userCode}} -->
                <div class="desc">
                    <span class="num">第{{index+1}}楼</span>
                    <span class="name">{{comment.CreatorName}}</span>
                    <span style="display: inline-block;width: 50px"></span>
                    <span class="time">发表于 {{comment.CreateTime | replaceTime}}</span>
                    <span class="icon"><i class="el-icon-delete deleteIcon" v-if="comment.Creator == userCode" @click="_deleteComment(comment)"></i></span>    
                </div>

                <div class="contentBox">
                    <div class="quote" v-if="comment.quote">
                        {{comment.quote}}
                    </div>
                    <i class="el-icon-chat-dot-square"></i>
                    <span class="tit">评论:</span>
                    <span class="content">{{comment.Content}}</span>
                </div>
                <div class="quoteBox clearfix" v-if="form.FunctionRole.AllowComment">
                    <span class="quote" @click="clickQuote(comment, index)">引用</span>
                </div>              
            </div>    
            
            <div class="quoteArea"  v-if="form.FunctionRole.AllowComment && showQuoteArea">
                <el-input
                    ref="quoteInput"
                    class="quoteInput"
                    type="textarea"
                    :autosize="{minRows: 2, maxRows: 20}"
                    size="small"
                    placeholder="请输入引用评论内容"
                    v-model="quoteContent"
                    autofocus>
                </el-input>
                <div class="quoteSentBox">
                    <el-button type="primary"  plain class="quoteSendBtn" size="mini" @click="handlerQuote()">提交引用评论</el-button>
                </div>
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
        commnets: [],  // 评论的列表
        showQuoteArea: false,  // 引用评论区的显示/隐藏
        quoteContent: '',   // 引用评论的内容
        quoteOtherPeoper: '', // 引用时显示的其他人的姓名和内容
        currentQuoteObj: {}, // 当前点击的引用的评论对象
        currentQuoteIdx: ''  // 当前点击的引用的评论对象的索引
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
        'form.Flow.WorkId': {
            handler (newValue, oldValue) {
                // 监控 当点击了下一条/上一条 或者 点击其他流程的查看btn后 进行  重新评论的数据， 当切换节点后 不会触发这里的执行（切换节点 这个workId不会变化）
                debugger
                if(newValue){
                    // form 表单变化后 需要重新获取 评论内容
                    this._getComments()
                }
            },
            // immediate: true,
            // deep: true
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
            showFeedback(this.form.Flow.WorkId, 'globalLoading').then((res) => {
                debugger
                if(res && res.data.State === REQ_OK){
                    this.commnets = res.data.Data
                    this.commnets.forEach((item, key)=>{
                        if(item.Content){
                            if(item.Content[0] === '@' && item.Content[1] ==='引' && item.Content[2] ==='用'){
                                // 有引用内容
                                let arr = item.Content.split('[/quote]')
                                item.quote = arr[0]
                                item.Content = arr[1]
                            }
                        }
                    })
                    this.containerLoading = false
                }else {
                    this.$message.error("评论内容获取失败err,请刷新后重试")
                }
            }).catch(() => {
                this.$message.error("评论内容获取失败err,请刷新后重试")
            })
        },
        // 填写评论后提交
        _addComment (type, content) {
            this.containerLoading = true
            if(type === 0){
                // 普通提交评论
                addComment(this.form.Flow.WorkId, content).then(res => {
                    this.containerLoading = false
                if (res.data.State === REQ_OK) {
                    // this.$emit('success')
                    this.$message.success('评论成功')
                    // 清空输入的内容
                    this.feedbackContent = ''
                    // 评论成功后重新获取评论列表
                    this._getComments()
                } else {
                    this.$message.error(res.data.Error)
                }
                }).catch(() => {
                    this.containerLoading = false
                    this.$message.error('评论失败')
                })
            }else if(type === 1){
                // 引用提交评论
                addComment(this.form.Flow.WorkId, content).then(res => {
                    this.containerLoading = false
                if (res.data.State === REQ_OK) {
                    // this.$emit('success')
                    this.$message.success('评论成功')
                    // 引用评论成功后重新获取评论列表
                    this.showQuoteArea = false
                    this._getComments()
                } else {
                    this.$message.error(res.data.Error)
                }
                }).catch(() => {
                    this.containerLoading = false
                    this.$message.error('评论失败')
                })
            }

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
        // 反馈输入框 获取焦点
        feedbackInputFocus () {
            // 关闭 引用评论的输入款
            this.showQuoteArea = false
        },
        // 点击了反馈的 发送button
        handlerFeedback () {
            // 关闭 引用评论的输入款
            this.showQuoteArea = false
            if(this.feedbackContent) {
                this._addComment(0,this.feedbackContent)
            }else {
                this.$message.warning("请填写反馈内容后提交发送!")
            }
        }, 
        // 点击了 引用 的btn
        clickQuote(obj, idx) {
            debugger
            this.quoteContent = ''
            this.currentQuoteObj = obj
            this.currentQuoteIdx = idx
            this.quoteOtherPeoper = `@引用${obj.CreatorName}的回复：${obj.Content}。[/quote] `
            this.showQuoteArea = true
        },
        // 引用评论提交
        handlerQuote() {            
            // 调用 评论的接口
            let newValue = this.quoteOtherPeoper + this.quoteContent
            this._addComment(1,newValue)
        },
        // 删除评论
        handleCancel () {
            this.$emit('DialogCancel')
        }      
    }
  }
</script>

