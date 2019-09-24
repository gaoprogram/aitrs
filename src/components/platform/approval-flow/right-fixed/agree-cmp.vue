<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：table 表格中中 点击了 “提交" 或者 ”拒绝“ 后的弹窗组件 （注意 和 send-cmp 组件不一样）
-->

<template>
  <div class="btn-component-container" v-loading="loading">
    <!-- currentAuthorityObj {{currentAuthorityObj}} -->
    <div v-if="currentAuthorityObj.ShowOpinion">
      <aitrs-editor
        ref="aitrsEditor"
        @editor="changeContent"
        :content="value"
        :isShowImg=false
        placeholder="请输入提交意见"
      >
      </aitrs-editor>
      <span class="footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleSure()">确 定</el-button>
      </span>      
    </div>
    
    <div v-else>
      <p class="content" style="font-size: 14px">确定要提交吗?</p>
      <span class="footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleSure()">确 定</el-button>
      </span>   
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    send,
    batchSend,
    getWorkFunctionRole
  } from '@/api/approve'
  import { getRoleRange } from '@/api/permission'
  import AitrsEditor from '@/base/editor/aitrs-editor'
  export default {
    props: {
      todoSendFlag: {
        type: String,
        default: ''
      },
      batchAgreeObj: {
        type: Object,
        default: () => {
          return {}
        }
      },
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
    data () {
      return {
        value: '', // 编辑器中的 提交 内容
        loading: false,
        versionId: '',
        currentAuthorityObj: {}  // 获取的当前流程的 权限集合对象
      }
    },
    watch: {
      batchAgreeObj: {
        handler(newVal, oldVal){
          this.$emit("update:batchAgreeObj", newVal)
        },
        deep: true
      }
    },
    created () {
      console.log(this.form)
      // 调取 权限的接口 以便来判断是否 需要显示 编辑器的弹框
      // this._getRoleRange().then((res) => {
      //   debugger
      //   if(res && res.data.State === REQ_OK) {
      //     this.versionId = res.data.Data
      //     this._getAuthority()
      //   }else {
      //     this.$message({
      //       type: "error",
      //       message: "roleRange获取失败"
      //     })
      //   }     
      // })
      this._getAuthority()
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
        getWorkFunctionRole( workId ).then(res => {
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
      // 批量提交的接口
      _batchSend () {
        debugger
        this.loading = true
        batchSend(this.batchAgreeObj).then(res => {
          debugger
          if (res.data.State === 1) {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            // 成功了之后 触发主表重新获取表格的数据
            this.$emit("success",{state:1, nextStepAccepterEmpArr: []})
          }else if( res.data.State === 2 ){
            // 状态值为 2 需要选择下一步操作人 必须新增选择了下一步操作人之后才能继续提交
            this.$emit("success", {state:2, nextStepAccepterEmpArr: res.data })
          }else if( res.data.State === 3 ){
            // 状态值为 3，会弹出下一步操作人，但是选择下一步操作人 不是必选 可以关闭后继续提交
            this.$emit("success", {state:3, nextStepAccepterEmpArr: res.data })
          }else {
            // 失败了之后 也需要刷新页面（有些提交成功了，有些没有提交成功）但是此处就只会选择一个流程提交 所以 不需要重新刷新table
            // this.$message({
            //   type: 'error',
            //   message: `提交失败,${res.data.Error}`
            // })
            // this.$message({
            //   duration: 0,
            //   showClose: true,              
            //   dangerouslyUseHTMLString: true,
            //   message: `提交失败,${res.data.Error}`
            // })  
            this.$notify({
              title: '提示',
              type: 'warning',
              duration: 0,
              dangerouslyUseHTMLString: true,
              message: `${res.data.Error}`
            })                      
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
          this.$message.error('设置失败，请重试！无法执行批量提交')
        })
      }, 
      // 提交
      _send () {
        return send(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.value)
      },
      // 确定同意
      handleSure () {
        debugger
        // 先判断 意见是否是必填项
        if( this.currentAuthorityObj.OpinionRequired ) {
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

        if(!this.todoSendFlag){
          // 开始提交
          Promise.all([
            this._send()
          ]).then(([workResp]) => {
            this.loading = false
            if (workResp.data.State === REQ_OK) {
              this.$message.success('提交成功')
              // 触发父级 页面的  success 事件
              this.$emit('success')
            } else if(workResp.data.State === 2){
              // 状态值为 2 需要选择下一步操作人 必须新增选择了下一步操作人之后才能继续提交
              this.$emit('success', {state:2,nextStepAccepterEmpArr:workResp.data||[]})
              // this.dialogTitle = '选择下一步操作人'
              // this.dialogVisible = true
              // this.isNotMust = false
              // this.str = 'addNextStepAccepters'              
            }else if(workResp.data.State === 3) {
              // 状态值为 3，会弹出下一步操作人，但是选择下一步操作人 不是必选 可以关闭后继续提交
              this.$emit('success', {state:3,nextStepAccepterEmpArr:workResp.data||[]})
              // this.dialogTitle = '选择下一步操作人'
              // this.dialogVisible = true
              // // 选下一步操作人不是必选
              // this.isNotMust = true
              // this.str = 'addNextStepAccepters'  
            }else {
              // this.$message({
              //   type: "warning",
              //   message: `提交失败err,${workResp.data.Error}`
              // })
              // this.$message({
              //   duration: 0,
              //   showClose: true,                
              //   dangerouslyUseHTMLString: true,
              //   message: `提交失败err,${workResp.data.Error}`
              // })   
              
              this.$notify({
                title: '提示',
                duration: 0,
                type:'warning',
                dangerouslyUseHTMLString: true,
                message: `${res.data.Error}`
              })              
            }
          }).catch(() => {
            this.loading = false
            this.$message.error('提交失败，请重试')
          }) 
        }else if( this.todoSendFlag === 'todoSend' ){
          // todo页面 table表格中 点击的 提交按钮 需要调用的是 批量提交的接口
          this.batchAgreeObj.opinion = this.value
          this._batchSend()
        }
      },
      handleCancel () {
        this.$emit('DialogCancel')
      },
      changeContent (val) {
        this.value = val
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
