<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：反馈
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <el-input  v-model ="contentValue" placeholder="请输入内容" type="textarea"></el-input>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_addComment()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import { mapGetters } from 'vuex'
  import {
    addComment
  } from '@/api/approve'
  export default {
    props: {
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      flow: {
        type: Object,
        default: () => {
          return {}
        }
      },
      // 评论内容
      // flowEditorContentValue: {
      //   type: String,
      //   default: ''
      // }
    },
    computed: {
      ...mapGetters([
        'flowEditorContentValue'
      ])
    },
    watch: {
      flowEditorContentValue :{
        handler: function (newValue, oldValue){
          this.handleContent(newValue)
        },
        immediate: true
      }
    },
    data () {
      return {
        contentValue: '',  // 评论的内容
        loading: false
      }
    },
    created () {

    },
    methods: {
      // 评论--ok
      _addComment () {
        this.loading = true
        addComment(this.flow.WorkId, this.value).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.$emit('success')
            this.$message.success('评论成功')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('评论失败')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      },
      handleContent (html) {
        let re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        let msg = html.replace(re1,'');//执行替换成空字符
        debugger
        this.contentValue = msg
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-component-container
    .footer
      display block
      margin-top 20px
      text-align center
</style>
