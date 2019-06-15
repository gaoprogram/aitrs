<!--
  User: gaol
  Date: 2019/6/12
  功能：审批流（待办，在途，我发起的，我审批的，抄送我的，我关注的） 页面中的 右侧信息展示区域
-->

<template>
  <transition name="move">
    <div class="right-fixed-container" v-loading="loading">
      <div class="close">
        <el-tooltip class="item" effect="dark" content="关闭" placement="bottom">
          <i class="el-icon-circle-close-outline" @click="close"></i>
        </el-tooltip>
      </div>
      <div class="content-container" v-if="form.Flow">
        <div class="btn-container">
          <div class="fn-btn">
            <el-button
              round
              size="small"
              v-for="(btn, index) in form.Buttons"
              :key="index"
              @click="handleFn(btn.Method)"
            >{{btn.Text}}
            </el-button>
            <el-button round size="small" type="primary" @click.native="_exportFlow()">导出</el-button>
            <el-button round size="small" type="primary" @click.native="handlePrintFlow">打印</el-button>
            <el-button round size="small" type="primary" @click.native="prev()">上一条</el-button>
            <el-button round size="small" type="primary" @click.native="next()">下一条</el-button>
          </div>
        </div>
        <!---右侧fixed 详情区域---start--->
        <div class="table-content">
          <div class="table-title">{{form.Flow.FlowName}}</div>
          form.Tags： {{form.Tags}}
          <div style="margin-bottom: 10px">
            <el-tag v-for="tag in form.Tags" :key="tag.Method">{{tag.Text}}</el-tag>
          </div>

          <div class="main-content">
            <!-- mainTables： {{mainTables}} -->
            <el-tabs v-model="currentMainTableCode" type="card" @tab-click="handleClickMainTableTab">
              <el-tab-pane
                v-for="item in mainTables"
                :key="item.TableCode"
                :label="item.TableName"
                :name="item.TableCode"
              >
              </el-tab-pane>
            </el-tabs>

            <div style="height: 500px;width: 500px">
              <el-scrollbar style="height: 100%;width: 100%">
                <el-form :model="currentMainTableObj" ref="launchForm"
                         class="main_form">
                  <div class="field" v-for="(field, index) in currentMainTableObj.Fields" :key="index">
                    <div v-if="field.Role !== 4">
                      <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                        {{field.FieldName}} : {{field.DisplayValue}}
                        <span class="field-edit">
                          <el-button
                            type="text"
                            v-if="field.Role === 2"
                            @click="field.showEdit = !field.showEdit"
                          >
                            {{field.showEdit ? '收起' : '修改'}}
                          </el-button>
                        </span>
                      </span>
                      <span class="field-name" v-else>
                        {{field.FieldName}} :
                        <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                          {{val.Name}}
                          <span style="margin-left: 10px">
                            <a :href="val.Url" :download="val.Name">
                              <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                            </a>
                            <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button>
                            <span class="field-edit">
                              <el-button
                                type="text"
                                v-if="field.Role === 2"
                                @click="field.showEdit = !field.showEdit"
                              >
                                {{field.showEdit ? '收起' : '修改'}}
                              </el-button>
                            </span>
                          </span>
                        </span>
                      </span>
                      <div v-if="field.showEdit">
                        <component
                          :is="currentRuleComponent(field.ControlType)"
                          :prop="'Fields.' + index + '.FieldValue'"
                          :obj="field"
                          :workId="form.Flow.WorkId"
                          :nodeId="form.Flow.FK_Node"
                          :attachmentRole="attachmentRole"
                          :isTitle="false"
                          @changeEmp="changeOrgMainCmp('launchForm', $event)"
                        ></component>
                      </div>
                    </div>
                  </div>
                </el-form>

                <template v-for="team in currentMainTableObj.Teams">
                  <div style="border-bottom: 1px solid #dedede; padding-bottom: 10px;margin-bottom: 20px">
                    <span class="team-title" style="font-size: 16px">{{team.TeamName}}</span>
                    <el-form :model="team" :ref="`team${team.TeamCode}`"
                             class="main_form">
                      <div class="field" v-for="(field, index) in team.Fields" :key="index">
                        <div v-if="field.Role !== 4">
                          <span class="field-name" v-if="field.ControlType !== '14' && field.ControlType !== '15'">
                            {{field.FieldName}} : {{field.DisplayValue}}
                            <span class="field-edit">
                              <el-button
                                type="text"
                                v-if="field.Role === 2"
                                @click="field.showEdit = !field.showEdit"
                              >
                                {{field.showEdit ? '收起' : '修改'}}
                              </el-button>
                            </span>
                          </span>
                          <span class="field-name" v-else>
                            {{field.FieldName}} :
                            <span style="color: #3B8BE3" v-for="val in field.DisplayValue" :key="val.Url">
                              {{val.Name}}
                              <span style="margin-left: 10px">
                                <a :href="val.Url" :download="val.Name">
                                  <el-button type="text" :disabled="!attachmentRole.CanDownload">下载</el-button>
                                </a>
                                <el-button type="text" :disabled="!attachmentRole.CanDelete">删除</el-button>
                                <span class="field-edit">
                                  <el-button
                                    type="text"
                                    v-if="field.Role === 2"
                                    @click="field.showEdit = !field.showEdit"
                                  >
                                    {{field.showEdit ? '收起' : '修改'}}
                                  </el-button>
                                </span>
                              </span>
                            </span>
                          </span>
                          <div v-if="field.showEdit">
                            <component
                              :is="currentRuleComponent(field.ControlType)"
                              :prop="'Fields.' + index + '.FieldValue'"
                              :obj="field"
                              :workId="form.Flow.WorkId"
                              :nodeId="form.Flow.FK_Node"
                              :attachmentRole="attachmentRole"
                              :isTitle="false"
                              @changeEmp="changeOrgMainCmp(`team${team.TeamCode}`, $event)"
                            ></component>
                          </div>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </template>
              </el-scrollbar>
            </div>
          </div>
          <div class="detail-content" v-if="detailTables && detailTables.length">
            <el-button type="text" @click="showDetailTable = true">查看明细表</el-button>
            <el-button type="text" @click="handleDownLoadDetail">下载</el-button>
          </div>
          <div class="tracks-container" v-if="form.Tracks.length">
            <div class="name">审批进度</div>
            <timeline>
              <li class="timeline-item" v-for="(track, index) in form.Tracks">
                <em class="timeline-icon"></em>
                <div>
                  <span>{{track.EmpName}}</span>
                  <span style="margin-left: 30px">状态：{{track.ActionTypeText}}</span>
                  <span style="margin-left: 30px">{{ track.CreateTime | replaceTime }}</span>
                </div>
                <div style="padding-left: 15px; padding-top: 15px">
                  建议：<span v-html="track.Opinion"></span>
                </div>
                <div style="margin-top: 10px;font-size: 12px" v-if="track.Msg && track.Msg !== '无'">
                  消息：{{track.Msg}}
                </div>
              </li>
            </timeline>
          </div>
          <div class="comments-container" v-if="form.Comments.length">
            <div class="name">评论</div>
            <div class="comment-item" v-for="comment in form.Comments">
              <div class="desc">
                {{comment.CreatorName}}
                <span style="display: inline-block;width: 50px"></span>
                {{comment.CreateTime | replaceTime}}
                <i class="el-icon-delete"></i>
              </div>
              <div class="content">评论：{{comment.Content}}</div>
            </div>
          </div>
        </div>
        <!---右侧fixed 详情区域---start--->
      </div>

      <!-- 明细表展示弹框 -->
      <div v-if="showDetailTable">
        <detail-table
          :detailTableList="detailTables"
          :workId="flowObj.WorkId"
          :nodeId="flowObj.FK_Node"
          :attachmentRole="attachmentRole"
          @detailTableCancel="showDetailTable = false"
          @detailTableSure="showDetailTable = false">
        </detail-table>
      </div>

      <!-- 明细表下载 -->
      <el-dialog
        title="明细表选择"
        :visible="showDownDetailTable"
        width="600px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body
      >
        <el-table
          border
          ref="multipleTable"
          :data="detailTables"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="Name"
            label="名称"
          >
          </el-table-column>
        </el-table>
        <save-footer @save="handleSaveDownloadDetail" saveText="下载" @cancel="showDownDetailTable = false"></save-footer>
      </el-dialog>

      <!-- 按钮统一弹窗 -->
      <el-dialog
        :title="dialogTitle"
        :visible="dialogVisible"
        width="600px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        append-to-body
      >
        <component
          :is="currentComponent(str)"
          :form="form"
          :flow="form.Flow"
          @DialogCancel="dialogVisible = false"
          @success="emitSuccess"
        ></component>
      </el-dialog>
      <!---->
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { REQ_OK, BASE_URL } from '@/api/config'
  import {
    focus, // 完成
    unHungUp,
    unSend,
    deleteFlow,
    saveMainValue,
    saveDetailValue,
    saveWork
  } from '@/api/approve'
  import Timeline from '@/base/Timeline/Timeline'
  import DetailTable from './detail-table'
  import { workFlowControlRuleMixin } from '@/utils/mixin'
  import { mapGetters } from 'vuex'
  import SendCmp from './send-cmp'
  import RefuseCmp from './refuse-cmp'
  import CommentCmp from './comment-cmp'
  import ShiftCmp from './shift-cmp'
  import AskForCmp from './ask-for-cmp'
  import ReturnCmp from './return-cmp'
  import HungUpCmp from './hung-up-cmp'
  import HuiQianCmp from './huiqian-cmp'
  import CcCmp from './cc-cmp'
  import SaveFooter from '@/base/Save-footer/Save-footer'

  const btnMap = {
    'send': SendCmp,
    'refuse': RefuseCmp,
    'comment': CommentCmp,
    'shift': ShiftCmp,
    'askFor': AskForCmp,
    'return': ReturnCmp,
    'hungUp': HungUpCmp,
    'huiqian': HuiQianCmp,
    'cc': CcCmp
  }
  export default {
    mixins: [workFlowControlRuleMixin],
    components: {
      Timeline,
      DetailTable,
      SendCmp,
      RefuseCmp,
      CommentCmp,
      ShiftCmp,
      AskForCmp,
      ReturnCmp,
      HungUpCmp,
      HuiQianCmp,
      CcCmp,
      SaveFooter
    },   
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      form: {
        type: Object,
        default: () => {
          return {}
        }
      },
      typeFlow: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        dialogVisible: false,
        dialogTitle: '',
        currentDialog: '',
        dialogEmp: false,
        currentMainTableCode: '',
        currentDetailTableCode: '',
        currentMainTableObj: {},
        currentDetailTableObj: {},
        attachmentRole: {},
        mainTables: [],
        detailTables: [],
        showDetailTable: false,
        str: '',
        showDownDetailTable: false,  // 控制 下载明细表弹框的显示/隐藏
        multipleSelection: []
      }
    },
    computed: {
      ...mapGetters([
        'companyCode',
        'token',
        'userCode'
      ])
    },
    created () {
    },
    mounted () {
    },
    methods: {
      emitSuccess () {
        this.dialogVisible = false
        this.$emit('refreshForm')
      },
      // 关闭
      close () {
        this.$emit('closeRight')
      },
      // 下一条
      next () {
        this.$emit('next')
      },
      // 上一条
      prev () {
        this.$emit('prev')
      },
      // 点击主表切换
      handleClickMainTableTab (tab, event) {
        this.currentMainTableObj = this.mainTables.find(item => {
          return item.TableCode === tab.name
        })
        if (this.currentMainTableObj.Fields.length) {
          this.currentMainTableObj.Fields.forEach(i => {
            this.$set(i, 'showEdit', false)
          })
        }
        if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
          this.currentMainTableObj.Teams.forEach(i => {
            if (i.Fields && i.Fields.length) {
              i.Fields.forEach(field => {
                this.$set(field, 'showEdit', false)
              })
            }
          })
        }
        this.detailTables = this.currentMainTableObj.DetailTableInfos
        if (!this.detailTables.length) return
        this.currentDetailTableObj = this.currentMainTableObj.DetailTableInfos[0]
        this.currentDetailTableCode = this.currentMainTableObj.DetailTableInfos[0].DetailTableCode
      },
      // 点击tab页切换明细表
      handleClickAddDetail () {
        this.currentDetailTableObj.Values.push(this.currentDetailTableObj.Fields)
      },
      // 保存主表
      _saveMainValue (obj) {
        return saveMainValue(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId, obj)
      },
      // 保存明细表
      _saveDetailValue (obj) {
        return saveDetailValue(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId, obj)
      },
      // 保存实例存为草稿
      _saveWork () {
        return saveWork(this.form.Flow.FK_Flow, this.form.Flow.FK_Flow + '001', this.form.Flow.WorkId)
      },
      // 保存
      _save () {
        this.$refs['launchForm'].validate((valid) => {
          if (valid) {
            let result = []
            if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
              this.currentMainTableObj.Teams.forEach(item => {
                result.push(this.checkFormArray(`team${item.TeamCode}`))
              })
            }
            Promise.all(result).then(() => {
              let mainArr = []
              let detailArr = []
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
                this._saveWork()
              ]).then(([mainResp, detailResp, workResp]) => {
                this.loading = false
                if (mainResp.data.State === REQ_OK && detailResp.data.State === REQ_OK && workResp.data.State === REQ_OK) {
                  this.$message.success('保存成功')
                } else {
                  this.$message.error('保存失败，请重试')
                }
              }).catch(() => {
                this.loading = false
                this.$message.error('保存失败，请重试')
              })
            }).catch(() => {
              this.$message.error('验证失败')
            })
          } else {
            this.$message.error('验证失败')
          }
        })
      },
      // 关注/取消关注 1关注，0取消关注--ok
      _focus (workId, num) {
        focus(workId, num).then(res => {
          if (res.data.State === REQ_OK) {
            if (num === 1) {
              this.$message({
                type: 'success',
                message: '关注成功！'
              })
              this.$emit('refreshForm')
            } else if (num === 0) {
              this.$message({
                type: 'success',
                message: '取消关注成功！'
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '设置失败，请重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '设置失败，请重试！'
          })
        })
      },
      // 取消挂起
      _unHungUp (flowId, workId) {
        unHungUp(flowId, workId).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '取消挂起成功！'
            })
            this.loading = true
          } else {
            this.$message({
              type: 'error',
              message: '取消挂起失败，请重试！'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '取消挂起失败，请重试！'
          })
        })
      },
      // 删除---ok
      _delete () {
        deleteFlow(this.form.Flow.FK_Flow, this.form.Flow.WorkId).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message.success('操作成功')
          } else {
            this.$message.error('操作失败')
          }
        }).catch(() => {
          this.$message.error('操作失败')
        })
      },
      // 撤销--ok
      _unSend () {
        unSend(this.form.Flow.FK_Flow, this.form.Flow.WorkId, this.form.Flow.FK_Node).then(res => {
          if (res.data.State === REQ_OK) {
            this.$message({
              type: 'success',
              message: '撤销成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.Error
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '撤销失败，请重试！'
          })
        })
      },
      // 打印
      handlePrintFlow () {
        let url = `/#/flow/print?no=${this.form.Flow.FK_Flow}&workId=${this.form.Flow.WorkId}&nodeId=${this.form.Flow.FK_Node}`
        window.open(url)
      },
      // 导出--ok
      _exportFlow () {
        if (this.typeFlow === 'copy') {
          let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&myPks=['${this.form.Flow.WorkId}']&userId=${this.userCode}`
          window.open(url)
        } else {
          let url = `${BASE_URL}/WorkFlow?Method=ExportSelectedWork&TokenId=&CompanyCode=${this.companyCode}&workIds=[${this.form.Flow.WorkId}]&userId=${this.userCode}`
          window.open(url)
        }
      },
      // 下载明细表弹窗勾选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 下载明细表
      handleDownLoadDetail () {
        this.showDownDetailTable = true
      },
      // 选择完毕后点下载
      handleSaveDownloadDetail () {
        debugger
        if (!this.multipleSelection.length) return this.$message.info('未选择任何明细表')
        if (this.multipleSelection.length > 1) return this.$message.info('每次只能下载一个明细表')
        let url = `${BASE_URL}/WorkFlow?Method=ExportDetail&TokenId=&CompanyCode=${this.companyCode}&workId=${this.form.Flow.WorkId}&detailTableCode=${this.multipleSelection[0].DetailTableCode}&mainTableCode=${this.multipleSelection[0].mainTableCode}&userId=${this.userCode}`
        window.open(url)
      },
      // 点击按钮
      handleFn (method) {
        switch (method) {
          case 'Send':
            this.dialogTitle = '提交'
            this.dialogVisible = true
            this.str = 'send'
            break
          case 'SaveMainValue,SaveDetailValue,SaveWork':
            this._save()
            break
          case 'Shift':
            this.dialogTitle = '移交'
            this.dialogVisible = true
            this.str = 'shift'
            break
          case 'Askfor':
            this.dialogTitle = '加签'
            this.dialogVisible = true
            this.str = 'askFor'
            break
          case 'Focus':
            this._focus(this.form.Flow.WorkId, 1)
            break
          case 'ReturnBack':
            this.dialogTitle = '退回'
            this.dialogVisible = true
            this.str = 'return'
            break
          case 'HungUp':
            this.dialogTitle = '挂起'
            this.dialogVisible = true
            this.str = 'hungUp'
            break
          case 'Refuse':
            this.dialogTitle = '拒绝'
            this.dialogVisible = true
            this.str = 'refuse'
            break
          case 'HuiQianInit':
            this.dialogTitle = '会签 '
            this.dialogVisible = true
            this.str = 'huiqian'
            break
          case 'Delete':
            this.$confirm('确认删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._delete()
            }).catch(() => {
            })
            break
          case 'UnSend':
            this.$confirm('确认撤销吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this._unSend()
            }).catch(() => {
            })
            break
          case 'AddComment':
            this.dialogTitle = '评论'
            this.dialogVisible = true
            this.str = 'comment'
            break
          case 'Cc':
            this.dialogTitle = '抄送'
            this.dialogVisible = true
            this.str = 'cc'
            break
        }
      },
      // 动态组件
      currentComponent (str) {
        return btnMap[str] || ''
      },
      // 封装验证数组表单的函数
      checkFormArray (formName) { // 封装验证表单的函数
        return new Promise((resolve, reject) => {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject(new Error())
            }
          })
        })
      },
      // 动态表单字段组织选择回调验证
      changeOrgMainCmp (param, prop) {
        this.$refs[param].validateField(prop)
      }
    },
    watch: {
      form: {
        handler (newVal, oldVal) {
          this.flowObj = newVal.Flow
          this.mainTables = newVal.MainTableInfos
          this.attachmentRole = newVal.FunctionRole
          if (this.mainTables && this.mainTables.length) {
            this.currentMainTableObj = this.mainTables[0]
            this.currentMainTableCode = this.mainTables[0].TableCode
            if (this.currentMainTableObj.Fields && this.currentMainTableObj.Fields.length) {
              this.currentMainTableObj.Fields.forEach(i => {
                this.$set(i, 'showEdit', false)
              })
            }
            if (this.currentMainTableObj.Teams && this.currentMainTableObj.Teams.length) {
              this.currentMainTableObj.Teams.forEach(i => {
                if (i.Fields && i.Fields.length) {
                  i.Fields.forEach(field => {
                    this.$set(field, 'showEdit', false)
                  })
                }
              })
            }
            if (this.mainTables[0].DetailTableInfos && !this.mainTables[0].DetailTableInfos.length) return
            this.detailTables = this.mainTables[0].DetailTableInfos
            this.currentDetailTableObj = this.mainTables[0].DetailTableInfos[0]
            this.currentDetailTableCode = this.mainTables[0].DetailTableInfos[0].DetailTableCode
          } else {
            this.currentMainTableObj = {}
            this.currentMainTableCode = ''
            this.detailTables = []
            this.currentDetailTableObj = {}
            this.currentDetailTableCode = ''
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/css/mixin.styl"
  .right-fixed-container
    position fixed
    top: 90px
    right 0
    bottom 0
    width 500px
    padding 10px
    background #ffffff
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    overflow-y scroll
    z-index 99
    &::-webkit-scrollbar
      display: none
    .close
      height 51px
      line-height 51px
      text-align center
      font-size 30px
      color #3B8BE3
      opacity 0.5
      i
        &:hover
          cursor pointer
    .content-container
      padding-top 20px
      border-top: 1px solid #ccc;
      .fn-btn
        font-size 0
        .el-button
          margin-right 5px
          margin-bottom 5px
          margin-left 0 !important
      .table-content
        .table-title
          text-align center
          padding 30px 0
          font-size 24px
        .main-content /deep/
          margin-bottom 20px
          .el-scrollbar__wrap
            overflow-x hidden !important
            .name
              margin-bottom 10px
              font-size 18px
            .field
              display block
              padding-left 15px
              margin-bottom 10px
              font-size 16px
              color #999999
              .field-name
                display block
                padding 10px 0
                button
                  padding 0
                .field-edit
                  margin-left 10px
                  display none
                  button
                    padding 0
                &:hover
                  .field-edit
                    display inline-block
        .tracks-container
          padding 20px 0
          .name
            font-size 18px
        .comments-container
          .name
            padding 10px 0
            font-size 18px
          .comment-item
            padding-left 15px
            padding-bottom 15px
            margin-bottom 15px
            font-size 16px
            color #999999
            border-bottom 1px solid #dedede
            .desc
              margin-bottom 10px
              i
                margin-left 15px
                &:hover
                  cursor pointer
                  color red
            .content
              font-size 14px

    .el-loading-mask
      top: 51px !important

  .move-enter-active, .move-leave-active
    enter-active()

  .move-enter, .move-leave-active
    leave-active()
</style>
