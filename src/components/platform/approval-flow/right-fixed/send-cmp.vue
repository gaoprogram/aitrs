<!--
  User: xxxxxxx
  Date: 2019/1/29
  功能：right-fixed 右边区域中 点击了自定义按钮的 “提交”btn后的弹窗组件（注意和 agree-cmp 组件不一样）
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
      <el-button type="primary" @click="handleSure()">确 定</el-button>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK } from '@/api/config'
  import {
    send,
    saveMainValue,
    saveDetailValue
  } from '@/api/approve'
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
    data () {
      return {
        value: '',
        loading: false
      }
    },
    created () {
      console.log(this.form)
    },
    methods: {
      // 保存主表
      _saveMainValue (obj) {
        return saveMainValue(this.flow.FK_Flow, this.form.Node.NodeId, this.form.Flow.WorkId, obj)
      },
      // 保存明细表
      _saveDetailValue (obj) {
        return saveDetailValue(this.flow.FK_Flow, this.form.Node.NodeId, this.flow.WorkId, obj)
      },
      // 提交
      _send () {
        debugger
        return send(this.flow.FK_Flow, this.flow.WorkId, this.flow.FK_Node, this.value)
      },
      // 确定
      handleSure () {
        // 先判断 编辑器中的意见 必填校验
        
        let mainArr = []
        let detailArr = []
        debugger
        this.mainTables = this.form.MainTableInfos
        if (this.mainTables && this.mainTables.length) {
          this.mainTables.forEach((item) => {
            let tableObj = {
              TableCode: item.TableCode,
              Fields: [],
              Teams: []
            }
            item.Fields.forEach(field => {
              tableObj.Fields.push({
                FieldCode: field.FieldCode,
                FieldName: field.FieldName,
                FieldValue: field.FieldValue,
                RowNo: field.RowNo
              })
            })
            item.Teams.forEach(field => {
              tableObj.Teams.push({
                TeamCode: field.TeamCode,
                TeamName: field.TeamName,
                Fields: field.Fields
              })
            })
            mainArr.push(tableObj)
            item.DetailTableInfos.forEach(detail => {
              let detailObj = {
                TableCode: detail.DetailTableCode,
                Fields: [],
                MainTableCode: item.TableCode
              }
              detail.Values.forEach(val => {
                let newField = []
                val.forEach(field => {
                  newField.push({
                    FieldCode: field.FieldCode,
                    FieldName: field.FieldName,
                    FieldValue: field.FieldValue,
                    Unit: field.Unit
                  })
                })
                detailObj.Fields.push(newField)
              })
              detailArr.push(detailObj)
            })
          })
        }
        this.loading = true

        Promise.all([
          this._saveMainValue(JSON.stringify(mainArr)),
          this._saveDetailValue(JSON.stringify(detailArr)),
          // 调取 提交的接口
          this._send()
        ]).then(([mainResp, detailResp, workResp]) => {
          debugger
          this.loading = false
          if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
            this.$message.success('提交成功')
            debugger
            // 触发父级的 success 事件
            this.$emit('success')
          } else {
            if (mainResp.data.State === 0) {
              this.$message.error(mainResp.data.Error)
            }
            if (detailResp.data.State === 0) {
              this.$message.error(detailResp.data.Error)
            }
            if (workResp.data.State === 0) {
              this.$message.error(workResp.data.Error)
            }
          }
        }).catch(() => {
          this.loading = false
          this.$message.error('提交失败，请重试')
        })
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
