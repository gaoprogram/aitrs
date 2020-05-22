<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：拒绝
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <aitrs-editor
      ref="aitrsEditor"
      @editor="changeContent"
      :content="value"
      :isShowImg=false
      placeholder="请输入处理意见"
    >
    </aitrs-editor>
    <span class="footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button type="primary" @click="_refuse()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    refuse,
    getForm
  } from '@/api/approve'
    import { getRoleRange } from '@/api/permission'
  import AitrsEditor from '@/base/editor/aitrs-editor'
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
      }
    },
    watch: {
      value :{
        handler: function (newValue, oldValue){
          this.handleContent(newValue)
        },
        immediate: true
      }
    },    
    data () {
      return {
        value: '',
        loading: false,
        versionId: '',
        currentAuthorityObj: {}  // 获取的当前流程的 权限集合对象        
      }
    },
    created(){
      // 调取 权限的接口 以便来判断是否 需要显示 编辑器的弹框
      this._getRoleRange().then((res) => {
        debugger
        if(res && res.data.State === REQ_OK) {
          this.versionId = res.data.Data
          this._getAuthority()
        }else {
          this.$message({
            type: "error",
            message: "roleRange获取失败"
          })
        }     
      })      
    },
    methods: {
      // 获取版本号
      _getRoleRange () {
        return new Promise((resolve, reject) => {
          debugger
          resolve(getRoleRange('WorkFlow')) 
        })
      },      
      // 调取权限的接口
      _getAuthority () {
        debugger
        let flowId = this.flow.FK_Flow
        let workId = this.flow.WorkId
        let nodeId = this.flow.FK_Node
        this.rightLoading = true
        getForm(flowId, workId, nodeId, this.versionId).then(res => {
          if (res.data.State === REQ_OK) {
            debugger
            this.currentAuthorityObj = res.data.Data
          } else {
            this.$message({
              type: 'error',
              message: "功能权限获取失败,请重试！"
            })
          }
          this.rightLoading = false
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '功能权限获取失败，请重试！'
          })
          this.rightLoading = false
        })
      },         
      // 拒绝
      _refuse () {
        // 先判断 意见是否是必填项
        if( this.currentAuthorityObj.FunctionRole.OpinionRequired ) {
          // 意见需要必填
          if( !this.value ){
            // 没有填写内容
            this.$message({
              type: "warning",
              message: "需要填写意见方可提交！"
            })
            return 
          }
        }        
        this.loading = true
        refuse(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.value).then(res => {
          this.loading = false
          if (res.data.State === REQ_OK) {
            this.dialogVisible = false
            this.$message.success('操作成功')
            this.$emit('success')
          } else {
            this.$message.error(res.data.Error)
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('操作失败')
        })
      },
      handleCancel () {
        this.$emit('DialogCancel')
      },
      changeContent (val) {
        this.value = val
      },
      // 将富文本内容 获取其中的字符串
      handleContent (html) {
        let re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        let msg = html.replace(re1,'');//执行替换成空字符
        this.value = msg
      }         
    },
    components: {
      AitrsEditor
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
